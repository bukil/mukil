import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import {Stack,Image,Text,Button,useDisclosure,Collapse,Box } from '@chakra-ui/react'

function CollapseExWrk() {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <>
      <Button onClick={onToggle} variant="ghost" fontSize={20}>Works</Button>
      <Collapse in={!isOpen} animateOpacity>
        <Box
          p='1px'
          color='white'
          mt='4'
          rounded='md'
          shadow='md'
        >
         {/* Works Content */}
         <SimpleGrid columns={[1, 2, 3]} gap={10} mt={10}>
        {/* Starting of Cards - Add or Remove Work cards here */}
          {/* Bugatti + Mclaren */}
            <Section>
        {/* Bugatti 1 Car Content 1 */}
        <Container mb={20}>
            <Image 
          src='/images/works/Bugatti1.jpg'
          alt='Project 3D 1'
          borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
          <Heading size='md'>ABOUT</Heading>
          <Text fontSize={'xs'}>
          The
Bugatti Chiron is a luxury sports car designed and produced by Bugatti Automobiles
S A S The car is named after the French racing driver Louis Chiron The Chiron's design was
led by Bugatti's head designer Etienne Salomé, and is an evolution of the Veyron design It
features a sleek and aerodynamic body, with a long hood and a low, wide stance The car's
front fascia is characterized by its large, curved grille and LED headlights, while the rear
features a distinctive LED light strip and a large, integrated spoiler The Chiron's body is
made of carbon fiber, which helps keep the car's weight down and improves its
performance The car's interior is also designed with luxury and performance in mind, with
premium materials, advanced technology, and a minimalist design!
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            Temp link
          </Text>
        </Stack>
          </Container>
          <Container>
            <Image 
          src='/images/works/mclar.jpg'
          alt='Cahar'
          borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
          <Heading size='md'>Car Name-Project Name-Heading</Heading>
          <Text fontSize={'xs'}>
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            Temp link
          </Text>
        </Stack>
          </Container>
            </Section>    
          {/* Bugatti + Mclaren */}
      


        <Section>
              <Container>
                
                  <Image src='/images/works/drone1.png' alt='Cahar' borderRadius='lg'/>
             
              <Stack mt='6' spacing='3'>
              <Heading size='md'>Car Name-Project Name-Heading</Heading>
              <Text fontSize={'xs'}>
                Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
                Do Project Description your Experience or whatsoever you want
                Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
                Do Project Descriptio your Experience or whatsoever you want!
                Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
                Do Project Description your Experience or whatsoever you want!
                Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
                Do Project Description your Experience or whatsoever you want!
                Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
                Do Project Description your Experience or whatsoever you want!
              </Text>
            </Stack>
              </Container>
      </Section>

      <Section>
      <Container>
            <Image 
          src='/images/works/drone2.png'
          alt='Cahar'
          borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
          <Heading size='md'>Car Name-Project Name-Heading</Heading>
          <Text fontSize={'xs'}>
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            Temp link
          </Text>
        </Stack>
          </Container>
      </Section>

      <Section>
      <Container>
            <Image 
          src='/images/works/drone3.png'
          alt='Cahar'
          borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
          <Heading size='md'>Car Name-Project Name-Heading</Heading>
          <Text fontSize={'xs'}>
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            Temp link
          </Text>
        </Stack>
          </Container>
      </Section>

      <Section>
      <Container>
            <Image 
          src='/images/works/lambo1.jpg'
          alt='Cahar'
          borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
          <Heading size='md'>Car Name-Project Name-Heading</Heading>
          <Text fontSize={'xs'}>
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            Temp link
          </Text>
        </Stack>
          </Container>
      </Section>

      <Section>
      <Container>
            <Image 
          src='/images/works/drone4.png'
          alt='Cahar'
          borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
          <Heading size='md'>Car Name-Project Name-Heading</Heading>
          <Text fontSize={'xs'}>
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            Temp link
          </Text>
        </Stack>
          </Container>
      </Section>
      {/* Ending of Cards - Add or Remove Work cards here */}
      </SimpleGrid>
         {/* Works Content */}
        </Box>
      </Collapse>
    </>
  )
}

// ================ End of Work Section =========================

// ============= Coll ===========================================
function CollapseExCol() {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <>
      <Button onClick={onToggle} variant="ghost" fontSize={20}>Collaborations</Button>
      <Collapse in={isOpen} animateOpacity>
        <Box
          p='1px'
          color='white'
          mt='4'
          rounded='md'
          shadow='md'
        >
         {/* Works Content */}
         <SimpleGrid columns={[1, 2, 3]} gap={10} mt={10}>
        {/* Starting of Cards - Add or Remove Work cards here */}
          {/* Bugatti + Mclaren */}
            <Section>
        {/* Bugatti 1 Car Content 1 */}
        <Container mb={10}>
            <Image 
          src='/images/works/Bugatti1.jpg'
          alt='Cahar'
          borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
          <Heading size='md'>Car Name-Project Name-Heading</Heading>
          <Text fontSize={'xs'}>
            Car is cathe text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            Temp link
          </Text>
        </Stack>
          </Container>
          <Container>
            <Image 
          src='/images/works/mclar.jpg'
          alt='Cahar'
          borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
          <Heading size='md'>Car Name-Project Name-Heading</Heading>
          <Text fontSize={'xs'}>
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            Temp link
          </Text>
        </Stack>
          </Container>
            </Section>    
          {/* Bugatti + Mclaren */}
      <Section>
      <Container>
            <Image 
          src='/images/works/drone1.png'
          alt='Cahar'
          borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
          <Heading size='md'>Car Name-Project Name-Heading</Heading>
          <Text fontSize={'xs'}>
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Descriptio your Experience or whatsoever you want!
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            Temp link
          </Text>
        </Stack>
          </Container>
      </Section>

      <Section>
      <Container>
            <Image 
          src='/images/works/drone2.png'
          alt='Cahar'
          borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
          <Heading size='md'>Car Name-Project Name-Heading</Heading>
          <Text fontSize={'xs'}>
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            Temp link
          </Text>
        </Stack>
          </Container>
      </Section>

      <Section>
      <Container>
            <Image 
          src='/images/works/drone3.png'
          alt='Cahar'
          borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
          <Heading size='md'>Car Name-Project Name-Heading</Heading>
          <Text fontSize={'xs'}>
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            Temp link
          </Text>
        </Stack>
          </Container>
      </Section>

      <Section>
      <Container>
            <Image 
          src='/images/works/lambo1.jpg'
          alt='Cahar'
          borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
          <Heading size='md'>Car Name-Project Name-Heading</Heading>
          <Text fontSize={'xs'}>
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            Temp link
          </Text>
        </Stack>
          </Container>
      </Section>

      <Section>
      <Container>
            <Image 
          src='/images/works/drone4.png'
          alt='Cahar'
          borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
          <Heading size='md'>Car Name-Project Name-Heading</Heading>
          <Text fontSize={'xs'}>
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
          </Text>
          <Text color='blue.600' fontSize='2xl'>
            Temp link
          </Text>
        </Stack>
          </Container>
      </Section>
      {/* Ending of Cards - Add or Remove Work cards here */}
      </SimpleGrid>
         {/* Works Content */}
        </Box>
      </Collapse>
    </>
  )
}

const Works = () => (
  
  <Layout title="Works" mt={10}>
      <Section>
      <Heading as="h3" fontSize={50} mb={15} mt={10}>
       <CollapseExWrk/>
      </Heading>
      </Section>



      <Section delay={0.2}>
        <Divider my={6} />

        <Heading as="h3" fontSize={50} mb={15} mt={10}>
        <CollapseExCol/>
        </Heading>
      </Section>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
      </SimpleGrid>

      <Section delay={0.4}>
        <Divider my={6} />

        <Heading as="h3" fontSize={20} mb={4}>
          Old works
        </Heading>
      </Section>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>

      </SimpleGrid>
  </Layout>
)

export default Works
export { getServerSideProps } from '../components/chakra'
