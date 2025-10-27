/* eslint-disable react/no-unescaped-entities */
import {
  Container,
  Heading,
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
        color: '#89EF8C',
        transform: 'translateY(-2px)',
        transition: 'all 0.2s ease-in-out'
      }}
      transition="all 0.2s ease-in-out"
      color="#89EF8C"
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
      <Box position="relative" minH="100vh">
        <Container maxW="container.xl">
          <Spacer mb={130}/>
          
          <Section delay={0.1}>
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="900"
              letterSpacing="tight"
              mb={4}
              textAlign="center"
              lineHeight="1.2"
              fontFamily="'WhyteInktrap', sans-serif"
            >
              LET'S <Text as="span" color="black" bg="#89EF8C" px={2} py={5} mx={1}>CREATE</Text> SOMETHING AMAZING <Text as="span" color="black" bg="#89EF8C" px={2} py={6} mx={1}>TOGETHER</Text>
            </Heading>
            
            <Text
              fontSize="md"
              textAlign="center"
              mb={12}
              fontFamily='"Michroma", sans-serif'
              fontWeight="400"
              letterSpacing="0.2em"
              color="gray.500"
              maxW="800px"
              mx="auto"
            >
              I'm all ears whether you're building the next big thing, sketching out a moonshot, or just want to say hi.
              <br />
              Let's <Text as="span" color="black" bg="#89EF8C" px={1}>connect</Text>. Let's create. Or at the very least, let's talk. Curious to know more before we chat? <Link href="/Mukil_Résumé.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}><Text as="span" color="black" bg="#89EF8C" px={1} fontWeight="regular">Resume</Text></Link> got the highlights.
            </Text>
            
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
                <ContactLink icon={FaGithub} href="https://github.com/bukil">
                  GitHub
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
          <Box
            position="fixed"
            bottom="-30%"
            left="0"
            right="0"
            textAlign="center"
            zIndex="0"
            pointerEvents="none"
            overflow="visible"
          >
            <Text
              fontSize={{ base: "20rem", md: "30rem" }}
              fontFamily="'BaseNeueTrial', sans-serif"
              fontWeight="900"
              lineHeight="2"
              background="linear-gradient(to bottom, rgba(255, 255, 255, 0.51) 0%, rgba(255, 255, 255, 0.04) 50%, rgba(255, 255, 255, 0.01) 100%)"
              backgroundClip="text"
              WebkitBackgroundClip="text"
              color="transparent"
              transform="translateY(0)"
              userSelect="none"
              paddingTop="1%"
            >
              HELLO
            </Text>
          </Box>
        </Container>
      </Box>
      <Box position="relative" width="100vw" left="50%" right="50%" marginLeft="-50vw" marginRight="-50vw">
        <FooterLand />
      </Box>
    </Layout>
  )
}

export default Contact
export { getServerSideProps } from '../components/chakra'