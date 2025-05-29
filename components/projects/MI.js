import React, { useRef, useEffect } from 'react';
import { Box, Text, Button, useColorMode } from '@chakra-ui/react';
import StandardModal from '../ui/Modal';
import gsap from 'gsap';
import Head from 'next/head';

const MicrointeractionModal = ({ isOpen, onClose }) => {
  const demoRef = useRef(null);
  const textRef = useRef([]);
  const { colorMode } = useColorMode();
  const animatedText = "Let's Play with Microinteractions!".split('');

  useEffect(() => {
    let tl, textTl;
    if (isOpen && demoRef.current) {
      tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } });
      tl.to(demoRef.current, {
        scale: 1.15,
        duration: 0.7,
      })
      .to(demoRef.current, {
        scale: 1,
        duration: 0.7,
      });
    }
    if (isOpen && textRef.current.length) {
      const validTextRefs = textRef.current.filter(Boolean);
      if (validTextRefs.length) {
        textTl = gsap.timeline();
        textTl.fromTo(
          validTextRefs,
          { y: 40, opacity: 0, color: '#89EF8C' },
          {
            y: 0,
            opacity: 1,
            color: colorMode === 'light' ? '#222' : '#89EF8C',
            duration: 0.7,
            stagger: 0.05,
            ease: 'back.out(2)',
          }
        ).to(
          validTextRefs,
          {
            y: -8,
            color: colorMode === 'light' ? '#89EF8C' : '#fff',
            duration: 0.3,
            stagger: 0.04,
            yoyo: true,
            repeat: 1,
            ease: 'sine.inOut',
          },
          '+=0.2'
        );
      }
    }
    return () => {
      if (tl) tl.kill();
      if (textTl) textTl.kill();
    };
  }, [isOpen, colorMode]);

  return (
    <>
      {/* Whyte Space Inktrap is a commercial font and not available on Google Fonts. */}
      {/* To use it, you must self-host it or use a CDN from your font provider. */}
      {/* Example (if you have a CDN):
      <Head>
        <link rel="stylesheet" href="https://your-cdn.com/whyte-space-inktrap.css" />
      </Head>
      */}
      {/* Fallback: Use BaseNeueTrial or Space Grotesk if Whyte Space Inktrap is not available */}
      <Head>
        {/* Font loaded globally in styles/globals.css */}
      </Head>
      <StandardModal isOpen={isOpen} onClose={onClose} title="Microinteraction Demo" maxW="100vw" w="100vw">
        <Box
          px={0}
          pt={{ base: 10, md: 24 }}
          pb={{ base: 6, md: 16 }}
          minH="100vh"
          w="100vw"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          position="relative"
          // Frosted glass Apple-style background
          bg={colorMode === 'light' ? 'rgba(255,255,255,0.55)' : 'rgba(20,20,20,0.55)'}
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: colorMode === 'light' ? '1.5px solid rgba(137,239,140,0.18)' : '1.5px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 32px 0 rgba(137,239,140,0.12)',
          }}
        >
          {/* Large animated headline in top left */}
          <Box
            position="absolute"
            top={{ base: 4, md: 10 }}
            left={{ base: 4, md: 10 }}
            zIndex={10}
            textAlign="left"
          >
            <Text
              fontSize={{ base: '8vw', md: '6vw', lg: '5vw' }}
              fontWeight="900"
              fontFamily="'WhyteInktrap', 'BaseNeueTrial', 'Space Grotesk', sans-serif"
              textTransform="uppercase"
              letterSpacing="-0.02em"
              mb={0}
              lineHeight={1}
              style={{ WebkitTextStroke: colorMode === 'light' ? '2px #89EF8C' : '2px #fff' }}
            >
              {animatedText.map((char, i) => (
                <Box
                  as="span"
                  key={i}
                  ref={el => (textRef.current[i] = el)}
                  display="inline-block"
                  color={colorMode === 'light' ? '#222' : '#fff'}
                  fontFamily="'WhyteInktrap', 'BaseNeueTrial', 'Space Grotesk', sans-serif"
                  fontWeight="900"
                  fontSize={{ base: '8vw', md: '6vw', lg: '5vw' }}
                  letterSpacing="-0.02em"
                  style={{ transition: 'color 0.3s', marginRight: char === ' ' ? '1vw' : '0.5vw' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </Box>
              ))}
            </Text>
          </Box>
          {/* iPhone mockup with frosted glass effect */}
          <Box
            mx="auto"
            mb={8}
            position="relative"
            width={{ base: '90vw', md: '60vw', lg: '40vw' }}
            maxW="420px"
            aspectRatio="9/16"
            borderRadius="40px"
            borderWidth="8px"
            borderColor={colorMode === 'light' ? 'rgba(137,239,140,0.18)' : 'rgba(255,255,255,0.08)'}
            bg={colorMode === 'light' ? 'rgba(255,255,255,0.65)' : 'rgba(30,30,30,0.65)'}
            boxShadow="0 8px 32px 0 rgba(137,239,140,0.18)"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            overflow="hidden"
            style={{
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: colorMode === 'light' ? '1.5px solid rgba(137,239,140,0.18)' : '1.5px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Notch */}
            <Box
              position="absolute"
              top="0"
              left="50%"
              transform="translateX(-50%)"
              width="80px"
              height="18px"
              bg={colorMode === 'light' ? '#222' : '#fff'}
              borderBottomLeftRadius="16px"
              borderBottomRightRadius="16px"
              zIndex={2}
            />
            {/* Screen area */}
            <Box
              flex="1"
              width="100%"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              pt={10}
              pb={6}
              px={2}
              bg={colorMode === 'light' ? 'rgba(255,255,255,0.18)' : 'rgba(40,40,40,0.18)'}
              zIndex={1}
              style={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <Box ref={demoRef} display="inline-block" p={4} borderRadius="full" bg={colorMode === 'light' ? 'orange.100' : 'orange.700'} boxShadow="lg" mt={4}>
                <Button colorScheme="orange" size="md">
                  Try Me
                </Button>
              </Box>
            </Box>
            {/* Home indicator */}
            <Box
              position="absolute"
              bottom="16px"
              left="50%"
              transform="translateX(-50%)"
              width="60px"
              height="6px"
              borderRadius="3px"
              bg={colorMode === 'light' ? 'gray.300' : 'gray.600'}
              opacity={0.7}
            />
          </Box>
          <Text fontSize="md" mt={4} color={colorMode === 'light' ? 'green.800' : 'gray.300'}>
            (Replace this with your microinteraction animation or demo)
          </Text>
        </Box>
      </StandardModal>
    </>
  );
};

export default MicrointeractionModal; 