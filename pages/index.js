/* eslint-disable react/no-unescaped-entities */
import NextLink from 'next/link'
import Head from 'next/head'
import {
  Container,
  Heading,
  Box,
  Button,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { useRouter } from 'next/router'
import { Global } from '@emotion/react'

import Layout from '../components/layouts/article'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Section from '../components/section'
import ProjectsGrid from '../components/ProjectsGrid'

import { Spacer } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { FaFigma, FaReact } from 'react-icons/fa'
import { SiBlender, SiAdobexd, SiAdobephotoshop, SiAdobeillustrator, SiFramer, SiHtml5, SiGreensock, SiJekyll, SiPython, SiArduino, SiUnity, SiUnrealengine, SiSwift } from 'react-icons/si'
import { MdMemory, MdMonitor, MdSmartphone, MdCode, MdScience, MdViewInAr, MdFormatShapes, MdPlayCircleFilled, MdGroups, MdEmojiEmotions } from 'react-icons/md'

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

const SKILLS = [
  'Interaction Design',
  'UI/UX',
  'Prototyping',
  'Creative Coding',
  '3D Modeling',
  'Animation',
  'Design Systems',
  'User Research',
  'Collaboration',
  'Empathy',
]
const VISUAL_DESIGN_SKILLS = [
  { name: 'Figma', icon: FaFigma },
  { name: 'Adobe XD', icon: SiAdobexd },
  { name: 'Blender', icon: SiBlender },
  { name: 'Photoshop', icon: SiAdobephotoshop },
  { name: 'Illustrator', icon: SiAdobeillustrator },
  { name: 'Framer', icon: SiFramer },
  { name: 'Fusion 360', icon: MdMemory },
]

const DEVELOPMENT_SKILLS = [
  { name: 'HTML/CSS/JS', icon: SiHtml5 },
  { name: 'React', icon: FaReact },
  { name: 'GSAP', icon: SiGreensock },
  { name: 'Jekyll', icon: SiJekyll },
  { name: 'Python', icon: SiPython },
  { name: 'Unity', icon: SiUnity },
  { name: 'Swift', icon: SiSwift },
  { name: 'Three.js' },
  { name: 'Unreal Engine', icon: SiUnrealengine },
  { name: 'Embedded (Arduino/Electronics)', icon: SiArduino },
]

const SKILL_ICONS = {
  'Interaction Design': MdMonitor,
  'UI/UX': MdSmartphone,
  'Prototyping': MdMemory,
  'Creative Coding': MdCode,
  '3D Modeling': MdViewInAr,
  'Animation': MdPlayCircleFilled,
  'Design Systems': MdFormatShapes,
  'User Research': MdScience,
  'Collaboration': MdGroups,
  'Empathy': MdEmojiEmotions,
}

function AnimatedIntro({ textColor = '#1A1A1A' }) {
  const line = "Mukil is a product designer working at the intersection of design and technology to create meaningful, accessible experiences."

  return (
    <Box w="100%">
      <Text
        variant="home-txt"
        fontSize={{ base: '28px', sm: '34px', md: '38px', lg: '42px', xl: '42px' }}
        fontWeight="normal"
        lineHeight={1.1}
        letterSpacing="-0.02em"
        fontFamily="'Ogg', 'Instrument Serif', 'Playfair Display', Georgia, serif"
        color={textColor}
        maxW={{ base: '100%', md: '840px', lg: '960px' }}
        sx={{
          hyphens: 'none'
        }}
        style={{
          transition: 'color 0.3s ease-out'
        }}
      >
        {line}
      </Text>
    </Box>
  );
}

const Home = () => {
  const pageRef = useRef(null)
  const textSectionRef = useRef(null)

  const journeyRefs = useRef([])
  const buttonRef = useRef(null)
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: false })

  const bgColor = '#F4F4F0'
  const textColor = '#1A1A1A'

  // New: Intersection observer for skills section
  const skillsSectionRef = useRef(null);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsTextRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null)

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsVisible(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { threshold: 0.2 }
    );
    if (skillsSectionRef.current) {
      observer.observe(skillsSectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Continuous smooth animation for SKILLS text
  useEffect(() => {
    const el = skillsTextRef.current
    if (skillsVisible && el) {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(el, {
        scale: 1.03, // reduced for less GPU load
        y: 12, // reduced for less movement
        duration: 4.5, // slower for smoother animation
        ease: 'sine.inOut',
      })
        .to(el, {
          scale: 1,
          y: 0,
          duration: 4.5,
          ease: 'sine.inOut',
        });
      // Add will-change for browser optimization
      el.style.willChange = 'transform';
    }
    return () => {
      if (el) {
        gsap.killTweensOf(el);
        el.style.willChange = '';
      }
    };
  }, [skillsVisible]);

  // GSAP/ScrollTrigger animation and cleanup logic
  useLayoutEffect(() => {
    if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    // Simple journey items animation - just fade in
    journeyRefs.current.forEach((item, index) => {
      if (item) {
        gsap.to(item, {
          opacity: 1,
          duration: 0.5,
          delay: index * 0.2,
          ease: "power2.out"
        })
      }
    })
    // Button animation
    let hoverEnter, hoverLeave;
    const btn = buttonRef.current
    if (btn) {
      gsap.to(btn, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 1,
        ease: "power2.out"
      })
      // Hover animation
      hoverEnter = () => {
        gsap.to(btn, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        })
      }
      hoverLeave = () => {
        gsap.to(btn, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        })
      }
      btn.addEventListener('mouseenter', hoverEnter)
      btn.addEventListener('mouseleave', hoverLeave)
    }



    // Cleanup
    return () => {
      if (btn && hoverEnter && hoverLeave) {
        btn.removeEventListener('mouseenter', hoverEnter)
        btn.removeEventListener('mouseleave', hoverLeave)
      }
      if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [router.asPath, isMobile]);

  return (
    <>
      <Global styles={`body { background: ${bgColor} !important; transition: background 0.1s linear; }`} />
      <Box ref={pageRef} position="relative" minHeight="100vh">
        <Head>
          <title>Mukil | Design</title>
          <meta name="description" content="Mukil - Interaction Designer, Creative Technologist, and Electronics Engineer. Currently pursuing Master of Design at IDC IIT Bombay. Specializing in user-centered design and creative technology solutions." />
          <meta name="keywords" content="Mukil, Interaction Designer, Creative Technologist, Electronics Engineer, IDC IIT Bombay, UX Design, UI Design, Product Design" />
          <meta name="author" content="Mukil" />
          <meta name="robots" content="index, follow" />

          {/* Open Graph / Social Media Meta Tags */}
          <meta property="og:title" content="Mukil" />
          <meta property="og:description" content="Portfolio of Mukil - Interaction Designer, Creative Technologist, and Electronics Engineer. Specializing in user-centered design and creative technology solutions." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://mukil.vercel.app" />
          <meta property="og:image" content="https://mukil.vercel.app/images/mukil.jpg" />

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Mukil" />
          <meta name="twitter:description" content="Portfolio of Mukil - Interaction Designer, Creative Technologist, and Electronics Engineer." />
          <meta name="twitter:image" content="https://mukil.vercel.app/images/mukil.jpg" />

          {/* Canonical URL */}
          <link rel="canonical" href="https://mukil.vercel.app" />
          {/* Font links moved to _document.js */}
        </Head>
        <Layout>
          <Spacer minHeight={{ base: '12px', md: '16px' }} />

          <Box ref={textSectionRef} w="100%" px={{ base: '20px', md: '24px' }} mt={0} mb={{ base: '48px', md: '64px', lg: '76px' }}>
            <Section delay={0.2}>
              <AnimatedIntro textColor={textColor} />
            </Section>
          </Box>

          {/* Selected Projects Section */}
          <Box w="100%" px={{ base: '20px', md: '24px' }} mb={20}>
            <Section delay={0.3}>
              <ProjectsGrid />
            </Section>
          </Box>

          {/* Skill Section */}
          <Box w="100%" px={{ base: '20px', md: '24px' }} mt={16} mb={20} position="relative" ref={skillsSectionRef}>
            {/* Subtle SKILLS background text */}
            {!isMobile && (
              <Box
                ref={skillsTextRef}
                position="absolute"
                top="55%"
                left="50%"
                transform="translate(-50%, -50%)"
                w="100%"
                zIndex={0}
                textAlign="center"
                pointerEvents="none"
                userSelect="none"
                fontSize={{ base: '32vw', md: '24vw', lg: '20vw' }}
                fontWeight="extrabold"
                fontFamily="'BaseNeueTrial', sans-serif"
                lineHeight={1}
                opacity={0.04}
                style={{
                  color: '#1A1A1A'
                }}
              >
                SKILLS
              </Box>
            )}
            {skillsVisible && (
              <>
                {isMobile ? (
                  <>
                    {/* SKILLS section: all tabs highlighted by default on mobile */}
                    <Heading fontSize="2xl" fontWeight="300" fontFamily="'Segoe UI', 'Segoe Sans', system-ui, sans-serif" mb={6} color="#363636ff">
                      Skills
                    </Heading>
                    <Text
                      fontSize="sm"
                      fontWeight="300"
                      fontFamily="'Segoe UI', 'Segoe Sans', system-ui, sans-serif"
                      color={textColor}
                      mb={8}
                    >
                      {SKILLS.slice(0, 5).join(' | ')}<br />
                      {SKILLS.slice(5).join(' | ')}
                    </Text>
                    {/* Visual Design section */}
                    <Heading fontSize="2xl" fontWeight="300" fontFamily="'Segoe UI', 'Segoe Sans', system-ui, sans-serif" mt={8} mb={4} color="#373737ff">
                      Visual Design
                    </Heading>
                    <Text
                      fontSize="sm"
                      fontWeight="300"
                      fontFamily="'Segoe UI', 'Segoe Sans', system-ui, sans-serif"
                      color={textColor}
                      mb={8}
                    >
                      {VISUAL_DESIGN_SKILLS.map(s => s.name).join(' | ')}
                    </Text>
                    {/* Development section */}
                    <Heading fontSize="2xl" fontWeight="300" fontFamily="'Segoe UI', 'Segoe Sans', system-ui, sans-serif" mt={8} mb={4} color="#373737ff">
                      Development
                    </Heading>
                    <Text
                      fontSize="sm"
                      fontWeight="300"
                      fontFamily="'Segoe UI', 'Segoe Sans', system-ui, sans-serif"
                      color={textColor}
                      mb={8}
                    >
                      {DEVELOPMENT_SKILLS.slice(0, 8).map(s => s.name).join(' | ')}<br />
                      {DEVELOPMENT_SKILLS.slice(8).map(s => s.name).join(' | ')}
                    </Text>
                  </>
                ) : (
                  <>
                    <Heading fontSize="2xl" fontWeight="300" fontFamily="'Segoe UI', 'Segoe Sans', system-ui, sans-serif" mb={6} color={textColor} style={{ transition: 'color 0.3s ease-out' }}>
                      Skills
                    </Heading>
                    <Box display="flex" flexWrap="wrap" gap={2} mb={8} alignItems="center">
                      {SKILLS.map((skill, index) => {
                        const Icon = SKILL_ICONS[skill]
                        const isHovered = hoveredSkill === skill
                        const iconColor = '#353535ff'
                        const isBreakAfter = index === 4 // Break after "3D Modeling"
                        return (
                          <>
                            <Text
                              key={skill}
                              fontSize="md"
                              fontWeight="300"
                              fontFamily="'Segoe UI', 'Segoe Sans', system-ui, sans-serif"
                              color={isHovered ? '#89EF8C' : textColor}
                              cursor="pointer"
                              onMouseEnter={() => setHoveredSkill(skill)}
                              onMouseLeave={() => setHoveredSkill(null)}
                              position="relative"
                              style={{ transition: 'color 0.3s ease-out' }}
                            >
                              {skill}
                              {Icon && (
                                <Box
                                  as={Icon}
                                  position="absolute"
                                  left="50%"
                                  top="-44px"
                                  transform={`translateX(-50%) scale(${isHovered ? 1 : 0.5})`}
                                  fontSize="2.5rem"
                                  color={iconColor}
                                  opacity={isHovered ? 1 : 0}
                                  transition="all 0.38s cubic-bezier(.4,2,.3,1)"
                                  zIndex={2}
                                  pointerEvents="none"
                                  filter="drop-shadow(0 2px 8px #89EF8C44)"
                                />
                              )}
                            </Text>
                            {index < SKILLS.length - 1 && !isBreakAfter && (
                              <Text
                                fontSize="md"
                                fontWeight="300"
                                fontFamily="'Segoe UI', 'Segoe Sans', system-ui, sans-serif"
                                color={textColor}
                                opacity={0.4}
                                style={{ transition: 'color 0.3s ease-out' }}
                              >
                                |
                              </Text>
                            )}
                            {isBreakAfter && (
                              <Box width="100%" height="0" />
                            )}
                          </>
                        )
                      })}
                    </Box>
                    <Heading fontSize="2xl" fontWeight="300" fontFamily="'Segoe UI', 'Segoe Sans', system-ui, sans-serif" mt={8} mb={4} color={textColor} style={{ transition: 'color 0.3s ease-out' }}>
                      Visual Design
                    </Heading>
                    <Box display="flex" flexWrap="wrap" gap={2} mb={8} alignItems="center">
                      {VISUAL_DESIGN_SKILLS.map((skill, index) => {
                        const Icon = skill.icon
                        const isHovered = hoveredSkill === skill.name
                        const iconColor = '#3182ce'
                        return (
                          <>
                            <Text
                              key={skill.name}
                              fontSize="md"
                              fontWeight="300"
                              fontFamily="'Segoe UI', 'Segoe Sans', system-ui, sans-serif"
                              color={isHovered ? '#3182ce' : textColor}
                              cursor="pointer"
                              onMouseEnter={() => setHoveredSkill(skill.name)}
                              onMouseLeave={() => setHoveredSkill(null)}
                              position="relative"
                              style={{ transition: 'color 0.3s ease-out' }}
                            >
                              {skill.name}
                              {Icon && (
                                <Box
                                  as={Icon}
                                  position="absolute"
                                  left="50%"
                                  top="-44px"
                                  transform={`translateX(-50%) scale(${isHovered ? 1 : 0.5})`}
                                  fontSize="2.5rem"
                                  color={iconColor}
                                  opacity={isHovered ? 1 : 0}
                                  transition="all 0.38s cubic-bezier(.4,2,.3,1)"
                                  zIndex={2}
                                  pointerEvents="none"
                                  filter="drop-shadow(0 2px 8px #3182ce44)"
                                />
                              )}
                            </Text>
                            {index < VISUAL_DESIGN_SKILLS.length - 1 && (
                              <Text
                                fontSize="md"
                                fontWeight="300"
                                fontFamily="'Segoe UI', 'Segoe Sans', system-ui, sans-serif"
                                color={textColor}
                                opacity={0.4}
                                style={{ transition: 'color 0.3s ease-out' }}
                              >
                                |
                              </Text>
                            )}
                          </>
                        )
                      })}
                    </Box>
                    <Heading fontSize="2xl" fontWeight="300" fontFamily="'Segoe UI', 'Segoe Sans', system-ui, sans-serif" mt={8} mb={4} color={textColor} style={{ transition: 'color 0.3s ease-out' }}>
                      Development
                    </Heading>
                    <Box display="flex" flexWrap="wrap" gap={2} mb={8} alignItems="center">
                      {DEVELOPMENT_SKILLS.map((skill, index) => {
                        const Icon = skill.icon
                        const isHovered = hoveredSkill === skill.name
                        const iconColor = '#3182ce'
                        const isBreakAfter = index === 7 // Break after "Three.js"
                        return (
                          <>
                            <Text
                              key={skill.name}
                              fontSize="md"
                              fontWeight="300"
                              fontFamily="'Segoe UI', 'Segoe Sans', system-ui, sans-serif"
                              color={isHovered ? '#3182ce' : textColor}
                              cursor="pointer"
                              onMouseEnter={() => setHoveredSkill(skill.name)}
                              onMouseLeave={() => setHoveredSkill(null)}
                              position="relative"
                              style={{ transition: 'color 0.3s ease-out' }}
                            >
                              {skill.name}
                              {Icon && (
                                <Box
                                  as={Icon}
                                  position="absolute"
                                  left="50%"
                                  top="-44px"
                                  transform={`translateX(-50%) scale(${isHovered ? 1 : 0.5})`}
                                  fontSize="2.5rem"
                                  color={iconColor}
                                  opacity={isHovered ? 1 : 0}
                                  transition="all 0.38s cubic-bezier(.4,2,.3,1)"
                                  zIndex={2}
                                  pointerEvents="none"
                                  filter="drop-shadow(0 2px 8px #3182ce44)"
                                />
                              )}
                            </Text>
                            {index < DEVELOPMENT_SKILLS.length - 1 && !isBreakAfter && (
                              <Text
                                fontSize="md"
                                fontWeight="300"
                                fontFamily="'Segoe UI', 'Segoe Sans', system-ui, sans-serif"
                                color={textColor}
                                opacity={0.4}
                                style={{ transition: 'color 0.3s ease-out' }}
                              >
                                |
                              </Text>
                            )}
                            {isBreakAfter && (
                              <Box width="100%" height="0" />
                            )}
                          </>
                        )
                      })}
                    </Box>
                  </>
                )}
              </>
            )}
          </Box>
          {/* SEE MORE ABOUT MY WORK button moved below skills */}
          <Trans>
            <Section>
              <Box w="100%" px={{ base: '20px', md: '24px' }}>
                <Box display="flex" justifyContent="flex-end" mb={12}>
                  <NextLink href="/works" passHref scroll={true}>
                    <Button
                      ref={buttonRef}
                      borderRadius='40px'
                      variant='outline'
                      border='1px solid'
                      borderColor='#1A1A1A'
                      color='#1A1A1A'
                      px={8}
                      py={6}
                      fontSize="14px"
                      fontFamily="'Segoe UI', 'Segoe Sans', system-ui, sans-serif"
                      fontWeight="500"
                      letterSpacing="0.08em"
                      textTransform="uppercase"
                      height="64px"
                      rightIcon={<ChevronRightIcon />}
                      _hover={{
                        bg: '#1A1A1A',
                        color: '#F4F4F0',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
                      }}
                    >
                      Explore More
                    </Button>
                  </NextLink>
                </Box>
              </Box>
            </Section>
          </Trans>
        </Layout>
      </Box>
    </>
  )
}

export default Home
export { getServerSideProps } from '../components/chakra'
