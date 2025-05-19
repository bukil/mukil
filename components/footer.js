import { Box } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box align="center" opacity={0.1} fontSize="sm" mb={0}>
      &copy; {new Date().getFullYear()} MUKIL KUMAR. All Rights Reserved.
    </Box>
  )
}

export default Footer
