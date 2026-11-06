import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import CaseStudy from '../components/daksha/CaseStudy'
import Lenis from 'lenis'
import RevealWords from '../components/daksha/RevealWords'
import {
  STORY_CHAPTERS,
  STORY_GROUPS
} from '../components/daksha/story-chapters'
import styles from '../styles/Daksha.module.css'
import { experienceProgressForScroll } from '../components/daksha/scroll-motion.mjs'

const SpacecraftScene = dynamic(
  () => import('../components/daksha/SpacecraftScene'),
  { ssr: false }
)

export default function DakshaInOrbit() {
  const rootRef = useRef(null)
  const lenisRef = useRef(null)
  const assemblyInfoRef = useRef(null)
  const controllerRef = useRef(null)
  const stageRef = useRef(null)
  const sceneState = useRef({
    chapter: 0,
    progress: 0,
    modeProgress: 0.03,
    interactive: false,
    reducedMotion: false
  })
  const progressRef = useRef(null)
  const [active, setActive] = useState(0)
  const [assembling, setAssembling] = useState(false)
  const [modelStatus, setModelStatus] = useState('loading')
  const [loadProgress, setLoadProgress] = useState(0)
  const [pageProgress, setPageProgress] = useState(0)
  const [pageReady, setPageReady] = useState(false)
  const [sceneKey, setSceneKey] = useState(0)
  const experienceReady = modelStatus === 'ready' && pageReady
  const totalProgress = Math.round(loadProgress * 0.8 + pageProgress * 0.2)
  const [motionEnabled, setMotionEnabled] = useState(true)
  const storyController = useMemo(
    () => ({ stateRef: sceneState, controllerRef }),
    []
  )

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const change = () => setMotionEnabled(!query.matches)
    change()
    query.addEventListener('change', change)
    return () => query.removeEventListener('change', change)
  }, [])

  useEffect(() => {
    let alive = true
    const images = [...rootRef.current.querySelectorAll('main img')]
    let complete = 0
    const tasks = images.map(async image => {
      image.loading = 'eager'
      await image.decode().catch(() => {})
      if (alive) setPageProgress((++complete / Math.max(1, images.length)) * 95)
    })
    Promise.all([...tasks, document.fonts.ready]).then(() => {
      if (alive) {
        setPageProgress(100)
        setPageReady(true)
      }
    })
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    if (experienceReady) return
    const html = document.documentElement
    const body = document.body
    const previous = [
      html.style.overflow,
      body.style.overflow,
      html.style.scrollBehavior
    ]
    const preventScroll = event => {
      if (event.cancelable) event.preventDefault()
    }
    const preventScrollKeys = event => {
      if (event.target?.closest?.('button')) return
      if (
        [
          'ArrowUp',
          'ArrowDown',
          'PageUp',
          'PageDown',
          'Home',
          'End',
          ' '
        ].includes(event.key)
      )
        preventScroll(event)
    }
    window.addEventListener('wheel', preventScroll, { passive: false })
    window.addEventListener('touchmove', preventScroll, { passive: false })
    window.addEventListener('keydown', preventScrollKeys)
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    html.style.scrollBehavior = 'auto'
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      window.removeEventListener('wheel', preventScroll)
      window.removeEventListener('touchmove', preventScroll)
      window.removeEventListener('keydown', preventScrollKeys)
      html.style.overflow = previous[0]
      body.style.overflow = previous[1]
      html.style.scrollBehavior = previous[2]
    }
  }, [experienceReady])

  useEffect(() => {
    if (!experienceReady) return
    gsap.registerPlugin(ScrollTrigger)
    sceneState.current.reducedMotion = !motionEnabled
    const root = rootRef.current
    const sections = STORY_CHAPTERS.map(item =>
      root.querySelector(`#${item.id}`)
    )
    let points = []
    let lastActive = -1
    let alive = true
    let lastPosition = null
    let targetPosition = sceneState.current.chapter
    const lenis = motionEnabled
      ? new Lenis({
          autoRaf: false,
          lerp: 0.095,
          smoothWheel: true,
          syncTouch: false,
          anchors: false,
          prevent: node => node.hasAttribute?.('data-lenis-prevent')
        })
      : null
    lenisRef.current = lenis
    root.dataset.scrollEngine = lenis ? 'lenis' : 'native-reduced'
    const advanceLenis = time => lenis?.raf(time * 1000)
    const syncScroll = () => ScrollTrigger.update()
    if (lenis) {
      lenis.on('scroll', syncScroll)
      gsap.ticker.add(advanceLenis)
      gsap.ticker.lagSmoothing(0)
    }
    const apply = value => {
      if (value === lastPosition) return
      lastPosition = value
      sceneState.current.chapter = value
      sceneState.current.progress = value / (sections.length - 1)
      const index = Math.min(sections.length - 1, Math.floor(value))
      const fraction = value - index
      sceneState.current.interactive = STORY_CHAPTERS[index].id === 'prototype'
      if (sceneState.current.interactive && sceneState.current.modeScroll)
        sceneState.current.modeProgress = Math.min(
          0.99999,
          experienceProgressForScroll(fraction)
        )
      const next = Math.min(index + 1, points.length - 1)
      const y = gsap.utils.interpolate(points[index], points[next], fraction)
      const reveal = gsap.utils.clamp(
        0,
        1,
        (y - innerHeight * 0.16) / (innerHeight * 0.56)
      )
      const stageReveal = motionEnabled
        ? reveal * reveal * (3 - 2 * reveal)
        : reveal
      stageRef.current?.style.setProperty('--stage-reveal', String(stageReveal))
      if (stageRef.current)
        stageRef.current.dataset.revealed = String(stageReveal > 0.02)
      if (progressRef.current)
        progressRef.current.style.transform = `scaleX(${sceneState.current.progress})`
      const current = Math.min(sections.length - 1, Math.round(value))
      if (current !== lastActive) {
        lastActive = current
        setActive(current)
      }
      if (controllerRef.current?.draw) controllerRef.current.draw()
      else controllerRef.current?.invalidate()
    }
    const measure = () => {
      points = sections.map((section, index) =>
        index === 0
          ? 0
          : section.getBoundingClientRect().top +
            window.scrollY +
            Math.min(section.offsetHeight, window.innerHeight) * 0.12
      )
    }
    const update = self => {
      if (!points.length) measure()
      const y = self.scroll()
      let index = 0
      while (index < points.length - 1 && y >= points[index + 1]) index++
      const next = Math.min(index + 1, points.length - 1)
      const fraction =
        next === index
          ? 0
          : gsap.utils.clamp(
              0,
              1,
              (y - points[index]) / Math.max(1, points[next] - points[index])
            )
      const nextPosition = index + fraction
      if (Math.abs(nextPosition - targetPosition) > 0.000001) {
        sceneState.current.modeScroll = true
        gsap.killTweensOf(sceneState.current, 'modeProgress')
      }
      targetPosition = motionEnabled ? nextPosition : Math.round(nextPosition)
      apply(targetPosition)
    }
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        onRefresh: self => {
          measure()
          update(self)
        },
        onUpdate: update
      })
      if (motionEnabled)
        root.querySelectorAll('[data-story-copy]').forEach(copy => {
          const words = copy.querySelectorAll('[data-reveal-word]')
          const details = copy.querySelectorAll('p, a, [data-breakdown-label]')
          const hero = copy.closest('#overview')
          const timeline = gsap.timeline(
            hero
              ? { defaults: { ease: 'power3.out' } }
              : {
                  defaults: { ease: 'power2.out' },
                  scrollTrigger: {
                    trigger: copy,
                    start: 'top 86%',
                    end: 'top 43%',
                    scrub: 0.45
                  }
                }
          )
          timeline
            .fromTo(
              words,
              { yPercent: 112, rotation: 3, opacity: 0 },
              {
                yPercent: 0,
                rotation: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.065
              },
              0
            )
            .fromTo(
              details,
              { y: 18, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.55, stagger: 0.09 },
              0.24
            )
          if (hero)
            gsap.to(copy, {
              yPercent: -14,
              opacity: 0,
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom 38%',
                scrub: true
              }
            })
        })
    }, root)
    document.fonts.ready.then(() => {
      if (alive) {
        lenis?.resize()
        ScrollTrigger.refresh()
      }
    })
    controllerRef.current?.invalidate()
    return () => {
      alive = false
      gsap.ticker.remove(advanceLenis)
      lenis?.off('scroll', syncScroll)
      lenis?.destroy()
      if (lenis) gsap.ticker.lagSmoothing(500, 33)
      lenisRef.current = null
      delete root.dataset.scrollEngine
      ctx.revert()
    }
  }, [motionEnabled, experienceReady])

  const ready = useCallback(() => {
    setLoadProgress(100)
    setModelStatus('ready')
  }, [])
  const error = useCallback(() => setModelStatus('fallback'), [])
  const progress = useCallback(
    value =>
      setLoadProgress(current =>
        Math.max(current, Math.min(100, Math.round(value)))
      ),
    []
  )
  const selectPart = useCallback(
    name => sceneState.current.onSelectPart?.(name),
    []
  )
  const navigate = (event, id) => {
    event.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    window.history.replaceState(null, '', `#${id}`)
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        duration: 1.15,
        lerp: 0,
        easing: value => 1 - Math.pow(1 - value, 3),
        onComplete: () => target.focus({ preventScroll: true })
      })
    } else {
      target.scrollIntoView({ behavior: 'instant', block: 'start' })
      target.focus({ preventScroll: true })
    }
  }

  const sceneFrame = useCallback(frame => {
    const info = assemblyInfoRef.current
    if (!info || frame.mode !== 2) return
    info.querySelector('[data-assembly-part]').textContent = frame.part
    info.querySelector('[data-assembly-percent]').textContent = `${Math.round(
      frame.assemblyProgress * 100
    )}%`
    info.style.setProperty('--assembly-progress', frame.assemblyProgress)
  }, [])

  const groupIndex = STORY_GROUPS.findIndex(group => active <= group.end)

  return (
    <div
      className={`${styles.page} ${styles.storyPage}`}
      ref={rootRef}
      data-motion={motionEnabled ? 'full' : 'reduced'}
      data-assembly={assembling}
      data-loading={!experienceReady}
    >
      <Head>
        <title>Daksha in Orbit — Mukil Kumar</title>
        <meta
          name="description"
          content="Daksha in Orbit. An interactive story of satellite education, spatial design, and a VR learning platform by Mukil Kumar."
        />
        <meta name="theme-color" content="#02050b" />
        <meta property="og:title" content="Daksha in Orbit — Mukil Kumar" />
        <meta
          property="og:description"
          content="Explore the design of a VR platform for satellite education and outreach."
        />
        <link rel="canonical" href="https://mukil.vercel.app/daksha-in-orbit" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/models/daksha-poster.webp" as="image" />
      </Head>
      {!experienceReady && (
        <div className={styles.loadingScreen} role="status" aria-live="polite">
          {modelStatus === 'fallback' ? (
            <button
              type="button"
              onClick={() => {
                setModelStatus('loading')
                setLoadProgress(0)
                setAssembling(false)
                Object.assign(sceneState.current, {
                  chapter: 0,
                  progress: 0,
                  modeProgress: 0.03,
                  interactive: false
                })
                setSceneKey(key => key + 1)
              }}
            >
              Try again
            </button>
          ) : (
            <div className={styles.loadingProgress}>
              <progress
                max="100"
                value={totalProgress}
                aria-label="Loading experience"
              />
            </div>
          )}
        </div>
      )}
      <a className={styles.skipLink} href="#overview">
        Skip to project
      </a>
      <div ref={stageRef} className={styles.globalStage} data-revealed="false">
        {modelStatus !== 'ready' && (
          <div className={styles.poster}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/models/daksha-poster.webp"
              alt="Daksha spacecraft"
              width="1000"
              height="1000"
              fetchPriority="high"
            />
          </div>
        )}
        <SpacecraftScene
          key={sceneKey}
          variant="story"
          stateRef={sceneState}
          controllerRef={controllerRef}
          onReady={ready}
          onError={error}
          onProgress={progress}
          onSelectPart={selectPart}
          onAssemblyChange={setAssembling}
          onFrame={sceneFrame}
        />
      </div>
      <div className={styles.readingProgress} aria-hidden="true">
        <div ref={progressRef} />
      </div>
      <div className={styles.sceneStatus} aria-live="polite">
        <span className={styles.liveDot} />
        {modelStatus === 'loading'
          ? `Preparing orbit · ${loadProgress}%`
          : modelStatus === 'fallback'
          ? 'Spacecraft preview'
          : STORY_CHAPTERS[active].label}
      </div>
      <div className={styles.sceneControls}>
        <button type="button" onClick={() => controllerRef.current?.reset()}>
          Reset ↺
        </button>
        <button
          type="button"
          onClick={() => setMotionEnabled(value => !value)}
          aria-pressed={!motionEnabled}
        >
          {motionEnabled ? 'Pause motion Ⅱ' : 'Enable motion ▷'}
        </button>
      </div>

      <div
        ref={assemblyInfoRef}
        className={styles.assemblyCue}
        aria-hidden={!assembling}
      >
        <span>ASSEMBLY / ORTHOGRAPHIC</span>
        <div className={styles.assemblyCaption}>
          <strong data-assembly-part>Spacecraft bus</strong>
          <span data-assembly-percent>0%</span>
        </div>
        <div className={styles.assemblyTrack}>
          <i />
        </div>
        <small>Scroll to assemble · scroll back to reverse</small>
      </div>
      <div className={styles.headsetCue} aria-hidden="true">
        <span>STEP INTO DAKSHA</span>
        Scroll to enter through the lens
      </div>
      <main
        className={styles.storyContent}
        inert={assembling || !experienceReady ? true : undefined}
      >
        <section
          id="overview"
          className={`${styles.chapter} ${styles.hero}`}
          tabIndex={-1}
          aria-labelledby="hero-heading"
        >
          <div className={styles.storyCopy} data-story-copy>
            <span className={styles.eyebrow}>
              DAKSHA MISSION / VR LEARNING PLATFORM
            </span>
            <h1 id="hero-heading">
              <RevealWords text="DAKSHA" />
              <br />
              <span>
                <RevealWords text="IN ORBIT." />
              </span>
            </h1>
            <p>A VR platform for satellite education and outreach.</p>
            <a
              href="#headset"
              className={styles.textLink}
              onClick={event => navigate(event, 'headset')}
            >
              Explore the mission <span>↓</span>
            </a>
          </div>
        </section>
        <section
          id="headset"
          className={styles.headsetChapter}
          tabIndex={-1}
          aria-label="Enter Daksha through the VR headset. Scroll to rotate the headset and move through one lens."
        />
        <section
          id="flight"
          className={styles.flightChapter}
          tabIndex={-1}
          aria-label="Orbital flight. Scroll to stretch the starlight, slow the satellite, and continue the mission."
        />
        <section
          id="spacecraft"
          className={`${styles.chapter} ${styles.copyRight}`}
          tabIndex={-1}
          aria-labelledby="spacecraft-heading"
        >
          <div className={styles.storyCopy} data-story-copy>
            <span className={styles.eyebrow}>01 / THE OPPORTUNITY</span>
            <h2 id="spacecraft-heading">
              <RevealWords text="A COMPLEX" />
              <br />
              <RevealWords text="INSTRUMENT." />
              <br />
              <span>
                <RevealWords text="A CLEARER WAY IN." />
              </span>
            </h2>
            <p>
              Bring the mission and its subsystems into a shared virtual
              environment.
            </p>
          </div>
        </section>
        <section
          id="inside"
          className={styles.chapter}
          tabIndex={-1}
          aria-labelledby="inside-heading"
        >
          <div className={styles.storyCopy} data-story-copy>
            <span className={styles.eyebrow}>02 / BENEATH THE SURFACE</span>
            <h2 id="inside-heading">
              <RevealWords text="EVERY PART." />
              <br />
              <span>
                <RevealWords text="IN CONTEXT." />
              </span>
            </h2>
            <p>
              Separate the layers. See how each component belongs to the whole.
            </p>
            <div
              className={styles.systemsLegend}
              aria-label="Spacecraft subsystems"
            >
              <span data-breakdown-label>01 / Structure</span>
              <span data-breakdown-label>02 / Detectors</span>
              <span data-breakdown-label>03 / Battery packs</span>
            </div>
            <a
              href="#assets"
              className={styles.textLink}
              onClick={event => navigate(event, 'assets')}
            >
              The model studies ↗
            </a>
          </div>
        </section>
        <section
          id="experience"
          className={`${styles.chapter} ${styles.copyRight}`}
          tabIndex={-1}
          aria-labelledby="experience-heading"
        >
          <div className={styles.storyCopy} data-story-copy>
            <span className={styles.eyebrow}>03 / THE LEARNING EXPERIENCE</span>
            <h2 id="experience-heading">
              <RevealWords text="EXPLORE." />
              <br />
              <RevealWords text="INSPECT." />
              <br />
              <span>
                <RevealWords text="ASSEMBLE." />
              </span>
            </h2>
            <p>
              Four modes connect the satellite, its structure, and the people
              behind it.
            </p>
            <a
              href="#project-notes"
              className={styles.textLink}
              onClick={event => navigate(event, 'project-notes')}
            >
              Follow the design process ↓
            </a>
          </div>
        </section>
        <CaseStudy
          motionEnabled={motionEnabled}
          navigate={navigate}
          storyController={storyController}
          sceneStatus={modelStatus}
        />
      </main>
      <nav className={styles.storyRail} aria-label="Project story">
        {STORY_GROUPS.map((group, index) => (
          <a
            key={group.id}
            href={`#${group.id}`}
            onClick={event => navigate(event, group.id)}
            aria-current={groupIndex === index ? 'step' : undefined}
            data-complete={groupIndex > index ? 'true' : undefined}
          >
            <span>0{index + 1}</span>
            {group.label}
            <i />
          </a>
        ))}
      </nav>
      <footer className={styles.footer}>
        <Link href="/">Back to portfolio ↗</Link>
        <span>MUKIL KUMAR © 2026</span>
        <Link href="/contact">Get in touch ↗</Link>
      </footer>
    </div>
  )
}
