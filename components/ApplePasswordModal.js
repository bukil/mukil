import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Input,
  Box,
  Text
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { useRouter } from 'next/router'

const shakeAnimation = keyframes`
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
`

export default function ApplePasswordModal({ isOpen, onClose }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const router = useRouter()

  const handleUnlock = (e) => {
    if (e) e.preventDefault()
    if (password.trim() === 'rollno43') {
      setError(false)
      if (typeof window !== 'undefined') {
        localStorage.setItem('apple_project_unlocked', 'rollno43')
      }
      onClose()
      router.push('/mukilm')
    } else {
      setError(true)
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 400)
    }
  }

  const handleClose = () => {
    setError(false)
    setPassword('')
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      motionPreset="scale"
      size="xs"
    >
      <ModalOverlay
        bg="rgba(0, 0, 0, 0.12)"
      />
      <ModalContent
        bg="rgba(255, 255, 255, 0.35)"
        backdropFilter="blur(32px) saturate(180%)"
        sx={{
          WebkitBackdropFilter: 'blur(32px) saturate(180%)'
        }}
        borderRadius="0px"
        border="none"
        outline="none"
        boxShadow="0 16px 36px rgba(0, 0, 0, 0.08)"
        maxW={{ base: '90%', sm: '460px' }}
        p={0}
        overflow="hidden"
        animation={isShaking ? `${shakeAnimation} 0.4s ease-in-out` : undefined}
      >
        <ModalBody p={0}>
          <Box
            as="form"
            onSubmit={handleUnlock}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minH={{ base: '68px', md: '80px' }}
            w="100%"
            position="relative"
          >
            <Input
              variant="unstyled"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (error) setError(false)
              }}
              autoFocus
              fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
              fontSize="16px"
              textAlign="center"
              letterSpacing="0.1em"
              color="#1A1A1A"
              bg="transparent"
              border="none"
              outline="none"
              w="100%"
              h="auto"
              py={0}
              px={6}
              _placeholder={{
                color: 'rgba(26, 26, 26, 0.45)',
                fontFamily: "'Inter', -apple-system, sans-serif",
                letterSpacing: 'normal',
                textAlign: 'center'
              }}
              _focus={{
                border: 'none',
                outline: 'none',
                boxShadow: 'none'
              }}
              _focusVisible={{
                border: 'none',
                outline: 'none',
                boxShadow: 'none'
              }}
              sx={{
                textAlign: 'center',
                '&::placeholder': {
                  textAlign: 'center',
                  letterSpacing: 'normal'
                },
                '&::-webkit-input-placeholder': {
                  textAlign: 'center',
                  letterSpacing: 'normal'
                }
              }}
            />
            {error && (
              <Text
                position="absolute"
                bottom="6px"
                left="0"
                right="0"
                fontSize="11px"
                fontFamily="'Inter', -apple-system, sans-serif"
                color="#D9383A"
                textAlign="center"
              >
                incorrect password
              </Text>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
