/* eslint-disable react/no-unescaped-entities */
import NextLink from 'next/link'
import Head from 'next/head'
import {
  Link,
  Container,
  Heading,
  Box,
  chakra,
  Button,
  Text,
  VStack,
  
  Badge,
} from '@chakra-ui/react'
import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { useRouter } from 'next/router'

import Layout from '../components/layouts/article'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Section from '../components/section'
import { Grid, GridItem } from '@chakra-ui/react'
import Image from 'next/image'
import { Divider } from '@chakra-ui/react'
import { Spacer } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { FaFigma, FaReact } from 'react-icons/fa'
import { SiBlender, SiAdobexd, SiAdobeaftereffects, SiAdobephotoshop, SiAdobeillustrator, SiFramer, SiHtml5, SiGreensock, SiJekyll, SiPython, SiArduino, SiUnity, SiUnrealengine, SiSwift, SiThreejs } from 'react-icons/si'
import { MdMemory } from 'react-icons/md'

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
  { name: 'After Effects', icon: SiAdobeaftereffects },
  { name: 'Photoshop', icon: SiAdobephotoshop },
  { name: 'Illustrator', icon: SiAdobeillustrator },
  { name: 'Framer', icon: SiFramer },
  { name: 'HTML/CSS/JS', icon: SiHtml5 },
  { name: 'React', icon: FaReact },
  { name: 'GSAP', icon: SiGreensock },
  { name: 'Jekyll', icon: SiJekyll },
  { name: 'Python', icon: SiPython },
  { name: 'Embedded (Arduino/Electronics)', icon: SiArduino },
  { name: 'Unity', icon: SiUnity },
  { name: 'Unreal Engine', icon: SiUnrealengine },
  { name: 'Swift', icon: SiSwift },
  { name: 'Fusion 360', icon: MdMemory },
  { name: 'Three.js', icon: SiThreejs },
]

const Home = () => {
  const pageRef = useRef(null)
  const mukilRef = useRef(null)
  const kumarRef = useRef(null)
  const journeyRefs = useRef([])
  const buttonRef = useRef(null)
  const hiImgRef = useRef(null)
  const router = useRouter();

  // New: Intersection observer for skills section
  const skillsSectionRef = useRef(null);
  const [skillsVisible, setSkillsVisible] = useState(false);

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

  return (
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
        <Container maxW='container.lg'>
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
            zIndex={0}
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

        <Container maxW='container.lg' mt={2} mb={2} p={2}>
          <Grid templateColumns='repeat(2, fr)' gap={20}>
            <GridItem w='100%'>
              <Section delay={0.3}>
                  <Heading fontSize="6xl" fontWeight="hairline" 
                    _hover={{ 
                      textDecoration: 'underline',
                      textDecorationColor: '#89EF8C',
                      textDecorationThickness: '2px',
                      textUnderlineOffset: '8px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                  Introduction
                </Heading>
                <Text variant="home-txt" fontSize={14} fontWeight='normal'>
                  Hailing from Uttar Pradesh, India, I&apos;m Mukil an engineering graduate
                  with an insatiable design itch. From crafting intuitive, user-centered experiences, 
                  to the intricate workings of everyday machinery, anything with an engineering pulse sparks my imagination. 
                  My superpower? Transforming real-world challenges into design and tech solutions.
                  Think MacGyver meets the future! When I&apos;m not glued to the screen, you&apos;ll find me
                  lost in the rhythm of music, taking solitary walks to untangle thoughts (weird, but it works!),
                  and wielding my phone camera like a trusty sidekick, capturing inspiration on the go.
                  Right now, I&apos;m brewing up some exciting projects in my creative cauldron. Stay tuned!{' '}
                  <Link href="https://www.youtube.com/shorts/yOYycYeoM24" isExternal>
                    Dynamic Steering System
                  </Link>
                  .&quot;
                  <Link href="https://www.youtube.com/channel/UCVeGi7RNdtqN6_7G-rjdSGQ" isExternal>
                    YT@Mukil
                  </Link>
                  &quot;
                </Text>

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

                <VStack align="stretch" spacing={0}>
                    <JourneyItem 
                      ref={el => journeyRefs.current[0] = el}
                      style={{ opacity: 0 }}
                    >
                    <Badge colorScheme="blue" mb={2}>2024 - Present</Badge>
                      <Heading fontSize="xl" fontWeight="bold"
                        _hover={{ 
                          textDecoration: 'underline',
                          textDecorationColor: '#89EF8C',
                          textDecorationThickness: '2px',
                          textUnderlineOffset: '4px',
                          transition: 'all 0.3s ease'
                        }}
                      >Master of Design</Heading>
                      <Text fontSize="md" color="#90cdf4">IDC School of Design, IIT Bombay</Text>
                    <Text fontSize="sm" mt={2}>Specializing in Interaction Design</Text>
                  </JourneyItem>

                    <JourneyItem 
                      ref={el => journeyRefs.current[1] = el}
                      style={{ opacity: 0 }}
                    >
                    <Badge colorScheme="green" mb={2}>2022 - 2023</Badge>
                      <Heading fontSize="xl" fontWeight="bold"
                        _hover={{ 
                          textDecoration: 'underline',
                          textDecorationColor: '#89EF8C',
                          textDecorationThickness: '2px',
                          textUnderlineOffset: '4px',
                          transition: 'all 0.3s ease'
                        }}
                      >Creative Design Intern</Heading>
                      <Text fontSize="md" color="#90cdf4">e-Yantra, IIT Bombay</Text>
                    <Text fontSize="sm" mt={2}>Designed and developed a multipurpose drone system with interactive interfaces</Text>
                  </JourneyItem>

                    <JourneyItem 
                      ref={el => journeyRefs.current[2] = el}
                      style={{ opacity: 0 }}
                    >
                    <Badge colorScheme="purple" mb={2}>2022</Badge>
                      <Heading fontSize="xl" fontWeight="bold"
                        _hover={{ 
                          textDecoration: 'underline',
                          textDecorationColor: '#89EF8C',
                          textDecorationThickness: '2px',
                          textUnderlineOffset: '4px',
                          transition: 'all 0.3s ease'
                        }}
                      >Product Design Intern</Heading>
                      <Text fontSize="md" color="#90cdf4">Digital Ink, Delhi</Text>
                    <Text fontSize="sm" mt={2}>User experience and interface design</Text>
                  </JourneyItem>

                    <JourneyItem 
                      ref={el => journeyRefs.current[3] = el}
                      style={{ opacity: 0 }}
                    >
                    <Badge colorScheme="orange" mb={2}>2019 - 2023</Badge>
                    <Heading fontSize="xl" fontWeight="bold">B.Tech in Electronics & Communication</Heading>
                      <Text fontSize="md" color="#90cdf4">IET Lucknow</Text>
                    <Text fontSize="sm" mt={2}>Graduated with First Class Honors</Text>
                  </JourneyItem>
                </VStack>
              </Section>
            </GridItem>
          </Grid>
        </Container>

        {/* Skill Section */}
        <Container maxW='container.lg' mt={20} mb={20} position="relative" ref={skillsSectionRef}>
          {/* Big SKILLS text behind the tabs */}
          <Box
            position="absolute"
            top="55%"
            left="50%"
            transform="translate(-50%, -50%)"
            w="100%"
            zIndex={0}
            textAlign="center"
            pointerEvents="none"
            userSelect="none"
            fontSize={{ base: '16vw', md: '10vw', lg: '8vw' }}
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
            }}
          >
            SKILLS
          </Box>
          <Heading fontSize="4xl" fontWeight="bold" mb={8} color="#89EF8C" zIndex={1} position="relative">
            Skills
          </Heading>
          {skillsVisible && (
            <>
              <Box display="flex" flexWrap="wrap" gap={6} mb={10}>
                {SKILLS.map((skill) => (
                  <Box
                    key={skill}
                    fontSize={{ base: 'xl', md: '2xl' }}
                    fontWeight="semibold"
                    fontFamily="'Space Grotesk', sans-serif"
                    px={6}
                    py={3}
                    borderRadius="2xl"
                    bg="rgba(255,255,255,0.18)"
                    border="1px solid rgba(137,239,140,0.25)"
                    boxShadow="0 8px 32px 0 rgba(137,239,140,0.08)"
                    backdropFilter="blur(8px)"
                    transition="all 0.3s"
                    color="#222"
                    style={{ WebkitBackdropFilter: 'blur(8px)' }}
                    _hover={{
                      boxShadow: '0 0 24px 8px #89EF8C, 0 8px 32px 0 rgba(137,239,140,0.18)',
                      filter: 'brightness(1.2)',
                      cursor: 'pointer',
                    }}
                  >
                    {skill}
                  </Box>
                ))}
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
                      px={4}
                      py={2}
                      borderRadius="xl"
                      bg="rgba(255,255,255,0.18)"
                      border="1px solid rgba(49,130,206,0.25)"
                      boxShadow="0 8px 32px 0 rgba(49,130,206,0.08)"
                      backdropFilter="blur(8px)"
                      transition="all 0.3s"
                      color="#222"
                      display="flex"
                      alignItems="center"
                      gap={2}
                      style={{ WebkitBackdropFilter: 'blur(8px)' }}
                      _hover={{
                        boxShadow: '0 0 24px 8px #3182ce, 0 8px 32px 0 rgba(49,130,206,0.18)',
                        filter: 'brightness(1.2)',
                        cursor: 'pointer',
                      }}
                    >
                      {Icon && <Icon style={{ fontSize: 24 }} />}
                      {soft.name}
                    </Box>
                  )
                })}
              </Box>
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
  )
}

export default Home
export { getServerSideProps } from '../components/chakra'
