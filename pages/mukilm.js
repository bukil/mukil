import React from 'react';
import { Box, Text, Heading, VStack, useColorMode } from '@chakra-ui/react';
import Layout from '../components/layouts/article';
import Section from '../components/section';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import Head from 'next/head';

const Mukilm = () => {
  const { colorMode } = useColorMode();

  return (
    <Layout title="Microinteraction Design">
      <Head>
        <title>Microinteraction Design - Mukil</title>
        <meta name="description" content="A class assignment exploring the art of microinteractions. Small, meaningful animations and transitions that enhance user experience." />
      </Head>
      
      {/* Back Button */}
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
            
            <VStack spacing={8} align="stretch" w="100%">
              <Text
                fontSize="xl"
                color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
                lineHeight="tall"
                textAlign="left"
                fontWeight={200}
                fontFamily="'Space Grotesk', 'Inter', 'sans-serif'"
              >
                This classroom assignment focused on exploring microinteractions the subtle feedback moments that make digital interfaces feel intuitive, responsive, and human. I chose to reimagine the familiar physical button as a no button approach, envisioning future-forward interactions that blur the line between software and hardware.
              </Text>
              
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
                  Long before Apple's iPhone 16 announcement introduced a similar solid-state input concept, I conceptualized a side-mounted capacitive slider that replaces mechanical volume and camera zoom buttons.
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
      </Box>
    </Layout>
  );
};

export default Mukilm;