import React, { useState } from 'react';
import { Box, Text, Heading, VStack, useColorMode, Grid, GridItem, Button, HStack, SimpleGrid } from '@chakra-ui/react';
import Layout from '../components/layouts/article';
import Head from 'next/head';

const Mukilm = () => {
  const { colorMode } = useColorMode();
  const [showHandHint, setShowHandHint] = useState(true);
  const [leftImageScale, setLeftImageScale] = useState(1);
  const [rightImageScale, setRightImageScale] = useState(1);
  const [volume, setVolume] = useState(50);
  const [isSliding, setIsSliding] = useState(false);
  const [showHand, setShowHand] = useState(true);

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    console.log('Volume changed to:', newVolume);
    setVolume(newVolume);
    setIsSliding(true);
    setShowHand(false);
    
    // Reset sliding state after a short delay
    setTimeout(() => setIsSliding(false), 200);
  };

  const handleVolumeClick = () => {
    setShowHand(false);
  };

  // Calculate volume UI opacity for right phone
  const rightPhoneVolumeOpacity = volume / 100;

  const handleMouseMove = (moveEvent) => {
    const rect = volumeBar.getBoundingClientRect();
    const relativeY = moveEvent.clientY - rect.top;
    const percentage = Math.max(0, Math.min(100, (relativeY / rect.height) * 100));
    
    // Calculate zoom scale based on volume position
    const minScale = 1;
    const maxScale = 3;
    const scale = minScale + (percentage / 100) * (maxScale - minScale);
    console.log('Left phone zoom scale:', scale);
    setLeftImageScale(scale);
  };

  return (
    <Layout title="Microinteraction Design">
      <Head>
        <title>Microinteraction Design - Mukil</title>
        <meta name="description" content="A class assignment exploring the art of microinteractions. Small, meaningful animations and transitions that enhance user experience." />
      </Head>
      
      {/* Centered container with reduced width */}
      <Box w="100%" minH="100vh" display="flex" alignItems="center" justifyContent="center" overflow="hidden">
        {/* Modern Marketing Hero Section */}
        <Box
          w={{ base: "95%", md: "90%", lg: "80%", xl: "1600px" }}
          minH="90vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg={colorMode === 'light' ? '#f6fcf9' : '#f0fff4'}
          position="relative"
          overflow="hidden"
          borderRadius="2xl"
          boxShadow="lg"
          p={8}
        >
          {/* Project Info Top Right */}
          <Box position="absolute" top={6} right={8} zIndex={20} textAlign="right">
            <Text fontSize="sm" color="gray.600" fontWeight="medium">Project: Class Assignment</Text>
            <Text fontSize="sm" color="gray.600">Contribution: Individual</Text>
            <Text fontSize="sm" color="gray.600">Time: 2.5 hours</Text>
          </Box>
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={16} alignItems="center" w="100%">
            {/* Left Side: Text and Features */}
            <GridItem>
              <VStack align="flex-start" spacing={8} maxW="lg">
                <Heading as="h1" fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }} fontWeight="bold" lineHeight="1.1" color="black" mb={100}>
                  Microinteraction  <Box as="span" color="green.400">Design</Box>
                </Heading>
                <Text fontSize="lg" color="black" mb={6}>
                  This classroom assignment focused on exploring microinteractions the subtle feedback moments that make digital interfaces feel intuitive, responsive, and human. 
                  I chose to reimagine the familiar physical button as a no button approach, envisioning future-forward interactions that blur the line between software and hardware.
                </Text>
                <HStack spacing={4} mb={8}>
                <Box
                  bg={colorMode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'}
                  backdropFilter="blur(10px)"
                  borderRadius="xl"
                  p={8}
                  border="1px solid"
                  borderColor={colorMode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}
                >
                  <Heading as="h2" size="md" mb={4} color={colorMode === 'light' ? 'gray.800' : 'white'}>
                    Project Concept
                  </Heading>
                  <Text
                    fontSize="md"
                    color={colorMode === 'light' ? 'gray.700' : 'gray.200'}
                    lineHeight="tall"
                    textAlign="left"
                  >
                    Long before Apple&apos;s iPhone 16 announcement introduced a similar solid-state input concept, I conceptualized a side-mounted capacitive slider that replaces mechanical volume and camera zoom buttons.
                  </Text>
                  <Text
                    fontSize="md"
                    color={colorMode === 'light' ? 'gray.700' : 'gray.200'}
                    lineHeight="tall"
                    textAlign="left"
                    mt={4}
                  >
                    The core idea was to eliminate physical buttons on the sides of devices and replace them with context-aware, touch-sensitive zones. The slider gives haptic feedback, and adapts to different modes.
                  </Text>
                </Box>
                </HStack>
                {/* Feature Grid */}
                <Box 
                  bgGradient="linear(to-b, black, green.600)"
                  borderRadius="2xl" 
                  p={6} 
                  mt={6} 
                  w="30vw" 
                  mb={12}
                >
                  <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4} justifyItems="center">
                    <Button size="sm" borderRadius="full" bg="black" color="white" _hover={{ bg: 'green.400', color: 'black' }}>Hover Effects</Button>
                    <Button size="sm" borderRadius="full" bg="white" color="black" _hover={{ bg: 'green.400', color: 'white' }}>Transitions</Button>
                    <Button size="sm" borderRadius="full" bg="black" color="white" _hover={{ bg: 'green.400', color: 'black' }}>Feedback</Button>
                    <Button size="sm" borderRadius="full" bg="green.400" color="white" _hover={{ bg: 'black', color: 'green.400' }}>Animations</Button>
                    <Button size="sm" borderRadius="full" bg="black" color="white" _hover={{ bg: 'green.400', color: 'black' }}>Gestures</Button>
                    <Button size="sm" borderRadius="full" bg="white" color="black" _hover={{ bg: 'green.400', color: 'white' }}>States</Button>
                  </SimpleGrid>
                </Box>
              </VStack>
            </GridItem>
            {/* Right Side: Image */}
            <GridItem display="flex" alignItems="center" justifyContent="center" position="relative">
              {/* Animated Green Blob */}
              <Box
                position="absolute"
                w="800px"
                h="500px"
                bg="green.400"
                borderRadius="50%"
                filter="blur(0px)"
                opacity="0.6"
                zIndex={0}
                animation="fluidBlob 20s linear infinite"
                sx={{
                  '@keyframes fluidBlob': {
                    '0%': {
                      transform: 'translate(0px, 0px) scale(1) rotate(0deg)',
                      borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
                    },
                    '8%': {
                      transform: 'translate(15px, -10px) scale(1.02) rotate(29deg)',
                      borderRadius: '45% 55% 40% 60% / 50% 40% 60% 50%'
                    },
                    '16%': {
                      transform: 'translate(25px, 5px) scale(0.98) rotate(58deg)',
                      borderRadius: '35% 65% 50% 50% / 40% 50% 50% 60%'
                    },
                    '24%': {
                      transform: 'translate(10px, 20px) scale(1.05) rotate(87deg)',
                      borderRadius: '25% 75% 60% 40% / 30% 60% 40% 70%'
                    },
                    '32%': {
                      transform: 'translate(-5px, 15px) scale(0.95) rotate(116deg)',
                      borderRadius: '40% 60% 35% 65% / 45% 35% 65% 55%'
                    },
                    '40%': {
                      transform: 'translate(-20px, -5px) scale(1.03) rotate(144deg)',
                      borderRadius: '55% 45% 25% 75% / 55% 25% 75% 45%'
                    },
                    '48%': {
                      transform: 'translate(-15px, -20px) scale(0.97) rotate(173deg)',
                      borderRadius: '70% 30% 20% 80% / 70% 20% 80% 30%'
                    },
                    '56%': {
                      transform: 'translate(5px, -15px) scale(1.04) rotate(202deg)',
                      borderRadius: '50% 50% 30% 70% / 50% 30% 70% 50%'
                    },
                    '64%': {
                      transform: 'translate(20px, 10px) scale(0.96) rotate(231deg)',
                      borderRadius: '30% 70% 45% 55% / 35% 45% 55% 65%'
                    },
                    '72%': {
                      transform: 'translate(15px, 25px) scale(1.01) rotate(260deg)',
                      borderRadius: '45% 55% 35% 65% / 40% 35% 65% 60%'
                    },
                    '80%': {
                      transform: 'translate(-10px, 20px) scale(0.99) rotate(289deg)',
                      borderRadius: '65% 35% 25% 75% / 65% 25% 75% 35%'
                    },
                    '88%': {
                      transform: 'translate(-25px, 5px) scale(1.02) rotate(318deg)',
                      borderRadius: '40% 60% 45% 55% / 40% 45% 55% 60%'
                    },
                    '96%': {
                      transform: 'translate(-5px, -10px) scale(0.98) rotate(347deg)',
                      borderRadius: '55% 45% 30% 70% / 55% 30% 70% 45%'
                    },
                    '100%': {
                      transform: 'translate(0px, 0px) scale(1) rotate(360deg)',
                      borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
                    }
                  }
                }}
              />
              
              {/* Phone Mockup */}
              <Box
                w="280px"
                h="600px"
                bg="gray.200"
                borderRadius="40px"
                position="relative"
                boxShadow="0 25px 50px rgba(0,0,0,0.4), 0 10px 20px rgba(0,0,0,0.3), inset 0 1px 3px rgba(255,255,255,0.5)"
                border="8px solid #e2e8f0"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                zIndex={1}
              >
                {/* Side Volume Button - Invisible larger clickable area */}
                <Box
                  position="absolute"
                  right="-15"
                  top="110px"
                  w="30px"
                  h="140px"
                  zIndex={2}
                  cursor="pointer"
                  onClick={() => setShowHandHint(false)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    const volumeBar = e.currentTarget;
                    
                    const handleMouseMove = (moveEvent) => {
                      const rect = volumeBar.getBoundingClientRect();
                      const relativeY = moveEvent.clientY - rect.top;
                      const percentage = Math.max(0, Math.min(100, (relativeY / rect.height) * 100));
                      
                      // Calculate zoom scale based on volume position
                      const minScale = 1;
                      const maxScale = 3;
                      const scale = minScale + (percentage / 100) * (maxScale - minScale);
                      console.log('Left phone zoom scale:', scale);
                      setLeftImageScale(scale);
                    };
                    
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                />
                
                {/* Visual Volume Bar - Thin appearance */}
                <Box
                  position="absolute"
                  right="-3"
                  top="120px"
                  w="8px"
                  h="120px"
                  borderRadius="4px"
                  boxShadow="inset 0 2px 4px rgb(0, 0, 0), inset 0 -2px 4px rgba(255, 255, 255, 0.33)"
                  zIndex={1}
                  pointerEvents="none"
                />
                
                {/* Hand Image on Volume Bar */}
                {showHandHint && (
                  <Box
                    position="absolute"
                    right="-15px"
                    top="120px"
                    w="30px"
                    h="30px"
                    bgImage="url('/cursor_hand.png')"
                    bgSize="contain"
                    bgRepeat="no-repeat"
                    bgPosition="center"
                    zIndex={3}
                    animation="slideHand 3s ease-in-out infinite"
                    sx={{
                      '@keyframes slideHand': {
                        '0%': { transform: 'translateY(0px)' },
                        '50%': { transform: 'translateY(90px)' },
                        '100%': { transform: 'translateY(0px)' }
                      }
                    }}
                  />
                )}
                
                {/* Screen */}
                <Box
                  w="100%"
                  h="100%"
                  bg="transparent"
                  borderRadius="32px"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="space-between"
                  position="relative"
                  overflow="hidden"
                  p={4}
                  data-phone-screen
                >
                  {/* Full Screen Camera Image */}
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="100%"
                    h="100%"
                    bgImage="url('/images/works/Space.jpg')"
                    bgSize="cover"
                    bgPosition="center"
                    bgRepeat="no-repeat"
                    zIndex={0}
                    transform={`scale(${leftImageScale})`}
                    transition="transform 0.1s ease-out"
                  />
                  
                  {/* Line Above Camera Controls */}
                  <Box
                    position="absolute"
                    bottom="150px"
                    left="0"
                    right="0"
                    h="1px"
                    bg="rgba(255,255,255,0.4)"
                    zIndex={3}
                  />
                  
                  {/* Camera Controls - Bottom Side */}
                  <Box
                    position="absolute"
                    bottom="60px"
                    left="0"
                    right="0"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    px={8}
                    zIndex={3}
                  >
                    {/* Left Control */}
                    <Box
                      w="40px"
                      h="70px"
                      bg="transparent"
                      borderRadius="full"
                      border="1px solid rgba(255,255,255,0.5)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                      _hover={{ borderColor: 'rgba(255,255,255,0.8)' }}
                      transition="border-color 0.2s"
                    />
                    
                    {/* Shutter Button */}
                    <Box
                      w="60px"
                      h="60px"
                      bg="transparent"
                      borderRadius="full"
                      border="2px solid rgba(255,255,255,0.6)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                      _hover={{ borderColor: 'rgba(255,255,255,1)', transform: 'scale(1.05)' }}
                      _active={{ 
                        transform: 'scale(0.95)',
                        borderColor: 'rgba(255,255,255,1)',
                        bg: 'rgba(255,255,255,0.1)'
                      }}
                      transition="all 0.1s"
                      onClick={() => {
                        // Create flash effect inside phone screen
                        const phoneScreen = document.querySelector('[data-phone-screen]');
                        if (phoneScreen) {
                          const flash = document.createElement('div');
                          flash.style.position = 'absolute';
                          flash.style.top = '0';
                          flash.style.left = '0';
                          flash.style.width = '100%';
                          flash.style.height = '100%';
                          flash.style.backgroundColor = 'rgba(255,255,255,0.4)';
                          flash.style.zIndex = '5';
                          flash.style.pointerEvents = 'none';
                          flash.style.transition = 'opacity 0.3s ease-out';
                          flash.style.borderRadius = '32px';
                          
                          phoneScreen.appendChild(flash);
                          
                          // Animate flash
                          setTimeout(() => {
                            flash.style.opacity = '0';
                          }, 50);
                          
                          // Remove flash element
                          setTimeout(() => {
                            if (phoneScreen.contains(flash)) {
                              phoneScreen.removeChild(flash);
                            }
                          }, 350);
                        }
                      }}
                    >
                      <Box
                        w="50px"
                        h="50px"
                        bg="transparent"
                        borderRadius="full"
                        border="1px solid rgba(255,255,255,0.4)"
                      />
                    </Box>
                    
                    {/* Right Control */}
                    <Box
                      w="40px"
                      h="70px"
                      bg="transparent"
                      borderRadius="full"
                      border="1px solid rgba(255,255,255,0.5)"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                      _hover={{ borderColor: 'rgba(255,255,255,0.8)' }}
                      transition="border-color 0.2s"
                    />
                  </Box>
                  
                  {/* Home Indicator */}
                  <Box
                    position="absolute"
                    bottom="8px"
                    left="50%"
                    transform="translateX(-50%)"
                    w="120px"
                    h="4px"
                    bg="rgba(255,255,255,0.5)"
                    borderRadius="2px"
                    zIndex={3}
                  />
                </Box>
                
                {/* Camera Notch */}
                <Box
                  position="absolute"
                  top="12px"
                  left="50%"
                  transform="translateX(-50%)"
                  w="120px"
                  h="6px"
                  bg="black"
                  borderRadius="3px"
                  zIndex={2}
                />
              </Box>
              
              {/* Duplicate Phone Mockup - Right Side */}
              <Box
                w="280px"
                h="600px"
                bg="gray.200"
                borderRadius="40px"
                position="relative"
                boxShadow="0 25px 50px rgba(0,0,0,0.4), 0 10px 20px rgba(0,0,0,0.3), inset 0 1px 3px rgba(255,255,255,0.5)"
                border="8px solid #e2e8f0"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                zIndex={1}
                ml={32}
              >
                {/* Side Volume Button - Invisible larger clickable area */}
                <Box
                  position="absolute"
                  right="-15"
                  top="110px"
                  w="30px"
                  h="140px"
                  zIndex={2}
                  cursor="pointer"
                  onClick={handleVolumeClick}
                >
                  {/* Volume Slider */}
                  <Box
                    as="input"
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    position="absolute"
                    top="-10px"
                    left="-8px"
                    width="30px"
                    height="120px"
                    opacity="0"
                    cursor="pointer"
                    style={{
                      writingMode: 'bt-lr',
                      WebkitAppearance: 'slider-vertical'
                    }}
                  />
                </Box>
                
                {/* Visual Volume Bar - Thin appearance */}
                <Box
                  position="absolute"
                  right="-3"
                  top="120px"
                  w="8px"
                  h="120px"
                  borderRadius="4px"
                  boxShadow="inset 0 2px 4px rgb(0, 0, 0), inset 0 -2px 4px rgba(255, 255, 255, 0.33)"
                  zIndex={1}
                  pointerEvents="none"
                />
                
                {/* Hand Image on Volume Bar */}
                {showHandHint && (
                  <Box
                    position="absolute"
                    right="-15px"
                    top="120px"
                    w="30px"
                    h="30px"
                    bgImage="url('/cursor_hand.png')"
                    bgSize="contain"
                    bgRepeat="no-repeat"
                    bgPosition="center"
                    zIndex={3}
                    animation="slideHand 3s ease-in-out infinite"
                    sx={{
                      '@keyframes slideHand': {
                        '0%': { transform: 'translateY(0px)' },
                        '50%': { transform: 'translateY(90px)' },
                        '100%': { transform: 'translateY(0px)' }
                      }
                    }}
                  />
                )}
                
                {/* Screen */}
                <Box
                  w="100%"
                  h="100%"
                  bg="transparent"
                  borderRadius="32px"
                  position="relative"
                  overflow="hidden"
                  p={4}
                  data-phone-screen-2
                >
                  {/* Full Screen Camera Image */}
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="100%"
                    h="100%"
                    bgImage="url('/images/works/aih.png')"
                    bgSize="cover"
                    bgPosition="center"
                    bgRepeat="no-repeat"
                    zIndex={0}
                    transform="scale(1)"
                    transition="transform 0.1s ease-out"
                  />
                  
                  {/* Volume UI Overlay */}
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    bg="rgba(255, 255, 255, 0.9)"
                    borderRadius="full"
                    p={3}
                    opacity={1}
                    transition="opacity 0.3s ease"
                    pointerEvents="none"
                    zIndex={3}
                    boxShadow="0 4px 20px rgba(0,0,0,0.3)"
                  >
                    <VStack spacing={2} align="center">
                      {/* Volume Fill Bar */}
                      <Box
                        w="8px"
                        h="40px"
                        bg="rgba(0,0,0,0.1)"
                        borderRadius="full"
                        position="relative"
                        overflow="hidden"
                      >
                        <Box
                          position="absolute"
                          bottom="0"
                          left="0"
                          right="0"
                          bg="green.400"
                          borderRadius="full"
                          transition="height 0.3s ease"
                          height={`${volume}%`}
                        />
                      </Box>
                      <Text color="black" fontSize="xs" fontWeight="bold">
                        {volume}%
                      </Text>
                    </VStack>
                  </Box>
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default Mukilm;