import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import VoxelDogLoader from '../voxel-dog-loader'

const LazyVoxelDog = dynamic(() => import('../voxel-dog'), {
  ssr: false,
  loading: () => <VoxelDogLoader/>
})

const Main = ({ children, router }) => {
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
        <LazyVoxelDog/>
        {children}
        <Footer />
      </Container>
    </Box>
  )
}

export default Main
