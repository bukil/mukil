import React from 'react';
import { Image, Text } from '@chakra-ui/react';
import StandardModal from '../ui/Modal';

const KodeboardModal = ({ isOpen, onClose }) => (
  <StandardModal isOpen={isOpen} onClose={onClose} title="Kode/Board">
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
  </StandardModal>
);

export default KodeboardModal; 