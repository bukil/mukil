import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Simple Three.js attractors particle system with OrbitControls and AxesHelper
export default function AttractorsCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return
    let animationId

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    const width = mountRef.current.clientWidth
    const height = mountRef.current.clientHeight

    const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 200)
    camera.position.set(3, 5, 8)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    mountRef.current.appendChild(renderer.domElement)

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambient)
    const dir = new THREE.DirectionalLight(0xffffff, 1.2)
    dir.position.set(4, 2, 0)
    scene.add(dir)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.minDistance = 0.1
    controls.maxDistance = 50

  // Axes removed per request

    // Attractors (positions + helpers)
    const attractors = [
      { position: new THREE.Vector3(-1, 0, 0), axis: new THREE.Vector3(0, 1, 0) },
      { position: new THREE.Vector3(1, 0, -0.5), axis: new THREE.Vector3(0, 1, 0) },
      { position: new THREE.Vector3(0, 0.5, 1), axis: new THREE.Vector3(1, 0, -0.5).normalize() }
    ]

    // Helper visuals removed per request

    // Particles
    const COUNT = 12000 // keep reasonable for CPU update
    const positions = new Float32Array(COUNT * 3)
    const velocities = new Float32Array(COUNT * 3)
    const tmpVec3 = new THREE.Vector3()
    const velVec = new THREE.Vector3()

    // Init positions and velocities
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      positions[i3 + 0] = (Math.random() - 0.5) * 5
      positions[i3 + 1] = (Math.random() - 0.5) * 0.5
      positions[i3 + 2] = (Math.random() - 0.5) * 5

      // random small velocity
      velocities[i3 + 0] = (Math.random() - 0.5) * 0.05
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.05
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.05
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color: 0x7f80ff,
      size: 0.02,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })

  const points = new THREE.Points(geometry, material)
  const pointsGroup = new THREE.Group()
  pointsGroup.add(points)
  scene.add(pointsGroup)

    // Simulation params
  const GRAVITY_CONST = 6.67e-5 // reduced so particles don't get absorbed
    const ATTR_MASS = 1e3
    const GLOBAL_MASS = 1e1
  const MAX_SPEED = 0.2
  const DAMPING = 0.02
  const BOUNDS = 8
  const HALF = BOUNDS * 0.5
  const TIME_SCALE = 1
  const SOFTENING = 0.2 // softens near-field gravity
  const REPEL_RADIUS = 0.4
  const REPEL_STRENGTH = 0.002
  const SPIN_FACTOR = 2.0

    let last = performance.now()

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const now = performance.now()
      let dt = Math.min((now - last) / 1000, 1 / 30) * TIME_SCALE
      last = now

      // Update particles CPU-side
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3
        tmpVec3.set(positions[i3], positions[i3 + 1], positions[i3 + 2])
        velVec.set(velocities[i3], velocities[i3 + 1], velocities[i3 + 2])

        // Force from attractors
        attractors.forEach(a => {
          const toAttr = new THREE.Vector3().subVectors(a.position, tmpVec3)
          const dist = Math.max(toAttr.length(), 0.001)
          const dir = toAttr.clone().divideScalar(dist)
          const distSqSoft = dist * dist + SOFTENING * SOFTENING
          const gravityStrength = (GRAVITY_CONST * ATTR_MASS * GLOBAL_MASS) / distSqSoft
          // gravity (softened)
          velVec.addScaledVector(dir, gravityStrength * dt)
          // simple spin around axis (stronger to keep orbiting)
          const spin = new THREE.Vector3().copy(a.axis).multiplyScalar(gravityStrength * SPIN_FACTOR)
          const spinningVel = new THREE.Vector3().crossVectors(spin, toAttr)
          velVec.addScaledVector(spinningVel, dt)
          // near-field repulsion to avoid absorption
          if (dist < REPEL_RADIUS) {
            const repel = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
            velVec.addScaledVector(dir.clone().multiplyScalar(-1), repel)
          }
        })

        // damping and clamp
        velVec.multiplyScalar(1 - DAMPING)
        const speed = velVec.length()
        if (speed > MAX_SPEED) velVec.multiplyScalar(MAX_SPEED / speed)

        // integrate
        tmpVec3.addScaledVector(velVec, dt)

  // bounce at bounds (avoid teleporting/disappearing)
  if (tmpVec3.x > HALF) { tmpVec3.x = HALF; velVec.x *= -0.9 }
  if (tmpVec3.x < -HALF) { tmpVec3.x = -HALF; velVec.x *= -0.9 }
  if (tmpVec3.y > HALF) { tmpVec3.y = HALF; velVec.y *= -0.9 }
  if (tmpVec3.y < -HALF) { tmpVec3.y = -HALF; velVec.y *= -0.9 }
  if (tmpVec3.z > HALF) { tmpVec3.z = HALF; velVec.z *= -0.9 }
  if (tmpVec3.z < -HALF) { tmpVec3.z = -HALF; velVec.z *= -0.9 }

        // write back
        positions[i3] = tmpVec3.x
        positions[i3 + 1] = tmpVec3.y
        positions[i3 + 2] = tmpVec3.z
        velocities[i3] = velVec.x
        velocities[i3 + 1] = velVec.y
        velocities[i3 + 2] = velVec.z
      }

      geometry.attributes.position.needsUpdate = true

      // gentle group rotation to keep motion engaging
      pointsGroup.rotation.y += 0.15 * dt

      controls.update()
      renderer.render(scene, camera)
    }

    // Resize
    const onResize = () => {
      const w = mountRef.current?.clientWidth || window.innerWidth
      const h = mountRef.current?.clientHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    animate()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', onResize)
      controls.dispose()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100vh', position: 'relative' }}
    />
  )
}
