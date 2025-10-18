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
  const canvasRef = useRef(null)
  const guiRef = useRef(null)
  const cleanupRef = useRef(() => {})

  useEffect(() => {
    if (!mountRef.current || !canvasRef.current) return

  const canvas = canvasRef.current
  const width = window.innerWidth
  const height = window.innerHeight

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(0, 0, 120)

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(width, height)

    // Particles
    let params = {
      count: 50000,
      speed: 1.0,
      dt: 0.005,
      strength: 1.0,
      noise: 0.0,
      size: 0.32,
      palette: '#89EF8C',
      trails: 0.92,
      computeFraction: 1.0,
      showHandle: true,
      dragDepthRate: 0.25,
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
      size: params.size,
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
  fSim.add(params, 'size', 0.02, 0.3, 0.01).name('Point Size').onChange((v)=> { material.size = v })
    fSim.add(params, 'trails', 0.8, 0.99, 0.005)
  fSim.add(params, 'computeFraction', 0.25, 1.0, 0.05).name('Compute %')
    fSim.add(params, 'showHandle').name('Show Handle')
    fSim.add(params, 'dragDepthRate', 0.01, 1.0, 0.01).name('Depth Rate')
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

    // Mouse interaction (raycast against a plane for dragging center)
    const mouse = new THREE.Vector2(0, 0)
    const raycaster = new THREE.Raycaster()
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const mousePoint = new THREE.Vector3()

    // Attractor center + visual handle
    const attractorCenter = new THREE.Vector3(0, 0, 0)
    const handleGeom = new THREE.SphereGeometry(1.2, 16, 16)
    const handleMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, depthTest: false })
    const handle = new THREE.Mesh(handleGeom, handleMat)
    handle.position.copy(attractorCenter)
    scene.add(handle)
    let dragging = false

    const inGui = (target) => {
      if (guiContainerRef && guiContainerRef.current) return guiContainerRef.current.contains(target)
      return target && target.closest ? target.closest('.lil-gui') : false
    }

    const onMouseMove = (e) => {
  const rect = canvas.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      raycaster.ray.intersectPlane(plane, mousePoint)
      if (dragging) {
        attractorCenter.copy(mousePoint)
        handle.position.copy(attractorCenter)
      }
    }
    window.addEventListener('mousemove', onMouseMove)

    const onMouseDown = (e) => {
      if (inGui(e.target)) return
      dragging = true
      // initialize center to current mousePoint
  const rect = canvas.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      raycaster.ray.intersectPlane(plane, mousePoint)
      attractorCenter.copy(mousePoint)
      handle.position.copy(attractorCenter)
    }
    const onMouseUp = () => { dragging = false }
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    const onWheel = (e) => {
      if (!dragging) return
      if (inGui(e.target)) return
      e.preventDefault()
      const dz = (e.deltaY > 0 ? 1 : -1) * params.dragDepthRate
      attractorCenter.z += dz
      handle.position.z = attractorCenter.z
    }
    window.addEventListener('wheel', onWheel, { passive: false })

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
  const dt = params.dt * s * params.strength
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

          // add tiny noise (precomputed per-particle)
          x += noiseData[i3] * n * 0.01
          y += noiseData[i3 + 1] * n * 0.01
          z += noiseData[i3 + 2] * n * 0.01

          // attractor step (Lorenz only), centered around draggable attractorCenter
          let lx = x - attractorCenter.x
          let ly = y - attractorCenter.y
          let lz = z - attractorCenter.z
          {
            const { a, b, c } = PRESETS.Lorenz
            ;[lx, ly, lz] = stepLorenz(lx, ly, lz, dt, a, b, c)
          }
          x = lx + attractorCenter.x
          y = ly + attractorCenter.y
          z = lz + attractorCenter.z

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

  handle.visible = !!params.showHandle
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
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
  window.removeEventListener('wheel', onWheel)
      gui.destroy()
      if (styleEl && styleEl.parentNode) styleEl.parentNode.removeChild(styleEl)
      renderer.dispose()
      geom.dispose()
      material.dispose()
      handleGeom.dispose()
      handleMat.dispose()
    }

    return () => {
      cleanupRef.current()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0 }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  )
}
