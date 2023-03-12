import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  chakra,
  ListItem,
  UnorderedList,
  Button
} from '@chakra-ui/react'

import Paragraph from '../components/paragraph'
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
 <Container maxW='container.lg' mt={90}>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
        {/* <p>MUKIL</p>
          <Heading as="h2" variant="page-title">
            KUMAR
          </Heading> */}
           <Grid templateColumns='repeat(2, fr)'>
           <GridItem w='100%' >
              <Heading as="h2" variant="custom" fontWeight="hairline">
                MUKIL
              </Heading>
            </GridItem>
            <GridItem w='100%' >
              <Heading as="h2" variant="page-title">
                KUMAR
              </Heading>
            </GridItem>
           </Grid>
          <p>AUTOMOTIVE DESIGNER / HIC DESIGNER / SOFTWARE DEVELOPER</p>
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

  {/* <Flex>
    <Box>
      <Heading mt={12} as="h2" variant="page-title">
        MUKIL KUMAR
      </Heading>
      <p>AUTOMOTIVE DESIGNER / HIC DESIGNER / SOFTWARE DEVELOPER</p>
      <Image
      alignItems={'flex-start'}
          src="/images/Imag.png"   // Add image here!
          alt="Img"
          width="457%"
          height="40%"
        />
      </Box>

  <Spacer />

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
          src="/images/mukil.jpg"   // Add image here!
          alt="Profile Image"
          borderRadius="full"
          width="100%"
          height="120%"
        />
      </Box>
      </ Box>
  </Flex> */}

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
      <Grid templateColumns='repeat(2, 2fr)' gap={20}>
      <GridItem w='100%' >

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          INTRODUCTION
        </Heading>
        <Paragraph>
          Mukil is a Dreamer and an engineering student at IET lucknow (2019-2023) 
          based in Uttar Pradesh with passion for designing stuffs like Automobiles
          and all the things in engineering he likes and wants. He has a knack
          way to solving real-life problems with design and code. When not online,
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
        </Paragraph>
      </Section>



      {/* <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Bio
        </Heading>
        <BioSection>
          <BioYear>1984</BioYear>
          Born in Osaka (大阪), Japan.
        </BioSection>
        <BioSection>
          <BioYear>2010</BioYear>
          Completed the Master&apos;s Program in the Graduate School of
          Information Science at Nara Institute of Science and Technology
          (奈良先端科学技術大学院大学情報科学研究科修士課程)
        </BioSection>
        <BioSection>
          <BioYear>2010</BioYear>
          Worked at Yahoo! Japan (ヤフー株式会社入社)
        </BioSection>
        <BioSection>
          <BioYear>2012 to present</BioYear>
          Working as a freelancer
        </BioSection>
      </Section> */}


      </GridItem>
      <GridItem w='100%' >

      

      <Grid templateColumns='repeat(2, 2fr)' gap={0}>

        <GridItem w='100%'>

        <Section delay={0.5}>
        <Heading as="h5" variant="section-title" >
          Languages
        </Heading>

        <UnorderedList mt={10}>
          <ListItem>Hindi</ListItem>
          <ListItem mt={5}>English</ListItem>
          <ListItem mt={5}>Italian</ListItem>
        </UnorderedList>

      </Section>

        </GridItem>

        <GridItem w='100%' mt={10}>
        <Progress value={95} size='sm' colorScheme='green' mt={42} borderRadius={10}/>
        <Progress value={85} size='sm' colorScheme='green' mt={6} borderRadius={10}/>
        <Progress value={30} size='sm' colorScheme='green' mt={6} borderRadius={10}/>
        </GridItem>
      </Grid>

      </GridItem>
      </Grid>
  </Container>                                {/* This Container have Work(About) and languages */}

  <Spacer/>

  {/* <Container maxW='container.lg'
             mt={6}
             mb={8}
             p={4}
  >
      <Grid templateColumns='repeat(2, 2fr)' gap={20}>
      <GridItem w='100%' >

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Software Site
        </Heading>
        <Stack direction='row' h='200px' p={4} >
        <Divider orientation='vertical' />

                  <List spacing={1}>
            <ListItem>
              <ListIcon as={SmallAddIcon} color='green.500' />
              JAVA
            </ListItem>
            <ListItem>
              <ListIcon as={SmallAddIcon} color='green.500' />
              C++, C
            </ListItem>
            <ListItem>
              <ListIcon as={SmallAddIcon} color='green.500' />
              HTML, CSS, JAVASCRPIT, BOOTSTRAP 4
            </ListItem>
            <ListItem>
              <ListIcon as={SmallAddIcon} color='green.500' />
              PYTHON
            </ListItem>
            <ListItem>
              <ListIcon as={SmallAddIcon} color='green.500' />
              PHP, MYSQL
            </ListItem>
            <ListItem>
              <ListIcon as={SmallAddIcon} color='green.500' />
              NODE JS, REACT JS, CHAKRA UI
            </ListItem>
          </List>

        </Stack>
      </Section>
      </GridItem>
      <GridItem w='100%' >

      

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Hardware Site
        </Heading>
        <Stack direction='row' h='200px' p={4} >
        <Divider orientation='vertical' />

                  <List spacing={1}>
            <ListItem>
              <ListIcon as={SmallAddIcon} color='green.500' />
              Development Boards (Atmel, AVR, Raspberry pi)
            </ListItem>
            <ListItem>
              <ListIcon as={SmallAddIcon} color='green.500' />
              TTL Logic Designer
            </ListItem>
            <ListItem>
              <ListIcon as={SmallAddIcon} color='green.500' />
              IOT (Internet of Things)
            </ListItem>
            <ListItem>
              <ListIcon as={SmallAddIcon} color='green.500' />
              Computer Architecture
              </ListItem>
          </List>

        </Stack>
      </Section>

      </GridItem>
      </Grid>
  </Container>                                This Container have skills */}
  
  <Spacer/>

<Trans>
<Section>
<Box align="center" my={4}>
          <NextLink href="/works" passHref scroll={false}>
            <Button rightIcon={<ChevronRightIcon />} variant="ghost">
              <Heading variant="btn" fontWeight="hairline" >
                CLICK TO SEE MORE ABOUT MY WORK
              </Heading>
            </Button>
          </NextLink>
        </Box>
</Section>
</Trans>
  {/* <Container maxW='container.md'>
<Section delay={0.5}>
      <Heading as="h2" variant="section-title">
        Experience
      </Heading>
      <Paragraph>
          Takuya is a freelance and a full-stack developer based in Osaka with a
          passion for building digital services/stuff he wants. He has a knack
          for all things launching products, from planning and designing all the
          way to solving real-life problems with code. When not online, he loves
          hanging out with his camera. Currently, he is living off of his own
          product called{' '}
          <NextLink href="/works/inkdrop" passHref scroll={false}>
            <Link>Inkdrop</Link>
          </NextLink>
          . He publishes content for marketing his products and his YouTube
          channel called &quot;
          <NextLink href="https://www.youtube.com/devaslife" passHref>
            <Link target="_blank">Dev as Life</Link>
          </NextLink>
          &quot; has more than 100k subscribers.
        </Paragraph>
        <Box align="center" my={4} mt={10}>
          <NextLink href="/works" passHref scroll={false}>
            <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
              My Resume
            </Button>
          </NextLink>
        </Box>

</Section>
  </Container>                                 This Container have experience */}

  <Spacer/>

  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
