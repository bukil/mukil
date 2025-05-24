import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
  Text
} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import gsap from 'gsap'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const successRef = useRef(null)

  const showSuccessAnimation = () => {
    const successElement = successRef.current
    if (successElement) {
      successElement.style.display = 'block'
      
      gsap.set(successElement, { 
        scale: 0, 
        opacity: 0,
        display: 'block'
      })
      
      gsap.to(successElement, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
        onComplete: () => {
          gsap.to(successElement, {
            scale: 0.95,
            opacity: 0,
            duration: 0.3,
            delay: 2,
            ease: "power2.in",
            onComplete: () => {
              successElement.style.display = 'none'
            }
          })
        }
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        showSuccessAnimation()
        toast({
          title: 'Message sent!',
          description: "I'll get back to you soon.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      bg="rgba(255, 255, 255, 0.05)"
      p={8}
      borderRadius="xl"
      border="1px solid rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(10px)"
      position="relative"
      overflow="hidden"
    >
      <Box
        ref={successRef}
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bg="rgba(137, 239, 140, 0.95)"
        color="black"
        p={8}
        borderRadius="xl"
        textAlign="center"
        pointerEvents="none"
        zIndex={100}
        boxShadow="0 0 20px rgba(137, 239, 140, 0.3)"
        minWidth="200px"
      >
        <Text fontSize="3xl" fontWeight="bold" mb={2}>✓</Text>
        <Text fontSize="2xl" fontWeight="bold">Message Sent!</Text>
        <Text mt={2} fontSize="md">Your message is on its way</Text>
      </Box>

      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Send me a Message
        </Text>
        
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            bg="rgba(255, 255, 255, 0.05)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            _hover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
            _focus={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            bg="rgba(255, 255, 255, 0.05)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            _hover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
            _focus={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Subject</FormLabel>
          <Input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What's this about?"
            bg="rgba(255, 255, 255, 0.05)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            _hover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
            _focus={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Message</FormLabel>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message here..."
            rows={6}
            bg="rgba(255, 255, 255, 0.05)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            _hover={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
            _focus={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
          />
        </FormControl>

        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Sending..."
          width="full"
          bg="rgba(255, 255, 255, 0.1)"
          _hover={{ bg: 'rgba(255, 255, 255, 0.2)' }}
          _active={{ bg: 'rgba(255, 255, 255, 0.15)' }}
          color="white"
        >
          Send Message
        </Button>
      </VStack>
    </Box>
  )
}

export default ContactForm 