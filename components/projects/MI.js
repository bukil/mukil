import React, { useRef, useEffect } from 'react';
import { Box, Text, useColorMode } from '@chakra-ui/react';
import StandardModal from '../ui/Modal';
import gsap from 'gsap';
import Head from 'next/head';

function MaterialYouBlobAnimation({ colorMode }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let dpr = window.devicePixelRatio || 1;
    let width = 320, height = 480;
    function setCanvasSize() {
      dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }
    setCanvasSize();
    // 3D sphere animation
    const sphereColors = colorMode === 'light'
      ? ['#89EF8C', '#00aaff', '#a259ff']
      : ['#222', '#fff', '#00aaff'];
    const shadowColors = colorMode === 'light'
      ? ['rgba(137,239,140,0.18)', 'rgba(0,170,255,0.18)', 'rgba(162,89,255,0.18)']
      : ['rgba(34,34,34,0.18)', 'rgba(255,255,255,0.18)', 'rgba(0,170,255,0.18)'];
    let t = 0;
    function project3D(x, y, z) {
      // Simple perspective projection
      const fov = 420;
      const scale = fov / (fov + z);
      return [width/2 + x * scale, height/2 + y * scale, scale];
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      // Animate 3 spheres in 3D orbits
      for (let i = 0; i < 3; i++) {
        // 3D orbital motion
        const angle = t + i * (Math.PI * 2 / 3);
        const x3d = Math.cos(angle) * 70;
        const y3d = Math.sin(angle * 0.7) * 70;
        const z3d = Math.sin(angle) * 120;
        const [x2d, y2d, scale] = project3D(x3d, y3d, z3d);
        const r = 54 * scale;
        // Draw soft shadow
        ctx.save();
        ctx.globalAlpha = 0.5 * scale;
        ctx.beginPath();
        ctx.ellipse(x2d, y2d + r * 0.7, r * 0.9, r * 0.25, 0, 0, Math.PI * 2);
        ctx.fillStyle = shadowColors[i];
        ctx.filter = 'blur(12px)';
        ctx.fill();
        ctx.restore();
        // Draw sphere with radial gradient
        const grad = ctx.createRadialGradient(x2d - r*0.25, y2d - r*0.25, r*0.2, x2d, y2d, r);
        grad.addColorStop(0, '#fff');
        grad.addColorStop(0.25, sphereColors[i]);
        grad.addColorStop(1, colorMode === 'light' ? '#fff0' : '#2228');
        ctx.save();
        ctx.globalAlpha = 0.92;
        ctx.beginPath();
        ctx.arc(x2d, y2d, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.shadowColor = sphereColors[i];
        ctx.shadowBlur = 24 * scale;
        ctx.fill();
        ctx.restore();
      }
      t += 0.012;
      requestAnimationFrame(draw);
    }
    let animId = requestAnimationFrame(draw);
    window.addEventListener('resize', setCanvasSize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [colorMode]);
  return (
    <Box w="100%" h="100%" position="absolute" top={0} left={0} zIndex={1}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block', borderRadius: 32 }}
      />
    </Box>
  );
}

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
              <MaterialYouBlobAnimation colorMode={colorMode} />
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
export { MaterialYouBlobAnimation }; 