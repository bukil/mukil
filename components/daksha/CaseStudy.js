import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import styles from '../../styles/Daksha.module.css'
import ExperienceModes from './ExperienceModes'
import RevealWords from './RevealWords'
import assets from './project-assets.json'

const CHAPTERS = [
  ['project-brief', 'Brief'],
  ['research', 'Research'],
  ['ideation', 'Concept'],
  ['assets', 'Models'],
  ['development', 'Iteration'],
  ['prototype', 'Experience'],
  ['usage', 'Context'],
  ['testing', 'Testing'],
  ['reflection', 'Next']
]

function ProjectFigure({ name, alt, caption, className = '', wide = false }) {
  const asset = assets[name]
  return (
    <figure className={`${styles.projectFigure} ${className}`} data-case-reveal>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset.src}
        srcSet={
          asset.variants.length
            ? [
                ...asset.variants.map(v => `${v.src} ${v.width}w`),
                `${asset.src} ${asset.width}w`
              ].join(', ')
            : undefined
        }
        sizes={
          wide
            ? 'calc(100vw - 48px)'
            : '(max-width: 759px) calc(100vw - 40px), calc(50vw - 36px)'
        }
        width={asset.width}
        height={asset.height}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

function Chapter({ id, number, label, title, text, children }) {
  const content = (
    <>
      <div className={styles.caseHeading} data-case-reveal>
        <span className={styles.caseKicker}>
          {number} / {label}
        </span>
        <div>
          <h2 id={`${id}-title`}>
            <RevealWords text={title} />
          </h2>
          {text && <p>{text}</p>}
        </div>
      </div>
      {children}
    </>
  )
  return (
    <section
      id={id}
      data-case-chapter
      className={`${styles.caseSection} ${id === 'prototype' ? styles.prototypeRunway : ''}`}
      tabIndex={-1}
      aria-labelledby={`${id}-title`}
    >
      {id === 'prototype' ? <div className={styles.prototypeSticky}>{content}</div> : content}
    </section>
  )
}

export default function CaseStudy({
  motionEnabled,
  navigate,
  storyController,
  sceneStatus
}) {
  const rootRef = useRef(null)
  const navRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (sceneStatus !== 'ready') return
    gsap.registerPlugin(ScrollTrigger)
    const root = rootRef.current
    const ctx = gsap.context(() => {
      root.querySelectorAll('[data-case-chapter]').forEach((section, index) => {
        const select = () => {
          setActive(index)
          const nav = navRef.current
          const link = nav?.querySelectorAll('a')[index]
          if (link && nav.scrollWidth > nav.clientWidth)
            nav.scrollTo({
              left: link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2,
              behavior: 'instant'
            })
        }
        ScrollTrigger.create({
          trigger: section,
          start: 'top 30%',
          end: 'bottom 30%',
          onEnter: select,
          onEnterBack: select
        })
      })
      if (motionEnabled)
        root.querySelectorAll('[data-case-reveal]').forEach(element => {
          const words = element.querySelectorAll('[data-reveal-word]')
          if (words.length) {
            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: element,
                start: 'top 90%',
                end: 'top 56%',
                scrub: 0.35
              }
            })
            timeline
              .fromTo(
                words,
                { yPercent: 110, rotation: 3, opacity: 0 },
                {
                  yPercent: 0,
                  rotation: 0,
                  opacity: 1,
                  stagger: 0.055,
                  duration: 0.7
                }
              )
              .fromTo(
                element.querySelectorAll('p'),
                { y: 15, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5 },
                0.2
              )
          } else {
            gsap.fromTo(
              element,
              { y: 26, opacity: 0.25, clipPath: 'inset(10% 0% 0% 0%)' },
              {
                y: 0,
                opacity: 1,
                clipPath: 'inset(0% 0% 0% 0%)',
                ease: 'none',
                scrollTrigger: {
                  trigger: element,
                  start: 'top 95%',
                  end: 'top 65%',
                  scrub: 0.3
                }
              }
            )
          }
        })
    }, root)
    return () => ctx.revert()
  }, [motionEnabled, sceneStatus])

  return (
    <div
      id="project-notes"
      ref={rootRef}
      className={styles.caseStudy}
      tabIndex={-1}
    >
      <div className={styles.caseIntro}>
        <span className={styles.caseKicker}>DAKSHA IN ORBIT / 2026</span>
        <h2>From research to interaction.</h2>
        <dl className={styles.projectCredits}>
          <div>
            <dt>DESIGN</dt>
            <dd>Mukil Kumar</dd>
          </div>
          <div>
            <dt>GUIDANCE</dt>
            <dd>Prof. Jayesh Pillai</dd>
          </div>
          <div>
            <dt>CLIENT</dt>
            <dd>Prof. Varun Bhalerao</dd>
          </div>
          <div>
            <dt>CONTEXT</dt>
            <dd>IDC, IIT Bombay</dd>
          </div>
        </dl>
      </div>
      <nav
        ref={navRef}
        className={styles.caseNav}
        aria-label="Case study chapters"
      >
        {CHAPTERS.map(([id, label], index) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={event => navigate(event, id)}
            aria-current={active === index ? 'location' : undefined}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {label}
          </a>
        ))}
      </nav>

      <Chapter
        id="project-brief"
        number="01"
        label="THE BRIEF"
        title="Make the mission approachable."
        text="A VR learning platform for students and newcomers to explore Daksha’s structure, components, and mission."
      >
        <ProjectFigure
          name="mission-organisations"
          alt="Daksha collaboration logos including IIT Bombay, TIFR, Raman Research Institute, IUCAA, and ISRO"
          className={styles.logoFigure}
          wide
        />
        <ol className={styles.processLine}>
          {['Research', 'Explore concepts', 'Build & iterate', 'Test'].map(
            (item, index) => (
              <li key={item}>
                <span>0{index + 1}</span>
                {item}
              </li>
            )
          )}
        </ol>
      </Chapter>

      <Chapter
        id="research"
        number="02"
        label="RESEARCH"
        title="Understand the instrument."
        text="Mission papers, laboratory visits, and the Daksha team grounded the experience in the actual satellite."
      >
        <div className={styles.figurePair}>
          <ProjectFigure
            name="mission-literature"
            alt="Daksha mission papers reviewed during research"
            caption="Mission literature."
          />
          <ProjectFigure
            name="detector-test-bench"
            alt="Detector hardware and electronics at a laboratory workstation"
            caption="The physical instrument."
          />
          <ProjectFigure
            name="student-team"
            alt="The Daksha student team at IIT Bombay"
            caption="The Daksha student team."
          />
          <ProjectFigure
            name="lab-research-visit"
            alt="A researcher working at an instrument bench"
            caption="Research in the lab."
          />
        </div>
      </Chapter>

      <Chapter
        id="ideation"
        number="03"
        label="INTERACTION CONCEPTS"
        title="Learn by exploring."
        text="Anchor information to components. Let learners take the structure apart and put it back together."
      >
        <div className={styles.figurePair}>
          <ProjectFigure
            name="concept-data-anchoring"
            alt="Sketch of information anchored to a spacecraft component in VR"
            caption="Information in context."
          />
          <ProjectFigure
            name="concept-assembly"
            alt="Sketch of controller-based assembly in VR"
            caption="Hands-on assembly."
          />
        </div>
        <div className={styles.brandFigureGrid}>
          <ProjectFigure
            name="brand-colour-studies"
            alt="Original Daksha identity and colour explorations"
            caption="Identity explorations."
          />
          <ProjectFigure
            name="vr-interface-buttons"
            alt="Solid Home and Satellite View icons with text labels"
            caption="Solid icons. Direct labels. Inter typography."
          />
        </div>
      </Chapter>

      <Chapter
        id="assets"
        number="04"
        label="ASSET DEVELOPMENT"
        title="A structure you can inspect."
        text="Satellite assets developed with the Daksha team, balancing technical correctness and visual clarity."
      >
        <div className={styles.modelFigureGrid}>
          <ProjectFigure
            name="model-development"
            alt="Exploded Daksha model showing its subassemblies"
            caption="Exploded model study."
          />
          <ProjectFigure
            name="model-structure"
            alt="Daksha model showing the internal frame and detector housings"
            caption="Component hierarchy."
          />
        </div>
      </Chapter>

      <Chapter
        id="development"
        number="05"
        label="ITERATION"
        title="Clearer ways in."
        text="The entry menu evolved into four learning modes. Wrist-based controls keep navigation close at hand."
      >
        <div className={styles.figurePair}>
          <ProjectFigure
            name="navigation-before"
            alt="Earlier VR menu with three mode cards"
            caption="Earlier menu."
          />
          <ProjectFigure
            name="navigation-after"
            alt="Revised VR menu with four learning modes"
            caption="Four distinct entry points."
            className={styles.smallSourceFigure}
          />
        </div>
        <ProjectFigure
          name="ui-navigation-controls"
          alt="Home and Satellite View navigation controls"
          caption="Navigation within reach."
          className={styles.controlsFigure}
        />
      </Chapter>

      <Chapter
        id="prototype"
        number="06"
        label="THE EXPERIENCE"
        title="Four ways to understand Daksha."
        text="Orbit, inspect, assemble, and discover the people behind the mission."
      >
        <ExperienceModes
          motionEnabled={motionEnabled}
          storyController={storyController}
          sceneStatus={sceneStatus}
        />
        <ProjectFigure
          name="prototype-menu"
          alt="The VR prototype’s four mode cards in front of Earth"
          caption="The orbit-scene menu, captured from the VR prototype."
          wide
          className={styles.prototypeFigure}
        />
      </Chapter>

      <Chapter
        id="usage"
        number="07"
        label="CONTEXT"
        title="Designed for real spaces."
        text="Compact layouts and stationary controls support classrooms, labs, and public outreach."
      >
        <div className={styles.usageGrid}>
          {[
            ['Classroom', '3 × 2 m', 'usage-classroom'],
            ['Laboratory', '2 × 2 m', 'usage-laboratory'],
            ['Exhibition', '2 × 2 m', 'usage-exhibition']
          ].map(([title, size, image]) => (
            <article key={title}>
              <ProjectFigure
                name={image}
                alt={`${title} interaction space plan, ${size}`}
              />
              <div className={styles.usageLabel}>
                <h3>{title}</h3>
                <span>{size}</span>
              </div>
            </article>
          ))}
        </div>
      </Chapter>

      <Chapter
        id="testing"
        number="08"
        label="TESTING"
        title="In people’s hands."
        text="Headset sessions focused on understanding the structure, finding a way through, and comfort during use."
      >
        <ProjectFigure
          name="testing-sessions"
          alt="Participants testing the VR prototype with headsets and controllers, with a mirrored screen view"
          caption="Prototype testing in the lab."
          wide
        />
      </Chapter>

      <Chapter
        id="reflection"
        number="09"
        label="NEXT STEPS"
        title="From structure to signals."
        text="Future work explores moving a source around Daksha, with detector responses and live graphs explaining event localisation."
      >
        <div className={styles.caseEnding}>
          <span>DAKSHA IN ORBIT / 2026</span>
          <a href="#overview" onClick={event => navigate(event, 'overview')}>
            Back to top ↑
          </a>
        </div>
      </Chapter>
    </div>
  )
}
