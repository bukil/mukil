import React, { useRef, useEffect } from 'react';
import { Image, Text, Box, useColorMode } from '@chakra-ui/react';
import StandardModal from '../ui/Modal';
import gsap from 'gsap';

const KodeboardModal = ({ isOpen, onClose }) => {
  const textRef = useRef(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    let tl;
    if (isOpen && textRef.current) {
      tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } });
      tl.to(textRef.current, {
        x: 60,
        duration: 2.5,
      })
      .to(textRef.current, {
        x: -60,
        duration: 2.5,
      });
    }
    return () => {
      if (tl) tl.kill();
    };
  }, [isOpen]);

  return (
    <StandardModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Kode/Board" 
      maxW="100vw" 
      w="100vw"
      zIndex={500}
    >
      <Box px={{ base: 2, md: 12 }} pt={{ base: 20, md: 32 }}>
        <Text 
          ref={textRef}
          fontSize="clamp(3rem, 30vw, 50rem)"
          fontWeight="bold"
          fontFamily="'BaseNeueTrial', sans-serif"
          mb={8}
          textAlign="center"
          lineHeight={1}
          color={colorMode === 'light' ? '#89EF8C' : undefined}
        >
          KODEBOARD
        </Text>
        <Text fontSize={24} fontWeight={'hairline'} mb={6}>
          Discover the innovative Kode/Board concept, a multi-layer clipboard at your fingertips.
        </Text>
        <Image 
          src="/images/works/kodeboard.png"
          alt="Kodeboard Project"
          width="100%"
          borderRadius="lg"
          mb={6}
        />
      </Box>
    </StandardModal>
  );
};

export default KodeboardModal; 

