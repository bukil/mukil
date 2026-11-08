/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import useC2CMotion from '../components/c2c/useC2CMotion'
import useAmbientVideo from '../components/c2c/useAmbientVideo'
import styles from '../styles/C2C.module.css'

const CubeScene = dynamic(() => import('../components/c2c/CubeScene'), {
  ssr: false
})
const REPORT = '/C2C_Interaction%20Design_Report.pdf'
const SECTIONS = [
  ['discover', 'Discover'],
  ['meet', 'Meet C2C'],
  ['action', 'In action'],
  ['interactions', 'Interactions'],
  ['process', 'The process'],
  ['idea', 'From idea to object'],
  ['people', 'The team'],
  ['report', 'The report']
]
const INTERACTIONS = [
  {
    word: 'NAVIGATE',
    title: 'Find your way.',
    text: 'Rotary input for moving through files, images, and digital spaces.',
    mode: 'files',
    tone: 'mint'
  },
  {
    word: 'FOCUS',
    title: 'Make time tangible.',
    text: 'An onboard display brings a Pomodoro timer to the object in your hand.',
    mode: 'timer',
    tone: 'pink'
  },
  {
    word: 'PRESENT',
    title: 'Keep things moving.',
    text: 'Explore tactile inputs for next, back, and presentation control.',
    mode: 'slides',
    tone: 'yellow'
  },
  {
    word: 'PLAY',
    title: 'Leave room for delight.',
    text: 'Lightweight games and visual feedback make space for playful interactions.',
    mode: 'game',
    tone: 'green'
  }
]
const PROCESS = [
  [
    'report-7-3.webp',
    'Wood',
    'Exploring how a cube feels, turns, and connects in the hand.'
  ],
  [
    'report-7-1.webp',
    'Cardboard',
    'Testing proportions and making room for the electronics.'
  ],
  [
    'report-7-0.webp',
    'Electronics',
    'Bringing the encoder, switches, display, and RP2040 together.'
  ],
  [
    'report-8-0.webp',
    'Assembly',
    'Soldering and fitting the components inside a 3D-printed enclosure.'
  ]
]

function Action({ href, children, light = false, external = false }) {
  return (
    <a
      className={`${styles.action} ${light ? styles.actionLight : ''}`}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className={styles.actionArrow} aria-hidden="true">
        ➜
      </span>
      <span>{children}</span>
    </a>
  )
}

function InteractionArt({ mode }) {
  return (
    <div className={styles.interactionArt} aria-hidden="true">
      <div className={styles.miniCube}>
        <div className={styles.miniScreen}>
          {mode === 'files' && (
            <>
              <span>GALLERY / 03</span>
              <div className={styles.fileGrid}>
                {[0, 1, 2, 3, 4, 5].map(n => (
                  <i key={n} />
                ))}
              </div>
            </>
          )}
          {mode === 'timer' && (
            <>
              <span>TIME TO FOCUS</span>
              <b>25:00</b>
              <small>● ● ● ○</small>
            </>
          )}
          {mode === 'slides' && (
            <>
              <span>PRESENTATION</span>
              <b>
                03<span>/12</span>
              </b>
              <small>← &nbsp; NEXT &nbsp; →</small>
            </>
          )}
          {mode === 'game' && (
            <>
              <span>LET’S PLAY</span>
              <div className={styles.pixelGame}>
                {Array.from({ length: 32 }, (_, n) => (
                  <i key={n} data-on={n % 5 === 0 || (n > 22 && n < 29)} />
                ))}
              </div>
            </>
          )}
        </div>
        <span className={styles.miniButton} />
        <span className={styles.miniButton} />
      </div>
      <span className={styles.orbitMark}>✳</span>
    </div>
  )
}

export default function C2C() {
  const rootRef = useRef(null),
    controllerRef = useRef(null),
    carouselRef = useRef(null),
    videoRef = useRef(null)
  const motionRef = useRef({
    turn: -0.55,
    tilt: 0.35,
    roll: -0.05,
    scale: 0.5,
    x: 0,
    y: -0.35,
    split: 0
  })
  const [active, setActive] = useState(0)
  const [card, setCard] = useState(0)
  useC2CMotion(rootRef, motionRef, controllerRef, setActive)
  useAmbientVideo(videoRef)
  const moveCard = direction => {
    const next = Math.max(
      0,
      Math.min(INTERACTIONS.length - 1, card + direction)
    )
    const item = carouselRef.current?.children[next]
    if (item)
      carouselRef.current.scrollTo({
        left:
          item.offsetLeft -
          (carouselRef.current.clientWidth - item.offsetWidth) / 2,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth'
      })
    setCard(next)
  }

  return (
    <div className={styles.page} ref={rootRef} data-motion="reduced">
      <Head>
        <title>C2C — Cube to Cube | Mukil Kumar</title>
        <meta
          name="description"
          content="C2C is an exploratory tangible interface project: two cubes, physical controls, and digital feedback. An Interaction Design project at IDC, IIT Bombay."
        />
        <link rel="canonical" href="https://mukil.vercel.app/c2c" />
        <link
          rel="preload"
          href="/fonts/c2c/BD-Karlo-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <a href="#discover" className={styles.skipLink}>
        Skip to project
      </a>
      <header className={styles.nav}>
        <Link
          href="/works"
          className={styles.wordmark}
          aria-label="C2C — back to Playground"
        >
          C2C
        </Link>
      </header>
      <nav className={styles.sectionNav} aria-label="Section navigation">
        {SECTIONS.map(([id, label], i) => (
          <a
            key={id}
            href={`#${id}`}
            aria-label={`Go to ${label}`}
            aria-current={active === i ? 'location' : undefined}
          >
            <span />
          </a>
        ))}
      </nav>
      <main>
        <section id="discover" className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1>
              What if digital
              <br />
              felt physical?
            </h1>
            <p>Maybe it’s time we got a little more hands-on.</p>
          </div>
          <div className={styles.heroObject}>
            <img
              src="/images/c2c/prototype.webp"
              alt="C2C cube prototype with an onboard display and tactile buttons"
              width="1200"
              height="1200"
              fetchPriority="high"
            />
          </div>
          <div className={styles.heroBottom}>
            <span>An exploration in tangible interaction.</span>
            <span>IDC, IIT Bombay</span>
          </div>
        </section>

        <section
          id="meet"
          className={styles.impact}
          data-impact=""
          aria-label="Meet C2C: two cubes and a new way to interact"
        >
          <div className={styles.impactStage} data-impact-stage="">
            <div
              className={`${styles.beat} ${styles.meetBeat}`}
              data-impact-beat=""
            >
              <h2>
                Meet
                <br />
                cube to
                <br />
                cube.
              </h2>
            </div>
            <div
              className={`${styles.beat} ${styles.littleBeat}`}
              data-impact-beat=""
              aria-hidden="true"
            >
              <h2>
                One<span>little</span>cube.
              </h2>
            </div>
            <div
              className={`${styles.beat} ${styles.bigBeat}`}
              data-impact-beat=""
              aria-hidden="true"
            >
              <h2>
                A new way
                <br />
                <span>to get</span>
                <br />
                hands-on.
              </h2>
            </div>
            <CubeScene motionRef={motionRef} controllerRef={controllerRef} />
            <div className={styles.impactCaption}>
              <p>Two familiar objects. Physical input. Digital feedback.</p>
            </div>
          </div>
        </section>

        <section
          id="action"
          className={styles.videoSection}
          aria-label="C2C prototype in action"
        >
          <div className={styles.videoFrame}>
            <video
              ref={videoRef}
              data-src="/6502.mp4"
              poster="/images/c2c/report-7-0.webp"
              preload="none"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              disablePictureInPicture
              aria-label="C2C hardware prototype demonstration, playing automatically without sound"
            />
          </div>
        </section>

        <section
          id="interactions"
          className={styles.interactions}
          data-carousel-story=""
        >
          <div className={styles.carouselStage} data-carousel-stage="">
            <div className={styles.sectionHeading}>
              <h2>
                Small form.
                <br />
                Many possibilities.
              </h2>
            </div>
            <div className={styles.categoryTitle}>
              <h3 aria-live="polite">{INTERACTIONS[card].word}</h3>
            </div>
            <div
              className={styles.carousel}
              data-carousel=""
              role="region"
              aria-roledescription="carousel"
              aria-label="C2C interaction studies"
              tabIndex={0}
              ref={carouselRef}
              onScroll={event => {
                const el = event.currentTarget
                const middle = el.scrollLeft + el.clientWidth / 2
                const children = [...el.children]
                const distances = children.map(item =>
                  Math.abs(item.offsetLeft + item.offsetWidth / 2 - middle)
                )
                setCard(distances.indexOf(Math.min(...distances)))
              }}
            >
              {INTERACTIONS.map(item => (
                <article
                  className={`${styles.interactionCard} ${styles[item.tone]}`}
                  key={item.word}
                >
                  <InteractionArt mode={item.mode} />
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <div className={styles.carouselControls}>
              <span>{String(card + 1).padStart(2, '0')} / 04</span>
              <div>
                <button
                  onClick={() => moveCard(-1)}
                  disabled={card === 0}
                  aria-label="Previous interaction"
                >
                  ←
                </button>
                <button
                  onClick={() => moveCard(1)}
                  disabled={card === 3}
                  aria-label="Next interaction"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className={styles.process} data-process-story="">
          <div className={styles.processStage} data-process-stage="">
            <h2 data-process-heading="">
              Built from
              <br />
              hands-on
              <br />
              exploration.
            </h2>
            <div className={styles.processCards}>
              {PROCESS.map(([image, title, text], i) => (
                <article key={title} data-process-card="">
                  <figure className={styles.processImage}>
                    <img
                      src={`/images/c2c/${image}`}
                      alt={`${title} stage of C2C development`}
                      width="1100"
                      height="800"
                      loading="lazy"
                    />
                  </figure>
                  <h3>
                    {i + 1}. {title}
                  </h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="idea"
          className={styles.gallery}
          data-gallery=""
          aria-label="C2C prototype gallery"
        >
          <div className={styles.galleryStage} data-gallery-stage="">
            <div className={styles.galleryTitle}>
              <h2 data-gallery-heading="">
                From an idea
                <br />
                to something
                <br />
                you can hold.
              </h2>
            </div>
            {[
              'report-5-0.webp',
              'report-7-3.webp',
              'report-7-0.webp',
              'report-7-1.webp',
              'report-8-0.webp',
              'report-5-1.webp'
            ].map((image, i) => (
              <figure
                data-float=""
                key={image}
                className={`${styles.floatingImage} ${styles[`float${i}`]}`}
              >
                <img
                  src={`/images/c2c/${image}`}
                  alt={
                    [
                      'Early rotation interaction concept',
                      'Wooden cube studies',
                      'Electronics on a breadboard',
                      'Cardboard prototypes',
                      'Internal component assembly',
                      'Early zoom interaction concept'
                    ][i]
                  }
                  width="500"
                  height="500"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </section>

        <section id="people" className={styles.people}>
          <h2 data-reveal="">Made together.</h2>
          <p>
            An exploratory Interaction Design project
            <br />
            at IDC School of Design, IIT Bombay.
          </p>
          <div className={styles.team}>
            {[
              'Mukil Kumar',
              'Anoushka Shome',
              'Samiksha Sidharth Gajbhiye',
              'Prajakta Hardikar'
            ].map(name => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </section>

        <section id="report" className={styles.closing}>
          <h2 data-reveal="">
            Get a little
            <br />
            more hands-on.
          </h2>
          <img
            src="/images/c2c/prototype.webp"
            alt="C2C prototype"
            width="1200"
            height="1200"
            loading="lazy"
          />
          <div>
            <Action href={REPORT} external>
              Read the project report
            </Action>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <a
          href="#discover"
          className={styles.footerMark}
          aria-label="C2C — back to top"
        >
          C2C
        </a>
      </footer>
    </div>
  )
}
