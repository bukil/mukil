import NextLink from 'next/link'
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  Button,
  Spacer
} from '@chakra-ui/react'

const NotFound = () => {
  return (
    <Container>
      <Spacer/>
      <Spacer></Spacer>
      <Heading as="h1" mt={70}>Not found</Heading>
      <Text>The page you&apos;re looking for was not found.</Text>
      <Divider my={6} />
      <Box my={6} align="center">
        <NextLink href="/" passHref>
          <Button colorScheme="teal">Return to home</Button>
        </NextLink>
      </Box>
    </Container>
  )
}

export default NotFound
