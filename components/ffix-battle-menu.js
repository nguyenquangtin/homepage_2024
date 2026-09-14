import { useState } from 'react'
import { Box, Text, Flex } from '@chakra-ui/react'
import { useSiteTheme } from '../lib/site-theme-context'
import Sc2Panel from './sc2/sc2-panel'

const TECH_ITEMS = [
  { label: 'Node.js',    desc: '10+ yrs' },
  { label: 'React',      desc: '8+ yrs'  },
  { label: 'Vue.js',     desc: '6+ yrs'  },
  { label: 'TypeScript', desc: '5+ yrs'  },
  { label: 'PHP',        desc: '15+ yrs' },
  { label: 'TikTok API', desc: 'expert'  },
  { label: 'Docker',     desc: 'daily'   },
  { label: 'WordPress',  desc: '12+ yrs' },
]

const INTEREST_ITEMS = [
  { label: 'Music',       desc: '♪' },
  { label: 'Books',       desc: '▣' },
  { label: 'Coffee',      desc: '◉' },
  { label: 'Running',     desc: '▶' },
  { label: 'Open Source', desc: '◈' },
  { label: 'Community',   desc: '◎' },
]

const TITLES = {
  ffix: { tech: 'Tech Arsenal', interests: 'Interests' },
  sc2:  { tech: 'Khala Protocols', interests: 'Pylon Network' },
}

const MenuItem = ({ label, desc, selected, onClick, accent, text, muted }) => (
  <Flex
    align="center"
    gap={2}
    py={1.5}
    px={2}
    cursor="pointer"
    bg={selected ? `${accent}1f` : 'transparent'}
    borderRadius="sm"
    onClick={onClick}
    transition="background 0.12s"
    _hover={{ bg: `${accent}14` }}
  >
    <Text fontSize="10px" color={selected ? accent : accent} w="10px" lineHeight={1} flexShrink={0}>
      {selected ? '◆' : '◇'}
    </Text>
    <Text fontSize="xs" fontFamily="monospace" color={selected ? text : muted} fontWeight={selected ? 600 : 400} flex={1}>
      {label}
    </Text>
    {desc && (
      <Text fontSize="10px" fontFamily="monospace" color={selected ? accent : muted}>{desc}</Text>
    )}
  </Flex>
)

// Self-contained panel — owns its own selection state
const MenuPanel = ({ title, items }) => {
  const [selected, setSelected] = useState(0)
  const { palette } = useSiteTheme()
  const { accent, text, muted } = palette

  // LotV pass: shared gold frame outside, palette-driven list inside
  return (
    <Sc2Panel tone="cyan" title={title} unpadded dense h="100%">
      <Box p={2} fontFamily="monospace">
        {items.map((item, i) => (
          <MenuItem
            key={item.label}
            {...item}
            selected={selected === i}
            onClick={() => setSelected(i)}
            accent={accent}
            text={text}
            muted={muted}
          />
        ))}
      </Box>
    </Sc2Panel>
  )
}

export const FfixTechMenu = () => {
  const { theme } = useSiteTheme()
  return <MenuPanel title={TITLES[theme].tech} items={TECH_ITEMS} />
}

export const FfixInterestMenu = () => {
  const { theme } = useSiteTheme()
  return <MenuPanel title={TITLES[theme].interests} items={INTEREST_ITEMS} />
}

// Horizontal pill badge variant
export const FfixInterestTags = () => {
  const { theme, palette } = useSiteTheme()
  const { accent, text } = palette

  return (
    <Sc2Panel tone="cyan" title={TITLES[theme].interests} unpadded dense>
      <Flex px={3} py={3} gap={2} wrap="wrap" fontFamily="monospace">
        {INTEREST_ITEMS.map(({ label, desc }) => (
          <Flex
            key={label}
            align="center"
            gap={1.5}
            px={3}
            py={1.5}
            bg={palette.itemBg}
            border={`1px solid ${palette.itemBorder}`}
            borderRadius="full"
            cursor="default"
            _hover={{ bg: `${accent}24`, borderColor: `${accent}66` }}
            transition="all 0.15s"
          >
            <Text fontSize="10px" color={accent} lineHeight={1}>{desc}</Text>
            <Text fontSize="xs" color={text} fontFamily="monospace">{label}</Text>
          </Flex>
        ))}
      </Flex>
    </Sc2Panel>
  )
}
