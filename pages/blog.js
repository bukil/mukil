import { Heading, Text, VStack, Icon, Box, useColorModeValue } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { FiBook, FiCamera, FiEdit } from 'react-icons/fi'
import { useRef } from 'react'
import gsap from 'gsap'

const Blog = () => {
  const textColor = useColorModeValue('#222', '#fff')
  const greenLine = useColorModeValue('#89EF8C', '#89EF8C')
  const pinkLine = useColorModeValue('#b83280', '#ff7eb3')
  const blueLine = useColorModeValue('#3182ce', '#63b3ed')

  // Refs for GSAP animation
  const blogBoxRef = useRef(null)
  const bookBoxRef = useRef(null)
  const photoBoxRef = useRef(null)

  // GSAP animation handlers
  const handleBoxEnter = ref => {
    if (ref.current) {
      gsap.to(ref.current, {
        scale: 1.035,
        y: -8,
        boxShadow: '0 8px 32px 0 rgba(137,239,140,0.15)',
        duration: 0.35,
        ease: 'power3.out',
      })
    }
  }
  const handleBoxLeave = ref => {
    if (ref.current) {
      gsap.to(ref.current, {
        scale: 1,
        y: 0,
        boxShadow: 'none',
        duration: 0.35,
        ease: 'power3.in',
      })
    }
  }

  return (
    <Layout>
      <Box minH="100vh" py={0}>
        <VStack spacing={16} align="stretch">
          {/* Hero Section */}
          <VStack spacing={6} align="center" py={20}>
            <Heading
              as="h1"
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="bold"
              textAlign="center"
              color={textColor}
              letterSpacing="tight"
            >
              Blog soon (website under construction hehehe :.|   wo kya he na.... )
            </Heading>
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              textAlign="center"
              color={textColor}
              maxW="2xl"
            >
              Thoughts, Reviews & Photography
            </Text>
          </VStack>

          {/* Categories as a vertical list */}
          <VStack spacing={1} align="stretch">
            {/* Blogs Section - outer green border with GSAP animation */}
            <Section>
              <Box
                ref={blogBoxRef}
                display="flex"
                alignItems="center"
                p={6}
                borderRadius="1xl"
                bg="transparent"
                border={`1px solid ${greenLine}`}
                boxShadow="none"
                minH="120px"
                h="full"
                position="relative"
                onMouseEnter={() => handleBoxEnter(blogBoxRef)}
                onMouseLeave={() => handleBoxLeave(blogBoxRef)}
                style={{ willChange: 'transform, box-shadow' }}
              >
                <Icon as={FiEdit} w={8} h={8} color={greenLine} mr={6} />
                <Box>
                  <Heading as="h2" fontSize="2xl" fontWeight="semibold" color={textColor} mb={2}>
                    Blogs
                  </Heading>
                  <Text fontSize="lg" color={textColor}>
                    Exploring technology, design, and innovation through thoughtful articles.
                  </Text>
                </Box>
              </Box>
            </Section>

            {/* Book Reviews Section - outer pink border with GSAP animation */}
            <Section>
              <Box
                ref={bookBoxRef}
                display="flex"
                alignItems="center"
                p={6}
                borderRadius="1xl"
                bg="transparent"
                border={`1px solid ${pinkLine}`}
                boxShadow="none"
                minH="120px"
                h="full"
                onMouseEnter={() => handleBoxEnter(bookBoxRef)}
                onMouseLeave={() => handleBoxLeave(bookBoxRef)}
                style={{ willChange: 'transform, box-shadow' }}
              >
                <Icon as={FiBook} w={8} h={8} color={pinkLine} mr={6} />
                <Box>
                  <Heading as="h2" fontSize="2xl" fontWeight="semibold" color={textColor} mb={2}>
                    Book Reviews
                  </Heading>
                  <Text fontSize="lg" color={textColor}>
                    Deep dives into books that have shaped my thinking and perspective.
                  </Text>
                </Box>
              </Box>
            </Section>

            {/* Photography Section - outer blue border with GSAP animation */}
            <Section>
              <Box
                ref={photoBoxRef}
                display="flex"
                alignItems="center"
                p={6}
                borderRadius="1xl"
                bg="transparent"
                border={`1px solid ${blueLine}`}
                boxShadow="none"
                minH="120px"
                h="full"
                onMouseEnter={() => handleBoxEnter(photoBoxRef)}
                onMouseLeave={() => handleBoxLeave(photoBoxRef)}
                style={{ willChange: 'transform, box-shadow' }}
              >
                <Icon as={FiCamera} w={8} h={8} color={blueLine} mr={6} />
                <Box>
                  <Heading as="h2" fontSize="2xl" fontWeight="semibold" color={textColor} mb={2}>
                    Photography
                  </Heading>
                  <Text fontSize="lg" color={textColor}>
                    Capturing moments and stories through my lens.
                  </Text>
                </Box>
              </Box>
            </Section>
          </VStack>
        </VStack>
      </Box>
    </Layout>
  )
}

export default Blog 