/* eslint-disable react/no-unescaped-entities */
import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  chakra,
  Button,
  Text,
  VStack,
  HStack,
  Badge,
} from '@chakra-ui/react'

import Layout from '../components/layouts/article'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Section from '../components/section'
import { Grid, GridItem } from '@chakra-ui/react'
import Image from 'next/image'
import { Divider } from '@chakra-ui/react'
import { Spacer } from '@chakra-ui/react'
import styled from '@emotion/styled'

const Trans = styled.span`
  Button {
    transition: 800ms ease;
    transform: rotate(0deg);
  }

  &:hover Button {
    transform: translate(30px, 0px);
  }
`

const JourneyItem = styled(Box)`
  position: relative;
  padding-left: 2rem;
  border-left: 2px solid #2D3748;
  margin-bottom: 2rem;

  &:last-child {
    border-left: none;
  }

  &:before {
    content: '';
    position: absolute;
    left: -8px;
    top: 0;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #2D3748;
  }
`

const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const Home = () => (
  <Box position="relative" minHeight="100vh">
    <Layout>
      <Spacer mb={130}/>
      <Container maxW='container.lg'>
        <Box display={{ md:'flex'}}>
          <Box flexGrow={1}>
            <Grid templateColumns='repeat(2, fr)'>
              <GridItem w='100%'>
                <Heading fontSize='7xl' fontWeight="hairline">
                  MUKIL
                </Heading>
              </GridItem>
              <GridItem w='100%'>
                <Heading fontSize='7xl' variant="page-title">
                  KUMAR
                </Heading>
              </GridItem>
            </Grid>
            <p>INTERACTION DESIGNER · CREATIVE TECHNOLOGIST · ELECTRONICS ENGINEER</p>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            textAlign="center"
          >
            <Box
              borderColor="whiteAlpha.800"
              borderWidth={0}
              borderStyle="solid"
              w="200px"
              h="240px"
              display="inline-block"
              borderRadius='50'
              overflow="hidden"
            >
              <ProfileImage
                src="/images/mukil.jpg"
                alt="Profile image"
                width={320}
                height={290}
              />
            </Box>
          </Box>
        </Box>
      </Container> 

      <Divider orientation='horizontal' mb={8} mt={6} />
      <Spacer />

      <Container maxW='container.lg' mt={2} mb={2} p={2}>
        <Grid templateColumns='repeat(2, fr)' gap={20}>
          <GridItem w='100%'>
            <Section delay={0.3}>
              <Heading fontSize="6xl" fontWeight="hairline">
                Introduction
              </Heading>
              <Text variant="home-txt" fontSize={14} fontWeight='normal'>
                Hailing from Uttar Pradesh, India, I&apos;m Mukil an engineering graduate
                with an insatiable design itch. From crafting intuitive, user-centered experiences, 
                to the intricate workings of everyday machinery, anything with an engineering pulse sparks my imagination. 
                My superpower? Transforming real-world challenges into design and tech solutions.
                Think MacGyver meets the future! When I&apos;m not glued to the screen, you&apos;ll find me
                lost in the rhythm of music, taking solitary walks to untangle thoughts (weird, but it works!),
                and wielding my phone camera like a trusty sidekick, capturing inspiration on the go.
                Right now, I&apos;m brewing up some exciting projects in my creative cauldron. Stay tuned!{' '}
                <Link href="https://www.youtube.com/shorts/yOYycYeoM24" isExternal>
                  Dynamic Steering System
                </Link>
                .&quot;
                <Link href="https://www.youtube.com/channel/UCVeGi7RNdtqN6_7G-rjdSGQ" isExternal>
                  YT@Mukil
                </Link>
                &quot;
              </Text>

              <Heading fontSize="4xl" fontWeight="hairline" mt={12} mb={6}>
                My Journey
              </Heading>

              <VStack align="stretch" spacing={0}>
                <JourneyItem>
                  <Badge colorScheme="blue" mb={2}>2024 - Present</Badge>
                  <Heading fontSize="xl" fontWeight="bold">Master of Design</Heading>
                  <Text fontSize="md" color="gray.600">IDC School of Design, IIT Bombay</Text>
                  <Text fontSize="sm" mt={2}>Specializing in Interaction Design</Text>
                </JourneyItem>

                <JourneyItem>
                  <Badge colorScheme="green" mb={2}>2022 - 2023</Badge>
                  <Heading fontSize="xl" fontWeight="bold">Creative Design Intern</Heading>
                  <Text fontSize="md" color="gray.600">e-Yantra, IIT Bombay</Text>
                  <Text fontSize="sm" mt={2}>Designed and developed a multipurpose drone system with interactive interfaces</Text>
                </JourneyItem>

                <JourneyItem>
                  <Badge colorScheme="purple" mb={2}>2022</Badge>
                  <Heading fontSize="xl" fontWeight="bold">Product Design Intern</Heading>
                  <Text fontSize="md" color="gray.600">Digital Ink, Delhi</Text>
                  <Text fontSize="sm" mt={2}>User experience and interface design</Text>
                </JourneyItem>

                <JourneyItem>
                  <Badge colorScheme="orange" mb={2}>2019 - 2023</Badge>
                  <Heading fontSize="xl" fontWeight="bold">B.Tech in Electronics & Communication</Heading>
                  <Text fontSize="md" color="gray.600">IET Lucknow</Text>
                  <Text fontSize="sm" mt={2}>Graduated with First Class Honors</Text>
                </JourneyItem>
              </VStack>
            </Section>
          </GridItem>
        </Grid>
      </Container>

      <Trans>
        <Section>
          <Box align="center" mb={4}>
            <NextLink href="/works" passHref scroll={true}>
              <Button borderRadius='20px' variant='outline' border='2px' borderColor='black' rightIcon={<ChevronRightIcon />}>
                CLICK TO SEE MORE ABOUT MY WORK
              </Button>
            </NextLink>
          </Box>
        </Section>
      </Trans>
    </Layout>
  </Box>
)

export default Home
export { getServerSideProps } from '../components/chakra'
