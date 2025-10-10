import Head from 'next/head'
import { Container, Heading,Text } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'

const Playground = () => {
  return (
    <Layout title="Playground">
      <Head>
        <title>Playground - Mukil</title>
        <meta name="description" content="Mukil's creative playground. Interactive experiments and creative projects." />
      </Head>
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
    </Layout>
  )
}

export default Playground
