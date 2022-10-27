import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      bg: mode('#dbe9f4', '#080b10')(props),
      fontSize: 10
    }
  })
}

const components = {
  Heading: {
    variants: {
      'section-title': {
        textDecoration: 'underline',
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: '#525252',
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4
      }
    }
    
  },
  Link: {
    baseStyle: props => ({
      color: mode('#3d7aed', '#ff63c3')(props),
      textUnderlineOffset: 3
    })
  },

  Divider: {
    baseStyle: props => ({
      color: mode('#3d7aed', '#ff63c3')(props),
  })
},
  Spacer: {
    baseStyle: props => ({
      color: mode('#3d7aed', '#ff63c3')(props)
      })
  }
}

const fonts = {
  heading: "'Expansiva Regular'",
  body: "'Expansiva Regular'"
}

const colors = {
  grassTeal: '#88ccca'
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme
