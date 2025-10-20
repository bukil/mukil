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
  const ProjectPanelLite = ({ title, description, imageSrc, imageAlt, gradientColors, hoverGradientColors, accentColor }) => (
    <Box
      position="relative"
      borderWidth="1px"
      overflow="hidden"
      boxShadow="md"
      role="group"
      bg={gradientColors}
      transition="all 0.3s ease"
      _hover={{ bg: hoverGradientColors, transform: 'translateY(-5px)', boxShadow: 'xl' }}
      cursor="pointer"
      height="400px"
      width="100%"
    >
      <Box
        position="relative"
        height="100%"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          position="absolute"
          top="20%"
          left="50%"
          transform="translate(-50%, -50%)"
          fontSize="7xl"
          fontWeight="900"
          color="white"
          opacity="0"
          transition="all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          _groupHover={{ opacity: 0.4, top: '35%', transform: 'translate(-50%, -50%)' }}
          zIndex={2}
          letterSpacing="normal"
          lineHeight="1"
          fontFamily="'BaseNeueTrial', sans-serif"
          fontStyle="italic"
          textTransform="uppercase"
        >
          {title}
        </Text>
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            width="50%"
            height="50%"
            objectFit="contain"
            transition="all 0.3s ease"
            _groupHover={{ filter: 'brightness(1.2)', transform: 'scale(1.05)' }}
            position="relative"
            zIndex="1"
            bg="transparent"
          />
        )}
      </Box>
      <Box position="absolute" bottom="0" left="0" right="0" bg="transparent" p={3} color="white" zIndex={3}>
        <Heading
          as="h3"
          size="sm"
          mb={1}
          style={{
            fontFamily: '"Michroma", sans-serif',
            fontWeight: 900,
            letterSpacing: '0.2em',
            color: 'white',
            transition: 'all 0.3s ease',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          }}
          _groupHover={{ opacity: 0 }}
        >
          {title}
        </Heading>
        <Box w="100%" h="0.5px" bg={accentColor || 'green.400'} mb={2} />
        <Text fontSize="xs" fontFamily="'Encode Sans Expanded', sans-serif" fontWeight="400" letterSpacing="0.5px">
          {description}
        </Text>
      </Box>
    </Box>
  )

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
                {/* Left: project tile (aligned left) */}
                <Box flex="1 1 auto" pointerEvents="auto">
                  <Box
                    as="a"
                    href="https://bukil.github.io/dataviz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <ProjectPanelLite
                      title="Data Visualisation: Comparative Visualisations"
                      description="A comparative visualisation of particle speeds."
                      imageSrc="/images/Imag.png"
                      gradientColors="radial-gradient(circle at center, rgba(0, 120, 255, 0.7) 0%, rgba(0, 20, 40, 0.98) 100%)"
                      hoverGradientColors="radial-gradient(circle at center, rgba(50, 160, 255, 0.85) 0%, rgba(10, 30, 60, 0.98) 100%)"
                      accentColor="blue.400"
                    />
                  </Box>
                </Box>
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
