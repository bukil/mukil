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

function drawScreen(ctx, w, h, p, time, isForth, rotX = 0) {
  ctx.save()
  // Matte obsidian background
  ctx.fillStyle = '#0a141a'
  ctx.fillRect(0, 0, w, h)

  // Outer technical bezel border
  ctx.strokeStyle = '#163328'
  ctx.lineWidth = 4
  ctx.strokeRect(18, 18, w - 36, h - 36)

  // Top header status bar
  ctx.fillStyle = '#10221c'
  ctx.fillRect(20, 20, w - 40, 72)
  ctx.strokeStyle = '#1b3f32'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(20, 92)
  ctx.lineTo(w - 20, 92)
  ctx.stroke()

  // Protocol label & live ROT_X degrees readout
  ctx.font = 'bold 24px monospace'
  ctx.fillStyle = '#59c994'
  ctx.fillText('C2C // PROTOCOL', 44, 62)

  const rotDeg = rotX * (180 / Math.PI)
  ctx.font = '20px monospace'
  ctx.fillStyle = '#789c92'
  ctx.fillText(
    `ROT_X: ${rotDeg >= 0 ? '+' : ''}${rotDeg.toFixed(1)}°`,
    w - 360,
    62
  )

  const modeTag = isForth ? '+X FORTH' : '-X BACK'
  ctx.fillText(modeTag, w - 180, 62)

  // Live status LED
  ctx.fillStyle = isForth ? '#59c994' : '#ff8eb2'
  ctx.beginPath()
  ctx.arc(w - 202, 56, 7, 0, Math.PI * 2)
  ctx.fill()

  // Real-time oscilloscope audio/telemetry wave across the header bottom
  ctx.strokeStyle = 'rgba(89, 201, 148, 0.45)'
  ctx.lineWidth = 2
  ctx.beginPath()
  for (let ox = 24; ox <= w - 24; ox += 12) {
    const oy =
      84 +
      Math.sin(time * 0.009 + ox * 0.025) *
        5 *
        (p < 0.28 ? 0.7 : p < 0.62 ? 1.0 : 1.4)
    if (ox === 24) ctx.moveTo(ox, oy)
    else ctx.lineTo(ox, oy)
  }
  ctx.stroke()

  // 4 Modes corresponding to X rotation:
  // 0.00 .. 0.28: Loading / Pairing
  // 0.28 .. 0.62: Scrolling in Screen (Files / Directory)
  // 0.62 .. 0.88: Volume control with dynamic audio visualizer
  // 0.88 .. 1.00: Focus / Pomodoro Timer
  if (p < 0.28) {
    // ──── 1. LOADING / CONNECTING ────
    const sub = p / 0.28
    const percent = Math.min(100, Math.round(sub * 100))

    ctx.font = 'bold 28px monospace'
    ctx.fillStyle = '#a0f6cf'
    ctx.fillText('HARDWARE SYNC // C2C_LINK', 44, 150)

    ctx.font = '20px monospace'
    ctx.fillStyle = '#789c92'
    ctx.fillText('CONNECTING CUBE CONTROLLER...', 44, 185)

    // Center circular radar spinner
    const cx = w / 2
    const cy = 340
    const radius = 95

    // Outer track
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.strokeStyle = '#162e24'
    ctx.lineWidth = 10
    ctx.stroke()

    // Rotating arc
    const spinAngle = (time * 0.005) % (Math.PI * 2)
    ctx.beginPath()
    ctx.arc(cx, cy, radius, spinAngle, spinAngle + Math.PI * 1.3)
    ctx.strokeStyle = '#59c994'
    ctx.lineWidth = 10
    ctx.lineCap = 'round'
    ctx.stroke()
    ctx.lineCap = 'butt'

    // Orbiting particle dots around the radar
    for (let d = 0; d < 6; d++) {
      const dAngle = time * 0.003 + (d * Math.PI) / 3
      const dx = cx + Math.cos(dAngle) * 125
      const dy = cy + Math.sin(dAngle) * 125
      ctx.fillStyle = d % 2 === 0 ? '#59c994' : '#a0f6cf'
      ctx.beginPath()
      ctx.arc(dx, dy, 4, 0, Math.PI * 2)
      ctx.fill()
    }

    // Percentage inside ring
    ctx.font = 'bold 64px monospace'
    ctx.fillStyle = '#e1fff0'
    ctx.textAlign = 'center'
    ctx.fillText(`${percent}%`, cx, cy + 22)
    ctx.textAlign = 'left'

    // Progress bar
    const barX = 80
    const barY = 485
    const barW = w - 160
    const barH = 40
    ctx.strokeStyle = '#285442'
    ctx.lineWidth = 3
    ctx.strokeRect(barX, barY, barW, barH)

    ctx.fillStyle = '#112920'
    ctx.fillRect(barX + 4, barY + 4, barW - 8, barH - 8)

    ctx.fillStyle = '#59c994'
    ctx.fillRect(barX + 4, barY + 4, (barW - 8) * sub, barH - 8)

    // Hex register telemetry footer
    const hexSeq = ['0x4F', '0x82', '0xC1', '0x9D', '0x3E', '0xAA']
    const activeHex = hexSeq[Math.floor(time * 0.003) % hexSeq.length]
    ctx.font = '19px monospace'
    ctx.fillStyle = '#6a8c82'
    ctx.fillText(
      `DEVICE: MARBLE_VITRINE   STREAM: ${(sub * 128.4).toFixed(1)} KB/s   REG: [${activeHex}]`,
      80,
      580
    )
    ctx.fillText(
      'STATUS: ' +
        (percent === 100 ? 'LINK ESTABLISHED' : 'DOWNLINK SYNCING...'),
      80,
      615
    )
  } else if (p < 0.62) {
    // ──── 2. SCROLLING IN THE SCREEN (FILES / DIRECTORY) ────
    const sub = (p - 0.28) / (0.62 - 0.28)

    ctx.font = 'bold 28px monospace'
    ctx.fillStyle = '#a0f6cf'
    ctx.fillText('STORAGE // DIRECTORY', 44, 145)

    ctx.font = '20px monospace'
    ctx.fillStyle = '#789c92'
    ctx.fillText('ROTARY SCROLL IN PROGRESS', 44, 180)

    const files = [
      { id: '01', name: 'MARBLE_VITRINE.OBJ', size: '14.2 MB', ext: '3D' },
      { id: '02', name: 'REFRACTION_MAP.EXR', size: '512 KB', ext: 'HDR' },
      { id: '03', name: 'GLASS_CAUSTICS.SHD', size: '8.7 MB', ext: 'GLSL' },
      { id: '04', name: 'TACTILE_HAPTICS.WAV', size: '24.1 MB', ext: 'PCM' },
      { id: '05', name: 'SYSTEM_MANIFEST.DAT', size: '64 KB', ext: 'DATA' }
    ]

    const selectedIndex = Math.min(4, Math.floor(sub * 5))
    const listY = 220
    const rowH = 78

    files.forEach((file, idx) => {
      const y = listY + idx * rowH
      const isSelected = idx === selectedIndex

      if (isSelected) {
        ctx.fillStyle = '#174032'
        ctx.fillRect(44, y - 10, w - 130, rowH - 12)
        ctx.strokeStyle = '#59c994'
        ctx.lineWidth = 3
        ctx.strokeRect(44, y - 10, w - 130, rowH - 12)

        // Pulsing selector arrow
        const arrowOffset = Math.sin(time * 0.01) * 4
        ctx.font = 'bold 26px monospace'
        ctx.fillStyle = '#59c994'
        ctx.fillText('▸', 60 + arrowOffset, y + 36)

        ctx.fillStyle = '#ffffff'
        ctx.fillText(file.id + '  ' + file.name, 96, y + 36)

        ctx.font = '20px monospace'
        ctx.fillStyle = '#a0f6cf'
        ctx.fillText(file.ext + '  ' + file.size, w - 320, y + 36)
      } else {
        ctx.fillStyle = '#0e1d1a'
        ctx.fillRect(44, y - 10, w - 130, rowH - 12)

        ctx.font = '24px monospace'
        ctx.fillStyle = '#5a786f'
        ctx.fillText('  ' + file.id + '  ' + file.name, 60, y + 36)

        ctx.font = '19px monospace'
        ctx.fillStyle = '#456057'
        ctx.fillText(file.size, w - 240, y + 36)
      }
    })

    // Scrollbar on right
    const sbX = w - 65
    const sbY = listY - 10
    const sbH = files.length * rowH - 12
    ctx.fillStyle = '#142620'
    ctx.fillRect(sbX, sbY, 14, sbH)

    const thumbH = 65
    const thumbY = sbY + sub * (sbH - thumbH)
    ctx.fillStyle = '#59c994'
    ctx.fillRect(sbX, thumbY, 14, thumbH)

    ctx.font = '19px monospace'
    ctx.fillStyle = '#6a8c82'
    ctx.fillText(
      'SELECTED: ' +
        files[selectedIndex].name +
        '   TRANSFER: 48.2 MB/s   [ITEM ' +
        (selectedIndex + 1) +
        '/5]',
      44,
      650
    )
  } else if (p < 0.88) {
    // ──── 3. VOLUME CONTROL ────
    const sub = (p - 0.62) / (0.88 - 0.62)
    const vol = Math.round(18 + sub * 72) // 18% to 90%

    ctx.font = 'bold 28px monospace'
    ctx.fillStyle = '#a0f6cf'
    ctx.fillText('AUDIO // LEVEL GAIN', 44, 145)

    ctx.font = '20px monospace'
    ctx.fillStyle = '#789c92'
    ctx.fillText('ROTARY MASTER VOLUME', 44, 180)

    ctx.font = 'bold 96px monospace'
    ctx.fillStyle = '#e1fff0'
    ctx.fillText(`VOL  ${vol}%`, 44, 290)

    // Segmented Volume Meter (28 vertical bars)
    const barStartX = 44
    const barY = 340
    const numBars = 28
    const totalW = w - 88
    const gap = 8
    const singleW = (totalW - (numBars - 1) * gap) / numBars
    const activeCount = Math.round((vol / 100) * numBars)

    for (let k = 0; k < numBars; k++) {
      const bx = barStartX + k * (singleW + gap)
      const bh = 50 + (k / numBars) * 45
      const by = barY + (95 - bh)

      if (k < activeCount) {
        ctx.fillStyle = k > 23 ? '#ff8eb2' : '#59c994'
      } else {
        ctx.fillStyle = '#162822'
      }
      ctx.fillRect(bx, by, singleW, bh)
    }

    // Dynamic Live Equalizer Spectrum with falling peak caps
    ctx.font = '20px monospace'
    ctx.fillStyle = '#789c92'
    ctx.fillText(
      `SPECTRUM ANALYZER [PEAK: ${(vol * 0.18 - 18).toFixed(1)} dB • 96kHz / 24-BIT]`,
      44,
      490
    )

    const eqCount = 20
    const eqStartX = 44
    const eqTotalW = w - 88
    const eqGap = 10
    const eqBarW = (eqTotalW - (eqCount - 1) * eqGap) / eqCount
    const eqBaseY = 640

    for (let j = 0; j < eqCount; j++) {
      const wave = Math.sin(time * 0.008 + j * 0.6) * 0.5 + 0.5
      const wave2 = Math.cos(time * 0.005 + j * 1.1) * 0.5 + 0.5
      const hNorm = (wave * 0.6 + wave2 * 0.4) * (vol / 100)
      const eqH = Math.max(8, hNorm * 110)
      const ex = eqStartX + j * (eqBarW + eqGap)

      ctx.fillStyle = j > 16 && vol > 70 ? '#ff8eb2' : '#45b882'
      ctx.fillRect(ex, eqBaseY - eqH, eqBarW, eqH)

      // Peak hold cap bar
      ctx.fillStyle = '#e1fff0'
      ctx.fillRect(ex, eqBaseY - eqH - 5, eqBarW, 3)
    }
  } else {
    // ──── 4. FOCUS / TIMER ────
    const sub = (p - 0.88) / (1.0 - 0.88)

    ctx.font = 'bold 28px monospace'
    ctx.fillStyle = '#ff8eb2'
    ctx.fillText('POMODORO // FOCUS', 44, 145)

    ctx.font = '20px monospace'
    ctx.fillStyle = '#a67283'
    ctx.fillText('SESSION 03 / 04 ACTIVE', 44, 180)

    const secs = 60 - Math.floor(sub * 25)
    const secStr = secs < 10 ? '0' + secs : '' + secs
    ctx.font = 'bold 125px monospace'
    ctx.fillStyle = '#e1fff0'
    ctx.fillText(`24:${secStr}`, 44, 335)

    // Breathing timer arc
    ctx.strokeStyle = '#ff8eb2'
    ctx.lineWidth = 4
    ctx.beginPath()
    const arcRadius = 70 + Math.sin(time * 0.006) * 6
    ctx.arc(w - 180, 290, arcRadius, 0, Math.PI * 2)
    ctx.stroke()

    ctx.font = '40px monospace'
    ctx.fillStyle = '#ff8eb2'
    ctx.fillText('● ● ● ○', 44, 415)

    const barX = 44
    const barY = 475
    const barW = w - 88
    ctx.strokeStyle = '#5a3040'
    ctx.lineWidth = 3
    ctx.strokeRect(barX, barY, barW, 36)

    ctx.fillStyle = '#ff8eb2'
    ctx.fillRect(barX + 4, barY + 4, (barW - 8) * (0.65 + sub * 0.32), 28)

    ctx.font = '20px monospace'
    ctx.fillStyle = '#789c92'
    ctx.fillText(
      'HAPTIC FEEDBACK: ARMED   REVERSE ROTATION TO RETURN',
      44,
      575
    )
    ctx.fillText('TANGIBLE C2C WORKSPACE', 44, 610)
  }

  // CRT sweeping phosphor scanline across the display
  const scanY = (time * 0.28) % h
  const scanGrad = ctx.createLinearGradient(0, scanY - 24, 0, scanY + 24)
  scanGrad.addColorStop(0, 'rgba(160, 246, 207, 0)')
  scanGrad.addColorStop(0.5, 'rgba(160, 246, 207, 0.08)')
  scanGrad.addColorStop(1, 'rgba(160, 246, 207, 0)')
  ctx.fillStyle = scanGrad
  ctx.fillRect(20, scanY - 24, w - 40, 48)

  ctx.restore()
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

  // ── LEFT CUBE (Primary — active display with rich interface animations) ──
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
  screen.width = 1024
  screen.height = 768
  const ctx = screen.getContext('2d')
  drawScreen(ctx, 1024, 768, 0, 0, true, 0)

  const texture = new THREE.CanvasTexture(screen)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter

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

  // ── RIGHT CUBE (Companion — clean glass & metal controller, NO screen, NO buttons, NO dial) ──
  const companion = new THREE.Group()
  const companionBody = new THREE.Mesh(box, dark)
  companionBody.userData.c2cGlass = true
  companion.add(companionBody)

  const companionPlate = new THREE.Mesh(
    new RoundedBoxGeometry(1.48, 0.07, 1.48, 2, 0.03),
    cap
  )
  companionPlate.position.y = 0.79
  companion.add(companionPlate)

  primary.position.x = -0.85
  companion.position.x = 0.85
  group.add(primary, companion)
  return {
    group,
    primary,
    companion,
    screen,
    ctx,
    texture
  }
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
    const render = (time = 0) => {
      frame = 0
      if (disposed || !inView || document.hidden || !renderer) return
      frame = requestAnimationFrame(render)
      const state = motionRef.current
      activePair.companion.position.x = 0.85 + state.split * 0.5
      activePair.primary.position.x = -0.85 - state.split * 0.5

      // ── Clean Choreography: Normal Overview -> Zoom In -> Complete Interfaces -> Zoom Out -> Rest ──
      const cyclePeriod = 20000 // 20s complete demonstration cycle
      const t = ((time || 0) % cyclePeriod) / cyclePeriod

      // Smooth zoom envelope: 0 = normal overview, 1 = deep close-up on the screen
      let zoomProgress = 0
      if (t >= 0.15 && t < 0.23) {
        // Zoom in first (3.0s - 4.6s)
        const f = (t - 0.15) / 0.08
        zoomProgress = f * f * (3 - 2 * f)
      } else if (t >= 0.23 && t < 0.75) {
        // Held deep zoom while interfaces complete (4.6s - 15.0s)
        zoomProgress = 1
      } else if (t >= 0.75 && t < 0.83) {
        // Zoom out also back to overview (15.0s - 16.6s)
        const f = (t - 0.75) / 0.08
        zoomProgress = 1 - f * f * (3 - 2 * f)
      }

      // Base scale reflects the natural overview size (moderate, not big)
      const baseScale = state.scale * (mount.clientWidth < 768 ? 1.5 : 1.0)
      // When zoomed in, zoom up to 2.25x for close inspection of the screen
      const zoomFactor = 1.0 + 1.25 * zoomProgress
      // Pan so the display is centered in view when zoomed in
      const panX = 0.82 * zoomProgress
      const panY = -0.3 * zoomProgress

      // Smoothly tilt and level the view during zoom so the display is flat and easy to read
      const tilt = THREE.MathUtils.lerp(state.tilt, 0.68, zoomProgress)
      const turn = THREE.MathUtils.lerp(state.turn, -0.06, zoomProgress)
      const roll = THREE.MathUtils.lerp(state.roll, 0, zoomProgress)

      rig.rotation.set(tilt, turn, roll)
      rig.position.set(state.x + panX, state.y + panY, 0)
      rig.scale.setScalar(baseScale * zoomFactor)

      // Active interface progression during the zoom window (0.20 .. 0.78)
      const activeWindow = THREE.MathUtils.clamp((t - 0.2) / 0.58, 0, 1)
      const p =
        activeWindow < 0.5
          ? 4 * activeWindow * activeWindow * activeWindow
          : 1 - Math.pow(-2 * activeWindow + 2, 3) / 2

      // Right cube rotates on X axis as the interfaces progress
      const rotX = THREE.MathUtils.lerp(-0.95, 0.95, p)
      activePair.companion.rotation.x = rotX

      // Update screen on left cube through the 4 interface states
      if (study.ctx && study.texture) {
        drawScreen(study.ctx, 1024, 768, p, time || 0, true, rotX)
        study.texture.needsUpdate = true
      }

      glass?.capture(camera)
      renderer.render(scene, camera)
      mount.dataset.turn = state.turn.toFixed(3)
      mount.dataset.model = model ? 'glb' : 'study'
      mount.dataset.primaryScale = activePair.primary.scale.x.toFixed(4)
      mount.dataset.companionScale = activePair.companion.scale.x.toFixed(4)
      mount.dataset.companionRotX = rotX.toFixed(3)
      mount.dataset.zoomFactor = zoomFactor.toFixed(3)
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
      study.texture?.dispose()
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
