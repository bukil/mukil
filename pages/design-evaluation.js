import { Box, Heading, Text } from '@chakra-ui/react';
import Layout from '../components/layouts/article';
import Head from 'next/head';

const DesignEvaluation = () => {
  return (
    <Layout title="ChatGPT UI/UX Evaluation">
      <Head>
        <title>ChatGPT UI/UX Evaluation - Mukil</title>
        <meta name="description" content="Academic evaluation of ChatGPT&apos;s UI/UX. Analysis, findings, and suggestions from our course project." />
      </Head>
      <Box w="100%" minH="90vh" bgGradient="linear(to-br, green.50, white)" px={{ base: 2, md: 6, lg: 12 }} py={20}>
        <Heading as="h1" size="2xl" color="green.600" mb={10}>
          ChatGPT UI/UX Evaluation
        </Heading>
        <Text fontSize="xl" color="gray.700" mb={8}>
          This page presents our academic evaluation of ChatGPT&apos;s user interface and user experience, conducted as part of our course project. Here, you&apos;ll find our analysis, findings, and suggestions for improving the ChatGPT product experience.
        </Text>
        <Box mt={20} textAlign="center">
          <Text fontSize="2xl" color="green.500" fontWeight="bold">
            Hey, you caught me! 🚧<br />
            I&apos;m still working on this page.<br />
            Come back soon for some creative insights and UI/UX magic!
          </Text>
        </Box>
      </Box>
    </Layout>
  );
};

export default DesignEvaluation;
