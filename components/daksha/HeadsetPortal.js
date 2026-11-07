import * as THREE from 'three'
import { attachHeadsetStickers, HEADSET_STICKERS } from './headset-stickers.mjs'

// Measured in the Quest3 GLB's Y-up world coordinates. The live view sits just
// in front of each authored eyepiece, on its eye-facing side.
const EYE_Y = -0.04
const EYE_Z = 0.069
const EYE_X = 0.035
const EYE_RADIUS = [0.0215, 0.025]
const smooth = (value, start, end) =>
  THREE.MathUtils.smoothstep(value, start, end)

export async function createHeadsetPortal(source, environment, manager) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x02050b)
  scene.environment = environment
  scene.environmentIntensity = 1.1
  const camera = new THREE.PerspectiveCamera(36, 1, 0.01, 100)
  camera.position.z = 8.8
  const innerCamera = new THREE.PerspectiveCamera(36, 1, 0.1, 50)
  const target = new THREE.WebGLRenderTarget(1, 1, {
    type: THREE.HalfFloatType,
    depthBuffer: true
  })
  target.texture.name = 'Live Daksha lens view'
  const root = new THREE.Group()
  root.name = 'VR headset entrance'
  const normalized = new THREE.Group()
  source.updateMatrixWorld(true)
  const bounds = new THREE.Box3().setFromObject(source)
  const center = bounds.getCenter(new THREE.Vector3())
  await attachHeadsetStickers(source, manager)
  const normalize = 4.6 / (bounds.max.x - bounds.min.x)
  source.position.sub(center)
  normalized.add(source)
  normalized.scale.setScalar(normalize)
  root.add(normalized)
  scene.add(root)
  source.traverse(node => {
    if (!node.isMesh) return
    node.material.envMapIntensity = node.material.isMeshPhysicalMaterial
      ? 2.5
      : 1
  })
  const key = new THREE.DirectionalLight(0xe9f3ff, 3.5)
  key.position.set(-4, 6, 8)
  const rim = new THREE.DirectionalLight(0x76baff, 2)
  rim.position.set(4, 2, -4)
  // A studio glint catches only the resin decals as the headset turns.
  const stickerGlint = new THREE.DirectionalLight(0xffffff, 7)
  stickerGlint.position.set(7, 3, 6)
  stickerGlint.layers.set(1)
  scene.add(stickerGlint)
  scene.add(key, rim, new THREE.AmbientLight(0xc8d9f0, 0.65))
  const uniforms = {
    uScene: { value: target.texture },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uScreenBlend: { value: 0 },
    uReveal: { value: 0 },
    uSpill: { value: 0 }
  }
  const lensMaterial = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `varying vec2 vUv;
      void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `uniform sampler2D uScene;
      uniform vec2 uResolution;
      uniform float uScreenBlend;
      uniform float uReveal;
      varying vec2 vUv;
      void main(){
        vec2 screenUv=gl_FragCoord.xy/uResolution;
        vec2 uv=mix(vUv,screenUv,uScreenBlend);
        vec3 color=texture2D(uScene,uv).rgb;
        vec3 bloom=(texture2D(uScene,uv+vec2(0.004,0.0)).rgb+
          texture2D(uScene,uv-vec2(0.004,0.0)).rgb+
          texture2D(uScene,uv+vec2(0.0,0.004)).rgb+
          texture2D(uScene,uv-vec2(0.0,0.004)).rgb)*0.25;
        float luminance=dot(bloom,vec3(0.2126,0.7152,0.0722));
        color+=bloom*smoothstep(0.35,1.4,luminance)*0.20*(1.0-uScreenBlend);
        color*=mix(1.22,1.0,uScreenBlend);
        float edge=1.0-smoothstep(0.80,1.0,length((vUv-0.5)*2.0));
        color*=mix(0.72+0.28*edge,1.0,uScreenBlend);
        gl_FragColor=vec4(mix(vec3(0.003,0.009,0.016),color,uReveal),1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`
  })
  const spillLights = []
  const glowMaterial = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `uniform float uSpill;varying vec2 vUv;
      void main(){vec2 p=(vUv-0.5)*2.0;float r=length(p);
        float glow=exp(-r*r*2.3)*(1.0-smoothstep(0.75,1.0,r));
        gl_FragColor=vec4(0.28,0.56,0.82,glow*0.12*uSpill);}`
  })
  for (const x of [-EYE_X, EYE_X]) {
    const lens = new THREE.Mesh(new THREE.CircleGeometry(1, 64), lensMaterial)
    lens.name = x < 0 ? 'Entry lens portal' : 'Second lens portal'
    lens.position.set(x - center.x, EYE_Y - center.y, EYE_Z - center.z)
    lens.rotation.y = Math.PI
    lens.scale.set(EYE_RADIUS[0], EYE_RADIUS[1], 1)
    normalized.add(lens)
    const glow = new THREE.Mesh(new THREE.CircleGeometry(1, 48), glowMaterial)
    glow.name = 'Soft lens luminance'
    glow.position.copy(lens.position)
    glow.position.z -= 0.0005
    glow.rotation.copy(lens.rotation)
    glow.scale.copy(lens.scale).multiplyScalar(1.08)
    normalized.add(glow)
    // A restrained screen-colored fill lights the eye-facing padding itself.
    const spill = new THREE.PointLight(0xb4dcff, 0, 2.3, 2)
    spill.position.set(
      (x - center.x) * normalize,
      (EYE_Y - center.y) * normalize,
      (-0.015 - center.z) * normalize
    )
    root.add(spill)
    spillLights.push(spill)
  }
  // Source -X becomes screen +X when the headset turns toward its wearer.
  const entryEye = new THREE.Vector3(
    -(-EYE_X - center.x) * normalize,
    (EYE_Y - center.y) * normalize,
    -(EYE_Z - center.z) * normalize
  )
  const lookTarget = new THREE.Vector3()
  let width = 1
  let height = 1
  let active = false
  let screenBlend = 0
  let phase = 'landing'
  return {
    scene,
    root,
    stickerCount: HEADSET_STICKERS.length,
    get active() {
      return active
    },
    get phase() {
      return phase
    },
    resize(nextWidth, nextHeight, pixelRatio = 1.35) {
      width = nextWidth
      height = nextHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      // One shared live render feeds both eyes; no second renderer or idle loop.
      const ratio = Math.min(pixelRatio, 2, 2048 / width, 2048 / height)
      target.setSize(Math.round(width * ratio), Math.round(height * ratio))
    },
    update(chapter, reducedMotion) {
      active = chapter < 2
      if (!active) {
        phase = 'immersed'
        return
      }
      const turn = smooth(chapter, 0.38, 1.03)
      const aim = reducedMotion ? 0 : smooth(chapter, 1.08, 1.4)
      const enter = reducedMotion ? 0 : smooth(chapter, 1.28, 1.98)
      const arrive = smooth(chapter, 0.05, 0.62)
      const fit = Math.min(1, camera.aspect * 1.28)
      const scale = fit * THREE.MathUtils.lerp(0.78, 1.55, enter)
      root.scale.setScalar(scale)
      root.rotation.set(
        THREE.MathUtils.lerp(-0.18, 0, turn),
        THREE.MathUtils.lerp(0.55, Math.PI, turn),
        THREE.MathUtils.lerp(-0.16, 0, turn)
      )
      root.position.set(
        THREE.MathUtils.lerp(3.4 * (1 - arrive), -entryEye.x * scale, aim),
        THREE.MathUtils.lerp(-0.5 * (1 - arrive), -entryEye.y * scale, aim),
        THREE.MathUtils.lerp(
          -0.8 * (1 - arrive),
          8.71 - entryEye.z * scale,
          enter
        )
      )
      uniforms.uReveal.value = smooth(chapter, 0.76, 1.08)
      screenBlend = smooth(enter, 0.6, 0.96)
      uniforms.uScreenBlend.value = screenBlend
      uniforms.uSpill.value = uniforms.uReveal.value * (1 - screenBlend)
      spillLights.forEach(light => {
        light.intensity = 1.1 * scale * scale * uniforms.uSpill.value
        light.distance = 2.3 * scale
      })
      phase =
        chapter < 0.38
          ? 'arriving'
          : chapter < 1.03
          ? 'turning'
          : chapter < 1.12
          ? 'lenses'
          : 'entering'
    },
    render(renderer, world, viewCamera, spacecraftPosition) {
      innerCamera.position.copy(viewCamera.position)
      innerCamera.fov = viewCamera.fov
      innerCamera.aspect = THREE.MathUtils.lerp(
        EYE_RADIUS[0] / EYE_RADIUS[1],
        width / height,
        screenBlend
      )
      lookTarget.copy(spacecraftPosition).multiplyScalar(1 - screenBlend)
      innerCamera.lookAt(lookTarget)
      innerCamera.updateProjectionMatrix()
      const previous = renderer.getRenderTarget()
      renderer.setRenderTarget(target)
      renderer.render(world, innerCamera)
      renderer.setRenderTarget(previous)
      renderer.getDrawingBufferSize(uniforms.uResolution.value)
      renderer.render(scene, camera)
    },
    async prepare(renderer) {
      scene.traverse(node => {
        if (!node.material) return
        for (const value of Object.values(node.material))
          if (value?.isTexture) renderer.initTexture(value)
      })
      await renderer.compileAsync(scene, camera)
    },
    dispose() {
      target.dispose()
    }
  }
}
