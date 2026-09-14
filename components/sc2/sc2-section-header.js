import { Box, Heading } from '@chakra-ui/react'
import {
  CHAMFER,
  chamferClip,
  PALETTES,
  PROTOSS_CYAN_RGB,
  KHALA_GOLD,
  KHALA_GOLD_RGB
} from '../../lib/site-theme-context'

// Single source for the angular tab-style section heading (SC2 research
// screen header tab). Spread onto <Heading> here and reused verbatim by the
// Chakra `section-title` variant in lib/theme.js so both render identically
// (LotV pass). Keep this file free of theme.js imports — that would cycle.
export const sectionTabStyle = {
  display: 'inline-block',
  fontFamily: 'mono',
  fontSize: '13px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.18em',
  color: PALETTES.sc2.text,
  textShadow: `0 0 10px rgba(${PROTOSS_CYAN_RGB}, 0.5)`,
  background: `rgba(${KHALA_GOLD_RGB}, 0.08)`,
  border: `1px solid rgba(${KHALA_GOLD_RGB}, 0.45)`,
  borderBottom: `2px solid ${KHALA_GOLD}`,
  paddingInline: 4,
  paddingBlock: 1.5,
  lineHeight: 1.3,
  clipPath: chamferClip(CHAMFER.sm, 'tl'),
  _before: { content: '"\\25B8  "' }
}

const Sc2SectionHeader = ({ children, as = 'h2', ...rest }) => (
  <Box mt={6} mb={4} {...rest}>
    <Heading as={as} {...sectionTabStyle}>
      {children}
    </Heading>
  </Box>
)

export default Sc2SectionHeader
