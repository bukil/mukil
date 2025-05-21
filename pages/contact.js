/* eslint-disable react/no-unescaped-entities */
import {
  Container,
  Heading,
  Box,
  Text,
  Link,
  SimpleGrid,
  Icon,
  VStack,
  HStack,
} from '@chakra-ui/react'
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import { FaGithub, FaLinkedin, FaYoutube, FaInstagram } from 'react-icons/fa'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { Spacer } from '@chakra-ui/react'
import FooterLand from "../components/FooterLand";
import ContactForm from '../components/ContactForm'

const ContactLink = ({ icon, href, children }) => (
  <Link href={href} isExternal>
    <HStack spacing={4} p={4} borderRadius="lg" _hover={{ bg: 'whiteAlpha.200' }}>
      <Icon as={icon} boxSize={6} />
      <Text>{children}</Text>
    </HStack>
  </Link>
)

const Contact = () => (
  <Layout>
    <Container maxW="container.md">
      <Spacer mb={130}/>
      
      <Section delay={0.1}>
        <Heading as="h1" fontSize="6xl" fontWeight="hairline" mb={8}>
          Contact
        </Heading>
        
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading as="h2" fontSize="2xl" mb={4}>
              Get in Touch
            </Heading>
            <SimpleGrid columns={[1, 2]} spacing={4}>
              <ContactLink icon={EmailIcon} href="mailto:mukil289446@gmail.com">
                mukil289446@gmail.com
              </ContactLink>
              <ContactLink icon={PhoneIcon} href="tel:+919336277706">
                +91 9336277706
              </ContactLink>
            </SimpleGrid>
          </Box>

          <Box>
            <Heading as="h2" fontSize="2xl" mb={4}>
              Social Links
            </Heading>
            <SimpleGrid columns={[1, 2]} spacing={4}>
              <ContactLink icon={FaLinkedin} href="https://www.linkedin.com/in/mukil-kumar-289446/">
                LinkedIn
              </ContactLink>
              <ContactLink icon={FaGithub} href="https://github.com/mukil289446">
                GitHub
              </ContactLink>
              <ContactLink icon={FaYoutube} href="https://www.youtube.com/channel/UCVeGi7RNdtqN6_7G-rjdSGQ">
                YouTube
              </ContactLink>
              <ContactLink icon={FaInstagram} href="https://www.instagram.com/mukil289446/">
                Instagram
              </ContactLink>
            </SimpleGrid>
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

export default Contact
export { getServerSideProps } from '../components/chakra' 