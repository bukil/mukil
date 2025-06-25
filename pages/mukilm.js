import React, { useState } from 'react';
import { Box, Text, Heading, VStack, useColorMode, Grid, GridItem, Button, HStack, SimpleGrid } from '@chakra-ui/react';
import Layout from '../components/layouts/article';
import Head from 'next/head';

const Mukilm = () => {
  const { colorMode } = useColorMode();
  const [showHandHint, setShowHandHint] = useState(true);
  const [imageScale, setImageScale] = useState(1);

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
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={16} alignItems="center" w="100%">
            {/* Left Side: Text and Features */}
            <GridItem>
              <VStack align="flex-start" spacing={8} maxW="lg">
                <Heading as="h1" fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }} fontWeight="bold" lineHeight="1.1" color="black" mb={4}>
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
                <Box bg="black" borderRadius="2xl" p={6} mt={6} w="60vw" mb={12}>
                  <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
                    <Button size="sm" borderRadius="full" bg="black" color="white" _hover={{ bg: 'green.400', color: 'black' }}>UI/UX Design</Button>
                    <Button size="sm" borderRadius="full" bg="white" color="black" _hover={{ bg: 'green.400', color: 'white' }}>Web Design</Button>
                    <Button size="sm" borderRadius="full" bg="black" color="white" _hover={{ bg: 'green.400', color: 'black' }}>Social Media</Button>
                    <Button size="sm" borderRadius="full" bg="green.400" color="white" _hover={{ bg: 'black', color: 'green.400' }}>Mobile Apps</Button>
                    <Button size="sm" borderRadius="full" bg="black" color="white" _hover={{ bg: 'green.400', color: 'black' }}>E-commerce</Button>
                    <Button size="sm" borderRadius="full" bg="white" color="black" _hover={{ bg: 'green.400', color: 'white' }}>Analytics</Button>
                  </SimpleGrid>
                </Box>
                {/* User Count and Avatars */}
                {/* <HStack pt={4} spacing={6}>
                  <Box>
                    <Text fontWeight="bold" fontSize="2xl">5100+</Text>
                    <Text fontSize="sm" color="gray.500">New Users</Text>
                  </Box>
                  <HStack spacing={-2}>
                    <Box as="img" src="https://randomuser.me/api/portraits/men/32.jpg" boxSize="32px" borderRadius="full" border="2px solid white" />
                    <Box as="img" src="https://randomuser.me/api/portraits/women/44.jpg" boxSize="32px" borderRadius="full" border="2px solid white" />
                    <Box as="img" src="https://randomuser.me/api/portraits/men/45.jpg" boxSize="32px" borderRadius="full" border="2px solid white" />
                  </HStack>
                  <Button colorScheme="green" borderRadius="full" px={6} fontWeight="bold">Join now</Button>
                </HStack> */}
              </VStack>
            </GridItem>
            {/* Right Side: Image */}
            <GridItem display="flex" alignItems="center" justifyContent="center" position="relative">
              {/* Animated Green Blob */}
              <Box
                position="absolute"
                w="400px"
                h="400px"
                bg="green.400"
                borderRadius="50%"
                filter="blur(0px)"
                opacity="0.6"
                animation="fluidBlob 12s ease-in-out infinite"
                zIndex={0}
                sx={{
                  '@keyframes fluidBlob': {
                    '0%': {
                      transform: 'translate(0px, 0px) scale(1) rotate(0deg)',
                      borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%'
                    },
                    '25%': {
                      transform: 'translate(20px, -15px) scale(1.05) rotate(90deg)',
                      borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%'
                    },
                    '50%': {
                      transform: 'translate(-10px, 25px) scale(0.95) rotate(180deg)',
                      borderRadius: '33% 67% 58% 42% / 63% 68% 32% 37%'
                    },
                    '75%': {
                      transform: 'translate(-25px, -10px) scale(1.1) rotate(270deg)',
                      borderRadius: '25% 75% 47% 53% / 27% 73% 73% 27%'
                    },
                    '100%': {
                      transform: 'translate(0px, 0px) scale(1) rotate(360deg)',
                      borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%'
                    }
                  }
                }}
              />
              
              {/* Phone Mockup */}
              <Box
                w="280px"
                h="600px"
                bg="black"
                borderRadius="40px"
                position="relative"
                boxShadow="0 20px 40px rgba(0,0,0,0.3)"
                border="8px solid #333"
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
                      setImageScale(scale);
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
                    transform={`scale(${imageScale})`}
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
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Layout>
  );
};

export default Mukilm;