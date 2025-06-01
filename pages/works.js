/* eslint-disable react/no-unescaped-entities */
import { Heading, SimpleGrid, Image, Text, Button, useDisclosure, Box, Spacer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useColorMode } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import styled from '@emotion/styled'
import NextLink from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import KodeboardModal from '../components/projects/Kodeboard'
import Head from 'next/head'
import MicrointeractionModal from '../components/projects/MI'

// Styled components
const Trans = styled.span`
  Button {
    transition: 800ms ease;
    transform: rotate(0deg);
  }

  &:hover Button {
    transform: translate(-30px, 0px);
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
  description, 
  imageSrc, 
  imageAlt, 
  gradientColors, 
  hoverGradientColors, 
  accentColor, 
  onClick,
  hasSnow = false,
  customContent,
  sx // <-- add sx prop
}) => {
  return (
    <Box 
      position="relative"
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      boxShadow="md"
      role="group"
      bg={gradientColors}
      transition="all 0.3s ease"
      _hover={{
        bg: hoverGradientColors
      }}
      onClick={onClick}
      cursor="pointer"
      height="400px"
      width="100%"
      sx={sx} // <-- apply sx here
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
          fontSize="8xl"
          fontWeight="900"
          color="white"
          opacity="0"
          transition="all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          _groupHover={{ 
            opacity: 0.4,
            top: "35%",
            transform: "translate(-50%, -50%)"
          }}
          zIndex="0"
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
        zIndex="2"
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
          zIndex="3"
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
  const { isOpen: isEditOpenmd14, onOpen: onEditOpenmd14, onClose: onEditClosemd14 } = useDisclosure()
  const { isOpen: isEditOpenmd13, onOpen: onEditOpenmd13, onClose: onEditClosemd13 } = useDisclosure()
  const { isOpen: isEditOpenmd15, onOpen: onEditOpenmd15, onClose: onEditClosemd15 } = useDisclosure()
  const { isOpen: isEditOpenmd17, onOpen: onEditOpenmd17, onClose: onEditClosemd17 } = useDisclosure()

  return (
    <>
      <Box p='1px' color='white' mt='4' rounded='md' shadow='md'>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} columnGap={10} rowGap={4} mt={10} px={{ base: 4, md: 8 }}>
          <Section>
            <ProjectPanel
              title="Kode/Board"
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
            <ProjectPanel
              title="Design Evaluation ChatGPT"
              description="Leveraging ChatGPT to evaluate and enhance design concepts. Get instant feedback, suggestions, and improvements for your creative work through AI-powered analysis. 🤖"
              imageSrc="/mukil/degpt2.png"
              imageAlt="Design Evaluation ChatGPT"
              gradientColors="radial-gradient(circle at center, rgba(0, 100, 255, 0.7) 0%, rgba(0, 30, 60, 0.98) 100%)"
              hoverGradientColors="radial-gradient(circle at center, rgba(0, 150, 255, 0.8) 0%, rgba(0, 40, 80, 0.98) 100%)"
              accentColor="blue.400"
              onClick={onEditOpenmd14}
            />
            <Modal isOpen={isEditOpenmd14} onClose={onEditClosemd14} size="full">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader as="h1" mt={32}>Design Evaluation</ModalHeader>
                <ModalCloseButton mt={32} />
                <ModalBody mt={4}>
                  {/* Add your modal content here */}
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onEditClosemd14}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Section>

          <Section>
            <ProjectPanel
              title="Jokif-AI"
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
            <ProjectPanel
              title="Microinteraction"
              description="A class assignment exploring the art of microinteractions. Small, meaningful animations and transitions that enhance user experience and bring interfaces to life. 🎨"
              imageSrc="/mukil/degpt2.png"
              imageAlt="Microinteraction Class Assignment"
              gradientColors="radial-gradient(circle at center, rgba(255, 100, 0, 0.7) 0%, rgba(60, 30, 0, 0.98) 100%)"
              hoverGradientColors="radial-gradient(circle at center, rgba(255, 150, 0, 0.8) 0%, rgba(80, 40, 0, 0.98) 100%)"
              accentColor="orange.400"
              onClick={onEditOpenmd15}
            />
            <MicrointeractionModal isOpen={isEditOpenmd15} onClose={onEditClosemd15} />
          </Section>
{/* design system===================================================================================== */}
          <Section>
            <NextLink href="/DS" passHref legacyBehavior>
              <Box as="a" style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}>
                <ProjectPanel
                  title={<span style={{ fontFamily: 'Michroma, monospace', letterSpacing: '0.12em', color: '#89EF8C' }}>DESIGN SYSTEM</span>}
                  description={<span style={{ color: '#fff' }}>A living system of icons, typography, lines, and motion. Explore the DNA of my design system—where every element transforms and flows in harmony. ✨</span>}
                  accentColor="#89EF8C"
                  hasSnow={false}
                  customContent={
                    <>
                      <DesignSystemPanelElements colorPalette={["#89EF8C", "#00aaff", "#222", "#fff"]} />
                      <DesignSystemPanelGridLines colorPalette={["#89EF8C", "#00aaff", "#222", "#fff"]} />
                      <DesignSystemPanelGeometric colorPalette={["#89EF8C", "#00aaff", "#222", "#fff"]} />
                    </>
                  }
                  sx={{
                    background: 'linear-gradient(135deg, #101c2c 0%, #162447 100%)',
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
              title={<span style={{ fontFamily: 'Tiny5, monospace' }}>C2C</span>}
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
                  {/* Matrix font-face */}
                  <style jsx global>{`
                    @font-face {
                      font-family: 'Matrix';
                      src: url('/fonts/matrix.ttf') format('truetype');
                      font-display: swap;
                    }
                  `}</style>
                  {/* GSAP animated intro */}
                  <AnimatedC2CIntro />
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onEditClosemd17}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
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
      <Layout title="Works" mt={10} maxW="100vw" overflowX="hidden">
        <Box w="100vw" position="relative" left="50%" right="50%" marginLeft="-50vw" marginRight="-50vw">
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
                <Box align="center" my={4}>
                  <NextLink href="/" passHref scroll={true}>
                    <Button borderRadius='20px' variant='outline' 
                    border='1px' 
                    borderColor='black.500' mt='10' leftIcon={<ChevronLeftIcon />}>
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

function DesignSystemPanelElements() {
  // Subtle animated lines and dots moving left to right
  const linesRef = useRef([])
  const dotsRef = useRef([])
  useEffect(() => {
    // Animate lines
    linesRef.current.forEach((line, i) => {
      if (line) {
        gsap.to(line, {
          x: '100vw',
          duration: 8 + i * 2,
          repeat: -1,
          ease: 'linear',
          delay: i * 1.2,
          modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % window.innerWidth)
          }
        })
      }
    })
    // Animate dots
    dotsRef.current.forEach((dot, i) => {
      if (dot) {
        gsap.to(dot, {
          x: '100vw',
          duration: 10 + i * 2,
          repeat: -1,
          ease: 'linear',
          delay: i * 1.5,
          modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % window.innerWidth)
          }
        })
      }
    })
    return () => {
      linesRef.current.forEach(line => line && gsap.killTweensOf(line))
      dotsRef.current.forEach(dot => dot && gsap.killTweensOf(dot))
    }
  }, [])
  return (
    <Box position="absolute" top={0} left={0} w="100%" h="100%" zIndex={1} pointerEvents="none">
      {/* Lines */}
      {[0,1,2].map(i => (
        <Box
          key={i}
          ref={el => linesRef.current[i] = el}
          position="absolute"
          top={`${20 + i*30}px`}
          left="-30vw"
          w="40vw"
          h="2px"
          bg={['#2c5364','#3a6b7c','#4e8a8c'][i]}
          opacity={0.13 + i*0.07}
          borderRadius="1px"
        />
      ))}
      {/* Dots */}
      {[0,1].map(i => (
        <Box
          key={i}
          ref={el => dotsRef.current[i] = el}
          position="absolute"
          top={`${60 + i*60}px`}
          left="-10vw"
          w="12px"
          h="12px"
          bg={['#3a6b7c','#4e8a8c'][i]}
          opacity={0.18}
          borderRadius="full"
        />
      ))}
    </Box>
  )
}

// Add this component at the end of the file:
function DesignSystemPanelGeometric() {
  // Animated SVG geometric shapes: hexagons, triangles, circles, lines
  const shapeRefs = useRef([])
  useEffect(() => {
    shapeRefs.current.forEach((el, i) => {
      if (el) {
        // Animate position, rotation, scale, opacity, color
        const duration = 3.5 + Math.random() * 2.5
        const delay = Math.random() * 2
        gsap.to(el, {
          x: (i % 2 === 0 ? '+=' : '-=') + (20 + Math.random() * 40),
          y: (i % 3 === 0 ? '+=' : '-=') + (10 + Math.random() * 30),
          rotation: (i % 2 === 0 ? '+=' : '-=') + (10 + Math.random() * 40),
          scale: 0.7 + Math.random() * 0.7,
          opacity: 0.13 + Math.random() * 0.22,
          filter: 'blur(2.5px)',
          duration,
          delay,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
        if (el.tagName === 'polygon' || el.tagName === 'path') {
          // Animate fill color for polygons
          gsap.to(el, {
            fill: ['#2c5364', '#3a6b7c', '#4e8a8c', '#89EF8C', '#00aaff', '#a259ff', '#2c5364'],
            duration: 8 + Math.random() * 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        } else if (el.tagName === 'circle' || el.tagName === 'rect' || el.tagName === 'line') {
          // Animate stroke color for lines/circles/rects
          gsap.to(el, {
            stroke: ['#2c5364', '#3a6b7c', '#4e8a8c', '#89EF8C', '#00aaff', '#a259ff', '#2c5364'],
            duration: 8 + Math.random() * 4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        }
      }
    })
    return () => {
      shapeRefs.current.forEach(el => el && gsap.killTweensOf(el))
    }
  }, [])
  return (
    <Box position="absolute" top={0} left={0} w="100%" h="100%" zIndex={2} pointerEvents="none">
      <svg width="100%" height="100%" viewBox="0 0 320 180" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {/* Hexagons */}
        <polygon ref={el => shapeRefs.current[0] = el} points="60,30 70,45 60,60 40,60 30,45 40,30" fill="#2c5364" opacity="0.18" />
        <polygon ref={el => shapeRefs.current[1] = el} points="160,80 170,95 160,110 140,110 130,95 140,80" fill="#3a6b7c" opacity="0.16" />
        {/* Triangles */}
        <polygon ref={el => shapeRefs.current[2] = el} points="220,40 240,80 200,80" fill="#4e8a8c" opacity="0.15" />
        <polygon ref={el => shapeRefs.current[3] = el} points="80,120 100,160 60,160" fill="#a259ff" opacity="0.13" />
        {/* Circles */}
        <circle ref={el => shapeRefs.current[4] = el} cx="260" cy="60" r="18" stroke="#89EF8C" strokeWidth="4" fill="none" opacity="0.16" />
        <circle ref={el => shapeRefs.current[5] = el} cx="200" cy="140" r="12" stroke="#00aaff" strokeWidth="3" fill="none" opacity="0.14" />
        {/* Lines */}
        <line ref={el => shapeRefs.current[6] = el} x1="40" y1="100" x2="120" y2="100" stroke="#4e8a8c" strokeWidth="3" opacity="0.13" />
        <line ref={el => shapeRefs.current[7] = el} x1="180" y1="30" x2="300" y2="30" stroke="#a259ff" strokeWidth="2" opacity="0.13" />
      </svg>
    </Box>
  )
}

// Add this component at the end of the file:
function DesignSystemPanelGridLines() {
  // Animated grid lines with parallax effect, including diagonal lines
  const hLineRefs = useRef([])
  const vLineRefs = useRef([])
  const dLineRefs = useRef([])
  useEffect(() => {
    // Parallax: horizontal lines move slower, vertical lines move faster
    hLineRefs.current.forEach((el, i) => {
      if (el) {
        gsap.to(el, {
          x: i % 2 === 0 ? '+=16' : '-=16',
          duration: 8 + i * 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    })
    vLineRefs.current.forEach((el, i) => {
      if (el) {
        gsap.to(el, {
          y: i % 2 === 0 ? '+=12' : '-=12',
          duration: 5 + i * 1.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    })
    dLineRefs.current.forEach((el, i) => {
      if (el) {
        gsap.to(el, {
          x: i % 2 === 0 ? '+=24' : '-=24',
          y: i % 2 === 1 ? '+=18' : '-=18',
          rotation: i % 2 === 0 ? '+=2' : '-=2',
          duration: 10 + i * 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    })
    return () => {
      hLineRefs.current.forEach(el => el && gsap.killTweensOf(el))
      vLineRefs.current.forEach(el => el && gsap.killTweensOf(el))
      dLineRefs.current.forEach(el => el && gsap.killTweensOf(el))
    }
  }, [])
  return (
    <Box position="absolute" top={0} left={0} w="100%" h="100%" zIndex={1} pointerEvents="none">
      <svg width="100%" height="100%" viewBox="0 0 320 180" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {/* More thin horizontal grid lines */}
        {[...Array(8)].map((_, i) => (
          <line
            key={'h'+i}
            ref={el => hLineRefs.current[i] = el}
            x1="0" y1={20 + i*20} x2="320" y2={20 + i*20}
            stroke="#b3c6d4"
            strokeWidth="0.7"
            opacity="0.10"
          />
        ))}
        {/* More thin vertical grid lines */}
        {[...Array(7)].map((_, i) => (
          <line
            key={'v'+i}
            ref={el => vLineRefs.current[i] = el}
            x1={30 + i*40} y1="0" x2={30 + i*40} y2="180"
            stroke="#b3c6d4"
            strokeWidth="0.7"
            opacity="0.10"
          />
        ))}
        {/* Diagonal lines ( / direction ) */}
        {[0,1,2].map(i => (
          <line
            key={'d1'+i}
            ref={el => dLineRefs.current[i] = el}
            x1={-40 + i*60} y1="0" x2={80 + i*60} y2="180"
            stroke="#b3c6d4"
            strokeWidth="0.6"
            opacity="0.09"
          />
        ))}
        {/* Diagonal lines ( \ direction ) */}
        {[0,1,2].map(i => (
          <line
            key={'d2'+i}
            ref={el => dLineRefs.current[i+3] = el}
            x1={80 + i*60} y1="0" x2={-40 + i*60} y2="180"
            stroke="#b3c6d4"
            strokeWidth="0.6"
            opacity="0.09"
          />
        ))}
      </svg>
    </Box>
  )
}

export {
  DesignSystemPanelElements,
  DesignSystemPanelGridLines,
  DesignSystemPanelGeometric
}
