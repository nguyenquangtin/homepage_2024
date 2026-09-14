import { Box, Text, Flex } from '@chakra-ui/react'
import { useSiteTheme } from '../lib/site-theme-context'
import Sc2Panel from './sc2/sc2-panel'

const THEME_DATA = {
  ffix: {
    header: 'Equipment',
    footer: '◇ All abilities mastered',
    items: [
      { slot: 'WPN', name: 'React / Next.js', bonus: '+24 MAG', color: '#bb77ff' },
      { slot: 'HLM', name: 'TypeScript',      bonus: '+16 SPI', color: '#44ccff' },
      { slot: 'BDY', name: 'System Design',   bonus: '+20 SPI', color: '#44ccff' },
      { slot: 'ARM', name: 'Node.js',         bonus: '+12 SPD', color: '#ffcc00' },
      { slot: 'ACC', name: 'TikTok API',      bonus: '+15 MAG', color: '#bb77ff' },
    ],
  },
  sc2: {
    header: 'Loadout',
    footer: '◇ All upgrades researched',
    items: [
      { slot: 'AMP', name: 'React / Next.js', bonus: '+24 PSI', color: '#00ddff' },
      { slot: 'MOD', name: 'TypeScript',      bonus: '+16 INT', color: '#00aaff' },
      { slot: 'CORE', name: 'System Design',  bonus: '+20 INT', color: '#00aaff' },
      { slot: 'SHD', name: 'Node.js',         bonus: '+12 SPD', color: '#ffcc00' },
      { slot: 'LINK', name: 'TikTok API',     bonus: '+15 PSI', color: '#00ddff' },
    ],
  },
}

const FfixEquipment = () => {
  const { theme, palette } = useSiteTheme()
  const d = THEME_DATA[theme]
  const { accent, text, muted } = palette

  // LotV pass: shared gold frame outside, palette-driven slots inside
  return (
    <Sc2Panel tone="cyan" title={d.header} unpadded dense h="100%">
      <Box p={3} fontFamily="monospace">
        {d.items.map(({ slot, name, bonus, color }) => (
          <Flex key={slot} align="center" gap={2} mb={3}>
            <Text fontSize="9px" color={accent} w="32px" letterSpacing="0.1em" flexShrink={0}>
              {slot}
            </Text>
            <Box
              flex={1}
              bg="rgba(255,255,255,0.04)"
              border={`1px solid ${accent}22`}
              borderRadius="sm"
              px={2}
              py={1}
            >
              <Text fontSize="xs" color={text} fontWeight={600} lineHeight={1.2}>{name}</Text>
            </Box>
            <Text fontSize="9px" color={color} w="44px" textAlign="right" flexShrink={0}>
              {bonus}
            </Text>
          </Flex>
        ))}

        <Box mt={1} pt={2} borderTop={`1px solid ${accent}22`}>
          <Text fontSize="9px" color={muted} letterSpacing="0.08em">{d.footer}</Text>
        </Box>
      </Box>
    </Sc2Panel>
  )
}

export default FfixEquipment
