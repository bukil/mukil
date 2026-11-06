import * as THREE from 'three'

// One instanced draw: depth-layered streaks run opposite the tracked spacecraft.
export function createOrbitalFlight(scene, mobile) {
  const base = new THREE.PlaneGeometry(1, 1)
  const geometry = new THREE.InstancedBufferGeometry().copy(base)
  base.dispose()
  const count = mobile ? 180 : 360
  const seeds = new Float32Array(count * 4)
  let seed = 721
  const random = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296
  for (let i = 0; i < count; i++)
    seeds.set([random(), random(), random(), random()], i * 4)
  geometry.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 4))
  geometry.instanceCount = count
  const uniforms = {
    uTime: { value: 0 },

    uStretch: { value: 0 },
    uOpacity: { value: 0 },
    uHeight: { value: 900 },
    uTravel: { value: 0 }
  }
  const material = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthTest: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `attribute vec4 aSeed;
      uniform float uTime,uStretch,uHeight,uTravel;
      varying vec2 vUv; varying float vDepth; varying float vTint;
      void main(){
        vUv=uv;vDepth=0.25+aSeed.z*0.75;vTint=aSeed.w;
        float travel=uTime*(0.45+aSeed.z*0.65)+uTravel;
        float x=(fract(aSeed.x-travel)*2.0-1.0)*1.65;
        float y=(aSeed.y*2.0-1.0)*1.15;
        float length=0.006+(0.035+uStretch*0.45)*vDepth;
        vec2 p=vec2(x,y)+vec2(position.x*length,position.y*(1.2+2.0*vDepth)*2.0/uHeight);
        p.y+=p.x*0.10;
        gl_Position=vec4(p,0.999,1.0);
      }`,
    fragmentShader: `uniform float uOpacity;varying vec2 vUv;varying float vDepth;varying float vTint;
      void main(){
        float width=1.0-smoothstep(0.05,0.5,abs(vUv.y-0.5));
        float tail=pow(vUv.x,1.7)*(1.0-smoothstep(0.92,1.0,vUv.x));
        vec3 color=mix(vec3(0.26,0.55,1.0),vec3(0.85,0.95,1.0),vTint);
        if(vTint>0.96)color=vec3(1.0,0.65,0.3);
        gl_FragColor=vec4(color*1.6,width*tail*uOpacity*(0.2+vDepth*0.7));
      }`
  })
  const trails = new THREE.Mesh(geometry, material)
  trails.frustumCulled = false
  trails.renderOrder = -80
  trails.visible = false
  trails.name = 'Orbital flight star trails'
  scene.add(trails)
  return {
    update(flight, time, chapter, height) {
      uniforms.uTime.value = time
      uniforms.uStretch.value = flight.stretch
      uniforms.uOpacity.value = flight.speed
      uniforms.uHeight.value = height
      uniforms.uTravel.value = Math.max(0, chapter - 2) * 1.8
      trails.visible = flight.speed > 0.001
    },
    dispose() {
      geometry.dispose()
      material.dispose()
      trails.removeFromParent()
    }
  }
}
