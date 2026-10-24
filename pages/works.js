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
import { motion } from 'framer-motion'
import React from 'react'
import MunselModel from '../components/MunselModel'

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
                  accentColor="blue.500"
                  customContent={
                    <Image src="/mukil/degpt2.png" alt="Design Evaluation ChatGPT" width="40%" height="40%" objectFit="contain" style={{ margin: '48px auto 0', display: 'block' }} />
                  }
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
                  accentColor="#2563eb"
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
      pointerEvents="none"
    >
      <svg
        width="260"
        height="180"
        viewBox="0 0 260 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: '80%', height: 'auto', display: 'block' }}
      >
        {/* Typeface Style Banner - Zero Radius */}
        <g transform="translate(30, 24)">
          {/* Left Block: Bold Specimen Glyph */}
          <rect x="0" y="0" width="50" height="44" fill="#1464FF" />
          <text
            x="25"
            y="32"
            fontFamily="'Anton', 'Arial Black', sans-serif"
            fontSize="26"
            fontWeight="900"
            fill="#ffffff"
            textAnchor="middle"
          >
            Aa
          </text>

          {/* Right Block: Typography Identity Banner */}
          <rect x="50" y="0" width="150" height="44" fill="#0F172A" />
          <text
            x="64"
            y="22"
            fontFamily="'Michroma', monospace"
            fontSize="11"
            fontWeight="700"
            fill="#ffffff"
            letterSpacing="0.08em"
          >
            PAY-GRID
          </text>
          <text
            x="64"
            y="35"
            fontFamily="'Encode Sans Expanded', sans-serif"
            fontSize="7"
            fontWeight="600"
            fill="#B1FF0B"
            letterSpacing="0.14em"
          >
            TYPEFACE SPECIMEN
          </text>
        </g>

        {/* Extended Palette - 10 Solid Colour Tiles with Zero Radius */}
        <g transform="translate(30, 78)">
          {/* Row 1 */}
          <rect x="0" y="0" width="36" height="26" fill="#1464FF" />
          <rect x="41" y="0" width="36" height="26" fill="#2563EB" />
          <rect x="82" y="0" width="36" height="26" fill="#38BDF8" />
          <rect x="123" y="0" width="36" height="26" fill="#B1FF0B" />
          <rect x="164" y="0" width="36" height="26" fill="#10B981" />

          {/* Row 2 */}
          <rect x="0" y="31" width="36" height="26" fill="#F59E0B" />
          <rect x="41" y="31" width="36" height="26" fill="#EF4444" />
          <rect x="82" y="31" width="36" height="26" fill="#8B5CF6" />
          <rect x="123" y="31" width="36" height="26" fill="#0F172A" />
          <rect x="164" y="31" width="36" height="26" fill="#E2E8F0" stroke="rgba(0, 0, 0, 0.1)" strokeWidth="1" />
        </g>
      </svg>
    </Box>
  );
}



// Progress Bar component removed per user request
