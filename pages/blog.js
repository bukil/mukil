import { Container, Heading, SimpleGrid, Text, VStack, Icon, Box } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { FiBook, FiCamera, FiEdit } from 'react-icons/fi'

const Blog = () => {
  return (
    <Layout>
      <Box minH="100vh" py={0}>
        <Container maxW="container.xl" pt={50}>
          <VStack spacing={16} align="stretch">
            {/* Hero Section */}
            <VStack spacing={6} align="center" py={20}>
              <Heading
                as="h1"
                fontSize={{ base: '4xl', md: '6xl' }}
                fontWeight="bold"
                textAlign="center"
                color="#fff"
                letterSpacing="tight"
              >
                Blog soon (website under construction hehehe :.|   wo kya he na.... )
              </Heading>
              <Text
                fontSize={{ base: 'xl', md: '2xl' }}
                textAlign="center"
                color="#fff"
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
                  bg="transparent"
                  boxShadow="none"
                  border="none"
                  transition="all 0.3s ease"
                  _hover={{ transform: 'translateY(-5px)' }}
                  spacing={6}
                  align="start"
                  h="full"
                >
                  <Icon as={FiEdit} w={8} h={8} color="#ff7eb3" />
                  <VStack align="start" spacing={4}>
                    <Heading as="h2" fontSize="2xl" fontWeight="semibold" color="#fff">
                      Blogs
                    </Heading>
                    <Text fontSize="lg" color="#fff">
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
                  bg="transparent"
                  boxShadow="none"
                  border="none"
                  transition="all 0.3s ease"
                  _hover={{ transform: 'translateY(-5px)' }}
                  spacing={6}
                  align="start"
                  h="full"
                >
                  <Icon as={FiBook} w={8} h={8} color="#ff7eb3" />
                  <VStack align="start" spacing={4}>
                    <Heading as="h2" fontSize="2xl" fontWeight="semibold" color="#fff">
                      Book Reviews
                    </Heading>
                    <Text fontSize="lg" color="#fff">
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
                  bg="transparent"
                  boxShadow="none"
                  border="none"
                  transition="all 0.3s ease"
                  _hover={{ transform: 'translateY(-5px)' }}
                  spacing={6}
                  align="start"
                  h="full"
                >
                  <Icon as={FiCamera} w={8} h={8} color="#ff7eb3" />
                  <VStack align="start" spacing={4}>
                    <Heading as="h2" fontSize="2xl" fontWeight="semibold" color="#fff">
                      Photography
                    </Heading>
                    <Text fontSize="lg" color="#fff">
                      Capturing moments and stories through my lens.
                    </Text>
                  </VStack>
                </VStack>
              </Section>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </Layout>
  )
}

export default Blog 