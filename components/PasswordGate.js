import React, { useState, useEffect, useRef } from 'react';
import { Box, Input, Button, Text, VStack } from '@chakra-ui/react';

const PASSWORD = 'sorte';
const STORAGE_KEY = 'site_password';

const RocketJourneySimulation = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    // Initialize stars
    const initStars = () => {
      const stars = [];
      const starCount = 250;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < starCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 30;
        stars.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          z: Math.random() * 1000,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 5 + 2,
          hue: Math.random() * 60 + 180,
          alpha: Math.random() * 0.5 + 0.5,
          type: Math.random() < 0.15 ? 'bright' : 'normal',
          angle: angle
        });
      }

      starsRef.current = stars;
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Draw star with glow
    const drawStar = (star) => {
      const x = star.x;
      const y = star.y;
      const size = star.size * (1000 / star.z);
      const alpha = star.alpha * (1000 / star.z);

      if (star.type === 'bright') {
        // Draw bright star with glare
        const gradient = ctx.createRadialGradient(
          x, y, 0,
          x, y, size * 4
        );
        gradient.addColorStop(0, `hsla(${star.hue}, 70%, 80%, ${alpha})`);
        gradient.addColorStop(0.5, `hsla(${star.hue}, 70%, 60%, ${alpha * 0.5})`);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw star rays
        ctx.beginPath();
        ctx.strokeStyle = `hsla(${star.hue}, 70%, 80%, ${alpha * 0.3})`;
        ctx.lineWidth = 1;
        for (let i = 0; i < 4; i++) {
          const rayAngle = (Math.PI / 2) * i;
          ctx.moveTo(x, y);
          ctx.lineTo(
            x + Math.cos(rayAngle) * size * 8,
            y + Math.sin(rayAngle) * size * 8
          );
        }
        ctx.stroke();
      }

      // Draw star core
      const coreGradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, size
      );
      coreGradient.addColorStop(0, `hsla(${star.hue}, 70%, 100%, ${alpha})`);
      coreGradient.addColorStop(1, `hsla(${star.hue}, 70%, 60%, ${alpha})`);

      ctx.beginPath();
      ctx.fillStyle = coreGradient;
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw space background with enhanced center brightness
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      );
      bgGradient.addColorStop(0, '#1a1a3a');
      bgGradient.addColorStop(0.3, '#0a0a2a');
      bgGradient.addColorStop(0.6, '#050520');
      bgGradient.addColorStop(1, '#000000');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add center glow
      const centerGlow = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, 200
      );
      centerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      centerGlow.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
      centerGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      starsRef.current.forEach((star) => {
        // Move star forward
        star.z -= star.speed;
        if (star.z < 1) {
          star.z = 1000;
          // Reset star to center with new random angle
          const angle = Math.random() * Math.PI * 2;
          star.angle = angle;
          star.x = canvas.width / 2 + Math.cos(angle) * 30;
          star.y = canvas.height / 2 + Math.sin(angle) * 30;
        }

        // Calculate perspective position
        const perspective = 1000 / star.z;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Move star outward from center
        const distance = 30 * perspective;
        star.x = centerX + Math.cos(star.angle) * distance;
        star.y = centerY + Math.sin(star.angle) * distance;

        // Draw star
        drawStar(star);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize and start animation
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: '#000000'
      }}
    />
  );
};

export default function PasswordGate({ children }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === PASSWORD) setUnlocked(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === PASSWORD) {
      setUnlocked(true);
      localStorage.setItem(STORAGE_KEY, PASSWORD);
    } else {
      setError('Incorrect password');
      setShowVideo(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(error => {
            console.error('Error playing video:', error);
            setShowVideo(false);
          });
        }
      }, 100);
    }
  };

  const handleVideoEnded = () => {
    setShowVideo(false);
    setInput('');
  };

  const handleVideoError = (e) => {
    console.error('Video error:', e);
    setShowVideo(false);
  };

  if (unlocked) return children;

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" position="relative">
      <RocketJourneySimulation />
      
      {/* SVG Filter for Glass Distortion */}
      <svg style={{ display: 'none', position: 'absolute' }}>
        <filter id="password-glass-distortion">
          <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
        </filter>
        <filter id="password-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </svg>
      
      {/* Glass Effect Container */}
      <Box
        position="relative"
        borderRadius="12px"
        p={8}
        mx="auto"
        maxW="400px"
        overflow="hidden"
        background="transparent"
        transition="transform 0.2s linear"
        _hover={{
          transform: 'scale(1.02)'
        }}
        zIndex={1}
      >
        {/* Glass Filter Layer */}
        <Box
          position="absolute"
          inset={0}
          borderRadius="inherit"
          zIndex={1}
          backdropFilter="blur(4px)"
          filter="url(#password-glass-distortion) saturate(120%) brightness(0.9)"
        />
        
        {/* Glass Overlay Layer */}
        <Box
          position="absolute"
          inset={0}
          borderRadius="inherit"
          zIndex={2}
          bg="rgba(255, 255, 255, 0)"
        />
        
        {/* White Gradient Overlay for Enhanced Glass Effect */}
        <Box
          position="absolute"
          inset={0}
          borderRadius="inherit"
          zIndex={3}
          bg="linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)"
        />
        
        {/* Glass Specular Layer */}
        <Box
          position="absolute"
          inset={0}
          borderRadius="inherit"
          zIndex={4}
          boxShadow="inset 1px 1px 1px rgba(255, 255, 255, 0.3)"
        />

        {/* Content Layer */}
        <Box
          position="relative"
          zIndex={5}
        >
          <VStack 
            as="form" 
            spacing={4} 
            onSubmit={handleSubmit} 
            bg="transparent"
            p={0}
            rounded="xl"
            border="none"
            zIndex={1}
            transition="all 0.3s ease"
          >
            <Text 
              fontSize="lg" 
              fontWeight="bold" 
              color="white"
              textShadow="0 2px 4px rgba(0, 0, 0, 0.3)"
            >
              website under construction hehehe :.| ....
            </Text>
            <Input
              type="password"
              value={input}
              onChange={e => { setInput(e.target.value); setError(''); }}
              placeholder="Password"
              autoFocus
              color="white"
              bg="rgba(255, 255, 255, 0.05)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              _placeholder={{ color: 'rgba(255, 255, 255, 0.5)' }}
              _hover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
              _focus={{ 
                borderColor: 'rgba(255, 255, 255, 0.3)',
                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.2)'
              }}
              transition="all 0.2s ease"
            />
            {error && (
              <Text 
                color="red.400" 
                textShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                animation="shake 0.5s ease-in-out"
              >
                {error}
              </Text>
            )}
            <Button 
              type="submit"
              width="full"
              bg="rgba(137, 239, 140, 0.1)"
              _hover={{ 
                bg: 'rgba(137, 239, 140, 0.2)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(137, 239, 140, 0.2)'
              }}
              _active={{
                transform: 'translateY(1px)',
                boxShadow: 'none'
              }}
              border="1px solid rgba(137, 239, 140, 0.3)"
              color="rgba(137, 239, 140, 0.9)"
              transition="all 0.2s ease"
            >
              Unlock
            </Button>
          </VStack>
        </Box>
      </Box>

      {showVideo && (
        <div 
          className="fixed bottom-0 right-0 z-50 flex items-end justify-end bg-black bg-opacity-90"
          style={{
            transform: 'rotate(-15deg)',
            width: '50%',
            height: '50%',
            overflow: 'hidden',
            margin: '2rem'
          }}
        >
          <video
            ref={videoRef}
            src="/rick.mp4"
            className="w-full h-full object-cover"
            style={{
              transform: 'rotate(15deg)',
            }}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            controls={false}
            autoPlay
          />
        </div>
      )}
    </Box>
  );
} 