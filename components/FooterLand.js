import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Text, VStack, Center } from "@chakra-ui/react";

const FooterLand = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        width="400%"
        height="100%"
        display="flex"
        bottom="0"
        sx={{
          animation: 'scrollLand 40s linear infinite',
          '@keyframes scrollLand': {
            '0%': {
              transform: 'translate3d(0, 0, 0)'
            },
            '100%': {
              transform: 'translate3d(-75%, 0, 0)'
            }
          }
        }}
      >
        <Box
          width="25%"
          height="100%"
          backgroundImage="url('/Footer_NG.png')"
          backgroundSize="contain"
          backgroundPosition="bottom center"
          backgroundRepeat="no-repeat"
          willChange="transform"
        />
        <Box
          width="25%"
          height="100%"
          backgroundImage="url('/Footer_NG.png')"
          backgroundSize="contain"
          backgroundPosition="bottom center"
          backgroundRepeat="no-repeat"
          willChange="transform"
        />
        <Box
          width="25%"
          height="100%"
          backgroundImage="url('/Footer_NG.png')"
          backgroundSize="contain"
          backgroundPosition="bottom center"
          backgroundRepeat="no-repeat"
          willChange="transform"
        />
        <Box
          width="25%"
          height="100%"
          backgroundImage="url('/Footer_NG.png')"
          backgroundSize="contain"
          backgroundPosition="bottom center"
          backgroundRepeat="no-repeat"
          willChange="transform"
        />
      </Box>
      <Box
        position="absolute"
        left="80px"
        bottom="5"
        width="50px"
        height="50px"
        backgroundImage="url('/ryu.gif')"
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        zIndex={11}
        cursor="pointer"
        onClick={onOpen}
        _hover={{
          transform: 'scale(1.1)',
          transition: 'transform 0.2s ease-in-out'
        }}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
        <ModalOverlay bg="blackAlpha.300" />
        <Center>
          <ModalContent 
            mx={4}
            bg="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(20px)"
            border="1px solid rgba(255, 255, 255, 0.2)"
            borderRadius="xl"
            boxShadow="0 8px 32px 0 rgba(31, 38, 135, 0.37)"
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
            >
              Ninja Gaiden Inspiration
            </ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody pb={6}>
              <VStack spacing={4} align="stretch">
                <Text color="white">
                  The infinite scrolling landscape at the bottom of my portfolio is inspired by the iconic Ninja Gaiden series, particularly the character Ryu Hayabusa. This subtle homage represents my journey in design and technology - continuous, determined, and always moving forward.
                </Text>
                <Text color="white">
                  The theme &quot;Unbreakable Determination&quot; from Ninja Gaiden perfectly encapsulates my approach to design and development. Just as Ryu faces endless challenges with unwavering resolve, I believe in pushing through obstacles to create meaningful digital experiences.
                </Text>
                <Text color="white">
                  The running animation of Ryu in the corner is a playful reminder that in the world of design and technology, we must keep moving, keep learning, and keep creating - just like a true ninja warrior.
                </Text>
                <a 
                  href="https://www.youtube.com/watch?v=BAjxoooKDu4&ab_channel=NeonXGameRemixes"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#90cdf4',
                    textAlign: 'center',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.color = '#90cdf4';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.color = '#90cdf4';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  Listen to &quot;Unbreakable Determination&quot; Theme
                </a>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Center>
      </Modal>
    </Box>
  );
};

export default FooterLand;

// Add the animation keyframes globally (in _app.js or a global CSS file):
// @keyframes scrollLand {
//   0% { background-position-x: 0; }
//   100% { background-position-x: -1000px; } // Adjust -1000px to match your image width for seamless loop
// } 