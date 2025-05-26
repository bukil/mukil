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
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import Layout from '../components/layouts/article'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Section from '../components/section'
import { Grid, GridItem } from '@chakra-ui/react'
import Image from 'next/image'
import { Divider } from '@chakra-ui/react'
import { Spacer } from '@chakra-ui/react'
import styled from '@emotion/styled'

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

const Home = () => {
  const mukilRef = useRef(null)
  const kumarRef = useRef(null)
  const journeyRefs = useRef([])
  const buttonRef = useRef(null)
  const hiImgRef = useRef(null)

  useEffect(() => {
    // Simple name animation
    const animateText = (ref) => {
      if (ref.current) {
        const text = ref.current
        const letters = text.textContent.split('')
        text.textContent = ''
        
        letters.forEach((letter, i) => {
          const span = document.createElement('span')
          span.textContent = letter
          span.style.display = 'inline-block'
          span.style.opacity = '0'
          span.style.transform = 'translateY(50px)'
          text.appendChild(span)
          
          gsap.to(span, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.1,
            ease: 'power2.out'
          })
        })
      }
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
      const hoverEnter = () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        })
      }
      const hoverLeave = () => {
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

    // Run animations
    animateText(mukilRef)
    animateText(kumarRef)

    // Cleanup
    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('mouseenter', () => {})
        buttonRef.current.removeEventListener('mouseleave', () => {})
      }
      if (hiImgRef.current && ScrollTrigger.getById('hiImgScroll')) {
        ScrollTrigger.getById('hiImgScroll').kill();
      }
    }
  }, [])

  return (
  <Box position="relative" minHeight="100vh">
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
