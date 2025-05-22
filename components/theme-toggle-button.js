import { Box, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import styled from '@emotion/styled'

const ToggleButton = styled(Box)`
  position: relative;
  width: 60px;
  height: 30px;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 4px;
  transition: all 0.3s ease-in-out;
  background: ${props => props.isDark ? 'rgba(32, 32, 35, 0.7)' : 'rgba(255, 255, 255, 0.7)'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  margin: auto 0;

  &:hover {
    transform: scale(1.05);
    background: ${props => props.isDark ? 'rgba(32, 32, 35, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 15px;
    background: ${props => props.isDark ? 'rgba(32, 32, 35, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    z-index: -1;
  }
`

const Slider = styled(Box)`
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${props => props.isDark ? 'rgba(136, 204, 202, 0.9)' : 'rgba(255, 215, 0, 0.9)'};
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: all 0.3s ease-in-out;
  transform: translateX(${props => props.isDark ? '30px' : '0'});
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: 1px solid ${props => props.isDark ? 'rgba(136, 204, 202, 0.3)' : 'rgba(255, 215, 0, 0.3)'};

  &:hover {
    background: ${props => props.isDark ? 'rgba(136, 204, 202, 1)' : 'rgba(255, 215, 0, 1)'};
  }
`

const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <ToggleButton
      isDark={isDark}
      onClick={toggleColorMode}
      aria-label="Toggle theme"
    >
      <Box
        position="absolute"
        left="4px"
        opacity={isDark ? 0 : 1}
        transition="opacity 0.3s ease-in-out"
      >
        <SunIcon boxSize={4} color="orange.400" />
      </Box>
      <Box
        position="absolute"
        right="4px"
        opacity={isDark ? 1 : 0}
        transition="opacity 0.3s ease-in-out"
      >
        <MoonIcon boxSize={4} color="blue.200" />
      </Box>
      <Slider isDark={isDark}>
        {isDark ? (
          <MoonIcon boxSize={3} color="white" />
        ) : (
          <SunIcon boxSize={3} color="white" />
        )}
      </Slider>
    </ToggleButton>
  )
}

export default ThemeToggleButton
