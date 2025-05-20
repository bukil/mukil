import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Text, VStack, Center, Button } from "@chakra-ui/react";
import { useState } from "react";

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
      width="100vw"
      height="150px"
      zIndex={10}
      position="relative"
      left="50%"
      right="50%"
      marginLeft="-50vw"
      marginRight="-50vw"
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
        <Box
          position="absolute"
          width="8000px"
          height="150px"
          bottom="0"
          left="0"
          display="flex"
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

      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        size="md" 
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay 
          bg="blackAlpha.400"
          backdropFilter="blur(8px)"
        />
        <Center>
          <ModalContent 
            mx={4}
            bg="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(12px)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            borderRadius="xl"
            boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
            maxW="600px"
            w="90%"
            sx={{
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 'xl',
                padding: '1px',
                background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }
            }}
          >
            <ModalHeader 
              textAlign="center"
              color="white"
              fontWeight="bold"
              fontSize="xl"
              borderBottom="1px solid rgba(255,255,255,0.1)"
              pb={4}
            >
              Ninja Gaiden Inspiration
            </ModalHeader>
            <ModalCloseButton 
              color="white" 
              _hover={{ bg: 'rgba(255,255,255,0.1)' }}
              borderRadius="full"
            />
            <ModalBody py={6}>
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
            </ModalBody>
          </ModalContent>
        </Center>
      </Modal>
    </Box>
  );
};

export default FooterLand;
