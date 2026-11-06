import * as THREE from 'three'
import { setSunPosition } from './lighting-path.mjs'

// Depth comes from a real planet, atmosphere, and two star layers. No video plate.
export function createStoryEnvironment(
  scene,
  invalidate,
  manager,
  mobile = false
) {
  const root = new THREE.Group()
  scene.add(root)
  const backdrop = new THREE.ShaderMaterial({
    depthTest: false,
    depthWrite: false,
    uniforms: { uGlow: { value: 0.4 }, uChapter: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.9999,1.0);}`,
    fragmentShader: `varying vec2 vUv; uniform float uGlow; uniform float uChapter;
      void main(){
        vec2 p=(vUv-vec2(0.68+sin(uChapter*0.32)*0.08,0.44))*vec2(1.0,1.5);
        float halo=exp(-dot(p,p)*4.0);
        float horizon=exp(-abs(vUv.y-0.08)*9.0);
        vec3 c=vec3(0.002,0.006,0.016)+vec3(0.006,0.043,0.09)*halo*uGlow;
        c+=vec3(0.0,0.013,0.028)*horizon*uGlow;
        gl_FragColor=vec4(c,1.0);
      }`
  })
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), backdrop)
  plane.frustumCulled = false
  plane.renderOrder = -100
  root.add(plane)

  let seed = 8517
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }
  const starLayers = [1200, 450].map((count, layer) => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = random() * Math.PI * 2
      const z = random() * 2 - 1
      const radius = 20 + random() * 25
      const r = Math.sqrt(1 - z * z)
      positions.set(
        [
          Math.cos(theta) * r * radius,
          z * radius,
          Math.sin(theta) * r * radius
        ],
        i * 3
      )
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const points = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color: layer ? 0x9fcaff : 0xb3c6e0,
        size: layer ? 1.5 : 0.85,
        sizeAttenuation: false,
        transparent: true,
        opacity: layer ? 0.5 : 0.4,
        depthWrite: false
      })
    )
    root.add(points)
    return points
  })
  const texture = new THREE.TextureLoader(manager).load(
    '/images/daksha/environment/earth.jpg',
    invalidate
  )
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 2
  const earthMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    color: 0x416b99,
    roughness: 0.94,
    metalness: 0,
    transparent: true,
    opacity: 0.9
  })
  const planet = new THREE.Group()
  planet.position.set(4.7, -5.4, -9)
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(6.8, 64, 40),
    earthMaterial
  )
  sphere.rotation.set(0.1, 2.6, -0.25)
  planet.add(sphere)
  // Thin limb scattering: pale blue at the dense horizon, then azure and
  // deep blue as the air thins into space. Height is measured along the
  // camera ray, keeping the band attached to the globe at every perspective.
  const atmosphereMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    uniforms: {
      uOpacity: { value: 1 },
      uPlanetScale: { value: 1 },
      uPlanetCenter: { value: new THREE.Vector3() },
      uSunDirection: { value: new THREE.Vector3(2.2, 7, 1).normalize() }
    },
    vertexShader: `varying vec3 vWorldPosition;
      void main(){
        vec4 world=modelMatrix*vec4(position,1.0);
        vWorldPosition=world.xyz;
        gl_Position=projectionMatrix*viewMatrix*world;
      }`,
    fragmentShader: `varying vec3 vWorldPosition;
      uniform float uOpacity;
      uniform float uPlanetScale;
      uniform vec3 uPlanetCenter;
      uniform vec3 uSunDirection;
      void main(){
        vec3 ray=normalize(vWorldPosition-cameraPosition);
        vec3 toCenter=uPlanetCenter-cameraPosition;
        vec3 closest=ray*dot(toCenter,ray)-toCenter;
        float height=(length(closest)/uPlanetScale-6.8)/0.20;
        float altitude=max(height,0.0);
        float density=exp(-altitude*4.5);
        density*=smoothstep(-0.10,0.0,height);
        density*=1.0-smoothstep(0.65,1.0,altitude);
        vec3 pale=vec3(0.42,1.05,1.8);
        vec3 azure=vec3(0.025,0.32,1.0);
        vec3 deepBlue=vec3(0.004,0.035,0.24);
        vec3 scattering=mix(pale,azure,smoothstep(0.0,0.28,altitude));
        scattering=mix(scattering,deepBlue,smoothstep(0.25,0.85,altitude));
        float daylight=0.32+0.68*smoothstep(-0.3,0.65,dot(normalize(closest),uSunDirection));
        gl_FragColor=vec4(scattering,density*daylight*uOpacity);
      }`
  })
  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(7.0, 96, 64),
    atmosphereMaterial
  )
  planet.add(atmosphere)
  root.add(planet)

  // The visible sun and its shadow light follow the same scroll-driven orbit.
  const sunMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uVisibility: { value: 1 } },
    vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `varying vec2 vUv; uniform float uVisibility;
      void main(){
        vec2 p=(vUv-0.5)*2.0;
        float r=length(p);
        float core=exp(-r*r*900.0);
        float corona=exp(-r*22.0);
        float halo=exp(-r*r*9.0);
        float ray=exp(-abs(p.y)*110.0)*exp(-abs(p.x)*7.0);
        vec3 light=vec3(48.0,45.0,38.0)*core+vec3(5.0,6.5,9.0)*corona;
        light+=vec3(0.025,0.12,0.3)*halo+vec3(0.1,0.2,0.35)*ray;
        gl_FragColor=vec4(light*uVisibility,1.0);
      }`
  })
  const sun = new THREE.Mesh(new THREE.PlaneGeometry(11, 11), sunMaterial)
  sun.position.set(2.2, 2.1, -13)
  sun.renderOrder = -1
  root.add(sun)
  // Keep the visible source, cast shadows, and Earth illumination aligned.
  const sunlight = new THREE.DirectionalLight(0xfff3dd, 18)
  sunlight.position.copy(sun.position)
  sunlight.target.position.set(1.35, -0.1, 0)
  sunlight.castShadow = true
  sunlight.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048)
  Object.assign(sunlight.shadow.camera, {
    left: -4,
    right: 4,
    top: 4,
    bottom: -4,
    near: 0.5,
    far: 32
  })
  sunlight.shadow.bias = -0.00015
  sunlight.shadow.normalBias = 0.015
  root.add(sunlight, sunlight.target)

  return {
    sunlight,
    update(profile, chapter, mobile, spacecraftPosition) {
      backdrop.uniforms.uGlow.value = profile.glow
      backdrop.uniforms.uChapter.value = chapter
      starLayers.forEach((stars, index) => {
        stars.rotation.y = chapter * (index ? 0.045 : 0.018)
        stars.rotation.z = chapter * 0.008
        stars.material.opacity =
          profile.stars * (1 - profile.grid * 0.85) * (index ? 0.65 : 0.42)
      })
      planet.visible = profile.earth > 0.005
      planet.position.set(mobile ? 3.7 : 4.7, -5.4, -9)
      planet.scale.setScalar(1)
      atmosphereMaterial.uniforms.uPlanetScale.value = 1
      setSunPosition(sun.position, profile.sunSweep, spacecraftPosition)
      sunlight.position.copy(sun.position)
      sunlight.target.position.copy(spacecraftPosition)
      atmosphereMaterial.uniforms.uSunDirection.value
        .copy(sun.position)
        .sub(planet.position)
        .normalize()
      sunMaterial.uniforms.uVisibility.value = profile.earth
      sun.visible = profile.earth > 0.005
      sunlight.intensity = THREE.MathUtils.lerp(18, 4.2, profile.sunSweep)
      planet.rotation.y = 0
      sphere.rotation.y = 2.6
      earthMaterial.opacity = profile.earth * 0.85
      atmosphereMaterial.uniforms.uOpacity.value = profile.earth
      atmosphereMaterial.uniforms.uPlanetCenter.value.copy(planet.position)
    },
    dispose() {
      sunlight.shadow.dispose()
      texture.dispose()
      root.traverse(node => {
        node.geometry?.dispose()
        if (node.material) node.material.dispose()
      })
      root.removeFromParent()
    }
  }
}
