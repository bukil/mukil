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

const StandardModal = ({ isOpen, onClose, title, children, footer, size = 'full', ...props }) => (
  <Modal isOpen={isOpen} onClose={onClose} size={size} {...props}>
    <ModalOverlay />
    <ModalContent mt="100px" bg="rgba(200, 200, 200, 0)" backdropFilter="blur(5px)" boxShadow="none">
      <ModalCloseButton mt={8} />
      <ModalBody mt={4}>{children}</ModalBody>
      <ModalFooter>
        {footer || <Button onClick={onClose}>Close</Button>}
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default StandardModal; 