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
import styled from '@emotion/styled'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

const StyledHeading = styled(Heading)`
  @font-face {
    font-family: 'WhyteInktrap';
    src: url('/fonts/WhyteInktrap-Super.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
  }
  font-family: 'WhyteInktrap', sans-serif;
`

const SelectedText = styled.span`
  background-color: #89EF8C;
  color: black;
  padding: 0 2px;
  
`

const ContactLink = ({ icon, href, children }) => (
  <Link href={href} isExternal>
    <HStack 
      spacing={4} 
      p={2}
      color="#89EF8C"
      _hover={{ 
        color: '#89EF8C',
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
  const headingRef = useRef(null)
  
  useEffect(() => {
    if (headingRef.current) {
      const splitText = new SplitText(headingRef.current, { type: "words,chars" })
      
      gsap.from(splitText.chars, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.02,
        ease: "power4.out",
        delay: 0.2
      })
    }
  }, [])
  
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
          <StyledHeading
            ref={headingRef}
            as="h1"
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="extrabold"
            letterSpacing="tight"
            mb={4}
            textAlign="center"
            lineHeight="1.2"
          >
            LET'S CREATE SOMETHING AMAZING TOGETHER
          </StyledHeading>
          
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
            Let's <SelectedText>connect</SelectedText>. Let's create. Or at the very least, let's talk.
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
        <Box
          position="fixed"
          bottom="-20%"
          left="0"
          right="0"
          textAlign="center"
          zIndex="0"
          pointerEvents="none"
          overflow="visible"
          opacity={1.5}
          transform="scale(1.2)"
        >
          <Text
            fontSize={{ base: "20rem", md: "30rem" }}
            fontFamily="'BaseNeueTrial', sans-serif"
            fontWeight="900"
            lineHeight="0.8"
            background="linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.16) 40%, rgba(255, 255, 255, 0) 100%)"
            backgroundClip="text"
            WebkitBackgroundClip="text"
            color="transparent"
            transform="translateY(0)"
            userSelect="none"
            paddingTop="20%"
            filter="brightness(1)"
          >
            HELLO
          </Text>
        </Box>
        <FooterLand />
      </Container>
    </Layout>
  )
}

export default Contact
export { getServerSideProps } from '../components/chakra' 