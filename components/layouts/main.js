import Head from 'next/head'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import FooterLand from '../FooterLand'

const Main = ({ children, router }) => {
  const showFooterLand = router.pathname === '/' || router.pathname === '/contact'

  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="homepage" />
        <meta name="author" content="Mukil Kumar" />
        <link rel="apple-touch-icon" href="apple-touch-icon1.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:site_name" content="Mukil Portfolio" />
        <meta name="og:title" content="Mukil Portfolio" />
        <meta property="og:type" content="website" />
        <title>MUKIL</title>
      </Head>

      <NavBar path={router.asPath} />

      <Container maxW="container.lg" pt={18}>
        {/* <LazyVoxelDog/> */}
        {children}
        <Footer />
      </Container>
      {showFooterLand && <FooterLand />}
    </Box>
  )
}

export default Main
