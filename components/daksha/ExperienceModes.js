import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import {
  EXPERIENCE_MODES,
  ASSEMBLY_PARTS,
  LEARNING_PARTS
} from './experience-modes'
import styles from '../../styles/Daksha.module.css'

const Scene = dynamic(() => import('./SpacecraftScene'), { ssr: false })
const progressFor = (mode, step) =>
  mode === 2
    ? (2 + 0.025 + 0.95 * (step === 0 ? 0 : step * 0.105 + 0.2)) / 4
    : (mode + 0.06 + ((step + 0.5) / LEARNING_PARTS.length) * 0.8) / 4

export default function ExperienceModes({
  motionEnabled,
  storyController,
  sceneStatus
}) {
  const rootRef = useRef(null)
  const localControllerRef = useRef(null)
  const controllerRef = storyController?.controllerRef || localControllerRef
  const localSceneState = useRef({
    progress: progressFor(0, 0),
    reducedMotion: !motionEnabled
  })
  const sceneState = storyController?.stateRef || localSceneState
  const [mode, setMode] = useState(0)
  const [step, setStep] = useState(0)
  const scrollUpdateRef = useRef(false)
  const displayedRef = useRef({ mode, step })
  displayedRef.current = { mode, step }
  const [status, setStatus] = useState('loading')
  const [nearby, setNearby] = useState(false)
  const tabRefs = useRef([])
  const current = EXPERIENCE_MODES[mode]
  const parts = mode === 2 ? ASSEMBLY_PARTS : LEARNING_PARTS

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNearby(true)
      },
      { rootMargin: '500px' }
    )
    observer.observe(rootRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const selectHash = () => {
      const next = EXPERIENCE_MODES.findIndex(
        item => `#${item.id}` === window.location.hash
      )
      if (next >= 0) {
        setMode(next)
        setStep(0)
      }
    }
    selectHash()
    window.addEventListener('hashchange', selectHash)
    return () => window.removeEventListener('hashchange', selectHash)
  }, [])

  useEffect(() => {
    sceneState.current.reducedMotion = !motionEnabled
    if (scrollUpdateRef.current) {
      scrollUpdateRef.current = false
      return
    }
    sceneState.current.modeScroll = false
    const tween = gsap.to(sceneState.current, {
      [storyController ? 'modeProgress' : 'progress']: progressFor(mode, step),
      duration: motionEnabled ? 0.24 : 0,
      ease: 'power2.out',
      // This state also holds the scroll-driven chapter/camera animation.
      // Only replace a tween of the mode property, never the entire target.
      overwrite: 'auto',
      onUpdate: () => controllerRef.current?.invalidate()
    })
    return () => tween.kill()
  }, [
    mode,
    step,
    motionEnabled,
    status,
    sceneStatus,
    storyController,
    sceneState,
    controllerRef
  ])

  const ready = useCallback(() => setStatus('ready'), [])
  const error = useCallback(() => setStatus('fallback'), [])
  const progress = useCallback(() => {}, [])
  const selectPart = useCallback(name => {
    const index = LEARNING_PARTS.indexOf(name)
    if (index >= 0) {
      setMode(1)
      setStep(index)
    }
  }, [])

  useEffect(() => {
    if (!storyController) return
    storyController.stateRef.current.onSelectPart = selectPart
    storyController.stateRef.current.onStoryFrame = frame => {
      if (!storyController.stateRef.current.modeScroll) return
      const displayed = displayedRef.current
      if (displayed.mode === frame.mode && displayed.step === frame.step) return
      scrollUpdateRef.current = true
      displayedRef.current = { mode: frame.mode, step: frame.step }
      setMode(frame.mode)
      setStep(frame.step)
    }
    return () => {
      storyController.stateRef.current.onSelectPart = null
      storyController.stateRef.current.onStoryFrame = null
    }
  }, [storyController, selectPart])

  const selectMode = index => {
    setMode(index)
    setStep(0)
  }
  const tabKeyDown = (event, index) => {
    const keys = {
      ArrowRight: (index + 1) % 4,
      ArrowLeft: (index + 3) % 4,
      Home: 0,
      End: 3
    }
    if (!(event.key in keys)) return
    event.preventDefault()
    selectMode(keys[event.key])
    tabRefs.current[keys[event.key]]?.focus()
  }

  return (
    <div
      ref={rootRef}
      className={`${styles.experienceModes} ${
        storyController ? styles.integratedModes : ''
      }`}
    >
      <div
        className={styles.modeTabs}
        role="tablist"
        aria-label="Explore Daksha in 3D"
      >
        {EXPERIENCE_MODES.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={item.id}
            ref={el => {
              tabRefs.current[index] = el
            }}
            aria-selected={mode === index}
            aria-controls="interactive-mode-panel"
            tabIndex={mode === index ? 0 : -1}
            onClick={() => selectMode(index)}
            onKeyDown={event => tabKeyDown(event, index)}
          >
            <span>0{index + 1}</span>
            {item.short}
          </button>
        ))}
      </div>
      <div
        className={styles.modeStage}
        data-mode={mode}
        id="interactive-mode-panel"
        role="tabpanel"
        aria-labelledby={current.id}
        tabIndex={0}
      >
        <div className={styles.modeStepCopy}>
          <span className={styles.caseKicker}>{current.title}</span>
          <h3>{current.heading}</h3>
          <p>{current.description}</p>
          {mode === 1 && (
            <div className={styles.partControls}>
              <span className={styles.partName} aria-live="polite">
                {String(step + 1).padStart(2, '0')} /{' '}
                {String(parts.length).padStart(2, '0')} · {parts[step]}
              </span>
              <div>
                <button
                  type="button"
                  aria-label="Previous component"
                  onClick={() =>
                    setStep(value => (value + parts.length - 1) % parts.length)
                  }
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => setStep(value => (value + 1) % parts.length)}
                >
                  Next part →
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={styles.modeScene}>
          {nearby && !storyController && (
            <Scene
              variant="modes"
              stateRef={sceneState}
              controllerRef={controllerRef}
              onReady={ready}
              onError={error}
              onProgress={progress}
              onSelectPart={selectPart}
            />
          )}
          {!storyController && status !== 'ready' && (
            <div className={styles.modePoster}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/models/daksha-poster.webp"
                width="1000"
                height="1000"
                alt="Daksha spacecraft preview"
                loading="lazy"
              />
            </div>
          )}
          {mode === 1 && (
            <div className={styles.modeCallout} aria-hidden="true">
              <span>SELECTED COMPONENT</span>
              <strong>{parts[step]}</strong>
            </div>
          )}
          {mode === 3 && (
            <div
              className={styles.peopleNetwork}
              aria-label="The mission community"
            >
              {['IIT Bombay', 'Daksha team', 'Researchers', 'Students'].map(
                (name, index) => (
                  <span key={name} className={styles[`peopleNode${index}`]}>
                    {name}
                  </span>
                )
              )}
            </div>
          )}
        </div>
        <div className={styles.modeStageFooter}>
          <span>
            {status === 'fallback'
              ? 'Spacecraft preview'
              : mode === 1
              ? 'Click a part to inspect'
              : 'Drag to rotate'}
          </span>
          <button type="button" onClick={() => controllerRef.current?.reset()}>
            Reset view ↺
          </button>
        </div>
      </div>
    </div>
  )
}
