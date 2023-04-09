import Logo from './logo'
import NextLink from 'next/link'
import styled from '@emotion/styled'
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
import { IoLogoLinkedin,IoLogoGithub,IoMail,IoLogoYoutube } from 'react-icons/io5'
import ThemeToggleButton from './theme-toggle-button'

const cust = styled.span`
  Button {
       backgroundColor: transparent;
  }

  &:hover Button {
    backgroundColor: transparent;
  }
`

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
        p={2}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
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
          >
            MY WORKS
          </LinkItem>
          <LinkItem href="exp.js" path={path} fontWeight="hairline" passHref>
            VIDEOS
          </LinkItem>
          <LinkItem
          fontWeight="hairline"
            target="_blank"
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
          <cust>
          <Button
            fontWeight="hairline"
            fontSize={13}
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
          </cust>
        </Stack>

        {/* =================Modal Contacts ========================================== */}
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contact Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Contact info 1st set------------------------------------------------------ */}
            <SimpleGrid columns={2} gap={1} gridTemplateColumns={'30px 1fr'} mb={3}> 
            <IoLogoLinkedin size={20}/> 
            <Link target="https://www.linkedin.com/in/automotivedesigner/" href="https://www.linkedin.com/in/automotivedesigner/"  backgroundColor={'transparent'}
            _hover={{backgroundColor: 'transparent', textDecoration: 'underline'}} _active={{backgroundColor: 'transparent', textDecoration: 'underline'}} fontSize={13}>
                LinkedIn
            </Link>
            </SimpleGrid>
            {/* Contact info 1st set------------------------------------------------------ */}
            {/* Contact info 1st set------------------------------------------------------ */}
            <SimpleGrid columns={2} gap={1} gridTemplateColumns={'30px 1fr'} mb={3}> 
            <IoLogoGithub size={20}/> 
            <Link target="https://www.linkedin.com/in/automotivedesigner/" href="https://www.linkedin.com/in/automotivedesigner/"  backgroundColor={'transparent'}
            _hover={{backgroundColor: 'transparent', textDecoration: 'underline'}} _active={{backgroundColor: 'transparent', textDecoration: 'underline'}} fontSize={13}>
                Github
            </Link>
            </SimpleGrid>
            {/* Contact info 1st set------------------------------------------------------ */}
            {/* Contact info 1st set------------------------------------------------------ */}
            <SimpleGrid columns={2} gap={1} gridTemplateColumns={'30px 1fr'} mb={3}> 
            <IoMail size={20}/> 
            <Link target="https://www.linkedin.com/in/automotivedesigner/" href="https://www.linkedin.com/in/automotivedesigner/"  backgroundColor={'transparent'}
            _hover={{backgroundColor: 'transparent', textDecoration: 'underline'}} _active={{backgroundColor: 'transparent', textDecoration: 'underline'}} fontSize={13}>
                Gmail
            </Link>
            </SimpleGrid>
            {/* Contact info 1st set------------------------------------------------------ */}
            {/* Contact info 1st set------------------------------------------------------ */}
            <SimpleGrid columns={2} gap={1} gridTemplateColumns={'30px 1fr'} mb={3}> 
            <IoLogoYoutube size={20}/> 
            <Link target="https://www.linkedin.com/in/automotivedesigner/" href="https://www.linkedin.com/in/automotivedesigner/"  backgroundColor={'transparent'}
            _hover={{backgroundColor: 'transparent', textDecoration: 'underline'}} _active={{backgroundColor: 'transparent', textDecoration: 'underline'}} fontSize={13}>
                YouTube
            </Link>
            </SimpleGrid>
            {/* Contact info 1st set------------------------------------------------------ */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
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
                aria-label="Options"
              />
              <MenuList>
                <NextLink href="works" passHref>
                  <MenuItem as={Link}>MY WORKS</MenuItem>
                </NextLink>
                <NextLink href="exp.js" passHref>
                  <MenuItem as={Link}>VIDEOS</MenuItem>
                </NextLink>
                <NextLink href="/Mukil_resume.pdf" passHref>
                <MenuItem as={Link}>RESUME</MenuItem>
                </NextLink>
                <NextLink href="/public/Mukil" passHref>
                <MenuItem as={Link}>CONTACT</MenuItem>

                </NextLink>
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