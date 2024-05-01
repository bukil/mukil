import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  chakra,
  ListItem,
  UnorderedList,
  Button,
  Text,

} from '@chakra-ui/react'

import Layout from '../components/layouts/article'
import { ChevronRightIcon} from '@chakra-ui/icons'
import Section from '../components/section'
import { Grid, GridItem } from '@chakra-ui/react'
import Image from 'next/image'
import { Divider, Progress } from '@chakra-ui/react'
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
  <Layout>

    <Spacer mb={10}/>
 <Container maxW='container.lg'>

      <Box display={{ md:'flex'}}>
        <Box flexGrow={1}>
        {/* <p>MUKIL</p>
          <Heading as="h2" variant="page-title">
            KUMAR
          </Heading> */}
           <Grid templateColumns='repeat(2, fr)'>
           <GridItem w='100%' >
              <Heading as="h2"  fontWeight="hairline">
                MUKIL
              </Heading>
            </GridItem>
            <GridItem w='100%' >
              <Heading as="h2" variant="page-title">
                KUMAR
              </Heading>
            </GridItem>
           </Grid>
          <p> / COMPUTATIONAL DESIGNER / SOFTWARE DEVELOPER / AUTOMOBILES DESIGNER</p>
          <Image
          alignItems={'flex-start'}
          src="/images/Imag.png"   // Add image here!
          alt="Img"
          width="375%"
          height="40%"
        />
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="100px"
            h="120px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <ProfileImage
              src="/images/mukil.jpg"
              alt="Profile image"
              borderRadius="full"
              width="100%"
              height="120%"
            />
          </Box>
        </Box>
      </Box>

  

 </Container> 
                                              {/* This Container have Name and image */}
 <Divider orientation='horizontal'
  mb = {8}
  mt ={6}
  />

  <Spacer />

  <Container maxW='container.lg'
             mt={6}
             mb={8}
             p={2}
  >
      <Grid templateColumns='repeat(2, fr)' gap={20}>
      <GridItem w='100%' >

      <Section delay={0.1}>
        <Heading as="h2"  fontWeight="hairline">
          What people say about me
        </Heading>
        <Text variant="home-txt" fontWeight='normal'>
          Mukil is a Dreamer and an engineering student at IET lucknow (2019-2023) 
          based in Uttar Pradesh with passion for designing stuffs like Automobiles
          and all the things in engineering he likes and wants. He has a knack
          way to solving real-life problems with design and technology. When not online,
          he loves to listening music and walking on the street alone, weird but
          this helps him to understand things, phone camera is his friend and helps
          to keep the stuffs. Currently, he is working on some Project.{' '}
          <NextLink href="#" passHref scroll={false}>
            <Link>Dynamic Steering System</Link>
          </NextLink>
          .  He publishes content just for sharing the work he done on the youtube &quot;
          <NextLink href="https://www.youtube.com/channel/UCVeGi7RNdtqN6_7G-rjdSGQ" passHref>
            <Link target="https://www.youtube.com/channel/UCVeGi7RNdtqN6_7G-rjdSGQ">Mukil</Link>
          </NextLink>
          &quot; has more than 4k subscribers.
        </Text>
      </Section>

      </GridItem>

      <GridItem w='100%' >

      <Grid templateColumns='repeat(4, 5fr)' gap={4}>
        <GridItem w='100%'>

        <Section delay={0.5}>
        <Heading as="h5" variant="section-title" >
          Languages
        </Heading>

        <UnorderedList mt={7}>
          <ListItem>Hindi</ListItem>
          <ListItem mt={5}>English</ListItem>
          <ListItem mt={5}>Italian</ListItem>
        </UnorderedList>

      </Section>

        </GridItem>

        <GridItem w='120%' mt={10}>
        <Progress value={95} size='sm' colorScheme='green' mt={42} borderRadius={10}/>
        <Progress value={85} size='sm' colorScheme='green' mt={6} borderRadius={10}/>
        <Progress value={30} size='sm' colorScheme='green' mt={6} borderRadius={10}/>
        </GridItem>
      </Grid>

      </GridItem>
      </Grid>
  </Container>                                {/* This Container have Work(About) and languages */}

  <Spacer/>

  
  <Spacer/>

<Trans>
<Section>
<Box align="center" my={4}>
          <NextLink href="/works" passHref scroll={true}>
            <Button rightIcon={<ChevronRightIcon />} >
                CLICK TO SEE MORE ABOUT MY WORK
            </Button>
          </NextLink>
        </Box>
</Section>
</Trans>

  <Spacer/>



  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
