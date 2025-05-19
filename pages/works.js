/* eslint-disable react/no-unescaped-entities */
import { Container, Divider, Heading, SimpleGrid, Stack, Image, Text, Button, useDisclosure, Collapse, Box, Spacer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import styled from '@emotion/styled'
import NextLink from 'next/link'

// Styled components
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
`

// ===================== Part =================

function CollapseExtandip() {
  const { isOpen, onToggle } = useDisclosure()

  const { isOpen: isEditOpenmd0 , onOpen: onEditOpenmd0, onClose: onEditClosemd0 } = useDisclosure()
  const { isOpen: isEditOpenmd1 , onOpen: onEditOpenmd1, onClose: onEditClosemd1 } = useDisclosure()
  const { isOpen: isEditOpenmd2 , onOpen: onEditOpenmd2, onClose: onEditClosemd2 } = useDisclosure()
  const { isOpen: isEditOpenmd3 , onOpen: onEditOpenmd3, onClose: onEditClosemd3 } = useDisclosure()
  const { isOpen: isEditOpenmd9 , onOpen: onEditOpenmd9, onClose: onEditClosemd9 } = useDisclosure()
  const { isOpen: isEditOpenmd11 , onOpen: onEditOpenmd11, onClose: onEditClosemd11 } = useDisclosure()
  const { isOpen: isEditOpenmd12 , onOpen: onEditOpenmd12, onClose: onEditClosemd12 } = useDisclosure()
  return (
    <>
    
      <Button borderRadius='10px' variant='outline' leftIcon={<ChevronDownIcon />} onClick={onToggle} fontSize={20}
      mt='20'
      >
        Selected Projects
      </Button>
      <Collapse in={!isOpen} animateOpacity>
        <Box
          
          p='1px'
          color='white'
          mt='4'
          rounded='md'
          shadow='md'
        >
         
         <SimpleGrid columns={[2]} gap={20} mt={10}>

         <Section>
        
        
        <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd0}>
           <Image 
          src='/images/works/BOTASF.jpg'
          alt='User Experience'
          borderRadius='lg'
          />

           
          <Modal isOpen={isEditOpenmd0} onClose={onEditClosemd0} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" ></ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
                  <Image 
                    src='/images/works/keeb_post.png'
                    alt='KODE-BOARD'
                    width={ 'full' }
                    borderRadius={0}
                    mb={0}
                    
                  />
                    <Text fontSize={24} fontWeight={'hairline'}>
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
                  {/*
                  <Image 
                    src='/images/works/keeb_ref.png'
                    alt='Project 3D 1'
                    width={ 'full' }
                    borderRadius={0}
                  /> */}
                  

                  <Section>
                  <Image 
                    src='/images/works/keenn.png'
                    alt='FIgma output'
                    width={ 'container.lg' }
                    borderRadius={0}
                  />
                  </Section>
                  
                  
                  {/*<Image 
                    src='/images/works/keeb_1.png'
                    alt='Project 3D output'
                    borderRadius={0}
                    width={ 'full' }
                  />
                  
                  

                  
                  <Image 
                    src='/images/works/keeb_2.jpg'
                    alt='Project 3D output'
                    borderRadius={0}
                    width={ 'full' }
                  />
                  
                  

                 
                  <Image 
                    src='/images/works/BOTASF.jpg'
                    alt='Project 3D 1'
                    borderRadius={0}
                    width={ 'full' }
                  />
                  
                  
                
                  

                  <Section>
                  <Image
                    src='/images/works/nww.jpg'
                    alt='Project 3D 1'
                     width={ 'full' }
                     borderRadius={0}
                  />
                
                  </Section>

                  <Section>
                  <Image
                    src='/images/works/newpers2.jpg'
                    alt='Project 3D 1'
                     width={ 'full' }
                     borderRadius={0}
                  />
            
                  </Section>
                  

                  <Section>
                  <Image
                    src='/images/works/newpers.jpg'
                    alt='Project 3D 1'
                     width={ 'full' }
                     borderRadius={0}
                  />
                  
 
                  </Section>
                  <Section>
                  <Image
                    src='/images/works/newperjjgjgg.jpg'
                    alt='Project 3D 1'
                     width={ 'full' }
                     borderRadius={0}
                  />
                
                  </Section>

                  <Section>
                  <Image
                    src='/images/works/lov.jpg'
                    alt='Project 3D 1'
                     width={ 'full' }
                     borderRadius={0}
                  />
                
              
                  </Section>*/}

                   
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
          <Button height={'auto'} onClick={onEditOpenmd12}>
           <Image 
          src='/images/works/BOTASF.jpg'
          alt='User Experience'
          borderRadius='lg'
          />

           
          <Modal isOpen={isEditOpenmd12} onClose={onEditClosemd12} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >JokifAI</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
                  <Image 
                    src='/images/works/keeb_post.png'
                    alt='KODE-BOARD'
                    width={ 'full' }
                    borderRadius={0}
                    mb={0}
                    
                  />
                    <Text fontSize={24} fontWeight={'hairline'}>
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
                  {/*
                  <Image 
                    src='/images/works/keeb_ref.png'
                    alt='Project 3D 1'
                    width={ 'full' }
                    borderRadius={0}
                  /> */}
                  

                  <Section>
                  <Image 
                    src='/images/works/keenn.png'
                    alt='FIgma output'
                    width={ 'container.lg' }
                    borderRadius={0}
                  />
                  </Section>
                  
                  
                  {/*<Image 
                    src='/images/works/keeb_1.png'
                    alt='Project 3D output'
                    borderRadius={0}
                    width={ 'full' }
                  />
                  
                  

                  
                  <Image 
                    src='/images/works/keeb_2.jpg'
                    alt='Project 3D output'
                    borderRadius={0}
                    width={ 'full' }
                  />
                  
                  

                 
                  <Image 
                    src='/images/works/BOTASF.jpg'
                    alt='Project 3D 1'
                    borderRadius={0}
                    width={ 'full' }
                  />
                  
                  
                
                  

                  <Section>
                  <Image
                    src='/images/works/nww.jpg'
                    alt='Project 3D 1'
                     width={ 'full' }
                     borderRadius={0}
                  />
                
                  </Section>

                  <Section>
                  <Image
                    src='/images/works/newpers2.jpg'
                    alt='Project 3D 1'
                     width={ 'full' }
                     borderRadius={0}
                  />
            
                  </Section>
                  

                  <Section>
                  <Image
                    src='/images/works/newpers.jpg'
                    alt='Project 3D 1'
                     width={ 'full' }
                     borderRadius={0}
                  />
                  
 
                  </Section>
                  <Section>
                  <Image
                    src='/images/works/newperjjgjgg.jpg'
                    alt='Project 3D 1'
                     width={ 'full' }
                     borderRadius={0}
                  />
                
                  </Section>

                  <Section>
                  <Image
                    src='/images/works/lov.jpg'
                    alt='Project 3D 1'
                     width={ 'full' }
                     borderRadius={0}
                  />
                
              
                  </Section>*/}

                   
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                   
                  </center>
              </ModalBody>
              <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEditClosemd12}>Close</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
         

           </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3' mb={10}>
          <Heading as="h2"  fontWeight="hairline">
          JokifAI
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
          src='/images/works/kodbordrr.jpg'
          alt='Project 3D 1'
          borderRadius='lg'
          />

           
          <Modal isOpen={isEditOpenmd1} onClose={onEditClosemd1} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >KODE-PAD Renders</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
              <Box
                    as='video'
                    controls
                    src='/images/works/0016-0060.mkv'
                    poster='/images/works/mukil.jpeg'
                    alt='space azure'
                    borderRadius={0}
                    width={ 'full' }

                    objectFit='contain'
                    sx={{
                      aspectRatio: '16/9'
                    }}
                    />
                     
                  <Image 
                    src='/images/works/kodbordrr.jpg'
                    alt='kodpad'
                    width={ 'full' }
                    borderRadius={0}
                    mb={0}
                    
                  />
                  
                    <Text fontSize={24} fontWeight={'hairline'}>
                    
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
                    src='/images/works/keypad23.jpg'
                    alt='Project 3D 1'
                    width={ 'full' }
                    borderRadius={0}
                  />
                  
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/kod_board.jpg'
                    alt='Project 3D 1'
                    width={ 'full' }
                    borderRadius={0}
                  />
                  
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/REDDEF.jpg'
                    alt='Project 3D 1'
                    width={ 'full' }
                    borderRadius={0}
                  />
                  
                  
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/kodbordrrz.jpg'
                    alt='Project 3D 1'
                    width={ 'full' }
                    borderRadius={0}
                  />
            
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/jourdey.png'
                    alt='Project 3D 1'
                    width={ 'full' }
                    borderRadius={0}
                  />
                  
                  </Section>

                  <Section>
                  <Box
                    as='video'
                    controls
                    src='/images/works/neew.mkv'
                    poster='/images/works/kodbord.jpg'
                    alt='space azure'
                    borderRadius={0}
                    width={ 'full' }

                    objectFit='contain'
                    sx={{
                      aspectRatio: '16/9'
                    }}
                    />
                  
                  
                  </Section>
                   
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
              
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
          KODEPAD Renders: The Macro Magician in Your Backpack Pocket
          </Text>
        </Stack>
         
            </Section>
{/*opto starts--------------------------------------------------------------------------*/}
            <Section>
        
        
        <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd11}>
           <Image 
          src='/images/works/pro.jpg'
          alt='User Experience'
          borderRadius='lg'
          />

           
          <Modal isOpen={isEditOpenmd11} onClose={onEditClosemd11} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >OPTICAL ENCODER BASED STEERING SYSTEM</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
                  <Image 
                    src='/images/works/Pro.jpg'
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
                  One day, he decided to do something about it. He thought of an idea that could help him drive a vehicle with his left hand disabled. He decided to use his knowledge of technology and create a prototype that could control a vehicle with optical encoder, it is a high accuracy small sensor use in industrial purpose. He thought that if he could control the vehicle with only right hand with the help of sensor, he wouldn&apos;t need to use his left hands at all. he realises that the abilities of the Encoder based steering system is more than anybody think
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
                  After several days of hard work, he finally completed his project. He had created optical encoder(sensor) based vehicle controller that could connect to the car&apos;s system and control its functions. He had tested the device in simulation first and successful in it.
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
                  Minimal space-usage and no permanent modification to the vehicle
Should be able to handle parking and low speed maneuvers safely
1. The long shaft of the steering wheel is eliminated. Due to the encoder fixed near to the steering wheel.
2. There is precise control available due the high resolution of the encoder.
3. More the resolution more the accuracy of the steering mechanism.
4. Weight of the system is reduced.
5.DRIVING ACCESSIBILITY FOR SPECIALY ABLED PEOPLES
5. Cost of manufacturing and assembly is increased due to electronic component. 
6. Autonomous driving system is possible due to introduction of the encoder. 

                  </Section>
                   
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                   
                  </center>
              </ModalBody>
              <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEditClosemd11}>Close</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
         

           </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3' mb={10}>
          <Heading as="h2"  fontWeight="hairline">
          MICROINTERACTION CLASS ASSIGNMENT
        </Heading>
          <Text fontSize={'xs'} mb={10}>
          Microinteraction is a small, interactive element that occurs when a user interacts with a digital product. It can be as simple as a button click or as complex as a multi-step process.
          </Text>
        </Stack>
         
            </Section>
            {/*opto ends--------------------------------------------------------------------------*/}

            <Section>
            <Imgtrans mt={10}>
          <Button height={'auto'} onClick={onEditOpenmd2}>
            <Image 
          src='/images/works/suono jpeg.jpg'
          alt='Koenigsegg CC850'
          borderRadius='lg'
          />

         
          <Modal isOpen={isEditOpenmd2} onClose={onEditClosemd2} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >SUONO🎶</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
              <Image 
          src='/images/works/suono jpeg.jpg'
          alt='Koenigsegg CC850'
          width={ 'container.sm' }
          borderRadius={15}
          mb={10}
          /><Text fontSize={24} fontWeight={'hairline'}>
                    Suono, the Italian word for sound, is not just a music player app; 
                    it&apos;s a transformative experience that crystallizes your music into a 
                    mesmerizing journey.  Imagine a music experience where songs unfold 
                    like sparkling crystals, revealing hidden depths and emotions with 
                    each segment. Suono reimagines music listening through a crystal-inspired 
                    interface and segmented timelines, creating a deeply personal and cognitive
                     listening experience.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
          src='/images/works/alizeefoder.png'
          alt='Koenigsegg CC850'
          width={ 'container.sm' }
          borderRadius={20}
          />
                  <ModalHeader>There is a reason behind your segmented timeline of life</ModalHeader>
                  Cognitive Deep Dives:  The timeline is segmented, allowing you to 
                  explore each section of a song in detail.  This can be particularly
                   useful for appreciating intricate musical arrangements, uncovering 
                   subtle details, or focusing on specific parts you love.  Imagine 
                   dissecting a musical gem, each segment revealing a new layer of
                    brilliance.
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/search.jpg'
          alt='Koenigsegg CC850'
          width={ 'full' }
          borderRadius={0}
          />
                  <ModalHeader>Frost Glass(Crys-Morphic theme everyware)</ModalHeader>
                  Soft Focus: The frosted glass theme creates a sense of 
                  calmness and intimacy.  Harsh lines and bright colors 
                  are replaced by a muted palette and a diffused aesthetic.
                   This allows listeners to truly immerse themselves in the 
                   music without visual distractions.
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/Frame 7.jpg'
          alt='Koenigsegg CC850'
          width={ 'full' }
          borderRadius={0}
          />
                  <ModalHeader>Minimalist Library for Maximum Focus</ModalHeader>
                  Uncluttered Interface:  Suono s library eschews clutter. 
                  Clean lines, soft colors, and ample space create a calming
                   environment for browsing your music collection. This allows
                    you to focus on finding the perfect song without visual 
                    distractions.
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/Now Playingfoder.jpg'
          alt='Koenigsegg CC850'
          width={ 'full' }
          borderRadius={0}
          />
                  <ModalHeader>BACKGROUND COLORDROP</ModalHeader>
                  This is what it looks like when working on the
                   Android smooth transition from personal music 
                   collection to a shared listening experience.
                  </Section>

                  <Section>
                  <Image 
          src='/images/works/Frame 3.jpg'
          alt='Koenigsegg CC850'
          width={ 'full' }
          borderRadius={0}
          />
                  <ModalHeader>GROUP SESSION BASED ON LOCAL MUSIC FILE</ModalHeader>
                  Group Creation: Once youve chosen your music, creating a group session is a breeze. Invite friends by sharing a unique link or using their usernames within Suono. This allows you to curate a listening experience with the specific people you want to share it with.

Synchronized Playback: Once everyone joins the session, the music begins playing in perfect sync for all participants.

pen_spark

                  </Section>

                  <Section>
                  <Image 
          src='/images/works/Frame 9.png'
          alt='Koenigsegg CC850'
          width={ 'container.L' }
          borderRadius={20}
          />
                  <ModalHeader>MORE DISPLAYS</ModalHeader>
                  A minimalist haven for focused listening. Imagine a tranquil library dedicated to your music, where every element fosters a sense of calm and clarity. Suono s interface is a breath of fresh air, stripping away unnecessary features to place the spotlight on the music itself.
                  </Section>
                   
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                    Suono isnt just a music player; its a bridge
                     that connects people through shared musical 
                     journeys.  With its intuitive music session 
                     feature and focus on a collaborative listening
                      experience, Suono allows you to create new 
                      memories and deepen connections with friends,
                       all centered around the music you love.
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
          SUONO
        </Heading>
          <Text fontSize={'xs'}>
          SUONO🎶:Where Music Crystallizes
          </Text>
        </Stack></Section>    
          
      


        <Section>
              <Container>
              <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd3}>
                  <Image src='/images/works/pind.png' alt='Bugatti veyron 16.4' borderRadius='lg'/>
                  
          <Modal isOpen={isEditOpenmd3} onClose={onEditClosemd3} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >NEMOSYNE-1 SSD ENCOLSURE</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
              <Image src='/images/works/pind.png' alt='Bugatti veyron 16.4' borderRadius={50}/>
                    <Text fontSize={24} fontWeight={'hairline'}>
                    Introducing NEMOSYNE-1, the M.2 SSD enclosure that redefines portable storage. 
              Inspired by the Greek goddess of memory,
               Mnemosyne, NEMOSYNE-1 isnt just about 
               safeguarding your data; its a statement 
               piece that elevates your computing experience.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image src='/images/works/1701795778958.jpg' alt='Bugatti veyron 16.4' borderRadius={25}/>
                  <ModalHeader>Integrated Display </ModalHeader>
                  Integrated Display:  NEMOSYNE-1 breaks away from the traditional enclosure mold by featuring 
                  a built-in display.  This innovative feature allows for real-time monitoring of drive health,
                   capacity usage, and even data transfer speeds.  Imagine a sleek enclosure showcasing the vital
                    statistics of your M.2 SSD, keeping you informed and in control.
                  </Section>

                  <Section>
                  <Image src='/images/works/novos.png' alt='Bugatti veyron 16.4' borderRadius={25}/>
                  <ModalHeader>All-in-One Button:</ModalHeader>
                  Gone are the days of fumbling with multiple buttons.
                   NEMOSYNE-1 boasts a single, multifunctional button. 
                    With a simple press, you can power on the enclosure,
                     wake the display, or even initiate specific actions
                      you program 
                  through intuitive software.  This elegant solution simplifies user interaction and keeps the design clean.
                  </Section>

                  <Section>
                  <Image src='/images/works/frid (2).png' alt='Bugatti veyron 16.4' borderRadius={25}/>
                  <ModalHeader>EXOTIC MATERIALS AND SURFACE</ModalHeader>
                  Exotic Materials:  NEMOSYNE-1 isnt just functional;
                   its a feast for the eyes.  The enclosure is crafted
                    from exotic materials, offering a unique and luxurious
                     aesthetic.  Imagine a textural masterpiece that complements
                      your high-performance setup, making NEMOSYNE-1 a conversation
                       starter on any desk.
                  </Section>
                  <Image src='/images/works/linkepure.png' alt='Bugatti veyron 16.4' borderRadius={25}/>
                  <Section>
                  <Image src='/images/works/glass.png' alt='Bugatti veyron 16.4' borderRadius={25}/>
                  <ModalHeader>Inspired by Mythology</ModalHeader>
                  Mnemosyne s Legacy: The name NEMOSYNE-1 pays homage to Mnemosyne,
                   the Greek goddess of memory and remembrance. This connection 
                   emphasizes the core function of the enclosure – safeguarding
                    your valuable data.
                  </Section>

                  <Section>
                  <Image src='/images/works/wrdis.png' alt='Bugatti veyron 16.4' borderRadius={25}/>
                  <ModalHeader>Beyond the Basics</ModalHeader>
                  Performance Unleashed:  NEMOSYNE-1 is designed to maximize the potential of your M.2 SSD.  Advanced thermal management ensures optimal operating temperatures, allowing your drive to perform at its peak.
                  
                  </Section>

                  <Section>
                  <Image src='/images/works/ssd enclosuredisplay.png' alt='Bugatti veyron 16.4' borderRadius={25}/>
                  <ModalHeader>Beyond the Basics</ModalHeader>
                  NEMOSYNE-1 breaks away from the traditional enclosure mold by
                   featuring a built-in display.  This innovative feature allows
                    for real-time monitoring of drive health, capacity usage, and
                     even data transfer speeds.  Imagine a sleek enclosure showcasing
                      the vital statistics of your M.2 SSD, keeping you informed 
                      and in control.
                  </Section>

                  <Section>
                  <Box
                    as='video'
                    controls
                    src='/images/works/tegra00.mkv'
                    poster='/images/works/frid (2).png'
                    alt='space azure'
                    borderRadius={15}
                    width={ 'container.lg' }

                    objectFit='contain'
                    sx={{
                      aspectRatio: '16/9'
                    }}
                    />
                  <ModalHeader>ANIMATION RENDERING</ModalHeader>
                  </Section>
                   
                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                    The name NEMOSYNE-1 pays homage to Mnemosyne, the Greek goddess of memory and remembrance. This connection emphasizes the core function of the enclosure – safeguarding your valuable data.
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
              NEMOSYNE-1 SSD ENCOLSURE
        </Heading>
              <Text fontSize={'xs'}>
              Introducing NEMOSYNE-1, the M.2 SSD enclosure that redefines portable storage. 
              Inspired by the Greek goddess of memory,
               Mnemosyne, NEMOSYNE-1 isnt just about 
               safeguarding your data; its a statement 
               piece that elevates your computing experience.
              </Text>
            </Stack>
              </Container>
      </Section>
      <Section>
        
        
        <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd9}>
           <Image 
          src='/images/works/utop.png'
          alt='User Experience'
          borderRadius='lg'
          />

           
          <Modal isOpen={isEditOpenmd9} onClose={onEditClosemd9} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >SKETCH PROJECTS AND PIXEL ARTS</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
              
              <Image 
                    src='/images/works/cycle port1.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  <Image 
                    src='/images/works/utop.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  <Divider orientation='horizontal' mb={10}>
                  </Divider>

                  <Image 
                    src='/images/works/newm4.jpeg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  <Divider orientation='horizontal' mb={10}>
                  </Divider>

                  <Image 
                    src='/images/works/MUKILH1ddd2.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>

                    <Image 
                    src='/images/works/megazord1.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>

                    <Image 
                    src='/images/works/lplkl1.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>

                    <Image 
                    src='/images/works/JPEGD.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>

                    <Image 
                    src='/images/works/contral.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>

                    <Image 
                    src='/images/works/nandt1y1h.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                    
                    <Image 
                    src='/images/works/MUKILH1ddd3.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>

                    <Image 
                    src='/images/works/MUKILH1ddd3.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>

                    <Image 
                    src='/images/works/MUKILH2.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>

                  </center>
              </ModalBody>
              <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEditClosemd9}>Close</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
         

           </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3' mb={10}>
          <Heading as="h2"  fontWeight="hairline">
          DIGITAL SKETCH PROJECTS AND PIXEL ARTS
        </Heading>
          <Text fontSize={'xs'} mb={10}>
          
          </Text>
        </Stack>
         
            </Section>
{/*original drone */}
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

  {/*const { isOpen: isEditOpenmd0 , onOpen: onEditOpenmd0, onClose: onEditClosemd0 } = useDisclosure()*/}
  const { isOpen: isEditOpenmd1 , onOpen: onEditOpenmd1, onClose: onEditClosemd1 } = useDisclosure()
  const { isOpen: isEditOpenmd2 , onOpen: onEditOpenmd2, onClose: onEditClosemd2 } = useDisclosure()
  const { isOpen: isEditOpenmd3 , onOpen: onEditOpenmd3, onClose: onEditClosemd3 } = useDisclosure()
  const { isOpen: isEditOpenmd4 , onOpen: onEditOpenmd4, onClose: onEditClosemd4 } = useDisclosure()
  const { isOpen: isEditOpenmd5 , onOpen: onEditOpenmd5, onClose: onEditClosemd5 } = useDisclosure()
  const { isOpen: isEditOpenmd6 , onOpen: onEditOpenmd6, onClose: onEditClosemd6 } = useDisclosure()
  const { isOpen: isEditOpenmd9 , onOpen: onEditOpenmd9, onClose: onEditClosemd9 } = useDisclosure()
  const { isOpen: isEditOpenmd10 , onOpen: onEditOpenmd10, onClose: onEditClosemd10 } = useDisclosure()
  return (
    <>
    
    <Button borderRadius='10px' variant='outline' leftIcon={<ChevronDownIcon />} onClick={onToggle} fontSize={20}
      mt='0'
      >
        Also check out
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
          <Button height={'auto'} onClick={onEditOpenmd10}>
           <Image 
          src='/images/works/NANDI.jpg'
          alt='User Experience'
          borderRadius='lg'
          />

           
          <Modal isOpen={isEditOpenmd10} onClose={onEditClosemd10} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >INFINITY DOOR</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
                  <Image 
                    src='/images/works/macmurtry2.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                    <Text fontSize={24} fontWeight={'hairline'}>
                    Moo-ve over, ordinary cars! Introducing a glimpse of the futuristic Design moo-d, inspired by nature s gentle giants -La grande mucca carina🐮-. you can spot the big, cute ears. Stay tuned for the udderly unique door reveal!

btw, the giant cute bull is a regular visitor to help me to design some cool DNAs, 

This gentle giant moos by for a daily snack and cuddle. Can t resist those big brown eyes 
so Forget the scissor doors. Taurus embraces a radical approach with doors that fold upwards in a powerful arc, resembling a bull horns poised for action. This dramatic movement creates a sense of anticipation and raw energy.
                    </Text>
                  <Divider orientation='horizontal'>
                  </Divider>

                  <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={10}>
                  <Section>
                  <Image 
                    src='/images/works/nandt.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                  />
                  <ModalHeader>Bovine Elegance</ModalHeader>
                  The hinges for the Taurus doors are cleverly concealed within the body of the car. This creates a clean, seamless look when the doors are closed, further emphasizing the unexpected reveal when they open.  Imagine a sleek, unassuming exterior that transforms into a powerful beast when the doors rise.
                  </Section>

                  <Section>
                  <Image 
                    src='/images/works/assda.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                  />
                  <ModalHeader>DESIGN AND INSPIRATION</ModalHeader>
                  The Taurinus doors are inspired by the graceful upward curve of a bull horns.  They hinge vertically at the front of the car and rise smoothly, creating a sense of elegance and controlled power.
                  </Section>

                  </SimpleGrid>
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                   
                  </center>
              </ModalBody>
              <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEditClosemd10}>Close</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
         

           </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3' mb={10}>
          <Heading as="h2"  fontWeight="hairline">
          TOROS
        </Heading>
          <Text fontSize={'xs'} mb={10}>
          Introducing TOROS, a car door design inspired by the raw power and untamed spirit of a bull. This isn t just a car; its an extension of your personality, a statement that exudes confidence and a hint of controlled aggression.
          </Text>
        </Stack>
         
            </Section>

            <Section>
        
        
        <Imgtrans>
          <Button height={'auto'} onClick={onEditOpenmd9}>
           <Image 
          src='/images/works/Mdx.jpg'
          alt='User Experience'
          borderRadius='lg'
          />

           
          <Modal isOpen={isEditOpenmd9} onClose={onEditClosemd9} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" >SKETCH PROJECTS AND DESIGN JOURNEYS</ModalHeader>
              </center>
              <ModalCloseButton />
              <ModalBody>
                    
              <center>
                 
                  <Image 
                    src='/images/works/yellow theme baed2.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  <Divider orientation='horizontal' mb={10}>
                  </Divider>

                  <Image 
                    src='/images/works/tra tra lento1.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  <Divider orientation='horizontal' mb={10}>
                  </Divider>

                  <Image 
                    src='/images/works/lambutrgrd1.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>

                    <Image 
                    src='/images/works/lampor1.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>

                    <Image 
                    src='/images/works/gayialk.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>

                    <Image 
                    src='/images/works/bmdubroo3.png'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>

                    <Image 
                    src='/images/works/nandt1y.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>

                    <Image 
                    src='/images/works/nandt1y1h.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>
                    
                    <Image 
                    src='/images/works/MUKILH1ddd3.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>

                    <Image 
                    src='/images/works/MUKILH1ddd3.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>

                    <Image 
                    src='/images/works/MUKILH2.jpg'
                    alt='Project 3D 1'
                    width={ 'container.lg' }
                    borderRadius={15}
                    mb={10}
                  />
                  
                    <Divider orientation='horizontal' mb={10}>
                    </Divider>

                  </center>
              </ModalBody>
              <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEditClosemd9}>Close</Button>
              </ModalFooter>
              </ModalContent>
          </Modal>
         

           </Button>
          </Imgtrans>
          <Stack mt='6' spacing='3' mb={10}>
          <Heading as="h2"  fontWeight="hairline">
          MORE SKETCH PROJECTS AND DESIGN JOURNEYS
        </Heading>
          <Text fontSize={'xs'} mb={10}>
          
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
                  Next, I added some shading and highlights to the sketch using different shades of gray. I used a soft brush tool with low opacity to create smooth gradients and shadows. I also used a hard eraser tool to erase some parts of the outline and make the sketch look more realistic. I paid attention to the light source and how it reflected on the car&apos;s surface.
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
                  I added some shading and highlights to the sketch using different shades of gray. I used a soft brush tool with low opacity to create smooth gradients and shadows. I also used a hard eraser tool to erase sharp reflection parts of the outline and make the sketch look more realistic. I paid attention to the light source and how it reflected on the car&apos;s surface.
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
feeding on crop-destroying Bugs. The venom from a black widow spider may cause muscle aches, nausea, a paralysis of the diaphragm, and potentially death, but it&apos;s being used in inventive ways in medicine.

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
long distance from eYantra&apos;s Office. This makes the process more
tedious. If we were nearer to eYantra&apos;s office, we would have surely
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
                 
              <Image src='/images/works/alfatauri.png' alt='FERRARI MONZA SP1' borderRadius='lg'/>
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
                  poster='/images/works/terzo_128.jpg'
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

      
      {/* Ending of Cards - Add or Remove Work cards here */}
      </SimpleGrid>
         {/* Works Content */}
        </Box>
      </Collapse>
    </>
  )
}

// ================ End of Work Section =========================

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
      <Spacer/>
<Trans>
<Section>
<Box align="center" my={4}>
          <NextLink href="/" passHref scroll={true}>
            <Button borderRadius='20px' variant='outline' border='1px' 
            borderColor='black.500' mt='10' leftIcon={<ChevronLeftIcon />}>
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
