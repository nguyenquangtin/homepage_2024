import { useState } from 'react'
import { Box, Text, Flex } from '@chakra-ui/react'
import { useSiteTheme } from '../lib/site-theme-context'

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
  ffix: { tech: '◆ TECH ARSENAL', interests: '◆ INTERESTS' },
  sc2:  { tech: '◆ KHALA PROTOCOLS', interests: '◆ PYLON NETWORK' },
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
  const { accent, text, panelBg, muted } = palette

  return (
    <Box
      bg={panelBg}
      border={`2px solid ${accent}`}
      borderRadius="sm"
      boxShadow={`0 0 0 3px rgba(8,14,40,0.9), 0 0 0 5px ${accent}33`}
      overflow="hidden"
      fontFamily="monospace"
      h="100%"
    >
      <Box px={3} py={2} bg={palette.headerBg} borderBottom={`1px solid ${palette.headerBorder}`}>
        <Text fontSize="10px" color={accent} letterSpacing="0.15em">{title}</Text>
      </Box>
      <Box p={2}>
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
    </Box>
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
  const { accent, text, panelBg } = palette

  return (
    <Box
      bg={panelBg}
      border={`2px solid ${accent}`}
      borderRadius="sm"
      boxShadow={`0 0 0 3px rgba(8,14,40,0.9), 0 0 0 5px ${accent}33`}
      overflow="hidden"
      fontFamily="monospace"
    >
      <Box px={3} py={2} bg={palette.headerBg} borderBottom={`1px solid ${palette.headerBorder}`}>
        <Text fontSize="10px" color={accent} letterSpacing="0.15em">{TITLES[theme].interests}</Text>
      </Box>
      <Flex px={3} py={3} gap={2} wrap="wrap">
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
    </Box>
  )
}
