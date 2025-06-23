import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react';

const StandardModal = ({ isOpen, onClose, children, footer, size = 'full', maxW = '100vw', w = '100vw', zIndex = 1400, ...props }) => (
  <Modal isOpen={isOpen} onClose={onClose} size={size} {...props}>
    <ModalOverlay
      bg="rgba(30,30,30,0.4)"
      backdropFilter="blur(24px)"
      zIndex={zIndex}
    />
    <ModalContent
      maxW={maxW}
      w={w}
      minH={{ base: '100vh', md: '100dvh' }}
      h={{ base: '100vh', md: '100dvh' }}
      m={0}
      p={0}
      borderRadius={0}
      bg={{ base: 'rgba(255,255,255,0.65)', _dark: 'rgba(20,20,20,0.65)' }}
      boxShadow="none"
      mt={{ base: '64px', md: '80px' }}
      zIndex={zIndex + 1}
    >
      <ModalCloseButton mt={8} />
      <ModalBody mt={4}>{children}</ModalBody>
      <ModalFooter>
        {footer || <Button onClick={onClose}>Close</Button>}
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default StandardModal; 