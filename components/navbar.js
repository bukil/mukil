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
  useColorModeValue
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
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
          <LinkItem href="/contact" path={path} fontWeight="hairline" fontSize={20}>
            CONTACT
          </LinkItem>
        </Stack>

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
                <NextLink href="/contact" passHref legacyBehavior>
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