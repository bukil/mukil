import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import FlutedShader from '../components/FlutedShader'
import ApplePasswordModal from '../components/ApplePasswordModal'
import styles from '../styles/AppleProject.module.css'

const chapters = [
  ['overview', 'Apple design system', 'The design system app', 'An AI guide to Apple HIG', '#e8e4dd'],
  ['context', 'Design context', 'Working with the guidelines', 'Questions designers bring', '#d7e2cb'],
  ['structure', 'App structure', 'Library navigation', 'Search entry points', '#bdcde4'],
  ['foundations', 'Foundations', 'Design tokens', 'Type and color', '#e9d2db'],
  ['components', 'Component library', 'Patterns and variants', 'Usage guidance', '#eed9b4'],
  ['knowledge', 'Knowledge base', 'Guideline sources', 'Content structure', '#bcdad3'],
  ['retrieval', 'Retrieval', 'Query context', 'Relevant passages', '#d1c8e2'],
  ['generation', 'Answer design', 'Grounded responses', 'Source citations', '#e9c6b8'],
  ['interaction', 'Interaction design', 'Asking a question', 'Exploring an answer', '#d5dfc3'],
  ['evaluation', 'Evaluation', 'Design system coverage', 'Answer quality', '#c2d5df']
]

function Project() {
  const root = useRef(null)
  const scroll = useRef(null)
  const [active, setActive] = useState(0)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()
    media.add({ animated: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)' }, context => {
      const animated = context.conditions.animated
      const lenis = animated ? new Lenis({ lerp: 0.09 }) : null
      scroll.current = lenis
      const tick = time => lenis.raf(time * 1000)
      if (lenis) {
        lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.add(tick)
      }
      root.current.querySelectorAll('section').forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section, start: 'top center', end: 'bottom center',
          onToggle: self => { if (self.isActive) setActive(i) }
        })
        if (!animated) return
        const panel = section.querySelector('figure')
        const header = section.querySelector('header')
        const letters = header.querySelectorAll('[data-letter]')
        const words = header.querySelectorAll('[data-word]')
        const titleStarts = [
          { yPercent: 115, rotation: 12 },
          { yPercent: -112, rotationX: -76, transformPerspective: 460 },
          { xPercent: -105, skewX: -14, opacity: 0 },
          { yPercent: 82, scaleY: .35, transformOrigin: 'center bottom' }
        ]
        const direction = i % 2 ? -1 : 1
        const masks = [
          'inset(31% 25% 31% 25% round 45%)',
          'inset(0% 82% 0% 0% round 2%)',
          'inset(48% 8% 45% 8% round 12%)'
        ]
        const panelStarts = {
          structure: { xPercent: 36, rotationY: -38, transformOrigin: 'left center' },
          components: { rotationX: 58, yPercent: 12, transformOrigin: 'center bottom' },
          retrieval: { scale: 1.45, rotation: -12 },
          interaction: { xPercent: -28, skewX: -12 },
          evaluation: { yPercent: 22, rotationX: -28, scale: .74 }
        }
        const entrance = gsap.timeline(i === 0 ? {} : {
          scrollTrigger: { trigger: section, start: 'top 96%', end: 'top 12%', scrub: true }
        })
        if (panel) entrance.fromTo(panel, {
            clipPath: masks[i % masks.length], rotation: direction * 7, scale: .88,
            ...panelStarts[section.id]
          }, {
            clipPath: 'inset(0% 0% 0% 0% round 0%)', rotation: 0,
            xPercent: 0, yPercent: 0, rotationX: 0, rotationY: 0, skewX: 0,
            scale: 1, duration: .95, ease: 'power3.inOut'
          }, 0)
        entrance.from(letters.length ? letters : words, {
            ...titleStarts[i % titleStarts.length],
            stagger: { amount: .22, from: i % 4 === 3 ? 'center' : 'start' },
            duration: .52, ease: 'power3.out'
          }, i === 0 ? .12 : .43)
          .from(header.querySelectorAll('[data-caption]'), {
            xPercent: index => i % 2 ? 0 : (index ? 105 : -105),
            yPercent: i % 2 ? 112 : 0, stagger: .1, duration: .48, ease: 'power3.out'
          }, .72)
        if (panel) entrance.from(panel.querySelector('span'), {
            xPercent: 32 * direction, scale: 1.4, duration: .86, ease: 'power2.out'
          }, .12)
        if (i > 0) {
          const sideways = i % 3 === 2
          gsap.fromTo(section.querySelectorAll('[data-shutter]'), {
            scaleX: 1, scaleY: 1,
            transformOrigin: sideways ? 'right center' : 'center top'
          }, {
            scaleX: sideways ? 0 : 1, scaleY: sideways ? 1 : 0,
            ease: 'power2.inOut', stagger: { each: .075, from: i % 3 === 0 ? 'center' : 'start' },
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'top 42%', scrub: true }
          })
        }
        if (i < chapters.length - 1) {
          const exit = gsap.timeline({
            scrollTrigger: { trigger: section, start: 'bottom 78%', end: 'bottom top', scrub: true }
          })
          exit.to(header, { yPercent: -14, ease: 'power2.in' }, 0)
          if (panel) exit.to(panel, { yPercent: -9, rotation: -4 * direction, ease: 'power2.in' }, 0)
        }
      })
      ScrollTrigger.refresh()
      return () => {
        if (lenis) gsap.ticker.remove(tick)
        lenis?.destroy()
        scroll.current = null
      }
    })
    return () => media.revert()
  }, [])
  return <main ref={root} className={styles.page}>
    <nav className={styles.spy} aria-label="Project chapters">
      <span aria-hidden="true">{chapters[active][1]}</span>
      {chapters.map(([id, title], i) => <a key={id} href={'#' + id} title={title}
        aria-label={title} aria-current={active === i ? 'location' : undefined}
        onClick={event => {
          if (!scroll.current || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
          event.preventDefault()
          window.history.replaceState(null, '', '#' + id)
          scroll.current.scrollTo(document.getElementById(id))
        }}><i /></a>)}
    </nav>
    {chapters.map(([id, title, first, second, color], i) => {
      const fluted = id === 'structure' || id === 'retrieval'
      const Heading = i === 0 ? 'h1' : 'h2'
      const Subheading = i === 0 ? 'h2' : 'h3'
      return <section key={id} id={id} style={{ '--chapter-color': color, '--previous-color': chapters[Math.max(i - 1, 0)][4] }}>
        {i > 0 && <div aria-hidden="true" className={styles.shutters} data-sideways={i % 3 === 2}>
          {Array.from({ length: 5 }, (_, strip) => <i key={strip} data-shutter />)}
        </div>}
        {i === 0 && <div className={styles.heroMaterial} aria-hidden="true"><FlutedShader landing /></div>}
        <header>
          <Heading className={styles.title} data-title aria-label={title}>
            {title.split(' ').map((word, index) => <span key={word} aria-hidden="true">
              {index > 0 && ' '}<span className={styles.wordMask}><span data-word>{i % 2 === 0 ? word : Array.from(word, (letter, j) =>
                <span key={j} data-letter>{letter}</span>
              )}</span></span>
            </span>)}
          </Heading>
          <div className={styles.subheads}>{[first, second].map(caption =>
            <Subheading key={caption}><span data-caption>{caption}</span></Subheading>
          )}</div>
        </header>
        {i > 0 && <figure data-fluted={fluted || undefined} role="img" aria-label={fluted ? 'Fluted glass with prismatic edges' : title + ' image placeholder'}><span>{fluted && <FlutedShader />}</span></figure>}
      </section>
    })}
  </main>
}

export default function AppleProject() {
  const router = useRouter()
  const [unlocked, setUnlocked] = useState(null)
  useEffect(() => { setUnlocked(localStorage.getItem('apple_project_unlocked') === 'rollno43') }, [])
  return <>
    <Head><title>Apple design system | Mukil Kumar</title></Head>
    {unlocked && <Project />}
    {unlocked === false && <ApplePasswordModal isOpen onClose={() => {
      if (localStorage.getItem('apple_project_unlocked') === 'rollno43') setUnlocked(true)
      else router.push('/')
    }} />}
  </>
}
