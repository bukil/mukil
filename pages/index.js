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
            </Section>
          </GridItem>
        </Grid>
      </Container>

      <Spacer/>
      <Spacer/>

      <Trans>
        <Section>
          <Box align="center" my={4}>
            <NextLink href="/works" passHref scroll={true}>
              <Button borderRadius='20px' variant='outline' border='2px' borderColor='black' rightIcon={<ChevronRightIcon />}>
                CLICK TO SEE MORE ABOUT MY WORK
              </Button>
            </NextLink>
          </Box>
        </Section>
      </Trans>

      <Spacer/>
    </Layout>
  </Box>
)

export default Home
export { getServerSideProps } from '../components/chakra'
