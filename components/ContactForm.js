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
import { useState, useRef, useEffect } from 'react'
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
  const buttonRef = useRef(null)

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    const handleEnter = () => {
      gsap.to(btn, {
        scale: 1.08,
        boxShadow: '0 4px 24px 0 rgba(137,239,140,0.18)',
        duration: 0.28,
        ease: 'power2.out',
      });
    };
    const handleLeave = () => {
      gsap.to(btn, {
        scale: 1,
        boxShadow: 'none',
        duration: 0.28,
        ease: 'power2.in',
      });
    };
    btn.addEventListener('mouseenter', handleEnter);
    btn.addEventListener('mouseleave', handleLeave);
    return () => {
      btn.removeEventListener('mouseenter', handleEnter);
      btn.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const showSuccessGlow = () => {
    if (formRef.current) {
      gsap.to(formRef.current, {
        boxShadow: '0 0 30px rgba(137, 239, 140, 0.5)',
        borderColor: '#89EF8C',
        duration: 0.5,
        onComplete: () => {
          gsap.to(formRef.current, {
            boxShadow: 'none',
            borderColor: '#1A1A1A',
            duration: 0.5,
            delay: 1
          })
        }
      })
    }
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 1 },
        {
          scale: 1.18,
          duration: 0.18,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            gsap.to(buttonRef.current, {
              scale: 1,
              duration: 0.18,
              ease: 'bounce.out'
            })
          }
        }
      )
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

  const formBg = 'rgba(255, 255, 255, 0.9)';
  const inputBg = '#ffffff';
  const inputColor = 'gray.800';
  const borderColor = '#1A1A1A';

  return (
    <Box
      ref={formRef}
      as="form"
      onSubmit={handleSubmit}
      bg={formBg}
      p={{ base: 5, md: 8 }}
      borderRadius="0"
      border={`0.5px solid ${borderColor}`}
      backdropFilter="blur(10px)"
      transition="all 0.3s ease"
    >
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Send me a Message
        </Text>
        
        <FormControl isRequired>
          <FormLabel fontSize="sm" fontWeight="500">Name</FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            bg={inputBg}
            borderRadius="0"
            border={`0.5px solid ${borderColor}`}
            _hover={{ borderColor: '#1A1A1A' }}
            _focus={{ borderColor: '#1A1A1A', boxShadow: '0 0 0 1px #1A1A1A' }}
            color={inputColor}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" fontWeight="500">Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            bg={inputBg}
            borderRadius="0"
            border={`0.5px solid ${borderColor}`}
            _hover={{ borderColor: '#1A1A1A' }}
            _focus={{ borderColor: '#1A1A1A', boxShadow: '0 0 0 1px #1A1A1A' }}
            color={inputColor}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" fontWeight="500">Subject</FormLabel>
          <Input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What's this about?"
            bg={inputBg}
            borderRadius="0"
            border={`0.5px solid ${borderColor}`}
            _hover={{ borderColor: '#1A1A1A' }}
            _focus={{ borderColor: '#1A1A1A', boxShadow: '0 0 0 1px #1A1A1A' }}
            color={inputColor}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" fontWeight="500">Message</FormLabel>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message here..."
            rows={6}
            bg={inputBg}
            borderRadius="0"
            border={`0.5px solid ${borderColor}`}
            _hover={{ borderColor: '#1A1A1A' }}
            _focus={{ borderColor: '#1A1A1A', boxShadow: '0 0 0 1px #1A1A1A' }}
            color={inputColor}
          />
        </FormControl>

        <Button
          ref={buttonRef}
          type="submit"
          isLoading={isLoading}
          loadingText="Sending..."
          width="full"
          borderRadius="0"
          border={`0.5px solid ${borderColor}`}
          bg="#F7FAFC"
          _hover={{ bg: '#1A1A1A', color: '#F4F4F0' }}
          _active={{ bg: '#1A1A1A' }}
          color="gray.800"
          height="52px"
          fontSize="14px"
          fontWeight="500"
          letterSpacing="0.08em"
          textTransform="uppercase"
        >
          Send Message
        </Button>
      </VStack>
    </Box>
  )
}

export default ContactForm 