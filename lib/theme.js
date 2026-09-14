import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import {
  PROTOSS_CYAN,
  PROTOSS_CYAN_RGB,
  KHALA_GOLD_RGB
} from './site-theme-context'
import { sectionTabStyle } from '../components/sc2/sc2-section-header'

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
      // SC2 console style: the same angular tab as <Sc2SectionHeader>, so
      // pages using variant="section-title" need no edits (LotV pass)
      'section-title': {
        ...sectionTabStyle,
        marginTop: 6,
        marginBottom: 4
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
      border: `1px solid rgba(${KHALA_GOLD_RGB}, 0.5)`,
      borderRadius: '2px',
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: 'xs',
      boxShadow: `0 0 12px rgba(${PROTOSS_CYAN_RGB}, 0.25)`
    }
  },
  Input: {
    variants: {
      outline: {
        field: {
          bg: 'rgba(10, 8, 24, 0.6)',
          borderColor: `rgba(${KHALA_GOLD_RGB}, 0.4)`,
          borderRadius: '2px',
          _hover: { borderColor: `rgba(${KHALA_GOLD_RGB}, 0.7)` },
          _focusVisible: {
            borderColor: PROTOSS_CYAN,
            boxShadow: `0 0 0 1px ${PROTOSS_CYAN}, 0 0 12px rgba(${PROTOSS_CYAN_RGB}, 0.3)`
          }
        }
      }
    }
  },
  Textarea: {
    variants: {
      outline: {
        bg: 'rgba(10, 8, 24, 0.6)',
        borderColor: `rgba(${KHALA_GOLD_RGB}, 0.4)`,
        borderRadius: '2px',
        _hover: { borderColor: `rgba(${KHALA_GOLD_RGB}, 0.7)` },
        _focusVisible: {
          borderColor: PROTOSS_CYAN,
          boxShadow: `0 0 0 1px ${PROTOSS_CYAN}, 0 0 12px rgba(${PROTOSS_CYAN_RGB}, 0.3)`
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
