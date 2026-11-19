import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Lenis from 'lenis'

export default function useC2CMotion(
  rootRef,
  motionRef,
  controllerRef,
  onSection
) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const root = rootRef.current
    if (!root) return
    const media = gsap.matchMedia()
    media.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        mobile: '(max-width: 767px)',
        tall: '(min-height: 650px)',
        always: '(min-width: 0px)'
      },
      ({ conditions }) => {
        const q = gsap.utils.selector(root)
        const lenis = conditions.motion
          ? new Lenis({
              lerp: 0.12,
              smoothWheel: true,
              syncTouch: false,
              anchors: { offset: -10 }
            })
          : null
        const tick = time => lenis?.raf(time * 1000)
        if (lenis) {
          lenis.on('scroll', ScrollTrigger.update)
          gsap.ticker.add(tick)
        }
        root.dataset.scrollEngine = lenis ? 'lenis' : 'native'
        root.dataset.motion = conditions.motion ? 'full' : 'reduced'
        root.dataset.scrollStory =
          conditions.motion && conditions.tall ? 'pinned' : 'natural'
        const update = () => controllerRef.current?.invalidate()
        Object.assign(motionRef.current, {
          turn: -0.55,
          tilt: 0.35,
          roll: -0.05,
          scale: 0.5,
          x: 0,
          y: -0.35,
          split: 0,
          progress: 0,
          fallTime: conditions.motion ? 0 : 1.4
        })
        update()
        if (conditions.motion) {
          const stage = q('[data-impact-stage]')[0]
          const beats = q('[data-impact-beat]')
          gsap.set(beats.slice(1), { autoAlpha: 0 })
          const timeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: q('[data-impact]')[0],
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.22,
              onUpdate: self => {
                root.dataset.cubeProgress = self.progress.toFixed(4)
              }
            },
            onUpdate: update
          })
          const pose = motionRef.current
          timeline.to(pose, { progress: 1, duration: 6 }, 0)
          // One unit of fall time to impact, followed by a short rebound.
          timeline.to(pose, { fallTime: 1.4, duration: 1.19 }, 1.18)
          timeline.to(pose, {
            turn: 0.22, tilt: 0.34, roll: 0.04, y: -0.52,
            scale: 0.68, split: 0.48, duration: 1.8, ease: 'sine.inOut'
          }, 0)
          timeline.to(beats[0], { autoAlpha: 0, y: -44, duration: 0.6 }, 1.2)
          timeline.to(stage, { backgroundColor: '#edf3ed', color: '#047857', duration: 1 }, 1.3)
          timeline.fromTo(beats[1], { y: 48 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 1.8)
          timeline.to(pose, {
            turn: -0.32, tilt: 0.52, roll: -0.08, y: -0.76,
            scale: 0.83, split: 0.65, duration: 2, ease: 'sine.inOut'
          }, 1.8)
          timeline.to(beats[1], { autoAlpha: 0, y: -44, duration: 0.65 }, 3.35)
          timeline.fromTo(beats[2], { y: 48 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 3.9)
          timeline.to(pose, {
            turn: 0.5, tilt: 0.25, roll: 0.02, y: -0.56,
            scale: 0.64, split: 0.24, duration: 2.2, ease: 'sine.inOut'
          }, 3.8)
          q('[data-reveal]').forEach(el => {
            gsap.fromTo(
              el,
              { y: 48, opacity: 0.2 },
              {
                y: 0,
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 96%',
                  end: 'top 68%',
                  scrub: true
                }
              }
            )
          })
          if (conditions.tall) {
            const carousel = q('[data-carousel]')[0]
            const carouselStory = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: q('[data-carousel-story]')[0],
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.4,
                invalidateOnRefresh: true,
                onUpdate: self => {
                  root.dataset.interactionsProgress = self.progress.toFixed(4)
                }
              }
            })
            carouselStory.to({}, { duration: 0.25 })
            carouselStory.fromTo(
              carousel,
              { scrollLeft: 0 },
              {
                scrollLeft: () =>
                  Math.max(0, carousel.scrollWidth - carousel.clientWidth),
                duration: 3
              }
            )
            carouselStory.to({}, { duration: 0.25 })

            const cards = q('[data-process-card]')
            const process = gsap.timeline({
              defaults: { ease: 'power2.out' },
              scrollTrigger: {
                trigger: q('[data-process-story]')[0],
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5,
                invalidateOnRefresh: true,
                onUpdate: self => {
                  root.dataset.processProgress = self.progress.toFixed(4)
                }
              }
            })
            process.fromTo(
              q('[data-process-heading]'),
              { y: 100, scale: 1.12, opacity: 0.35 },
              { y: 0, scale: 1, opacity: 1, duration: 0.8 },
              0
            )
            gsap.set(cards, {
              yPercent: 80,
              scale: 0.88,
              opacity: 0,
              rotation: i => (i - 1.5) * 5
            })
            process.to(
              cards,
              {
                yPercent: 0,
                scale: 1,
                opacity: 1,
                rotation: 0,
                stagger: 0.32,
                duration: 1.2
              },
              0.4
            )
            process.fromTo(
              cards.map(card => card.querySelector('img')),
              { yPercent: 8, scale: 1.18 },
              {
                yPercent: -3,
                scale: 1.06,
                stagger: 0.16,
                duration: 1.5,
                ease: 'none'
              },
              0.65
            )
            process.to({}, { duration: 0.45 })
          }
          const floats = q('[data-float]')
          const gallery = gsap.timeline({
            defaults: { ease: 'sine.inOut' },
            scrollTrigger: {
              trigger: q('[data-gallery]')[0],
              start: conditions.tall ? 'top top' : 'top bottom',
              end: conditions.tall ? 'bottom bottom' : 'bottom top',
              scrub: 0.7,
              onUpdate: self => {
                root.dataset.ideaProgress = self.progress.toFixed(4)
              }
            }
          })
          gallery.fromTo(
            q('[data-gallery-heading]'),
            { y: 55, scale: 0.88, opacity: 0.25 },
            { y: 0, scale: 1, opacity: 1, duration: 1.1 },
            0
          )
          gsap.set(floats, {
            x: i => (i % 2 ? 1 : -1) * (conditions.mobile ? 60 : 140),
            y: i => (i < 3 ? -1 : 1) * (conditions.mobile ? 90 : 160),
            scale: 0.65,
            opacity: 0.15,
            rotation: i => (i % 2 ? 1 : -1) * 13
          })
          gallery.to(
            floats,
            {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              rotation: i => (i % 2 ? -1 : 1) * 3,
              stagger: 0.08,
              duration: 1.3
            },
            0.05
          )
          gallery.to(
            floats,
            {
              y: i => (i % 2 ? -1 : 1) * (conditions.mobile ? 28 : 55),
              rotation: i => (i % 2 ? 1 : -1) * 5,
              scale: i => (i % 2 ? 1.06 : 0.95),
              stagger: 0.04,
              duration: 1.8
            },
            1.4
          )
          gallery.to(
            q('[data-gallery-heading]'),
            { scale: 1.035, duration: 1.5 },
            1.6
          )
        }
        const ids = [
          'discover',
          'meet',
          'action',
          'interactions',
          'process',
          'idea',
          'people',
          'report'
        ]
        ids.forEach((id, index) =>
          ScrollTrigger.create({
            trigger: root.querySelector(`#${id}`),
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: () => onSection(index),
            onEnterBack: () => onSection(index)
          })
        )
        let alive = true
        const refresh = () => {
          if (alive) {
            lenis?.resize()
            ScrollTrigger.refresh()
            update()
          }
        }
        document.fonts.ready.then(refresh)
        root.addEventListener('load', refresh, true)
        return () => {
          alive = false
          root.removeEventListener('load', refresh, true)
          gsap.ticker.remove(tick)
          lenis?.off('scroll', ScrollTrigger.update)
          lenis?.destroy()
          delete root.dataset.scrollEngine
          delete root.dataset.scrollStory
        }
      },
      root
    )
    return () => media.revert()
  }, [rootRef, motionRef, controllerRef, onSection])
}
