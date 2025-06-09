import { useColorMode } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

const ToggleButton = styled(motion.div)`
  position: relative;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  background: ${props => props.isDark ? 'rgba(32, 32, 35, 0.7)' : 'rgba(255, 255, 255, 0.7)'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid ${props => props.isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  margin: auto 0;

  &:hover {
    transform: scale(1.05);
  }
`

const DiagonalSplit = styled(motion.div)`
  position: absolute;
  width: 200%;
  height: 200%;
  left: -50%;
  top: -50%;
  background: repeating-linear-gradient(
    45deg,
    ${props => props.isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'} 0%,
    ${props => props.isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'} 25%,
    ${props => props.isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)'} 25%,
    ${props => props.isDark ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)'} 50%
  );
  background-size: 100% 100%;
`

const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <ToggleButton
      isDark={isDark}
      onClick={toggleColorMode}
      aria-label="Toggle theme"
      whileTap={{ scale: 0.95 }}
      animate={{ rotate: isDark ? 180 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <DiagonalSplit 
        isDark={isDark}
        whileHover={{
          rotate: 360,
          transition: { 
            duration: 1.5,
            ease: "linear",
            repeat: Infinity
          }
        }}
      />
    </ToggleButton>
  )
}

export default ThemeToggleButton
