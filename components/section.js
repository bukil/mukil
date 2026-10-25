import { Box } from '@chakra-ui/react'

const Section = ({ children, delay: _delay = 0, ...props }) => (
  <Box
    mb={6}
    {...props}
  >
    {children}
  </Box>
)

export default Section
