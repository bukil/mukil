import { Container, Divider, Heading, SimpleGrid,Link} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import {Stack,Image,Text,Button,useDisclosure,Collapse,Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { Spacer } from '@chakra-ui/react'
import NextLink from 'next/link'
import { ChevronDownIcon, ChevronLeftIcon} from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'

const Trans = styled.span`
  Button {
    transition: 800ms ease;
    transform: rotate(0deg);
  }

  &:hover Button {
    transform: translate(-30px, 0px);
  }
`
const Imgtrans = styled.span`

Button {
  transform: rotate(0deg);
  border-radius: 10px;
  padding: 1px 1px;
  display: inline-block;
  cursor: pointer;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
  background: transparent;
}
&:hover Button {
  transform: translate(20px, 0px);
  
  background: transparent;
}
}
`


function CollapseExWrk() {
  const { isOpen, onToggle } = useDisclosure()
  const { isOpen: isEditOpenmd1 , onOpen: onEditOpenmd1, onClose: onEditClosemd1 } = useDisclosure()
  const { isOpen: isEditOpenmd2 , onOpen: onEditOpenmd2, onClose: onEditClosemd2 } = useDisclosure()
  const { isOpen: isEditOpenmd3 , onOpen: onEditOpenmd3, onClose: onEditClosemd3 } = useDisclosure()
  return (
    <>
      <Button leftIcon={<ChevronDownIcon />} onClick={onToggle} variant="ghost" fontSize={20}>
        Works
      </Button>
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
        
        <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd1}>
           <Image 
          src='/images/works/imgfro1.png'
          alt='Project 3D 1'
          borderRadius='lg'
          />

            {/* ===================Bugatti Chiron Edit Modal===================================================== */}
          <Modal isOpen={isEditOpenmd1} onClose={onEditClosemd1} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >BUGATTI CHIRON</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
                  <Image 
                    src='/images/works/imgfro1.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    mb={10}
                  />
                    <Text fontSize={24} fontWeight={'hairline'}>
                    The Bugatti Chiron is a luxury sports car designed and produced by Bugatti Automobiles
                S A S The car is named after the French racing driver Louis Chiron The Chirons design was led by Bugattis 
                head designer Etienne Salomé and is an evolution of the Veyron design It features a sleek and aerodynamic 
                body with a long hood and a low wide stance The cars front fascia is characterized by its large curved grille 
                and LED headlights while the rear features a distinctive LED light strip and a large integrated spoiler The Chirons 
                body is made of carbon fiber which helps keep the cars weight down and improves its performance The cars interior is 
                also designed with luxury and performance in mind with premium materials advanced technology and a minimalist design But 
                since I cant afford one I decided to create one in Blender a free and open source 3D modeling software, as you can see.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={2} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
                    src='/images/works/imgfro1.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                  />
                  <ModalHeader>TITLE IF ANY</ModalHeader>
                  Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/imgfro1.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                  />
                  <ModalHeader>TITLE IF ANY</ModalHeader>
                  Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/imgfro1.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                  />
                  <ModalHeader>TITLE IF ANY</ModalHeader>
                  Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/imgfro1.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                  />
                  <ModalHeader>TITLE IF ANY</ModalHeader>
                  Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/imgfro1.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                  />
                  <ModalHeader>TITLE IF ANY</ModalHeader>
                  Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want
                  </Section>
                   
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                    ANY TEXT OR 
                    <NextLink href="/" passHref scroll={false}>
                      <Link> ANY LINK </Link>
                    </NextLink>
                     PLACE HERE!
                  </center>
              </ModalBody>
              <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEditClosemd1}>Close</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
          {/* ===================================================================================== */}

           </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3' mb={10}>
          <Heading as="h2"  fontWeight="hairline">
          BUGATTI CHIRON
        </Heading>
          <Text fontSize={'xs'} mb={10}>
          The Bugatti Chiron 3D Project in Blender
          </Text>
        </Stack>
     
        <Imgtrans mt={10}>
          <Button height={'auto'} onClick={onEditOpenmd2}>
            <Image 
          src='/images/works/koegfro1.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />

          {/* ===================Bugatti Chiron Edit Modal===================================================== */}
          <Modal isOpen={isEditOpenmd2} onClose={onEditClosemd2} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >Koenigsegg CC850</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
              <Image 
          src='/images/works/koegfro1.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          mb={10}
          />
                    Koenigsegg CC850 2D Project in Autodesk Sketchbook (ipad, Android).
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={2} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
          src='/images/works/koe1.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>TITLE IF ANY</ModalHeader>
                  Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/koe1.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>TITLE IF ANY</ModalHeader>
                  Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/koe1.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>TITLE IF ANY</ModalHeader>
                  Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/koe1.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>TITLE IF ANY</ModalHeader>
                  Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/koe1.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>TITLE IF ANY</ModalHeader>
                  Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want
                  </Section>
                   
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                    ANY TEXT OR 
                    <NextLink href="/" passHref scroll={false}>
                      <Link> ANY LINK </Link>
                    </NextLink>
                     PLACE HERE!
                  </center>
              </ModalBody>
              <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEditClosemd2}>Close</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
          {/* ===================================================================================== */}


          </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3'>
          <Heading as="h2"  fontWeight="hairline">
          KOENIGSEGG CC850
        </Heading>
          <Text fontSize={'xs'}>
          Koenigsegg CC850, a rare and powerful supercar that can reach speeds of over 400 km/h. 
          I wanted to design my own version of it in Autodesk Sketchbook, a versatile and easy-to-use 
          drawing app on my phone and here is the powerful design journey of the Koenigsegg CC850.
          </Text>
        </Stack>
         
            </Section>    
          {/* Bugatti + Mclaren */}
      


        <Section>
              <Container>
              <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd3}>
                  <Image src='/images/works/bug1.png' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  {/* ===================Bugatti Chiron Edit Modal===================================================== */}
          <Modal isOpen={isEditOpenmd3} onClose={onEditClosemd3} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >BUGATTI VEYRON 16.4</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
              <Image src='/images/works/bug1.png' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                    <Text fontSize={24} fontWeight={'hairline'}>
                    From DNA Arc and framework to symbol of Elegant Hypercars the engine is one of its kind and literally known as 
              Powerplant. I started by creating a new sketch and choosing a orthogonal orientation. added some finishing touches 
              to the car design. I added some reflections glares and sparkles to make it look more shiny and dynamic.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={2} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image src='/images/works/bug1.png' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>TITLE IF ANY</ModalHeader>
                  Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want
                  </Section>

                  <Section>
                  <Image src='/images/works/bug1.png' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>TITLE IF ANY</ModalHeader>
                  Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want
                  </Section>

                  <Section>
                  <Image src='/images/works/bug1.png' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>TITLE IF ANY</ModalHeader>
                  Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want
                  </Section>

                  <Section>
                  <Image src='/images/works/bug1.png' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>TITLE IF ANY</ModalHeader>
                  Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want
                  </Section>

                  <Section>
                  <Image src='/images/works/bug1.png' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>TITLE IF ANY</ModalHeader>
                  Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want Text is car is car this is just to increase lines here take this a quick brown fox jumps over A
                  lazy dog put text anything you want
                  </Section>
                   
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                    Disclaimer:The design and logo name used on this website are the intellectual property of respective owners.
                  </center>
              </ModalBody>
              <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEditClosemd3}>Close</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
          {/* ===================================================================================== */}

                  </Button>
             </Imgtrans>
              <Stack mt='6' spacing='3'>
              <Heading as="h2"  fontWeight="hairline">
          BUGATTI VEYRON 16.4
        </Heading>
              <Text fontSize={'xs'}>
              From DNA Arc and framework to symbol of Elegant Hypercars the engine is one of its kind and literally known as 
              Powerplant. I started by creating a new sketch and choosing a orthogonal orientation. added some finishing touches 
              to the car design. I added some reflections glares and sparkles to make it look more shiny and dynamic.
              </Text>
            </Stack>
              </Container>
      </Section>

      <Section>
      <Container>
      <Imgtrans>
          <Button height={'auto'} background={''}>
            <Image 
          src='/images/works/tar1.png'
          alt='TAREN DRONE'
          borderRadius='lg'
          />
          </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3'>
          <Heading as="h2"  fontWeight="hairline">
          TAREN DRONE
        </Heading>
          <Text fontSize={'xs'}>
          This project is a part of my internship at E-Yantra Indian Institute of Technology Bombay (IITB) I was working as a product designer in team, where we were Designing a multipurpose Drone structure. 
One of my projects was to visualize the 3D Drone concept under the mentorship of Mr. Maddu Murali and we named it TAREN. Taren is a stealth multipurpose drone inspired by a tarantula spider which shows the symbol of aggression and speed, Taren is not only equipped with aesthetics but intelligence also This is why we have wicked smart NVIDIA® Jetson Xavier onboard.
          </Text>

        </Stack>
          </Container>
      </Section>

      <Section>
      <Container>
      <Imgtrans>
          <Button height={'auto'} background={''}>
            <Image 
          src='/images/works/fer1.png'
          alt='FERRARI MONZA SP1'
          borderRadius='lg'
          />
          </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3'>
          <Heading as="h2"  fontWeight="hairline">
          FERRARI MONZA SP1
        </Heading>
          <Text fontSize={'xs'}>
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
          </Text>

        </Stack>
          </Container>
      </Section>

      <Section>
      <Container>
      <Imgtrans>
          <Button height={'auto'} background={''}>
            <Image 
          src='/images/works/lambo1.jpg'
          alt='Cahar'
          borderRadius='lg'
          />
          
          </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3'>
          <Heading as="h2"  fontWeight="hairline">
          BUGATTI CHIRON
        </Heading>
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

        </Stack>
          </Container>
      </Section>

      <Section>
      <Container>
      <Imgtrans>
          <Button height={'auto'} background={''}>
            <Image 
          src='/images/works/drone4.png'
          alt='Cahar'
          borderRadius='lg'
          />
          </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3'>
          <Heading as="h2"  fontWeight="hairline">
          BUGATTI CHIRON
        </Heading>
          <Text fontSize={'xs'}>
            Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
            Do Project Description your Experience or whatsoever you want!
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
// function CollapseExCol() {
//   const { isOpen, onToggle } = useDisclosure()
//   return (
//     <>
//       <Button onClick={onToggle} variant="ghost" fontSize={20}>Collaborations</Button>
//       <Collapse in={isOpen} animateOpacity>
//         <Box
//           p='1px'
//           color='white'
//           mt='4'
//           rounded='md'
//           shadow='md'
//         >
//          {/* Works Content */}
//          <SimpleGrid columns={[1, 2, 3]} gap={10} mt={10}>
//         {/* Starting of Cards - Add or Remove Work cards here */}
//           {/* Bugatti + Mclaren */}
//             <Section>
//         {/* Bugatti 1 Car Content 1 */}
//         <Container mb={10}>
//             <Image 
//           src='/images/works/Bugatti1.jpg'
//           alt='Cahar'
//           borderRadius='lg'
//           />
//           <Stack mt='6' spacing='3'>
//           <Heading as="h2"  fontWeight="hairline">
//           BUGATTI CHIRON
//         </Heading>
//           <Text fontSize={'xs'}>
//             Car is cathe text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
//             Do Project Description your Experience or whatsoever you want!
//           </Text>
//           <Text color='blue.600' fontSize='2xl'>
//             Temp link
//           </Text>
//         </Stack>
//           </Container>
//           <Container>
//             <Image 
//           src='/images/works/mclar.jpg'
//           alt='Cahar'
//           borderRadius='lg'
//           />
//           <Stack mt='6' spacing='3'>
//           <Heading as="h2"  fontWeight="hairline">
//           BUGATTI CHIRON
//         </Heading>
//           <Text fontSize={'xs'}>
//             LOREM IPSUM
//           </Text>
//           <Text color='blue.600' fontSize='2xl'>
//             Temp link
//           </Text>
//         </Stack>
//           </Container>
//             </Section>    
//           {/* Bugatti + Mclaren */}
//       <Section>
//       <Container>
//             <Image 
//           src='/images/works/drone1.png'
//           alt='Cahar'
//           borderRadius='lg'
//           />
//           <Stack mt='6' spacing='3'>
//           <Heading as="h2"  fontWeight="hairline">
//           BUGATTI CHIRON
//         </Heading>
//           <Text fontSize={'xs'}>
//             LOREM IPSUM
//           </Text>
//           <Text color='blue.600' fontSize='2xl'>
//             Temp link
//           </Text>
//         </Stack>
//           </Container>
//       </Section>

//       <Section>
//       <Container>
//             <Image 
//           src='/images/works/drone2.png'
//           alt='Cahar'
//           borderRadius='lg'
//           />
//           <Stack mt='6' spacing='3'>
//           <Heading as="h2"  fontWeight="hairline">
//           BUGATTI CHIRON
//         </Heading>
//           <Text fontSize={'xs'}>
//             Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
//             Do Project Description your Experience or whatsoever you want
//             Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
//             Do Project Description your Experience or whatsoever you want!
//             Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
//             Do Project Description your Experience or whatsoever you want!
//             Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
//             Do Project Description your Experience or whatsoever you want!
//             Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
//             Do Project Description your Experience or whatsoever you want!
//           </Text>
//           <Text color='blue.600' fontSize='2xl'>
//             Temp link
//           </Text>
//         </Stack>
//           </Container>
//       </Section>

//       <Section>
//       <Container>
//             <Image 
//           src='/images/works/drone3.png'
//           alt='Cahar'
//           borderRadius='lg'
//           />
//           <Stack mt='6' spacing='3'>
//           <Heading as="h2"  fontWeight="hairline">
//           BUGATTI CHIRON
//         </Heading>
//           <Text fontSize={'xs'}>
//             Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
//             Do Project Description your Experience or whatsoever you want!
//           </Text>
//           <Text color='blue.600' fontSize='2xl'>
//             Temp link
//           </Text>
//         </Stack>
//           </Container>
//       </Section>

//       <Section>
//       <Container>
//             <Image 
//           src='/images/works/lambo1.jpg'
//           alt='Cahar'
//           borderRadius='lg'
//           />
//           <Stack mt='6' spacing='3'>
//           <Heading as="h2"  fontWeight="hairline">
//           BUGATTI CHIRON
//         </Heading>
//           <Text fontSize={'xs'}>
//             Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
//             Do Project Description your Experience or whatsoever you want!
//             Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
//             Do Project Description your Experience or whatsoever you want!
//             Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
//             Do Project Description your Experience or whatsoever you want!
//             Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
//             Do Project Description your Experience or whatsoever you want!
//           </Text>
//           <Text color='blue.600' fontSize='2xl'>
//             Temp link
//           </Text>
//         </Stack>
//           </Container>
//       </Section>

//       <Section>
//       <Container>
//             <Image 
//           src='/images/works/drone4.png'
//           alt='Cahar'
//           borderRadius='lg'
//           />
//           <Stack mt='6' spacing='3'>
//           <Heading as="h2"  fontWeight="hairline">
//           BUGATTI CHIRON
//         </Heading>
//           <Text fontSize={'xs'}>
//             Car is car the text is just template to increase lines here thake this The quick brown fox jumps over the lazy dog
//             Do Project Description your Experience or whatsoever you want!
//           </Text>
//           <Text color='blue.600' fontSize='2xl'>
//             Temp link
//           </Text>
//         </Stack>
//           </Container>
//       </Section>
//       {/* Ending of Cards - Add or Remove Work cards here */}
//       </SimpleGrid>
//          {/* Works Content */}
//         </Box>
//       </Collapse>
//     </>
//   )
// }

const Works = () => (
  
  <Layout title="Works" mt={10}>
    
      <Section>
      <Heading as="h3" fontSize={50} mb={15} mt={10}>
       <CollapseExWrk/>
      </Heading>
      </Section>

{/* 

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

      </SimpleGrid> */}

      <Spacer/>

<Trans>
<Section>
<Box align="center" my={4}>
          <NextLink href="/" passHref scroll={true}>
            <Button leftIcon={<ChevronLeftIcon />}>
                GO BACK TO HOME PAGE
            </Button>
            
          </NextLink>
        </Box>
</Section>
</Trans>

  </Layout>
)

export default Works
export { getServerSideProps } from '../components/chakra'
