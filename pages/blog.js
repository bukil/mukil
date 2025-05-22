import { Container, Heading, SimpleGrid, Text, Box, useColorModeValue, Stack, Badge, VStack, HStack, Icon } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { FiBook, FiCamera, FiEdit } from 'react-icons/fi'

const Blog = () => {
  return (
    <Layout>
      <Container maxW="container.xl" pt={20}>
        <VStack spacing={16} align="stretch">
          {/* Hero Section */}
          <VStack spacing={6} align="center" py={20}>
            <Heading
              as="h1"
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="bold"
              textAlign="center"
              bgGradient="linear(to-r, teal.400, blue.500)"
              bgClip="text"
              letterSpacing="tight"
            >
              Blog soon (website under construction hehehe 😅 )
            </Heading>
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              textAlign="center"
              color={useColorModeValue('gray.600', 'gray.400')}
              maxW="2xl"
            >
              Thoughts, Reviews & Photography
            </Text>
          </VStack>

          {/* Categories */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {/* Blogs Section */}
            <Section>
              <VStack
                p={8}
                borderRadius="2xl"
                bg={useColorModeValue('whiteAlpha.900', 'blackAlpha.900')}
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor={useColorModeValue('whiteAlpha.400', 'whiteAlpha.200')}
                transition="all 0.3s ease"
                _hover={{ transform: 'translateY(-5px)' }}
                spacing={6}
                align="start"
                h="full"
              >
                <Icon as={FiEdit} w={8} h={8} color="teal.500" />
                <VStack align="start" spacing={4}>
                  <Heading as="h2" fontSize="2xl" fontWeight="semibold">
                    Blogs
                  </Heading>
                  <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
                    Exploring technology, design, and innovation through thoughtful articles.
                  </Text>
                </VStack>
              </VStack>
            </Section>

            {/* Book Reviews Section */}
            <Section>
              <VStack
                p={8}
                borderRadius="2xl"
                bg={useColorModeValue('whiteAlpha.900', 'blackAlpha.900')}
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor={useColorModeValue('whiteAlpha.400', 'whiteAlpha.200')}
                transition="all 0.3s ease"
                _hover={{ transform: 'translateY(-5px)' }}
                spacing={6}
                align="start"
                h="full"
              >
                <Icon as={FiBook} w={8} h={8} color="purple.500" />
                <VStack align="start" spacing={4}>
                  <Heading as="h2" fontSize="2xl" fontWeight="semibold">
                    Book Reviews
                  </Heading>
                  <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
                    Deep dives into books that have shaped my thinking and perspective.
                  </Text>
                </VStack>
              </VStack>
            </Section>

            {/* Photography Section */}
            <Section>
              <VStack
                p={8}
                borderRadius="2xl"
                bg={useColorModeValue('whiteAlpha.900', 'blackAlpha.900')}
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor={useColorModeValue('whiteAlpha.400', 'whiteAlpha.200')}
                transition="all 0.3s ease"
                _hover={{ transform: 'translateY(-5px)' }}
                spacing={6}
                align="start"
                h="full"
              >
                <Icon as={FiCamera} w={8} h={8} color="blue.500" />
                <VStack align="start" spacing={4}>
                  <Heading as="h2" fontSize="2xl" fontWeight="semibold">
                    Photography
                  </Heading>
                  <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
                    Capturing moments and stories through my lens.
                  </Text>
                </VStack>
              </VStack>
            </Section>
          </SimpleGrid>
        </VStack>
      </Container>
    </Layout>
  )
}

export default Blog 