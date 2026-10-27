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
const pageVariants = {
  initial: (direction) => {
    if (direction === 1) {
      return { x: '100%', opacity: 0 }
    }
    if (direction === -1) {
      return { x: '-100%', opacity: 0 }
    }
    return { opacity: 0, y: 16 }
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 32, mass: 0.8 },
      opacity: { duration: 0.25, ease: 'easeOut' },
      y: { duration: 0.35, ease: 'easeOut' }
    }
  },
  exit: (direction) => {
    if (direction === 1) {
      return {
        x: '-100%',
        opacity: 0,
        transition: {
          x: { type: 'spring', stiffness: 280, damping: 32, mass: 0.8 },
          opacity: { duration: 0.2, ease: 'easeIn' }
        }
      }
    }
    if (direction === -1) {
      return {
        x: '100%',
        opacity: 0,
        transition: {
          x: { type: 'spring', stiffness: 280, damping: 32, mass: 0.8 },
          opacity: { duration: 0.2, ease: 'easeIn' }
        }
      }
    }
    return {
      opacity: 0,
      y: 16,
      transition: { duration: 0.25, ease: 'easeIn' }
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
        // If going to a page further to the right (e.g. Home -> Playground, Playground -> Contact, Home -> Contact):
        // direction = 1 (enter from right, exit to left)
        // If going back to a page on the left:
        // direction = -1 (enter from left, exit to right)
        setDirection(nextOrder > prevOrder ? 1 : -1)
      } else {
        setDirection(0)
      }
      prevPathRef.current = next
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [router])

  return (
    <Chakra cookies={pageProps.cookies}>
      <Fonts />
      <Layout router={router}>
        <AnimatePresence
          mode="wait"
          initial={false}
          custom={direction}
          onExitComplete={() => {
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
            }
          }}
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
