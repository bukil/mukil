import { useEffect, useRef } from 'react'
import { easeRange } from './scroll-motion.mjs'
import { orbitAnimation } from './orbit-animation.mjs'
import styles from '../../styles/Daksha.module.css'

export default function OrbitalTransition({ controllerRef, enabled }) {
  const mountRef = useRef(null)
  useEffect(() => {
    if (!enabled) return
    let alive = true
    let animation
    let latest
    const mount = mountRef.current
    const update = frame => {
      latest = frame
      const chapter = frame.chapter ?? -1
      const visibility =
        easeRange(chapter, 3.04, 3.22) * (1 - easeRange(chapter, 3.55, 3.9))
      mount.style.opacity = String(visibility * 0.6)
      if (!visibility || !frame.center) return
      mount.style.setProperty('--orbit-x', `${frame.center[0]}px`)
      mount.style.setProperty('--orbit-y', `${frame.center[1]}px`)
      animation?.goToAndStop(
        Math.min(119, Math.max(0, ((chapter - 3.04) / 0.86) * 119)),
        true
      )
    }
    controllerRef.current = { update }
    import('lottie-web/build/player/lottie_light')
      .then(({ default: lottie }) => {
        if (!alive) return
        animation = lottie.loadAnimation({
          container: mount,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          animationData: structuredClone(orbitAnimation),
          rendererSettings: { progressiveLoad: false }
        })
        animation.addEventListener('DOMLoaded', () => {
          if (alive && latest) update(latest)
        })
      })
      .catch(() => {
        mount.style.opacity = '0'
      })
    return () => {
      alive = false
      animation?.destroy()
      controllerRef.current = null
      mount.style.opacity = '0'
    }
  }, [controllerRef, enabled])
  return (
    <div
      ref={mountRef}
      className={styles.orbitalTransition}
      aria-hidden="true"
    />
  )
}
