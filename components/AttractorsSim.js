/*
  AttractorsSim
  - Three.js particle simulation inspired by WebGPU Attractors Particles
  - Uses Points + GPU-accelerated shader material where available
  - Falls back to CPU updates if needed
  - lil-gui controls to match typical attractor demos
*/

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import GUI from 'lil-gui'

const PRESETS = {
  Lorenz: { a: 10, b: 28, c: 8/3 },
}

export default function AttractorsSim({ guiContainerRef }) {
  const mountRef = useRef(null)
  const guiRef = useRef(null)
  const cleanupRef = useRef(() => {})

  useEffect(() => {
    if (!mountRef.current) return

  const container = mountRef.current
  const width = window.innerWidth
  const height = window.innerHeight

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(0, 0, 120)

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    // Particles
    let params = {
      count: 50000,
      speed: 1.0,
      dt: 0.005,
      strength: 1.0,
      noise: 0.0,
      palette: '#89EF8C',
      trails: 0.92,
      computeFraction: 1.0,
      followMouse: true,
      followFactor: 1.0,
      pause: false,
      reset: () => resetParticles(),
    }

  const positions = new Float32Array(params.count * 3)
  const velocities = new Float32Array(params.count * 3)
  let noiseData = new Float32Array(params.count * 3)

    const randInSphere = (r = 1) => {
      const u = Math.random()
      const v = Math.random()
      const theta = 2 * Math.PI * u
      const phi = Math.acos(2 * v - 1)
      const rr = r * Math.cbrt(Math.random())
      return [
        rr * Math.sin(phi) * Math.cos(theta),
        rr * Math.sin(phi) * Math.sin(theta),
        rr * Math.cos(phi),
      ]
    }

    const setInitial = () => {
      for (let i = 0; i < params.count; i++) {
        const [x, y, z] = randInSphere(10)
        positions[i * 3] = x
        positions[i * 3 + 1] = y
        positions[i * 3 + 2] = z
        velocities[i * 3] = 0
        velocities[i * 3 + 1] = 0
        velocities[i * 3 + 2] = 0
      }
    }

  const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geom.attributes.position.setUsage(THREE.DynamicDrawUsage)

    const material = new THREE.PointsMaterial({
      size: 0.05,
      color: new THREE.Color(params.palette),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

  const points = new THREE.Points(geom, material)
  points.frustumCulled = false
    scene.add(points)

    // Trails via render-to-texture style accumulation
    renderer.autoClear = false
    const clearColor = new THREE.Color(0x000000)

    // GUI
    const guiOptions = { width: 320 }
    if (guiContainerRef && guiContainerRef.current) {
      guiOptions.container = guiContainerRef.current
    }
    const gui = new GUI(guiOptions)
    guiRef.current = gui
  const fSim = gui.addFolder('Simulation')
    fSim.add(params, 'count', 1000, 150000, 1000).name('Particles').onFinishChange(rebuild)
    fSim.add(params, 'speed', 0.1, 4.0, 0.1)
    fSim.add(params, 'dt', 0.001, 0.02, 0.001).name('Time Step')
    fSim.add(params, 'strength', 0.1, 4.0, 0.1)
    fSim.add(params, 'noise', 0.0, 1.0, 0.01)
    fSim.addColor(params, 'palette').name('Color').onChange((v)=> material.color.set(v))
    fSim.add(params, 'trails', 0.8, 0.99, 0.005)
  fSim.add(params, 'computeFraction', 0.25, 1.0, 0.05).name('Compute %')
    fSim.add(params, 'followMouse').name('Follow Mouse')
    fSim.add(params, 'followFactor', 0.1, 3.0, 0.1).name('Follow Strength')
    fSim.add(params, 'pause').name('Pause')
    fSim.add(params, 'reset').name('Reset')

    const resetParticles = () => {
      setInitial()
      geom.attributes.position.needsUpdate = true
    }

    function rebuild() {
      // Rebuild buffers when count changes
      geom.dispose()
      const newPositions = new Float32Array(params.count * 3)
      const newVelocities = new Float32Array(params.count * 3)
      noiseData = new Float32Array(params.count * 3)
      for (let i = 0; i < params.count; i++) {
        const [x, y, z] = randInSphere(10)
        newPositions[i * 3] = x
        newPositions[i * 3 + 1] = y
        newPositions[i * 3 + 2] = z
        newVelocities[i * 3] = 0
        newVelocities[i * 3 + 1] = 0
        newVelocities[i * 3 + 2] = 0
        // precompute static noise seeds
        const j = i * 3
        noiseData[j] = Math.random() - 0.5
        noiseData[j + 1] = Math.random() - 0.5
        noiseData[j + 2] = Math.random() - 0.5
      }
      geom.setAttribute('position', new THREE.BufferAttribute(newPositions, 3))
      geom.attributes.position.setUsage(THREE.DynamicDrawUsage)
      material.color.set(params.palette)
    }

    setInitial()
    // initialize noise seeds
    for (let i = 0; i < params.count * 3; i++) noiseData[i] = Math.random() - 0.5

    // Mouse interaction (orbit-like attraction to pointer)
    const mouse = new THREE.Vector2(0, 0)
    const raycaster = new THREE.Raycaster()
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const mousePoint = new THREE.Vector3()

    const onMouseMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      raycaster.ray.intersectPlane(plane, mousePoint)
    }
    window.addEventListener('mousemove', onMouseMove)

    // Attractor systems
    function stepLorenz(x, y, z, dt, a, b, c) {
      const dx = a * (y - x)
      const dy = x * (b - z) - y
      const dz = x * y - c * z
      return [
        x + dx * dt,
        y + dy * dt,
        z + dz * dt,
      ]
    }

    // Removed Aizawa and Thomas attractors; keeping only Lorenz

    // Animation loop
    let cursorIndex = 0
    function animate() {
      // Trails: draw a transparent rect to fade previous frame
      renderer.setClearColor(clearColor, 1)
      renderer.clear()
      renderer.setClearColor(clearColor, 1 - params.trails)
      renderer.clearColor()

      if (!params.pause) {
        const pos = geom.attributes.position.array
        const s = params.speed
        const dt = params.dt * s
        const strength = params.strength
        const n = params.noise

        const computeCount = Math.max(1, Math.floor(params.count * params.computeFraction))
        let i = 0
        // update in two segments if wraps around
        const start = cursorIndex
        const end = (start + computeCount)
        const updateParticle = (idx) => {
          const i3 = idx * 3
          let x = pos[i3]
          let y = pos[i3 + 1]
          let z = pos[i3 + 2]

          // gentle attraction to mousePoint when not fully following
          if (!params.followMouse) {
            const dxm = mousePoint.x - x
            const dym = mousePoint.y - y
            const dzm = mousePoint.z - z
            x += dxm * 0.001 * strength
            y += dym * 0.001 * strength
            z += dzm * 0.001 * strength
          }

          // add tiny noise (precomputed per-particle)
          x += noiseData[i3] * n * 0.01
          y += noiseData[i3 + 1] * n * 0.01
          z += noiseData[i3 + 2] * n * 0.01

          // attractor step (Lorenz only), optionally in mouse-centered coordinates
          if (params.followMouse) {
            // transform to local coords around mouse
            let lx = x - mousePoint.x
            let ly = y - mousePoint.y
            let lz = z - mousePoint.z
            {
              const { a, b, c } = PRESETS.Lorenz
              ;[lx, ly, lz] = stepLorenz(lx, ly, lz, dt * params.followFactor, a, b, c)
            }
            // back to world space centered at mouse
            x = lx + mousePoint.x
            y = ly + mousePoint.y
            z = lz + mousePoint.z
          } else {
            const { a, b, c } = PRESETS.Lorenz
            ;[x, y, z] = stepLorenz(x, y, z, dt, a, b, c)
          }

          pos[i3] = x
          pos[i3 + 1] = y
          pos[i3 + 2] = z
        }

        // segment 1
        for (i = start; i < Math.min(end, params.count); i++) updateParticle(i)
        // segment 2 (wrap)
        if (end > params.count) {
          for (i = 0; i < end - params.count; i++) updateParticle(i)
        }
        cursorIndex = (end >= params.count) ? (end - params.count) : end
        geom.attributes.position.needsUpdate = true
      }

      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    // If GUI is inside a container, ensure it scrolls with layout
    let styleEl
    if (guiContainerRef && guiContainerRef.current) {
      styleEl = document.createElement('style')
      styleEl.textContent = `
        .lil-gui {
          position: relative !important;
          top: auto !important;
          right: auto !important;
          left: auto !important;
          bottom: auto !important;
          margin-top: 8px !important;
          z-index: auto !important;
        }
      `
      guiContainerRef.current.appendChild(styleEl)
    }

    cleanupRef.current = () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      gui.destroy()
      if (styleEl && styleEl.parentNode) styleEl.parentNode.removeChild(styleEl)
      renderer.dispose()
      container.removeChild(renderer.domElement)
      geom.dispose()
      material.dispose()
    }

    return () => {
      cleanupRef.current()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0 }}
    />
  )
}
