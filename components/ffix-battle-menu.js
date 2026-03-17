import { useState } from 'react'
import { Box, Text, Flex } from '@chakra-ui/react'

const PANEL_BG = 'rgba(8, 14, 40, 0.97)'
const GOLD = '#c8a800'
const CREAM = '#f0e6a0'
const MUTED = '#9890a0'

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

const MenuItem = ({ label, desc, selected, onClick }) => (
  <Flex
    align="center"
    gap={2}
    py={1.5}
    px={2}
    cursor="pointer"
    bg={selected ? 'rgba(200,168,0,0.12)' : 'transparent'}
    borderRadius="sm"
    onClick={onClick}
    transition="background 0.12s"
    _hover={{ bg: 'rgba(200,168,0,0.08)' }}
  >
    <Text fontSize="10px" color={selected ? '#ffdd00' : GOLD} w="10px" lineHeight={1} flexShrink={0}>
      {selected ? '◆' : '◇'}
    </Text>
    <Text
      fontSize="xs"
      fontFamily="monospace"
      color={selected ? CREAM : MUTED}
      fontWeight={selected ? 600 : 400}
      flex={1}
    >
      {label}
    </Text>
    {desc && (
      <Text fontSize="10px" fontFamily="monospace" color={selected ? '#ffcc00' : MUTED}>
        {desc}
      </Text>
    )}
  </Flex>
)

// Self-contained panel — owns its own selection state
const MenuPanel = ({ title, items }) => {
  const [selected, setSelected] = useState(0)

  return (
    <Box
      bg={PANEL_BG}
      border={`2px solid ${GOLD}`}
      borderRadius="sm"
      boxShadow={`0 0 0 3px rgba(8,14,40,0.9), 0 0 0 5px ${GOLD}33`}
      overflow="hidden"
      fontFamily="monospace"
      h="100%"
    >
      <Box px={3} py={2} bg="rgba(200,168,0,0.06)" borderBottom={`1px solid ${GOLD}44`}>
        <Text fontSize="10px" color={GOLD} letterSpacing="0.15em">
          {title}
        </Text>
      </Box>
      <Box p={2}>
        {items.map((item, i) => (
          <MenuItem
            key={item.label}
            {...item}
            selected={selected === i}
            onClick={() => setSelected(i)}
          />
        ))}
      </Box>
    </Box>
  )
}

export const FfixTechMenu     = () => <MenuPanel title="◆ TECH ARSENAL" items={TECH_ITEMS} />
export const FfixInterestMenu = () => <MenuPanel title="◆ INTERESTS"    items={INTEREST_ITEMS} />
