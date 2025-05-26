import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Text,
  useColorMode
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
  const { colorMode } = useColorMode();

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
            borderColor: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0',
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

  // Bright mode for light, dark for dark
  const formBg = colorMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255,255,255,0.85)';
  const inputBg = colorMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255,255,255,0.85)';
  const inputColor = colorMode === 'dark' ? 'white' : 'gray.800';
  const borderColor = colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#E2E8F0';

  return (
    <Box
      ref={formRef}
      as="form"
      onSubmit={handleSubmit}
      bg={formBg}
      p={8}
      borderRadius="xl"
      border={`1px solid ${borderColor}`}
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
            bg={inputBg}
            border={`1px solid ${borderColor}`}
            _hover={{ borderColor: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : '#CBD5E1' }}
            _focus={{ borderColor: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#3182ce' }}
            color={inputColor}
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
            bg={inputBg}
            border={`1px solid ${borderColor}`}
            _hover={{ borderColor: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : '#CBD5E1' }}
            _focus={{ borderColor: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#3182ce' }}
            color={inputColor}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Subject</FormLabel>
          <Input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What's this about?"
            bg={inputBg}
            border={`1px solid ${borderColor}`}
            _hover={{ borderColor: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : '#CBD5E1' }}
            _focus={{ borderColor: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#3182ce' }}
            color={inputColor}
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
            bg={inputBg}
            border={`1px solid ${borderColor}`}
            _hover={{ borderColor: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : '#CBD5E1' }}
            _focus={{ borderColor: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : '#3182ce' }}
            color={inputColor}
          />
        </FormControl>

        <Button
          ref={buttonRef}
          type="submit"
          isLoading={isLoading}
          loadingText="Sending..."
          width="full"
          bg={colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#F7FAFC'}
          _hover={{ bg: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : '#EDF2F7' }}
          _active={{ bg: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : '#E2E8F0' }}
          color={colorMode === 'dark' ? 'white' : 'gray.800'}
        >
          Send Message
        </Button>
      </VStack>
    </Box>
  )
}

export default ContactForm 