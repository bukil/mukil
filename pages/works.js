import { Container, Divider, Heading, SimpleGrid,Link} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import {Stack,Image,Text,Button,useDisclosure,Collapse,Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { Spacer } from '@chakra-ui/react'
import NextLink from 'next/link'
import { Grid, GridItem } from '@chakra-ui/react'
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

// ===================== Part =================

function CollapseExtandip() {
  const { isOpen, onToggle } = useDisclosure()

  const { isOpen: isEditOpenmd0 , onOpen: onEditOpenmd0, onClose: onEditClosemd0 } = useDisclosure()
  const { isOpen: isEditOpenmd1 , onOpen: onEditOpenmd1, onClose: onEditClosemd1 } = useDisclosure()
  const { isOpen: isEditOpenmd2 , onOpen: onEditOpenmd2, onClose: onEditClosemd2 } = useDisclosure()
  const { isOpen: isEditOpenmd3 , onOpen: onEditOpenmd3, onClose: onEditClosemd3 } = useDisclosure()
  const { isOpen: isEditOpenmd4 , onOpen: onEditOpenmd4, onClose: onEditClosemd4 } = useDisclosure()
  const { isOpen: isEditOpenmd5 , onOpen: onEditOpenmd5, onClose: onEditClosemd5 } = useDisclosure()
  const { isOpen: isEditOpenmd6 , onOpen: onEditOpenmd6, onClose: onEditClosemd6 } = useDisclosure()
  const { isOpen: isEditOpenmd7 , onOpen: onEditOpenmd7, onClose: onEditClosemd7 } = useDisclosure()
  return (
    <>
    
      <Button leftIcon={<ChevronDownIcon />} onClick={onToggle} variant="ghost" fontSize={20}
      mt='20'
      >
        USABILITY AND HARDWARE INTERACTION
      </Button>
      <Collapse in={!isOpen} animateOpacity>
        <Box
          p='1px'
          color='white'
          mt='4'
          rounded='md'
          shadow='md'
        >
         
         <SimpleGrid columns={[2]} gap={25} mt={10}>

         <Section>
        
        
        <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd0}>
           <Image 
          src='/images/works/newpers.jpg'
          alt='User Experience'
          borderRadius='lg'
          />

           
          <Modal isOpen={isEditOpenmd0} onClose={onEditClosemd0} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >KODE-BOARD</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
                  <Image 
                    src='/images/works/kode.png'
                    alt='KODE-BOARD'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                    <Text fontSize={24} fontWeight={'hairline'}>
                    😀 😉 😪 😣 😡
                    My cat finally spilled the beans on my secret keyboard obsession. Prepare to be meow-ved!
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
                    src='/images/works/koenigseg1.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                  />
                  <ModalHeader>DESIGN AND MOODBOARDS</ModalHeader>
                  Warning: This keyboard may cause uncontrollable bursts of productivity and uncontrollable urges to show off. Use(not possible) with caution! ⚠️
 so, Forget therapy, this keyboard is all the emotional support you need. Plus, it doesn't judge your typos. 😊😊😊
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/Frame 1.jpg'
                    alt='FIgma output'
                    width={ 'container.lg' }
                    borderRadius={15}
                  />
                  <ModalHeader>Ortholinear keyboards offer a few potential advantages over traditional staggered keyboards, particularly in terms of ergonomics and efficiency</ModalHeader>
                  Reduced Fatigue: The grid layout of ortholinear keyboards minimizes finger travel distance. This means you can keep your fingers closer to the home row, reducing reaching 
                  and minimizing the need for unnatural finger curling. This can lead to less fatigue during long typing sessions.Sketching the first task for him and then He started working
                   on his project with enthusiasm and determination. He researched online and found some tutorials and resources that could help him. He bought some components and tools from
                    online distributor. He starts assembling the components, Fabricating and soldering PCBs accordingly and try to build the prototype. He spent many hours in his hostel room, 
                    wiring, coding, testing, and debugging his device.
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/stealth.png'
                    alt='Project 3D output'
                    borderRadius={15}
                    width={ 'container.lg' }
                  />
                  <ModalHeader>PROPOSED RENDERINGS</ModalHeader>
                  Compact Design: By eliminating the staggered layout, ortholinear keyboards can be more compact than traditional keyboards, saving desk space.
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/BOTASF.jpg'
                    alt='Project 3D 1'
                    borderRadius={15}
                    width={ 'container.lg' }
                  />
                  <ModalHeader> The beauty of these encoders lies in their programmability. Using keyboard firmware like QMK, you can define what actions occur based on the rotation direction (clockwise/counter-clockwise) and even the number of clicks (rotations) made.</ModalHeader>
                  
                  </Section>
                  

                  <Section>
                  <Image
    src='/images/works/NEWPERSIO.jpg'
    alt='Project 3D 1'
    width={ 'container.lg' }
    borderRadius={15}
/>
                  <ModalHeader>LOVABLE MATERIALS</ModalHeader>
              
                  </Section>

                   
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                   
                  </center>
              </ModalBody>
              <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEditClosemd0}>Close</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
         

           </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3' mb={10}>
          <Heading as="h2"  fontWeight="hairline">
          KODE/BOARD
        </Heading>
          <Text fontSize={'xs'} mb={10}>
          Here is a keyboard concept ( kode board 🙃 ) , Copy, paste, repeat... but not as you know it. Multi-layer clipboard on fingertips like seamlessly storing your snippets for instant recall. 🪄
          </Text>
        </Stack>
         
            </Section>

        
            <Section>
        
        
        <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd1}>
           <Image 
          src='/images/works/kodbordrr.png'
          alt='Project 3D 1'
          borderRadius='lg'
          />

           
          <Modal isOpen={isEditOpenmd1} onClose={onEditClosemd1} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >KODE-PAD</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
                  <Image 
                    src='/images/works/kodbordrr.png'
                    alt='kodpad'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                    <Text fontSize={24} fontWeight={'hairline'}>
                    Imagine a keyboard shrunk to its most essential 
                    form, yet exploding with functionality. With just
                     16-20 carefully chosen keys, the Mini Maestro 
                     prioritizes efficiency and portability without 
                     sacrificing power.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
                    src='/images/works/keypad23.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                  />
                  <ModalHeader>MOODBOARD AND DESIGN PROPOSAL</ModalHeader>
                  The KODEPAD can be a programmer's secret weapon.  The customizable keys 
                  can be programmed with language-specific shortcuts or macros to streamline workflows.
                    The rotary encoders can be used for scrolling through code or adjusting editor settings. 
                     The compact design makes it easy to take to hackathons or coding meetups.
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/kod_board.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                  />
                  <ModalHeader>DESIGN AND FUCTIONALITY</ModalHeader>
                  Minimalist Design: The KODEPAD embraces a clean, minimalist aesthetic. Every element is carefully considered for maximum functionality with minimal footprint. This allows creators to focus on their work without visual clutter.
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/frame.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                  />
                  <ModalHeader>TEXTURING AND SURFACING</ModalHeader>
                 
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/jug.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                  />
                  <ModalHeader>RENDERING (CYCLES)</ModalHeader>
                  
                  </Section>

                  <Section>
                  <Box
    as='video'
    controls
    autoplay
    src='/images/works/jug.mp4'
    poster='images/works/huj.jpg'
    borderRadius={15}
    alt='animation'
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
                    Reference images, Design and logo used in the website is property of respective owners.
                  </center>
              </ModalBody>
              <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEditClosemd1}>Close</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
         

           </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3' mb={10}>
          <Heading as="h2"  fontWeight="hairline">
          KODE-PAD
        </Heading>
          <Text fontSize={'xs'} mb={10}>
          KODEPAD: The Macro Magician in Your Backpack Pocket
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

         
          <Modal isOpen={isEditOpenmd2} onClose={onEditClosemd2} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >KOENIGSEGG CC850</ModalHeader>
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

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
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
          
      


        <Section>
              <Container>
              <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd3}>
                  <Image src='/images/works/bug1.png' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  
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

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
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
{/*original drone */}
      <Section>
      <Container>
      <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd4}>
            <Image 
          src='/images/works/tar1.png'
          alt='TAREN DRONE'
          borderRadius='lg'
          />
    
          <Modal isOpen={isEditOpenmd4} onClose={onEditClosemd4} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >TAREN DRONE</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
              <Image 
          src='/images/works/unh.jpg'
          alt='Taren drone'
          borderRadius='lg'
          mb={10}
          /><Text fontSize={24} fontWeight={'hairline'}>
                   This project is a part of my internship at E-Yantra Indian Institute of Technology Bombay (IITB) I was working as a product designer in team, where we were Designing a multipurpose Drone structure. 
One of my projects was to visualize the 3D Drone concept under the mentorship of Mr. Maddu Murali and we named it TAREN. Taren is a stealth multipurpose drone inspired by a tarantula spider which shows the symbol of aggression and speed, Taren is not only equipped with aesthetics but intelligence also This is why we have wicked smart NVIDIA® Jetson Xavier onboard.
                    </Text>
                    <Box
           as='video'
           controls
           src='/images/works/iitbvd.mp4'
           poster='/images/works/desg.jpg'
           borderRadius={15}
           alt='sketching'
           objectFit='contain'
           sx={{
             aspectRatio: '16/9'
           }}
          mb={10}
          />
          <Box
           as='video'
           controls
           src='/images/works/race.mp4'
           poster='/images/works/0240.png'
           borderRadius={15}
           alt='sketching'
           objectFit='contain'
           sx={{
             aspectRatio: '16/9'
           }}
          mb={10}
          />
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
          src='/images/works/mk.jpg'
          alt='Drone design'
          borderRadius='lg'
          />
                  <ModalHeader>Basic Sketch and Ideation</ModalHeader>
                  The primary objective of this project is to develop an outer cover, basically the protective shell for the multipurpose drone to protect it from atmospheric conditions. Keeping the objective in mind, we need to develop an outer cover that also has more aesthetic

                  </Section>

                  <Section>
                  <Image 
          src='/images/works/drone4.png'
          alt='taren'
          borderRadius='lg'
          />
                  <ModalHeader>Prior Design Proposals</ModalHeader>
                  I got inspired by a Spider. Spiders are fast and aggressive. They help farmers by
feeding on crop-destroying Bugs. The venom from a black widow spider may cause muscle aches, nausea, a paralysis of the diaphragm, and potentially death, but it’s being used in inventive ways in medicine.

                  </Section>

                  <Section>
                  <Image 
          src='/images/works/tar1.png'
          alt='PAI'
          borderRadius='lg'
          />
                  <ModalHeader>Physical assembly and visualisation</ModalHeader>
                  The main challenges that we faced were:
We, teammates, were from distant locations and we both were also at a
long distance from eYantra’s Office. This makes the process more
tedious. If we were nearer to eYantra’s office, we would have surely
taken a visit to complete in a fast and easier manner. Our mentors
helped us a lot by providing dimensions and other details whenever
necessary.
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/unjht.jpg'
          alt='taren dron'
          borderRadius='lg'
          />
                  <ModalHeader>Final Design</ModalHeader>
                  In this internship, we were asked to design and develop an outer cover for the
drone. One can develop any product using any engineering principles. However, to
market the product, to get it sold, Aesthetics is important. We came up with a
concept that is inspired by nature. We prepared an STL file in a clean manner and
delivered it to our team. They further verified and started 3d printing. Overall, this
internship helped us to explore 3d printing mechanisms and prepare a 3d printable
model. We dived into the pool of design principles and got benefited from it.

                  </Section>

                  <Section>
                  <Image 
          src='/images/works/drone2.png'
          alt='Drone design'
          borderRadius='lg'
          />
                  
                  <ModalHeader>More design Praposals</ModalHeader>
                 Throughout the session we develope many design praposal and select one of them by user study.
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
          
          <Modal isOpen={isEditOpenmd5} onClose={onEditClosemd5} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >FERRARI MONZA SP1</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
              <Image src='/images/works/FMSP6.jpg' alt='FERRARI MONZA SP1' borderRadius='lg'/>
                    <Text fontSize={24} fontWeight={'hairline'}>
                   Welcome to another Design journey of Ferrari Monza SP1. The Ferrari Monza SP1 is a limited edition model that was unveiled by Ferrari in 2018. It is part of the Icona series which
pay s homage to some of the brands most iconic
models from the past. The design of the Monza SP1 is inspired by the barchetta body style which was popular in the 1950s and features a sleek open top design with a minimal
windshield and no roof. In this project I recreate a Ferrari Monza SP1 in blender. The post on Artstation by Saksham kumar and Adam wiese helped me a lot in this project for providing reference data and textures.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image src='/images/works/ferdg.png' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Framework and Basic Structure </ModalHeader>
                 I used reference images from the internet to help me get the proportions and details right.
                  </Section>

                  <Section>
                  <Image src='/images/works/deign.png' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Initial Models</ModalHeader>
                  Designing simple mesh surface
                  </Section>

                  <Section>
                  <Image src='/images/works/det.png' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>ENVIRONMENT SETUP AND LIGHTING </ModalHeader>
                  Seting up the environment and Importing Pre-Modelled elements (Textures, Seat, Controls etc.) to fasten up the design process.
                  </Section>

                  <Section>
                  <Image src='/images/works/FMSP4.jpg' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>RENDERINGS</ModalHeader>
                  
                  </Section>

                  <Image src='/images/works/FMSP3.jpg' alt='FERRARI MONZA SP1' borderRadius='lg'/>
                  <Image src='/images/works/FMSP5.jpg' alt='FERRARI MONZA SP1' borderRadius='lg'/>
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
         
          </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3'>
          <Heading as="h2"  fontWeight="hairline">
          FERRARI MONZA SP1
        </Heading>
          <Text fontSize={'xs'}>
            Ferrari Monza SP1 3D Design and Rendering Project in Blender
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
              <ModalHeader as="h1" >LAMBORGHINI TERZO MILLENNIO</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
                  <Image 
                    src='/images/works/lambo.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  
                    <Text fontSize={24} fontWeight={'hairline'}>
                    Have you ever dreamed of driving a futuristic supercar that looks like it came straight out of a sci-fi movie? Well, I did. And I decided to make it a reality. Well, sort of. I downloaded model of the Lamborghini Terzo Millennio from Blender marketplace just to fasten up the overall design process, a stunning concept car that combines cutting-edge technology and design. I imported it into Blender, and started to customize it to my liking. I adjusted its size, position and orientation to fit my scene. I added some details and modifications to make it more unique and realistic. I chose a sleek and shiny material for the car body and applied it to the model. I also added some textures, decals and other elements to enhance its appearance. Then I set up the lighting, camera and background for my scene. I used HDRI images, lamps and other objects to create realistic lighting effects. I wanted to capture the beauty and elegance of the car from different angles and perspectives. I also wanted to create some dynamic and dramatic shots that show its speed and power. I set up the render settings for Cycles engine, a fast and realistic render engine that comes with Blender. I chose a high resolution, sampling rate and denoising option for my image or animation. I also enabled some effects like motion blur, depth of field and glare to make it more cinematic and appealing. I rendered my image or animation and saved it to my computer. I was amazed by the result. It looked like a real photo or video of the car. I was proud of my work and wanted to share it with the world. So I uploaded it to my website and wrote this paragraph to explain how I did it. I hope you enjoy it as much as I did.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
                    src='/images/works/terzo_128.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                  />
                  
                  </Section>

                  <Image 
                    src='/images/works/lambo1.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                  />
                  
                  <Box
                  as='video'
                  controls
                  autoplay
                  src='/images/works/CYC.mkv'
                  poster='images/works/terzo_128.jpg'
                  borderRadius={15}
                  alt='Big Buck Bunny'
                  objectFit='contain'
                  sx={{
                    aspectRatio: '16/9'
                  }}
                  />

          
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                    Disclaimer:The design and logo name used on this website are the intellectual property of respective owners.
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
          3D Renderings and Animation of Pre-Modelled Lamboorghini Terzo Millennio in Blender
          </Text>

        </Stack>
          </Container>
      </Section>

      <Section>
      <Container>
      <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd7}>
            <Image 
          src='/images/works/mgh.jpg'
          alt='my work'
          borderRadius='lg'
          />
          {/* ===================Bugatti Chiron Edit Modal===================================================== */}
          <Modal isOpen={isEditOpenmd7} onClose={onEditClosemd7} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
          
              </center>
              <ModalCloseButton />
              <ModalBody>
              <center>
              <Text fontSize={24} fontWeight={'hairline'}>
                    My Designs.
                    </Text>
                 
              <Image 
          src='/images/works/lk.png'
          alt='krishna make'
          borderRadius='lg'
          mb={10}
          />
          <Text fontSize={24} fontWeight={'hairline'}>
          The peacock feather is a symbol of beauty, grace and divinity in Hindu mythology. It adorns the crown of Lord Krishna, the supreme personality of Godhead, who is the source of all creation and the embodiment of love. Inspired by this sacred motif, I have designed a car that reflects the qualities of Krishna and his feather. Our car is sleek, elegant and colorful, with a peacock feather pattern on the hood and the doors. The car also features a state-of-the-art sound system that plays soothing melodies of Krishna’s flute, creating a serene and blissful atmosphere for the driver and passengers. Our car is not just a vehicle, but a tribute to the almighty Lord Krishna and his divine grace.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
          src='/images/works/imp.png'
          alt='Krishna make'
          borderRadius='lg'
          />
                  <ModalHeader>DESIGN MOODBOARDS</ModalHeader>
                  
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/ske.png'
          alt='moodboard'
          borderRadius='lg'
          />
                  <ModalHeader>MOODBOARDS</ModalHeader>
                
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/hed.png'
          alt='hedes'
          borderRadius='lg'
          />
                  <ModalHeader>Raven/Hedes from the hadal(Dark zone of the deep sea)</ModalHeader>
                 
                  </Section>

          
                  </SimpleGrid>
                
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
          MY DESIGNS
        </Heading>
          <Text fontSize={'xs'}>
            Click if love cars😘
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

// ============== Indu ===================


function CollapseExtandi() {
  const { isOpen, onToggle } = useDisclosure()

  const { isOpen: isEditOpenmd0 , onOpen: onEditOpenmd0, onClose: onEditClosemd0 } = useDisclosure()
  const { isOpen: isEditOpenmd1 , onOpen: onEditOpenmd1, onClose: onEditClosemd1 } = useDisclosure()
  const { isOpen: isEditOpenmd2 , onOpen: onEditOpenmd2, onClose: onEditClosemd2 } = useDisclosure()
  const { isOpen: isEditOpenmd3 , onOpen: onEditOpenmd3, onClose: onEditClosemd3 } = useDisclosure()
  const { isOpen: isEditOpenmd4 , onOpen: onEditOpenmd4, onClose: onEditClosemd4 } = useDisclosure()
  const { isOpen: isEditOpenmd5 , onOpen: onEditOpenmd5, onClose: onEditClosemd5 } = useDisclosure()
  const { isOpen: isEditOpenmd6 , onOpen: onEditOpenmd6, onClose: onEditClosemd6 } = useDisclosure()
  const { isOpen: isEditOpenmd7 , onOpen: onEditOpenmd7, onClose: onEditClosemd7 } = useDisclosure()
  return (
    <>
    
      <Button leftIcon={<ChevronDownIcon />} onClick={onToggle} variant="ghost" fontSize={20}
      mt='2'
      >
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
         
         <SimpleGrid columns={[2]} gap={25} mt={10}>

         <Section>
        
        
        <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd0}>
           <Image 
          src='/images/works/menu.jpg'
          alt='User Experience'
          borderRadius='lg'
          />

           
          <Modal isOpen={isEditOpenmd0} onClose={onEditClosemd0} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >OPTICAL ENCODER BASED STEERING SYSTEM</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
                  <Image 
                    src='/images/works/rat1.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                    <Text fontSize={24} fontWeight={'hairline'}>
                    Well somethiing need to be done.......
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
                    src='/images/works/rat2.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                  />
                  <ModalHeader>What can it Changes</ModalHeader>
                  One day, he decided to do something about it. He thought of an idea that could help him drive a vehicle with his left hand disabled. He decided to use his knowledge of technology and create a prototype that could control a vehicle with optical encoder, it is a high accuracy small sensor use in industrial purpose. He thought that if he could control the vehicle with only right hand with the help of sensor, he wouldn’t need to use his left hands at all. he realises that the abilities of the Encoder based steering system is more than anybody think
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/rat3.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                  />
                  <ModalHeader>More Moodboards</ModalHeader>
                 Sketching the first task for him and then He started working on his project with enthusiasm and determination. He researched online and found some tutorials and resources that could help him. He bought some components and tools from online distributor. He starts assembling the components, Fabricating and soldering PCBs accordingly and try to build the prototype. He spent many hours in his hostel room, wiring, coding, testing, and debugging his device.
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/rat4.jpg'
                    alt='Project 3D 1'
                    borderRadius={15}
                    width={ 'container.lg' }
                  />
                  <ModalHeader>Prototypiing</ModalHeader>
                  After several days of hard work, he finally completed his project. He had created optical encoder(sensor) based vehicle controller that could connect to the car’s system and control its functions. He had tested the device in simulation first and successful in it.
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/menu.jpg'
                    alt='Project 3D 1'
                    borderRadius={15}
                    width={ 'container.lg' }
                  />
                  <ModalHeader>Enhanced User Experience</ModalHeader>
                  
                  </Section>

                  <Section>
                  <Image
    src='/images/works/menu1.jpg'
    alt='Project 3D 1'
    width={ 'container.lg' }
    borderRadius={15}
/>
                  <ModalHeader>High Feasability</ModalHeader>
              
                  </Section>
                   
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                   
                  </center>
              </ModalBody>
              <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEditClosemd0}>Close</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
         

           </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3' mb={10}>
          <Heading as="h2"  fontWeight="hairline">
          OPTICAL ENCODER STEERING SYSTEM
        </Heading>
          <Text fontSize={'xs'} mb={10}>
          Optical Encoder Steering System for Enhanced User Experience
          </Text>
        </Stack>
         
            </Section>

        
            <Section>
        
        
        <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd1}>
           <Image 
          src='/images/works/imgfro1.png'
          alt='Project 3D 1'
          borderRadius='lg'
          />

           
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
                    borderRadius={15}
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

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
                    src='/images/works/WIRE.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                  />
                  <ModalHeader>MODELING AND WIREFRAMING</ModalHeader>
                 
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/lit.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                  />
                  <ModalHeader>ENVIRONMENT AND LIGHT</ModalHeader>
                  
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/frame.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                  />
                  <ModalHeader>TEXTURING AND SURFACING</ModalHeader>
                 
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/jug.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                  />
                  <ModalHeader>RENDERING (CYCLES)</ModalHeader>
                  
                  </Section>

                  <Section>
                  <Box
    as='video'
    controls
    autoplay
    src='/images/works/jug.mp4'
    poster='images/works/huj.jpg'
    borderRadius={15}
    alt='animation'
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
                    Reference images, Design and logo used in the website is property of respective owners.
                  </center>
              </ModalBody>
              <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEditClosemd1}>Close</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
         

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

         
          <Modal isOpen={isEditOpenmd2} onClose={onEditClosemd2} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >KOENIGSEGG CC850</ModalHeader>
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

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
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
          
      


        <Section>
              <Container>
              <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd3}>
                  <Image src='/images/works/bug1.png' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  
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

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
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
{/*original drone */}
      <Section>
      <Container>
      <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd4}>
            <Image 
          src='/images/works/tar1.png'
          alt='TAREN DRONE'
          borderRadius='lg'
          />
    
          <Modal isOpen={isEditOpenmd4} onClose={onEditClosemd4} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >TAREN DRONE</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
              <Image 
          src='/images/works/unh.jpg'
          alt='Taren drone'
          borderRadius='lg'
          mb={10}
          /><Text fontSize={24} fontWeight={'hairline'}>
                   This project is a part of my internship at E-Yantra Indian Institute of Technology Bombay (IITB) I was working as a product designer in team, where we were Designing a multipurpose Drone structure. 
One of my projects was to visualize the 3D Drone concept under the mentorship of Mr. Maddu Murali and we named it TAREN. Taren is a stealth multipurpose drone inspired by a tarantula spider which shows the symbol of aggression and speed, Taren is not only equipped with aesthetics but intelligence also This is why we have wicked smart NVIDIA® Jetson Xavier onboard.
                    </Text>
                    <Box
           as='video'
           controls
           src='/images/works/iitbvd.mp4'
           poster='/images/works/desg.jpg'
           borderRadius={15}
           alt='sketching'
           objectFit='contain'
           sx={{
             aspectRatio: '16/9'
           }}
          mb={10}
          />
          <Box
           as='video'
           controls
           src='/images/works/race.mp4'
           poster='/images/works/0240.png'
           borderRadius={15}
           alt='sketching'
           objectFit='contain'
           sx={{
             aspectRatio: '16/9'
           }}
          mb={10}
          />
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
          src='/images/works/mk.jpg'
          alt='Drone design'
          borderRadius='lg'
          />
                  <ModalHeader>Basic Sketch and Ideation</ModalHeader>
                  The primary objective of this project is to develop an outer cover, basically the protective shell for the multipurpose drone to protect it from atmospheric conditions. Keeping the objective in mind, we need to develop an outer cover that also has more aesthetic

                  </Section>

                  <Section>
                  <Image 
          src='/images/works/drone4.png'
          alt='taren'
          borderRadius='lg'
          />
                  <ModalHeader>Prior Design Proposals</ModalHeader>
                  I got inspired by a Spider. Spiders are fast and aggressive. They help farmers by
feeding on crop-destroying Bugs. The venom from a black widow spider may cause muscle aches, nausea, a paralysis of the diaphragm, and potentially death, but it’s being used in inventive ways in medicine.

                  </Section>

                  <Section>
                  <Image 
          src='/images/works/tar1.png'
          alt='PAI'
          borderRadius='lg'
          />
                  <ModalHeader>Physical assembly and visualisation</ModalHeader>
                  The main challenges that we faced were:
We, teammates, were from distant locations and we both were also at a
long distance from eYantra’s Office. This makes the process more
tedious. If we were nearer to eYantra’s office, we would have surely
taken a visit to complete in a fast and easier manner. Our mentors
helped us a lot by providing dimensions and other details whenever
necessary.
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/unjht.jpg'
          alt='taren dron'
          borderRadius='lg'
          />
                  <ModalHeader>Final Design</ModalHeader>
                  In this internship, we were asked to design and develop an outer cover for the
drone. One can develop any product using any engineering principles. However, to
market the product, to get it sold, Aesthetics is important. We came up with a
concept that is inspired by nature. We prepared an STL file in a clean manner and
delivered it to our team. They further verified and started 3d printing. Overall, this
internship helped us to explore 3d printing mechanisms and prepare a 3d printable
model. We dived into the pool of design principles and got benefited from it.

                  </Section>

                  <Section>
                  <Image 
          src='/images/works/drone2.png'
          alt='Drone design'
          borderRadius='lg'
          />
                  
                  <ModalHeader>More design Praposals</ModalHeader>
                 Throughout the session we develope many design praposal and select one of them by user study.
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
          
          <Modal isOpen={isEditOpenmd5} onClose={onEditClosemd5} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >FERRARI MONZA SP1</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
              <Image src='/images/works/FMSP6.jpg' alt='FERRARI MONZA SP1' borderRadius='lg'/>
                    <Text fontSize={24} fontWeight={'hairline'}>
                   Welcome to another Design journey of Ferrari Monza SP1. The Ferrari Monza SP1 is a limited edition model that was unveiled by Ferrari in 2018. It is part of the Icona series which
pay s homage to some of the brands most iconic
models from the past. The design of the Monza SP1 is inspired by the barchetta body style which was popular in the 1950s and features a sleek open top design with a minimal
windshield and no roof. In this project I recreate a Ferrari Monza SP1 in blender. The post on Artstation by Saksham kumar and Adam wiese helped me a lot in this project for providing reference data and textures.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image src='/images/works/ferdg.png' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Framework and Basic Structure </ModalHeader>
                 I used reference images from the internet to help me get the proportions and details right.
                  </Section>

                  <Section>
                  <Image src='/images/works/deign.png' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>Initial Models</ModalHeader>
                  Designing simple mesh surface
                  </Section>

                  <Section>
                  <Image src='/images/works/det.png' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>ENVIRONMENT SETUP AND LIGHTING </ModalHeader>
                  Seting up the environment and Importing Pre-Modelled elements (Textures, Seat, Controls etc.) to fasten up the design process.
                  </Section>

                  <Section>
                  <Image src='/images/works/FMSP4.jpg' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  <ModalHeader>RENDERINGS</ModalHeader>
                  
                  </Section>

                  <Image src='/images/works/FMSP3.jpg' alt='FERRARI MONZA SP1' borderRadius='lg'/>
                  <Image src='/images/works/FMSP5.jpg' alt='FERRARI MONZA SP1' borderRadius='lg'/>
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
         
          </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3'>
          <Heading as="h2"  fontWeight="hairline">
          FERRARI MONZA SP1
        </Heading>
          <Text fontSize={'xs'}>
            Ferrari Monza SP1 3D Design and Rendering Project in Blender
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
              <ModalHeader as="h1" >LAMBORGHINI TERZO MILLENNIO</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
                  <Image 
                    src='/images/works/lambo.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  
                    <Text fontSize={24} fontWeight={'hairline'}>
                    Have you ever dreamed of driving a futuristic supercar that looks like it came straight out of a sci-fi movie? Well, I did. And I decided to make it a reality. Well, sort of. I downloaded model of the Lamborghini Terzo Millennio from Blender marketplace just to fasten up the overall design process, a stunning concept car that combines cutting-edge technology and design. I imported it into Blender, and started to customize it to my liking. I adjusted its size, position and orientation to fit my scene. I added some details and modifications to make it more unique and realistic. I chose a sleek and shiny material for the car body and applied it to the model. I also added some textures, decals and other elements to enhance its appearance. Then I set up the lighting, camera and background for my scene. I used HDRI images, lamps and other objects to create realistic lighting effects. I wanted to capture the beauty and elegance of the car from different angles and perspectives. I also wanted to create some dynamic and dramatic shots that show its speed and power. I set up the render settings for Cycles engine, a fast and realistic render engine that comes with Blender. I chose a high resolution, sampling rate and denoising option for my image or animation. I also enabled some effects like motion blur, depth of field and glare to make it more cinematic and appealing. I rendered my image or animation and saved it to my computer. I was amazed by the result. It looked like a real photo or video of the car. I was proud of my work and wanted to share it with the world. So I uploaded it to my website and wrote this paragraph to explain how I did it. I hope you enjoy it as much as I did.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
                    src='/images/works/terzo_128.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                  />
                  
                  </Section>

                  <Image 
                    src='/images/works/lambo1.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                  />
                  
                  <Box
                  as='video'
                  controls
                  autoplay
                  src='/images/works/CYC.mkv'
                  poster='images/works/terzo_128.jpg'
                  borderRadius={15}
                  alt='Big Buck Bunny'
                  objectFit='contain'
                  sx={{
                    aspectRatio: '16/9'
                  }}
                  />

          
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                    Disclaimer:The design and logo name used on this website are the intellectual property of respective owners.
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
          3D Renderings and Animation of Pre-Modelled Lamboorghini Terzo Millennio in Blender
          </Text>

        </Stack>
          </Container>
      </Section>

      <Section>
      <Container>
      <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd7}>
            <Image 
          src='/images/works/mgh.jpg'
          alt='my work'
          borderRadius='lg'
          />
          {/* ===================Bugatti Chiron Edit Modal===================================================== */}
          <Modal isOpen={isEditOpenmd7} onClose={onEditClosemd7} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
          
              </center>
              <ModalCloseButton />
              <ModalBody>
              <center>
              <Text fontSize={24} fontWeight={'hairline'}>
                    My Designs.
                    </Text>
                 
              <Image 
          src='/images/works/lk.png'
          alt='krishna make'
          borderRadius='lg'
          mb={10}
          />
          <Text fontSize={24} fontWeight={'hairline'}>
          The peacock feather is a symbol of beauty, grace and divinity in Hindu mythology. It adorns the crown of Lord Krishna, the supreme personality of Godhead, who is the source of all creation and the embodiment of love. Inspired by this sacred motif, I have designed a car that reflects the qualities of Krishna and his feather. Our car is sleek, elegant and colorful, with a peacock feather pattern on the hood and the doors. The car also features a state-of-the-art sound system that plays soothing melodies of Krishna’s flute, creating a serene and blissful atmosphere for the driver and passengers. Our car is not just a vehicle, but a tribute to the almighty Lord Krishna and his divine grace.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
          src='/images/works/imp.png'
          alt='Krishna make'
          borderRadius='lg'
          />
                  <ModalHeader>DESIGN MOODBOARDS</ModalHeader>
                  
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/ske.png'
          alt='moodboard'
          borderRadius='lg'
          />
                  <ModalHeader>MOODBOARDS</ModalHeader>
                
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/hed.png'
          alt='hedes'
          borderRadius='lg'
          />
                  <ModalHeader>Raven/Hedes from the hadal(Dark zone of the deep sea)</ModalHeader>
                 
                  </Section>

          
                  </SimpleGrid>
                
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
          MY DESIGNS
        </Heading>
          <Text fontSize={'xs'}>
            Click if love cars😘
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
  
  return (
    <>
      <Button leftIcon={<ChevronDownIcon />} onClick={onToggle} variant="ghost" fontSize={20}>
        ✍️ART AND ANIMATION📽️
      </Button>
      <Collapse in={!isOpen} animateOpacity>
        <Box
          p='1px'
          color='white'
          mt='2'
          rounded='md'
          shadow='md'
        >
         {/* Works Content */}
         <SimpleGrid columns={[3]} gap={10} mt={10}>
        {/* Starting of Cards - Add or Remove Work cards here */}
          {/* Bugatti + Mclaren */}
            <Section>
        {/* Bugatti 1 Car Content 1 */}
        
        <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd1}>
           <Image 
          src='/images/works/ske.png'
          alt='Project'
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
                    
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
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
          A small part of designing the Koenigsegg CC850 in Autodesk Sketchbook
                  </Section>

                  <Section>
                  <Box
                    as='video'
                    controls
                    src='/images/works/race.mp4'
                    poster='/images/works/tar1.png'
                    alt='Race animation'
                    width={ 'container.lg' }

                    objectFit='contain'
                    sx={{
                      aspectRatio: '16/9'
                    }}
                    />
                  <ModalHeader>DRONE RACE ANIMATION</ModalHeader>
                  This project is a part of my internship at E-Yantra Indian Institute of Technology Bombay (IITB) I was working as a product designer in team, where we were Designing a multipurpose Drone structure. One of my projects was to visualize the 3D Drone concept under the mentorship of Mr. Maddu Murali and we named it TAREN. Taren is a stealth multipurpose drone inspired by a tarantula spider which shows the symbol of aggression and speed, Taren is not only equipped with aesthetics but intelligence also This is why we have wicked smart NVIDIA® Jetson Xavier onboard.
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/design.jpg'
                    alt='Industrtial design'
                    width={ 'container.lg' }
                  />
                  <ModalHeader>FLOWER PLUCK MECHANISM</ModalHeader>
                  
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/WORKING.jpg'
                    alt='Industrial'
                    width={ 'container.lg' }
                  />
                  <ModalHeader>WORKING MECHANISM</ModalHeader>
                 
                  </Section>

                  <Section>
                    <Box
                    as='video'
                    controls
                    src='/images/works/rat45.mkv'
          
                    alt='Koenigsegg cc850 video'
                    width={ 'container.lg' }

                    objectFit='contain'
                    sx={{
                      aspectRatio: '16/9'
                    }}
                />
                  <ModalHeader>LAMBORGHINI ANIMATION</ModalHeader>
          A Small animation shows the suspensionn rigging and environment
                  </Section>
                  <Section>
                    <Box
                    as='video'
                    controls
                    src='/images/works/rat46.mkv'
          
                    alt='camera dynamic'
                    width={ 'container.lg' }

                    objectFit='contain'
                    sx={{
                      aspectRatio: '16/9'
                    }}
                />
                  <ModalHeader>CAMERA DYNAMIC WITH PORSCHE</ModalHeader>
          A Small animation of Porsche 911 with dynamic camera and low poly environment
                  </Section>
              
                  <Section>
                  <Box
                    as='video'
                    controls
                    src='/images/works/SPD.mkv'
                    poster='/images/works/Space.jpg'
                    alt='space azure'
                    width={ 'container.lg' }

                    objectFit='contain'
                    sx={{
                      aspectRatio: '16/9'
                    }}
                    />
                  <ModalHeader>SPACE RENDER</ModalHeader>
                  
                  </Section>
                   
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                    I post ferquently on my Instagram handle 
                    <NextLink href="https://www.instagram.com/magna_kaizen/" passHref scroll={false}>
                      <Link> MUKIL</Link>
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
          ANIMATION AND VIDEOS
        </Heading>
          <Text fontSize={'xs'} mb={10}>
          This one is awesome 📽️
          </Text>
        </Stack>
         
            </Section>

            <Section>
            <Imgtrans mt={10}>
          <Button height={'auto'} onClick={onEditOpenmd2}>
            <Image 
          src='/images/works/mnh.png'
          alt='raw work'
          borderRadius='lg'
          />

          {/* ===================Bugatti Chiron Edit Modal===================================================== */}
          <Modal isOpen={isEditOpenmd2} onClose={onEditClosemd2} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >WORKFLOW DESIGNS AND SKETCHS</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
              <Image 
          src='/images/works/Logo.png'
          alt='Mukil'
          borderRadius='lg'
          mb={10}
          /><Text fontSize={24} fontWeight={'hairline'}>
                    It’s not a bug or unmannered section. It’s an undocumented feature of the site!
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={2} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
          src='/images/works/mclar.jpg'
          alt='un'
          borderRadius='lg'
          />
            
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/merce.jpg'
          alt='benz'
          borderRadius='lg'
          />
            
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/khh.jpg'
          alt='work0'
          borderRadius='lg'
          />
            
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/kh1.jpg'
          alt='work'
          borderRadius='lg'
          />
            
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/kh2.jpg'
          alt='carsketch'
          borderRadius='lg'
          />
            
                  </Section>
                  <Section>
                  <Image 
          src='/images/works/KOENIGSEGG CC3.png'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />
            
                  </Section>
                  <Section>
                  <Image 
          src='/images/works/mgh.jpg'
          alt='design'
          borderRadius='lg'
          />
            
                  </Section>
                  <Section>
                  <Image 
          src='/images/works/drone3.png'
          alt='design'
          borderRadius='lg'
          />
            
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
          OPEN AT YOU OWN RISK!⚠️
        </Heading>
          <Text fontSize={'xs'}>
          Incomplete and Raw Designs workflow
          </Text>
        </Stack></Section>    
          {/* Bugatti + Mclaren */}
      



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
       <CollapseExtandip/>
      </Heading>
      </Section>
    
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
            <Button borderRadius='20px' variant='outline' border='2px' borderColor='black.500' leftIcon={<ChevronLeftIcon />}>
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
