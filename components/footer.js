import { Box } from '@chakra-ui/react'
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box align="center" opacity={0.1} fontSize="sm">
      &copy; {new Date().getFullYear()} MUKIL KUMAR. All Rights Reserved.
    </Box>
  )
}

export default Footer
