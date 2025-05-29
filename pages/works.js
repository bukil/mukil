/* eslint-disable react/no-unescaped-entities */
import { Container, Divider, Heading, SimpleGrid, Stack, Image, Text, Button, useDisclosure, Collapse, Box, Spacer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useColorMode } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import styled from '@emotion/styled'
import NextLink from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import KodeboardModal from '../components/projects/Kodeboard'
import Head from 'next/head'
import MicrointeractionModal from '../components/projects/MI'

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

const SnowContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`

const Snowflake = styled.div`
  position: absolute;
  background: white;
  border-radius: 50%;
  opacity: 0;
  animation: float linear infinite;
  @keyframes float {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg);
      opacity: 0;
    }
    20% {
      opacity: 0.8;
    }
    80% {
      opacity: 0.8;
    }
    100% {
      transform: translateY(-20px) translateX(10px) rotate(360deg);
      opacity: 0;
    }
  }
`

const BigText = styled.div`
  font-family: 'BaseNeueTrial', sans-serif;
  font-size: 25vw;
  font-weight: 900;
  font-style: italic;
  text-transform: uppercase;
  color: ${props => props.colorMode === 'light' ? '#89EF8C' : 'rgba(255, 255, 255, 0.8)'};
  position: fixed;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  pointer-events: none;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-50%);
  letter-spacing: -0.016em;
`

const Character = styled.span`
  display: inline-block;
  opacity: 0;
  transform: translateY(100px);
`

const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.84) 50%, rgba(255,255,255,0) 100%);
  position: fixed;
  top: 90%;
  left: 0;
  z-index: 0;
`

const ContentWrapper = styled(Box)`
  margin-top: 85vh;
  position: relative;
  z-index: 1;
  background: transparent;
`

// Standard Panel Component
const ProjectPanel = ({ 
  title, 
  description, 
  imageSrc, 
  imageAlt, 
  gradientColors, 
  hoverGradientColors, 
  accentColor, 
  onClick,
  hasSnow = false
}) => {
  return (
    <Box 
      position="relative"
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      boxShadow="md"
      role="group"
      bg={gradientColors}
      transition="all 0.3s ease"
      _hover={{
        bg: hoverGradientColors
      }}
      onClick={onClick}
      cursor="pointer"
      height="400px"
      width="100%"
    >
      {hasSnow && (
        <SnowContainer>
          {[...Array(30)].map((_, i) => {
            const size = Math.random() * 10 + 3;
            let duration = Math.random() * 8 + 4;
            if (title === "Jokif-AI") {
              duration = Math.random() * 2 + 2;
            }
            return (
              <Snowflake
                key={i}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDuration: `${duration}s`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: `${Math.random() * 0.4 + 0.4}`
                }}
              />
            );
          })}
        </SnowContainer>
      )}
      <Box 
        position="relative" 
        height="100%" 
        width="100%" 
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text
          position="absolute"
          top="20%"
          left="50%"
          transform="translate(-50%, -50%)"
          fontSize="8xl"
          fontWeight="900"
          color="white"
          opacity="0"
          transition="all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          _groupHover={{ 
            opacity: 0.4,
            top: "35%",
            transform: "translate(-50%, -50%)"
          }}
          zIndex="0"
          letterSpacing="normal"
          lineHeight="1"
          fontFamily="'BaseNeueTrial', sans-serif"
          fontStyle="italic"
          textTransform="uppercase"
        >
          {title}
        </Text>
        <Image 
          src={imageSrc}
          alt={imageAlt}
          width={title === "Kode/Board" ? "80%" : "50%"}
          height={title === "Kode/Board" ? "80%" : "50%"}
          objectFit="contain"
          transition="all 0.3s ease"
          _groupHover={{ 
            filter: 'brightness(1.2)',
            transform: 'scale(1.05)'
          }}
          position="relative"
          zIndex="1"
          bg="transparent"
        />
      </Box>
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        bg="transparent"
        p={3}
        color="white"
        zIndex="2"
      >
        <Heading 
          as="h3" 
          size="sm" 
          mb={1}
          style={{
            fontFamily: '"Michroma", sans-serif',
            fontWeight: 900,
            fontStyle: 'normal',
            letterSpacing: '0.2em',
            color: 'white',
            transition: 'all 0.3s ease',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale'
          }}
          _groupHover={{ opacity: 0 }}
        >
          {title}
        </Heading>
        <Box 
          w="100%" 
          h="0.5px" 
          bg={accentColor} 
          mb={2}
        />
        <Text 
          fontSize="xs"
          fontFamily="'Encode Sans Expanded', sans-serif"
          fontWeight="400"
          letterSpacing="0.5px"
        >
          {description}
        </Text>
      </Box>
    </Box>
  )
}

// Usage in the main component
function CollapseExtandip() {
  const { isOpen: isEditOpenmd12, onOpen: onEditOpenmd12, onClose: onEditClosemd12 } = useDisclosure()
  const { isOpen: isEditOpenmd14, onOpen: onEditOpenmd14, onClose: onEditClosemd14 } = useDisclosure()
  const { isOpen: isEditOpenmd13, onOpen: onEditOpenmd13, onClose: onEditClosemd13 } = useDisclosure()
  const { isOpen: isEditOpenmd15, onOpen: onEditOpenmd15, onClose: onEditClosemd15 } = useDisclosure()
  const { isOpen: isEditOpenmd17, onOpen: onEditOpenmd17, onClose: onEditClosemd17 } = useDisclosure()

  return (
    <>
      <Box p='1px' color='white' mt='4' rounded='md' shadow='md'>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={{ base: 8, md: 10 }} mt={10} px={{ base: 4, md: 8 }}>
          <Section>
            <ProjectPanel
              title="Kode/Board"
              description="Here is a keyboard concept (kode board 🙃), Copy, paste, repeat... but not as you know it. Multi-layer clipboard on fingertips like seamlessly storing your snippets for instant recall. 🪄"
              imageSrc="/images/works/BOTASF.png"
              imageAlt="Kode/Board"
              gradientColors="radial-gradient(circle at center, rgba(0, 150, 0, 0.7) 0%, rgba(0, 30, 0, 0.98) 100%)"
              hoverGradientColors="radial-gradient(circle at center, rgba(0, 200, 0, 0.8) 0%, rgba(0, 40, 0, 0.98) 100%)"
              accentColor="green.400"
              onClick={onEditOpenmd12}
            />
            <KodeboardModal isOpen={isEditOpenmd12} onClose={onEditClosemd12} />
          </Section>

          <Section>
            <ProjectPanel
              title="Design Evaluation ChatGPT"
              description="Leveraging ChatGPT to evaluate and enhance design concepts. Get instant feedback, suggestions, and improvements for your creative work through AI-powered analysis. 🤖"
              imageSrc="/mukil/degpt2.png"
              imageAlt="Design Evaluation ChatGPT"
              gradientColors="radial-gradient(circle at center, rgba(0, 100, 255, 0.7) 0%, rgba(0, 30, 60, 0.98) 100%)"
              hoverGradientColors="radial-gradient(circle at center, rgba(0, 150, 255, 0.8) 0%, rgba(0, 40, 80, 0.98) 100%)"
              accentColor="blue.400"
              onClick={onEditOpenmd14}
            />
            <Modal isOpen={isEditOpenmd14} onClose={onEditClosemd14} size="full">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader as="h1" mt={32}>Design Evaluation</ModalHeader>
                <ModalCloseButton mt={32} />
                <ModalBody mt={4}>
                  {/* Add your modal content here */}
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onEditClosemd14}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Section>

          <Section>
            <ProjectPanel
              title="Jokif-AI"
              description="An AI-powered platform that brings humor and creativity together. Generate jokes, create memes, and share laughter with the power of artificial intelligence. 🤖"
              imageSrc="/images/works/BOTASF.png"
              imageAlt="AI Trends Project"
              gradientColors="radial-gradient(circle at center, rgba(100, 0, 255, 0.7) 0%, rgba(30, 0, 60, 0.98) 100%)"
              hoverGradientColors="radial-gradient(circle at center, rgba(150, 50, 255, 0.85) 0%, rgba(60, 0, 100, 0.98) 100%)"
              accentColor="purple.400"
              onClick={onEditOpenmd13}
              hasSnow={true}
            />
            <Modal isOpen={isEditOpenmd13} onClose={onEditClosemd13} size="full">
              <ModalOverlay backdropFilter="blur(10px)" />
              <ModalContent bg="rgba(0, 0, 0, 0.8)">
                <ModalHeader mt={32}>Jokif-AI</ModalHeader>
                <ModalCloseButton mt={32} />
                <ModalBody mt={4}>
                  <Text fontSize={24} fontWeight={'hairline'} mb={6}>
                    Welcome to Jokif-AI! This is a protected section of my portfolio.
                  </Text>
                  <Image 
                    src="/images/works/BOTASF.png"
                    alt="Jokif-AI Project"
                    width="100%"
                    borderRadius="lg"
                    mb={6}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onEditClosemd13}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Section>

          <Section>
            <ProjectPanel
              title="Microinteraction"
              description="A class assignment exploring the art of microinteractions. Small, meaningful animations and transitions that enhance user experience and bring interfaces to life. 🎨"
              imageSrc="/mukil/degpt2.png"
              imageAlt="Microinteraction Class Assignment"
              gradientColors="radial-gradient(circle at center, rgba(255, 100, 0, 0.7) 0%, rgba(60, 30, 0, 0.98) 100%)"
              hoverGradientColors="radial-gradient(circle at center, rgba(255, 150, 0, 0.8) 0%, rgba(80, 40, 0, 0.98) 100%)"
              accentColor="orange.400"
              onClick={onEditOpenmd15}
            />
            <MicrointeractionModal isOpen={isEditOpenmd15} onClose={onEditClosemd15} />
          </Section>
{/* interaction design===================================================================================== */}
          <Section>
            <ProjectPanel
              title={<span style={{ fontFamily: 'Tiny5, monospace' }}>C2C</span>}
              description="A deep dive into the craft of interaction design, exploring concepts, case studies, and hands-on projects from concept to creation. 🕹️"
              imageSrc="/images/works/c2cf.png"
              imageAlt="C2C: Interaction Design Project"
              gradientColors="radial-gradient(circle at center, rgba(0, 200, 150, 0.7) 0%, rgba(0, 30, 60, 0.98) 100%)"
              hoverGradientColors="radial-gradient(circle at center, rgba(0, 255, 200, 0.8) 0%, rgba(0, 40, 80, 0.98) 100%)"
              accentColor="teal.400"
              onClick={onEditOpenmd17}
              hasSnow={false}
            />
            <Modal isOpen={isEditOpenmd17} onClose={onEditClosemd17} size="full">
              <ModalOverlay backdropFilter="blur(10px)" />
              <ModalContent bg="rgba(0, 0, 0, 0.8)">
                <ModalHeader mt={32} style={{ fontFamily: 'Tiny5, monospace' }}>C2C</ModalHeader>
                <ModalCloseButton mt={32} />
                <ModalBody mt={4}>
                  <Text fontSize={24} fontWeight={'hairline'} mb={6}>
                    Explore the journey from concept to creation in interaction design. This project showcases case studies, design thinking, and hands-on interactive prototypes.
                  </Text>
                  <Image 
                    src="/images/works/perma.png"
                    alt="C2C: Interaction Design Project"
                    width="50%"
                    borderRadius="lg"
                    mb={6}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onEditClosemd17}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Section>
        </SimpleGrid>
      </Box>
    </>
  )
}

// ============== Indu also check out content for the interaction design ^ ===================

function CollapseExtandi() {
  const { isOpen, onToggle } = useDisclosure()

  const { isOpen: isEditOpenmd1, onOpen: onEditOpenmd1, onClose: onEditClosemd1 } = useDisclosure()
  const { isOpen: isEditOpenmd2, onOpen: onEditOpenmd2, onClose: onEditClosemd2 } = useDisclosure()
  const { isOpen: isEditOpenmd3, onOpen: onEditOpenmd3, onClose: onEditClosemd3 } = useDisclosure()
  const { isOpen: isEditOpenmd4, onOpen: onEditOpenmd4, onClose: onEditClosemd4 } = useDisclosure()
  const { isOpen: isEditOpenmd5, onOpen: onEditOpenmd5, onClose: onEditClosemd5 } = useDisclosure()
  const { isOpen: isEditOpenmd6, onOpen: onEditOpenmd6, onClose: onEditClosemd6 } = useDisclosure()
  const { isOpen: isEditOpenmd9, onOpen: onEditOpenmd9, onClose: onEditClosemd9 } = useDisclosure()
  const { isOpen: isEditOpenmd10, onOpen: onEditOpenmd10, onClose: onEditClosemd10 } = useDisclosure()
  const { isOpen: isMicroModalOpen, onOpen: onMicroModalOpen, onClose: onMicroModalClose } = useDisclosure()
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
         
         <SimpleGrid 
           columns={{ base: 1, sm: 2, md: 3 }} 
           gap={{ base: 8, md: 10 }} 
           mt={10}
           px={{ base: 4, md: 8 }}
         >

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
              <ModalHeader as="h1" mt={32}>INFINITY DOOR</ModalHeader>
              </center>
              <ModalCloseButton mt={32} />
              <ModalBody mt={4}>
                    
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
              <ModalHeader as="h1" mt={32}>SKETCH PROJECTS AND DESIGN JOURNEYS</ModalHeader>
              </center>
              <ModalCloseButton mt={32} />
              <ModalBody mt={4}>
                    
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
              <ModalHeader as="h1" mt={32}>BUGATTI CHIRON</ModalHeader>
              </center>
              <ModalCloseButton mt={32} />
              <ModalBody mt={4}>
                    
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
            <Imgtrans>
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
              <ModalHeader as="h1" mt={32}>KOENIGSEGG CC850</ModalHeader>
              </center>
              <ModalCloseButton mt={32} />
              <ModalBody mt={4}>
                    
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
              <ModalHeader as="h1" mt={32}>BUGATTI VEYRON 16.4</ModalHeader>
              </center>
              <ModalCloseButton mt={32} />
              <ModalBody mt={4}>
                    
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
    
          {/* TAREN DRONE Modal */}
          <Modal isOpen={isEditOpenmd4} onClose={onEditClosemd4} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" mt={32}>TAREN DRONE</ModalHeader>
              </center>
              <ModalCloseButton mt={32} />
              <ModalBody mt={4}>
                    
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
          
          {/* FERRARI MONZA Modal */}
          <Modal isOpen={isEditOpenmd5} onClose={onEditClosemd5} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" mt={32}>FERRARI MONZA SP1</ModalHeader>
              </center>
              <ModalCloseButton mt={32} />
              <ModalBody mt={4}>
                    
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

          {/* LAMBORGHINI Modal */}
          <Modal isOpen={isEditOpenmd6} onClose={onEditClosemd6} size={'full'} scrollBehavior={'outside'}>
              <ModalOverlay />
              <ModalContent>
              <center>
              <ModalHeader as="h1" mt={32}>LAMBORGHINI TERZO MILLENNIO</ModalHeader>
              </center>
              <ModalCloseButton mt={32} />
              <ModalBody mt={4}>
                    
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

const Works = () => {
  const bigTextRef = useRef(null)
  const dividerLineRef = useRef(null)
  const characters = "DESIGN".split("")
  const { colorMode } = useColorMode()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = bigTextRef.current?.children
      if (!chars) return

      // Create a timeline
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1
      })

      // Initial animation
      tl.to(chars, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out"
      })

      // Floating animation
      tl.to(chars, {
        y: -20,
        duration: 2,
        stagger: 0.05,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1
      }, ">")

      // Exit animation
      tl.to(chars, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.in"
      }, ">")
    }, bigTextRef)

    // Add scroll effect
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const fadeStart = 0
      const fadeEnd = 300 // Reduced fade distance for quicker fade out
      
      if (bigTextRef.current && dividerLineRef.current) {
        const opacity = Math.max(0, 1 - (scrollPosition - fadeStart) / (fadeEnd - fadeStart))
        gsap.to([bigTextRef.current, dividerLineRef.current], {
          opacity: opacity,
          duration: 0.1,
          ease: "none"
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      ctx.revert()
    }
  }, [])

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Tiny5&display=swap" rel="stylesheet" />
      </Head>
      <Layout title="Works" mt={10} maxW="100vw" overflowX="hidden">
        <Box w="100vw" position="relative" left="50%" right="50%" marginLeft="-50vw" marginRight="-50vw">
          <BigText ref={bigTextRef} colorMode={colorMode}>
            {characters.map((char, index) => (
              <Character key={index}>{char}</Character>
            ))}
          </BigText>
          <DividerLine ref={dividerLineRef} />
          <ContentWrapper>
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
                    <Button borderRadius='20px' variant='outline' 
                    border='1px' 
                    borderColor='black.500' mt='10' leftIcon={<ChevronLeftIcon />}>
                        GO BACK TO HOME PAGE
                    </Button>
                  </NextLink>
                </Box>
              </Section>
            </Trans>
          </ContentWrapper>
        </Box>
      </Layout>
    </>
  )
}

export default Works
export { getServerSideProps } from '../components/chakra'
