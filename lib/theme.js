import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      // Deep-space navy — SC2 command console base (#7)
      bg: mode('#e8eef5', '#05080f')(props),
      // Smooth color mode transitions
      transition: 'background-color 0.2s ease'
    }
  })
}

const components = {
  Heading: {
    variants: {
      // SC2 console style: uppercase mono tab with psionic cyan accent (#7)
      'section-title': {
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 13,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        paddingLeft: 3,
        borderLeftWidth: '3px',
        borderLeftStyle: 'solid',
        borderLeftColor: '#00ddff',
        textShadow: '0 0 10px rgba(0,221,255,0.35)',
        marginTop: 6,
        marginBottom: 4,
        color: 'inherit',
        opacity: 0.9
      }
    }
  },
  Link: {
    baseStyle: props => ({
      color: mode('#0891b2', '#7dd8ff')(props),
      textUnderlineOffset: 3
    })
  },
  // Protoss contextual elements (#9): gold-framed, cyan psionic focus
  Tooltip: {
    baseStyle: {
      bg: 'rgba(10, 8, 24, 0.97)',
      color: '#c0e8ff',
      border: '1px solid rgba(240,192,64,0.5)',
      borderRadius: '2px',
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: 'xs',
      boxShadow: '0 0 12px rgba(0,221,255,0.25)'
    }
  },
  Input: {
    variants: {
      outline: {
        field: {
          bg: 'rgba(10, 8, 24, 0.6)',
          borderColor: 'rgba(240,192,64,0.4)',
          borderRadius: '2px',
          _hover: { borderColor: 'rgba(240,192,64,0.7)' },
          _focusVisible: {
            borderColor: '#00ddff',
            boxShadow: '0 0 0 1px #00ddff, 0 0 12px rgba(0,221,255,0.3)'
          }
        }
      }
    }
  },
  Textarea: {
    variants: {
      outline: {
        bg: 'rgba(10, 8, 24, 0.6)',
        borderColor: 'rgba(240,192,64,0.4)',
        borderRadius: '2px',
        _hover: { borderColor: 'rgba(240,192,64,0.7)' },
        _focusVisible: {
          borderColor: '#00ddff',
          boxShadow: '0 0 0 1px #00ddff, 0 0 12px rgba(0,221,255,0.3)'
        }
      }
    }
  }
}

const fonts = {
  heading: "'Orbitron', 'Share Tech Mono', sans-serif", // Protoss geometric face (#9)
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'Share Tech Mono', 'Courier New', monospace" // retro-tech mono for FFIX panels
}

const colors = {
  grassTeal: '#00bbdd' // protoss cyan — nav/accent token (#7)
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme
