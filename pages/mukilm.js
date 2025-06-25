import React from 'react';
import { Box, Text, Heading, VStack, useColorMode, Grid, GridItem, Button, HStack, SimpleGrid } from '@chakra-ui/react';
import Layout from '../components/layouts/article';
import Head from 'next/head';

const Mukilm = () => {
  const { colorMode } = useColorMode();

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
              <VStack align="flex-start" spacing={6} maxW="lg">
                <Heading as="h1" fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }} fontWeight="bold" lineHeight="1.1" color="black">
                  Microinteraction  <Box as="span" color="green.400">Design</Box>
                </Heading>
                <Text fontSize="lg" color="black">
                  This classroom assignment focused on exploring microinteractions the subtle feedback moments that make digital interfaces feel intuitive, responsive, and human. 
                  I chose to reimagine the familiar physical button as a no button approach, envisioning future-forward interactions that blur the line between software and hardware.
                </Text>
                <HStack spacing={4}>
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
                <Box bg="black" borderRadius="2xl" p={4} mt={4} w="60vw" mb={10}>
                  <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3}>
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
            <GridItem display="flex" alignItems="center" justifyContent="center">
              {/* Phone Mockup */}
              <Box
                w="280px"
                h="500px"
                bg="black"
                borderRadius="40px"
                position="relative"
                boxShadow="0 20px 40px rgba(0,0,0,0.3)"
                border="8px solid #333"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                {/* Screen */}
                <Box
                  w="100%"
                  h="100%"
                  bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  borderRadius="32px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                  overflow="hidden"
                >
                  {/* App Interface Mockup */}
                  <VStack spacing={4} color="white" textAlign="center">
                    <Box
                      w="60px"
                      h="60px"
                      bg="rgba(255,255,255,0.2)"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="2xl"
                    >
                      📱
                    </Box>
                    <Text fontSize="lg" fontWeight="bold">Microinteraction</Text>
                    <Text fontSize="sm" opacity={0.8}>Design Demo</Text>
                  </VStack>
                  
                  {/* Home Indicator */}
                  <Box
                    position="absolute"
                    bottom="8px"
                    left="50%"
                    transform="translateX(-50%)"
                    w="120px"
                    h="4px"
                    bg="rgba(255,255,255,0.3)"
                    borderRadius="2px"
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