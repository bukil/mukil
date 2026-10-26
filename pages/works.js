/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import {
  Heading,
  SimpleGrid,
  Image,
  Text,
  Button,
  useDisclosure,
  Box,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronDownIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import styled from '@emotion/styled'
import NextLink from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import React from 'react'
import LhcRingGraphic from '../components/LhcRingGraphic'

const HairlineExploded = dynamic(
  () => import('@lucasmarkes/hairline/react').then((m) => m.Exploded),
  { ssr: false }
)

const HairlinePlot = dynamic(
  () => import('@lucasmarkes/hairline/react').then((m) => m.Plot),
  { ssr: false }
)

// Styled components
const Trans = styled.span`
  Button {
    position: relative;
    overflow: hidden;
    background: transparent;
    border: 1px solid #1A1A1A;
    color: #1A1A1A;
    transition: all 0.3s ease;
    z-index: 1;
    border-radius: 40px;
    height: 64px;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      background: #1A1A1A;
      transition: all 0.3s ease;
      z-index: -1;
    }
    &:hover {
      color: #F4F4F0;
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
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

// Accessible, bright-mode project panel with fixed dimensions matching Works
const ProjectPanel = ({
  title,
  hoverTitle,
  description,
  imageSrc,
  imageAlt,
  accentColor,
  onClick,
  customContent,
  sx
}) => {
  return (
    <Box
      position="relative"
      borderWidth="1.5px"
      borderColor="rgba(0, 0, 0, 0.12)"
      borderRadius={0}
      overflow="hidden"
      boxShadow="none"
      role={onClick ? 'button' : undefined}
      aria-haspopup={onClick ? 'dialog' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
      bg="rgba(255, 255, 255, 0.85)"
      backdropFilter="blur(8px)"
      transition="border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease"
      _hover={{
        bg: '#ffffff',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
        borderColor: 'rgba(0, 0, 0, 0.3)'
      }}
      _focusVisible={{
        outline: '2px solid #111827',
        outlineOffset: '3px'
      }}
      onClick={onClick}
      cursor="pointer"
      width="100%"
      maxW="100%"
      aspectRatio="1 / 1"
      sx={{
        ...sx,
        '& *': {
          pointerEvents: 'none'
        },
        '& [data-hairline], & [data-hairline] *': {
          pointerEvents: 'auto'
        }
      }}
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="76px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* Decorative large hover title - hidden from screen readers to prevent label-in-name conflict */}
        <Text
          aria-hidden="true"
          position="absolute"
          top={hoverTitle === 'Data Visualisation' ? '3%' : '20%'}
          right={hoverTitle === 'Data Visualisation' ? '5%' : undefined}
          left={hoverTitle === 'Data Visualisation' ? undefined : '50%'}
          transform={hoverTitle === 'Data Visualisation' ? 'none' : 'translate(-50%, -50%)'}
          textAlign={hoverTitle === 'Data Visualisation' ? 'right' : 'center'}
          fontSize="7xl"
          fontWeight="900"
          color="#111827"
          opacity="0"
          transition="top 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          whiteSpace="nowrap"
          _groupHover={{
            opacity: 0.75,
            top: hoverTitle === 'Data Visualisation' ? '3%' : '35%',
            transform: hoverTitle === 'Data Visualisation' ? 'none' : 'translate(-50%, -50%)',
            transition: 'top 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
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
            alt={imageAlt || ''}
            width="70%"
            height="70%"
            objectFit="contain"
            transition="transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease"
            _groupHover={{
              filter: 'brightness(1.04)',
              transform: 'scale(1.06)'
            }}
            position="relative"
            zIndex="1"
            bg="transparent"
          />
        )}
      </Box>

      {/* Bottom metadata drawer with accessible high-contrast text */}
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        bg="rgba(255, 255, 255, 0.95)"
        backdropFilter="blur(12px)"
        pt={2}
        pb={2}
        px={4}
        color="#111827"
        zIndex={3}
        height="76px"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        borderTop="1px solid rgba(0, 0, 0, 0.08)"
      >
        {title && (
          <Box mb={0}>
            <Heading
              as="h2"
              fontSize="xs"
              fontFamily="'Michroma', monospace"
              fontWeight="600"
              letterSpacing="0.12em"
              lineHeight="1.1"
              textTransform="uppercase"
              color="#111827"
            >
              {title}
            </Heading>
          </Box>
        )}
        <Box
          w="100%"
          h="1px"
          bg={accentColor || 'rgba(0, 0, 0, 0.15)'}
          mt={1.5}
          mb={1.5}
          aria-hidden="true"
        />
        <Box flex="0 0 auto">
          <Text
            fontSize="xs"
            fontFamily="'Encode Sans Expanded', sans-serif"
            fontWeight="400"
            letterSpacing="0.5px"
            color="#334155"
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
          bottom="76px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={1}
          pointerEvents="none"
          sx={{
            '& img': {
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform'
            },
            '& canvas': {
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform'
            },
            '& svg': {
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform'
            }
          }}
          _groupHover={{
            '& img': {
              transform: 'scale(1.06)'
            },
            '& canvas': {
              transform: 'scale(1.06)'
            },
            '& svg': {
              transform: 'scale(1.06)'
            }
          }}
        >
          {customContent}
        </Box>
      )}
    </Box>
  )
}

// Hairline interactive Plot figure for Data Visualisation
function DataVizPlotGraphic() {
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
      <Box
        width="460px"
        maxW="96%"
        position="relative"
        transform="translateY(-10px) scale(1.4)"
        transformOrigin="center center"
      >
        <HairlinePlot play intensity={0.7} />
      </Box>
    </Box>
  )
}

// Hairline interactive Exploded figure for Microinteraction
function MicrointeractionGraphic() {
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
      <Box
        width="460px"
        maxW="96%"
        position="relative"
        transform="translate(32px, -102px) scale(1.4)"
        transformOrigin="center center"
      >
        <HairlineExploded play intensity={0.7} />
      </Box>
    </Box>
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
    const PARTICLE_COUNT = 60
    const particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 2,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.3,
    }))
    let animId
    function draw() {
      ctx.clearRect(0, 0, width, height)
      for (let p of particles) {
        ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha})`
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size)
        p.x += p.speedX
        p.y += p.speedY
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener('resize', setCanvasSize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  )
}

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
    <div style={{ width: '80%', margin: '0 auto' }}>
      <div
        ref={introRef}
        style={{
          fontFamily: 'Matrix, monospace',
          fontSize: '2.2rem',
          color: '#059669',
          textAlign: 'left',
          marginBottom: '2.5rem',
          letterSpacing: '0.04em',
        }}
      />
      <div style={{ height: '2.5rem' }} />
      <div
        ref={overviewRef}
        style={{
          fontFamily: 'Matrix, monospace',
          fontSize: '1.3rem',
          color: '#111827',
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
        fontFamily: 'Matrix, monospace', fontSize: '1.1rem', color: '#059669',
      }}>
        <b style={{ marginRight: '0.7rem', color: '#111827' }}>Team:</b>
        <a ref={el => { namesRef.current[0] = el }} href="https://www.behance.net/mukil" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'underline', fontWeight: 700 }}>MUKIL</a>
        <span style={{ margin: '0 0.5rem', color: '#64748b' }}>·</span>
        <a ref={el => { namesRef.current[1] = el }} href="https://www.behance.net/prajaktahardikar" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'underline', fontWeight: 700 }}>PRAJAKTA</a>
        <span style={{ margin: '0 0.5rem', color: '#64748b' }}>·</span>
        <a ref={el => { namesRef.current[2] = el }} href="https://www.anoushkashome.design" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'underline', fontWeight: 700 }}>ANOUSHKA</a>
        <span style={{ margin: '0 0.5rem', color: '#64748b' }}>·</span>
        <a ref={el => { namesRef.current[3] = el }} href="https://www.behance.net/samikshajain" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'underline', fontWeight: 700 }}>SAMIKSHA</a>
      </div>
    </div>
  )
}

// Playground projects rendered on the Works page
function WorksGrid() {
  const { isOpen: isC2COpen, onOpen: onC2COpen, onClose: onC2CClose } = useDisclosure()

  return (
    <Box maxW="1440px" mx="auto" px={{ base: '20px', md: '28px', lg: '32px' }} mb={{ base: 16, md: 20 }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} columnGap={{ base: 5, md: 6, lg: 8 }} rowGap={{ base: 6, md: 8, lg: 10 }}>
        {/* Panel 1: Data visualisation: LHC, Speed of Light */}
        <Section delay={0.1}>
          <Box
            as="a"
            href="https://bukil.github.io/dataviz/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}
          >
            <ProjectPanel
              title="Data visualisation:LHC, Speed of Light"
              hoverTitle="Data Visualisation"
              description="A visual exploration of particle speeds and collisions at the LHC, compared to the speed of light."
              accentColor="#232327"
              customContent={<LhcRingGraphic />}
            />
          </Box>
        </Section>

        {/* Panel 2: Data Vizualisation (MAPA) */}
        <Section delay={0.2}>
          <Box
            as="a"
            href="https://bukil.github.io/MAPA/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}
          >
            <ProjectPanel
              title="Data Vizualisation"
              hoverTitle="Data Visualisation"
              description="Exploring the Links Between Literacy, Salary & Societal Issues in India"
              accentColor="#232327"
              customContent={<DataVizPlotGraphic />}
            />
          </Box>
        </Section>

        {/* Panel 3: Microinteraction */}
        <Section delay={0.3}>
          <NextLink href="/mukilm" passHref legacyBehavior>
            <Box
              as="a"
              style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}
            >
              <ProjectPanel
                title="Microinteraction"
                hoverTitle="Microinteraction"
                description="A class assignment exploring the art of microinteractions. Small, meaningful animations and transitions that enhance user experience and bring interfaces to life. 🎨"
                accentColor="#232327"
                customContent={<MicrointeractionGraphic />}
              />
            </Box>
          </NextLink>
        </Section>

        {/* Panel 4: C2C */}
        <Section delay={0.4}>
          <ProjectPanel
            title={
              <span style={{ fontFamily: 'Michroma, monospace', letterSpacing: '0.12em', fontStyle: 'normal' }}>
                C2C
              </span>
            }
            hoverTitle={
              <span style={{ fontFamily: 'Tiny5, monospace', letterSpacing: 'normal', color: '#111827' }}>
                C2C
              </span>
            }
            description="C2C is a pair of interactive cubes that turn simple gestures into playfull digital control. Designed for effortless use, it doesn’t rely on precision, making it accessible for users with dexterity or muscular dystrophy challenges."
            imageSrc="/images/works/c2cf.png"
            imageAlt="C2C physical interaction cube controller"
            accentColor="#0d9488"
            onClick={onC2COpen}
          />

          <Modal isOpen={isC2COpen} onClose={onC2CClose} size="full">
            <ModalOverlay backdropFilter="blur(10px)" bg="rgba(0, 0, 0, 0.4)" />
            <ModalContent bg="#ffffff" color="#111827">
              <ModalHeader mt={24} style={{ fontFamily: 'Matrix, monospace', color: '#059669', fontSize: '1.8rem' }}>
                C2C
              </ModalHeader>
              <ModalCloseButton mt={24} color="#111827" aria-label="Close C2C details modal" />
              <ModalBody mt={4} style={{ fontFamily: 'Matrix, monospace' }}>
                <Box maxW="80%" mx="auto">
                  <div
                    style={{
                      fontSize: '2.5rem',
                      color: '#059669',
                      fontWeight: 900,
                      letterSpacing: '0.08em',
                      marginBottom: '0.5rem',
                      textAlign: 'left'
                    }}
                  >
                    C2C{' '}
                    <span style={{ fontSize: '1.2rem', color: '#047857', fontWeight: 500, marginLeft: 12 }}>
                      Cube to Cube
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '1.1rem',
                      color: '#334155',
                      marginBottom: '2.2rem',
                      textAlign: 'left',
                      lineHeight: 1.6
                    }}
                  >
                    C2C is a pair of tangible interfaces designed to explore how physical interaction can enrich
                    digital experiences. Created as part of an Interaction Design module at IIT Bombay, the project
                    transforms the familiar form of a cube into a dynamic digital controller. Cube combines rotary
                    encoder, tactile buttons, and OLED display powered by an RP2040 microcontroller, enabling
                    real-time feedback, file navigation, and even playful mini-interactions.
                  </div>
                </Box>

                <Box mb={4} textAlign="center" maxW="80%" mx="auto">
                  <a
                    href="https://www.2025.indiahci.org/programme_1/student-design-consortium"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="IndiaHCI 2025 Student Design Consortium finalist details (opens in a new tab)"
                  >
                    <Box position="relative" display="inline-block" mx="auto">
                      <Image
                        src="/images/hci.jpg"
                        alt="IndiaHCI 2025 - Student Design Consortium Acceptance Badge"
                        display="block"
                        mx="auto"
                        width="220px"
                        height="auto"
                        objectFit="contain"
                        loading="eager"
                        fallbackSrc="/images/logo.png"
                        style={{
                          borderRadius: '24px 8px 24px 8px',
                          border: '1px solid rgba(5, 150, 105, 0.4)',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                          backgroundColor: '#ffffff'
                        }}
                      />
                    </Box>
                  </a>
                  <div
                    style={{
                      fontFamily: 'Matrix, monospace',
                      color: '#047857',
                      fontSize: '1.1rem',
                      marginTop: '0.6rem'
                    }}
                  >
                    Accepted in IndiaHCI 2025 under <br />
                    Student Design Consortium (SDC) <br />
                    1 amongst 7 finalists for round 1
                  </div>
                </Box>

                <Box mb={6} textAlign="center">
                  <Button
                    as="a"
                    href="/C2C_Interaction%20Design_Report.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Read Full C2C Interaction Design Report PDF (opens in a new tab)"
                    variant="outline"
                    borderColor="#059669"
                    color="#059669"
                    leftIcon={<ExternalLinkIcon />}
                    _hover={{
                      bg: '#059669',
                      color: '#ffffff',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 3px 10px rgba(5, 150, 105, 0.25)'
                    }}
                  >
                    Read Full Report
                  </Button>
                </Box>

                <AnimatedC2CIntro />

                <Box mb={0}>
                  <Image
                    src="/images/ixd1.svg"
                    alt="Interaction Design process overview diagram"
                    width="80%"
                    mx="auto"
                    mb={4}
                    objectFit="contain"
                    display="block"
                  />
                  <Image
                    src="/images/ixd2.svg"
                    alt="Interaction Design hardware schematics diagram"
                    width="80%"
                    mx="auto"
                    objectFit="contain"
                    display="block"
                  />
                </Box>

                <Box mb={6}>
                  <video
                    src="/6502.mp4"
                    style={{ width: '80%', display: 'block', borderRadius: 0, margin: '0 auto' }}
                    controls
                    playsInline
                    aria-label="C2C hardware demo video"
                  />
                </Box>

                <C2CParticleBG />
              </ModalBody>
              <ModalFooter>
                <Button onClick={onC2CClose} colorScheme="teal" variant="ghost">
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Section>
      </SimpleGrid>
    </Box>
  )
}

const Works = () => {
  const bigTextRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const characters = 'DESIGN'.split('')

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
        ease: 'power4.out'
      })

      // Floating animation
      tl.to(
        chars,
        {
          y: -20,
          duration: 2,
          stagger: 0.05,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: 1
        },
        '>'
      )

      // Exit animation
      tl.to(
        chars,
        {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power4.in'
        },
        '>'
      )
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
          ease: 'none'
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
        <title>Playground - Mukil</title>
        <meta name="description" content="Mukil's creative playground and interactive projects." />
      </Head>
      <Layout title="Playground" mt={10} overflowX="hidden">
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
              animate={{ y: [-8, 8, -8], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronDownIcon boxSize={5} color="#1a202c" />
            </Box>
          </ScrollIndicator>
          <ContentWrapper>
            <Section>
              <WorksGrid />
            </Section>
            <Spacer />
            <Spacer />
            <Trans>
              <Section>
                <Box maxW="1440px" mx="auto" px={{ base: '20px', md: '28px', lg: '32px' }} display="flex" justifyContent="flex-start" mb={12}>
                  <NextLink href="/" passHref scroll={true}>
                    <Button
                      borderRadius="40px"
                      variant="outline"
                      border="1px solid"
                      borderColor="#1A1A1A"
                      color="#1A1A1A"
                      px={8}
                      py={6}
                      fontSize="14px"
                      fontFamily="'Segoe UI', 'Segoe Sans', system-ui, sans-serif"
                      fontWeight="500"
                      letterSpacing="0.08em"
                      textTransform="uppercase"
                      height="64px"
                      leftIcon={<ChevronLeftIcon />}
                      _hover={{
                        bg: '#1A1A1A',
                        color: '#F4F4F0',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
                      }}
                    >
                      GO BACK TO HOME PAGE
                    </Button>
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
