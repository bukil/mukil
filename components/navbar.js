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
import { keyframes } from '@emotion/react'
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react'

// Add keyframes for a 'gasp' (pulse/shine) animation

const LinkItem = ({ href, path, target, children, tabRef, ...props }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray.600', 'whiteAlpha.900')
  const activeTextColor = '#202023'
  return (
    <NextLink href={href} passHref legacyBehavior>
      <Link
        ref={tabRef}
        p={1}
        fontSize={18}
        color={active ? activeTextColor : inactiveColor}
        borderRadius={'10px'}
        fontWeight="hairline"
        position="relative"
        zIndex={2}
        transition="color 0.32s cubic-bezier(.4,2,.3,1)"
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

  // --- Traveling highlight logic ---
  const tabRefs = [useRef(), useRef(), useRef(), useRef()]
  const [highlight, setHighlight] = useState({ left: 0, width: 0 })
  const navStackRef = useRef()
  const tabPaths = ['/works', '/blog', '/Mukil_resume.pdf', '/contact']

  // Helper to update highlight position
  const updateHighlight = () => {
    const idx = tabPaths.findIndex(p => p === path)
    if (idx === -1) return
    const tab = tabRefs[idx].current
    const nav = navStackRef.current
    if (tab && nav) {
      const tabRect = tab.getBoundingClientRect()
      const navRect = nav.getBoundingClientRect()
      setHighlight({
        left: tabRect.left - navRect.left,
        width: tabRect.width
      })
    }
  }

  useLayoutEffect(() => {
    // Wait for DOM update for smoother animation
    setTimeout(updateHighlight, 10)
    window.addEventListener('resize', updateHighlight)
    return () => window.removeEventListener('resize', updateHighlight)
  }, [path])

  useEffect(() => {
    // Initial mount
    updateHighlight()
  }, [])

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={9999}
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
        <Flex align="center" mr={100}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>

        {/* Desktop Navigation */}
        <Box position="relative" flexGrow={1}>
          <Stack
            ref={navStackRef}
            direction={{ base: 'column', md: 'row' }}
            display={{ base: 'none', md: 'flex' }}
            width={{ base: 'full', md: 'auto' }}
            alignItems="center"
            flexGrow={1}
            mt={{ base: 4, md: 0 }}
            spacing={2}
            position="relative"
          >
            {/* Traveling highlight bar */}
            <Box
              position="absolute"
              top={0}
              left={highlight.left}
              height="100%"
              width={highlight.width}
              bg="#89EF8C"
              borderRadius="10px"
              zIndex={1}
              transition="all 0.4s cubic-bezier(.4,2,.3,1)"
              boxShadow="0 2px 8px 0 rgba(0,0,0,0.08)"
            />
            <LinkItem href="/works" path={path} tabRef={tabRefs[0]} fontWeight="hairline" fontSize={18}>
              MY WORKS
            </LinkItem>
            <LinkItem href="/blog" path={path} tabRef={tabRefs[1]} fontWeight="hairline" fontSize={18}>
              BLOG
            </LinkItem>
            <LinkItem
              fontWeight="hairline"
              target="_blank"
              fontSize={18}
              href="/Mukil_resume.pdf"
              path={path}
              tabRef={tabRefs[2]}
              display="inline-flex"
              alignItems="center"
              pl={2}
            >
              RESUME
            </LinkItem>
            <LinkItem href="/contact" path={path} tabRef={tabRefs[3]} fontWeight="hairline" fontSize={18}>
              CONTACT
            </LinkItem>
          </Stack>
        </Box>

        {/* Mobile Menu */}
        <Box flex={1} align="right">
          <Flex align="center" justify="flex-end" h="100%">
            <Box display={{ base: 'inline-block', md: 'none' }}>
              <Menu isLazy id="navbar-menu">
                <MenuButton
                  as={IconButton}
                  icon={<HamburgerIcon />}
                  variant="outline"
                  borderRadius="15px"
                  aria-label="Options"
                />
                <MenuList
                  bg={useColorModeValue('whiteAlpha.900', 'blackAlpha.900')}
                  backdropFilter="auto"
                  backdropBlur="8px"
                  border="1px solid"
                  borderColor={useColorModeValue('whiteAlpha.400', 'whiteAlpha.200')}
                  borderRadius="15px"
                  boxShadow="lg"
                  sx={{
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backdropFilter: 'blur(8px)',
                      zIndex: -1
                    }
                  }}
                >
                  <NextLink href="/works" passHref legacyBehavior>
                    <MenuItem as={Link}>MY WORKS</MenuItem>
                  </NextLink>
                  <NextLink href="/blog" passHref legacyBehavior>
                    <MenuItem as={Link}>BLOG</MenuItem>
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
            <Box ml={2} display="flex" alignItems="center">
              <ThemeToggleButton />
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar