import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      bg: mode('#CDCDCD', '#000000')(props),
      fontSize: 12,
    },
    '::selection': {
      background: '#89EF8C', // Dark green
      color: 'black'
    },
    '::-moz-selection': {
      background: '#89EF8C', // Dark green
      color: 'black'
    },
    '@font-face': {
      fontFamily: 'Michroma',
      src: 'url("https://fonts.googleapis.com/css2?family=Michroma&display=swap")',
      fontWeight: '400',
      fontStyle: 'normal'
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
      },
      'custom':{
        textDecoration: 'none',
        fontSize: 40,
        textDecorationColor: '#525252',
        textDecorationThickness: 6,
        marginTop: 1,
        marginBottom: 1,
      },
      'btn':{
        textDecoration: 'none',
        fontSize: 20,
        textDecorationColor: '#525252',
        textDecorationThickness: 6,
        marginTop: 1,
        marginBottom: 1,
      },
      'michroma': {
        fontFamily: '"Michroma", sans-serif',
        fontWeight: '400',
        fontStyle: 'normal',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'white',
        transition: 'all 0.3s ease',
        marginBottom: '1',
        _groupHover: { opacity: 0 }
      }
    }
  },
  Text: {
    variants:{
      'home-txt':{
        fontSize: 1,
    }
  }
  },
  Link: {
    baseStyle: props => ({
      color: mode('#3d7aed', '#ffffaaff')(props),
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
  },
}

const fonts = {
  heading: "'Roboto'",
  body: "'Roboto'"
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
