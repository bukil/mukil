import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import {
  createBatteryBank,
  BATTERY_PART,
  BATTERY_LAYOUT
} from './battery-bank.mjs'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import gsap from 'gsap'
import styles from '../../styles/Daksha.module.css'
import { ASSEMBLY_PARTS, LEARNING_PARTS } from './experience-modes'
import { STORY_CHAPTERS, STORY_INDEX } from './story-chapters'
import { createOrbitalFlight } from './OrbitalFlight'
import { prepareFinalSatellite, SOLAR_PART } from './final-satellite.mjs'
import { SCENE_ASSETS } from './scene-assets.mjs'
import { createStoryEnvironment } from './StoryEnvironment'
import { createHeadsetPortal } from './HeadsetPortal'
import { prepareBrushedTangents } from './spacecraft-finish.mjs'
import {
  sampleStoryValue,
  easeRange,
  sunProgressForChapter,
  experienceBlendForChapter,
  flightForChapter
} from './scroll-motion.mjs'
import {
  prepareAssemblyGeometry,
  prepareAssemblyEdges,
  injectAssemblyShader,
  createAssemblyGuides
} from './assembly-geometry.mjs'

// Scroll chapters share a single renderer and a single model. No idle render loop.
const POSES = [
  {
    x: 1.5,
    y: 0,
    scale: 1,
    rx: 0.2,
    ry: -0.62,
    rz: -0.12,
    explode: 0,
    ghost: 0
  },
  {
    x: 1.45,
    y: -0.08,
    scale: 1.04,
    rx: 0.22,
    ry: 0.75,
    rz: 0.08,
    explode: 0,
    ghost: 0.82
  },
  {
    x: -1.35,
    y: -0.12,
    scale: 0.88,
    rx: 0.28,
    ry: 1.35,
    rz: -0.08,
    explode: 1,
    ghost: 0.68
  },
  {
    x: 1.45,
    y: -0.12,
    scale: 1.02,
    rx: -0.12,
    ry: 2.55,
    rz: 0.12,
    explode: 0,
    ghost: 0
  }
]
const OFFSETS = {
  Crown: [0, 1.12, 0],
  'Upper frame': [0, 0.57, 0],
  'Detector housings': [0, 0.88, 0],
  'Detector electronics': [0, 0.78, 0],
  'Side detectors': [0.18, -0.26, 0.12],
  Sensors: [0, 0.42, 0],
  'Spacecraft bus': [0, -0.5, 0],
  [BATTERY_PART]: [0, 0.88, 0]
}
const LEARNING_OFFSETS = {
  Crown: [0, 1.8, 0],
  'Upper frame': [0, 0.7, 0],
  'Detector housings': [-0.5, 1.1, 0.12],
  'Detector electronics': [0.65, 0.6, 0.1],
  Sensors: [0.7, 1.4, 0.12],
  'Side detectors': [-0.5, -0.1, 0.15],
  'Spacecraft bus': [0, -0.5, 0]
}

export default function SpacecraftScene({
  stateRef,
  controllerRef,
  onReady,
  onError,
  onProgress,
  variant = 'intro',
  onFrame,
  onSelectPart,
  onAssemblyChange
}) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    let disposed = false
    let frame = 0
    let renderCount = 0
    let model
    let solarRig
    let warming = false
    let keyLight
    const viewport = { width: mount.clientWidth, height: mount.clientHeight }
    let environment
    let storyEnvironment
    let flightTime = 0
    let lastFlightTime = 0
    let flightEffect
    let headsetPortal
    let observer
    let renderer
    let composer
    let bloom
    let scenePass
    let assemblyPieces = 0
    let lastAssembly = false
    const assemblyUniforms = { blend: { value: 0 }, progress: { value: 1 } }
    let visible = true
    let dragStart = null
    const drag = { x: 0, y: 0 }
    const parts = []
    const selectableMeshes = []
    const outlineMaterials = new Map()
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    const surfaceMaterials = new Set()
    const ghostUniform = { value: 0 }
    const scanUniform = { value: -2.4 }
    const experienceUniform = { value: 1 }
    const transitionScanUniform = { value: 0 }
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50)
    camera.position.set(0, 0, 8.8)
    const orthographicCamera = new THREE.OrthographicCamera(
      -3,
      3,
      3,
      -3,
      0.1,
      50
    )
    let viewCamera = camera
    const assemblyRotation = new THREE.Quaternion()
    const rig = new THREE.Group()
    const assemblyGuides = createAssemblyGuides()
    rig.add(assemblyGuides.lines)
    scene.add(rig)
    // The reference sketches use a spatial grid and orbital context.
    // These guides move only with interaction; there is no idle render loop.
    const guides = new THREE.Group()
    const grid = new THREE.GridHelper(
      variant === 'story' ? 32 : 12,
      variant === 'story' ? 48 : 24,
      0x89abc8,
      0xc3d6e5
    )
    grid.position.y = -2.05
    grid.material.transparent = true
    grid.material.opacity = 0.28
    grid.material.depthWrite = false
    const orbitPoints = Array.from({ length: 96 }, (_, index) => {
      const angle = (index / 96) * Math.PI * 2
      return new THREE.Vector3(
        Math.cos(angle) * 2.4,
        Math.sin(angle) * 0.52,
        Math.sin(angle) * 1.35
      )
    })
    const orbit = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(orbitPoints),
      new THREE.LineBasicMaterial({
        color: 0x739dbf,
        transparent: true,
        opacity: 0.32,
        depthWrite: false
      })
    )
    const orbitalMarker = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 8, 6),
      new THREE.MeshBasicMaterial({ color: 0x18568f })
    )
    guides.add(grid, orbit, orbitalMarker)
    scene.add(guides)
    let finishResources
    let resourceError = false
    const resourcesReady = new Promise(resolve => {
      finishResources = resolve
    })
    const manager = new THREE.LoadingManager(() => finishResources())
    manager.onProgress = (_, loaded, total) => {
      if (!disposed) onProgress(Math.min(65, (loaded / total) * 65))
    }
    manager.onError = () => {
      resourceError = true
    }
    const draco = new DRACOLoader(manager)
    draco.setDecoderPath('/models/draco/')
    draco.setWorkerLimit(2)
    const loader = new GLTFLoader(manager)
    loader.setDRACOLoader(draco)
    loader.setMeshoptDecoder(MeshoptDecoder)

    const disposeModel = object => {
      const geometries = new Set()
      const materials = new Set()
      const textures = new Set()
      object.traverse(node => {
        if (node.geometry) geometries.add(node.geometry)
        if (node.material)
          (Array.isArray(node.material)
            ? node.material
            : [node.material]
          ).forEach(material => materials.add(material))
        if (node.customDepthMaterial) materials.add(node.customDepthMaterial)
      })
      geometries.forEach(geometry => geometry.dispose())
      materials.forEach(material => {
        Object.values(material).forEach(value => {
          if (value?.isTexture) textures.add(value)
        })
        material.dispose()
      })
      textures.forEach(texture => {
        texture.source?.data?.close?.()
        texture.dispose()
      })
    }

    const profileFor = () => {
      const chapter = THREE.MathUtils.clamp(
        stateRef.current.chapter || 0,
        0,
        STORY_CHAPTERS.length - 1
      )
      const index = Math.min(Math.floor(chapter), STORY_CHAPTERS.length - 2)
      const t = stateRef.current.reducedMotion
        ? Math.round(chapter - index)
        : chapter - index
      const from = STORY_CHAPTERS[index]
      const to = STORY_CHAPTERS[index + 1]
      const profile = {}
      for (const key of Object.keys(from))
        if (typeof from[key] === 'number')
          profile[key] = stateRef.current.reducedMotion
            ? THREE.MathUtils.lerp(from[key], to[key], t)
            : sampleStoryValue(STORY_CHAPTERS, key, chapter)
      profile.focusFrom = from.focus
      profile.focusTo = to.focus
      profile.focusMix = t * t * (3 - 2 * t)
      profile.sunSweep = sunProgressForChapter(chapter)
      // Finish the sunlight reveal before opening the layers of the satellite.
      if (chapter >= STORY_INDEX.spacecraft && chapter < STORY_INDEX.inside) {
        const reveal = easeRange(
          chapter,
          STORY_INDEX.spacecraft + 0.72,
          STORY_INDEX.inside
        )
        profile.ghost *= reveal
        profile.explode *= reveal
      }
      return profile
    }
    const focusWeight = (part, profile) =>
      THREE.MathUtils.lerp(
        LEARNING_PARTS[profile.focusFrom] === part ? 1 : 0,
        LEARNING_PARTS[profile.focusTo] === part ? 1 : 0,
        profile.focusMix
      )
    const render = () => {
      frame = 0
      if (disposed || !renderer || (!warming && (!visible || document.hidden)))
        return
      let modeFrame
      let modeEmphasis
      let assemblyProgress = 1
      const story = variant === 'story'
      const storyProfile = story ? profileFor() : null
      const chapterPosition = stateRef.current.chapter || 0
      const flight = story
        ? flightForChapter(chapterPosition, stateRef.current.reducedMotion)
        : { blend: 0, speed: 0, stretch: 0 }
      const now = performance.now()
      if (flight.speed > 0 && !warming) {
        if (lastFlightTime)
          flightTime +=
            Math.min(0.04, (now - lastFlightTime) / 1000) * flight.speed
        lastFlightTime = now
      } else lastFlightTime = 0
      camera.position.x = camera.position.y = 0
      camera.rotation.set(0, 0, 0)
      flightEffect?.update(flight, flightTime, chapterPosition, viewport.height)
      const pageRoot = mount.closest('[data-motion]')
      const flightActive = String(flight.blend > 0.01)
      if (pageRoot && pageRoot.dataset.flight !== flightActive)
        pageRoot.dataset.flight = flightActive
      const experienceMix = story
        ? experienceBlendForChapter(
            chapterPosition,
            stateRef.current.reducedMotion
          )
        : 1
      const interactive =
        variant === 'modes' ||
        (story &&
          (stateRef.current.interactive ||
            (chapterPosition >= STORY_INDEX.usage &&
              chapterPosition < STORY_INDEX.usage + 0.35 &&
              !stateRef.current.reducedMotion)))
      experienceUniform.value = interactive ? experienceMix : 1
      transitionScanUniform.value =
        story && interactive && !stateRef.current.reducedMotion
          ? 4 * experienceMix * (1 - experienceMix)
          : 0
      if (model && interactive) {
        const reduced = stateRef.current.reducedMotion
        const total =
          THREE.MathUtils.clamp(
            story
              ? chapterPosition >= STORY_INDEX.usage
                ? 0.99999
                : stateRef.current.modeProgress ?? 0.03
              : stateRef.current.progress,
            0,
            0.99999
          ) * 4
        const mode = Math.floor(total)
        const local = total - mode
        const partCount = (mode === 2 ? ASSEMBLY_PARTS : LEARNING_PARTS).length
        const step = Math.min(
          partCount - 1,
          Math.floor(
            THREE.MathUtils.clamp((local - 0.06) / 0.8, 0, 0.99999) * partCount
          )
        )
        if (mode === 2) {
          assemblyProgress = THREE.MathUtils.clamp((local - 0.025) / 0.95, 0, 1)
          if (reduced)
            assemblyProgress =
              Math.ceil(assemblyProgress * partCount) / partCount
        }
        const batteryInstalling =
          mode === 2 &&
          assemblyProgress >= BATTERY_LAYOUT.appear &&
          assemblyProgress <
            BATTERY_LAYOUT.delay +
              (BATTERY_LAYOUT.levels.length - 1) * BATTERY_LAYOUT.stagger +
              0.2
        const part = batteryInstalling
          ? BATTERY_PART
          : mode === 1
          ? LEARNING_PARTS[step]
          : mode === 2
          ? ASSEMBLY_PARTS[step]
          : ''
        const focusPosition = THREE.MathUtils.clamp(
          ((local - 0.06) / 0.8) * partCount - 0.5,
          0,
          partCount - 1
        )
        modeEmphasis = key =>
          mode === 1
            ? easeRange(
                1 - Math.abs(LEARNING_PARTS.indexOf(key) - focusPosition),
                0,
                1
              )
            : key === part
            ? 1
            : 0
        const batteryFocus = modeEmphasis(BATTERY_PART)
        const learningSpread =
          mode === 1
            ? easeRange(local, 0, 0.12) *
              (1 - easeRange(local, 0.82, 1)) *
              (1 - batteryFocus)
            : 0
        const mobile = viewport.width < 760
        const poses = [
          {
            x: 1.35,
            y: -0.1,
            scale: 0.9,
            rx: 0.18,
            ry: (story ? 0.4 : -0.5) + (reduced ? 0 : local * 0.18),
            rz: -0.08
          },
          {
            x: 1.35,
            y: -0.2,
            scale: 0.7,
            rx: 0.15,
            ry: story ? 0.5 : -0.2,
            rz: 0
          },
          {
            x: 1.35,
            y: -0.1,
            scale: 0.82,
            rx: 0.2,
            ry: story ? 0.6 : 0,
            rz: -0.06
          },
          {
            x: 1.35,
            y: -0.1,
            scale: story ? 0.78 : 0.64,
            rx: 0.14,
            ry: (story ? 0.65 : 0.15) + (reduced ? 0 : local * 0.1),
            rz: 0.08
          }
        ]
        const blend = reduced ? 1 : THREE.MathUtils.smoothstep(local, 0, 0.12)
        const from = { ...poses[Math.max(0, mode - 1)] }
        if (mode === 1 && !reduced) from.ry = (story ? 0.4 : -0.5) + 0.18
        const to = poses[mode]
        const value = key => THREE.MathUtils.lerp(from[key], to[key], blend)
        rig.position.set(
          mobile ? (story ? 0.35 : 0.85) : value('x'),
          mobile ? (story ? -0.7 : -1.15) : value('y'),
          0
        )
        rig.scale.setScalar(
          value('scale') * (mobile ? (story ? 0.65 : 0.6) : 1)
        )
        rig.rotation.set(
          value('rx') + drag.y,
          value('ry') + drag.x,
          value('rz')
        )
        parts.forEach(item => {
          item.node.visible = true
          item.node.position.copy(item.origin)
          if (mode === 1) {
            if (item.key === BATTERY_PART && learningSpread > 0.001)
              item.node.visible = false
            const offset = LEARNING_OFFSETS[item.key] || [0, 0, 0]
            item.node.position.x += offset[0] * 0.65 * learningSpread
            item.node.position.y += offset[1] * 0.65 * learningSpread
            item.node.position.z += offset[2] * 0.65 * learningSpread
            if (item.key !== BATTERY_PART)
              item.node.position.z +=
                0.25 * modeEmphasis(item.key) * learningSpread
          }
        })
        ghostUniform.value =
          mode === 1
            ? 0.72 * easeRange(local, 0, 0.12) * (1 - easeRange(local, 0.88, 1))
            : mode === 2
            ? 0.9 *
              easeRange(assemblyProgress, 0.56, 0.64) *
              (1 - easeRange(local, 0.88, 1))
            : mode === 3
            ? 0.4 * easeRange(local, 0, 0.12)
            : 0
        surfaceMaterials.forEach(material => {
          const emphasis = modeEmphasis(material.userData.part)
          material.userData.dakshaGhost.value =
            ghostUniform.value * (1 - emphasis)
          material.emissive.setRGB(
            0.025 * emphasis,
            0.09 * emphasis,
            0.12 * emphasis
          )
        })
        modeFrame = { mode, local, step, part }
      } else if (model && story) {
        const profile = storyProfile
        const mobile = viewport.width < 760
        rig.position.set(
          mobile ? 0.35 : profile.x,
          mobile ? -0.7 : profile.y,
          0
        )
        rig.scale.setScalar(profile.scale * (mobile ? 0.65 : 1))
        rig.rotation.set(profile.rx + drag.y, profile.ry + drag.x, profile.rz)
        ghostUniform.value = profile.ghost
        scanUniform.value = -2.4 + ((stateRef.current.chapter || 0) % 1) * 4.8
        surfaceMaterials.forEach(material => {
          const emphasis = focusWeight(material.userData.part, profile)
          material.userData.dakshaGhost.value = profile.ghost * (1 - emphasis)
          material.userData.dakshaVisibility.value =
            1 - profile.isolate * (1 - emphasis)
          material.emissive.setRGB(
            0.002 * emphasis,
            0.025 * emphasis,
            0.05 * emphasis
          )
        })
        parts.forEach(part => {
          part.node.visible =
            1 - profile.isolate * (1 - focusWeight(part.key, profile)) > 0.001
          part.node.position
            .copy(part.origin)
            .addScaledVector(part.offset, profile.explode)
        })
        // Keep the reference plane's projection fixed; zoom the model itself.
        camera.position.z = mobile ? 9.8 : 8.8
        camera.updateProjectionMatrix()
      } else if (model) {
        const reduced = stateRef.current.reducedMotion
        const progress = THREE.MathUtils.clamp(stateRef.current.progress, 0, 1)
        // Each chapter's composed pose holds briefly before the next transition.
        const position = progress * (POSES.length - 1)
        const index = Math.min(Math.floor(position), POSES.length - 2)
        const t = reduced
          ? Math.round(position - index)
          : THREE.MathUtils.smoothstep(position - index, 0.16, 0.84)
        const from = POSES[index]
        const to = POSES[index + 1]
        const value = key => THREE.MathUtils.lerp(from[key], to[key], t)
        ghostUniform.value = value('ghost')
        scanUniform.value = THREE.MathUtils.lerp(-2.4, 2.4, progress)
        surfaceMaterials.forEach(material => {
          material.userData.dakshaGhost.value = ghostUniform.value
        })
        const mobile = viewport.width < 760
        rig.position.set(mobile ? 0 : value('x'), mobile ? -0.9 : value('y'), 0)
        rig.scale.setScalar(
          value('scale') * (mobile ? 0.7 : viewport.width < 1150 ? 0.88 : 1)
        )
        rig.rotation.set(
          value('rx') + drag.y,
          value('ry') + drag.x,
          value('rz')
        )
        parts.forEach(part =>
          part.node.position
            .copy(part.origin)
            .addScaledVector(part.offset, value('explode'))
        )
      }
      if (model && story && interactive) {
        const profile = storyProfile
        const mobile = viewport.width < 760
        const basePosition = new THREE.Vector3(
          mobile ? 0.35 : profile.x,
          mobile ? -0.7 : profile.y,
          0
        )
        const baseScale = profile.scale * (mobile ? 0.65 : 1)
        const modeRotation = rig.quaternion.clone()
        const modePosition = rig.position.clone()
        rig.position.copy(basePosition).lerp(modePosition, experienceMix)
        // Save the mode pose before replacing it with the story endpoint.
        rig.quaternion.setFromEuler(
          new THREE.Euler(profile.rx + drag.y, profile.ry + drag.x, profile.rz)
        )
        rig.quaternion.slerp(modeRotation, experienceMix)
        rig.scale.lerp(
          new THREE.Vector3(baseScale, baseScale, baseScale),
          1 - experienceMix
        )
        parts.forEach(item => {
          const modePosition = item.node.position.clone()
          item.node.position
            .copy(item.origin)
            .addScaledVector(item.offset, profile.explode)
          item.node.position.lerp(modePosition, experienceMix)
          if (experienceMix < 0.001) item.node.visible = true
        })
      }
      if (flight.blend > 0) {
        rig.position.lerp(new THREE.Vector3(0, 0, 0), flight.blend)
        rig.scale.lerp(new THREE.Vector3(0.94, 0.94, 0.94), flight.blend)
        const bank = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(0.22, -0.62, -0.18)
        )
        rig.quaternion.slerp(bank, flight.blend)
        const shake = flight.speed
        camera.position.x =
          (Math.sin(flightTime * 53) + 0.4 * Math.sin(flightTime * 91)) *
          0.013 *
          shake
        camera.position.y = Math.sin(flightTime * 67) * 0.009 * shake
        camera.rotation.z = Math.sin(flightTime * 43) * 0.0025 * shake
        rig.position.y += Math.sin(flightTime * 6) * 0.025 * shake
      }
      const assembling = modeFrame?.mode === 2
      if (assembling !== lastAssembly) {
        lastAssembly = assembling
        if (!warming) onAssemblyChange?.(assembling)
      }
      const modePosition = interactive
        ? (story ? stateRef.current.modeProgress : stateRef.current.progress) *
          4
        : 0
      const assemblyBlend = stateRef.current.reducedMotion
        ? assembling
          ? 1
          : 0
        : easeRange(modePosition, 1.98, 2.12) *
          (1 - easeRange(modePosition, 2.88, 3.04))
      // Seat the taller battery rack after the bus and detector electronics
      // finish moving through this bay. Reverse scrolling follows the same order.
      const batteryBank = parts.find(item => item.key === BATTERY_PART)
      if (batteryBank && assembling && assemblyProgress < BATTERY_LAYOUT.appear)
        batteryBank.node.visible = false
      const solarDeployment = assembling
        ? easeRange(assemblyProgress, 0.86, 1)
        : story
        ? easeRange(
            chapterPosition,
            STORY_INDEX.spacecraft + 0.08,
            STORY_INDEX.spacecraft + 0.72
          )
        : 1
      const solarPresence = assembling
        ? easeRange(assemblyProgress, 0.78, 0.85)
        : 1
      solarRig?.update(solarDeployment)
      if (solarRig) solarRig.arrays.visible = solarPresence > 0.001
      assemblyUniforms.blend.value = assemblyBlend
      assemblyUniforms.progress.value = assemblyProgress
      assemblyGuides.uniforms.visibility.value = assemblyBlend
      assemblyGuides.uniforms.progress.value = assemblyProgress
      assemblyGuides.lines.visible = assemblyBlend > 0.001
      if (assemblyBlend > 0) {
        rig.position.lerp(new THREE.Vector3(0, 0, 0), assemblyBlend)
        // The same centered composition on desktop and portrait screens.
        rig.scale.lerp(new THREE.Vector3(0.82, 0.82, 0.82), assemblyBlend)
        assemblyRotation.setFromEuler(
          new THREE.Euler(
            0.61548 + drag.y,
            Math.PI / 4 + drag.x + (assemblyProgress - 0.5) * 0.12,
            0
          )
        )
        rig.quaternion.slerp(assemblyRotation, assemblyBlend)
      }
      // Blend the projection itself, ending in a true OrthographicCamera.
      // Matching frustums keeps the spacecraft's screen size continuous.
      camera.updateProjectionMatrix()
      const halfHeight =
        Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z
      const assemblyHalfHeight = Math.max(
        halfHeight * 1.12,
        2.7 / camera.aspect
      )
      const projectionBlend = Math.max(assemblyBlend, flight.blend)
      const orthoHalfHeight = THREE.MathUtils.lerp(
        assemblyHalfHeight,
        Math.max(2.8, 1.85 / camera.aspect),
        flight.blend
      )
      orthographicCamera.left = -orthoHalfHeight * camera.aspect
      orthographicCamera.right = orthoHalfHeight * camera.aspect
      orthographicCamera.top = orthoHalfHeight
      orthographicCamera.bottom = -orthoHalfHeight
      orthographicCamera.position.copy(camera.position)
      orthographicCamera.quaternion.copy(camera.quaternion)
      orthographicCamera.updateProjectionMatrix()
      viewCamera = projectionBlend >= 0.999 ? orthographicCamera : camera
      if (projectionBlend > 0 && projectionBlend < 0.999) {
        const perspective = camera.projectionMatrix.elements
        const orthographic = orthographicCamera.projectionMatrix.elements
        for (let i = 0; i < 16; i++)
          perspective[i] = THREE.MathUtils.lerp(
            perspective[i],
            orthographic[i],
            projectionBlend
          )
        camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert()
      }
      if (model?.userData.authoredMaterials) {
        viewCamera.updateMatrixWorld()
        for (let pass = 0; pass < 2; pass++) {
          rig.updateMatrixWorld(true)
          const bounds = new THREE.Box3().setFromObject(model)
          let minX = Infinity,
            maxX = -Infinity,
            minY = Infinity,
            maxY = -Infinity
          for (const x of [bounds.min.x, bounds.max.x])
            for (const y of [bounds.min.y, bounds.max.y])
              for (const z of [bounds.min.z, bounds.max.z]) {
                const point = new THREE.Vector3(x, y, z).project(viewCamera)
                minX = Math.min(minX, point.x)
                maxX = Math.max(maxX, point.x)
                minY = Math.min(minY, point.y)
                maxY = Math.max(maxY, point.y)
              }
          const fit = Math.min(
            1,
            0.88 / Math.max(Math.abs(minX), Math.abs(maxX)),
            0.825 / Math.max(Math.abs(minY), Math.abs(maxY))
          )
          if (fit >= 0.999) break
          rig.scale.multiplyScalar(fit)
          rig.position.multiplyScalar(fit)
        }
      }
      if (scenePass) scenePass.camera = viewCamera
      if (story) {
        const profile = storyProfile
        if (keyLight)
          keyLight.intensity =
            0.32 +
            1.4 *
              (1 -
                easeRange(
                  stateRef.current.chapter || 0,
                  STORY_INDEX.spacecraft + 0.04,
                  STORY_INDEX.spacecraft + 0.35
                ))
        surfaceMaterials.forEach(material => {
          material.userData.dakshaBlue.value = interactive
            ? 0.28
            : profile.blue * profile.ghost * 0.4
          material.userData.dakshaBlack.value = interactive
            ? 0.18
            : profile.black
          const emphasis = focusWeight(material.userData.part, profile)
          material.userData.dakshaGhostFrom.value =
            profile.ghost * (1 - emphasis)
          material.userData.dakshaBlueFrom.value =
            profile.blue * profile.ghost * 0.4
          material.userData.dakshaBlackFrom.value = profile.black
          if (interactive) {
            material.userData.dakshaVisibility.value = THREE.MathUtils.lerp(
              1 - profile.isolate * (1 - emphasis),
              1,
              experienceMix
            )
            material.emissive.multiplyScalar(experienceMix)
          }
        })
        storyEnvironment?.update(
          {
            ...profile,
            earth: profile.earth * (1 - assemblyBlend) * (1 - flight.blend),
            stars: profile.stars * (1 - assemblyBlend) * (1 - flight.blend),
            glow: profile.glow * (1 - assemblyBlend) * (1 - flight.blend)
          },
          stateRef.current.chapter || 0,
          viewport.width < 760,
          rig.position
        )
      }
      surfaceMaterials.forEach(material => {
        if (material.userData.part === SOLAR_PART)
          material.userData.dakshaVisibility.value *= solarPresence
        const transparent =
          material.userData.dakshaGhost.value > 0.002 ||
          (interactive &&
            experienceMix < 0.999 &&
            material.userData.dakshaGhostFrom?.value > 0.002) ||
          material.userData.dakshaVisibility.value < 0.998
        material.depthWrite = !transparent
      })
      guides.position.set(0, 0, 0)
      guides.scale.setScalar(1)
      const angle = stateRef.current.reducedMotion
        ? 0
        : stateRef.current.progress * Math.PI * 2
      orbitalMarker.position.set(
        Math.cos(angle) * 2.4,
        Math.sin(angle) * 0.52,
        Math.sin(angle) * 1.35
      )
      guides.visible =
        assemblyBlend < 0.999 &&
        (story ||
          variant === 'intro' ||
          modeFrame?.mode === 0 ||
          modeFrame?.mode === 3)
      if (story) {
        grid.material.opacity = 0.045 * (1 - assemblyBlend) * (1 - flight.blend)
        grid.rotation.set(0, 0, 0)
        orbit.visible = false
        orbitalMarker.visible = false
      }
      outlineMaterials.forEach((material, part) => {
        const emphasis = story
          ? THREE.MathUtils.lerp(
              focusWeight(part, storyProfile),
              modeEmphasis?.(part) || 0,
              interactive ? experienceMix : 0
            )
          : modeEmphasis?.(part) || 0
        const selected = emphasis > 0.5
        material.color.setHex(
          story
            ? selected
              ? 0xd9f3ff
              : 0x4eaee6
            : selected
            ? 0x0874bb
            : 0x18568f
        )
        if (story) {
          material.color
            .setHex(0x367bb0)
            .lerp(new THREE.Color(0xc4eaff), emphasis)
          material.color.multiplyScalar(0.8 + emphasis * 0.45)
        }
        material.opacity = story
          ? THREE.MathUtils.lerp(
              THREE.MathUtils.lerp(
                storyProfile.edges * 0.6,
                0.24,
                interactive ? experienceMix : 0
              ),
              0.85,
              emphasis
            )
          : selected
          ? 1
          : 0.58
        if (story)
          material.opacity *=
            1 -
            storyProfile.isolate *
              (1 - emphasis) *
              (1 - (interactive ? experienceMix : 0))
      })
      headsetPortal?.update(
        stateRef.current.chapter || 0,
        stateRef.current.reducedMotion
      )
      if (headsetPortal?.active) {
        headsetPortal.render(renderer, scene, viewCamera, rig.position)
      } else if (composer) {
        bloom.strength = 0.24 + 0.5 * flight.stretch
        composer.render()
      } else renderer.render(scene, viewCamera)
      if (modeFrame) {
        if (story && !warming) stateRef.current.onStoryFrame?.(modeFrame)
        const focused = parts.find(item => item.key === modeFrame.part)
        let anchor
        if (focused) {
          const point = focused.node
            .getWorldPosition(new THREE.Vector3())
            .project(viewCamera)
          anchor = [
            THREE.MathUtils.clamp(
              ((point.x + 1) * viewport.width) / 2,
              15,
              viewport.width - 15
            ),
            THREE.MathUtils.clamp(
              ((1 - point.y) * viewport.height) / 2,
              60,
              viewport.height - 50
            )
          ]
        }
        mount.dataset.mode = String(modeFrame.mode)
        mount.dataset.step = String(modeFrame.step)
        mount.dataset.part = modeFrame.part
        mount.dataset.visibleParts = String(
          parts.filter(item => item.node.visible).length
        )
        const center = rig
          .getWorldPosition(new THREE.Vector3())
          .project(viewCamera)
        if (!warming)
          onFrame?.({
            ...modeFrame,
            assemblyProgress,
            anchor,
            center: [
              ((center.x + 1) * viewport.width) / 2,
              ((1 - center.y) * viewport.height) / 2
            ],
            width: viewport.width,
            height: viewport.height
          })
      }
      // Diagnostics are local to this canvas, with no global production API.
      mount.dataset.shaderPrograms = String(renderer.info.programs?.length || 0)
      mount.dataset.drawCalls = String(renderer.info.render.calls)
      mount.dataset.triangles = String(renderer.info.render.triangles)
      mount.dataset.geometries = String(renderer.info.memory.geometries)
      mount.dataset.textures = String(renderer.info.memory.textures)
      mount.dataset.outlines = String(outlineMaterials.size)
      mount.dataset.progress = stateRef.current.progress.toFixed(6)
      mount.dataset.frames = String(++renderCount)
      mount.dataset.xray = ghostUniform.value.toFixed(3)
      mount.dataset.projection =
        projectionBlend >= 0.999 ? 'orthographic' : 'perspective'
      if (headsetPortal) {
        mount.dataset.headset = String(
          headsetPortal.active && (stateRef.current.chapter || 0) > 0.45
        )
        mount.dataset.headsetPhase = headsetPortal.phase
        mount.dataset.headsetStickers = String(headsetPortal.stickerCount)
      }
      mount.dataset.flightSpeed = flight.speed.toFixed(4)
      mount.dataset.flightBlend = flight.blend.toFixed(4)
      mount.dataset.flightTime = flightTime.toFixed(3)
      mount.dataset.satelliteAsset = model?.userData.source || ''
      mount.dataset.solarWings = String(solarRig?.hinges.length || 0)
      mount.dataset.solarDeployment = solarDeployment.toFixed(4)
      mount.dataset.batteryPacks = String(BATTERY_LAYOUT.levels.length)
      mount.dataset.anisotropicMaterials = String(
        [...surfaceMaterials].filter(material => material.anisotropy > 0).length
      )
      if (storyEnvironment) {
        mount.dataset.sunSweep = storyProfile.sunSweep.toFixed(3)
        mount.dataset.sunPosition = storyEnvironment.sunlight.position
          .toArray()
          .map(value => value.toFixed(3))
          .join(',')
      }
      mount.dataset.assemblyCentered = String(
        assemblyBlend >= 0.999 && rig.position.length() < 0.001
      )
      mount.dataset.assemblyPieces = String(assemblyPieces)
      mount.dataset.assemblyProgress = assemblyProgress.toFixed(3)
      mount.dataset.experienceBlend = experienceMix.toFixed(4)
      mount.dataset.transitionScan = transitionScanUniform.value.toFixed(4)
      if (story) {
        mount.dataset.chapter = (stateRef.current.chapter || 0).toFixed(3)
        mount.dataset.materialMix = storyProfile.blue.toFixed(3)
        mount.dataset.earth = storyProfile.earth.toFixed(3)
      }
      if (flight.speed > 0.001 && !warming) invalidate()
    }
    const invalidate = () => {
      if (!disposed && !frame && visible && !document.hidden)
        frame = requestAnimationFrame(render)
    }
    const reset = () =>
      gsap.to(drag, {
        x: 0,
        y: 0,
        duration: stateRef.current.reducedMotion ? 0 : 0.22,
        ease: 'power3.out',
        overwrite: true,
        onUpdate: invalidate
      })

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      })
      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio || 1,
          mount.clientWidth < 760 ? 1.35 : 1.6
        )
      )
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.shadowMap.enabled = variant === 'story'
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1
      renderer.setClearColor(0x000000, 0)
      renderer.domElement.setAttribute('aria-hidden', 'true')
      mount.appendChild(renderer.domElement)
      const pmrem = new THREE.PMREMGenerator(renderer)
      const room = new RoomEnvironment()
      // Broad reflection strips give brushed metal a readable highlight as it
      // turns. They are baked once into the environment, with no extra draws.
      if (variant === 'story') {
        for (const [position, size, color, strength] of [
          [[-4, 3, 7], [1.6, 8], 0xdbeaff, 3.5],
          [[6, 1, -4], [2, 6], 0xffe8c4, 2.5]
        ]) {
          const card = new THREE.Mesh(
            new THREE.PlaneGeometry(...size),
            new THREE.MeshBasicMaterial({
              color: new THREE.Color(color).multiplyScalar(strength),
              side: THREE.DoubleSide
            })
          )
          card.position.set(...position)
          card.lookAt(0, 0, 0)
          room.add(card)
        }
      }
      environment = pmrem.fromScene(room, 0.04)
      scene.environment = environment.texture
      scene.environmentIntensity = variant === 'story' ? 0.6 : 1
      scene.environmentRotation.set(0, 0.35, 0)
      room.dispose()
      pmrem.dispose()
      if (variant === 'story') {
        flightEffect = createOrbitalFlight(scene, mount.clientWidth < 760)
        storyEnvironment = createStoryEnvironment(
          scene,
          invalidate,
          manager,
          mount.clientWidth < 760
        )
        composer = new EffectComposer(renderer)
        composer.setPixelRatio(
          Math.min(
            window.devicePixelRatio || 1,
            mount.clientWidth < 760 ? 1 : 1.35
          )
        )
        scenePass = new RenderPass(scene, camera)
        composer.addPass(scenePass)
        bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.24, 0.35, 2.8)
        composer.addPass(bloom)
        composer.addPass(new OutputPass())
      }
      const key = (keyLight = new THREE.DirectionalLight(
        0xd7e9ff,
        variant === 'story' ? 0.32 : 2
      ))
      key.position.set(-4, 6, 8)
      key.target.position.set(1.35, 0, 0)
      const rim = new THREE.DirectionalLight(
        0x9ec6e4,
        variant === 'story' ? 0.08 : 1.1
      )
      rim.position.set(-3, 2, -3)
      const fill = new THREE.DirectionalLight(
        0x9cb8ed,
        variant === 'story' ? 0.05 : 1.2
      )
      fill.position.set(-4, 0, 3)
      scene.add(
        key,
        key.target,
        rim,
        fill,
        new THREE.AmbientLight(0xc5d8e8, variant === 'story' ? 0.025 : 0.6)
      )
      const resize = () => {
        const width = mount.clientWidth
        const height = mount.clientHeight
        if (!width || !height) return
        viewport.width = width
        viewport.height = height
        camera.aspect = width / height
        camera.position.z = width < 760 ? 9.7 : width < 1150 ? 10 : 8.8
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
        headsetPortal?.resize(width, height)
        composer?.setSize(width, height)
        invalidate()
      }
      observer = new ResizeObserver(resize)
      observer.observe(mount)
      resize()
      controllerRef.current = {
        invalidate,
        reset,
        draw: () => {
          cancelAnimationFrame(frame)
          render()
        }
      }
      Promise.allSettled([
        loader.loadAsync(SCENE_ASSETS.satellite),
        loader.loadAsync(SCENE_ASSETS.battery),
        ...(variant === 'story' ? [loader.loadAsync(SCENE_ASSETS.headset)] : [])
      ])
        .then(async assets => {
          if (assets.some(asset => asset.status === 'rejected')) {
            assets.forEach(asset => {
              if (asset.status === 'fulfilled') disposeModel(asset.value.scene)
            })
            if (!disposed) onError()
            return
          }
          const gltf = assets[0].value
          const battery = assets[1].value
          const headset = assets[2]?.value
          if (disposed) {
            disposeModel(gltf.scene)
            disposeModel(battery.scene)
            if (headset) disposeModel(headset.scene)
            return
          }
          if (headset) {
            try {
              headsetPortal = await createHeadsetPortal(
                headset.scene,
                environment.texture,
                manager
              )
            } catch {
              disposeModel(headset.scene)
              disposeModel(battery.scene)
              disposeModel(gltf.scene)
              if (!disposed) onError()
              return
            }
            if (disposed) {
              disposeModel(headsetPortal.scene)
              headsetPortal.dispose()
              disposeModel(battery.scene)
              disposeModel(gltf.scene)
              return
            }
            headsetPortal.resize(mount.clientWidth, mount.clientHeight)
          }
          solarRig = prepareFinalSatellite(gltf.scene)
          model = solarRig.model
          model.add(createBatteryBank(battery.scene))
          // Geometry is baked into the shared bank; materials/textures remain in use.
          battery.scene.traverse(node => node.geometry?.dispose())
          model.updateMatrixWorld(true)
          if (model.userData.optimizedSatellite) {
            assemblyPieces = model.userData.assemblyPieces
            for (const path of model.userData.assemblyGuidePaths) {
              assemblyGuides.addPaths(
                [
                  {
                    center: new THREE.Vector3(...path.center),
                    offset: new THREE.Vector3(...path.offset),
                    delay: path.delay,
                    vertices: { length: path.count }
                  }
                ],
                new THREE.Matrix4()
              )
            }
          }
          const inverseModel = model.matrixWorld.clone().invert()
          const originalMaterials = new Set()
          const materialClones = new Map()
          model.children.forEach(root => {
            const part = root.userData.part || root.name
            const precomputedPart =
              model.userData.optimizedSatellite && part !== BATTERY_PART
            const surface = new THREE.MeshStandardMaterial({
              color: 0xdbeaf4,
              roughness: 0.88,
              metalness: 0.05,
              envMapIntensity: 0.35,
              polygonOffset: true,
              polygonOffsetFactor: 1,
              polygonOffsetUnits: 1
            })
            surface.userData.part = part
            surfaceMaterials.add(surface)
            if (variant === 'story' || model.userData.authoredMaterials) {
              surfaceMaterials.delete(surface)
              surface.dispose()
            }
            const edges = []
            const solarOutline =
              part === SOLAR_PART || precomputedPart
                ? new THREE.LineBasicMaterial({
                    color: 0x18568f,
                    transparent: true,
                    opacity: 0.24,
                    depthWrite: false
                  })
                : null
            if (solarOutline) {
              outlineMaterials.set(part, solarOutline)
              solarOutline.onBeforeCompile = shader =>
                injectAssemblyShader(shader, assemblyUniforms)
              solarOutline.customProgramCacheKey = () =>
                'daksha-solar-hinged-lines-v1'
            }
            const inverseRoot = root.matrixWorld.clone().invert()
            root.traverse(node => {
              if (node.userData.precomputedOutline) {
                originalMaterials.add(node.material)
                node.material = solarOutline
                node.geometry.setAttribute(
                  'assemblyOffset',
                  node.geometry.getAttribute('_assembly_offset')
                )
                node.geometry.setAttribute(
                  'assemblyDelay',
                  node.geometry.getAttribute('_assembly_delay')
                )
                node.frustumCulled = false
                node.renderOrder = 1
                return
              }
              if (!node.isMesh) return
              const old = Array.isArray(node.material)
                ? node.material
                : [node.material]
              old.forEach(material => originalMaterials.add(material))
              if (variant === 'story' || model.userData.authoredMaterials) {
                const clone = original => {
                  const key = part + ':' + original.uuid
                  if (!materialClones.has(key)) {
                    const copy = original.clone()
                    copy.userData.part = part
                    copy.polygonOffset = true
                    copy.polygonOffsetFactor = 1
                    copy.polygonOffsetUnits = 1
                    materialClones.set(key, copy)
                    surfaceMaterials.add(copy)
                  }
                  return materialClones.get(key)
                }
                node.material = Array.isArray(node.material)
                  ? node.material.map(clone)
                  : clone(node.material)
              } else node.material = surface
              if (variant === 'story')
                prepareBrushedTangents(
                  node.geometry,
                  Array.isArray(node.material) ? node.material : [node.material]
                )
              node.castShadow = variant === 'story'
              node.receiveShadow = variant === 'story'
              selectableMeshes.push(node)
              let plan
              if (precomputedPart) {
                node.geometry.setAttribute(
                  'assemblyOffset',
                  node.geometry.getAttribute('_assembly_offset')
                )
                node.geometry.setAttribute(
                  'assemblyDelay',
                  node.geometry.getAttribute('_assembly_delay')
                )
              } else {
                plan = prepareAssemblyGeometry(
                  node.geometry,
                  ASSEMBLY_PARTS.indexOf(part),
                  assemblyPieces
                )
                assemblyPieces += plan.pieces.length
                assemblyGuides.addPaths(
                  plan.pieces,
                  new THREE.Matrix4().multiplyMatrices(
                    inverseModel,
                    node.matrixWorld
                  )
                )
              }
              node.frustumCulled = false
              node.customDepthMaterial = new THREE.MeshDepthMaterial({
                depthPacking: THREE.RGBADepthPacking
              })
              node.customDepthMaterial.onBeforeCompile = shader =>
                injectAssemblyShader(shader, assemblyUniforms)
              node.customDepthMaterial.customProgramCacheKey = () =>
                'daksha-assembly-depth-v1'
              if (precomputedPart) return
              const geometry = new THREE.EdgesGeometry(node.geometry, 28)
              const edgeTransform = new THREE.Matrix4().multiplyMatrices(
                inverseRoot,
                node.matrixWorld
              )
              prepareAssemblyEdges(geometry, plan, edgeTransform)
              if (solarOutline && geometry.getAttribute('position').count) {
                // Keep each half's outlines under its hinge, just like its cells.
                const outline = new THREE.LineSegments(geometry, solarOutline)
                outline.renderOrder = 1
                outline.frustumCulled = false
                node.parent.add(outline)
              } else {
                geometry.applyMatrix4(edgeTransform)
                if (geometry.getAttribute('position').count)
                  edges.push(geometry)
                else geometry.dispose()
              }
            })
            if (edges.length) {
              // One edge draw per subassembly, rather than one per imported mesh.
              const merged = mergeGeometries(edges, false)
              edges.forEach(geometry => geometry.dispose())
              if (merged) {
                const material = new THREE.LineBasicMaterial({
                  color: 0x18568f,
                  transparent: true,
                  opacity: 0.58,
                  depthWrite: false
                })
                outlineMaterials.set(part, material)
                material.onBeforeCompile = shader =>
                  injectAssemblyShader(shader, assemblyUniforms)
                material.customProgramCacheKey = () =>
                  'daksha-assembly-lines-v1'
                const outline = new THREE.LineSegments(merged, material)
                outline.name = 'Daksha outline'
                outline.renderOrder = 1
                outline.frustumCulled = false
                root.add(outline)
              }
            }
          })
          originalMaterials.forEach(material => material.dispose())
          // A restrained x-ray pass reveals inner layers beneath the blue outlines.
          surfaceMaterials.forEach(material => {
            material.forceSinglePass = true
            material.transparent = true
            material.userData.dakshaGhost = { value: 0 }
            material.userData.dakshaBlue = { value: 0 }
            material.userData.dakshaBlack = { value: 0 }
            material.userData.dakshaVisibility = { value: 1 }
            material.userData.dakshaGhostFrom = { value: 0 }
            material.userData.dakshaBlueFrom = { value: 0 }
            material.userData.dakshaBlackFrom = { value: 0 }
            material.onBeforeCompile = shader => {
              shader.uniforms.uDakshaGhost = material.userData.dakshaGhost
              shader.uniforms.uDakshaBlue = material.userData.dakshaBlue
              shader.uniforms.uDakshaBlack = material.userData.dakshaBlack
              shader.uniforms.uDakshaVisibility =
                material.userData.dakshaVisibility
              shader.uniforms.uDakshaScan = scanUniform
              shader.uniforms.uDakshaExperience = experienceUniform
              shader.uniforms.uDakshaTransitionScan = transitionScanUniform
              shader.uniforms.uDakshaGhostFrom =
                material.userData.dakshaGhostFrom
              shader.uniforms.uDakshaBlueFrom = material.userData.dakshaBlueFrom
              shader.uniforms.uDakshaBlackFrom =
                material.userData.dakshaBlackFrom
              shader.vertexShader =
                'varying float vDakshaHeight;\n' +
                shader.vertexShader.replace(
                  '#include <begin_vertex>',
                  '#include <begin_vertex>\n vDakshaHeight = (modelMatrix * vec4(transformed, 1.0)).y;'
                )
              shader.fragmentShader =
                'uniform float uDakshaExperience;\nuniform float uDakshaTransitionScan;\nuniform float uDakshaGhostFrom;\nuniform float uDakshaBlueFrom;\nuniform float uDakshaBlackFrom;\nuniform float uDakshaGhost;\nuniform float uDakshaBlue;\nuniform float uDakshaBlack;\nuniform float uDakshaVisibility;\nuniform float uDakshaScan;\nvarying float vDakshaHeight;\n' +
                shader.fragmentShader.replace(
                  '#include <emissivemap_fragment>',
                  `#include <emissivemap_fragment>
                float scanHeight = mix(-3.5, 3.5, uDakshaExperience);
                float scanMix = 1.0 - smoothstep(scanHeight - 0.28, scanHeight + 0.28, vDakshaHeight);
                float materialMix = mix(uDakshaExperience, scanMix, uDakshaTransitionScan);
                float ghost = mix(uDakshaGhostFrom, uDakshaGhost, materialMix);
                float blue = mix(uDakshaBlueFrom, uDakshaBlue, materialMix);
                float black = mix(uDakshaBlackFrom, uDakshaBlack, materialMix);
                diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.006, 0.012, 0.024), black);
                diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.012, 0.075, 0.16), blue);
                float dakshaRim = pow(1.0 - clamp(abs(dot(normalize(normal), normalize(vViewPosition))), 0.0, 1.0), 2.3);
                float dakshaBand = 1.0 - smoothstep(0.0, 0.045, abs(vDakshaHeight - uDakshaScan));
                totalEmissiveRadiance += vec3(0.003, 0.018, 0.04) * (dakshaRim * 0.7 + dakshaBand * 0.3) * ghost;
                diffuseColor.a *= mix(1.0, 0.18 + dakshaRim * 0.28, ghost) * uDakshaVisibility;
                float scanLine = exp(-pow((vDakshaHeight - scanHeight) / 0.065, 2.0));
                totalEmissiveRadiance += vec3(0.08, 0.48, 0.75) * scanLine * uDakshaTransitionScan;`
                )
              injectAssemblyShader(shader, assemblyUniforms)
            }
            material.customProgramCacheKey = () =>
              'daksha-story-material-v7-scan'
          })
          model.children.forEach(node => {
            const offset = OFFSETS[node.name] ||
              OFFSETS[node.userData.part] || [0, 0, 0]
            parts.push({
              node,
              key: node.userData.part || node.name,
              origin: node.position.clone(),
              offset: new THREE.Vector3(...offset)
            })
          })
          rig.add(model)
          assemblyGuides.build()
          try {
            await resourcesReady
            if (disposed) return
            if (resourceError) throw new Error('A scene texture failed to load')
            warming = true
            cancelAnimationFrame(frame)
            onProgress(68)
            // The alpha-capable shader is shared by solid and x-ray views.
            const textures = new Set()
            surfaceMaterials.forEach(material => {
              for (const value of Object.values(material))
                if (value?.isTexture) textures.add(value)
            })
            textures.forEach(texture => renderer.initTexture(texture))
            // Compile the guide material too, without drawing later chapters.
            assemblyGuides.lines.visible = true
            const previousTarget = renderer.getRenderTarget()
            // The world is drawn into linear HDR targets in both VR and the
            // composer. Compile for that target instead of a second screen variant.
            if (composer) renderer.setRenderTarget(composer.renderTarget1)
            try {
              await renderer.compileAsync(scene, camera)
            } finally {
              renderer.setRenderTarget(previousTarget)
              assemblyGuides.lines.visible = false
            }
            if (disposed) return
            await headsetPortal?.prepare(renderer)
            if (disposed) return
            const saved = { ...stateRef.current }
            // Two representative renders upload geometry and warm the lens and
            // post-processing paths. Later chapters reuse the same shader code.
            const samples =
              variant === 'story'
                ? [
                    { chapter: 1.65, interactive: false },
                    { chapter: 2.45, interactive: false }
                  ]
                : [{ progress: 0.35 }]
            for (let i = 0; i < samples.length; i++) {
              Object.assign(stateRef.current, samples[i])
              render()
              onProgress(74 + ((i + 1) / samples.length) * 24)
              await new Promise(resolve => requestAnimationFrame(resolve))
              if (disposed) return
            }
            Object.assign(stateRef.current, saved)
            lastAssembly = false
            render()
            warming = false
            mount.dataset.ready = 'true'
            onProgress(100)
            onReady()
          } catch {
            warming = false
            if (!disposed) onError()
          }
        })
        .catch(() => {
          if (!disposed) onError()
        })
    } catch {
      onError()
    }

    const visibilityObserver = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting
      if (visible) invalidate()
    })
    visibilityObserver.observe(mount)
    const onVisibility = () => {
      if (!document.hidden) invalidate()
    }
    document.addEventListener('visibilitychange', onVisibility)
    const pointerDown = event => {
      if (!model || event.button > 0 || headsetPortal?.active) return
      gsap.killTweensOf(drag)
      dragStart = { x: event.clientX, y: event.clientY, rx: drag.x, ry: drag.y }
    }
    const pointerMove = event => {
      if (!dragStart) return
      const dx = event.clientX - dragStart.x
      const dy = event.clientY - dragStart.y
      if (event.pointerType === 'touch' && Math.abs(dy) > Math.abs(dx)) return
      if (Math.abs(dx) > 6 && !mount.hasPointerCapture(event.pointerId))
        mount.setPointerCapture(event.pointerId)
      drag.x = dragStart.rx + dx * 0.006
      drag.y = THREE.MathUtils.clamp(dragStart.ry + dy * 0.003, -0.65, 0.65)
      invalidate()
    }
    const pointerUp = event => {
      const start = dragStart
      dragStart = null
      if (
        !start ||
        !event ||
        (variant !== 'modes' && variant !== 'story') ||
        !onSelectPart ||
        !model ||
        event.type === 'pointercancel' ||
        event.type === 'lostpointercapture'
      )
        return
      if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 6)
        return
      const rect = mount.getBoundingClientRect()
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        (-(event.clientY - rect.top) / rect.height) * 2 + 1
      )
      raycaster.setFromCamera(pointer, viewCamera)
      const hits = raycaster.intersectObjects(selectableMeshes, false)
      const hit = hits.find(item => {
        let node = item.object
        while (node) {
          if (!node.visible) return false
          node = node.parent
        }
        return true
      })
      if (hit) {
        const material = Array.isArray(hit.object.material)
          ? hit.object.material[hit.face?.materialIndex || 0]
          : hit.object.material
        onSelectPart(material.userData.part)
      }
    }
    const keyDown = event => {
      if (!model) return
      if (event.key === 'Home') {
        event.preventDefault()
        reset()
        return
      }
      const steps = {
        ArrowLeft: [-0.2, 0],
        ArrowRight: [0.2, 0],
        ArrowUp: [0, -0.15],
        ArrowDown: [0, 0.15]
      }
      const step = steps[event.key]
      if (!step) return
      event.preventDefault()
      gsap.to(drag, {
        x: drag.x + step[0],
        y: THREE.MathUtils.clamp(drag.y + step[1], -0.65, 0.65),
        duration: stateRef.current.reducedMotion ? 0 : 0.2,
        overwrite: true,
        onUpdate: invalidate
      })
    }
    const contextLost = event => {
      event.preventDefault()
      onError()
    }
    mount.addEventListener('pointerdown', pointerDown)
    mount.addEventListener('pointermove', pointerMove)
    mount.addEventListener('pointerup', pointerUp)
    mount.addEventListener('pointercancel', pointerUp)
    mount.addEventListener('lostpointercapture', pointerUp)
    mount.addEventListener('keydown', keyDown)
    window.addEventListener('pointerup', pointerUp)
    renderer?.domElement.addEventListener('webglcontextlost', contextLost)
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      gsap.killTweensOf(drag)
      observer?.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      mount.removeEventListener('pointerdown', pointerDown)
      mount.removeEventListener('pointermove', pointerMove)
      mount.removeEventListener('pointerup', pointerUp)
      mount.removeEventListener('pointercancel', pointerUp)
      mount.removeEventListener('lostpointercapture', pointerUp)
      mount.removeEventListener('keydown', keyDown)
      window.removeEventListener('pointerup', pointerUp)
      renderer?.domElement.removeEventListener('webglcontextlost', contextLost)
      draco.dispose()
      if (model) disposeModel(model)
      disposeModel(guides)
      assemblyGuides.dispose()
      if (headsetPortal) {
        disposeModel(headsetPortal.scene)
        headsetPortal.dispose()
      }
      flightEffect?.dispose()
      storyEnvironment?.dispose()
      environment?.dispose()
      composer?.passes.forEach(pass => pass.dispose?.())
      composer?.dispose()
      renderer?.dispose()
      renderer?.domElement.remove()
      controllerRef.current = null
    }
  }, [
    stateRef,
    controllerRef,
    onReady,
    onError,
    onProgress,
    variant,
    onFrame,
    onSelectPart,
    onAssemblyChange
  ])

  return (
    <div
      ref={mountRef}
      data-variant={variant}
      className={styles.canvas}
      tabIndex={0}
      role="group"
      aria-roledescription="3D viewer"
      aria-label={
        variant === 'modes'
          ? 'Daksha spacecraft. Drag or use arrow keys to rotate. Click a component to inspect. Use the mode tabs and component buttons to explore. Press Home to reset.'
          : 'Daksha spacecraft. Drag or use arrow keys to rotate. Press Home to reset. Scroll to change view.'
      }
    />
  )
}
