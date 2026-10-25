/* eslint-disable react/no-unescaped-entities */
import { Heading, SimpleGrid, Image, Text, Button, useDisclosure, Box, Spacer } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronDownIcon } from '@chakra-ui/icons'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import styled from '@emotion/styled'
import NextLink from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import KodeboardModal from '../components/projects/Kodeboard'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import React from 'react'
import MunselModel from '../components/MunselModel'

const HairlineHub = dynamic(
  () => import('@lucasmarkes/hairline/react').then((m) => m.Hub),
  { ssr: false }
)

// Styled components
const Trans = styled.span`
  Button {
    position: relative;
    overflow: hidden;
    background: transparent;
    border: 1.5px solid #111827;
    color: #111827;
    transition: all 0.3s ease;
    z-index: 1;
    border-radius: 50px;
    height: 90px;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: auto;
      right: 0;
      width: 0;
      height: 100%;
      background: #111827;
      transition: all 0.3s ease;
      z-index: -1;
    }
    &:hover {
      color: #ffffff;
      transform: translateY(-2px);
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
    }
    &:hover:before {
      width: 100%;
    }
  }
`



const BigText = styled.div`
  font-family: 'BaseNeueTrial', sans-serif;
  font-size: 25vw;
  font-weight: 900;
  font-style: italic;
  text-transform: uppercase;
  color: rgba(17, 24, 39, 0.85);
  position: fixed;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  pointer-events: none;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-50%);
  letter-spacing: -0.016em;
`

const Character = styled.span`
  display: inline-block;
  opacity: 0;
  transform: translateY(100px);
`

const ScrollIndicator = styled.div`
  position: fixed;
  top: 88%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 34px;
  height: 64px;
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  pointer-events: none;
`

const ContentWrapper = styled(Box)`
  margin-top: 85vh;
  position: relative;
  z-index: 1;
  background: transparent;
`

// Standard Panel Component
const ProjectPanel = ({ 
  title, 
  hoverTitle,
  description, 
  imageSrc, 
  imageAlt, 
  gradientColors: _gradientColors, 
  hoverGradientColors: _hoverGradientColors, 
  accentColor, 
  onClick,
  customContent,
  sx
}) => {
  return (
    <Box 
      position="relative" 
      borderWidth="1px" 
      borderColor="rgba(0, 0, 0, 0.15)"
      borderRadius={0}
      overflow="hidden" 
      boxShadow="none"
      role="group"
      bg="transparent"
      transition="all 0.3s ease"
      _hover={{
        bg: 'transparent',
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
        borderColor: 'rgba(0, 0, 0, 0.3)'
      }}
      onClick={onClick}
      cursor="pointer"
      width="100%"
      maxW="540px"
      aspectRatio="540 / 300"
      mx="auto"
      sx={{
        ...sx,
        '& *': {
          pointerEvents: 'none'
        }
      }}
      as={motion.div}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
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
            top={hoverTitle === "Data Visualisation" || hoverTitle === "Design Evaluation ChatGPT" ? "3%" : "20%"}
            right={hoverTitle === "Data Visualisation" ? "5%" : undefined}
            left={hoverTitle === "Data Visualisation" ? undefined : "50%"}
            transform={hoverTitle === "Data Visualisation" ? "none" : hoverTitle === "Design Evaluation ChatGPT" ? "translate(-50%, 0)" : "translate(-50%, -50%)"}
            textAlign={hoverTitle === "Data Visualisation" ? "right" : "center"}
            fontSize={hoverTitle === "Data Visualisation" || hoverTitle === "Design Evaluation ChatGPT" ? "7xl" : "7xl"}
            fontWeight="900"
            color="#111827"
            opacity="0"
            transition="top 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
            whiteSpace="nowrap"
            _groupHover={{ 
              opacity: 0.7,
              top: hoverTitle === "Data Visualisation" || hoverTitle === "Design Evaluation ChatGPT" ? "3%" : "35%",
              transform: hoverTitle === "Data Visualisation" ? "none" : hoverTitle === "Design Evaluation ChatGPT" ? "translate(-50%, 0)" : "translate(-50%, -50%)",
              transition: "top 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            zIndex={2}
            letterSpacing="normal"
            lineHeight="1"
            fontFamily="'BaseNeueTrial', sans-serif"
            fontStyle="italic"
            textTransform="uppercase"
          >
            {hoverTitle === "Design Evaluation ChatGPT"
              ? (<><span>Design Evaluation</span><br /><span>ChatGPT</span></>)
              : hoverTitle === "Visually understanding Colour space"
              ? (<><span>Visually understanding</span><br /><span>Colour space</span></>)
              : (hoverTitle || title)
            }
          </Text>
        {imageSrc && (
          <Image 
            src={imageSrc}
            alt={imageAlt}
            width={title === "Kode/Board" ? "80%" : "50%"}
            height={title === "Kode/Board" ? "80%" : "50%"}
            objectFit="contain"
            transition="all 0.3s ease"
            _groupHover={{ 
              filter: 'brightness(1.05)',
              transform: 'scale(1.05)'
            }}
            position="relative"
            zIndex="1"
            bg="transparent"
          />
        )}
      </Box>
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        bg="rgba(255, 255, 255, 0.95)"
        backdropFilter="blur(8px)"
        pt={2}
        pb={2}
        px={4}
        color="gray.900"
        zIndex={3}
        height="76px"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        borderTop="1px solid rgba(0, 0, 0, 0.08)"
      >
        {/* Always-visible title above accent line - kept at consistent level */}
        {title && (
          <Box mb={0}>
            <Text
              fontSize="xs"
              fontFamily="'Michroma', monospace"
              fontWeight="600"
              letterSpacing="0.12em"
              lineHeight="1.1"
              textTransform="uppercase"
              color="gray.900"
            >
              {title}
            </Text>
          </Box>
        )}
        <Box 
          w="100%" 
          h="1px" 
          bg={accentColor || 'rgba(0, 0, 0, 0.15)'} 
          mt={1.5}
          mb={1.5}
        />
        <Box flex="0 0 auto">
          <Text 
            fontSize="xs"
            fontFamily="'Encode Sans Expanded', sans-serif"
            fontWeight="400"
            letterSpacing="0.5px"
            color="gray.600"
            noOfLines={2}
            lineHeight="1.3"
          >
            {description}
          </Text>
        </Box>
      </Box>
      {customContent && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={1}
          pointerEvents="none"
          sx={{
            '& img': {
              transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease',
              willChange: 'transform, opacity'
            },
            '& img.phone-large': {
              transformOrigin: '50% 50%'
            }
          }}
          _groupHover={{
            '& img': {
              transform: 'scale(1.05)'
            },
            '& img.phone-large': {
              transform: 'scale(1.05)'
            }
          }}
        >
          {customContent}
        </Box>
      )}
    </Box>
  )
}

// Usage in the main component
function CollapseExtandip() {
  const { isOpen: isEditOpenmd12, onOpen: onEditOpenmd12, onClose: onEditClosemd12 } = useDisclosure()
  

  return (
    <>
      <Box maxW="1148px" mx="auto" px={{ base: 4, sm: 6 }} mt={5}>
        <SimpleGrid columns={{ base: 1, md: 2 }} columnGap={5} rowGap={5}>
          <Section>
            <Box as="a" href="https://bukil.github.io/" target="_blank" rel="noopener noreferrer" style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}>
              <ProjectPanel
                title="Visually understanding Colour space"
                hoverTitle="Visually understanding Colour space"
                description="Documentation is in progress"
                gradientColors="radial-gradient(circle at center, rgba(80, 90, 200, 0.7) 0%, rgba(10, 15, 40, 0.98) 100%)"
                hoverGradientColors="radial-gradient(circle at center, rgba(100, 110, 220, 0.85) 0%, rgba(20, 25, 50, 0.98) 100%)"
                accentColor="purple.300"
                sx={{ position: 'relative', overflow: 'hidden' }}
                customContent={<MunselModel />}
              />
            </Box>
          </Section>
          <Section>
            <ProjectPanel
              title="Kode/Board"
              hoverTitle="Kode/Board"
              description="Here is a keyboard concept (kode board), Copy, paste, repeat... but not as you know it. Multi-layer clipboard on fingertips like seamlessly storing your snippets for instant recall."
              imageSrc="/images/works/BOTASF.png"
              imageAlt="Kode/Board"
              gradientColors="radial-gradient(circle at center, rgba(0, 150, 0, 0.7) 0%, rgba(0, 30, 0, 0.98) 100%)"
              hoverGradientColors="radial-gradient(circle at center, rgba(0, 200, 0, 0.8) 0%, rgba(0, 40, 0, 0.98) 100%)"
              accentColor="green.400"
              onClick={onEditOpenmd12}
            />
            <KodeboardModal isOpen={isEditOpenmd12} onClose={onEditClosemd12} />
          </Section>

          {/* Human Factor in Design - same style as DESIGN SYSTEM */}
          <Section>
            <NextLink href="/human-factor" passHref legacyBehavior>
              <Box as="a" style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}>
                <ProjectPanel
                  title={<span style={{ fontFamily: 'Michroma, monospace', letterSpacing: '0.12em', color: '#111827', fontStyle: 'normal' }}>HUMAN FACTOR IN DESIGN</span>}
                  hoverTitle={<span style={{ fontFamily: 'BaseNeueTrial, sans-serif', letterSpacing: 'normal', color: '#111827', fontStyle: 'italic' }}>HUMAN FACTOR IN DESIGN</span>}
                  description={<span style={{ color: '#4a5568' }}>Investigating the Influence of Dark Patterns on User Behavior and Decision Making</span>}
                  accentColor="#0d9488"
                  customContent={
                    <div style={{ position: 'absolute', right: '6%', top: '50%', zIndex: 2, pointerEvents: 'none', transform: 'translateY(-50%)' }}>
                      <Image className="phone-large" src="/hfid/phone.svg" alt="phone" width="920px" height="auto" style={{ display: 'block' }} />
                    </div>
                  }
                />
              </Box>
            </NextLink>
          </Section>

          <Section>
            <NextLink href="/design-evaluation" passHref legacyBehavior>
              <Box as="a" style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}>
                  <ProjectPanel
                  title="Design Evaluation ChatGPT"
                  hoverTitle="Design Evaluation ChatGPT"
                  description="A design evaluation of the ChatGPT Android client, analyzing its usability and interaction experience across real-world usage contexts."
                  accentColor="#232327"
                  customContent={<ChatGPT3DGraphic />}
                />
              </Box>
            </NextLink>
          </Section>

          {/* Jokif-AI panel removed per request */}


{/* design system===================================================================================== */}
          <Section>
            <NextLink href="/DS" passHref legacyBehavior>
              <Box as="a" style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}>
                <ProjectPanel
                  title={<span style={{ fontFamily: 'Michroma, monospace', letterSpacing: '0.12em', color: '#111827', fontStyle: 'normal' }}>DESIGN SYSTEM</span>}
                  hoverTitle={<span style={{ fontFamily: 'BaseNeueTrial, sans-serif', letterSpacing: 'normal', color: '#111827', fontStyle: 'italic' }}>DESIGN SYSTEM</span>}
                  description={<span style={{ color: '#4a5568' }}>Design System For UPI</span>}
                  accentColor="#232327"
                  customContent={<DesignSystemGraphic />}
                  sx={{
                    filter: 'brightness(0.98) saturate(0.98)',
                  }}
                />
              </Box>
            </NextLink>
          </Section>


        </SimpleGrid>
      </Box>
    </>
  )
}

// ============== Indu also check out content for the interaction design ^ ===================

// ================ End of Work Section =========================

const Works = () => {
  const bigTextRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const characters = "DESIGN".split("")

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = bigTextRef.current?.children
      if (!chars) return

      // Create a timeline
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1
      })

      // Initial animation
      tl.to(chars, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out"
      })

      // Floating animation
      tl.to(chars, {
        y: -20,
        duration: 2,
        stagger: 0.05,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1
      }, ">")

      // Exit animation
      tl.to(chars, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.in"
      }, ">")
    }, bigTextRef)

    // Add scroll effect
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const fadeStart = 0
      const fadeEnd = 300 // Reduced fade distance for quicker fade out

      const elements = [bigTextRef.current, scrollIndicatorRef.current].filter(Boolean)
      if (elements.length) {
        const opacity = Math.max(0, 1 - (scrollPosition - fadeStart) / (fadeEnd - fadeStart))
        gsap.to(elements, {
          opacity: opacity,
          duration: 0.1,
          ease: "none"
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      ctx.revert()
    }
  }, [])

  return (
    <>
      {/* Font link moved to _document.js to satisfy @next/next/no-page-custom-font */}
      <Layout title="Works" mt={10} overflowX="hidden">
        <Box w="100%" position="relative">
          <BigText ref={bigTextRef}>
            {characters.map((char, index) => (
              <Character key={index}>{char}</Character>
            ))}
          </BigText>
          <ScrollIndicator ref={scrollIndicatorRef}>
            <Box
              as={motion.div}
              initial={{ y: -8, opacity: 0.4 }}
              animate={{ y: [ -8, 8, -8 ], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronDownIcon boxSize={5} color="#1a202c" />
            </Box>
          </ScrollIndicator>
          <ContentWrapper>
            <Section>
              <Heading as="h3" fontSize={50} mb={15} mt={10}>
                <CollapseExtandip/>
              </Heading>
            </Section>
            <Spacer/>
            <Spacer/>
            <Trans>
              <Section>
                <Box align="center" mb={4}>
                  <NextLink href="/" passHref scroll={true}>
                    <motion.div
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 60, damping: 16 }}
                      style={{ display: 'inline-block' }}
                    >
                      <Button 
                        borderRadius='50px'
                        variant='outline'
                        border='1.5px solid'
                        borderColor='#111827'
                        color='#111827'
                        px={6}
                        py={10}
                        fontSize="lg"
                        fontWeight="semibold"
                        letterSpacing="wider"
                        height="90px"
                        leftIcon={<ChevronLeftIcon />}
                        _hover={{
                          bg: '#111827',
                          color: '#ffffff',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)'
                        }}
                      >
                        GO BACK TO HOME PAGE
                      </Button>
                    </motion.div>
                  </NextLink>
                </Box>
              </Section>
            </Trans>
          </ContentWrapper>
        </Box>
      </Layout>
    </>
  )
}

export default Works
export { getServerSideProps } from '../components/chakra'



function DesignSystemGraphic() {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pb="72px"
      pointerEvents="auto"
      data-hairline=""
      sx={{
        '--hairline-plate': '#ffffff',
        '--hairline-hi': '#232327',
        '--hairline-edge': '#a4a4ac',
        '--hairline-mid': '#c3c3c9',
        '--hairline-lo': '#e0e0e4',
        '--hairline-stroke': '0.9',
      }}
    >
      <Box width="310px" maxW="88%" position="relative">
        <HairlineHub play intensity={0.7} />
      </Box>
    </Box>
  );
}

function ChatGPT3DGraphic() {
  const gptPath =
    'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z';

  // Hairline framework isometric matrix:
  // Projects a 2D horizontal plane (X, Y) to true 30° isometric screen coordinates.
  // matrix(cos(30°), sin(30°), -cos(30°), sin(30°), 0, 0)
  // Scale factor S = 2.8 => cos(30°)*2.8 = 2.42487, sin(30°)*2.8 = 1.4
  const isoTransform = 'matrix(2.42487, 1.4, -2.42487, 1.4, 0, 0) translate(-12, -12)';

  // Extrusion step offsets (from base floor up to top face)
  const extrusionSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pb="72px"
      pointerEvents="none"
      data-hairline=""
      sx={{
        '--hairline-plate': '#ffffff',
        '--hairline-hi': '#232327',
        '--hairline-edge': '#a4a4ac',
        '--hairline-mid': '#c3c3c9',
        '--hairline-lo': '#e0e0e4',
        '--hairline-stroke': '0.9',
        '& svg': {
          width: '100%',
          height: '100%',
          display: 'block'
        },
        '& path, & polygon, & line, & circle': {
          vectorEffect: 'non-scaling-stroke',
          strokeLinejoin: 'round',
          strokeLinecap: 'round'
        }
      }}
    >
      <svg
        viewBox="0 0 540 224"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        {/* ============================================================== */}
        {/* Hairline Technical Metadata & Figures Annotation               */}
        {/* ============================================================== */}
        <g opacity="0.85">
          <text
            x="36"
            y="26"
            fontFamily="'Michroma', monospace"
            fontSize="8"
            fontWeight="600"
            fill="#a4a4ac"
            letterSpacing="0.14em"
          >
            FIG. 03 · CHATGPT
          </text>
          <text
            x="504"
            y="26"
            textAnchor="end"
            fontFamily="'Michroma', monospace"
            fontSize="8"
            fontWeight="500"
            fill="#c3c3c9"
            letterSpacing="0.1em"
          >
            AZ 045° · EL 30°
          </text>
          <text
            x="36"
            y="200"
            fontFamily="'Encode Sans Expanded', sans-serif"
            fontSize="7.5"
            fontWeight="500"
            fill="#a4a4ac"
            letterSpacing="0.08em"
          >
            HAIRLINE FRAMEWORK · 0.9PX ISO
          </text>
        </g>

        {/* Technical Perimeter Frame / Border Guide */}
        <rect
          x="20"
          y="10"
          width="500"
          height="198"
          fill="none"
          stroke="#e0e0e4"
          strokeWidth="0.8"
          strokeDasharray="1 4"
        />

        {/* ============================================================== */}
        {/* Isometric Base Plinth (Platform)                              */}
        {/* ============================================================== */}
        <g id="isometric-plinth">
          {/* Plinth front-left drop facet (8px depth) */}
          <polygon
            points="146,114 270,185 270,193 146,122"
            fill="#ffffff"
            stroke="#a4a4ac"
            strokeWidth="0.9"
          />
          {/* Plinth front-right drop facet (8px depth) */}
          <polygon
            points="270,185 394,114 394,122 270,193"
            fill="#ffffff"
            stroke="#a4a4ac"
            strokeWidth="0.9"
          />

          {/* Plinth top plate surface (True 30° Isometric Diamond) */}
          <polygon
            points="270,43 394,114 270,185 146,114"
            fill="#ffffff"
            stroke="#232327"
            strokeWidth="0.9"
          />

          {/* Isometric floor guide lines (Dashed lines along 30° / 150° axes) */}
          <g stroke="#e0e0e4" strokeWidth="0.8" strokeDasharray="2 4">
            {/* 30° axis guides */}
            <line x1="177" y1="96" x2="301" y2="167" />
            <line x1="208" y1="78" x2="332" y2="149" />
            <line x1="239" y1="60" x2="363" y2="131" />

            {/* 150° axis guides */}
            <line x1="363" y1="96" x2="239" y2="167" />
            <line x1="332" y1="78" x2="208" y2="149" />
            <line x1="301" y1="60" x2="177" y2="131" />
          </g>

          {/* Registration Crosshairs (+) at Plinth Anchor Points */}
          <g stroke="#a4a4ac" strokeWidth="0.8">
            {/* Left corner */}
            <line x1="140" y1="114" x2="152" y2="114" />
            <line x1="146" y1="108" x2="146" y2="120" />
            {/* Right corner */}
            <line x1="388" y1="114" x2="400" y2="114" />
            <line x1="394" y1="108" x2="394" y2="120" />
            {/* Top corner */}
            <line x1="264" y1="43" x2="276" y2="43" />
            <line x1="270" y1="37" x2="270" y2="49" />
            {/* Bottom corner */}
            <line x1="264" y1="185" x2="276" y2="185" />
            <line x1="270" y1="179" x2="270" y2="191" />
          </g>

          {/* Hairline Anchor Dots */}
          <circle cx="146" cy="114" r="1.6" fill="#232327" />
          <circle cx="394" cy="114" r="1.6" fill="#232327" />
          <circle cx="270" cy="43" r="1.6" fill="#232327" />
          <circle cx="270" cy="185" r="1.6" fill="#232327" />
          <circle cx="270" cy="114" r="1.5" fill="#a4a4ac" />
        </g>

        {/* ============================================================== */}
        {/* Floor Footprint Shadow of the ChatGPT Knot                     */}
        {/* ============================================================== */}
        <g transform="translate(270, 114)">
          <path
            d={gptPath}
            transform={isoTransform}
            fill="none"
            stroke="#e0e0e4"
            strokeWidth="0.85"
            strokeDasharray="2 3"
          />
        </g>

        {/* ============================================================== */}
        {/* Vertical Projection Drop Guides (Knot vertices down to floor) */}
        {/* ============================================================== */}
        <g stroke="#c3c3c9" strokeWidth="0.8" strokeDasharray="1 3">
          <line x1="270" y1="96" x2="270" y2="114" />
          <line x1="220" y1="96" x2="220" y2="114" />
          <line x1="320" y1="96" x2="320" y2="114" />
          <line x1="245" y1="82" x2="245" y2="100" />
          <line x1="295" y1="82" x2="295" y2="100" />
          <line x1="270" y1="68" x2="270" y2="86" />
        </g>

        {/* ============================================================== */}
        {/* 3D Isometric Extruded ChatGPT Logo                             */}
        {/* Reacts smoothly on hover: lifts along isometric vertical axis  */}
        {/* ============================================================== */}
        <g
          id="chatgpt-isometric-body"
          className="hairline-interactive-knot"
          style={{
            transform: 'translateY(-16px)',
            transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        >
          {/* Volumetric Extrusion Slices (Back-to-front stack) */}
          {extrusionSteps.map((step) => (
            <g key={step} transform={`translate(270, ${114 - step})`}>
              <path
                d={gptPath}
                transform={isoTransform}
                fill="#ffffff"
                stroke={step === 1 ? '#a4a4ac' : '#c3c3c9'}
                strokeWidth="0.9"
              />
            </g>
          ))}

          {/* Primary Top Isometric Face (Lit & Crisp Black Lines) */}
          <g transform="translate(270, 99)">
            {/* Opaque white plate base face */}
            <path
              d={gptPath}
              transform={isoTransform}
              fill="#ffffff"
              stroke="#232327"
              strokeWidth="1.0"
            />

            {/* Inner loop edge definition lines for maximum hairline clarity */}
            <path
              d={gptPath}
              transform={isoTransform}
              fill="none"
              stroke="#232327"
              strokeWidth="0.9"
            />

            {/* Subtle inner aperture depth drop */}
            <polygon
              points="-3,-1 0,1 3,-1 3,-3 0,-1 -3,-3"
              fill="#232327"
              opacity="0.25"
            />

            {/* Hairline Coordinate Anchor Dots on Knot Vertices */}
            <circle cx="0" cy="-28" r="1.6" fill="#232327" />
            <circle cx="48" cy="0" r="1.6" fill="#232327" />
            <circle cx="-48" cy="0" r="1.6" fill="#232327" />
            <circle cx="0" cy="28" r="1.6" fill="#232327" />
            <circle cx="0" cy="0" r="1.4" fill="#a4a4ac" />
          </g>
        </g>

        {/* Floating Technical Badge (Hairline Specimen Pill) */}
        <g transform="translate(432, 184)">
          <rect
            x="0"
            y="0"
            width="72"
            height="18"
            fill="#ffffff"
            stroke="#232327"
            strokeWidth="0.8"
          />
          <text
            x="36"
            y="12"
            textAnchor="middle"
            fontFamily="'Michroma', monospace"
            fontSize="7"
            fontWeight="600"
            fill="#232327"
            letterSpacing="0.08em"
          >
            ISO · 30°
          </text>
        </g>
      </svg>
    </Box>
  );
}

// Progress Bar component removed per user request
