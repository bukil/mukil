import Head from 'next/head'
import { Container, Heading, Text, Box } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { Global } from '@emotion/react'

const Playground = () => {
  return (
    <>
      <Global styles={`body { background: #000000 !important; }`} />
      <Layout title="Playground">
        <Head>
          <title>Playground - Mukil</title>
          <meta name="description" content="Mukil's creative playground. Interactive experiments and creative projects." />
        </Head>
        <Box bg="#000000" minHeight="100vh" color="white">
          <Container maxW="container.xl" mt={20}>
        <Section delay={0.1}>
          <Heading 
            as="h1" 
            fontSize={{ base: '4xl', md: '5xl' }} 
            fontWeight="bold" 
            mb={6}
          >
            Playground
          </Heading>
          <Text fontSize="lg" lineHeight={1.8} mb={4}>
            This is a creative playground for experiments and interactive content.
          </Text>
          <Text fontSize="lg" lineHeight={1.8} color="gray.500">
            More content coming soon...
          </Text>
        </Section>
          </Container>
        </Box>
      </Layout>
    </>
  )
}

export default Playground
