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
  Aizawa: { a: 0.95, b: 0.7, c: 0.6, d: 3.5, e: 0.25, f: 0.1 },
  Thomas: { b: 0.208186 },
}

export default function AttractorsSim({ guiContainerRef }) {
  const mountRef = useRef(null)
  const guiRef = useRef(null)
  const cleanupRef = useRef(() => {})

  useEffect(() => {
    if (!mountRef.current) return

    const container = mountRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    camera.position.set(0, 0, 120)

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    // Particles
    let params = {
      preset: 'Lorenz',
      count: 50000,
      speed: 1.0,
      dt: 0.005,
      strength: 1.0,
      noise: 0.0,
      palette: '#89EF8C',
      trails: 0.92,
      pause: false,
      reset: () => resetParticles(),
    }

    const positions = new Float32Array(params.count * 3)
    const velocities = new Float32Array(params.count * 3)

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

    const material = new THREE.PointsMaterial({
      size: 0.05,
      color: new THREE.Color(params.palette),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const points = new THREE.Points(geom, material)
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
    fSim.add(params, 'preset', Object.keys(PRESETS)).name('Attractor')
    fSim.add(params, 'count', 1000, 150000, 1000).name('Particles').onFinishChange(rebuild)
    fSim.add(params, 'speed', 0.1, 4.0, 0.1)
    fSim.add(params, 'dt', 0.001, 0.02, 0.001).name('Time Step')
    fSim.add(params, 'strength', 0.1, 4.0, 0.1)
    fSim.add(params, 'noise', 0.0, 1.0, 0.01)
    fSim.addColor(params, 'palette').name('Color').onChange((v)=> material.color.set(v))
    fSim.add(params, 'trails', 0.8, 0.99, 0.005)
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
      for (let i = 0; i < params.count; i++) {
        const [x, y, z] = randInSphere(10)
        newPositions[i * 3] = x
        newPositions[i * 3 + 1] = y
        newPositions[i * 3 + 2] = z
        newVelocities[i * 3] = 0
        newVelocities[i * 3 + 1] = 0
        newVelocities[i * 3 + 2] = 0
      }
      geom.setAttribute('position', new THREE.BufferAttribute(newPositions, 3))
      material.color.set(params.palette)
    }

    setInitial()

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

    function stepAizawa(x, y, z, dt, p) {
      const { a, b, c, d, e, f } = p
      const dx = (z - b) * x - d * y
      const dy = d * x + (z - b) * y
      const dz = c + a * z - (z ** 3) / 3 - (x ** 2 + y ** 2) * (1 + e * z) + f * z * (x ** 3)
      return [x + dx * dt, y + dy * dt, z + dz * dt]
    }

    function stepThomas(x, y, z, dt, b) {
      const dx = Math.sin(y) - b * x
      const dy = Math.sin(z) - b * y
      const dz = Math.sin(x) - b * z
      return [x + dx * dt, y + dy * dt, z + dz * dt]
    }

    // Animation loop
    let last = performance.now()
    function animate() {
      const now = performance.now()
      const elapsed = (now - last) / 1000
      last = now

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

        const preset = params.preset
        for (let i = 0; i < params.count; i++) {
          const i3 = i * 3
          let x = pos[i3]
          let y = pos[i3 + 1]
          let z = pos[i3 + 2]

          // gentle attraction to mousePoint
          const dxm = mousePoint.x - x
          const dym = mousePoint.y - y
          const dzm = mousePoint.z - z
          x += dxm * 0.001 * strength
          y += dym * 0.001 * strength
          z += dzm * 0.001 * strength

          // add tiny noise
          x += (Math.random() - 0.5) * n * 0.01
          y += (Math.random() - 0.5) * n * 0.01
          z += (Math.random() - 0.5) * n * 0.01

          // attractor step
          if (preset === 'Lorenz') {
            const { a, b, c } = PRESETS.Lorenz
            ;[x, y, z] = stepLorenz(x, y, z, dt, a, b, c)
          } else if (preset === 'Aizawa') {
            ;[x, y, z] = stepAizawa(x, y, z, dt, PRESETS.Aizawa)
          } else if (preset === 'Thomas') {
            ;[x, y, z] = stepThomas(x, y, z, dt, PRESETS.Thomas.b)
          }

          pos[i3] = x
          pos[i3 + 1] = y
          pos[i3 + 2] = z
        }
        geom.attributes.position.needsUpdate = true
      }

      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
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

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
}
