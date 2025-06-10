import React from 'react';
import { Box } from '@chakra-ui/react';
import StandardModal from '../ui/Modal';

const MicrointeractionModal = ({ isOpen, onClose }) => {
  return (
      <StandardModal isOpen={isOpen} onClose={onClose} title="Microinteraction Demo" maxW="100vw" w="100vw">
        <Box
          px={0}
          pt={{ base: 10, md: 24 }}
          pb={{ base: 6, md: 16 }}
          minH="100vh"
          w="100vw"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
        {/* Empty modal content */}
        </Box>
      </StandardModal>
  );
};

export default MicrointeractionModal;