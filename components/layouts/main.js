import Head from 'next/head'
import Navbar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import FooterLand from '../FooterLand'


const Main = ({ children, router }) => {
  const showFooter = router.pathname !== '/' && router.pathname !== '/contact'
  const showFooterLand = router.pathname === '/'

  return (
    <Box as="main" pb={0} minHeight="100vh" display="flex" flexDirection="column">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="homepage" />
        <meta name="author" content="Mukil Kumar" />
        <link rel="apple-touch-icon" href="apple-touch-icon1.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:site_name" content="Mukil" />
        <meta name="og:title" content="Mukil" />
        <meta property="og:type" content="website" />
        <title>Mukil</title>
      </Head>

      <Navbar path={router.asPath} />

      <Box as="main" pt="80px" pb={0} flex="1" display="flex" flexDirection="column">
        {['/blog', '/works', '/'].includes(router.pathname) ? (
          <Box flex="1" display="flex" flexDirection="column">
            <Box flex="1">
              {children}
            </Box>
            {showFooter && <Footer />}
            {showFooterLand && <FooterLand />}
          </Box>
        ) : router.pathname === '/mukilm' ? (
          <Container maxW="container.full" pt={14} pb={0} flex="1" display="flex" flexDirection="column">
            <Box flex="1">
              {children}
            </Box>
            {showFooter && <Footer />}
          </Container>
        ) : (
          <Container maxW="container.md" pt={14} pb={0} flex="1" display="flex" flexDirection="column">
            {/* <LazyVoxelDog/> */}
            <Box flex="1">
              {children}
            </Box>
            {showFooter && <Footer />}
          </Container>
        )}
        {showFooterLand && !['/blog', '/works', '/'].includes(router.pathname) && <FooterLand />}
      </Box>
    </Box>
  )
}

export default Main
