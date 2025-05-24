import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
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
  const formRef = useRef(null)

  const showSuccessGlow = () => {
    if (formRef.current) {
      gsap.to(formRef.current, {
        boxShadow: '0 0 30px rgba(137, 239, 140, 0.5)',
        borderColor: '#89EF8C',
        duration: 0.5,
        onComplete: () => {
          gsap.to(formRef.current, {
            boxShadow: 'none',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            duration: 0.5,
            delay: 1
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
        showSuccessGlow()
        setFormData({ name: '', email: '', subject: '', message: '' })
      }
    } catch (error) {
      console.error('Error:', error)
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
      ref={formRef}
      as="form"
      onSubmit={handleSubmit}
      bg="rgba(255, 255, 255, 0.05)"
      p={8}
      borderRadius="xl"
      border="1px solid rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(10px)"
      transition="all 0.3s ease"
    >
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