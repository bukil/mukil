import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import Image from 'next/image'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { clone as cloneModel } from 'three/examples/jsm/utils/SkeletonUtils.js'
import { createC2CGlass } from './glass-material.mjs'
import { C2C_MODEL_URL } from './config.mjs'
import styles from '../../styles/C2C.module.css'

function disposeObject(object, extraMaterials = []) {
  const materials = new Set(extraMaterials),
    textures = new Set(),
    geometry = new Set()
  object.traverse(node => {
    if (node.geometry) geometry.add(node.geometry)
    for (const material of Array.isArray(node.material)
      ? node.material
      : [node.material]) {
      if (!material) continue
      materials.add(material)
      Object.values(material).forEach(value => {
        if (value?.isTexture) textures.add(value)
      })
    }
  })
  geometry.forEach(item => item.dispose())
  textures.forEach(item => item.dispose())
  materials.forEach(item => item.dispose())
}

function createStudy() {
  const group = new THREE.Group()
  const dark = new THREE.MeshPhysicalMaterial({
    color: 0x10372b,
    metalness: 0.32,
    roughness: 0.24,
    clearcoat: 1,
    clearcoatRoughness: 0.13
  })
  const cap = new THREE.MeshStandardMaterial({
    color: 0xe5e9e5,
    metalness: 0.65,
    roughness: 0.25
  })
  const pink = new THREE.MeshStandardMaterial({
    color: 0xd987ab,
    metalness: 0.1,
    roughness: 0.3
  })
  const box = new RoundedBoxGeometry(1.55, 1.55, 1.55, 4, 0.08)
  const primary = new THREE.Group()
  const body = new THREE.Mesh(box, dark)
  body.userData.c2cGlass = true
  primary.add(body)
  const plate = new THREE.Mesh(
    new RoundedBoxGeometry(1.48, 0.07, 1.48, 2, 0.03),
    cap
  )
  plate.position.y = 0.79
  primary.add(plate)
  const screen = document.createElement('canvas')
  screen.width = 512
  screen.height = 384
  const ctx = screen.getContext('2d')
  ctx.fillStyle = '#101b25'
  ctx.fillRect(0, 0, 512, 384)
  ctx.fillStyle = '#a0f6cf'
  ctx.font = 'bold 44px monospace'
  ctx.fillText('C2C', 28, 66)
  ctx.fillStyle = '#94b8b3'
  ctx.font = '23px monospace'
  ctx.fillText('READY TO CONNECT', 28, 110)
  ctx.fillStyle = '#e1fff0'
  ctx.font = 'bold 106px monospace'
  ctx.fillText('25:00', 24, 246)
  ctx.strokeStyle = '#59c994'
  ctx.lineWidth = 5
  ctx.strokeRect(28, 290, 452, 35)
  ctx.fillStyle = '#59c994'
  ctx.fillRect(34, 296, 285, 23)
  const texture = new THREE.CanvasTexture(screen)
  texture.colorSpace = THREE.SRGBColorSpace
  const display = new THREE.Mesh(
    new THREE.PlaneGeometry(1.12, 0.85),
    new THREE.MeshBasicMaterial({ map: texture })
  )
  display.rotation.x = -Math.PI / 2
  display.position.y = 0.831
  primary.add(display)
  for (let i = 0; i < 2; i++) {
    const button = new THREE.Mesh(
      new THREE.CylinderGeometry(0.19, 0.19, 0.07, 48),
      pink
    )
    if (i === 0) {
      button.rotation.x = Math.PI / 2
      button.position.set(0, 0.05, 0.81)
    } else {
      button.rotation.z = Math.PI / 2
      button.position.set(0.81, 0.05, 0)
    }
    primary.add(button)
  }
  const companion = primary.clone(true)
  primary.position.x = -0.85
  companion.position.x = 0.85
  group.add(primary, companion)
  return { group, primary, companion }
}

export default function CubeScene({ motionRef, controllerRef }) {
  const mountRef = useRef(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const mount = mountRef.current
    let disposed = false,
      frame = 0,
      inView = true,
      model
    let renderer, environment, observer, glass
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50)
    camera.position.z = 7.8
    const rig = new THREE.Group()
    scene.add(rig)
    const study = createStudy()
    let activePair = study
    rig.add(study.group)
    const render = () => {
      frame = 0
      if (disposed || !inView || document.hidden || !renderer) return
      const state = motionRef.current
      rig.rotation.set(state.tilt, state.turn, state.roll)
      rig.position.set(state.x, state.y, 0)
      rig.scale.setScalar(state.scale * (mount.clientWidth < 768 ? 1.5 : 1))
      activePair.companion.position.x = 0.85 + state.split * 0.5
      activePair.primary.position.x = -0.85 - state.split * 0.5
      glass?.capture(camera)
      renderer.render(scene, camera)
      mount.dataset.turn = state.turn.toFixed(3)
      mount.dataset.model = model ? 'glb' : 'study'
      mount.dataset.primaryScale = activePair.primary.scale.x.toFixed(4)
      mount.dataset.companionScale = activePair.companion.scale.x.toFixed(4)
    }
    const invalidate = () => {
      if (!disposed && !frame && inView && !document.hidden)
        frame = requestAnimationFrame(render)
    }
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setClearColor(0x000000, 0)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.25
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.domElement.setAttribute('aria-hidden', 'true')
      mount.appendChild(renderer.domElement)
      const pmrem = new THREE.PMREMGenerator(renderer)
      const room = new RoomEnvironment()
      environment = pmrem.fromScene(room, 0.03)
      scene.environment = environment.texture
      scene.environmentIntensity = 1.6
      room.dispose()
      pmrem.dispose()
      const key = new THREE.DirectionalLight(0xfff7e9, 4)
      key.position.set(-4, 6, 7)
      const fill = new THREE.DirectionalLight(0xc8f8df, 2.5)
      fill.position.set(5, 2, -3)
      scene.add(key, fill, new THREE.AmbientLight(0xffffff, 0.7))
      glass = createC2CGlass(renderer, scene, mount)
      glass.apply(study.group, true)
      const resize = () => {
        const { width, height } = mount.getBoundingClientRect()
        if (!width || !height) return
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
        renderer.setSize(width, height)
        camera.aspect = width / height
        camera.position.z = width < 768 ? 11.8 : 7.8
        camera.updateProjectionMatrix()
        invalidate()
      }
      observer = new ResizeObserver(resize)
      observer.observe(mount)
      resize()
      controllerRef.current = { invalidate }
      setReady(true)
      if (C2C_MODEL_URL)
        new GLTFLoader().load(
          C2C_MODEL_URL,
          gltf => {
            if (disposed) {
              disposeObject(gltf.scene)
              return
            }
            const source = gltf.scene
            const bounds = new THREE.Box3().setFromObject(source)
            const center = bounds.getCenter(new THREE.Vector3())
            const size = bounds.getSize(new THREE.Vector3())
            const primary = new THREE.Group()
            source.position.sub(center)
            primary.add(source)
            primary.scale.setScalar(
              1.65 / Math.max(size.x, size.y, size.z, 0.0001)
            )
            const companion = cloneModel(primary)
            primary.position.x = -0.85
            companion.position.x = 0.85
            model = new THREE.Group()
            model.add(primary, companion)
            activePair = { group: model, primary, companion }
            glass.apply(model)
            rig.remove(study.group)
            rig.add(model)
            invalidate()
          },
          undefined,
          () => {
            mount.dataset.model = 'study-fallback'
          }
        )
    } catch {
      setReady(false)
    }
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      if (inView) invalidate()
    })
    visibility.observe(mount)
    document.addEventListener('visibilitychange', invalidate)
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer?.disconnect()
      visibility.disconnect()
      document.removeEventListener('visibilitychange', invalidate)
      controllerRef.current = null
      const retired = new THREE.Group()
      retired.add(study.group)
      if (model) retired.add(model)
      disposeObject(retired, glass?.originals)
      glass?.dispose()
      environment?.dispose()
      renderer?.dispose()
      renderer?.domElement.remove()
    }
  }, [motionRef, controllerRef])
  return (
    <div
      className={styles.scene}
      ref={mountRef}
      role="img"
      aria-label="C2C cube study rotating with the page scroll"
    >
      {!ready && (
        <Image
          src="/images/c2c/prototype.webp"
          alt="C2C prototype"
          width={1200}
          height={1200}
          className={styles.sceneFallback}
        />
      )}
    </div>
  )
}
