import React from 'react';
import { Image, Text, Box } from '@chakra-ui/react';
import StandardModal from '../ui/Modal';




const KodeboardModal = ({ isOpen, onClose }) => (
  <StandardModal isOpen={isOpen} onClose={onClose} title="Kode/Board" maxW="100vw" w="100vw">
    <Box px={{ base: 2, md: 12 }} pt={{ base: 20, md: 32 }}>
      <Text 
        fontSize="clamp(3rem, 30vw, 50rem)"
        fontWeight="bold"
        fontFamily="'BaseNeueTrial', sans-serif"
        mb={8}
        textAlign="center"
        lineHeight={1}
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



export default KodeboardModal; 

