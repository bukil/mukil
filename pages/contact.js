/* eslint-disable react/no-unescaped-entities */
import {
  Container,
  Divider,
  Heading,
  Stack,
  Image,
  Text,
  Box,
  Spacer,
  useColorMode,
  Link,
  HStack,
  Icon,
  VStack
} from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import { FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import FooterLand from "../components/FooterLand"
import ContactForm from '../components/ContactForm'

const ContactLink = ({ icon, href, children }) => (
  <Link href={href} isExternal>
    <HStack 
      spacing={4} 
      p={2}
      _hover={{ 
        color: 'whiteAlpha.900',
        transform: 'translateY(-2px)',
        transition: 'all 0.2s ease-in-out'
      }}
      transition="all 0.2s ease-in-out"
    >
      <Icon as={icon} boxSize={5} />
      <Text fontSize="sm">{children}</Text>
    </HStack>
  </Link>
)

const Contact = () => {
  const { colorMode } = useColorMode()
  
  return (
    <Layout>
      {colorMode === 'dark' && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="linear-gradient(to top, rgba(4, 19, 67, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%)"
          zIndex={-1}
        />
      )}
      <Container maxW="container.xl">
        <Spacer mb={130}/>
        
        <Section delay={0.1}>
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="extrabold"
            letterSpacing="tight"
            mb={12}
            textAlign="center"
            lineHeight="1.2"
          >
            LET'S CREATE SOMETHING AMAZING TOGETHER
          </Heading>
          
          <Heading as="h2" fontSize="6xl" fontWeight="hairline" mb={8}>
            Contact
          </Heading>
          
          <VStack spacing={8} align="stretch">
            <Box
              bg="black"
              borderRadius="full"
              p={4}
              display="flex"
              justifyContent="center"
              gap={8}
              flexWrap="wrap"
            >
              <ContactLink icon={EmailIcon} href="mailto:mukil289446@gmail.com">
                mukil289446@gmail.com
              </ContactLink>
              <ContactLink icon={FaLinkedin} href="https://www.linkedin.com/in/mukil-kumar-289446/">
                LinkedIn
              </ContactLink>
              <ContactLink icon={FaGithub} href="https://github.com/mukil289446">
                GitHub
              </ContactLink>
              <ContactLink icon={FaYoutube} href="https://www.youtube.com/channel/UCVeGi7RNdtqN6_7G-rjdSGQ">
                YouTube
              </ContactLink>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={4}>
                Location
              </Heading>
              <Text>Aligarh, Uttar Pradesh, India</Text>
            </Box>

            <Box mt={8}>
              <ContactForm />
            </Box>
          </VStack>
        </Section>
        <FooterLand />
      </Container>
    </Layout>
  )
}

export default Contact
export { getServerSideProps } from '../components/chakra' 