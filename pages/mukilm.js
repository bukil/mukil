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
      
      {/* Back Button
      <Box position="fixed" top="100px" left="20px" zIndex={100}>
        <NextLink href="/works" passHref legacyBehavior>
          <Box
            as="a"
            display="flex"
            alignItems="center"
            gap={2}
            px={4}
            py={2}
            bg={colorMode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'}
            backdropFilter="blur(10px)"
            borderRadius="full"
            border="1px solid"
            borderColor={colorMode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}
            color={colorMode === 'light' ? 'gray.800' : 'white'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg'
            }}
            transition="all 0.3s ease"
            cursor="pointer"
          >
            <ChevronLeftIcon />
            <Text fontSize="sm" fontWeight="medium">Back to Works</Text>
          </Box>
        </NextLink>
      </Box>

      {/* Main Content */}
{/*       
      <Box w="100%" position="relative">
        <Section>
          <VStack spacing={12} textAlign="center" w="100%">
            <Heading
              as="h1"
              fontSize="7xl"
              fontWeight="hairline"
              bgGradient="linear(to-r, #ff6b6b, #feca57, #48dbfb, #ff9ff3)"
              bgClip="text"
              fontFamily="Helvetica, Arial, sans-serif"
              letterSpacing="0.2em"
              textTransform="uppercase"
              textShadow="0 4px 8px rgba(0,0,0,0.3)"
              sx={{
                WebkitTextStroke: '1px rgba(255,255,255,0.1)',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                fontWeight: '900',
                fontStretch: 'expanded',
                fontStyle: 'italic'
              }}
            >
              MICROINTERACTION DESIGN
            </Heading>
             */}
            {/* <VStack spacing={8} align="stretch" w="100%">
              <Text
                fontSize="xl"
                color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
                lineHeight="tall"
                textAlign="left"
                fontWeight={200}
                fontFamily="'Space Grotesk', 'Inter', 'sans-serif'"
              >
                This classroom assignment focused on exploring microinteractions the subtle feedback moments that make digital interfaces feel intuitive, responsive, and human.
              </Text>
               */}
              {/* 2-Row Grid System */}
              {/* <Box w="100%" position="relative" mt={8}>
                <Grid
                  templateRows="repeat(1, 1fr)"
                  gap={8}
                  h="60vh"
                  w="100%"
                  p={4}
                > */}
                  {/* First Row */}
                  {/* <GridItem>
                    <Grid templateColumns="repeat(2, 1fr)" gap={8} h="100%">
                      <GridItem 
                        bg={colorMode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'}
                        backdropFilter="blur(10px)"
                        borderRadius="xl"
                        p={8}
                        border="1px solid"
                        borderColor={colorMode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <VStack spacing={4} textAlign="center">
                          <Heading as="h3" size="lg" color={colorMode === 'light' ? 'gray.800' : 'white'}>
                            Row 1 - Column 1
                          </Heading>
                          <Text
                            fontSize="md"
                            color={colorMode === 'light' ? 'gray.700' : 'gray.200'}
                            lineHeight="tall"
                          >
                            First row, first column content goes here.
                          </Text>
                        </VStack>
                      </GridItem>
                      
                      <GridItem 
                        bg={colorMode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'}
                        backdropFilter="blur(10px)"
                        borderRadius="xl"
                        p={8}
                        border="1px solid"
                        borderColor={colorMode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <VStack spacing={4} textAlign="center">
                          <Heading as="h3" size="lg" color={colorMode === 'light' ? 'gray.800' : 'white'}>
                            Row 1 - Column 2
                          </Heading>
                          <Text
                            fontSize="md"
                            color={colorMode === 'light' ? 'gray.700' : 'gray.200'}
                            lineHeight="tall"
                          >
                            First row, second column content goes here.
                          </Text>
                        </VStack>
                      </GridItem>
                    </Grid>
                  </GridItem>

                 
                      
                      
                </Grid>
              </Box>
              
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
            </VStack>
          </VStack>
        </Section>
      </Box> */}

      {/* Modern Marketing Hero Section */}
      <Box
        w="80vw"
        minH="80vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg={colorMode === 'light' ? '#f6fcf9' : 'gray.800'}
        position="relative"
        overflow="hidden"
        transform="translateX(-20vw)"
        transition="transform 0.4s cubic-bezier(.4,2,.3,1)"
        borderRadius="2xl"
        boxShadow="lg"
        pt={10}
      >
        <Grid templateColumns={{ base: '1fr', md: '1.1fr 1fr' }} gap={24} alignItems="center">
          {/* Left Side: Text and Features */}
          <GridItem>
            <VStack align="flex-start" spacing={6} maxW="lg">
              <Heading as="h1" fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }} fontWeight="bold" lineHeight="1.1">
                Microinteraction  <Box as="span" color="green.400">Design</Box>
              </Heading>
              <Text fontSize="lg" color={colorMode === 'light' ? 'gray.600' : 'gray.300'}>
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
            <Box
              overflow="hidden"
              bg="green.300"
              w={{ base: '100%', md: '380px', lg: '450px' }}
              h={{ base: '320px', md: '450px', lg: '550px' }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              border="6px solid #38A169"
              boxShadow="0 12px 48px 0 rgba(34,139,34,0.18), 0 2px 16px 0 rgba(0,0,0,0.10)"
              borderRadius="60% 40% 50% 70%/60% 30% 70% 40%"
            >
              <Box
                as="img"
                src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=600&q=80"
                alt="VR Woman"
                w="100%"
                h="100%"
                objectFit="cover"
                borderRadius="60% 40% 50% 70%/60% 30% 70% 40%"
              />
            </Box>
          </GridItem>
        </Grid>
        {/* Decorative Circle Badge */}
        <Box
          position="absolute"
          top={{ base: '10%', md: '8%' }}
          left={{ base: '60%', md: '54%' }}
          bg="#1a202c"
          color="white"
          borderRadius="full"
          px={4}
          py={2}
          fontSize="sm"
          fontWeight="bold"
          transform="rotate(-18deg)"
          boxShadow="md"
        >
          DISCOVER THE MAGIC
        </Box>
      </Box>
    </Layout>
  );
};

export default Mukilm;