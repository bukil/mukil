import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import Image from 'next/image'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Holo } from './holospot/holo'
import { C2C_MODEL_URL } from './config.mjs'
import styles from '../../styles/C2C.module.css'

const foilStickers = [
  { name: 'IIT Bombay', logo: 'iit-bombay', x: 29, y: 33, width: 31, height: 31, foil: 'concentric' },
  { name: 'IDC', logo: 'idc', x: 50, y: 70, width: 67, height: 14, foil: 'linear' },
  { name: 'M', logo: 'm', x: 71, y: 33, width: 28, height: 28, foil: 'radial' }
]

const finishSettings = {
  prism: { 'prism.pattern': 'linear', 'prism.sigTheta': 0.9 },
  shatter: { 'shatter.size': 1.2, 'shatter.jitter': 1, 'shatter.chords': 2.3 },
  vortex: { 'vortex.bands': 0, 'vortex.waviness': 0.5 },
  sparkle: { 'sparkle.size': 170, 'sparkle.irregularity': 0.95 },
  nebula: { 'nebula.size': 105, 'nebula.starSize': 350 },
  volume: {
    'volume.subject': '/c2c/holospot/holo3d/iit-bombay-idc.sdf',
    'volume.type': 'rainbow',
    'volume.size': 65,
    'volume.slit': 18,
    'volume.depth': -3,
    'volume.efficiency': 1,
    'volume.backdrop': 'none'
  },
  emboss: {
    'emboss.doc': JSON.stringify({
      v: 1,
      e: foilStickers.map(({ name, logo, ...placement }) => ({
        i: logo,
        t: 'f',
        n: name,
        p: { ...placement, logo: `/logos/${logo}.svg`, foilCoverage: 1, gloss: 0.75 }
      }))
    })
  }
}
const finishes = Object.keys(finishSettings)

function chooseFinish() {
  const key = 'c2c-last-finish'
  let previous
  try { previous = window.localStorage.getItem(key) } catch {}
  const choices = finishes.filter(finish => finish !== previous)
  const finish = choices[Math.floor(Math.random() * choices.length)]
  try { window.localStorage.setItem(key, finish) } catch {}
  return finish
}

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

const displayModes = [
  {
    label: 'HELLO!',
    color: '#bce6cc',
    pixels: ['.........', '..#...#..', '..#...#..', '.........', '.#.....#.', '..#####..']
  },
  {
    label: 'PLAY TIME',
    color: '#eecde1',
    pixels: ['..##.##..', '.#######.', '.#######.', '..#####..', '...###...', '....#....']
  },
  {
    label: 'TAKE A BREAK',
    color: '#e8d883',
    pixels: ['..#####..', '...#.#...', '....#....', '...#.#...', '..#####..', '.........']
  },
  {
    label: 'NICE WORK!',
    color: '#bce6cc',
    pixels: ['....#....', '...###...', '.#######.', '..#####..', '..##.##..', '.#.....#.']
  }
]

function drawScreen(ctx, mode, frame) {
  const { label, color, pixels } = displayModes[mode]

  ctx.fillStyle = '#102b23'
  ctx.fillRect(0, 0, 96, 72)
  ctx.fillStyle = color
  const bob = frame % 2
  pixels.forEach((row, y) => {
    for (const [x, pixel] of [...row].entries()) {
      if (pixel === '#') ctx.fillRect(30 + x * 4, 14 + y * 4 + bob, 4, 4)
    }
  })

  ctx.font = 'bold 9px monospace'
  ctx.textAlign = 'center'
  ctx.fillText(label, 48, 57)
}

function createStudioEnvironment(renderer) {
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envScene = new THREE.Scene()
  envScene.background = new THREE.Color(0x060c09)

  const keySoftbox = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 5),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  )
  keySoftbox.position.set(-3, 6, 5)
  keySoftbox.lookAt(0, 0, 0)

  const warmSoftbox = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 4),
    new THREE.MeshBasicMaterial({ color: 0xffb86c })
  )
  warmSoftbox.position.set(-6, 2, -4)
  warmSoftbox.lookAt(0, 0, 0)

  const coolSoftbox = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 6),
    new THREE.MeshBasicMaterial({ color: 0x70d8ff })
  )
  coolSoftbox.position.set(6, 3, 2)
  coolSoftbox.lookAt(0, 0, 0)

  const topStrip = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 0.6),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  )
  topStrip.position.set(0, 5, 2)
  topStrip.lookAt(0, 0, 0)

  envScene.add(keySoftbox, warmSoftbox, coolSoftbox, topStrip)

  const envMap = pmrem.fromScene(envScene, 0.04)
  pmrem.dispose()
  keySoftbox.geometry.dispose()
  keySoftbox.material.dispose()
  warmSoftbox.geometry.dispose()
  warmSoftbox.material.dispose()
  coolSoftbox.geometry.dispose()
  coolSoftbox.material.dispose()
  topStrip.geometry.dispose()
  topStrip.material.dispose()

  return envMap
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
  const pink = new THREE.MeshStandardMaterial({
    color: 0xd987ab,
    metalness: 0.1,
    roughness: 0.3
  })
  const box = new RoundedBoxGeometry(1.55, 1.55, 1.55, 10, 0.13)

  // ── LEFT CUBE (Primary — active display with rich interface animations) ──
  const primary = new THREE.Group()
  const body = new THREE.Mesh(box, dark)
  body.userData.c2cGlass = true
  primary.add(body)

  const screen = document.createElement('canvas')
  screen.width = 96
  screen.height = 72
  const ctx = screen.getContext('2d')
  drawScreen(ctx, 0, 0)

  const texture = new THREE.CanvasTexture(screen)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.minFilter = THREE.NearestFilter
  texture.magFilter = THREE.NearestFilter
  texture.generateMipmaps = false

  const display = new THREE.Mesh(
    new THREE.PlaneGeometry(1.12, 0.85),
    new THREE.MeshBasicMaterial({ map: texture })
  )
  display.rotation.x = -Math.PI / 2
  display.position.y = 0.777
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

  const companion = new THREE.Group()
  const textFocusDepth = { value: 0 }
  const faceGeometry = new THREE.PlaneGeometry(1.55, 1.55)
  const faces = [
    ['Design for all.', ['Make controls easy to find', 'and feedback easy to perceive.'], 'Offer more than one way to act.', 0, 0],
    ['Explore freely.', ['Give people room to try', 'an input and see what it does.'], 'Make it easy to go back.', 0, Math.PI / 2],
    ['Turn to act.', ['Map a physical gesture', 'to a predictable digital action.'], 'Keep the mapping consistent.', 0, Math.PI],
    ['Show the result.', ['Make each state visible', 'as soon as an input registers.'], 'Confirm the action at the point of use.', 0, -Math.PI / 2],
    ['Invite play.', ['Use tactile interactions', 'to make discovery feel natural.'], 'Give people a low-risk way to try.', -Math.PI / 2, 0],
    ['Stay in control.', ['Make the current mode clear', 'before the next input.'], 'Keep important actions within reach.', Math.PI / 2, 0]
  ]

  // Mint, pink, yellow, and green from the C2C interaction demos.
  const palette = ['#bce6cc', '#eecde1', '#e8d883', '#6dc3a1']

  const headlineFonts = [
    '900 110px Arial Black, sans-serif',
    'italic 700 114px Georgia, serif',
    '900 112px Impact, sans-serif',
    '800 105px Arial, sans-serif',
    'italic 800 118px Georgia, serif',
    '800 100px Menlo, monospace'
  ]

  for (const [index, [headline, description, detail, pitch, yaw]] of faces.entries()) {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 512
    const context = canvas.getContext('2d')
    context.textBaseline = 'top'
    context.strokeStyle = '#102b23'
    context.lineJoin = 'round'

    const drawLine = (text, y, font, color, outline) => {
      context.font = font
      context.lineWidth = outline
      context.strokeText(text, 24, y, 464)
      context.fillStyle = color
      context.fillText(text, 24, y, 464)
    }

    const words = headline.split(' ')
    drawLine(words.slice(0, -1).join(' '), 16, headlineFonts[index], palette[index % palette.length], 8)
    drawLine(words.at(-1), 122, headlineFonts[index], palette[index % palette.length], 8)
    description.forEach((line, row) => {
      drawLine(line, 275 + row * 57, '700 48px sans-serif', '#edf3ed', 4)
    })
    drawLine(detail, 449, '700 31px monospace', palette[(index + 1) % palette.length], 3)
    const faceTexture = new THREE.CanvasTexture(canvas)
    faceTexture.colorSpace = THREE.SRGBColorSpace
    const material = new THREE.MeshBasicMaterial({
      map: faceTexture,
      alphaTest: 0.16,
      transparent: true,
      toneMapped: false
    })
    // The text cube renders outside Holospot's depth-of-field pass.
    material.onBeforeCompile = shader => {
      shader.uniforms.uTextFocusDepth = textFocusDepth
      shader.vertexShader = shader.vertexShader.replace(
        '#include <project_vertex>',
        '#include <project_vertex>\n vTextDepth = -mvPosition.z;'
      )
      shader.vertexShader = 'varying float vTextDepth;\n' + shader.vertexShader
      shader.fragmentShader = (
        'uniform float uTextFocusDepth;\nvarying float vTextDepth;\n' +
        shader.fragmentShader
      ).replace('#include <map_fragment>', `
        float blur = smoothstep(0.05, 0.58, vTextDepth - uTextFocusDepth) * 2.4;
        diffuseColor *= texture2D(map, vMapUv, blur);
      `)
    }
    const face = new THREE.Mesh(faceGeometry, material)
    face.rotation.set(pitch, yaw, 0)
    face.translateZ(0.775)
    companion.add(face)
  }

  primary.position.x = -0.85
  companion.position.x = 0.85
  group.add(primary, companion)
  return {
    group,
    primary,
    companion,
    textFocusDepth,
    screen,
    ctx,
    texture
  }
}

const teamPose = { turn: -0.22, tilt: 0.26, roll: -0.05, scale: 1.35, x: 0, y: 0, split: 0 }

export default function CubeScene({ motionRef, controllerRef, team = false }) {
  const mountRef = useRef(null)
  const finishRef = useRef(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const mount = mountRef.current
    let disposed = false,
      frame = 0,
      inView = true,
      model
    let renderer, environment, observer, holo
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50)
    camera.position.z = 7.8
    const rig = new THREE.Group()
    scene.add(rig)
    const study = createStudy()
    let lastDisplayFrame = -1
    let lastDisplayMode = -1
    const textCenter = new THREE.Vector3()
    let activePair = study
    rig.add(study.group)
    study.companion.visible = !team
    const stage = team ? mount.parentElement : mount.closest('[data-impact-stage]')
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    const dragRotation = { pitch: 0, yaw: 0 }
    let drag = null
    let lastProgress
    let lastScrollTime = -Infinity

    const startDrag = event => {
      if (event.button !== 0 || (lastProgress ?? 0) >= 0.98 ||
          performance.now() - lastScrollTime < 180 ||
          event.target.closest('a, button')) return
      const rect = mount.getBoundingClientRect()
      pointer.set(
        (event.clientX - rect.left) / rect.width * 2 - 1,
        1 - (event.clientY - rect.top) / rect.height * 2
      )
      raycaster.setFromCamera(pointer, camera)
      if (!raycaster.intersectObject(activePair.primary, true).length) return
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY }
      stage.setPointerCapture(event.pointerId)
    }
    const moveDrag = event => {
      if (drag?.id !== event.pointerId) return
      dragRotation.yaw += (event.clientX - drag.x) * 0.012
      dragRotation.pitch = THREE.MathUtils.clamp(
        dragRotation.pitch + (event.clientY - drag.y) * 0.012, -1.5, 1.5
      )
      drag.x = event.clientX
      drag.y = event.clientY
    }
    const endDrag = event => {
      if (event.pointerId === drag?.id) drag = null
    }
    stage?.addEventListener('pointerdown', startDrag)
    stage?.addEventListener('pointermove', moveDrag)
    stage?.addEventListener('lostpointercapture', endDrag)
    const render = (time = 0) => {
      frame = 0
      if (disposed || !inView || document.hidden || !renderer) return
      frame = requestAnimationFrame(render)
      const state = team ? teamPose : motionRef.current
      const p = state.progress ?? 0
      if (p !== lastProgress) {
        lastProgress = p
        lastScrollTime = time
        drag = null
      }
      const zoom = THREE.MathUtils.smoothstep(p, 0.405, 0.58)
      const exit = THREE.MathUtils.smoothstep(p, 0.84, 0.98)
      const primary = activePair.primary
      const closeup = zoom * (1 - exit)
      const bodyScale = (model ? primary.userData.fittedScale : 1)
      primary.scale.setScalar(bodyScale * (1 + closeup * 0.65) * Math.max(0.001, 1 - exit))
      const separation = 1.54 + state.split * 0.24
      activePair.primary.position.x = team ? 0 : -separation
      activePair.companion.position.x = separation

      // Rotate each cube around its own center while keeping their screen positions apart.
      rig.position.set(state.x, state.y, 0)
      const viewSlope = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect
      const usableWidth = camera.position.z * viewSlope * 0.92 - Math.abs(state.x)
      const fitScale = usableWidth / (
        (team ? 0 : separation) + 1.45 * (1 + closeup * 0.65) * (1 + viewSlope)
      )
      rig.scale.setScalar(Math.min(state.scale, fitScale))
      const fallTime = state.fallTime ?? 1.4
      const reboundTime = Math.max(0, fallTime - 1)
      // With height and impact time normalized to 1, gravity is 2.
      // The rebound retains 20% of the vertical impact speed.
      const drop = fallTime < 1
        ? 1 - fallTime ** 2
        : Math.max(0, reboundTime * (0.4 - reboundTime))
      const viewTop = camera.position.z * viewSlope / camera.aspect
      const dropHeight = (viewTop - state.y) / rig.scale.x + 2
      primary.position.y = drop * dropHeight + closeup * 0.65 + exit * 8

      if (time - lastScrollTime < 180) {
        dragRotation.pitch *= 0.82
        dragRotation.yaw *= 0.82
      }
      // Give the hologram a front-facing hold after landing, then reveal the top display.
      const logoHold = finishRef.current === 'volume'
        ? THREE.MathUtils.smoothstep(p, 0.31, 0.41) * (1 - THREE.MathUtils.smoothstep(p, 0.64, 0.8))
        : 0
      primary.rotation.set(
        THREE.MathUtils.lerp(THREE.MathUtils.lerp(state.tilt, 0.82, closeup), 0.14, logoHold) + dragRotation.pitch,
        state.turn * (1 - Math.max(closeup, logoHold)) + dragRotation.yaw,
        state.roll + drop * 0.24
      )
      const rotX = state.tilt + 0.12 + Math.sin(p * Math.PI * 2) * 0.32
      activePair.companion.rotation.set(rotX, state.turn - p * Math.PI * 1.5, state.roll)

      activePair.companion.getWorldPosition(textCenter)
      study.textFocusDepth.value = camera.position.z - textCenter.z - 0.4 * rig.scale.x

      const displayFrame = p === 0 ? 0 : Math.floor(time / 500) % 2
      const displayMode = Math.min(displayModes.length - 1, Math.floor(p * displayModes.length))
      if (displayFrame !== lastDisplayFrame || displayMode !== lastDisplayMode) {
        drawScreen(study.ctx, displayMode, displayFrame)
        study.texture.needsUpdate = true
        lastDisplayFrame = displayFrame
        lastDisplayMode = displayMode
      }

      holo.render(scene, camera)
      mount.dataset.turn = state.turn.toFixed(3)
      mount.dataset.model = model ? 'glb' : 'study'
      mount.dataset.primaryScale = activePair.primary.scale.x.toFixed(4)
      mount.dataset.companionScale = activePair.companion.scale.x.toFixed(4)
      mount.dataset.companionRotX = rotX.toFixed(3)
      mount.dataset.zoomFactor = rig.scale.x.toFixed(3)
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
      renderer.toneMappingExposure = 1.35
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.domElement.setAttribute('aria-hidden', 'true')
      mount.appendChild(renderer.domElement)
      environment = createStudioEnvironment(renderer)
      scene.environment = environment.texture
      scene.environmentIntensity = 2.4
      const key = new THREE.DirectionalLight(0xffffff, 5.2)
      key.position.set(-4, 6, 7)
      const warmRim = new THREE.DirectionalLight(0xffb86c, 3.8)
      warmRim.position.set(-6, 2, -4)
      const coolRim = new THREE.DirectionalLight(0x70d8ff, 3.2)
      coolRim.position.set(5, 3, -2)
      const fill = new THREE.DirectionalLight(0xc8f8df, 1.8)
      fill.position.set(2, 4, 4)
      scene.add(
        key,
        warmRim,
        coolRim,
        fill,
        new THREE.AmbientLight(0xffffff, 0.9)
      )
      finishRef.current ??= team ? 'emboss' : chooseFinish()
      const finish = finishRef.current
      holo = new Holo(renderer, {
        compose: 'over',
        quality: 'medium',
        settings: {
          'dof.on': true,
          'dof.fstop': '4.5',
          'dof.focus': 'object',
          'dof.offset': -18,
          'bump.map': 'none',
          'studio.preset': 'softbox',
          'studio.panel.on': true,
          'studio.panel.dir': { x: -0.48, y: 0.68 },
          'studio.panel.width': 32,
          'studio.panel.length': 65,
          'studio.panel.radiance': 8,
          'studio.spotA.on': true,
          'studio.spotA.dir': { x: 0.62, y: 0.42 },
          'studio.spotA.size': 2.6,
          'studio.spotA.radiance': 900,
          'studio.spotB.on': true,
          'studio.spotB.dir': { x: -0.82, y: -0.25 },
          'studio.spotB.size': 3.4,
          'studio.spotB.radiance': 650,
          'studio.spotC.on': true,
          'studio.spotC.dir': { x: 0.36, y: -0.81 },
          'studio.spotC.size': 1.8,
          'studio.spotC.radiance': 1000,
          'studio.ambient.rims': 8,
          'studio.ambient.fill': 1.1,
          'studio.ambient.scrim': 0.95
        }
      })
      const applyFinish = mesh => holo.apply(mesh, {
        material: finish,
        sizeMm: 90,
        settings: finishSettings[finish]
      })
      study.group.traverse(node => {
        if (node.userData.c2cGlass === true) applyFinish(node)
      })
      mount.dataset.material = finish
      const resize = () => {
        const { width, height } = mount.getBoundingClientRect()
        if (!width || !height) return
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
        renderer.setSize(width, height)
        camera.aspect = width / height
        camera.position.z = !team && width < 768 ? 11.8 : 7.8
        camera.updateProjectionMatrix()
        invalidate()
      }
      observer = new ResizeObserver(resize)
      observer.observe(mount)
      resize()
      if (controllerRef) controllerRef.current = { invalidate }
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
            primary.userData.fittedScale = primary.scale.x
            const companion = study.companion
            primary.position.x = -0.85
            companion.position.x = 0.85
            model = new THREE.Group()
            model.add(primary, companion)
            activePair = { group: model, primary, companion }
            study.group.traverse(node => {
              if (holo.get(node)) holo.remove(node)
            })
            model.traverse(node => {
              if (!node.isMesh || node.userData.c2cGlass === false) return
              const materials = [].concat(node.material)
              const names = [node.name, ...materials.map(material => material.name)].join(' ')
              if (!/screen|display|oled|button|switch|label|encoder|\bled\b/i.test(names)) applyFinish(node)
            })
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
      stage?.removeEventListener('pointerdown', startDrag)
      stage?.removeEventListener('pointermove', moveDrag)
      stage?.removeEventListener('lostpointercapture', endDrag)
      document.removeEventListener('visibilitychange', invalidate)
      if (controllerRef) controllerRef.current = null
      study.texture?.dispose()
      const retired = new THREE.Group()
      retired.add(study.group)
      if (model) retired.add(model)
      holo?.dispose()
      disposeObject(retired)
      environment?.dispose()
      renderer?.dispose()
      renderer?.domElement.remove()
    }
  }, [motionRef, controllerRef, team])
  return (
    <div
      className={styles.scene}
      ref={mountRef}
      role="img"
      aria-label="C2C cube study. Drag the main cube to rotate it when scroll is paused."
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
