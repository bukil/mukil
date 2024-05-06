import Logo from './logo'
import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { IoLogoLinkedin,IoLogoGithub,IoMail,IoLogoYoutube, IoLogoInstagram } from 'react-icons/io5'
import ThemeToggleButton from './theme-toggle-button'

const LinkItem = ({ href, path, target, children, ...props }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')
  return (
    <NextLink href={href} passHref scroll={false}>
      <Link
        p={2}
        bg={active ? 'grassTeal' : undefined}
        color={active ? '#202023' : inactiveColor}
        target={target}
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  )
}

const Navbar = props => {
  const { path } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={2}
      {...props}
    >
      <Container
        display="flex"
        p={6}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={100}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="works" path={path}
          fontWeight="hairline" passHref
          fontSize={20}
          >
            MY WORKS
          </LinkItem>
          <LinkItem
          fontWeight="hairline"
            target="_blank"
            fontSize={20}
            href="/Mukil_resume.pdf"
            path={path}
            display="inline-flex"
            alignItems="center"
            style={{ gap: 4 }}
            pl={2} passHref
          >
            {/* <IoLogoGithub /> */}
            RESUME
          </LinkItem>
          <Button
            fontWeight="hairline"
            fontSize={20}
            onClick={onOpen}
            path={path}
            display="inline-flex"
            alignItems="center"
            // style={{ gap: 4 }}
            pl={2}
            backgroundColor={'transparent'}
            _hover={{backgroundColor: 'transparent', textDecoration: 'underline'}}
          >
            {/* <IoLogoGithub /> */}
            CONTACT
          </Button>
        </Stack>

        {/* =================Modal Contacts ========================================== */}
        <Modal isOpen={isOpen} onClose={onClose}
        bg={useColorModeValue('#ffffff40', '#20202380')}
        css={{ backdropFilter: 'blur(10px)'}}
        >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
  >Contact Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody
          bg={useColorModeValue('#ffffff40', '#20202380')}
          css={{ backdropFilter: 'blur(10px)' }}

          >
            
            {/* Contact info 1st set------------------------------------------------------ */}
            <SimpleGrid columns={2} gap={1} gridTemplateColumns={'30px 1fr'} mb={3}> 
            <IoLogoLinkedin size={20}/> 
            <Link target="https://www.linkedin.com/in/automotivedesigner/" href="https://www.linkedin.com/in/automotivedesigner/"  backgroundColor={'transparent'}
            _hover={{backgroundColor: 'transparent', textDecoration: 'underline'}} _active={{backgroundColor: 'transparent', textDecoration: 'underline'}} fontSize={13}>
                LinkedIn/mukil kumar
            </Link>
            </SimpleGrid>
            {/* Contact info 1st set------------------------------------------------------ */}
            {/* Contact info 1st set------------------------------------------------------ */}
            <SimpleGrid columns={2} gap={1} gridTemplateColumns={'30px 1fr'} mb={3}> 
            <IoLogoGithub size={20}/> 
            <Link target="https://github.com/bukil" href="https://github.com/bukil"  backgroundColor={'transparent'}
            _hover={{backgroundColor: 'transparent', textDecoration: 'underline'}} _active={{backgroundColor: 'transparent', textDecoration: 'underline'}} fontSize={13}>
                Github.com/bukil
            </Link>
            </SimpleGrid>
            {/* Contact info 1st set------------------------------------------------------ */}
            {/* Contact info 1st set------------------------------------------------------ */}
            <SimpleGrid columns={2} gap={1} gridTemplateColumns={'30px 1fr'} mb={3}> 
            <IoMail size={20}/> 
            <Link target="mailto:mukil289446@gmail.com" href="mailto:mukil289446@gmail.com"  backgroundColor={'transparent'}
            _hover={{backgroundColor: 'transparent', textDecoration: 'underline'}} _active={{backgroundColor: 'transparent', textDecoration: 'underline'}} fontSize={13}>
                mukil289446@gmail.com
            </Link>
            </SimpleGrid>
            {/* Contact info 1st set------------------------------------------------------ */}
            {/* Contact info 1st set------------------------------------------------------ */}
            <SimpleGrid columns={2} gap={1} gridTemplateColumns={'30px 1fr'} mb={3}> 
            <IoLogoYoutube size={20}/> 
            <Link target="https://www.youtube.com/channel/UCVeGi7RNdtqN6_7G-rjdSGQ" href="https://www.youtube.com/channel/UCVeGi7RNdtqN6_7G-rjdSGQ"  backgroundColor={'transparent'}
            _hover={{backgroundColor: 'transparent', textDecoration: 'underline'}} _active={{backgroundColor: 'transparent', textDecoration: 'underline'}} fontSize={13}>
                YouTube
            </Link>
            </SimpleGrid>
            <SimpleGrid columns={2} gap={1} gridTemplateColumns={'30px 1fr'} mb={3}> 
            <IoLogoInstagram size={20}/> 
            <Link target="https://www.instagram.com/magna_kaizen/" href="https://www.instagram.com/magna_kaizen/"  backgroundColor={'transparent'}
            _hover={{backgroundColor: 'transparent', textDecoration: 'underline'}} _active={{backgroundColor: 'transparent', textDecoration: 'underline'}} fontSize={13}>
                Instagram
            </Link>
            </SimpleGrid>
            
            {/* Contact info 1st set------------------------------------------------------ */}
          </ModalBody>
          <ModalFooter>
            <Button borderRadius='15px' colorScheme='pink' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* ======================================================================== */}

        <Box flex={1} align="right">
          <ThemeToggleButton />

          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                borderRadius='15px'
                aria-label="Options"
              />
              <MenuList>
              
                <NextLink href="works" passHref>
                  <MenuItem as={Link}>MY WORKS</MenuItem>
                </NextLink>
                <NextLink  href="/Mukil_resume.pdf" passHref>
                <MenuItem as={Link}>RESUME</MenuItem>
                </NextLink>
                <MenuItem>
                <Button
            fontWeight="regular"
            fontSize={11}
            onClick={onOpen}
            path={path}
            display="inline-flex"
            alignItems="left"
          
           
            pl={0}
            backgroundColor={'transparent'}
            _hover={{backgroundColor: 'transparent', textDecoration: 'underline'}}
          >
            
            CONTACTS
          </Button>
          </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar



// Works ---> Skills
//posts --->  Experience
//Source ---> Resume