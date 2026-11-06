import Logo from './logo'
import NextLink from 'next/link'
import {
  Box,
  Link,
  HStack,
  Menu,
  MenuItem,
  MenuList,
  Portal,
  MenuButton,
  IconButton
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import React from 'react'

const NAV_ITEMS = [
  { label: 'Playground', href: '/works' },
  { label: 'Contact', href: '/contact' }
]

const Navbar = ({ path }) => {
  const dark = path?.startsWith('/daksha-in-orbit')
  const activeColor = dark ? '#edf4ff' : '#1A1A1A'
  const inactiveColor = dark ? '#b4c3d5' : '#666666'
  return (
    <>
      {/* Mukil Signature Logo on the Left - with real-time color inversion */}
      <Box
        data-site-navigation
        position="fixed"
        top={0}
        left={0}
        zIndex={2000}
        pt={{ base: '12px', md: '14px' }}
        pb="10px"
        px={{ base: '20px', md: '24px' }}
        pointerEvents="auto"
        mixBlendMode="difference"
        overflow="visible"
      >
        <Logo />
      </Box>

      {/* Desktop & Mobile Navigation on the Right - in crisp black */}
      <Box
        data-site-navigation
        position="fixed"
        top={0}
        right={0}
        zIndex={2000}
        pt={{ base: '12px', md: '14px' }}
        pb="10px"
        px={{ base: '20px', md: '24px' }}
        pointerEvents="auto"
      >
        {/* Desktop Navigation */}
        <HStack
          as="nav"
          spacing={{ md: 7, lg: 9 }}
          display={{ base: 'none', md: 'flex' }}
          alignItems="center"
        >
          {NAV_ITEMS.map(item => {
            const isActive = path === item.href || (item.href !== '/' && path?.startsWith(item.href))
            return (
              <NextLink key={item.href} href={item.href} passHref legacyBehavior>
                <Link
                  fontSize="13px"
                  fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                  fontWeight={isActive ? '600' : '500'}
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                  color={isActive ? activeColor : inactiveColor}
                  position="relative"
                  py={1}
                  _hover={{
                    color: activeColor,
                    textDecoration: 'none'
                  }}
                  _after={isActive ? {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1.5px',
                    bg: activeColor,
                    borderRadius: '1px'
                  } : undefined}
                  transition="color 0.2s ease"
                >
                  {item.label}
                </Link>
              </NextLink>
            )
          })}
        </HStack>

        {/* Mobile Hamburger Menu on the Right */}
        <Box display={{ base: 'flex', md: 'none' }} alignItems="center">
          <Menu isLazy id="navbar-menu">
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon boxSize={5} />}
              variant="ghost"
              aria-label="Toggle navigation menu"
              color={activeColor}
              _hover={{ bg: 'rgba(26, 26, 26, 0.06)' }}
              _active={{ bg: 'rgba(26, 26, 26, 0.1)' }}
            />
            <Portal>
              <MenuList
                bg={dark ? '#07101d' : path === '/' ? '#F4F4F0' : '#ffffff'}
                backdropFilter="blur(16px)"
                border="1px solid rgba(26, 26, 26, 0.12)"
                borderRadius="8px"
                boxShadow="0 10px 30px rgba(0, 0, 0, 0.08)"
                py={2}
                zIndex={2100}
              >
                {NAV_ITEMS.map(item => {
                  const isActive = path === item.href || (item.href !== '/' && path?.startsWith(item.href))
                  return (
                    <NextLink key={item.href} href={item.href} passHref legacyBehavior>
                      <MenuItem
                        as={Link}
                        fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                        fontSize="13px"
                        fontWeight={isActive ? '600' : '500'}
                        letterSpacing="0.08em"
                        textTransform="uppercase"
                        color={isActive ? activeColor : inactiveColor}
                        bg={isActive ? 'rgba(26, 26, 26, 0.05)' : 'transparent'}
                        _hover={{
                          bg: 'rgba(26, 26, 26, 0.08)',
                          color: activeColor,
                          textDecoration: 'none'
                        }}
                      >
                        {item.label}
                      </MenuItem>
                    </NextLink>
                  )
                })}
              </MenuList>
            </Portal>
          </Menu>
        </Box>
      </Box>
    </>
  )
}

export default Navbar
