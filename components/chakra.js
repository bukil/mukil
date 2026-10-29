import {
  ChakraProvider
} from '@chakra-ui/react'
import theme from '../lib/theme'
import { Global } from '@emotion/react'

const lightColorModeManager = {
  type: 'cookie',
  ssr: true,
  get: () => 'light',
  set: () => {}
}

export default function Chakra({ children }) {
  return (
    <ChakraProvider theme={theme} colorModeManager={lightColorModeManager}>
      <Global
        styles={`
          html {
            overflow-x: hidden;
            max-width: 100vw;
          }
          body {
            overflow-x: visible;
            overflow-y: visible;
          }
          @keyframes scrollLand {
            0% { background-position-x: 0; }
            100% { background-position-x: -4000px; }
          }
        `}
      />
      {children}
    </ChakraProvider>
  )
}

export async function getServerSideProps({ req }) {
  return {
    props: {
      cookies: req.headers.cookie ?? ''
    }
  }
}
