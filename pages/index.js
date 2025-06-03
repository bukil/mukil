/* eslint-disable react/no-unescaped-entities */
import NextLink from 'next/link'
import Head from 'next/head'
import {
  Container,
  Heading,
  Box,
  chakra,
  Button,
  Text,
  VStack,
  
  Badge,
  useColorMode,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { useRouter } from 'next/router'
import { Global } from '@emotion/react'
import { motion, useInView } from 'framer-motion'

import Layout from '../components/layouts/article'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Section from '../components/section'
import { Grid, GridItem } from '@chakra-ui/react'
import Image from 'next/image'
import { Divider } from '@chakra-ui/react'
import { Spacer } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { FaFigma, FaReact } from 'react-icons/fa'
import { SiBlender, SiAdobexd, SiAdobephotoshop, SiAdobeillustrator, SiFramer, SiHtml5, SiGreensock, SiJekyll, SiPython, SiArduino, SiUnity, SiUnrealengine, SiSwift } from 'react-icons/si'
import { MdMemory, MdMonitor, MdSmartphone, MdCode, MdScience, MdViewInAr, MdFormatShapes, MdPlayCircleFilled } from 'react-icons/md'

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
      left: 0;
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

const JourneyItem = styled(Box)`
  position: relative;
  padding-left: 2rem;
  border-left: 2px solid #90cdf4;
  margin-bottom: 2rem;

  &:last-child {
    border-left: none;
  }

  &:before {
    content: '';
    position: absolute;
    left: -8px;
    top: 0;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #90cdf4;
  }
`

const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const SKILLS = [
  'Interaction Design',
  'UI/UX',
  'Prototyping',
  'Creative Coding',
  '3D Modeling',
  'Animation',
  'Design Systems',
  'User Research',
]
const SOFTWARE_SKILLS = [
  { name: 'Figma', icon: FaFigma },
  { name: 'Adobe XD', icon: SiAdobexd },
  { name: 'Blender', icon: SiBlender },
  { name: 'Photoshop', icon: SiAdobephotoshop },
  { name: 'Illustrator', icon: SiAdobeillustrator },
  { name: 'Framer', icon: SiFramer },
  { name: 'HTML/CSS/JS', icon: SiHtml5 },
  { name: 'React', icon: FaReact },
  { name: 'GSAP', icon: SiGreensock },
  { name: 'Jekyll', icon: SiJekyll },
  { name: 'Python', icon: SiPython },
  { name: 'Unreal Engine', icon: SiUnrealengine },
  { name: 'Fusion 360', icon: MdMemory },
  { name: 'Embedded (Arduino/Electronics)', icon: SiArduino },
  { name: 'Unity', icon: SiUnity },

  { name: 'Swift', icon: SiSwift },
  { name: 'Three.js' },
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
}

function AnimatedIntro() {
  const { colorMode } = useColorMode();
  const lines = [
    "I am a Creative Technologist and Interaction Design student living in Mumbai, currently pursuing my Masters at IIT Bombay.",
    "I craft playful, human-centered experiences at the intersection of design, technology, and art making ideas tangible, delightful, and meaningful."
  ];
  const lineRefs = useRef([]);

  useEffect(() => {
    if (!lineRefs.current) return;
    gsap.set(lineRefs.current, { opacity: 0, y: 40, scale: 0.96 });
    gsap.to(lineRefs.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.1,
      stagger: 0.38,
      ease: "back.out(1.7)"
    });
  }, []);

  return (
    <Box mt={6} mb={6}>
      {lines.map((line, i) => (
        <Text
          ref={el => lineRefs.current[i] = el}
          key={i}
          variant="home-txt"
          fontSize="xl"
          fontWeight={200}
          lineHeight={1.7}
          fontFamily="'Space Grotesk', 'Inter', 'sans-serif'"
          color={colorMode === 'dark' ? '#fff' : '#1a2340'}
          mb={i === lines.length - 1 ? 0 : 1}
          style={{
            transition: 'all 0.4s cubic-bezier(.4,2,.3,1)'
          }}
        >
          {line}
        </Text>
      ))}
    </Box>
  );
}

function AnimatedJourney() {
  const journeyData = [
    {
      badge: { color: 'blue', text: '2024 - Present' },
      title: 'Master of Design',
      org: 'IDC School of Design, IIT Bombay',
      desc: 'Specializing in Interaction Design',
    },
    {
      badge: { color: 'green', text: '2022 - 2023' },
      title: 'Creative Design Intern',
      org: 'e-Yantra, IIT Bombay',
      desc: 'Designed and developed a multipurpose drone system with interactive interfaces',
    },
    {
      badge: { color: 'purple', text: '2022' },
      title: 'Product Design Intern',
      org: 'Digital Ink, Delhi',
      desc: 'User experience and interface design',
    },
    {
      badge: { color: 'orange', text: '2019 - 2023' },
      title: 'B.Tech in Electronics & Communication',
      org: 'IET Lucknow',
      desc: 'Graduated with First Class Honors',
    },
  ];

  // Framer Motion animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.4, 2, 0.3, 1] } }
  };

  // Call hooks a fixed number of times (one for each journey item)
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const inView0 = useInView(ref0, { margin: '-40px' });
  const inView1 = useInView(ref1, { margin: '-40px' });
  const inView2 = useInView(ref2, { margin: '-40px' });
  const inView3 = useInView(ref3, { margin: '-40px' });
  const refs = [ref0, ref1, ref2, ref3];
  const inViews = [inView0, inView1, inView2, inView3];

  return (
    <VStack align="stretch" spacing={0} position="relative" zIndex={1}>
      {journeyData.map((item, i) => (
        <motion.div
          key={i}
          ref={refs[i]}
          initial="hidden"
          animate={inViews[i] ? "visible" : "hidden"}
          variants={itemVariants}
          style={{ width: '100%' }}
        >
          <JourneyItem
            boxShadow="none"
            bg="transparent"
            transition="box-shadow 0.3s, background 0.3s"
            position="relative"
          >
            <Badge colorScheme={item.badge.color} mb={2}>{item.badge.text}</Badge>
            <Heading fontSize="xl" fontWeight="bold"
              _hover={{
                textDecoration: 'underline',
                textDecorationColor: '#89EF8C',
                textDecorationThickness: '2px',
                textUnderlineOffset: '4px',
                transition: 'all 0.3s ease'
              }}
            >{item.title}</Heading>
            <Text fontSize="md" color="#90cdf4">{item.org}</Text>
            <Text fontSize="sm" mt={2}>{item.desc}</Text>
          </JourneyItem>
        </motion.div>
      ))}
    </VStack>
  );
}

const Home = () => {
  const pageRef = useRef(null)
  const mukilRef = useRef(null)
  const kumarRef = useRef(null)
  const journeyRefs = useRef([])
  const buttonRef = useRef(null)
  const hiImgRef = useRef(null)
  const router = useRouter();
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false })

  // New: Intersection observer for skills section
  const skillsSectionRef = useRef(null);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsTextRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [hoveredSoft, setHoveredSoft] = useState(null)

  // For mobile scroll sync highlight
  const mobileSkillRefs = useRef([])
  const [activeMobileSkill, setActiveMobileSkill] = useState(0)

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
    if (skillsVisible && skillsTextRef.current) {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(skillsTextRef.current, {
        scale: 1.06,
        y: 24,
        duration: 2.8,
        ease: 'sine.inOut',
      })
      .to(skillsTextRef.current, {
        scale: 1,
        y: 0,
        duration: 2.8,
        ease: 'sine.inOut',
      });
    }
    return () => {
      if (skillsTextRef.current) gsap.killTweensOf(skillsTextRef.current);
    };
  }, [skillsVisible]);

  // GSAP/ScrollTrigger animation and cleanup logic (keep only for journey, button, hi.png)
  useLayoutEffect(() => {
    if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    // Fade in page
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' }
      )
    }
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
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 1,
        ease: "power2.out"
      })
      // Hover animation
      const button = buttonRef.current
      hoverEnter = () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        })
      }
      hoverLeave = () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        })
      }
      button.addEventListener('mouseenter', hoverEnter)
      button.addEventListener('mouseleave', hoverLeave)
    }
    // Hi.png scroll animation
    if (hiImgRef.current) {
      gsap.fromTo(
        hiImgRef.current,
        { y: -100, scale: 0.5, opacity: 0 },
        {
          y: 300,
          scale: 2.2,
          opacity: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: hiImgRef.current,
            start: 'top top',
            end: 'bottom+=600 top',
            scrub: 1,
          },
        }
      );
    }
    // Cleanup
    return () => {
      if (buttonRef.current && hoverEnter && hoverLeave) {
        buttonRef.current.removeEventListener('mouseenter', hoverEnter)
        buttonRef.current.removeEventListener('mouseleave', hoverLeave)
      }
      if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [router.asPath]);

  useEffect(() => {
    if (!isMobile) return
    if (!skillsVisible) return
    const observer = new window.IntersectionObserver(
      (entries) => {
        let maxRatio = 0
        let maxIdx = 0
        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            maxIdx = Number(entry.target.dataset.idx)
          }
        })
        setActiveMobileSkill(maxIdx)
      },
      { threshold: Array.from({length: 11}, (_, i) => i/10), rootMargin: '-30% 0px -30% 0px' }
    )
    mobileSkillRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })
    return () => observer.disconnect()
  }, [isMobile, skillsVisible])

  return (
    <>
      <Global styles={`body { background: ${colorMode === 'dark' ? '#0a174e' : '#fff'} !important; }`} />
      <Box ref={pageRef} position="relative" minHeight="100vh">
        <Head>
          <title>Mukil Kumar | Interaction Designer & Creative Technologist</title>
          <meta name="description" content="Mukil Kumar - Interaction Designer, Creative Technologist, and Electronics Engineer. Currently pursuing Master of Design at IDC IIT Bombay. Specializing in user-centered design and creative technology solutions." />
          <meta name="keywords" content="Mukil Kumar, Interaction Designer, Creative Technologist, Electronics Engineer, IDC IIT Bombay, UX Design, UI Design, Product Design" />
          <meta name="author" content="Mukil Kumar" />
          <meta name="robots" content="index, follow" />
          
          {/* Open Graph / Social Media Meta Tags */}
          <meta property="og:title" content="Mukil Kumar | Interaction Designer & Creative Technologist" />
          <meta property="og:description" content="Portfolio of Mukil Kumar - Interaction Designer, Creative Technologist, and Electronics Engineer. Specializing in user-centered design and creative technology solutions." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://mukil.vercel.app" />
          <meta property="og:image" content="https://mukil.vercel.app/images/mukil.jpg" />
          
          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Mukil Kumar | Interaction Designer & Creative Technologist" />
          <meta name="twitter:description" content="Portfolio of Mukil Kumar - Interaction Designer, Creative Technologist, and Electronics Engineer." />
          <meta name="twitter:image" content="https://mukil.vercel.app/images/mukil.jpg" />
          
          {/* Canonical URL */}
          <link rel="canonical" href="https://mukil.vercel.app" />
          <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" rel="stylesheet" />
        </Head>
        <Layout>
          <Spacer mb={130}/>
          <Container maxW='container.xl'>
            <Box
              position="absolute"
              top={{ base: '-48px', md: '-72px', lg: '-96px' }}
              left={{ base: '-45px', md: '-60px', lg: '-75px' }}
              w={{ base: '36px', md: '54px', lg: '72px' }}
              h={{ base: '36px', md: '54px', lg: '72px' }}
              zIndex={1}
              style={{
                clipPath: 'polygon(0 100%, 100% 100%, 100% 0)',
                background: '#89EF8C',
              }}
            />
            <Box display={{ md:'flex'}}>
              <Box flexGrow={1}>
                <Grid templateColumns='repeat(2, fr)'>
                  <GridItem w='100%'>
                      <Heading ref={mukilRef} fontSize='7xl' fontWeight="hairline">
                      MUKIL
                    </Heading>
                  </GridItem>
                  <GridItem w='100%'>
                      <Heading ref={kumarRef} fontSize='7xl' variant="page-title">
                      KUMAR
                    </Heading>
                  </GridItem>
                </Grid>
                <p>INTERACTION DESIGNER · CREATIVE TECHNOLOGIST · ELECTRONICS ENGINEER</p>
              </Box>
              <Box
                flexShrink={0}
                mt={{ base: 4, md: 0 }}
                ml={{ md: 6 }}
                textAlign="center"
              >
                <Box
                  borderColor="whiteAlpha.800"
                  borderWidth={0}
                  borderStyle="solid"
                  w="200px"
                  h="240px"
                  display="inline-block"
                  borderRadius='50'
                  overflow="hidden"
                >
                  <ProfileImage
                    src="/images/mukil.jpg"
                    alt="Profile image"
                    width={320}
                    height={290}
                  />
                </Box>
              </Box>
            </Box>
            {/* Hi.png animated image */}
            <Box
              ref={hiImgRef}
              position="fixed"
              top={['10px', '30px']}
              right={['10px', '30px']}
              w={['60px', '100px', '140px']}
              pointerEvents="none"
              zIndex={3}
            >
              <Image
                src="/mukil/Hi.png"
                alt="Hi"
                width={140}
                height={140}
                style={{ width: '100%', height: 'auto' }}
              />
            </Box>
          </Container> 

          <Divider orientation='horizontal' mb={8} mt={6} />
          <Spacer />

          <Container maxW='container.xl' mt={2} mb={2} p={2}>
            <Grid templateColumns='repeat(2, fr)' gap={20}>
              <GridItem w='100%'>
                <Section delay={0.3}>
                  <AnimatedIntro />
                  <Heading fontSize="4xl" fontWeight="hairline" mt={12} mb={6}
                    _hover={{ 
                      textDecoration: 'underline',
                      textDecorationColor: '#89EF8C',
                      textDecorationThickness: '2px',
                      textUnderlineOffset: '8px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    My Journey
                  </Heading>
                  <AnimatedJourney />
                </Section>
              </GridItem>
            </Grid>
          </Container>

          {/* Skill Section */}
          <Container maxW='container.xl' mt={20} mb={20} position="relative" ref={skillsSectionRef}>
            {/* Big SKILLS text behind the tabs */}
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
                opacity={0.2}
                style={{
                  background: 'linear-gradient(90deg, #89EF8C 0%, #3182ce 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  textShadow: '0 8px 32px rgba(137,239,140,0.18)',
                  maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
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
                    <Box display="flex" flexWrap="wrap" gap={6} mb={10}>
                      {SKILLS.map((skill, idx) => (
                        <Box
                          key={skill}
                          fontSize="sm"
                          fontWeight="semibold"
                          fontFamily="'Space Grotesk', sans-serif"
                          px={8}
                          py={3}
                          borderRadius="full"
                          bg="rgba(255,255,255,0.18)"
                          border="1px solid #89EF8C"
                          transition="all 0.3s"
                          color="#89EF8C"
                          boxShadow="none"
                          style={{ WebkitBackdropFilter: 'blur(8px)' }}
                          mb={1}
                        >
                          {skill}
                        </Box>
                      ))}
                    </Box>
                    {/* SOFTWARE section: all tabs highlighted by default on mobile */}
                    <Heading fontSize="2xl" fontWeight="bold" mb={4} color="#3182ce">
                      Software
                    </Heading>
                    <Box display="flex" flexWrap="wrap" gap={4}>
                      {SOFTWARE_SKILLS.map((soft) => {
                        const Icon = soft.icon
                        return (
                          <Box
                            key={soft.name}
                            fontSize={{ base: 'md', md: 'lg' }}
                            fontWeight="medium"
                            fontFamily="'Space Grotesk', sans-serif"
                            px={6}
                            py={2}
                            borderRadius="full"
                            bg="rgba(255,255,255,0.18)"
                            border="1px solid #3182ce"
                            boxShadow="none"
                            backdropFilter="blur(8px)"
                            transition="all 0.3s"
                            color="#3182ce"
                            display="flex"
                            alignItems="center"
                            gap={2}
                            style={{ WebkitBackdropFilter: 'blur(8px)' }}
                            mb={1}
                          >
                            {Icon && <Icon style={{ fontSize: 24 }} />}
                            {soft.name}
                          </Box>
                        )
                      })}
                    </Box>
                  </>
                ) : (
                  <>
                    <Box display="flex" flexWrap="wrap" gap={6} mb={10}>
                      {SKILLS.map((skill) => {
                        const Icon = SKILL_ICONS[skill]
                        const isHovered = hoveredSkill === skill
                        const iconColor = '#89EF8C'
                        return (
                          <Box
                            key={skill}
                            fontSize="sm"
                            fontWeight="semibold"
                            fontFamily="'Space Grotesk', sans-serif"
                            px={8}
                            py={3}
                            borderRadius="full"
                            bg="rgba(255,255,255,0.18)"
                            border="1px solid rgba(137,239,140,0.25)"
                            boxShadow="0 8px 32px 0 rgba(137,239,140,0.08)"
                            backdropFilter="blur(8px)"
                            transition="all 0.3s"
                            color={isHovered ? '#89EF8C' : '#222'}
                            style={{ WebkitBackdropFilter: 'blur(8px)' }}
                            _hover={{
                              boxShadow: { base: 'none', md: '0 0 24px 8px #89EF8C, 0 8px 32px 0 rgba(137,239,140,0.18)' },
                              filter: { base: 'none', md: 'brightness(1.2)' },
                              cursor: 'pointer',
                            }}
                            onMouseEnter={() => setHoveredSkill(skill)}
                            onMouseLeave={() => setHoveredSkill(null)}
                            position="relative"
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
                          </Box>
                        )
                      })}
                    </Box>
                    <Heading fontSize="2xl" fontWeight="bold" mb={4} color="#3182ce">
                      Software
                    </Heading>
                    <Box display="flex" flexWrap="wrap" gap={4}>
                      {SOFTWARE_SKILLS.map((soft) => {
                        const Icon = soft.icon
                        return (
                          <Box
                            key={soft.name}
                            fontSize={{ base: 'md', md: 'lg' }}
                            fontWeight="medium"
                            fontFamily="'Space Grotesk', sans-serif"
                            px={6}
                            py={2}
                            borderRadius="full"
                            bg="rgba(255,255,255,0.18)"
                            border="1px solid rgba(49,130,206,0.25)"
                            boxShadow="0 8px 32px 0 rgba(49,130,206,0.08)"
                            backdropFilter="blur(8px)"
                            transition="all 0.3s"
                            color={hoveredSoft === soft.name ? '#3182ce' : '#222'}
                            display="flex"
                            alignItems="center"
                            gap={2}
                            style={{ WebkitBackdropFilter: 'blur(8px)' }}
                            _hover={{
                              boxShadow: { base: 'none', md: '0 0 24px 8px #3182ce, 0 8px 32px 0 rgba(49,130,206,0.18)' },
                              filter: { base: 'none', md: 'brightness(1.2)' },
                              cursor: 'pointer',
                            }}
                            onMouseEnter={() => setHoveredSoft(soft.name)}
                            onMouseLeave={() => setHoveredSoft(null)}
                          >
                            {Icon && <Icon style={{ fontSize: 24 }} />}
                            {soft.name}
                          </Box>
                        )
                      })}
                    </Box>
                  </>
                )}
              </>
            )}
          </Container>
          {/* SEE MORE ABOUT MY WORK button moved below skills */}
          <Trans>
            <Section>
              <Box align="center" mb={4}>
                <NextLink href="/works" passHref scroll={true}>
                  <Button 
                    ref={buttonRef}
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
                    rightIcon={<ChevronRightIcon />}
                    _hover={{
                      bg: '#89EF8C',
                      color: '#0a192f',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 3px 10px rgba(137, 239, 140, 0.3)'
                    }}
                  >
                    SEE MORE ABOUT MY WORK
                  </Button>
                </NextLink>
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
