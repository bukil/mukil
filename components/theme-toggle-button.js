import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const ThemeToggleButton = () => {
  const { toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label="Toggle theme"
      colorScheme={useColorModeValue('pink', 'green')}
      icon={useColorModeValue(<MoonIcon boxSize={5} />, <SunIcon boxSize={5} />)}
      borderRadius='15px'
      onClick={toggleColorMode}
      width="40px"
      height="40px"
      minWidth="40px"
      minHeight="40px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    />
  )
}

export default ThemeToggleButton
