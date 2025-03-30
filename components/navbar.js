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
import { IoLogoLinkedin, IoLogoGithub, IoMail, IoLogoYoutube, IoLogoInstagram } from 'react-icons/io5'
import ThemeToggleButton from './theme-toggle-button'

const LinkItem = ({ href, path, target, children, ...props }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray.600', 'whiteAlpha.900')

  return (
    <NextLink href={href} passHref legacyBehavior>
      <Link
        p={2}
        bg={active ? 'grassTeal' : 'transparent'}
        color={active ? '#202023' : inactiveColor}
        target={target}
        _hover={{ textDecoration: 'underline' }}
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

        {/* Desktop Navigation */}
        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/works" path={path} fontWeight="hairline" fontSize={20}>
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
            pl={2}
          >
            RESUME
          </LinkItem>
          <Button
            fontWeight="hairline"
            fontSize={20}
            onClick={onOpen}
            backgroundColor="transparent"
            _hover={{ backgroundColor: 'transparent', textDecoration: 'underline' }}
          >
            CONTACT
          </Button>
        </Stack>

        {/* Modal Contacts */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Contact Info</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <SimpleGrid columns={2} gap={1} gridTemplateColumns={'30px 1fr'} mb={3}>
                <IoLogoLinkedin size={20} />
                <Link
                  href="https://www.linkedin.com/in/mukilk/"
                  isExternal
                  _hover={{ textDecoration: 'underline' }}
                  fontSize={13}
                >
                  LinkedIn/mukil kumar
                </Link>
              </SimpleGrid>
              <SimpleGrid columns={2} gap={1} gridTemplateColumns={'30px 1fr'} mb={3}>
                <IoLogoGithub size={20} />
                <Link
                  href="https://github.com/bukil"
                  isExternal
                  _hover={{ textDecoration: 'underline' }}
                  fontSize={13}
                >
                  Github.com/bukil
                </Link>
              </SimpleGrid>
              <SimpleGrid columns={2} gap={1} gridTemplateColumns={'30px 1fr'} mb={3}>
                <IoMail size={20} />
                <Link
                  href="mailto:mukil289446@gmail.com"
                  _hover={{ textDecoration: 'underline' }}
                  fontSize={13}
                >
                  mukil289446@gmail.com
                </Link>
              </SimpleGrid>
              <SimpleGrid columns={2} gap={1} gridTemplateColumns={'30px 1fr'} mb={3}>
                <IoLogoYoutube size={20} />
                <Link
                  href="https://www.youtube.com/channel/UCVeGi7RNdtqN6_7G-rjdSGQ"
                  isExternal
                  _hover={{ textDecoration: 'underline' }}
                  fontSize={13}
                >
                  YouTube
                </Link>
              </SimpleGrid>
              <SimpleGrid columns={2} gap={1} gridTemplateColumns={'30px 1fr'} mb={3}>
                <IoLogoInstagram size={20} />
                <Link
                  href="https://www.instagram.com/chintukla_pintukla/"
                  isExternal
                  _hover={{ textDecoration: 'underline' }}
                  fontSize={13}
                >
                  Instagram
                </Link>
              </SimpleGrid>
            </ModalBody>
            <ModalFooter>
              <Button borderRadius="15px" colorScheme="pink" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Mobile Menu */}
        <Box flex={1} align="right">
          <ThemeToggleButton />
          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                borderRadius="15px"
                aria-label="Options"
              />
              <MenuList>
                <NextLink href="/works" passHref legacyBehavior>
                  <MenuItem as={Link}>MY WORKS</MenuItem>
                </NextLink>
                <NextLink href="/Mukil_resume.pdf" passHref legacyBehavior>
                  <MenuItem as={Link}>RESUME</MenuItem>
                </NextLink>
                <MenuItem>
                  <Button
                    fontWeight="regular"
                    fontSize={11}
                    onClick={onOpen}
                    backgroundColor="transparent"
                    _hover={{ backgroundColor: 'transparent', textDecoration: 'underline' }}
                  >
                    CONTACT
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