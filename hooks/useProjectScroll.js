import { useEffect } from 'react'
import Lenis from 'lenis'
import { useIsPresent } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export default function useProjectScroll(pageRef) {
  const isPresent = useIsPresent()

  useEffect(() => {
    if (!isPresent) return
    gsap.registerPlugin(ScrollTrigger)
    const root = pageRef.current
    if (!root) return

    const media = gsap.matchMedia()
    media.add({
      motion: '(prefers-reduced-motion: no-preference)',
      desktop: '(min-width: 768px)',
    }, ({ conditions }) => {
      if (!conditions.motion) return

      const lenis = new Lenis({
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        prevent: node =>
          document.body.hasAttribute('data-scroll-locked') ||
          document.body.style.overflow === 'hidden' ||
          node.hasAttribute?.('data-lenis-prevent') ||
          node.getAttribute?.('role') === 'dialog',
      })
      // Chakra portals sit outside the page root. Pause interpolation while a
      // modal is open, including any momentum left over from the last wheel.
      let modalOpen = false
      const syncModal = () => {
        const open = Boolean(document.querySelector('[aria-modal="true"]'))
        if (open === modalOpen) return
        modalOpen = open
        if (open) lenis.stop()
        else lenis.start()
      }
      const modalObserver = new MutationObserver(syncModal)
      modalObserver.observe(document.body, { childList: true, subtree: true })
      syncModal()

      const tick = time => lenis.raf(time * 1000)
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(tick)

      // Native view timelines follow Lenis's actual scroll position. Use GSAP
      // for browsers without full view-timeline / animation-range support.
      if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
        root.querySelectorAll('[data-project-row]').forEach(row => {
          const card = row.querySelector('[data-project-card]')
          const artwork = row.querySelector('[data-project-artwork]')
          const style = getComputedStyle(row)
          gsap.fromTo(card, {
            y: parseFloat(style.getPropertyValue('--project-entry')) || 0,
            scale: 0.985,
            opacity: 0.65,
          }, {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'clamp(top bottom)',
              end: () => `clamp(top bottom-=${Math.min(row.offsetHeight, window.innerHeight) * 0.85}px)`,
              scrub: true,
            },
          })
          if (artwork) gsap.fromTo(artwork,
            { y: conditions.desktop ? 12 : 6 }, {
              y: conditions.desktop ? -12 : -6,
              ease: 'none',
              scrollTrigger: {
                trigger: row,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            })
        })
      }

      let active = true
      const refresh = () => {
        if (!active) return
        lenis.resize()
        ScrollTrigger.refresh()
      }
      document.fonts.ready.then(refresh)
      root.addEventListener('load', refresh, true)
      root.dataset.scrollEngine = 'lenis'

      return () => {
        active = false
        modalObserver.disconnect()
        root.removeEventListener('load', refresh, true)
        gsap.ticker.remove(tick)
        lenis.off('scroll', ScrollTrigger.update)
        lenis.destroy()
        delete root.dataset.scrollEngine
      }
    }, root)

    return () => media.revert()
  }, [pageRef, isPresent])
}
