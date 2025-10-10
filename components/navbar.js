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
  IconButton,
  useColorModeValue
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react'

// Add keyframes for a 'gasp' (pulse/shine) animation

const LinkItem = ({ href, path, target, children, tabRef, ...props }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray.600', 'whiteAlpha.900')
  const hoverBg = useColorModeValue(
    'rgba(137,239,140,0.15)',
    'rgba(137,239,140,0.25)'
  )
  return (
    <NextLink href={href} passHref legacyBehavior>
      <Link
        ref={tabRef}
        p={2}
        fontSize={18}
        color={active ? '#202023' : inactiveColor}
        borderRadius={'12px'}
        fontWeight="medium"
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
  const tabRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

  // --- Traveling highlight logic ---
  const tabPaths = ['/works', '/blog', '/Mukil_Résumé.pdf', '/contact']

  // Helper to update highlight position
  const updateHighlight = () => {
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
  }

  useLayoutEffect(() => {
    // Wait for DOM update for smoother animation
    const timeoutId = setTimeout(updateHighlight, 20)
    window.addEventListener('resize', updateHighlight)
    return () => {
      window.removeEventListener('resize', updateHighlight)
      clearTimeout(timeoutId)
    }
  }, [path])

  useEffect(() => {
    // Initial mount
    const timeoutId = setTimeout(updateHighlight, 20)
    return () => clearTimeout(timeoutId)
  }, [])

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
        bg={useColorModeValue('rgba(255,255,255,0.75)', 'rgba(32,32,35,0.75)')}
        backdropFilter="blur(12px)"
        boxShadow={useColorModeValue('0 4px 24px rgba(0,0,0,0.08)', '0 4px 24px rgba(0,0,0,0.18)')}
        border={useColorModeValue('0.5px solid rgba(255,255,255,0.5)', '0.5px solid rgba(255,255,255,0.35)')}
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
                    borderRadius="12px"
                    zIndex={1}
                    transition="all 0.3s ease-out"
                    boxShadow="none"
                  />
                )}
                <LinkItem href="/works" path={path} tabRef={tabRefs[0]} fontWeight="hairline" fontSize={18}>
                  My Work
                </LinkItem>
                <LinkItem href="/blog" path={path} tabRef={tabRefs[1]} fontWeight="hairline" fontSize={18}>
                  Blog
                </LinkItem>
                {/* RESUME tab removed */}
                <LinkItem href="/contact" path={path} tabRef={tabRefs[3]} fontWeight="hairline" fontSize={18}>
                  Contact
                </LinkItem>
              </Stack>
              <Box ml={2} display={{ base: 'none', md: 'flex' }} alignItems="center">
                <ThemeToggleButton />
              </Box>
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
                    bg={useColorModeValue(
                      'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.3) 100%)',
                      'linear-gradient(180deg, rgba(32,32,35,0.4) 0%, rgba(32,32,35,0.3) 100%)'
                    )}
                    border={useColorModeValue(
                      '1px solid rgba(255,255,255,0.3)',
                      '1px solid rgba(255,255,255,0.1)'
                    )}
                    _hover={{
                      bg: useColorModeValue(
                        'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.4) 100%)',
                        'linear-gradient(180deg, rgba(32,32,35,0.5) 0%, rgba(32,32,35,0.4) 100%)'
                      ),
                      transform: 'scale(1.05)',
                      boxShadow: useColorModeValue(
                        '0 4px 20px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.3)',
                        '0 4px 20px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.2)'
                      ),
                      transition: 'all 0.2s linear'
                    }}
                  />
                  <Portal>
                    <MenuList
                    bg={useColorModeValue(
                      'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.3) 100%)',
                      'linear-gradient(180deg, rgba(32,32,35,0.4) 0%, rgba(32,32,35,0.3) 100%)'
                    )}
                    backdropFilter="blur(8px)"
                    border={useColorModeValue(
                      '1px solid rgba(255,255,255,0.3)',
                      '1px solid rgba(255,255,255,0.1)'
                    )}
                    borderRadius="12px"
                    boxShadow={useColorModeValue(
                      '0 4px 30px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.2)',
                      '0 4px 30px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)'
                    )}
                    zIndex={2100}
                  >
                    <NextLink href="/works" passHref legacyBehavior>
                      <MenuItem as={Link}>My Work</MenuItem>
                    </NextLink>
                    <NextLink href="/blog" passHref legacyBehavior>
                      <MenuItem as={Link}>Blog</MenuItem>
                    </NextLink>
                    {/* RESUME tab removed from mobile menu */}
                    <NextLink href="/contact" passHref legacyBehavior>
                      <MenuItem as={Link}>Contact</MenuItem>
                    </NextLink>
                  </MenuList>
                  </Portal>
                </Menu>
              </Box>
              <Box ml={2} display={{ base: 'flex', md: 'none' }} alignItems="center">
                <ThemeToggleButton />
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar