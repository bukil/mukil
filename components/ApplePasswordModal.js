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
        bg="rgba(0, 0, 0, 0.3)"
        backdropFilter="blur(12px)"
      />
      <ModalContent
        bg="#F4F4F0"
        borderRadius="14px"
        border="1px solid rgba(0, 0, 0, 0.1)"
        boxShadow="0 20px 50px rgba(0, 0, 0, 0.12)"
        maxW="280px"
        p={0}
        animation={isShaking ? `${shakeAnimation} 0.4s ease-in-out` : undefined}
      >
        <ModalBody p={5}>
          <Box as="form" onSubmit={handleUnlock}>
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (error) setError(false)
              }}
              autoFocus
              fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
              fontSize="13px"
              textAlign="center"
              color="#555555"
              bg="#FFFFFF"
              border="1px solid"
              borderColor={error ? '#999999' : 'rgba(0, 0, 0, 0.12)'}
              borderRadius="8px"
              h="38px"
              _placeholder={{ color: '#888888', fontFamily: "'Inter', -apple-system, sans-serif" }}
              _focus={{
                borderColor: '#666666',
                boxShadow: 'none'
              }}
            />
            {error && (
              <Text
                mt={2}
                fontSize="11px"
                fontFamily="'Inter', -apple-system, sans-serif"
                color="#888888"
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
