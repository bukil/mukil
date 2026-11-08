/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head'
import {
  SimpleGrid,
  Image,
  Text,
  Button,
  Box,
  Spacer
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from '@chakra-ui/icons'
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
import useProjectScroll from '../hooks/useProjectScroll'
import scrollStyles from '../styles/ProjectScroll.module.css'

const HairlineExploded = dynamic(
  () => import('@lucasmarkes/hairline/react').then((m) => m.Exploded),
  { ssr: false }
)

const HairlinePlot = dynamic(
  () => import('@lucasmarkes/hairline/react').then((m) => m.Plot),
  { ssr: false }
)

// Styled components
const TransRTL = styled.div`
  display: inline-block;
  button, Button {
    position: relative;
    overflow: hidden;
    background: transparent;
    border: 1px solid #1A1A1A;
    color: #1A1A1A;
    transition: all 0.3s ease;
    z-index: 1;
    border-radius: 0;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: auto;
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
  rightText = 'Placeholder',
  hoverTitle: _hoverTitle,
  description: _description,
  imageSrc,
  imageAlt,
  accentColor: _accentColor,
  onClick,
  customContent,
  sx
}) => {
  return (
    <Box
      data-project-card=""
      width="100%"
      maxW="100%"
      role="group"
      onClick={onClick}
      cursor={onClick ? 'pointer' : undefined}
    >
      {/* Title on left, placeholder on right outside the panel, very close to the panel */}
      {(title || (rightText ?? 'Placeholder')) && (
        <Box
          mb="6px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Text
            fontSize={{ base: '9.5px', md: '10.5px' }}
            fontFamily="'GT Walsheim', 'GT Walsheim Pro', -apple-system, BlinkMacSystemFont, sans-serif"
            fontWeight="700"
            letterSpacing="0.02em"
            color="#2f2f2f97"
            lineHeight="1.2"
            textAlign="left"
          >
            {title}
          </Text>
          {(rightText ?? 'Placeholder') && (
            <Text
              fontSize={{ base: '9.5px', md: '10.5px' }}
              fontFamily="'GT Walsheim', 'GT Walsheim Pro', -apple-system, BlinkMacSystemFont, sans-serif"
              fontWeight="700"
              letterSpacing="0.02em"
              color="#2f2f2f97"
              lineHeight="1.2"
              textAlign="right"
            >
              {rightText ?? 'Placeholder'}
            </Text>
          )}
        </Box>
      )}

      <Box
        position="relative"
        borderWidth="0.5px"
        borderColor="#1A1A1A"
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
          borderColor: '#1A1A1A'
        }}
        _groupHover={{
          bg: '#ffffff',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
          borderColor: '#1A1A1A'
        }}
        _focusVisible={{
          outline: '2px solid #111827',
          outlineOffset: '3px'
        }}
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
        {imageSrc && (
          <Box
            data-project-artwork=""
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
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
          </Box>
        )}

        {customContent && (
          <Box
            data-project-artwork=""
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
        width={{ base: '84%', sm: '86%', md: '460px' }}
        maxW={{ base: '86%', md: '96%' }}
        position="relative"
        transform={{ base: 'translateY(-12px) scale(1.10)', md: 'translateY(-10px) scale(1.4)' }}
        transformOrigin="center center"
        transition="transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
        _groupHover={{
          transform: { base: 'translateY(-12px) scale(1.15)', md: 'translateY(-10px) scale(1.45)' }
        }}
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
        width={{ base: '82%', sm: '85%', md: '460px' }}
        maxW={{ base: '85%', md: '96%' }}
        position="relative"
        transform={{ base: 'translate(22px, -65px) scale(1.15)', md: 'translate(32px, -102px) scale(1.4)' }}
        transformOrigin="center center"
        transition="transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
        _groupHover={{
          transform: { base: 'translate(22px, -65px) scale(1.20)', md: 'translate(32px, -102px) scale(1.45)' }
        }}
      >
        <HairlineExploded play intensity={0.7} />
      </Box>
    </Box>
  )
}

// Playground projects rendered on the Works page
function WorksGrid() {

  return (
    <Box w="100%" px={{ base: '20px', md: '24px' }} mb={{ base: 16, md: 20 }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: '20px', md: '24px' }}>
        {/* Panel 1: Data visualisation: LHC, Speed of Light */}
        <Section data-project-row="" delay={0.1}>
          <Box
            as="a"
            href="https://bukil.github.io/dataviz/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}
          >
            <ProjectPanel
              title="Data visualisation: LHC, Speed of Light"
              rightText="Placeholder"
              accentColor="#232327"
              customContent={<LhcRingGraphic />}
            />
          </Box>
        </Section>

        {/* Panel 2: Data Vizualisation (MAPA) */}
        <Section data-project-row="" delay={0.2}>
          <Box
            as="a"
            href="https://bukil.github.io/MAPA/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}
          >
            <ProjectPanel
              title="Data Vizualisation"
              rightText="Placeholder"
              accentColor="#232327"
              customContent={<DataVizPlotGraphic />}
            />
          </Box>
        </Section>

        {/* Panel 3: Microinteraction */}
        <Section data-project-row="" delay={0.3}>
          <NextLink href="/mukilm" passHref legacyBehavior>
            <Box
              as="a"
              style={{ display: 'block', cursor: 'pointer', textDecoration: 'none' }}
            >
              <ProjectPanel
                title="Microinteraction"
                rightText="Placeholder"
                accentColor="#232327"
                customContent={<MicrointeractionGraphic />}
              />
            </Box>
          </NextLink>
        </Section>

        {/* Panel 4: C2C */}
        <Section data-project-row="" delay={0.4}>
          <NextLink href="/c2c" aria-label="Explore C2C — Cube to Cube">
            <ProjectPanel
              title="C2C"
              rightText="Placeholder"
              imageSrc="/images/works/c2cf.png"
              imageAlt="C2C physical interaction cube controller"
              accentColor="#0d9488"
            />
          </NextLink>
        </Section>
      </SimpleGrid>
    </Box>
  )
}

const Works = () => {
  const pageRef = useRef(null)
  useProjectScroll(pageRef)
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
        <title>Playground & Projects | Mukil Kumar — IDC IIT Bombay</title>
        <meta name="description" content="Explore interaction design experiments, creative coding, 3D modeling, and interactive hardware projects by Mukil Kumar (IDC School of Design, IIT Bombay)." />
        <meta name="keywords" content="Mukil Kumar, Mukil, Mukil Projects, Mukil Playground, Mukil IITB, Mukil IDC, Interaction Design Portfolio, Creative Coding, IIT Bombay" />
        <meta property="og:title" content="Playground & Projects | Mukil Kumar — IDC IIT Bombay" />
        <meta property="og:description" content="Explore interaction design experiments, creative coding, and interactive hardware projects by Mukil Kumar." />
        <link rel="canonical" href="https://mukil.vercel.app/works" />
      </Head>
      <Layout title="Playground" mt={10} overflowX="hidden">
        <Box ref={pageRef} className={scrollStyles.root} w="100%" position="relative">
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
              <Section>
                <Box
                  w="100%"
                  px={{ base: '16px', sm: '20px', md: '24px' }}
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={{ base: 2, sm: 3, md: 0 }}
                  mb={12}
                >
                  <TransRTL>
                    <NextLink href="/" passHref scroll={true}>
                      <Button
                        borderRadius="0"
                        variant="outline"
                        border="1px solid"
                        borderColor="#1A1A1A"
                        color="#1A1A1A"
                        px={{ base: 2.5, sm: 4, md: 8 }}
                        py={{ base: 3, md: 6 }}
                        fontSize={{ base: '10px', sm: '12px', md: '14px' }}
                        fontFamily="'Segoe UI', 'Segoe Sans', system-ui, sans-serif"
                        fontWeight="500"
                        letterSpacing={{ base: '0.03em', sm: '0.05em', md: '0.08em' }}
                        textTransform="uppercase"
                        height={{ base: '42px', sm: '48px', md: '64px' }}
                        whiteSpace="nowrap"
                        leftIcon={<ChevronLeftIcon boxSize={{ base: 3.5, sm: 4, md: 5 }} />}
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
                  </TransRTL>
                  <TransRTL>
                    <NextLink href="/contact" passHref scroll={true}>
                      <Button
                        borderRadius="0"
                        variant="outline"
                        border="1px solid"
                        borderColor="#1A1A1A"
                        color="#1A1A1A"
                        px={{ base: 3, sm: 4, md: 8 }}
                        py={{ base: 3, md: 6 }}
                        fontSize={{ base: '10px', sm: '12px', md: '14px' }}
                        fontFamily="'Segoe UI', 'Segoe Sans', system-ui, sans-serif"
                        fontWeight="500"
                        letterSpacing={{ base: '0.03em', sm: '0.05em', md: '0.08em' }}
                        textTransform="uppercase"
                        height={{ base: '42px', sm: '48px', md: '64px' }}
                        whiteSpace="nowrap"
                        rightIcon={<ChevronRightIcon boxSize={{ base: 3.5, sm: 4, md: 5 }} />}
                        _hover={{
                          bg: '#1A1A1A',
                          color: '#F4F4F0',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
                        }}
                      >
                        CONTACT
                      </Button>
                    </NextLink>
                  </TransRTL>
                </Box>
              </Section>
          </ContentWrapper>
        </Box>
      </Layout>
    </>
  )
}

export default Works
