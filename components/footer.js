import { Box, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box align="center" py={6} width="100%">
      <Text
        fontSize={{ base: '9.5px', md: '10.5px' }}
        fontFamily="'GT Walsheim', 'GT Walsheim Pro', -apple-system, BlinkMacSystemFont, sans-serif"
        fontWeight="700"
        letterSpacing="0.02em"
        color="#2f2f2f97"
        lineHeight="1.2"
        textAlign="center"
      >
        © 2026 MUKIL KUMAR. All Rights Reserved.
      </Text>
    </Box>
  )
}

export default Footer
