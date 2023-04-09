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
  filter: blur(5px);
  -webkit-filter: blur(5px);

}
}
`


function CollapseExtandi() {
  const { isOpen, onToggle } = useDisclosure()
  const { isOpen: isEditOpenmd1 , onOpen: onEditOpenmd1, onClose: onEditClosemd1 } = useDisclosure()
  const { isOpen: isEditOpenmd2 , onOpen: onEditOpenmd2, onClose: onEditClosemd2 } = useDisclosure()
  const { isOpen: isEditOpenmd3 , onOpen: onEditOpenmd3, onClose: onEditClosemd3 } = useDisclosure()
  const { isOpen: isEditOpenmd4 , onOpen: onEditOpenmd4, onClose: onEditClosemd4 } = useDisclosure()
  const { isOpen: isEditOpenmd5 , onOpen: onEditOpenmd5, onClose: onEditClosemd5 } = useDisclosure()
  const { isOpen: isEditOpenmd6 , onOpen: onEditOpenmd6, onClose: onEditClosemd6 } = useDisclosure()
  const { isOpen: isEditOpenmd7 , onOpen: onEditOpenmd7, onClose: onEditClosemd7 } = useDisclosure()
  return (
    <>
      <Button leftIcon={<ChevronDownIcon />} onClick={onToggle} variant="ghost" fontSize={20}>
        TRANSPORTATION AND INDUSTRIAL
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
                since I cant afford one I decided to create one in Blender a free and open source 3D modeling software.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={2} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
                    src='/images/works/WIRE.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                  />
                  <ModalHeader>MODELING AND WIREFRAMING</ModalHeader>
                 
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/lit.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                  />
                  <ModalHeader>ENVIRONMENT AND LIGHT</ModalHeader>
                  
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/frame.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                  />
                  <ModalHeader>TEXTURING AND SURFACING</ModalHeader>
                 
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/jug.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                  />
                  <ModalHeader>RENDERING (CYCLES)</ModalHeader>
                  
                  </Section>

                  <Section>
                  <Box
    as='video'
    controls
    autoplay
    src='/images/works/jug.mp4'
    poster='images/works/huj.jpg?x11217'
    alt='Big Buck Bunny'
    objectFit='contain'
    sx={{
      aspectRatio: '16/9'
    }}
/>
                  <ModalHeader>ANIMATION</ModalHeader>
              
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
          The Bugatti Chiron 3D Project in blender 
          </Text>
        </Stack>
         
            </Section>

            <Section>
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
          /><Text fontSize={24} fontWeight={'hairline'}>
                    Koenigsegg CC850, a rare and powerful supercar that can reach speeds of over 400 km/h. 
                    I wanted to design my own version of it in Autodesk Sketchbook, a versatile and easy-to-use 
                    drawing app on my phone and here is the powerful design journey of the Koenigsegg CC850.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={2} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
          src='/images/works/KOENIGSEGG CC3.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>Basic Sketch and Orthogonal framework</ModalHeader>
                  I initiate by choosing simple orthogonal orientation and draw the basic structure. I used reference images from the internet to help me get the proportions and details
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/KOENIGSEGG CC2.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>Shading and Principal Color</ModalHeader>
                    I drew the car from a side view and add signature grey color, making sure to capture the distinctive features of the CC850, such as the targa top, the dihedral doors, and the large wheels.
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/Konigsegg.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>Texture and Volume Rendering</ModalHeader>
                  Next, I added some shading and highlights to the sketch using different shades of gray. I used a soft brush tool with low opacity to create smooth gradients and shadows. I also used a hard eraser tool to erase some parts of the outline and make the sketch look more realistic. I paid attention to the light source and how it reflected on the car’s surface.
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/wokbench.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>😁My Compact Canvas✍️</ModalHeader>
                  This is what it looks like when working on the Android version of Autodesk Sketchbook
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/koe1.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>⚠️And results are awesome</ModalHeader>
                  After adding few more detail and wheel textures for more dynamic visuals the ultimate result is here.
                  </Section>
                   
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                    Disclaimer:The design and logo name used on this website are the intellectual property of respective owners.
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
          Design Journey of Koenigsegg CC850 2D Project in Autodesk Sketchbook
          </Text>
        </Stack></Section>    
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
                    Welcome to the design journey of the legendary Bugatti Veyron 16.4 Sports Grande. From DNA Arc and framework to symbol of Elegant Hypercars the engine is one of its kind and literally known as 
              Powerplant.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={2} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image src='/images/works/bugta.jpg' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Framework and Basic Structure </ModalHeader>
                  I chose a pencil tool with a thin tip and low opacity to draw the outline of the car. I used reference images from the internet to help me get the proportions and details right.
                  </Section>

                  <Section>
                  <Image src='/images/works/rawbug.jpg' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Principal Color and Material</ModalHeader>
                  Adding Principal color and reflection elements
                  </Section>

                  <Section>
                  <Image src='/images/works/buga.jpg' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Light Source and Surfacing</ModalHeader>
                  I added some shading and highlights to the sketch using different shades of gray. I used a soft brush tool with low opacity to create smooth gradients and shadows. I also used a hard eraser tool to erase sharp reflection parts of the outline and make the sketch look more realistic. I paid attention to the light source and how it reflected on the car’s surface.
                  </Section>

                  <Section>
                  <Image src='/images/works/buga2.jpg' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Different version</ModalHeader>
                  Also triad different version of the design with some tweak in visuals and colors.
                  </Section>

                  <Section>
                  <Image src='/images/works/bug1.png' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Final Render</ModalHeader>
                  After adding few more detail and wheel textures for more dynamic visuals.
                  
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
             Sketch of Bugatti Veyron 16.4 Grande sports in Autodesk Sketchbook(Android)
              </Text>
            </Stack>
              </Container>
      </Section>

      <Section>
      <Container>
      <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd4}>
            <Image 
          src='/images/works/tar1.png'
          alt='TAREN DRONE'
          borderRadius='lg'
          />
          {/* ===================Bugatti Chiron Edit Modal===================================================== */}
          <Modal isOpen={isEditOpenmd4} onClose={onEditClosemd4} size={'full'} scrollBehavior={'outside'}>
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
          /><Text fontSize={24} fontWeight={'hairline'}>
                    Koenigsegg CC850, a rare and powerful supercar that can reach speeds of over 400 km/h. 
                    I wanted to design my own version of it in Autodesk Sketchbook, a versatile and easy-to-use 
                    drawing app on my phone and here is the powerful design journey of the Koenigsegg CC850.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={2} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
          src='/images/works/KOENIGSEGG CC3.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>Basic Sketch and Orthogonal framework</ModalHeader>
                  I initiate by choosing simple orthogonal orientation and draw the basic structure. I used reference images from the internet to help me get the proportions and details
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/KOENIGSEGG CC2.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>Shading and Principal Color</ModalHeader>
                    I drew the car from a side view and add signature grey color, making sure to capture the distinctive features of the CC850, such as the targa top, the dihedral doors, and the large wheels.
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/Konigsegg.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>Texture and Volume Rendering</ModalHeader>
                  Next, I added some shading and highlights to the sketch using different shades of gray. I used a soft brush tool with low opacity to create smooth gradients and shadows. I also used a hard eraser tool to erase some parts of the outline and make the sketch look more realistic. I paid attention to the light source and how it reflected on the car’s surface.
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/wokbench.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>😁My Compact Canvas✍️</ModalHeader>
                  This is what it looks like when working on the Android version of Autodesk Sketchbook
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/koe1.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>⚠️And results are awesome</ModalHeader>
                  After adding few more detail and wheel textures for more dynamic visuals the ultimate result is here.
                  </Section>
                   
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                    Disclaimer:The design and logo name used on this website are the intellectual property of respective owners.
                  </center>
              </ModalBody>
              <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEditClosemd4}>Close</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
          {/* ===================================================================================== */}
          </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3'>
          <Heading as="h2"  fontWeight="hairline">
          TAREN DRONE
        </Heading>
          <Text fontSize={'xs'}>
          Design Journey Of Multipurpose Drone Body
          </Text>

        </Stack>
          </Container>
      </Section>

      <Section>
      <Container>
      <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd5}>
            <Image 
          src='/images/works/fer1.png'
          alt='FERRARI MONZA SP1'
          borderRadius='lg'
          />
          {/* ===================Bugatti Chiron Edit Modal===================================================== */}
          <Modal isOpen={isEditOpenmd5} onClose={onEditClosemd5} size={'full'} scrollBehavior={'outside'}>
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
                    Welcome to the design journey of the legendary Bugatti Veyron 16.4 Sports Grande. From DNA Arc and framework to symbol of Elegant Hypercars the engine is one of its kind and literally known as 
              Powerplant.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={2} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image src='/images/works/bugta.jpg' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Framework and Basic Structure </ModalHeader>
                  I chose a pencil tool with a thin tip and low opacity to draw the outline of the car. I used reference images from the internet to help me get the proportions and details right.
                  </Section>

                  <Section>
                  <Image src='/images/works/rawbug.jpg' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Principal Color and Material</ModalHeader>
                  Adding Principal color and reflection elements
                  </Section>

                  <Section>
                  <Image src='/images/works/buga.jpg' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Light Source and Surfacing</ModalHeader>
                  I added some shading and highlights to the sketch using different shades of gray. I used a soft brush tool with low opacity to create smooth gradients and shadows. I also used a hard eraser tool to erase sharp reflection parts of the outline and make the sketch look more realistic. I paid attention to the light source and how it reflected on the car’s surface.
                  </Section>

                  <Section>
                  <Image src='/images/works/buga2.jpg' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Different version</ModalHeader>
                  Also triad different version of the design with some tweak in visuals and colors.
                  </Section>

                  <Section>
                  <Image src='/images/works/bug1.png' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Final Render</ModalHeader>
                  After adding few more detail and wheel textures for more dynamic visuals.
                  
                  </Section>
                   
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                    Disclaimer:The design and logo name used on this website are the intellectual property of respective owners.
                  </center>
              </ModalBody>
              <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEditClosemd5}>Close</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
          {/* ===================================================================================== */}
          </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3'>
          <Heading as="h2"  fontWeight="hairline">
          FERRARI MONZA SP1
        </Heading>
          <Text fontSize={'xs'}>
            Ferrari Monza SP1 3D Design Project in Blender
          </Text>

        </Stack>
          </Container>
      </Section>

      <Section>
      <Container>
      <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd6}>
            <Image 
          src='/images/works/lambo1.jpg'
          alt='Cahar'
          borderRadius='lg'
          />
          {/* ===================Bugatti Chiron Edit Modal===================================================== */}
          <Modal isOpen={isEditOpenmd6} onClose={onEditClosemd6} size={'full'} scrollBehavior={'outside'}>
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
                since I cant afford one I decided to create one in Blender a free and open source 3D modeling software.
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
              <Button variant="ghost" mr={3} onClick={onEditClosemd6}>Close</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
          {/* ===================================================================================== */}

          </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3'>
          <Heading as="h2"  fontWeight="hairline">
          LAMBORGHINI TERZO MILLENNIO
        </Heading>
          <Text fontSize={'xs'}>
          3D Renderings of Lamboorghini Terzo Millennio in Blender
          </Text>

        </Stack>
          </Container>
      </Section>

      <Section>
      <Container>
      <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd7}>
            <Image 
          src='/images/works/drone4.png'
          alt='Cahar'
          borderRadius='lg'
          />
          {/* ===================Bugatti Chiron Edit Modal===================================================== */}
          <Modal isOpen={isEditOpenmd7} onClose={onEditClosemd7} size={'full'} scrollBehavior={'outside'}>
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
          /><Text fontSize={24} fontWeight={'hairline'}>
                    Koenigsegg CC850, a rare and powerful supercar that can reach speeds of over 400 km/h. 
                    I wanted to design my own version of it in Autodesk Sketchbook, a versatile and easy-to-use 
                    drawing app on my phone and here is the powerful design journey of the Koenigsegg CC850.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={2} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
          src='/images/works/KOENIGSEGG CC3.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>Basic Sketch and Orthogonal framework</ModalHeader>
                  I initiate by choosing simple orthogonal orientation and draw the basic structure. I used reference images from the internet to help me get the proportions and details
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/KOENIGSEGG CC2.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>Shading and Principal Color</ModalHeader>
                    I drew the car from a side view and add signature grey color, making sure to capture the distinctive features of the CC850, such as the targa top, the dihedral doors, and the large wheels.
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/Konigsegg.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>Texture and Volume Rendering</ModalHeader>
                  Next, I added some shading and highlights to the sketch using different shades of gray. I used a soft brush tool with low opacity to create smooth gradients and shadows. I also used a hard eraser tool to erase some parts of the outline and make the sketch look more realistic. I paid attention to the light source and how it reflected on the car’s surface.
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/wokbench.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>😁My Compact Canvas✍️</ModalHeader>
                  This is what it looks like when working on the Android version of Autodesk Sketchbook
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/koe1.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>⚠️And results are awesome</ModalHeader>
                  After adding few more detail and wheel textures for more dynamic visuals the ultimate result is here.
                  </Section>
                   
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                    Disclaimer:The design and logo name used on this website are the intellectual property of respective owners.
                  </center>
              </ModalBody>
              <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEditClosemd7}>Close</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
          {/* ===================================================================================== */}
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
function CollapseExtart() {
  const { isOpen, onToggle } = useDisclosure()
  const { isOpen: isEditOpenmd1 , onOpen: onEditOpenmd1, onClose: onEditClosemd1 } = useDisclosure()
  const { isOpen: isEditOpenmd2 , onOpen: onEditOpenmd2, onClose: onEditClosemd2 } = useDisclosure()
  const { isOpen: isEditOpenmd3 , onOpen: onEditOpenmd3, onClose: onEditClosemd3 } = useDisclosure()
  const { isOpen: isEditOpenmd4 , onOpen: onEditOpenmd4, onClose: onEditClosemd4 } = useDisclosure()
  const { isOpen: isEditOpenmd5 , onOpen: onEditOpenmd5, onClose: onEditClosemd5 } = useDisclosure()
  const { isOpen: isEditOpenmd6 , onOpen: onEditOpenmd6, onClose: onEditClosemd6 } = useDisclosure()
  const { isOpen: isEditOpenmd7 , onOpen: onEditOpenmd7, onClose: onEditClosemd7 } = useDisclosure()
  return (
    <>
      <Button leftIcon={<ChevronDownIcon />} onClick={onToggle} variant="ghost" fontSize={20}>
        ✍️ART AND ANIMATION📽️
      </Button>
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
        
        <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd1}>
           <Image 
          src='/images/works/ske.png'
          alt='Project 3D 1'
          borderRadius='lg'
          />

            {/* ===================Bugatti Chiron Edit Modal===================================================== */}
          <Modal isOpen={isEditOpenmd1} onClose={onEditClosemd1} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >ART AND ANIMATION 📽️</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
                  
                    <Text fontSize={24} fontWeight={'hairline'}>
                    It’s not a bug or unmannered section. It’s an undocumented feature of the site!
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={2} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  
                    <Box
                    as='video'
                    controls
                    src='/images/works/fgh.mp4'
                    poster='/images/works/koegfro1.png'
                    alt='Koenigsegg cc850 video'
                    width={ 'container.lg' }

                    objectFit='contain'
                    sx={{
                      aspectRatio: '16/9'
                    }}
                />
                  <ModalHeader>KOENIGSEGG CC850</ModalHeader>
          
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/imgfro1.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                  />
                  <ModalHeader>TITLE IF ANY</ModalHeader>
                 
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/imgfro1.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                  />
                  <ModalHeader>TITLE IF ANY</ModalHeader>
                  
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/imgfro1.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                  />
                  <ModalHeader>TITLE IF ANY</ModalHeader>
                 
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/imgfro1.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                  />
                  <ModalHeader>TITLE IF ANY</ModalHeader>
                  
                  </Section>
                   
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                    I post content ferquently on my Instagram handle 
                    <NextLink href="/" passHref scroll={false}>
                      <Link> https://www.instagram.com/magna_kaizen/</Link>
                    </NextLink>
                     
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
          The Bugatti Chiron 3D Project in blender 
          </Text>
        </Stack>
         
            </Section>

            <Section>
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
          /><Text fontSize={24} fontWeight={'hairline'}>
                    Koenigsegg CC850, a rare and powerful supercar that can reach speeds of over 400 km/h. 
                    I wanted to design my own version of it in Autodesk Sketchbook, a versatile and easy-to-use 
                    drawing app on my phone and here is the powerful design journey of the Koenigsegg CC850.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={2} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
          src='/images/works/KOENIGSEGG CC3.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>Basic Sketch and Orthogonal framework</ModalHeader>
                  I initiate by choosing simple orthogonal orientation and draw the basic structure. I used reference images from the internet to help me get the proportions and details
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/KOENIGSEGG CC2.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>Shading and Principal Color</ModalHeader>
                    I drew the car from a side view and add signature grey color, making sure to capture the distinctive features of the CC850, such as the targa top, the dihedral doors, and the large wheels.
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/Konigsegg.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>Texture and Volume Rendering</ModalHeader>
                  Next, I added some shading and highlights to the sketch using different shades of gray. I used a soft brush tool with low opacity to create smooth gradients and shadows. I also used a hard eraser tool to erase some parts of the outline and make the sketch look more realistic. I paid attention to the light source and how it reflected on the car’s surface.
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/wokbench.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>😁My Compact Canvas✍️</ModalHeader>
                  This is what it looks like when working on the Android version of Autodesk Sketchbook
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/koe1.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>⚠️And results are awesome</ModalHeader>
                  After adding few more detail and wheel textures for more dynamic visuals the ultimate result is here.
                  </Section>
                   
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                    Disclaimer:The design and logo name used on this website are the intellectual property of respective owners.
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
          Design Journey of Koenigsegg CC850 2D Project in Autodesk Sketchbook
          </Text>
        </Stack></Section>    
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
                    Welcome to the design journey of the legendary Bugatti Veyron 16.4 Sports Grande. From DNA Arc and framework to symbol of Elegant Hypercars the engine is one of its kind and literally known as 
              Powerplant.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={2} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image src='/images/works/bugta.jpg' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Framework and Basic Structure </ModalHeader>
                  I chose a pencil tool with a thin tip and low opacity to draw the outline of the car. I used reference images from the internet to help me get the proportions and details right.
                  </Section>

                  <Section>
                  <Image src='/images/works/rawbug.jpg' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Principal Color and Material</ModalHeader>
                  Adding Principal color and reflection elements
                  </Section>

                  <Section>
                  <Image src='/images/works/buga.jpg' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Light Source and Surfacing</ModalHeader>
                  I added some shading and highlights to the sketch using different shades of gray. I used a soft brush tool with low opacity to create smooth gradients and shadows. I also used a hard eraser tool to erase sharp reflection parts of the outline and make the sketch look more realistic. I paid attention to the light source and how it reflected on the car’s surface.
                  </Section>

                  <Section>
                  <Image src='/images/works/buga2.jpg' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Different version</ModalHeader>
                  Also triad different version of the design with some tweak in visuals and colors.
                  </Section>

                  <Section>
                  <Image src='/images/works/bug1.png' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Final Render</ModalHeader>
                  After adding few more detail and wheel textures for more dynamic visuals.
                  
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
             Sketch of Bugatti Veyron 16.4 Grande sports in Autodesk Sketchbook(Android)
              </Text>
            </Stack>
              </Container>
      </Section>

      <Section>
      <Container>
      <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd4}>
            <Image 
          src='/images/works/tar1.png'
          alt='TAREN DRONE'
          borderRadius='lg'
          />
          {/* ===================Bugatti Chiron Edit Modal===================================================== */}
          <Modal isOpen={isEditOpenmd4} onClose={onEditClosemd4} size={'full'} scrollBehavior={'outside'}>
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
          /><Text fontSize={24} fontWeight={'hairline'}>
                    Koenigsegg CC850, a rare and powerful supercar that can reach speeds of over 400 km/h. 
                    I wanted to design my own version of it in Autodesk Sketchbook, a versatile and easy-to-use 
                    drawing app on my phone and here is the powerful design journey of the Koenigsegg CC850.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={2} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
          src='/images/works/KOENIGSEGG CC3.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>Basic Sketch and Orthogonal framework</ModalHeader>
                  I initiate by choosing simple orthogonal orientation and draw the basic structure. I used reference images from the internet to help me get the proportions and details
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/KOENIGSEGG CC2.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>Shading and Principal Color</ModalHeader>
                    I drew the car from a side view and add signature grey color, making sure to capture the distinctive features of the CC850, such as the targa top, the dihedral doors, and the large wheels.
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/Konigsegg.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>Texture and Volume Rendering</ModalHeader>
                  Next, I added some shading and highlights to the sketch using different shades of gray. I used a soft brush tool with low opacity to create smooth gradients and shadows. I also used a hard eraser tool to erase some parts of the outline and make the sketch look more realistic. I paid attention to the light source and how it reflected on the car’s surface.
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/wokbench.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>😁My Compact Canvas✍️</ModalHeader>
                  This is what it looks like when working on the Android version of Autodesk Sketchbook
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/koe1.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>⚠️And results are awesome</ModalHeader>
                  After adding few more detail and wheel textures for more dynamic visuals the ultimate result is here.
                  </Section>
                   
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                    Disclaimer:The design and logo name used on this website are the intellectual property of respective owners.
                  </center>
              </ModalBody>
              <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEditClosemd4}>Close</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
          {/* ===================================================================================== */}
          </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3'>
          <Heading as="h2"  fontWeight="hairline">
          TAREN DRONE
        </Heading>
          <Text fontSize={'xs'}>
          Design Journey Of Multipurpose Drone Body
          </Text>

        </Stack>
          </Container>
      </Section>

      <Section>
      <Container>
      <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd5}>
            <Image 
          src='/images/works/fer1.png'
          alt='FERRARI MONZA SP1'
          borderRadius='lg'
          />
          {/* ===================Bugatti Chiron Edit Modal===================================================== */}
          <Modal isOpen={isEditOpenmd5} onClose={onEditClosemd5} size={'full'} scrollBehavior={'outside'}>
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
                    Welcome to the design journey of the legendary Bugatti Veyron 16.4 Sports Grande. From DNA Arc and framework to symbol of Elegant Hypercars the engine is one of its kind and literally known as 
              Powerplant.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={2} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image src='/images/works/bugta.jpg' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Framework and Basic Structure </ModalHeader>
                  I chose a pencil tool with a thin tip and low opacity to draw the outline of the car. I used reference images from the internet to help me get the proportions and details right.
                  </Section>

                  <Section>
                  <Image src='/images/works/rawbug.jpg' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Principal Color and Material</ModalHeader>
                  Adding Principal color and reflection elements
                  </Section>

                  <Section>
                  <Image src='/images/works/buga.jpg' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Light Source and Surfacing</ModalHeader>
                  I added some shading and highlights to the sketch using different shades of gray. I used a soft brush tool with low opacity to create smooth gradients and shadows. I also used a hard eraser tool to erase sharp reflection parts of the outline and make the sketch look more realistic. I paid attention to the light source and how it reflected on the car’s surface.
                  </Section>

                  <Section>
                  <Image src='/images/works/buga2.jpg' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Different version</ModalHeader>
                  Also triad different version of the design with some tweak in visuals and colors.
                  </Section>

                  <Section>
                  <Image src='/images/works/bug1.png' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Final Render</ModalHeader>
                  After adding few more detail and wheel textures for more dynamic visuals.
                  
                  </Section>
                   
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                    Disclaimer:The design and logo name used on this website are the intellectual property of respective owners.
                  </center>
              </ModalBody>
              <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEditClosemd5}>Close</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
          {/* ===================================================================================== */}
          </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3'>
          <Heading as="h2"  fontWeight="hairline">
          FERRARI MONZA SP1
        </Heading>
          <Text fontSize={'xs'}>
            Ferrari Monza SP1 3D Design Project in Blender
          </Text>

        </Stack>
          </Container>
      </Section>

      <Section>
      <Container>
      <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd6}>
            <Image 
          src='/images/works/lambo1.jpg'
          alt='Cahar'
          borderRadius='lg'
          />
          {/* ===================Bugatti Chiron Edit Modal===================================================== */}
          <Modal isOpen={isEditOpenmd6} onClose={onEditClosemd6} size={'full'} scrollBehavior={'outside'}>
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
                    Bugatti Chiron is a luxury sports car designed and produced by Bugatti Automobiles
                S A S The car is named after the French racing driver Louis Chiron The Chirons design was led by Bugattis 
                head designer Etienne Salomé and is an evolution of the Veyron design It features a sleek and aerodynamic 
                body with a long hood and a low wide stance The cars front fascia is characterized by its large curved grille 
                and LED headlights while the rear features a distinctive LED light strip and a large integrated spoiler The Chirons 
                body is made of carbon fiber which helps keep the cars weight down and improves its performance The cars interior is 
                also designed with luxury and performance in mind with premium materials advanced technology and a minimalist design But 
                since I cant afford one I decided to create one in Blender a free and open source 3D modeling software.
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
              <Button variant="ghost" mr={3} onClick={onEditClosemd6}>Close</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
          {/* ===================================================================================== */}

          </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3'>
          <Heading as="h2"  fontWeight="hairline">
          LAMBORGHINI TERZO MILLENNIO
        </Heading>
          <Text fontSize={'xs'}>
          3D Renderings of Lamboorghini Terzo Millennio in Blender
          </Text>

        </Stack>
          </Container>
      </Section>

      <Section>
      <Container>
      <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd7}>
            <Image 
          src='/images/works/drone4.png'
          alt='Cahar'
          borderRadius='lg'
          />
          {/* ===================Bugatti Chiron Edit Modal===================================================== */}
          <Modal isOpen={isEditOpenmd7} onClose={onEditClosemd7} size={'full'} scrollBehavior={'outside'}>
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
          /><Text fontSize={24} fontWeight={'hairline'}>
                    Koenigsegg CC850, a rare and powerful supercar that can reach speeds of over 400 km/h. 
                    I wanted to design my own version of it in Autodesk Sketchbook, a versatile and easy-to-use 
                    drawing app on my phone and here is the powerful design journey of the Koenigsegg CC850.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={2} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
          src='/images/works/KOENIGSEGG CC3.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>Basic Sketch and Orthogonal framework</ModalHeader>
                  I initiate by choosing simple orthogonal orientation and draw the basic structure. I used reference images from the internet to help me get the proportions and details
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/KOENIGSEGG CC2.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>Shading and Principal Color</ModalHeader>
                    I drew the car from a side view and add signature grey color, making sure to capture the distinctive features of the CC850, such as the targa top, the dihedral doors, and the large wheels.
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/Konigsegg.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>Texture and Volume Rendering</ModalHeader>
                  Next, I added some shading and highlights to the sketch using different shades of gray. I used a soft brush tool with low opacity to create smooth gradients and shadows. I also used a hard eraser tool to erase some parts of the outline and make the sketch look more realistic. I paid attention to the light source and how it reflected on the car’s surface.
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/wokbench.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>😁My Compact Canvas✍️</ModalHeader>
                  This is what it looks like when working on the Android version of Autodesk Sketchbook
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/koe1.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
                  <ModalHeader>⚠️And results are awesome</ModalHeader>
                  After adding few more detail and wheel textures for more dynamic visuals the ultimate result is here.
                  </Section>
                   
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                    Disclaimer:The design and logo name used on this website are the intellectual property of respective owners.
                  </center>
              </ModalBody>
              <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEditClosemd7}>Close</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
          {/* ===================================================================================== */}
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


const Works = () => (
  
  <Layout title="Works" mt={10}>
    
      <Section>
      <Heading as="h3" fontSize={50} mb={15} mt={10}>
       <CollapseExtandi/>
      </Heading>
      </Section>
      <Spacer/>
      <Section>
      <Heading as="h3" fontSize={50} mb={15} mt={10}>
       <CollapseExtart/>
      </Heading>
      </Section>
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
