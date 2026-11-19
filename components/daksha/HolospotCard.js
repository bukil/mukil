import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Holo, shotCamera } from '../c2c/holospot/holo'
import styles from '../../styles/Daksha.module.css'

const cardSize = { widthMm: 63, heightMm: 88 }

export default function HolospotCard({ onReady }) {
  const mountRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const mount = mountRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera()
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = new THREE.Vector2()
    const tilt = new THREE.Vector2()
    let renderer, holo, card, logo, observer
    let disposed = false
    let released = false
    let previousTime
    let orbitTime = 0

    const follow = event => {
      if (motion.matches || event.pointerType === 'touch') return
      pointer.set(
        (1 - 2 * event.clientY / window.innerHeight) * 0.13,
        (2 * event.clientX / window.innerWidth - 1) * 0.17
      )
    }
    const resetPointer = () => pointer.set(0, 0)
    const release = () => {
      if (released) return
      released = true
      window.clearTimeout(deadline)
      observer?.disconnect()
      window.removeEventListener('pointermove', follow)
      window.removeEventListener('blur', resetPointer)
      renderer?.setAnimationLoop(null)
      holo?.dispose()
      card?.geometry.dispose()
      card?.material.dispose()
      logo?.dispose()
      renderer?.domElement.remove()
      renderer?.dispose()
      renderer?.forceContextLoss()
    }
    const fallback = () => {
      if (disposed || released) return
      release()
      onReady()
    }
    const deadline = window.setTimeout(fallback, 3500)

    try {
      renderer = new THREE.WebGLRenderer()
      renderer.setPixelRatio(0.9)
      renderer.domElement.setAttribute('aria-hidden', 'true')
      mount.appendChild(renderer.domElement)
      holo = new Holo(renderer, {
        compose: 'replace',
        quality: 'low',
        background: '#02050b',
        settings: {
          'dof.on': false,
          'grain.animated': false,
          'scene.print': 'none',
          'card.bow': 0.6,
          'card.bowAxis': 'along',
          'card.corner': 3.2,
          'card.thickness': 0.33
        }
      })
      card = holo.card({
        ...cardSize,
        material: 'prism',
        settings: { 'prism.pitch': 1000, 'prism.pattern': 'concentric' }
      })
      scene.add(card)
      const object = holo.get(card)
      const logoReady = new THREE.TextureLoader()
        .loadAsync('/images/daksha/headset-emboss/daksha.png')
        .then(texture => {
          if (released) texture.dispose()
          else logo = texture
        })
      Promise.all([object.ready, logoReady]).then(() => {
        if (disposed || released) return
        const finish = object.holoMaterial
        finish.uniforms.uDakshaRelief = { value: logo }
        finish.fragmentShader = finish.fragmentShader
          .replace('void main() {', 'uniform sampler2D uDakshaRelief;\nvoid main() {')
          .replace('sB += bowSlope(p);', `
            sB += bowSlope(p);
            vec2 logoUv = (p - vec2(31.5, 44.0)) / 40.0 + 0.5;
            float insideLogo = step(0.0, min(logoUv.x, logoUv.y)) *
              step(max(logoUv.x, logoUv.y), 1.0);
            vec2 markUv = clamp(logoUv, 0.0, 1.0);
            float logoCoverage = texture(uDakshaRelief, markUv).g * insideLogo;
            const float stepUv = 0.006;
            vec2 logoSlope = vec2(
              texture(uDakshaRelief, markUv + vec2(stepUv, 0.0)).r -
                texture(uDakshaRelief, markUv - vec2(stepUv, 0.0)).r,
              texture(uDakshaRelief, markUv + vec2(0.0, stepUv)).r -
                texture(uDakshaRelief, markUv - vec2(0.0, stepUv)).r
            );
            sB += logoSlope * insideLogo * 0.34;
          `)
          .replace('vec3 L = mix(Lc + Lpap + tint * (Lz + Lo),', 
            'vec3 L = mix(Lc + Lpap + tint * (Lz + mix(Lo, 0.08 * Lz, logoCoverage * 0.92)),')
        finish.needsUpdate = true

        const resize = () => {
          const { clientWidth: width, clientHeight: height } = mount
          if (!width || !height) return
          renderer.setSize(width, height, false)
          shotCamera(camera, object, { aspect: width / height })
        }
        const draw = time => {
          if (document.hidden) return
          const delta = Math.min(1 / 30, Math.max(0, (time - (previousTime ?? time)) / 1000))
          previousTime = time
          orbitTime = (orbitTime + delta) % 7
          tilt.lerp(pointer, 1 - Math.exp(-5.5 * delta))
          const phase = orbitTime * 2 * Math.PI / 7
          const cone = motion.matches ? 0 : 0.2
          card.rotation.set(
            motion.matches ? 0 : Math.cos(phase) * cone + tilt.x,
            motion.matches ? 0 : Math.sin(phase) * cone + tilt.y,
            0
          )
          holo.render(scene, camera, { time: orbitTime, dt: delta, still: motion.matches })
        }
        resize()
        observer = new ResizeObserver(resize)
        observer.observe(mount)
        window.addEventListener('pointermove', follow, { passive: true })
        window.addEventListener('blur', resetPointer)
        draw(performance.now())
        renderer.setAnimationLoop(draw)
        window.clearTimeout(deadline)
        setReady(true)
        onReady()
      }).catch(fallback)
    } catch {
      fallback()
    }
    return () => {
      disposed = true
      release()
    }
  }, [onReady])

  return (
    <div className={styles.loadingCard} ref={mountRef} aria-hidden="true" data-ready={ready}>
      {!ready && <div className={styles.loadingCardFallback} />}
    </div>
  )
}
