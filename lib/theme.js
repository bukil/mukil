import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      bg: mode('#2596be', '#270041')(props),

      //backgroundImage:"url('/images/links/back.jpg')",
    //  height:'100vh',
    //  marginTop:'-70px',
      fontSize:'50px',
      backgroundSize: 'fixed',

      fontSize: 12,
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
        heading: "url('/WhyteInktrap-Black.ttf')",
        body: "url('/WhyteInktrap-Black.ttf')"
      },
      'btn':{
        textDecoration: 'none',
        fontSize: 20,
        textDecorationColor: '#525252',
        textDecorationThickness: 6,
        marginTop: 1,
        marginBottom: 1,
        heading: "'https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap'",
        body: "'https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap'"
      }
    }
  },
  Text: {
    variants:{
      'home-txt':{
        fontSize: 1,
        heading: "'https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap'",
        body: "'https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap'"
    }
  }
  },
  Link: {
    baseStyle: props => ({
      color: mode('#c90076', '#ffffaaff')(props),
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
  Text: {
    baseStyle: props => ({
      color: mode('#080b10','#ff63c3')(props),
      })
  },
  Heading: {
    baseStyle: props => ({
      color: mode('#080b10','#dbe9f4')(props),
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
