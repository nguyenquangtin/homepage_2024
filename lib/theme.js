import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      bg: mode('#f5f5f7', '#0a0a0b')(props),
      // Smooth color mode transitions
      transition: 'background-color 0.2s ease'
    }
  })
}

const components = {
  Heading: {
    variants: {
      // 2025 editorial style: uppercase + left blue border instead of underline
      'section-title': {
        fontSize: 13,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        paddingLeft: 3,
        borderLeftWidth: '3px',
        borderLeftStyle: 'solid',
        borderLeftColor: '#3B82F6',
        marginTop: 6,
        marginBottom: 4,
        color: 'inherit',
        opacity: 0.9
      }
    }
  },
  Link: {
    baseStyle: props => ({
      color: mode('#2563EB', '#60A5FA')(props),
      textUnderlineOffset: 3
    })
  }
}

const fonts = {
  heading: "'Cinzel', Georgia, serif",          // FFIX-style: classical elegant fantasy
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'Share Tech Mono', 'Courier New', monospace" // retro-tech mono for FFIX panels
}

const colors = {
  grassTeal: '#3B82F6'
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme
