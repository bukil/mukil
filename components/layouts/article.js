import { motion } from 'framer-motion'
import Head from 'next/head'
import { GridItemStyle } from '../grid-item'
import { useRouter } from 'next/router'
import { Box, useColorMode } from '@chakra-ui/react'

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 20 }
}

const Layout = ({ children, title }) => {
  const t = `${title} - Mukil`
  const router = useRouter()
  const { colorMode } = useColorMode()
  return (
    <motion.article
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, type: 'easeInOut' }}
      style={{ position: 'relative' }}
    >
      <>
        {title && (
          <Head>
            <title>{t}</title>
            <meta name="twitter:title" content={t} />
            <meta property="og:title" content={t} />
            {/* Custom fonts are added in pages/_document.js to satisfy @next/next/no-page-custom-font */}
          </Head>
        )}
        {/* Blog page background for dark mode only, radial gradient with pink glow at bottom */}
        {router.pathname === '/blog' && colorMode === 'dark' && (
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="#1a0612"
            bgImage="radial-gradient(ellipse at 50% 100%, #b83280 0%, #1a0612 60%, #1a0612 100%)"
            zIndex={-1}
          />
        )}
        {children}

        <GridItemStyle />
      </>
    </motion.article>
  )
}

export default Layout
