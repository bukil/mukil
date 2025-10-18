import Head from 'next/head'
import { Container, Box } from '@chakra-ui/react'
import { useRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the simulation to avoid SSR issues
const AttractorsSim = dynamic(() => import('../components/AttractorsSim'), { ssr: false })
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { Global } from '@emotion/react'

const Playground = () => {
  const guiRef = useRef(null)

  return (
    <>
      <Global styles={`body { background: #000000 !important; }`} />
      <Layout title="Playground">
        <Head>
          <title>Playground - Mukil</title>
          <meta name="description" content="Mukil's creative playground. Interactive experiments and creative projects." />
        </Head>
        <Box bg="#000000" minHeight="100vh" color="white" position="relative">
          {/* Fullscreen simulation */}
          <Box position="fixed" inset={0} zIndex={0}>
            <AttractorsSim guiContainerRef={guiRef} />
          </Box>

          {/* Overlay content (click-through except GUI) */}
          <Container
            maxW="100%"
            mt={20}
            px={{ base: 4, md: 8 }}
            position="relative"
            zIndex={1}
            pointerEvents="none"
          >
            <Section delay={0.1}>
              

              

              <Box display={{ base: 'block', md: 'flex' }} gap={8} alignItems="flex-start">
                <Box flex="1 1 auto">
                  {/* left column content placeholder if needed */}
                </Box>
                <Box
                  flex="0 0 360px"
                  width={{ base: '100%', md: '360px' }}
                  ml={{ base: 0, md: 'auto' }}
                  mr={{ base: '-4', md: '-8' }}
                  pointerEvents="auto"
                >
                  {/* Controls container aligned to the right */}
                  <Box
                    ref={guiRef}
                    position="relative"
                    mt={6}
                    p={2}
                    bg="rgba(255,255,255,0.06)"
                    borderRadius="12px"
                    border="1px solid rgba(255,255,255,0.12)"
                    backdropFilter="blur(6px)"
                    boxShadow="0 8px 24px rgba(0,0,0,0.25)"
                  >
                    {/* GUI mounts here */}
                  </Box>
                </Box>
              </Box>
            </Section>
          </Container>
        </Box>
      </Layout>
    </>
  )
}

export default Playground
