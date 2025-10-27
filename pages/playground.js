import Head from 'next/head'
import { Container, Box, Heading, Text, Image } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the simulation to avoid SSR issues
const AttractorsSim = dynamic(() => import('../components/AttractorsSim'), { ssr: false })
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { Global } from '@emotion/react'

const Playground = () => {
  const guiRef = useRef(null)
  const [showGui, setShowGui] = useState(false)

  // Simple panel similar to Works tiles (lightweight clone)

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
                <Box
                  flex="0 0 360px"
                  width={{ base: '100%', md: '360px' }}
                  ml={{ base: 0, md: 'auto' }}
                  mr={{ base: '-4', md: '-8' }}
                  pointerEvents="auto"
                >
                  {/* Small circular toggle button for controls */}
                  <Box
                    as="button"
                    onClick={() => setShowGui(v => !v)}
                    aria-label="Toggle particle controls"
                    w="40px"
                    h="40px"
                    borderRadius="9999px"
                    bg="transparent"
                    border="1px solid rgba(255,255,255,0.6)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mt={6}
                    transition="background 0.15s ease"
                    _hover={{ bg: 'rgba(255,255,255,0.1)' }}
                  />
                  {/* Controls container aligned to the right */}
                  <Box
                    ref={guiRef}
                    position="relative"
                    mt={4}
                    p={2}
                    bg="rgba(255,255,255,0.06)"
                    borderRadius="12px"
                    border="1px solid rgba(255,255,255,0.12)"
                    backdropFilter="blur(6px)"
                    boxShadow="0 8px 24px rgba(0,0,0,0.25)"
                    display={showGui ? 'block' : 'none'}
                  >
                    {/* GUI mounts here */}
                  </Box>
                  {/* Divider removed as requested */}
                  {/* Right column content end */}
                </Box>
              </Box>
              {/* Centered tile row removed; tile is left aligned above */}
            </Section>
          </Container>
        </Box>
      </Layout>
    </>
  )
}

export default Playground
