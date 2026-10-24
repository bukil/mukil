/*
  AttractorsSim
  - Three.js particle simulation inspired by Lorenz Attractor
  - Bright / White theme edition: anchored in bottom-left corner with large radius
  - Vibrant jade/emerald particles on crisp white background with smooth fading trails
  - Slow, graceful meditative pace
  - Accessible, performant, zero GUI clutter
*/

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PRESETS = {
  Lorenz: { a: 10, b: 28, c: 8 / 3 },
}

// Generate smooth circular particle sprite optimized for white background
function createCircleTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')

  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  grad.addColorStop(0, 'rgba(4, 120, 87, 0.95)') // Rich deep emerald core
  grad.addColorStop(0.35, 'rgba(5, 150, 105, 0.8)')
  grad.addColorStop(0.7, 'rgba(16, 185, 129, 0.3)')
  grad.addColorStop(1, 'rgba(16, 185, 129, 0)')

  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 128, 128)

  const texture = new THREE.CanvasTexture(canvas)
  texture.generateMipmaps = false
  texture.minFilter = THREE.LinearFilter
  return texture
}

export default function AttractorsSim() {
  const mountRef = useRef(null)
  const canvasRef = useRef(null)
  const cleanupRef = useRef(() => {})

  useEffect(() => {
    if (!mountRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    let width = window.innerWidth
    let height = window.innerHeight

    // Scene setup with pure white background
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    const aspect = width / height
    const viewSize = 25
    const camera = new THREE.OrthographicCamera(
      -viewSize * aspect,
      viewSize * aspect,
      viewSize,
      -viewSize,
      0.1,
      1000
    )
    camera.position.set(0, 0, 120)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(width, height)

    // Particles configuration
    const params = {
      count: 8500, // Balanced count across the larger radius
      speed: 0.14, // Slow, peaceful flow
      dt: 0.003,
      strength: 1.0,
      noise: 0.02,
      size: 20, // Big glowing orbs
      trails: 0.55, // Smooth fading trails toward white
      computeFraction: 1.0,
      spawnRadius: 75, // Large expansive radius
    }

    const positions = new Float32Array(params.count * 3)
    const noiseData = new Float32Array(params.count * 3)

    const randInSphere = (r = 1) => {
      const theta = 2 * Math.PI * Math.random()
      const rr = r * Math.sqrt(Math.random())
      return [rr * Math.cos(theta), rr * Math.sin(theta), (Math.random() - 0.5) * r]
    }

    const setInitial = () => {
      for (let i = 0; i < params.count; i++) {
        const [x, y, z] = randInSphere(params.spawnRadius)
        positions[i * 3] = x
        positions[i * 3 + 1] = y
        positions[i * 3 + 2] = z
        noiseData[i * 3] = Math.random() - 0.5
        noiseData[i * 3 + 1] = Math.random() - 0.5
        noiseData[i * 3 + 2] = (Math.random() - 0.5) * 0.5
      }
    }

    setInitial()

    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geom.attributes.position.setUsage(THREE.DynamicDrawUsage)

    const particleTexture = createCircleTexture()

    // NormalBlending on white background for high clarity and contrast
    const material = new THREE.PointsMaterial({
      size: params.size,
      map: particleTexture,
      color: new THREE.Color(0xffffff),
      transparent: true,
      opacity: 0.85,
      blending: THREE.NormalBlending,
      depthWrite: false,
    })

    const points = new THREE.Points(geom, material)
    points.frustumCulled = false
    // Scale up for an expansive radius across the screen
    points.scale.set(1.18, 1.18, 1.18)

    // Perspective angle so 3D orbital rings unroll cleanly
    points.rotation.set(0.38, -0.32, 0.18)

    // Position anchored in the left down corner (bottom-left)
    const updateCornerAnchor = (w, h) => {
      const a = w / h
      points.position.set(-viewSize * a * 0.44, -viewSize * 0.42, 0)
    }
    updateCornerAnchor(width, height)

    scene.add(points)

    // White clear color for trail fade on white background
    renderer.autoClear = false
    const clearColor = new THREE.Color(0xffffff)

    // Lorenz differential equations
    function stepLorenz(x, y, z, dt, a, b, c) {
      const dx = a * (y - x)
      const dy = x * (b - z) - y
      const dz = x * y - c * z
      return [x + dx * dt, y + dy * dt, z + dz * dt]
    }

    // Animation loop - fully autonomous, slow speed, no mouse tracking
    let animId = null
    let cursorIndex = 0

    function animate() {
      // Gentle fade towards white for clean particle clarity
      renderer.setClearColor(clearColor, 1 - params.trails)
      renderer.clearColor()

      const pos = geom.attributes.position.array
      const s = params.speed
      const dt = params.dt * s * params.strength
      const n = params.noise

      const computeCount = Math.max(1, Math.floor(params.count * params.computeFraction))
      const start = cursorIndex
      const end = start + computeCount

      const { a, b, c } = PRESETS.Lorenz

      const updateParticle = (idx) => {
        const i3 = idx * 3
        let x = pos[i3]
        let y = pos[i3 + 1]
        let z = pos[i3 + 2]

        // Subtle noise dispersion
        x += noiseData[i3] * n * 0.015
        y += noiseData[i3 + 1] * n * 0.015
        z += noiseData[i3 + 2] * n * 0.015

        ;[x, y, z] = stepLorenz(x, y, z, dt, a, b, c)

        pos[i3] = x
        pos[i3 + 1] = y
        pos[i3 + 2] = z
      }

      for (let i = start; i < Math.min(end, params.count); i++) updateParticle(i)
      if (end > params.count) {
        for (let i = 0; i < end - params.count; i++) updateParticle(i)
      }
      cursorIndex = end >= params.count ? end - params.count : end
      geom.attributes.position.needsUpdate = true

      // Slow organic rotation
      points.rotation.z += 0.00015

      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
      animId = requestAnimationFrame(animate)
    }

    animate()

    const onResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      renderer.setSize(width, height)
      const a = width / height
      camera.left = -viewSize * a
      camera.right = viewSize * a
      camera.top = viewSize
      camera.bottom = -viewSize
      camera.updateProjectionMatrix()
      updateCornerAnchor(width, height)
    }
    window.addEventListener('resize', onResize)

    cleanupRef.current = () => {
      if (animId) cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geom.dispose()
      material.dispose()
      particleTexture.dispose()
    }

    return () => {
      cleanupRef.current()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  )
}
