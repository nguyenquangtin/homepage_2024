import { Box, Text, Flex, SimpleGrid } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import {
  PROTOSS_CYAN,
  PROTOSS_CYAN_RGB,
  KHALA_GOLD,
  KHALA_GOLD_RGB,
  PROTOSS_PANEL_BG,
  PALETTES
} from '../lib/site-theme-context'

// Featured projects as an SC2 achievements panel (#19) — icon medallion,
// tier, gold point count, cyan progress bar (ref: LotV achievements grid).
const MUTED = PALETTES.sc2.muted

const ACHIEVEMENTS = [
  {
    name: 'Ecomdy Media',
    tier: 'LEGENDARY',
    glow: '#aa66ff',
    points: 3200,
    progress: 90 // percent of campaign complete
  },
  {
    name: 'Coder Horizon',
    tier: 'EPIC',
    glow: '#44ccff',
    points: 2900,
    progress: 80
  },
  {
    name: 'GDG Mien Trung',
    tier: 'EPIC',
    glow: '#00cc55',
    points: 2900,
    progress: 90
  },
  {
    name: 'NFQ Asia · Shopware',
    tier: 'RARE',
    glow: '#ffcc00',
    points: 2900,
    progress: 70
  }
]

// Square icon medallion with the project's glow color — LotV emblem style
const Medallion = ({ glow }) => (
  <Box
    w="44px"
    h="44px"
    mx="auto"
    borderRadius="6px"
    border={`1.5px solid ${glow}aa`}
    bg={`linear-gradient(160deg, ${glow}22, rgba(6, 10, 24, 0.95) 70%)`}
    boxShadow={`0 0 12px ${glow}44, inset 0 0 10px ${glow}22`}
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <svg width="22" height="26" viewBox="0 0 10 14" fill="none">
      <polygon
        points="5,0 10,4 8,13 2,13 0,4"
        fill="rgba(6, 10, 24, 0.9)"
        stroke={glow}
        strokeWidth="1"
      />
      <polygon points="5,2 8,4.5 7,11 3,11 2,4.5" fill={glow} opacity="0.55" />
    </svg>
  </Box>
)

// Single achievement tile: medallion, name, tier, points, progress bar
const AchievementTile = ({ a }) => (
  <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.2 }}>
    <Box
      bg="rgba(6, 12, 28, 0.85)"
      border={`1px solid rgba(${PROTOSS_CYAN_RGB}, 0.25)`}
      borderRadius="4px"
      p={3}
      textAlign="center"
      cursor="pointer"
      _hover={{
        borderColor: `${a.glow}88`,
        boxShadow: `0 0 16px ${a.glow}33`
      }}
      transition="all 0.2s"
    >
      <Medallion glow={a.glow} />
      <Text
        mt={2}
        fontSize="11px"
        fontWeight="bold"
        color="#c0e8ff"
        lineHeight={1.3}
        noOfLines={1}
      >
        {a.name}
      </Text>
      <Text fontSize="8px" color={`${a.glow}cc`} letterSpacing="0.12em" mb={1}>
        {a.tier}
      </Text>
      {/* Gold point count (medal style) */}
      <Text fontSize="12px" fontWeight="bold" color={KHALA_GOLD}>
        ⬢ {a.points}
      </Text>
      {/* Cyan progress bar on dark track */}
      <Box
        mt={1.5}
        h="5px"
        bg="rgba(2, 6, 16, 0.9)"
        borderRadius="2px"
        border={`1px solid rgba(${PROTOSS_CYAN_RGB}, 0.2)`}
      >
        <Box
          h="100%"
          w={`${a.progress}%`}
          bg={PROTOSS_CYAN}
          borderRadius="2px"
          boxShadow={`0 0 6px rgba(${PROTOSS_CYAN_RGB}, 0.7)`}
        />
      </Box>
    </Box>
  </motion.div>
)

const FfixTetraCards = () => (
  <Box
    bg={PROTOSS_PANEL_BG}
    border={`2px solid rgba(${KHALA_GOLD_RGB}, 0.6)`}
    borderRadius="sm"
    boxShadow={`0 0 0 3px rgba(10,8,24,0.9), 0 0 0 5px rgba(${KHALA_GOLD_RGB}, 0.2)`}
    overflow="hidden"
    fontFamily="monospace"
  >
    <Flex
      px={3}
      py={2}
      bg={`rgba(${KHALA_GOLD_RGB}, 0.07)`}
      borderBottom={`1px solid rgba(${KHALA_GOLD_RGB}, 0.35)`}
      justify="space-between"
      align="center"
    >
      <Text fontSize="10px" color={PROTOSS_CYAN} letterSpacing="0.15em">
        ▸ ACHIEVEMENTS — SERVICE RECORD
      </Text>
      <Text fontSize="10px" color={KHALA_GOLD}>
        ⬢ {ACHIEVEMENTS.reduce((s, a) => s + a.points, 0)}
      </Text>
    </Flex>
    <SimpleGrid columns={{ base: 2, sm: 4 }} gap={3} p={3}>
      {ACHIEVEMENTS.map(a => (
        <AchievementTile key={a.name} a={a} />
      ))}
    </SimpleGrid>
    <Box px={3} pb={2}>
      <Text fontSize="9px" color={MUTED} letterSpacing="0.08em">
        CAMPAIGN PROGRESS ACROSS ACTIVE OPERATIONS
      </Text>
    </Box>
  </Box>
)

export default FfixTetraCards
