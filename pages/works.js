/* eslint-disable react/no-unescaped-entities */
import { Heading, SimpleGrid, Image, Text, Button, useDisclosure, Box, Spacer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useColorMode, Progress } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import styled from '@emotion/styled'
import NextLink from 'next/link'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import KodeboardModal from '../components/projects/Kodeboard'
import Head from 'next/head'
import { motion } from 'framer-motion'

import React from 'react'

// Styled components
const Trans = styled.span`
  Button {
    position: relative;
    overflow: hidden;
    background: transparent;
    border: 1px solid #89EF8C;
    color: #89EF8C;
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
      background: #89EF8C;
      transition: all 0.3s ease;
      z-index: -1;
    }
    &:hover {
      color: #0a192f;
      transform: translateY(-2px);
      box-shadow: 0 3px 10px rgba(137, 239, 140, 0.3);
    }
    &:hover:before {
      width: 100%;
    }
  }
`


const SnowContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`

const Snowflake = styled.div`
  position: absolute;
  background: white;
  border-radius: 50%;
  opacity: 0;
  animation: float linear infinite;
  @keyframes float {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg);
      opacity: 0;
    }
    20% {
      opacity: 0.8;
    }
    80% {
      opacity: 0.8;
    }
    100% {
      transform: translateY(-20px) translateX(10px) rotate(360deg);
      opacity: 0;
    }
  }
`

const BigText = styled.div`
  font-family: 'BaseNeueTrial', sans-serif;
  font-size: 25vw;
  font-weight: 900;
  font-style: italic;
  text-transform: uppercase;
  color: ${props => props.colorMode === 'light' ? '#89EF8C' : 'rgba(255, 255, 255, 0.8)'};
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

const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.84) 50%, rgba(255,255,255,0) 100%);
  position: fixed;
  top: 90%;
  left: 0;
  z-index: 0;
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
  gradientColors, 
  hoverGradientColors, 
  accentColor, 
  onClick,
  hasSnow = false,
  customContent,
  sx
}) => {
  return (
    <Box 
      position="relative"
      borderWidth="1px" 
      overflow="hidden" 
      boxShadow="md"
      role="group"
      bg={gradientColors}
      transition="all 0.3s ease"
      _hover={{
        bg: hoverGradientColors,
        transform: 'translateY(-5px)',
        boxShadow: 'xl'
      }}
      onClick={onClick}
      cursor="pointer"
      height="400px"
      width="100%"
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
      {hasSnow && (
        <SnowContainer>
          {[...Array(30)].map((_, i) => {
            const size = Math.random() * 10 + 3;
            let duration = Math.random() * 8 + 4;
            if (title === "Jokif-AI") {
              duration = Math.random() * 2 + 2;
            }
            return (
              <Snowflake
                key={i}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDuration: `${duration}s`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: `${Math.random() * 0.4 + 0.4}`
                }}
              />
            );
          })}
        </SnowContainer>
      )}
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
          _groupHover={{ 
            opacity: 0.4,
            top: "35%",
            transform: "translate(-50%, -50%)"
          }}
          zIndex={2}
          letterSpacing="normal"
          lineHeight="1"
          fontFamily="'BaseNeueTrial', sans-serif"
          fontStyle="italic"
          textTransform="uppercase"
        >
          {hoverTitle || title}
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
              filter: 'brightness(1.2)',
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
        bg="transparent"
        p={3}
        color="white"
        zIndex={3}
      >
        <Heading 
          as="h3" 
          size="sm" 
          mb={1}
          style={{
            fontFamily: '"Michroma", sans-serif',
            fontWeight: 900,
            fontStyle: 'normal',
            letterSpacing: '0.2em',
            color: 'white',
            transition: 'all 0.3s ease',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale'
          }}
          _groupHover={{ opacity: 0 }}
        >
          {title}
        </Heading>
        <Box 
          w="100%" 
          h="0.5px" 
          bg={accentColor} 
          mb={2}
        />
        <Text 
          fontSize="xs"
          fontFamily="'Encode Sans Expanded', sans-serif"
          fontWeight="400"
          letterSpacing="0.5px"
        >
          {description}
        </Text>
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
  const { isOpen: isEditOpenmd13, onOpen: onEditOpenmd13, onClose: onEditClosemd13 } = useDisclosure()
  const { isOpen: isEditOpenmd17, onOpen: onEditOpenmd17, onClose: onEditClosemd17 } = useDisclosure()
  

  return (
    <>
      <Box p='2px' color='white' mt='4' rounded='md' shadow='md'>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} columnGap={4} rowGap={4} mt={5} px={4}>
          <Section>
            <ProjectPanel
              title="Kode/Board"
              hoverTitle="Kode/Board"
              description="Here is a keyboard concept (kode board 🙃), Copy, paste, repeat... but not as you know it. Multi-layer clipboard on fingertips like seamlessly storing your snippets for instant recall. 🪄"
              imageSrc="/images/works/BOTASF.png"
              imageAlt="Kode/Board"
              gradientColors="radial-gradient(circle at center, rgba(0, 150, 0, 0.7) 0%, rgba(0, 30, 0, 0.98) 100%)"
              hoverGradientColors="radial-gradient(circle at center, rgba(0, 200, 0, 0.8) 0%, rgba(0, 40, 0, 0.98) 100%)"
              accentColor="green.400"
              onClick={onEditOpenmd12}
            />
            <KodeboardModal isOpen={isEditOpenmd12} onClose={onEditClosemd12} />
          </Section>

          <Section>
            <NextLink href="/design-evaluation" passHref legacyBehavior>
              <Box as="a" style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}>
                <ProjectPanel
                  title="Design Evaluation ChatGPT"
                  hoverTitle="Design Evaluation ChatGPT"
                  description="Leveraging ChatGPT to evaluate and enhance design concepts. Get instant feedback, suggestions, and improvements for your creative work through AI-powered analysis. 🤖"
                  imageSrc="/mukil/degpt2.png"
                  imageAlt="Design Evaluation ChatGPT"
                  gradientColors="radial-gradient(circle at center, rgba(0, 100, 255, 0.7) 0%, rgba(0, 30, 60, 0.98) 100%)"
                  hoverGradientColors="radial-gradient(circle at center, rgba(0, 150, 255, 0.8) 0%, rgba(0, 40, 80, 0.98) 100%)"
                  accentColor="blue.400"
                />
              </Box>
            </NextLink>
          </Section>

          <Section>
            <ProjectPanel
              title="Jokif-AI"
              hoverTitle="Jokif-AI"
              description="An AI-powered platform that brings humor and creativity together. Generate jokes, create memes, and share laughter with the power of artificial intelligence. 🤖"
              imageSrc="/images/works/BOTASF.png"
              imageAlt="AI Trends Project"
              gradientColors="radial-gradient(circle at center, rgba(100, 0, 255, 0.7) 0%, rgba(30, 0, 60, 0.98) 100%)"
              hoverGradientColors="radial-gradient(circle at center, rgba(150, 50, 255, 0.85) 0%, rgba(60, 0, 100, 0.98) 100%)"
              accentColor="purple.400"
              onClick={onEditOpenmd13}
              hasSnow={true}
            />
            <Modal isOpen={isEditOpenmd13} onClose={onEditClosemd13} size="full">
              <ModalOverlay backdropFilter="blur(10px)" />
              <ModalContent bg="rgba(0, 0, 0, 0.8)">
                <ModalHeader mt={32}>Jokif-AI</ModalHeader>
                <ModalCloseButton mt={32} />
                <ModalBody mt={4}>
                  <Text fontSize={24} fontWeight={'hairline'} mb={6}>
                    Welcome to Jokif-AI! This is a protected section of my portfolio.
                  </Text>
                  <Image 
                    src="/images/works/BOTASF.png"
                    alt="Jokif-AI Project"
                    width="100%"
                    borderRadius="lg"
                    mb={6}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onEditClosemd13}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Section>

          <Section>
            <NextLink href="/mukilm" passHref legacyBehavior>
              <Box as="a" style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}>
                <ProjectPanel
                  title="Microinteraction"
                  hoverTitle="Microinteraction"
                  description="A class assignment exploring the art of microinteractions. Small, meaningful animations and transitions that enhance user experience and bring interfaces to life. 🎨"
                  gradientColors="linear-gradient(135deg, #181c3a 0%, #2d1e4f 100%)"
                  hoverGradientColors="linear-gradient(135deg, #2d1e4f 0%, #181c3a 100%)"
                  accentColor="#a259ff"
                  customContent={<GlowingRollingLandAnimation />}
                />
              </Box>
            </NextLink>
          </Section>
{/* design system===================================================================================== */}
          <Section>
            <NextLink href="/DS" passHref legacyBehavior>
              <Box as="a" style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}>
                <ProjectPanel
                  title={<span style={{ fontFamily: 'Michroma, monospace', letterSpacing: '0.12em', color: '#89EF8C', fontStyle: 'normal' }}>DESIGN SYSTEM</span>}
                  hoverTitle={<span style={{ fontFamily: 'BaseNeueTrial, sans-serif', letterSpacing: 'normal', color: 'white', fontStyle: 'italic' }}>DESIGN SYSTEM</span>}
                  description={<span style={{ color: '#fff' }}>Design System For UPI</span>}
                  accentColor="#89EF8C"
                  customContent={
                    <>
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        zIndex={20}
                        opacity={0.3}
                      >
                        <svg width="100%" height="100%" viewBox="0 0 650 426" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="44.25" y="26.25" width="565.5" height="370.5" stroke="white" strokeWidth="0.5"/>
                          <line x1="0.136303" y1="-0.209574" x2="655.136" y2="425.79" stroke="white" strokeWidth="0.5"/>
                          <line x1="-0.137038" y1="425.791" x2="649.863" y2="-0.209059" stroke="white" strokeWidth="0.5"/>
                          <line y1="212" x2="650" y2="212" stroke="white" strokeWidth="2"/>
                          <line x1="325.25" x2="325.25" y2="426" stroke="white" strokeWidth="0.5"/>
                          <rect x="44.5" y="26.5" width="565" height="370" rx="24.5" stroke="white"/>
                          <rect x="141.25" y="88.25" width="365.5" height="245.5" rx="24.75" stroke="white" strokeWidth="0.5"/>
                          <circle cx="323.5" cy="210.5" r="119.5" stroke="white" strokeWidth="2"/>
                          <circle cx="324" cy="209" r="182" stroke="white" strokeWidth="2"/>
                        </svg>
                      </Box>
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        zIndex={30}
                      >
                        <svg width="100%" height="100%" viewBox="0 0 650 426" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Rectangle corners */}
                          <circle cx="44.25" cy="26.25" r="2" fill="#ffffff"/>
                          <circle cx="609.75" cy="26.25" r="2" fill="#ffffff"/>
                          <circle cx="44.25" cy="396.75" r="2" fill="#ffffff"/>
                          <circle cx="609.75" cy="396.75" r="2" fill="#ffffff"/>
                          <circle cx="141.25" cy="88.25" r="2" fill="#ffffff"/>
                          <circle cx="506.75" cy="88.25" r="2" fill="#ffffff"/>
                          <circle cx="141.25" cy="333.75" r="2" fill="#ffffff"/>
                          <circle cx="506.75" cy="333.75" r="2" fill="#ffffff"/>
                          <circle cx="325.25" cy="212" r="2" fill="#ffffff"/>
                          {/* Circle intersections */}
                          <circle cx="323.5" cy="91" r="2" fill="#ffffff"/>
                          <circle cx="323.5" cy="330" r="2" fill="#ffffff"/>
                          <circle cx="203" cy="210.5" r="2" fill="#ffffff"/>
                          <circle cx="444" cy="210.5" r="2" fill="#ffffff"/>
                          <circle cx="324" cy="27" r="2" fill="#ffffff"/>
                          <circle cx="324" cy="391" r="2" fill="#ffffff"/>
                          <circle cx="142" cy="209" r="2" fill="#ffffff"/>
                          <circle cx="506" cy="209" r="2" fill="#ffffff"/>
                        </svg>
                      </Box>
                      <DesignSystemPanelGridLines />
                    </>
                  }
                  sx={{
                    background: 'linear-gradient(180deg,rgb(94, 164, 255) 0%,rgb(0, 26, 93) 100%)',
                    backgroundSize: '100% 100%',
                    transition: 'background 0.5s',
                    filter: 'brightness(0.98) saturate(0.98)',
                  }}
                />
              </Box>
            </NextLink>
          </Section>

          <Section>
            <ProjectPanel
              title={<span style={{ fontFamily: 'Michroma, monospace', letterSpacing: '0.12em', fontStyle: 'normal' }}>C2C</span>}
              hoverTitle={<span style={{ fontFamily: 'Tiny5, monospace', letterSpacing: 'normal', color: 'white' }}>C2C</span>}
              description="A deep dive into the craft of interaction design, exploring concepts, case studies, and hands-on projects from concept to creation. 🕹️"
              imageSrc="/images/works/c2cf.png"
              imageAlt="C2C: Interaction Design Project"
              gradientColors="radial-gradient(circle at center, rgba(0, 200, 150, 0.7) 0%, rgba(0, 30, 60, 0.98) 100%)"
              hoverGradientColors="radial-gradient(circle at center, rgba(0, 255, 200, 0.8) 0%, rgba(0, 40, 80, 0.98) 100%)"
              accentColor="teal.400"
              onClick={onEditOpenmd17}
              hasSnow={false}
            />
            <Modal isOpen={isEditOpenmd17} onClose={onEditClosemd17} size="full">
              <ModalOverlay backdropFilter="blur(10px)" />
              <ModalContent bg="rgba(0, 0, 0, 0.8)">
                <ModalHeader mt={32} style={{ fontFamily: 'Tiny5, monospace' }}>C2C</ModalHeader>
                <ModalCloseButton mt={32} />
                <ModalBody mt={4}>
                  {/* C2C Branding Header */}
                  <div style={{
                    fontFamily: 'Matrix, monospace',
                    fontSize: '2.5rem',
                    color: '#89EF8C',
                    fontWeight: 900,
                    letterSpacing: '0.08em',
                    marginBottom: '0.5rem',
                    textShadow: '0 2px 12px #000, 0 0px 2px #89EF8C',
                    textAlign: 'left',
                  }}>
                    C2C <span style={{ fontSize: '1.2rem', color: '#b3ffb3', fontWeight: 400, marginLeft: 12 }}>Cube to Cube</span>
                  </div>
                  <div style={{
                    fontFamily: 'Matrix, monospace',
                    fontSize: '1.1rem',
                    color: '#b3ffb3',
                    marginBottom: '2.2rem',
                    textAlign: 'left',
                  }}>
                    <b>C2C</b> is more than a project name—it's a philosophy: <b>Cube to Cube</b>, from one idea to another, from <b>Concept to Creation</b>. This theme runs throughout our work, inspiring every step of our interaction design journey.
                  </div>
                  {/* Retro Particle BG for C2C */}
                  <C2CParticleBG />
                  {/* GSAP animated intro */}
                  <AnimatedC2CIntro />
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onEditClosemd17}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Section>

          <Section>
            <ProjectPanel
              title="Progress Bar"
              hoverTitle="Progress Bar"
              description="An experiment on how people perceive segmented continuous progress bars. Exploring visual feedback patterns and user experience through dynamic animations in an music player android client. 🧪"
              gradientColors="radial-gradient(circle at center, rgba(20, 20, 20, 0.9) 0%, rgba(0, 0, 0, 0.98) 100%)"
              hoverGradientColors="radial-gradient(circle at center, rgba(40, 40, 40, 0.9) 0%, rgba(10, 10, 10, 0.98) 100%)"
              accentColor="#89EF8C"
              customContent={<AnimatedProgressBar />}
            />
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
  const dividerLineRef = useRef(null)
  const characters = "DESIGN".split("")
  const { colorMode } = useColorMode()

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
      
      if (bigTextRef.current && dividerLineRef.current) {
        const opacity = Math.max(0, 1 - (scrollPosition - fadeStart) / (fadeEnd - fadeStart))
        gsap.to([bigTextRef.current, dividerLineRef.current], {
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
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Tiny5&display=swap" rel="stylesheet" />
      </Head>
      <Layout title="Works" mt={10} overflowX="hidden">
        <Box w="100%" position="relative">
          <BigText ref={bigTextRef} colorMode={colorMode}>
            {characters.map((char, index) => (
              <Character key={index}>{char}</Character>
            ))}
          </BigText>
          <DividerLine ref={dividerLineRef} />
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
                        border='1px'
                        borderColor='#89EF8C'
                        color='#89EF8C'
                        px={6}
                        py={10}
                        fontSize="lg"
                        fontWeight="medium"
                        letterSpacing="wider"
                        height="90px"
                        leftIcon={<ChevronLeftIcon />}
                        _hover={{
                          bg: '#89EF8C',
                          color: '#0a192f',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 3px 10px rgba(137, 239, 140, 0.3)'
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

// Add this component at the end of the file
function AnimatedC2CIntro() {
  const introRef = useRef(null)
  const overviewRef = useRef(null)
  const namesRef = useRef([])

  useEffect(() => {
    if (introRef.current) {
      gsap.fromTo(introRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
    }
    if (overviewRef.current) {
      gsap.fromTo(overviewRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, delay: 1.1, ease: 'power3.out' })
    }
    namesRef.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, delay: 1.7 + i * 0.2, ease: 'power3.out' })
      }
    })
  }, [])

  return (
    <div>
      <div
        ref={introRef}
        style={{
          fontFamily: 'Matrix, monospace',
          fontSize: '2.2rem',
          color: '#89EF8C',
          textAlign: 'left',
          marginBottom: '2.5rem',
          letterSpacing: '0.04em',
        }}
      >
        Concept to Creation<br />
        <span style={{ fontSize: '1.1rem', color: '#b3ffb3', fontWeight: 400 }}>
          A journey in interaction design
        </span>
      </div>
      <div style={{ height: '2.5rem' }} /> {/* gap */}
      <div
        ref={overviewRef}
        style={{
          fontFamily: 'Matrix, monospace',
          fontSize: '1.3rem',
          color: '#fff',
          textAlign: 'left',
          marginBottom: '2.2rem',
          letterSpacing: '0.02em',
        }}
      >
        <b>Overview:</b> <br />
        This project explores the process of interaction design, from initial concept to working prototype, through collaborative teamwork and creative problem-solving.
      </div>
      <div style={{ height: '1.5rem' }} />
      <div style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.7rem',
        fontFamily: 'Matrix, monospace', fontSize: '1.1rem', color: '#89EF8C',
      }}>
        <b style={{ marginRight: '0.7rem' }}>Team:</b>
        <a ref={el => namesRef.current[0] = el} href="https://www.behance.net/mukil" target="_blank" rel="noopener noreferrer" style={{ color: '#89EF8C', textDecoration: 'underline', fontWeight: 700 }}>MUKIL</a>
        <span style={{ margin: '0 0.5rem' }}>·</span>
        <a ref={el => namesRef.current[1] = el} href="https://www.behance.net/prajaktahardikar" target="_blank" rel="noopener noreferrer" style={{ color: '#89EF8C', textDecoration: 'underline', fontWeight: 700 }}>PRAJAKTA</a>
        <span style={{ margin: '0 0.5rem' }}>·</span>
        <a ref={el => namesRef.current[2] = el} href="https://www.behance.net/anoushkashome" target="_blank" rel="noopener noreferrer" style={{ color: '#89EF8C', textDecoration: 'underline', fontWeight: 700 }}>ANOUSHKA</a>
        <span style={{ margin: '0 0.5rem' }}>·</span>
        <a ref={el => namesRef.current[3] = el} href="https://www.behance.net/samikshajain" target="_blank" rel="noopener noreferrer" style={{ color: '#89EF8C', textDecoration: 'underline', fontWeight: 700 }}>SAMIKSHA</a>
      </div>
    </div>
  )
}

// Retro particle background for C2C modal
function C2CParticleBG() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let dpr = window.devicePixelRatio || 1
    let width = window.innerWidth
    let height = window.innerHeight
    function setCanvasSize() {
      dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }
    setCanvasSize()
    // Retro pixel particles
    const PARTICLE_COUNT = 60
    const particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 2,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.5 ? '#89EF8C' : '#b3ffb3',
      alpha: Math.random() * 0.5 + 0.5,
    }))
    let animId
    function animate() {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        // Move
        p.x += p.speedX
        p.y += p.speedY
        // Wrap
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0
        // Draw pixel/retro style
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.shadowColor = p.color
        ctx.shadowBlur = 8
        ctx.fillStyle = p.color
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size)
        ctx.restore()
      }
      animId = requestAnimationFrame(animate)
    }
    animate()
    function handleResize() {
      setCanvasSize()
    }
    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.22,
      }}
    />
  )
}

// Add this component at the end of the file:
function DesignSystemPanelGridLines() {
  // Repeated construction pattern: at each grid intersection, draw cross and diagonals
  const svgW = 320
  const svgH = 180
  const gridX = 6 // number of vertical grid lines
  const gridY = 4 // number of horizontal grid lines
  const diagAngles = [0, 45, 90, 135] // degrees for cross and diagonals
  // Calculate grid positions
  const xs = Array.from({length: gridX}, (_, i) => i * (svgW/(gridX-1)))
  const ys = Array.from({length: gridY}, (_, i) => i * (svgH/(gridY-1)))
  // For each intersection, draw cross and diagonals
  const guides = []
  xs.forEach((x, xi) => {
    ys.forEach((y, yi) => {
      diagAngles.forEach((deg, ) => {
        const rad = deg * Math.PI / 180
        const len = 32 // length of each guide line
        const dx = Math.cos(rad) * len/2
        const dy = Math.sin(rad) * len/2
        guides.push({
          x1: x - dx, y1: y - dy, x2: x + dx, y2: y + dy,
          center: xi === Math.floor(gridX/2) && yi === Math.floor(gridY/2)
        })
      })
    })
  })
  // Center intersection for highlight
  const cx = xs[Math.floor(gridX/2)]
  const cy = ys[Math.floor(gridY/2)]
  return (
    <Box position="absolute" top={0} left={0} w="100%" h="100%" zIndex={1} pointerEvents="none">
      <svg width="100%" height="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {/* Repeated construction guides at each grid intersection */}
        {guides.map((l, i) => (
          <line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="#89EF8C"
            strokeWidth={l.center ? 1.5 : 0.7}
            opacity={l.center ? 0.35 : 0.18}
          />
        ))}
        {/* Center intersection circle */}
        <circle
          cx={cx}
          cy={cy}
          r={10}
          stroke="#89EF8C"
          strokeWidth={1.2}
          fill="none"
          opacity={0.25}
        />
        <circle
          cx={cx}
          cy={cy}
          r={3}
          fill="#89EF8C"
          opacity={0.5}
        />
      </svg>
    </Box>
  )
}

export {
  DesignSystemPanelGridLines
}

function GlowingRollingLandAnimation() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let dpr = window.devicePixelRatio || 1;
    let width = 400, height = 400;
    function setCanvasSize() {
      dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    setCanvasSize();
    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, width, height);
      // Draw glowing horizon
      const horizonY = height * 0.68;
      const grad = ctx.createLinearGradient(0, horizonY-40, 0, horizonY+60);
      grad.addColorStop(0, '#a259ff');
      grad.addColorStop(0.2, '#00aaff');
      grad.addColorStop(0.5, '#181c3a');
      grad.addColorStop(1, '#181c3a');
      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      // Rolling land (undulating sine wave, animated)
      for (let x = 0; x <= width; x += 2) {
        const y = horizonY + Math.sin((x/width)*Math.PI*2*2 + t*0.8) * 18
          + Math.sin((x/width)*Math.PI*4 + t*1.7) * 8
          + Math.cos((x/width)*Math.PI*1.5 - t*1.2) * 10;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.shadowColor = '#a259ff';
      ctx.shadowBlur = 32;
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
      // Horizon glow
      ctx.save();
      const glowGrad = ctx.createRadialGradient(width/2, horizonY-18, 12, width/2, horizonY-18, width*0.7);
      glowGrad.addColorStop(0, 'rgba(137,239,140,0.18)');
      glowGrad.addColorStop(0.2, 'rgba(0,170,255,0.13)');
      glowGrad.addColorStop(0.5, 'rgba(162,89,255,0.09)');
      glowGrad.addColorStop(1, 'rgba(24,28,58,0.01)');
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.arc(width/2, horizonY-18, width*0.7, 0, Math.PI*2);
      ctx.fillStyle = glowGrad;
      ctx.fill();
      ctx.restore();
      // Rolling land lines for parallax effect
      for (let l = 0; l < 3; l++) {
        ctx.save();
        ctx.globalAlpha = 0.18 + l*0.09;
        ctx.beginPath();
        ctx.moveTo(0, horizonY + 18 + l*18);
        for (let x = 0; x <= width; x += 2) {
          const y = horizonY + 18 + l*18
            + Math.sin((x/width)*Math.PI*2*2 + t*0.8 + l*0.5) * (12-l*2)
            + Math.cos((x/width)*Math.PI*1.5 - t*1.2 - l*0.7) * (8-l*2);
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = l === 0 ? '#00aaff' : l === 1 ? '#a259ff' : '#89EF8C';
        ctx.lineWidth = 2.2 - l*0.5;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 12 + l*6;
        ctx.stroke();
        ctx.restore();
      }
      t += 0.012;
      requestAnimationFrame(draw);
    }
    let animId = requestAnimationFrame(draw);
    window.addEventListener('resize', setCanvasSize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);
  return (
    <Box w="100%" h="100%" position="absolute" top={0} left={0} zIndex={1} pointerEvents="none">
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block', borderRadius: 32 }}
      />
    </Box>
  );
}

// Animated Progress Bar Component
const AnimatedProgressBar = () => {
  const [progress1, setProgress1] = useState(0)
  const [progress2, setProgress2] = useState(0)
  const [progress3, setProgress3] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress1(prev => {
        const newProgress = prev + Math.random() * 8
        return newProgress > 100 ? 0 : newProgress
      })
      setProgress2(prev => {
        const newProgress = prev + Math.random() * 12
        return newProgress > 100 ? 0 : newProgress
      })
      setProgress3(prev => {
        const newProgress = prev + Math.random() * 6
        return newProgress > 100 ? 0 : newProgress
      })
    }, 800)

    return () => clearInterval(interval)
  }, [])

  // Segmented Progress Bar Component
  const SegmentedProgressBar = ({ value, segments = 10, color = "#89EF8C" }) => {
    const filledSegments = Math.floor((value / 100) * segments)
    
    return (
      <Box display="flex" gap="2px" width="100%">
        {Array.from({ length: segments }, (_, i) => (
          <Box
            key={i}
            flex="1"
            height="20px"
            borderRadius="sm"
            bg={i < filledSegments ? color : "rgba(255,255,255,0.1)"}
            boxShadow={i < filledSegments ? `0 0 8px ${color}40` : "none"}
            transition="all 0.3s ease"
          />
        ))}
      </Box>
    )
  }

  return (
    <Box position="relative" width="100%" height="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={6} bg="rgba(0,0,0,0.3)">
      {/* Progress Bar 1 - Main Bar */}
      <Box width="85%" mb={6}>
        <Progress 
          value={progress1} 
          size="lg" 
          borderRadius="full"
          bg="rgba(255,255,255,0.1)"
          sx={{
            '& > div': {
              background: 'linear-gradient(90deg, #89EF8C 0%, #4CAF50 50%, #2E7D32 100%)',
              boxShadow: '0 0 20px rgba(137, 239, 140, 0.6)',
              borderRadius: 'full'
            }
          }}
        />
      </Box>
      
      {/* Progress Bar 2 - Segmented Bar */}
      <Box width="85%" mb={6}>
        <SegmentedProgressBar value={progress2} segments={8} color="#4FC3F7" />
      </Box>
      
      {/* Progress Bar 3 - Thin Bar */}
      <Box width="85%" mb={6}>
        <Progress 
          value={progress3} 
          size="sm" 
          borderRadius="full"
          bg="rgba(255,255,255,0.1)"
          sx={{
            '& > div': {
              background: 'linear-gradient(90deg, #9C27B0 0%, #7B1FA2 50%, #4A148C 100%)',
              boxShadow: '0 0 10px rgba(156, 39, 176, 0.5)',
              borderRadius: 'full'
            }
          }}
        />
      </Box>
      
      {/* Circular Progress Indicator */}
      <Box position="absolute" top="5%" right="5%" width="50px" height="50px">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none"/>
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            stroke="#89EF8C" 
            strokeWidth="3" 
            fill="none"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress1 / 100)}`}
            transform="rotate(-90 50 50)"
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
          />
          <circle cx="50" cy="50" r="2" fill="#89EF8C"/>
        </svg>
      </Box>
      
      {/* Status Indicators */}
      <Box position="absolute" bottom="8%" left="10%" display="flex" gap={2}>
        <Box w="8px" h="8px" borderRadius="full" bg="#89EF8C" boxShadow="0 0 10px rgba(137, 239, 140, 0.7)"/>
        <Box w="8px" h="8px" borderRadius="full" bg="#4FC3F7" boxShadow="0 0 10px rgba(79, 195, 247, 0.7)"/>
        <Box w="8px" h="8px" borderRadius="full" bg="#9C27B0" boxShadow="0 0 10px rgba(156, 39, 176, 0.7)"/>
      </Box>
    </Box>
  )
}
