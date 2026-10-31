import Head from 'next/head'
import Navbar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import FooterLand from '../FooterLand'


const Main = ({ children, router }) => {
  const showFooter = router.pathname === '/works'
  const showFooterLand = router.pathname === '/'

  return (
    <Box as="main" pb={0} minHeight="100vh" display="flex" flexDirection="column">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Mukil Kumar — Product Designer, Interaction Designer, and Creative Technologist from IDC School of Design, IIT Bombay." />
        <meta name="keywords" content="Mukil, Mukil Kumar, Mukil IITB, Mukil IDC, Mukil Designer, Mukil IIT Bombay, Product Designer, Interaction Designer, IDC School of Design, Creative Technologist" />
        <meta name="author" content="Mukil Kumar" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-title" content="Mukil Kumar" />
        <meta name="application-name" content="Mukil Kumar" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:site_name" content="Mukil Kumar Portfolio" />
        <meta name="og:title" content="Mukil Kumar | Product & Interaction Designer | IDC IIT Bombay" />
        <meta property="og:description" content="Mukil Kumar — Product Designer, Interaction Designer, and Creative Technologist from IDC School of Design, IIT Bombay." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mukil Kumar | Product & Interaction Designer | IDC IIT Bombay" />
        <meta name="twitter:description" content="Portfolio of Mukil Kumar — Interaction Designer, Creative Technologist, and M.Des at IDC School of Design, IIT Bombay." />
        <title>Mukil Kumar | Product & Interaction Designer | IDC IIT Bombay</title>
      </Head>

      <Navbar path={router.asPath} />

      <Box as="main" pt="80px" pb={0} flex="1" display="flex" flexDirection="column">
        {['/works', '/', '/contact'].includes(router.pathname) ? (
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
        {showFooterLand && !['/works', '/', '/contact'].includes(router.pathname) && <FooterLand />}
      </Box>
    </Box>
  )
}

export default Main
