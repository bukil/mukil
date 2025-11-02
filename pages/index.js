/* eslint-disable react/no-unescaped-entities */
import NextLink from 'next/link'
import Head from 'next/head'
import {
  Container,
  Heading,
  Box,
  Button,
  Text,
  useColorMode,
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
import { Grid, GridItem } from '@chakra-ui/react'
import Image from 'next/image'

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

function AnimatedIntro({ textColor = '#ffffff' }) {
  const { } = useColorMode();
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
          fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
          fontWeight="bold"
          lineHeight={1.2}
          fontFamily="'Manrope', sans-serif"
          color={textColor}
          textAlign="justify"
          mb={i === lines.length - 1 ? 0 : 3}
          sx={{
            textAlign: 'justify',
            textJustify: 'inter-word',
            hyphens: 'auto'
          }}
          style={{
            transition: 'color 0.3s ease-out'
          }}
        >
          {line}
        </Text>
      ))}
    </Box>
  );
}

// Full Page Grey Grid Component with Plus Signs
const SmallGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw plus signs at every 5th intersection (accounting for grid line position)
    const gridSize = 40;
    const plusInterval = 5; // Every 5 boxes
    const plusSize = 6;
    const plusThickness = 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';

    // Start from first grid line and place plus at every 5th intersection
    for (let x = 0; x <= canvas.width; x += gridSize * plusInterval) {
      for (let y = 0; y <= canvas.height; y += gridSize * plusInterval) {
        // Draw horizontal line of plus (centered on intersection)
        ctx.fillRect(x - plusSize, y - plusThickness / 2, plusSize * 2, plusThickness);
        // Draw vertical line of plus (centered on intersection)
        ctx.fillRect(x - plusThickness / 2, y - plusSize, plusThickness, plusSize * 2);
      }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';

      for (let x = 0; x <= canvas.width; x += gridSize * plusInterval) {
        for (let y = 0; y <= canvas.height; y += gridSize * plusInterval) {
          ctx.fillRect(x - plusSize, y - plusThickness / 2, plusSize * 2, plusThickness);
          ctx.fillRect(x - plusThickness / 2, y - plusSize, plusThickness, plusSize * 2);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        zIndex={-1}
        pointerEvents="none"
        sx={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 38px,
              rgba(100, 100, 100, 0.12) 38px,
              rgba(100, 100, 100, 0.12) 40px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 38px,
              rgba(100, 100, 100, 0.12) 38px,
              rgba(100, 100, 100, 0.12) 40px
            )
          `
        }}
      />
      <Box
        as="canvas"
        ref={canvasRef}
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        zIndex={-1}
        pointerEvents="none"
      />
    </>
  );
};

// Background Image with Mouse Reveal Effect - Full Page
const BackgroundImageReveal = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [targetPos, setTargetPos] = useState({ x: -1000, y: -1000 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Elastic magnetic effect animation
  useEffect(() => {
    const animate = () => {
      setMousePos(prev => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        
        // More elastic easing with stronger spring effect
        const ease = 0.08;
        
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease
        };
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetPos]);

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      zIndex={-2}
      pointerEvents="none"
      sx={{
        backgroundImage: 'url(/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        // Mask with radial gradient that follows mouse
        maskImage: `radial-gradient(
          circle 180px at ${mousePos.x}px ${mousePos.y}px,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 0.8) 40%,
          rgba(0, 0, 0, 0) 100%
        )`,
        WebkitMaskImage: `radial-gradient(
          circle 180px at ${mousePos.x}px ${mousePos.y}px,
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 0.8) 40%,
          rgba(0, 0, 0, 0) 100%
        )`
      }}
    />
  );
};

const Home = () => {
  const pageRef = useRef(null)
  const mukilRef = useRef(null)
  const textSectionRef = useRef(null)
  const mukilSectionRef = useRef(null)

  const journeyRefs = useRef([])
  const buttonRef = useRef(null)
  const hiImgRef = useRef(null)
  const router = useRouter();
  useColorMode();
  const isMobile = useBreakpointValue({ base: true, md: false })
  
  const [bgColor, setBgColor] = useState('#000000')
  const [textColor, setTextColor] = useState('#ffffff')

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
    
    // Background and text color change on scroll to text section
    if (!isMobile) {
      if (textSectionRef.current) {
        gsap.to({}, {
          scrollTrigger: {
            trigger: textSectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 2.5,
            onUpdate: (self) => {
              const progress = self.progress;
              // Background: black to white (no rounding for smoother transition)
              const bgR = 0 + (255 * progress);
              const bgG = 0 + (255 * progress);
              const bgB = 0 + (255 * progress);
              setBgColor(`rgb(${bgR}, ${bgG}, ${bgB})`);
              
              // Text: white to black (no rounding for smoother transition)
              const textR = 255 - (255 * progress);
              const textG = 255 - (255 * progress);
              const textB = 255 - (255 * progress);
              setTextColor(`rgb(${textR}, ${textG}, ${textB})`);
            }
          }
        });
      }
    } else {
      // On mobile keep the background fully black and text white
      setBgColor('#000000')
      setTextColor('#ffffff')

      // Minimal mobile-only scroll trigger for skills text color
      // This ensures skill tab texts can transition to black on scroll on phones
      if (skillsSectionRef.current) {
        gsap.to({}, {
          scrollTrigger: {
            trigger: skillsSectionRef.current,
            start: 'top 90%',
            end: 'top 20%',
            scrub: 2.5,
            onUpdate: (self) => {
              const progress = self.progress;
              const textR = 255 - (255 * progress);
              const textG = 255 - (255 * progress);
              const textB = 255 - (255 * progress);
              setTextColor(`rgb(${textR}, ${textG}, ${textB})`);
            }
          }
        });
      }
    }
    
    // Fade out MUKIL KUMAR on scroll
    if (mukilRef.current) {
      gsap.to(mukilRef.current, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: mukilRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });
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
          <BackgroundImageReveal sectionRef={mukilSectionRef} />
          <SmallGrid />
          <Spacer minHeight="30vh" />
          <Container ref={mukilSectionRef} maxW='container.xl'>
            {/* Removed green triangle above MUKIL heading */}
            <Box>
              <Heading ref={mukilRef} fontSize={{ base: '6xl', md: '8xl', lg: '9xl' }} fontWeight="bold" lineHeight={0.95} textAlign="left" fontFamily="'Anton', sans-serif" letterSpacing="0.04em" color={textColor} style={{ transition: 'color 0.3s ease-out' }}>
                MUKIL<br />KUMAR
              </Heading>
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
                priority
              />
            </Box>
          </Container> 

          <Spacer minHeight="12vh" />

          <Container ref={textSectionRef} maxW='container.xl' mt={4} mb={8}>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={10}>
              <GridItem>
                <Section delay={0.3}>
                  <AnimatedIntro textColor={textColor} />
                </Section>
              </GridItem>
              <GridItem>
                {/* Right side can be used for other content */}
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
                    <Heading fontSize="2xl" fontWeight="bold" mb={6} color="#89EF8C">
                      Skills
                    </Heading>
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      fontFamily="'Space Grotesk', sans-serif"
                      color="#fff"
                      mb={8}
                    >
                      {SKILLS.slice(0, 5).join(' | ')}<br />
                      {SKILLS.slice(5).join(' | ')}
                    </Text>
                    {/* Visual Design section */}
                    <Heading fontSize="2xl" fontWeight="bold" mt={8} mb={4} color="#3182ce">
                      Visual Design
                    </Heading>
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      fontFamily="'Space Grotesk', sans-serif"
                      color="#fff"
                      mb={8}
                    >
                      {VISUAL_DESIGN_SKILLS.map(s => s.name).join(' | ')}
                    </Text>
                    {/* Development section */}
                    <Heading fontSize="2xl" fontWeight="bold" mt={8} mb={4} color="#3182ce">
                      Development
                    </Heading>
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      fontFamily="'Space Grotesk', sans-serif"
                      color="#fff"
                      mb={8}
                    >
                      {DEVELOPMENT_SKILLS.slice(0, 8).map(s => s.name).join(' | ')}<br />
                      {DEVELOPMENT_SKILLS.slice(8).map(s => s.name).join(' | ')}
                    </Text>
                  </>
                ) : (
              <>
                <Heading fontSize="2xl" fontWeight="bold" mb={6} color={textColor} style={{ transition: 'color 0.3s ease-out' }}>
                  Skills
                </Heading>
                <Box display="flex" flexWrap="wrap" gap={2} mb={8} alignItems="center">
                  {SKILLS.map((skill, index) => {
                    const Icon = SKILL_ICONS[skill]
                    const isHovered = hoveredSkill === skill
                    const iconColor = '#89EF8C'
                    const isBreakAfter = index === 4 // Break after "3D Modeling"
                    return (
                      <>
                        <Text
                          key={skill}
                          fontSize="md"
                          fontWeight="bold"
                          fontFamily="'Space Grotesk', sans-serif"
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
                            fontWeight="semibold"
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
                <Heading fontSize="2xl" fontWeight="bold" mt={8} mb={4} color={textColor} style={{ transition: 'color 0.3s ease-out' }}>
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
                          fontWeight="bold"
                          fontFamily="'Space Grotesk', sans-serif"
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
                            fontWeight="semibold"
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
                <Heading fontSize="2xl" fontWeight="bold" mt={8} mb={4} color={textColor} style={{ transition: 'color 0.3s ease-out' }}>
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
                          fontWeight="bold"
                          fontFamily="'Space Grotesk', sans-serif"
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
                            fontWeight="semibold"
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
                    border='0.4px'
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
