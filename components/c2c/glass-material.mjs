import * as THREE from 'three'
import {
  createRefractiveGlass,
  injectRefractiveGlass
} from '../daksha/refractive-glass.mjs'

// Rasterize only our own stage headings, at their live DOM positions. This lets
// the shared satellite shader refract HTML type, not an unrelated studio image.
function drawStage(ctx, stage, mount, width, height) {
  const origin = mount.getBoundingClientRect()
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = getComputedStyle(stage).backgroundColor
  ctx.fillRect(0, 0, width, height)
  const range = document.createRange()
  for (const beat of stage.querySelectorAll('[data-impact-beat]')) {
    const beatStyle = getComputedStyle(beat)
    if (beatStyle.visibility === 'hidden' || Number(beatStyle.opacity) < 0.001)
      continue
    const scale =
      beat.getBoundingClientRect().width / Math.max(1, beat.offsetWidth)
    ctx.globalAlpha = Number(beatStyle.opacity)
    const walker = document.createTreeWalker(beat, NodeFilter.SHOW_TEXT)
    let node
    while ((node = walker.nextNode())) {
      if (!node.textContent.trim()) continue
      const style = getComputedStyle(node.parentElement)
      ctx.font = `${style.fontWeight} ${parseFloat(style.fontSize) * scale}px ${
        style.fontFamily
      }`
      ctx.fillStyle = style.color
      ctx.textBaseline = 'alphabetic'
      const ascent =
        ctx.measureText('M').fontBoundingBoxAscent ||
        parseFloat(style.fontSize) * scale * 0.85
      for (let i = 0; i < node.textContent.length; i++) {
        const character = node.textContent[i]
        if (!character.trim()) continue
        range.setStart(node, i)
        range.setEnd(node, i + 1)
        const rect = range.getBoundingClientRect()
        const x = rect.left - origin.left,
          y = rect.top - origin.top
        if (
          x + rect.width < 0 ||
          x > width ||
          y + rect.height < 0 ||
          y > height
        )
          continue
        ctx.fillText(
          style.textTransform === 'uppercase'
            ? character.toUpperCase()
            : character,
          x,
          y + ascent
        )
      }
    }
  }
  ctx.globalAlpha = 1
}

export function createC2CGlass(renderer, scene, mount) {
  const refraction = createRefractiveGlass(renderer)
  const strength = { value: 1 },
    visibility = { value: 1 }
  const glassMeshes = new Set(),
    originals = new Set(),
    materials = new Map()
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.generateMipmaps = false
  texture.minFilter = THREE.LinearFilter
  const background = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({
      uniforms: { uBackdrop: { value: texture } },
      vertexShader:
        'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.9999,1.0);}',
      fragmentShader:
        'uniform sampler2D uBackdrop;varying vec2 vUv;void main(){gl_FragColor=texture2D(uBackdrop,vUv);}',
      depthTest: false,
      depthWrite: false,
      toneMapped: false
    })
  )
  background.frustumCulled = false
  background.renderOrder = -10000
  background.visible = false
  scene.add(background)
  let lastBackdrop = ''

  const materialFor = original => {
    if (materials.has(original)) return materials.get(original)
    originals.add(original)
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xf0fbff,
      metalness: 0,
      roughness: 0.075,
      clearcoat: 1,
      clearcoatRoughness: 0.065,
      ior: 1.46,
      envMapIntensity: 1.1,
      side: original.side,
      depthWrite: true
    })
    material.name = 'C2C / Daksha refractive glass'
    material.onBeforeCompile = shader => {
      shader.uniforms.uDakshaRainbowGlass = strength
      shader.uniforms.uDakshaVisibility = visibility
      shader.fragmentShader =
        'uniform float uDakshaRainbowGlass;\nuniform float uDakshaVisibility;\n' +
        shader.fragmentShader
      injectRefractiveGlass(shader, refraction.uniforms)
    }
    material.customProgramCacheKey = () => 'c2c-daksha-refractive-glass-v1'
    materials.set(original, material)
    return material
  }
  return {
    originals,
    apply(root, taggedOnly = false) {
      if (!taggedOnly) glassMeshes.clear()
      root.traverse(node => {
        if (!node.isMesh || node.userData.c2cGlass === false) return
        if (taggedOnly && node.userData.c2cGlass !== true) return
        const replace = original => {
          const name = `${node.name} ${original.name}`
          // Preserve the readable controls in future GLBs. An explicit c2cGlass
          // metadata flag can override this name-based default per mesh.
          if (
            node.userData.c2cGlass !== true &&
            /screen|display|oled|button|switch|label|encoder|(?:^|[\s_.-])led(?:$|[\s_.-]|\d)/i.test(name)
          )
            return original
          glassMeshes.add(node)
          return materialFor(original)
        }
        node.material = Array.isArray(node.material)
          ? node.material.map(replace)
          : replace(node.material)
      })
      mount.dataset.material = 'daksha-refractive-glass'
    },
    capture(camera) {
      const stage = mount.closest('[data-impact-stage]')
      if (!stage || !context) return
      const width = mount.clientWidth,
        height = mount.clientHeight
      const style = getComputedStyle(stage)
      const beats = [...stage.querySelectorAll('[data-impact-beat]')]
      const signature = [
        width,
        height,
        document.fonts.status,
        style.backgroundColor,
        style.color,
        ...beats.map(beat => {
          const css = getComputedStyle(beat)
          return `${css.transform}/${css.opacity}/${css.visibility}`
        })
      ].join('|')
      if (signature !== lastBackdrop) {
        const scale = Math.min(1, 1024 / Math.max(width, height))
        const w = Math.max(1, Math.round(width * scale)),
          h = Math.max(1, Math.round(height * scale))
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w
          canvas.height = h
        }
        context.setTransform(scale, 0, 0, scale, 0, 0)
        drawStage(context, stage, mount, width, height)
        texture.needsUpdate = true
        lastBackdrop = signature
      }
      background.visible = true
      try {
        // Hardware remains in the transmission capture; only the shells vanish.
        refraction.capture(scene, camera, [...glassMeshes])
      } finally {
        background.visible = false
      }
    },
    dispose() {
      refraction.dispose()
      scene.remove(background)
      background.geometry.dispose()
      background.material.dispose()
      texture.dispose()
    }
  }
}
