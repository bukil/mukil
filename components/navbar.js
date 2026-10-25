import Logo from './logo'
import NextLink from 'next/link'
import {
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  Portal,
  MenuButton,
  IconButton
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import React, { useRef, useEffect, useState, useLayoutEffect, useCallback, useMemo } from 'react'

// Stable tab paths outside component to avoid hook dep warnings
const TAB_PATHS = ['/works', '/blog', '/playground', '/Mukil_Résumé.pdf', '/contact']

// Add keyframes for a 'gasp' (pulse/shine) animation

const LinkItem = ({ href, path, target, children, tabRef, ...props }) => {
  const active = path === href
  const inactiveColor = 'gray.800'
  const hoverBg = 'rgba(137,239,140,0.2)'
  return (
    <NextLink href={href} passHref legacyBehavior>
      <Link
        ref={tabRef}
        py={2.5}
        px={3.5}
        fontSize={17}
        color={active ? '#202023' : inactiveColor}
        borderRadius={0}
        fontWeight="500"
        position="relative"
        zIndex={10}
        transition="all 0.2s ease-out"
        target={target}
        bg={active ? '#89EF8C' : 'transparent'}
        _hover={{
          textDecoration: 'none',
          transform: 'translateY(-2px)',
          color: active ? '#202023' : inactiveColor,
          bg: active ? '#89EF8C' : hoverBg,
          boxShadow: 'none'
        }}
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  )
}

const Navbar = props => {
  const { path } = props
  const [highlight, setHighlight] = useState({ left: 0, width: 0 })
  const navStackRef = useRef(null)
  // create stable refs and stable array identity
  const tabRef0 = useRef(null)
  const tabRef1 = useRef(null)
  const tabRef2 = useRef(null)
  const tabRef3 = useRef(null)
  const tabRef4 = useRef(null)
  const tabRefs = useMemo(() => [tabRef0, tabRef1, tabRef2, tabRef3, tabRef4], [])

  // --- Traveling highlight logic ---
  const tabPaths = TAB_PATHS

  // Helper to update highlight position (memoized)
  const updateHighlight = useCallback(() => {
    const idx = tabPaths.findIndex(p => p === path)
    if (idx === -1) {
      setHighlight({ left: 0, width: 0 })
      return
    }
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
  }, [path, tabPaths, tabRefs])

  useLayoutEffect(() => {
    // Wait for DOM update for smoother animation
    const timeoutId = setTimeout(updateHighlight, 20)
    window.addEventListener('resize', updateHighlight)
    return () => {
      window.removeEventListener('resize', updateHighlight)
      clearTimeout(timeoutId)
    }
  }, [path, updateHighlight])

  useEffect(() => {
    // Initial mount
    const timeoutId = setTimeout(updateHighlight, 20)
    return () => clearTimeout(timeoutId)
  }, [updateHighlight])

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      top={0}
      left={0}
      zIndex={2000}
    >
      <Box
        w="100%"
        p={2}
        position="relative"
        borderRadius="12px"
        margin="15px 16px"
        width="calc(100% - 32px)"
        overflow="hidden"
        bg="rgba(255, 255, 255, 0.75)"
        backdropFilter="blur(12px)"
        boxShadow="0 4px 24px rgba(0, 0, 0, 0.06)"
        border="1px solid rgba(0, 0, 0, 0.08)"
        transition="transform 0.2s linear"
        _hover={{
          transform: 'none'
        }}
      >
        <Box position="relative" zIndex={2} p={2}>
          <Flex align="center" w="99.5%" justify="space-between">
            {/* Logo on the far left - This gets the distortion effect */}
            <Flex align="center">
              <Heading as="h1" size="lg" letterSpacing={'tighter'}>
                <Logo />
              </Heading>
            </Flex>

            {/* Desktop Navigation and Theme Toggle on the right - No distortion */}
            <Flex align="center" ml="auto" display={{ base: 'none', md: 'flex' }}>
              <Stack
                ref={navStackRef}
                direction="row"
                alignItems="center"
                spacing={2}
                position="relative"
              >
                {/* Traveling highlight bar */}
                {highlight.width > 0 && (
                  <Box
                    position="absolute"
                    top={0}
                    left={highlight.left}
                    height="100%"
                    width={highlight.width}
                    bg="#89EF8C"
                    borderRadius={0}
                    zIndex={1}
                    transition="all 0.3s ease-out"
                    boxShadow="none"
                  />
                )}
                <LinkItem href="/works" path={path} tabRef={tabRefs[0]} fontWeight="500" fontSize={17}>
                  My Work
                </LinkItem>
                <LinkItem href="/blog" path={path} tabRef={tabRefs[1]} fontWeight="500" fontSize={17}>
                  Blog
                </LinkItem>
                <LinkItem href="/playground" path={path} tabRef={tabRefs[2]} fontWeight="500" fontSize={17}>
                  Playground
                </LinkItem>
                {/* RESUME tab removed */}
                <LinkItem href="/contact" path={path} tabRef={tabRefs[4]} fontWeight="500" fontSize={17}>
                  Contact
                </LinkItem>
              </Stack>
            </Flex>

            {/* Mobile Menu - No distortion */}
            <Flex align="center" ml="auto" display={{ base: 'flex', md: 'none' }}>
              <Box display={{ base: 'inline-block', md: 'none' }}>
                <Menu isLazy id="navbar-menu">
                  <MenuButton
                    as={IconButton}
                    icon={<HamburgerIcon />}
                    variant="outline"
                    borderRadius="12px"
                    aria-label="Options"
                    bg="rgba(255, 255, 255, 0.85)"
                    border="1px solid rgba(0, 0, 0, 0.12)"
                    color="gray.800"
                    _hover={{
                      bg: "rgba(255, 255, 255, 0.95)",
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s linear'
                    }}
                  />
                  <Portal>
                    <MenuList
                      bg="rgba(255, 255, 255, 0.95)"
                      backdropFilter="blur(12px)"
                      border="1px solid rgba(0, 0, 0, 0.12)"
                      borderRadius="12px"
                      boxShadow="0 4px 30px rgba(0,0,0,0.12)"
                      color="gray.800"
                      zIndex={2100}
                    >
                      <NextLink href="/works" passHref legacyBehavior>
                        <MenuItem as={Link} color="gray.800" fontWeight="medium">My Work</MenuItem>
                      </NextLink>
                      <NextLink href="/blog" passHref legacyBehavior>
                        <MenuItem as={Link} color="gray.800" fontWeight="medium">Blog</MenuItem>
                      </NextLink>
                      <NextLink href="/playground" passHref legacyBehavior>
                        <MenuItem as={Link} color="gray.800" fontWeight="medium">Playground</MenuItem>
                      </NextLink>
                      {/* RESUME tab removed from mobile menu */}
                      <NextLink href="/contact" passHref legacyBehavior>
                        <MenuItem as={Link} color="gray.800" fontWeight="medium">Contact</MenuItem>
                      </NextLink>
                    </MenuList>
                  </Portal>
                </Menu>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar