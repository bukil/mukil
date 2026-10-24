/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Heading,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VisuallyHidden
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useRef, useEffect } from 'react'
import NextLink from 'next/link'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import Layout from '../components/layouts/article'
import Section from '../components/section'

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
      transition="all 0.3s ease"
      _hover={{
        bg: '#ffffff',
        transform: 'translateY(-5px)',
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
            width="50%"
            height="50%"
            objectFit="contain"
            transition="all 0.3s ease"
            _groupHover={{
              filter: 'brightness(1.04)',
              transform: 'scale(1.05)'
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
          bottom="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={1}
          pointerEvents="none"
          _groupHover={{
            '& img': {
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

// Minimal tactile microinteraction graphic tailored for white theme
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
      pb="72px"
      pointerEvents="none"
    >
      <svg
        width="260"
        height="180"
        viewBox="0 0 260 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: '75%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Tactile slider microinteraction preview graphic"
      >
        <defs>
          <linearGradient id="pgSliderGradLight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>

        {/* Vertical track background */}
        <line x1="100" y1="36" x2="100" y2="144" stroke="rgba(0, 0, 0, 0.1)" strokeWidth="3" strokeLinecap="round" />
        
        {/* Active slider segment */}
        <line x1="100" y1="88" x2="100" y2="144" stroke="url(#pgSliderGradLight)" strokeWidth="3" strokeLinecap="round" />

        {/* Endpoints +/- with accessible high-contrast color */}
        <text x="100" y="24" fontFamily="'Encode Sans Expanded', sans-serif" fontSize="13" fontWeight="600" fill="#334155" textAnchor="middle">+</text>
        <text x="100" y="162" fontFamily="'Encode Sans Expanded', sans-serif" fontSize="15" fontWeight="600" fill="#334155" textAnchor="middle">−</text>

        {/* Precision tick marks */}
        <g stroke="#64748b" strokeLinecap="round">
          <line x1="112" y1="44" x2="117" y2="44" strokeWidth="1" opacity="0.6" />
          <line x1="112" y1="66" x2="119" y2="66" strokeWidth="1" opacity="0.7" />
          <line x1="112" y1="88" x2="124" y2="88" strokeWidth="1.5" stroke="#7c3aed" opacity="0.9" />
          <line x1="112" y1="110" x2="119" y2="110" strokeWidth="1" opacity="0.7" />
          <line x1="112" y1="132" x2="117" y2="132" strokeWidth="1" opacity="0.6" />
        </g>

        {/* Tactile Thumb node at y=88 */}
        <circle cx="100" cy="88" r="9" stroke="#a855f7" strokeWidth="1" opacity="0.3" />
        <circle cx="100" cy="88" r="4.5" fill="#ffffff" stroke="#7c3aed" strokeWidth="2" />

        {/* Minimal haptic ripple arcs */}
        <path d="M 129 82 C 134 85 134 91 129 94" stroke="#a855f7" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.8" />
        <path d="M 134 78 C 141 83 141 93 134 98" stroke="#a855f7" strokeWidth="1" strokeDasharray="1.5 2" strokeLinecap="round" fill="none" opacity="0.5" />

        {/* Value indicator */}
        <text
          x="146"
          y="93"
          fontFamily="'Michroma', monospace"
          fontSize="14"
          fontWeight="700"
          fill="#111827"
          letterSpacing="0.04em"
        >
          2.4×
        </text>
      </svg>
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
        <a ref={el => namesRef.current[0] = el} href="https://www.behance.net/mukil" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'underline', fontWeight: 700 }}>MUKIL</a>
        <span style={{ margin: '0 0.5rem', color: '#64748b' }}>·</span>
        <a ref={el => namesRef.current[1] = el} href="https://www.behance.net/prajaktahardikar" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'underline', fontWeight: 700 }}>PRAJAKTA</a>
        <span style={{ margin: '0 0.5rem', color: '#64748b' }}>·</span>
        <a ref={el => namesRef.current[2] = el} href="https://www.anoushkashome.design" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'underline', fontWeight: 700 }}>ANOUSHKA</a>
        <span style={{ margin: '0 0.5rem', color: '#64748b' }}>·</span>
        <a ref={el => namesRef.current[3] = el} href="https://www.behance.net/samikshajain" target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'underline', fontWeight: 700 }}>SAMIKSHA</a>
      </div>
    </div>
  )
}

const Playground = () => {
  const { isOpen: isC2COpen, onOpen: onC2COpen, onClose: onC2CClose } = useDisclosure()

  return (
    <Layout title="Playground">
      <Head>
        <title>Playground - Mukil</title>
        <meta name="description" content="Mukil's creative playground. Interactive experiments and creative projects." />
      </Head>

      {/* Semantic H1 for assistive technology */}
      <VisuallyHidden>
        <Heading as="h1">Playground</Heading>
      </VisuallyHidden>

      <Box bg="#ffffff" minHeight="100vh" color="#111827" position="relative" overflowX="hidden">
        {/* Overlay grid content - Responsive 2-column grid with fixed card dimensions */}
        <Box
          as="main"
          position="relative"
          zIndex={1}
          maxW="1148px"
          mx="auto"
          pt={5}
          pb={20}
          px={{ base: 4, sm: 6 }}
        >
          <SimpleGrid columns={{ base: 1, md: 2 }} columnGap={5} rowGap={5}>
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
                  imageSrc="/dataviz.svg"
                  imageAlt="Data Visualisation LHC collider illustration"
                  accentColor="#2563eb"
                  sx={{ position: 'relative', overflow: 'hidden' }}
                  customContent={
                    <Image
                      src="/dataviz.svg"
                      alt="Data Visualisation LHC collider illustration"
                      position="absolute"
                      top="-6%"
                      left={0}
                      width="100%"
                      height="100%"
                      objectFit="cover"
                      zIndex={0}
                    />
                  }
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
                  accentColor="#0284c7"
                  sx={{ position: 'relative', overflow: 'hidden' }}
                  customContent={
                    <Box position="absolute" top="-6%" left={0} width="100%" height="100%" zIndex={0}>
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        role="img"
                        aria-label="Inline comparative data chart"
                      >
                        <style>{`
                          .viz-grid-light { stroke: rgba(0,0,0,0.06); stroke-width: 0.18 }
                          .thread-light { fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 0.8; opacity: 0.95; vector-effect: non-scaling-stroke }
                          .tl1 { stroke: #1d4ed8 }
                          .tl2 { stroke: #047857 }
                          .tl3 { stroke: #be185d }
                        `}</style>
                        <g className="viz-grid-light">
                          {Array.from({ length: 10 }).map((_, i) => (
                            <line key={`v${i}`} x1={(i + 1) * 9} y1="8" x2={(i + 1) * 9} y2="92" />
                          ))}
                          {Array.from({ length: 6 }).map((_, i) => (
                            <line key={`h${i}`} x1="6" y1={92 - i * 14} x2="94" y2={92 - i * 14} />
                          ))}
                        </g>
                        <path
                          d="M6,80 L14,74 L22,70 L30,66 L38,58 L46,60 L54,52 L62,48 L70,40 L78,46 L86,38 L94,34 L94,92 L6,92 Z"
                          fill="rgba(29, 78, 216, 0.04)"
                        />
                        <path className="thread-light tl1" d="M6,80 L14,74 L22,70 L30,66 L38,58 L46,60 L54,52 L62,48 L70,40 L78,46 L86,38 L94,34" />
                        <path className="thread-light tl2" d="M6,81.6 L14,75.6 L22,71.6 L30,67.6 L38,59.6 L46,61.6 L54,53.6 L62,49.6 L70,41.6 L78,47.6 L86,39.6 L94,35.6" />
                        <path className="thread-light tl3" d="M6,78.4 L14,72.4 L22,68.4 L30,64.4 L38,56.4 L46,58.4 L54,50.4 L62,46.4 L70,38.4 L78,44.4 L86,36.4 L94,32.4" />
                        <g fill="#111827" opacity="0.65">
                          {[
                            { x: 6, y: 80 },
                            { x: 22, y: 70 },
                            { x: 38, y: 58 },
                            { x: 54, y: 52 },
                            { x: 70, y: 40 },
                            { x: 86, y: 38 }
                          ].map((p, i) => (
                            <circle key={i} cx={p.x} cy={p.y} r="0.9" />
                          ))}
                        </g>
                      </svg>
                    </Box>
                  }
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
                    accentColor="#7c3aed"
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
      </Box>
    </Layout>
  )
}

export default Playground
