import * as THREE from 'three'

// Rasterize live DOM stage headings onto a 2D canvas at device pixel resolution.
// This allows the crystal glass shader to refract genuine typography with crispness.
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

function createC2CRefractionTarget(renderer) {
  const target = new THREE.WebGLRenderTarget(1, 1, {
    type: THREE.HalfFloatType,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: true
  })
  target.texture.name = 'C2C crystal glass scene refraction'
  const size = new THREE.Vector2()
  const uniforms = {
    uGlassScene: { value: target.texture },
    uGlassResolution: { value: new THREE.Vector2(1, 1) },
    uGlassProjection: { value: new THREE.Matrix4() }
  }
  return {
    uniforms,
    capture(scene, camera, occluders) {
      renderer.getDrawingBufferSize(size)
      uniforms.uGlassResolution.value.copy(size)
      uniforms.uGlassProjection.value.copy(camera.projectionMatrix)
      const width = Math.max(1, Math.round(size.x))
      const height = Math.max(1, Math.round(size.y))
      if (target.width !== width || target.height !== height)
        target.setSize(width, height)
      const hidden = Array.isArray(occluders) ? occluders : [occluders]
      const visibility = hidden.map(object => object.visible)
      const previous = {
        target: renderer.getRenderTarget(),
        toneMapping: renderer.toneMapping,
        autoClear: renderer.autoClear,
        shadows: renderer.shadowMap.autoUpdate
      }
      try {
        hidden.forEach(object => {
          object.visible = false
        })
        renderer.toneMapping = THREE.NoToneMapping
        renderer.autoClear = true
        renderer.shadowMap.autoUpdate = false
        renderer.setRenderTarget(target)
        renderer.clear()
        renderer.render(scene, camera)
      } finally {
        hidden.forEach((object, index) => {
          object.visible = visibility[index]
        })
        renderer.setRenderTarget(previous.target)
        renderer.toneMapping = previous.toneMapping
        renderer.autoClear = previous.autoClear
        renderer.shadowMap.autoUpdate = previous.shadows
      }
    },
    dispose() {
      target.dispose()
    }
  }
}

function injectC2CCrystalShader(shader, uniforms, strength) {
  Object.assign(shader.uniforms, uniforms)
  shader.uniforms.uC2CGlassStrength = strength

  shader.vertexShader = `
    varying vec3 vWorldPos;
    ${shader.vertexShader.replace(
      '#include <begin_vertex>',
      '#include <begin_vertex>\n vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;'
    )}`

  shader.fragmentShader = `
    uniform sampler2D uGlassScene;
    uniform vec2 uGlassResolution;
    uniform mat4 uGlassProjection;
    uniform float uC2CGlassStrength;
    varying vec3 vWorldPos;
    ${shader.fragmentShader}`

  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <opaque_fragment>',
    `
    if (uC2CGlassStrength > 0.001) {
      vec3 incident = normalize(-vViewPosition);
      vec3 n = normalize(normal);
      
      // Optical crystal acrylic index of refraction & dispersion
      float iorBase = 1.54;
      float dispersion = 0.045; // chromatic aberration like reference image
      
      vec3 rayR = refract(incident, n, 1.0 / (iorBase - dispersion));
      vec3 rayG = refract(incident, n, 1.0 / iorBase);
      vec3 rayB = refract(incident, n, 1.0 / (iorBase + dispersion));
      
      // Total Internal Reflection fallback for grazing internal rays
      vec3 refl = reflect(incident, n);
      if (dot(rayR, rayR) < 0.05) rayR = refl;
      if (dot(rayG, rayG) < 0.05) rayG = refl;
      if (dot(rayB, rayB) < 0.05) rayB = refl;
      
      float thickness = 1.45;
      vec3 exitR = (-vViewPosition) + rayR * (thickness / max(abs(rayR.z), 0.22));
      vec3 exitG = (-vViewPosition) + rayG * (thickness / max(abs(rayG.z), 0.22));
      vec3 exitB = (-vViewPosition) + rayB * (thickness / max(abs(rayB.z), 0.22));
      
      vec4 projR = uGlassProjection * vec4(exitR, 1.0);
      vec4 projG = uGlassProjection * vec4(exitG, 1.0);
      vec4 projB = uGlassProjection * vec4(exitB, 1.0);
      
      vec2 uvR = clamp(projR.xy / projR.w * 0.5 + 0.5, vec2(0.001), vec2(0.999));
      vec2 uvG = clamp(projG.xy / projG.w * 0.5 + 0.5, vec2(0.001), vec2(0.999));
      vec2 uvB = clamp(projB.xy / projB.w * 0.5 + 0.5, vec2(0.001), vec2(0.999));
      
      // ── Physical Fresnel & Spatial Gradients ──
      float cosTheta = clamp(abs(dot(n, normalize(vViewPosition))), 0.0, 1.0);
      float F0 = 0.052;
      float fresnel = F0 + (1.0 - F0) * pow(1.0 - cosTheta, 4.8);
      
      // Ray path length through volume (deeper = more diffusion)
      float pathLength = thickness / max(abs(rayG.z), 0.22);
      float depthGrad = clamp((pathLength - 1.2) / 2.0, 0.0, 1.0);
      float edgeGrad = pow(1.0 - cosTheta, 2.2);
      
      // ── Multi-Tap Frosted Refraction Blur (Optical Diffusion) ──
      vec2 texel = 1.0 / uGlassResolution;
      float blurDist = 3.6 + 2.8 * depthGrad + 2.0 * edgeGrad;
      
      vec2 off1 = vec2( 0.707,  0.707) * texel * blurDist;
      vec2 off2 = vec2(-0.707,  0.707) * texel * blurDist;
      vec2 off3 = vec2(-0.707, -0.707) * texel * blurDist;
      vec2 off4 = vec2( 0.707, -0.707) * texel * blurDist;
      vec2 off5 = vec2( 0.0,    1.35 ) * texel * blurDist;
      vec2 off6 = vec2( 0.0,   -1.35 ) * texel * blurDist;
      vec2 off7 = vec2( 1.35,   0.0  ) * texel * blurDist;
      vec2 off8 = vec2(-1.35,   0.0  ) * texel * blurDist;
      
      float colR = texture2D(uGlassScene, uvR).r * 0.24
                 + texture2D(uGlassScene, uvR + off1).r * 0.11
                 + texture2D(uGlassScene, uvR + off2).r * 0.11
                 + texture2D(uGlassScene, uvR + off3).r * 0.11
                 + texture2D(uGlassScene, uvR + off4).r * 0.11
                 + texture2D(uGlassScene, uvR + off5).r * 0.08
                 + texture2D(uGlassScene, uvR + off6).r * 0.08
                 + texture2D(uGlassScene, uvR + off7).r * 0.08
                 + texture2D(uGlassScene, uvR + off8).r * 0.08;
                 
      float colG = texture2D(uGlassScene, uvG).g * 0.24
                 + texture2D(uGlassScene, uvG + off1).g * 0.11
                 + texture2D(uGlassScene, uvG + off2).g * 0.11
                 + texture2D(uGlassScene, uvG + off3).g * 0.11
                 + texture2D(uGlassScene, uvG + off4).g * 0.11
                 + texture2D(uGlassScene, uvG + off5).g * 0.08
                 + texture2D(uGlassScene, uvG + off6).g * 0.08
                 + texture2D(uGlassScene, uvG + off7).g * 0.08
                 + texture2D(uGlassScene, uvG + off8).g * 0.08;
                 
      float colB = texture2D(uGlassScene, uvB).b * 0.24
                 + texture2D(uGlassScene, uvB + off1).b * 0.11
                 + texture2D(uGlassScene, uvB + off2).b * 0.11
                 + texture2D(uGlassScene, uvB + off3).b * 0.11
                 + texture2D(uGlassScene, uvB + off4).b * 0.11
                 + texture2D(uGlassScene, uvB + off5).b * 0.08
                 + texture2D(uGlassScene, uvB + off6).b * 0.08
                 + texture2D(uGlassScene, uvB + off7).b * 0.08
                 + texture2D(uGlassScene, uvB + off8).b * 0.08;
                 
      vec3 transmitted = vec3(colR, colG, colB);
      
      // ── Volumetric Light Gradient Across the Crystal Body ──
      float lightGrad = clamp(dot(n, normalize(vec3(-0.3, 0.8, 0.5))), 0.0, 1.0);
      float heightGrad = clamp((vWorldPos.y + 0.775) / 1.55, 0.0, 1.0);
      
      vec3 topColor = vec3(1.05, 1.07, 1.08);   // luminous, crystalline top
      vec3 midColor = vec3(0.97, 1.01, 1.00);   // optical core
      vec3 baseColor = vec3(0.86, 0.93, 0.90);  // deeper gradient base
      vec3 verticalGradient = mix(baseColor, mix(midColor, topColor, lightGrad), heightGrad);
      
      vec3 depthTint = mix(vec3(1.0), vec3(0.92, 0.97, 0.95), depthGrad);
      vec3 internalGlow = vec3(0.045, 0.075, 0.065) * (1.0 - edgeGrad) * (0.35 + 0.65 * lightGrad);
      
      transmitted = transmitted * verticalGradient * depthTint + internalGlow;
      
      // ── Chromatic Rim Specular Reflections ──
      vec3 rimFlare = mix(vec3(1.0, 0.76, 0.38), vec3(0.42, 0.82, 1.0), n.x * 0.5 + 0.5);
      vec3 specularReflection = totalSpecular + (totalSpecular * rimFlare * 2.2 * pow(1.0 - cosTheta, 2.5));
      
      #ifdef USE_CLEARCOAT
        specularReflection += (clearcoatSpecularDirect + clearcoatSpecularIndirect) * 1.1;
      #endif
      
      vec3 crystalOutput = mix(transmitted, specularReflection, fresnel) + specularReflection * 0.45;
      outgoingLight = mix(outgoingLight, crystalOutput, uC2CGlassStrength);
    }
    #include <opaque_fragment>`
  )
}

export function createC2CGlass(renderer, scene, mount) {
  const refraction = createC2CRefractionTarget(renderer)
  const strength = { value: 1 }
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
      color: 0xffffff,
      metalness: 0,
      roughness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.035,
      ior: 1.54,
      envMapIntensity: 2.4,
      side: original.side,
      depthWrite: true
    })
    material.name = 'C2C optical crystal glass'
    material.onBeforeCompile = shader => {
      injectC2CCrystalShader(shader, refraction.uniforms, strength)
    }
    material.customProgramCacheKey = () => 'c2c-optical-crystal-glass-v2'
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
          if (
            node.userData.c2cGlass !== true &&
            /screen|display|oled|button|switch|label|encoder|(?:^|[\s_.-])led(?:$|[\s_.-]|\d)/i.test(
              name
            )
          )
            return original
          glassMeshes.add(node)
          return materialFor(original)
        }
        node.material = Array.isArray(node.material)
          ? node.material.map(replace)
          : replace(node.material)
      })
      mount.dataset.material = 'c2c-crystal-glass'
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
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const w = Math.max(1, Math.round(width * dpr)),
          h = Math.max(1, Math.round(height * dpr))
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w
          canvas.height = h
        }
        context.setTransform(dpr, 0, 0, dpr, 0, 0)
        drawStage(context, stage, mount, width, height)
        texture.needsUpdate = true
        lastBackdrop = signature
      }
      background.visible = true
      try {
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
