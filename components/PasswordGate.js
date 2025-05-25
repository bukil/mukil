import React, { useState, useEffect } from 'react';
import { Box, Input, Button, Text, VStack } from '@chakra-ui/react';

const PASSWORD = 'sorte';
const STORAGE_KEY = 'site_password';

export default function PasswordGate({ children }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === PASSWORD) setUnlocked(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === PASSWORD) {
      setUnlocked(true);
      localStorage.setItem(STORAGE_KEY, PASSWORD);
    } else {
      setError('Incorrect password');
    }
  };

  if (unlocked) return children;

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.900">
      <VStack as="form" spacing={4} onSubmit={handleSubmit} bg="white" p={8} rounded="md" boxShadow="lg">
        <Text fontSize="lg" fontWeight="bold" color="gray.800">website under construction hehehe :.| wo kya he na....</Text>
        <Input
          type="password"
          value={input}
          onChange={e => { setInput(e.target.value); setError(''); }}
          placeholder="Password"
          autoFocus
          color="gray.800"
          bg="gray.100"
          _placeholder={{ color: 'gray.500' }}
        />
        {error && <Text color="red.500">{error}</Text>}
        <Button type="submit" colorScheme="teal" width="full">Unlock</Button>
      </VStack>
    </Box>
  );
} 