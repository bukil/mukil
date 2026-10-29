import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from '../components/layouts/main'
import Fonts from '../components/fonts'
import Chakra from '../components/chakra'

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

// Directional variants:
// 1 = navigating forward (Home -> Playground): enters from Right (+100%), exits to Left (-100%)
// -1 = navigating back (Playground -> Home): enters from Left (-100%), exits to Right (+100%)
// 0 = standard fade / gentle motion for other routes
// Snappy tween durations — no spring settle lag, no mode="wait" blocking
const SLIDE_DURATION = 0.22   // seconds for the x slide
const FADE_DURATION  = 0.15   // seconds for opacity

const pageVariants = {
  initial: (direction) => {
    if (direction === 1) return { x: '60%', opacity: 0 }
    if (direction === -1) return { x: '-60%', opacity: 0 }
    return { opacity: 0, y: 10 }
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      x: { duration: SLIDE_DURATION, ease: [0.25, 0.46, 0.45, 0.94] },
      opacity: { duration: FADE_DURATION, ease: 'easeOut' },
      y: { duration: SLIDE_DURATION, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  },
  exit: (direction) => {
    if (direction === 1) {
      return {
        x: '-60%',
        opacity: 0,
        transition: {
          x: { duration: SLIDE_DURATION, ease: [0.55, 0, 1, 0.45] },
          opacity: { duration: FADE_DURATION, ease: 'easeIn' }
        }
      }
    }
    if (direction === -1) {
      return {
        x: '60%',
        opacity: 0,
        transition: {
          x: { duration: SLIDE_DURATION, ease: [0.55, 0, 1, 0.45] },
          opacity: { duration: FADE_DURATION, ease: 'easeIn' }
        }
      }
    }
    return {
      opacity: 0,
      y: 10,
      transition: { duration: FADE_DURATION, ease: 'easeIn' }
    }
  }
}

function Website({ Component, pageProps, router }) {
  const prevPathRef = useRef(router.asPath)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      const prev = router.asPath.split('?')[0].split('#')[0]
      const next = url.split('?')[0].split('#')[0]

      const ORDER = { '/': 0, '/works': 1, '/contact': 2 }
      const prevOrder = ORDER[prev]
      const nextOrder = ORDER[next]

      if (typeof prevOrder === 'number' && typeof nextOrder === 'number' && prevOrder !== nextOrder) {
        setDirection(nextOrder > prevOrder ? 1 : -1)
      } else {
        setDirection(0)
      }
      prevPathRef.current = next
    }

    const handleRouteChangeComplete = () => {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router])

  return (
    <Chakra cookies={pageProps.cookies}>
      <Fonts />
      <Layout router={router}>
        <AnimatePresence
          mode="sync"
          initial={false}
          custom={direction}
        >
          <motion.div
            key={router.route}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ width: '100%', minHeight: '100%' }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </Chakra>
  )
}

export default Website
