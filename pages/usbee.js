import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import useProjectScroll from '../hooks/useProjectScroll'
import { ShaderCanvas } from '../components/FlutedShader'
import styles from '../styles/Usbee.module.css'

const logoShader = {
  components: [
    {
      id: 'blue-light',
      type: 'Swirl',
      props: { colorA: '#accfff', colorB: '#003983', detail: 1.2 },
    },
  ],
}

const images = {
  'menu-bar-status': [370, 58, 'USBee menu bar icon showing two mounted volumes'],
  'volume-list': [890, 910, 'Close-up of the mounted-volume list and eject controls'],
  'connection-info': [850, 966, 'Connection details for a USB 3.1 Gen 2 drive, including its manufacturer, serial number, and power allocation'],
  'customization-settings': [1012, 942, 'USBee Appearance settings for menu bar symbol, style, rendering mode, and weight'],
  'customization-icons': [140, 456, 'Available USBee menu bar symbols'],
}

const chapters = [
  {
    id: 'presence',
    title: 'Shows up when you need it.',
    copy: 'USBee puts drive status in the macOS menu bar. Its icon appears when an external drive or disk image mounts, shows how many volumes are mounted, and disappears after the last one is ejected.',
    images: ['menu-bar-status'],
  },
  {
    id: 'eject',
    title: 'Eject without switching apps.',
    copy: 'Click USBee in the menu bar and choose Eject next to the volume you want to remove. You can do it from the window you’re already working in, without opening Finder.',
    images: ['volume-list'],
  },
  {
    id: 'interface',
    title: 'Check the connection.',
    copy: 'See how a drive is connected and open its details for more information, including the USB version, manufacturer, and power allocation.',
    images: ['connection-info'],
  },
  {
    id: 'customization',
    title: 'Make it yours.',
    copy: 'Choose a menu bar symbol and adjust its style, weight, and rendering. You can also choose whether connection labels appear in the drive list.',
    images: ['customization-settings', 'customization-icons'],
  },
]

function Screenshot({ name }) {
  const [width, height, alt] = images[name]
  return (
    <Image
      className={styles.screenshot}
      src={`/images/usbee/${name}.webp`}
      alt={alt}
      width={width}
      height={height}
      sizes="(max-width: 720px) 88vw, (max-width: 1100px) 56vw, 650px"
      unoptimized
    />
  )
}

export default function Usbee() {
  const pageRef = useRef(null)
  const openingRef = useRef(null)
  const [warningVisible, setWarningVisible] = useState(false)
  useProjectScroll(pageRef)

  function dismissWarning() {
    setWarningVisible(false)
    const opening = openingRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    opening.querySelector('h2').focus({ preventScroll: true })
    opening.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' })
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const opening = openingRef.current
    const showWarning = () => {
      if (opening.getBoundingClientRect().top > window.innerHeight * 0.82) return
      window.removeEventListener('scroll', showWarning)
      setWarningVisible(true)
    }
    window.addEventListener('scroll', showWarning, { passive: true })
    showWarning()
    const motion = gsap.matchMedia()
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      const root = pageRef.current
      const hero = root.querySelector('header')
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from(hero.querySelector('h1'), { y: 50, opacity: 0, duration: 0.7 }, 0.1)
        .from(hero.querySelectorAll('[data-usbee-intro-copy]'), {
          y: 26, opacity: 0, duration: 0.55, stagger: 0.12,
        }, 0.26)
        .from(hero.querySelector('[data-usbee-hero-visual]'), {
          y: 46, scale: 0.8, opacity: 0, duration: 0.95,
        }, 0.12)

      gsap.to(hero.querySelector('[data-usbee-glass-logo]'), {
        yPercent: -7,
        scale: 1.12,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'clamp(top top)', end: 'bottom 42%', scrub: true },
      })

      const demo = root.querySelector('[data-usbee-demo]')
      gsap.timeline({
        scrollTrigger: {
          trigger: demo,
          start: 'clamp(top bottom)',
          end: 'clamp(top 40%)',
          scrub: true,
        },
      }).fromTo(demo.querySelector('video'), {
        clipPath: 'inset(7% 9% 7% 9% round 18px)',
        scale: 1.045,
      }, {
        clipPath: 'inset(0% 0% 0% 0% round 0px)',
        scale: 1,
        ease: 'power2.out',
      })

      root.querySelectorAll('[data-usbee-slide]').forEach((chapter, index) => {
        const content = chapter.querySelector('[data-usbee-copy]')
        const visual = chapter.querySelector('[data-usbee-visual]')
        const [heading, ...paragraphs] = content.children
        const reveal = gsap.timeline({
          defaults: { ease: 'power2.out' },
          scrollTrigger: {
            trigger: chapter,
            start: 'clamp(top 96%)',
            end: 'clamp(top 46%)',
            scrub: true,
          },
        })
        reveal
          .from(heading, { y: 26, opacity: 0.55, duration: 0.48 }, 0)
          .from(paragraphs, { y: 19, opacity: 0.55, duration: 0.48, stagger: 0.10 }, 0.17)
        if (visual) {
          reveal.from(visual.children, {
            x: index % 2 ? -18 : 18, y: 36, scale: 0.96,
            opacity: 0.7, duration: 0.72, stagger: 0.11,
          }, 0.07)
        }
      })
    }, pageRef)

    return () => {
      window.removeEventListener('scroll', showWarning)
      motion.revert()
    }
  }, [])

  return (
    <main ref={pageRef} className={styles.page}>
      <Head>
        <title>USBee · Mukil Kumar</title>
        <meta name="description" content="USBee is a macOS menu bar utility for seeing what’s mounted, checking drive connections, and ejecting volumes." />
        <meta property="og:image" content="https://mukil.vercel.app/images/usbee/menu.webp" />
      </Head>

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1>USBee</h1>
          <p data-usbee-intro-copy>Decades of Mac innovation. Why am I still guessing when it’s safe to unplug a drive?</p>
          <span data-usbee-intro-copy>macOS utility · Designed and Developed by Me</span>
        </div>
        <div className={styles.heroVisual} data-usbee-hero-visual aria-hidden="true">
          <div className={styles.glassLogo} data-usbee-glass-logo>
            <div className={styles.glassLogoSurface}>
              <ShaderCanvas preset={logoShader} />
            </div>
          </div>
        </div>
      </header>

      {warningVisible && createPortal(
        <div className={styles.warningPanel} data-usbee-warning>
          <Image
            className={styles.warningImage}
            src="/images/usbee/disk-warning.png"
            alt="macOS notification: Disk Not Ejected Properly. Eject the disk before disconnecting or turning it off."
            width={688}
            height={150}
            loading="eager"
            unoptimized
          />
          <button
            type="button"
            className={styles.warningClose}
            aria-label="Dismiss disk warning"
            onClick={dismissWarning}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>,
        document.body
      )}

      <section ref={openingRef} className={styles.chapter} aria-labelledby="visibility" data-usbee-slide>
        <div className={styles.openingContent}>
          <div className={styles.copy} data-usbee-copy>
            <h2 id="visibility" tabIndex={-1}>Closing the warning won’t undo the unplug.</h2>
            <p>Pull an external drive while your Mac is still writing and you could corrupt a file or lose changes that haven’t been backed up. By the time the warning appears, the cable is already out.</p>
            <p>Why should you adapt to the Mac when it could show you what it already knows? Visibility of system status means seeing what’s mounted and when it’s safe to unplug, before you reach for the cable.</p>
          </div>
        </div>
      </section>

      <div className={styles.demo} data-usbee-demo>
        <video
          className={styles.demoVideo}
          src="/images/usbee/demo.mp4"
          aria-label="USBee app demonstration"
          width={1602}
          height={1044}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className={styles.story}>
        {chapters.map(chapter => (
          <section key={chapter.id} aria-labelledby={chapter.id} className={styles.chapter} data-usbee-slide>
            <div className={styles.chapterContent}>
              <div className={styles.copy} data-usbee-copy>
                <h2 id={chapter.id}>{chapter.title}</h2>
                <p>{chapter.copy}</p>
              </div>
              <div className={chapter.images.length > 1 ? styles.pair : styles.visual} data-usbee-visual>
                {chapter.images.map(name => (
                  <div key={name}>
                    <Screenshot name={name} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className={styles.closing} aria-labelledby="reflection">
        <div>
          <h2 id="reflection">What would make external storage feel native?</h2>
          <p>USBee brings three everyday actions into the menu bar. See what’s mounted, check how it’s connected, and eject it when you’re done.</p>
          <Link href="/#selected-projects">← Back to selected work</Link>
        </div>
      </section>
    </main>
  )
}
