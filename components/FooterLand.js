import { Box, useDisclosure, Text, VStack, Button } from "@chakra-ui/react";
import { useState } from "react";
import StandardModal from './ui/Modal';

const FooterLand = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isHovered, setIsHovered] = useState(false);

  const handleVideoClick = (e) => {
    e.preventDefault();
    window.open('https://www.youtube.com/watch?v=BAjxoooKDu4', '_blank', 'noopener,noreferrer');
  };

  return (
    <Box
      as="footer"
      width="100%"
      height="150px"
      zIndex={10}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        width="100%"
        height="150px"
        bottom="0"
        left="0"
        overflow="hidden"
      >
        {/* Parallax cloud, render first for lowest stacking */}
        <Box
          position="absolute"
          right="-220px"
          bottom="70px"
          width="220px"
          height="90px"
          backgroundImage="url('/cloud1.png')"
          backgroundSize="contain"
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
          zIndex={1}
          opacity={0.8}
          sx={{
            animation: 'cloudParallax 45s linear infinite',
            '@keyframes cloudParallax': {
              '0%': { right: '-220px' },
              '100%': { right: 'calc(100vw + 220px)' }
            }
          }}
        />
        {/* Second, faster cloud */}
        <Box
          position="absolute"
          right="-200px"
          bottom="85px"
          width="200px"
          height="90px"
          backgroundImage="url('/cloud2.png')"
          backgroundSize="contain"
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
          zIndex={1}
          opacity={1}
          sx={{
            animation: 'cloud2Parallax 25s linear infinite',
            '@keyframes cloud2Parallax': {
              '0%': { right: '-200px' },
              '100%': { right: 'calc(100vw + 200px)' }
            }
          }}
        />
        <Box
          position="absolute"
          width="8000px"
          height="150px"
          bottom="0"
          left="0"
          display="flex"
          zIndex={5}
          sx={{
            animation: 'scrollLand 20s linear infinite',
            '@keyframes scrollLand': {
              '0%': {
                transform: 'translateX(0)'
              },
              '100%': {
                transform: 'translateX(-4000px)'
              }
            }
          }}
        >
          <Box
            width="4000px"
            height="150px"
            backgroundImage="url('/Footer_NG.png')"
            backgroundSize="4000px 150px"
            backgroundPosition="bottom"
            backgroundRepeat="no-repeat"
            flexShrink={0}
          />
          <Box
            width="4000px"
            height="150px"
            backgroundImage="url('/Footer_NG.png')"
            backgroundSize="4000px 150px"
            backgroundPosition="bottom"
            backgroundRepeat="no-repeat"
            flexShrink={0}
          />
        </Box>
      </Box>
      <Box
        position="absolute"
        left="80px"
        bottom="8"
        width="50px"
        height="50px"
        backgroundImage="url('/ryu.gif')"
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        zIndex={11}
        cursor="pointer"
        onClick={onOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transition="transform 0.2s ease-in-out"
        transform={isHovered ? 'scale(1.1)' : 'scale(1)'}
      />

      <StandardModal isOpen={isOpen} onClose={onClose} title="Ninja Gaiden Inspiration" size="2xl" maxW="700px" w="100vw">
        <VStack spacing={6} align="stretch">
          <Text color="white" fontSize="md" lineHeight="1.6" textShadow="0 2px 4px rgba(0,0,0,0.3)">
            The infinite scrolling landscape at the bottom of my portfolio is inspired by the iconic Ninja Gaiden series, particularly the character Ryu Hayabusa. This subtle homage represents my journey in design and technology - continuous, determined, and always moving forward.
          </Text>
          <Text color="white" fontSize="md" lineHeight="1.6" textShadow="0 2px 4px rgba(0,0,0,0.3)">
            The theme &quot;Unbreakable Determination&quot; from Ninja Gaiden perfectly encapsulates my approach to design and development. Just as Ryu faces endless challenges with unwavering resolve, I believe in pushing through obstacles to create meaningful digital experiences.
          </Text>
          <Text color="white" fontSize="md" lineHeight="1.6" textShadow="0 2px 4px rgba(0,0,0,0.3)">
            The running animation of Ryu in the corner is a playful reminder that in the world of design and technology, we must keep moving, keep learning, and keep creating - just like a true ninja warrior.
          </Text>
          <VStack spacing={6} align="stretch">
            <Text color="white" fontSize="md" lineHeight="1.6" textShadow="0 2px 4px rgba(0,0,0,0.3)">
              The animation was created using Aseprite, a powerful pixel art tool. Here&apos;s a glimpse into the process:
            </Text>
            <Box>
              <Text color="white" fontSize="lg" fontWeight="bold" mb={4}>Character Animation Process</Text>
              <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={6}>
                <Box>
                  <Text color="white" fontSize="sm" mb={2} fontWeight="medium">1. Initial Frame Setup</Text>
                  <Box
                    as="img"
                    src="/mukil/NG0.jpeg"
                    alt="Aseprite Frame Background Frame Setup"
                    width="100%"
                    height="200px"
                    objectFit="cover"
                    borderRadius="md"
                    border="1px solid rgba(255,255,255,0.1)"
                    boxShadow="0 4px 12px rgba(0,0,0,0.2)"
                  />
                </Box>
                <Box>
                  <Text color="white" fontSize="sm" mb={2} fontWeight="medium">2. Aseprite Ryu Running in 12 FPS</Text>
                  <Text color="white" fontSize="xs" mb={2} opacity={0.8}>Enhanced version of the original which is 3 Frames with static clothing and low physics</Text>
                  <Box
                    as="img"
                    src="/mukil/NG1.jpeg"
                    alt="Aseprite Ryu Running in 12 FPS enhanced version"
                    width="100%"
                    height="200px"
                    objectFit="cover"
                    borderRadius="md"
                    border="1px solid rgba(255,255,255,0.1)"
                    boxShadow="0 4px 12px rgba(0,0,0,0.2)"
                  />
                </Box>
              </Box>
            </Box>

            <Box>
              <Text color="white" fontSize="lg" fontWeight="bold" mb={4}>Background & Implementation</Text>
              <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={6}>
                <Box>
                  <Text color="white" fontSize="sm" mb={2} fontWeight="medium">3. Footer City Pixel Art</Text>
                  <Box
                    as="img"
                    src="/mukil/NG2.jpeg"
                    alt="Footer City Pixel Art"
                    width="100%"
                    height="200px"
                    objectFit="cover"
                    borderRadius="md"
                    border="1px solid rgba(255,255,255,0.1)"
                    boxShadow="0 4px 12px rgba(0,0,0,0.2)"
                  />
                </Box>
                <Box>
                  <Text color="white" fontSize="sm" mb={2} fontWeight="medium">4. Animation Implementation</Text>
                  <Text color="white" fontSize="xs" mb={2} opacity={0.8}>Code for the animation, here I use single image for the animation in the loop</Text>
                  <Box
                    as="img"
                    src="/mukil/NG3.jpeg"
                    alt="Code for the animation implementation"
                    width="100%"
                    height="200px"
                    objectFit="cover"
                    borderRadius="md"
                    border="1px solid rgba(255,255,255,0.1)"
                    boxShadow="0 4px 12px rgba(0,0,0,0.2)"
                  />
                </Box>
              </Box>
            </Box>
          </VStack>
          <Button
            onClick={handleVideoClick}
            bg="rgba(255, 255, 255, 0.15)"
            color="#90cdf4"
            _hover={{
              bg: 'rgba(255, 255, 255, 0.25)',
              transform: 'scale(1.05)',
            }}
            _active={{
              bg: 'rgba(255, 255, 255, 0.2)',
            }}
            transition="all 0.2s ease-in-out"
            size="lg"
            width="100%"
            borderRadius="md"
            fontWeight="medium"
            backdropFilter="blur(4px)"
            border="1px solid rgba(255, 255, 255, 0.1)"
          >
            Listen to &quot;Unbreakable Determination&quot; Theme
          </Button>
        </VStack>
      </StandardModal>
    </Box>
  );
};

export default FooterLand;
