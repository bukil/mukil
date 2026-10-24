import { extendTheme } from '@chakra-ui/react'

const styles = {
  global: {
    body: {
      bg: '#ffffff',
      color: '#1a202c',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      fontSize: 12,
      scrollBehavior: 'smooth',
      scrollTimelineAxis: 'block',
      scrollTimelineName: 'smooth',
      scrollTimeline: 'smooth',
      scrollSnapType: 'y proximity',
      scrollSnapAlign: 'start',
      scrollSnapStop: 'always',
      scrollPadding: '1rem',
      scrollMargin: '1rem',
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(155, 155, 155, 0.5) transparent',
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(155, 155, 155, 0.5)',
        borderRadius: '20px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: 'rgba(155, 155, 155, 0.7)',
      },
      '@media (max-width: 768px)': {
        backgroundAttachment: 'scroll',
      }
    },
    '::selection': {
      background: '#89EF8C', // Accent green
      color: 'black'
    },
    '::-moz-selection': {
      background: '#89EF8C', // Accent green
      color: 'black'
    },
    '@font-face': {
      fontFamily: 'Michroma',
      src: 'url("https://fonts.googleapis.com/css2?family=Michroma&display=swap")',
      fontWeight: '400',
      fontStyle: 'normal'
    }
  }
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
        color: '#1a202c',
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
    baseStyle: {
      color: '#2b6cb0',
      textUnderlineOffset: 3
    }
  },

  Divider: {
    baseStyle: {
      color: '#e2e8f0',
    }
  },
  Spacer: {
    baseStyle: {
      color: '#e2e8f0',
    }
  },
}

const fonts = {
  heading: "'Roboto'",
  body: "'Roboto'"
}

const colors = {
  grassTeal: '#88ccca'
}

const sizes = {
  container: {
    'full': '100%',
    'xl': '1200px',
    '2xl': '1400px',
    '3xl': '1600px',
    '4xl': '1800px',
    '5xl': '2000px'
  }
}

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const theme = extendTheme({ config, styles, components, fonts, colors, sizes })
export default theme
