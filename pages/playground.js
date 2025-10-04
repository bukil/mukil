import React, { useEffect, useRef } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import Layout from '../components/layouts/article';
import Head from 'next/head';

const Playground = () => {
  return (
    <Layout title="Playground">
      <Head>
        <title>Playground - Mukil</title>
        <meta name="description" content="Mukil's creative playground. Interactive data visualizations and experimental projects." />
      </Head>
      <Box 
        w="100%" 
        maxW="100vw" 
        overflowX="hidden" 
        minH="100vh" 
        style={{
          backgroundColor: '#718096 !important' // Force gray color in both themes
        }}
      >
        {/* Header section */}
        <Box 
          w="100%" 
          pt={20}
          pb={8}
          display="flex" 
          flexDirection="column"
          alignItems="center" 
          justifyContent="center"
          color="white"
        >
          <Heading as="h1" size="2xl" color="white" mb={4} textAlign="center">
            Data Visualization Playground
          </Heading>
          <Text fontSize="xl" color="gray.200" textAlign="center" mb={2}>
            Playground
          </Text>
          <Text fontSize="md" color="gray.300" textAlign="center" maxW="600px">
            This is a creative playground for experiments and interactive content. The graph visualization has been removed.
          </Text>
        </Box>

        {/* Visualization container removed. Add your own experiments below. */}
      </Box>
    </Layout>
  );
};

export default Playground;
