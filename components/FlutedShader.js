import { useEffect, useRef } from 'react'

const panelPreset = {
  components: [
    { id: 'pearl', type: 'Swirl', props: { colorA: '#777d9a', colorB: '#f5ddc7', detail: 1.6 } },
    { id: 'ribs', type: 'FlutedGlass', props: { angle: 0, frequency: 20, refraction: 3, aberration: .45, shape: 'rounded', softness: .6 } }
  ]
}

// A visually neutral positive value keeps the RGB sampling path compiled between gestures.
const restingAberration = 0.0001

const landingPreset = {
  components: [
    { id: 'swirl', type: 'Swirl', props: { colorA: '#ffffff', colorB: '#f0f0f5', detail: 1.5 } },
    {
      id: 'flow', type: 'ChromaFlow',
      props: {
        baseColor: '#ffffff', downColor: '#4642ff', leftColor: '#56c2fc',
        radius: 4, rightColor: '#5b4fff', upColor: '#7f66ff'
      }
    },
    {
      id: 'glass', type: 'FlutedGlass',
      props: {
        aberration: restingAberration, angle: 30, frequency: 8, lightAngle: -90,
        refraction: 4, shape: 'rounded', softness: 1
      }
    }
  ]
}

function bindMouseAberration(section, shader, motion) {
  let previous
  let lastMove = 0
  let lastFrame = 0
  let frame = 0
  let target = 0
  let strength = 0

  function draw(now) {
    const dt = Math.min(64, now - lastFrame)
    lastFrame = now
    if (now - lastMove > 70) target = 0
    strength += (target - strength) * (1 - Math.exp(-dt / (target > strength ? 45 : 180)))
    if (target === 0 && strength < .003) strength = 0
    shader.update('glass', { aberration: Math.max(restingAberration, strength) })
    frame = strength || target ? requestAnimationFrame(draw) : 0
  }

  function move(event) {
    if (event.pointerType !== 'mouse' || motion.matches) return
    const now = performance.now()
    if (previous && now - lastMove < 180) {
      const distance = Math.hypot(event.clientX - previous.x, event.clientY - previous.y)
      target = Math.min(1, distance / Math.max(1, now - lastMove) / 1.5)
      if (!frame) {
        lastFrame = now
        frame = requestAnimationFrame(draw)
      }
    }
    previous = { x: event.clientX, y: event.clientY }
    lastMove = now
  }

  function reset() {
    previous = null
    target = 0
  }

  section.addEventListener('pointermove', move, { passive: true })
  section.addEventListener('pointerleave', reset)
  window.addEventListener('blur', reset)
  return () => {
    cancelAnimationFrame(frame)
    section.removeEventListener('pointermove', move)
    section.removeEventListener('pointerleave', reset)
    window.removeEventListener('blur', reset)
  }
}

export default function FlutedShader({ landing = false }) {
  return <ShaderCanvas preset={landing ? landingPreset : panelPreset} />
}

export function ShaderCanvas({ preset }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!navigator.gpu || motion.matches) return
    let disposed = false
    let shader
    let removeMouseListener
    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      try {
        const { createShader } = await import('shaders/js')
        if (disposed) return
        shader = await createShader(canvas, preset, {
          disableTelemetry: true,
          onReady: () => { if (!disposed) canvas.style.opacity = '1' },
          onError: () => { canvas.style.opacity = '0' }
        })
        if (disposed) shader.destroy()
        else if (landing && !shader.getFailureReason()) {
          removeMouseListener = bindMouseAberration(canvas.closest('section'), shader, motion)
        }
      } catch {
        canvas.style.opacity = '0'
      }
    }, { rootMargin: '150px' })
    observer.observe(canvas)
    return () => {
      disposed = true
      observer.disconnect()
      removeMouseListener?.()
      shader?.destroy()
    }
  }, [preset])
  return <canvas ref={ref} aria-hidden="true" style={{ width: '100%', height: '100%', display: 'block', opacity: 0 }} />
}
