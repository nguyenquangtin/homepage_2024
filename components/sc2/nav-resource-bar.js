import { Flex, Text } from '@chakra-ui/react'
import { KHALA_GOLD, PALETTES, PROTOSS_CYAN } from '../../lib/site-theme-context'

// Tiny inline SC2 resource glyphs (LotV pass) — minerals/gas/supply icons
// lifted from the in-game top bar. Decorative only.
const MineralIcon = props => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <polygon points="5,0 10,5 5,10 0,5" fill={KHALA_GOLD} />
  </svg>
)

const GasIcon = props => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <polygon
      points="5,0.5 9,2.75 9,7.25 5,9.5 1,7.25 1,2.75"
      fill={PROTOSS_CYAN}
    />
  </svg>
)

const SupplyIcon = props => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <polygon
      points="5,0 10,4 8,4 8,10 2,10 2,4 0,4"
      fill="none"
      stroke={KHALA_GOLD}
      strokeWidth="1"
    />
  </svg>
)

const goldText = { color: KHALA_GOLD, fontWeight: 'bold' }
const mutedText = { color: PALETTES.sc2.muted }

// SC2 in-game top bar, transplanted to the command console: static commander
// stats, desktop-only flavor text (LotV pass). Not real telemetry.
const NavResourceBar = props => (
  <Flex
    aria-label="commander stats"
    fontFamily="mono"
    fontSize="11px"
    letterSpacing="0.08em"
    align="center"
    gap={4}
    display={{ base: 'none', lg: 'flex' }}
    {...props}
  >
    <Flex align="center" gap="6px">
      <MineralIcon />
      <Text as="span" {...goldText}>
        19
      </Text>
      <Text as="span" {...mutedText}>
        YRS
      </Text>
    </Flex>
    <Flex align="center" gap="6px">
      <GasIcon />
      <Text as="span" {...mutedText}>
        LV
      </Text>
      <Text as="span" {...goldText}>
        39
      </Text>
    </Flex>
    <Flex align="center" gap="6px">
      <SupplyIcon />
      <Text as="span" {...goldText}>
        DANANG
      </Text>
    </Flex>
  </Flex>
)

export default NavResourceBar
