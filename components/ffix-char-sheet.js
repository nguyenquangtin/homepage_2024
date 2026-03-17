import { Box, Text, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const PANEL_BG = 'rgba(8, 14, 40, 0.97)'
const GOLD = '#c8a800'
const CREAM = '#f0e6a0'
const MUTED = '#9890a0'

// Animated stat bar (fills on mount)
const StatBar = ({ label, value, max = 100, color }) => (
  <Flex align="center" gap={2} mb={1.5}>
    <Text fontSize="10px" fontFamily="monospace" color={GOLD} w="30px" letterSpacing="0.05em">
      {label}
    </Text>
    <Box flex={1} h="7px" bg="rgba(255,255,255,0.08)" borderRadius="sm" overflow="hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        style={{ height: '100%', background: color, borderRadius: '2px' }}
      />
    </Box>
    <Text fontSize="10px" fontFamily="monospace" color={CREAM} w="24px" textAlign="right">
      {value}
    </Text>
  </Flex>
)

// Trance gauge — slowly fills, glows purple when full, then resets
const TranceBar = () => (
  <Flex align="center" gap={2} mt={1}>
    <Text fontSize="10px" fontFamily="monospace" color="#cc88ff" w="30px">TRN</Text>
    <Box flex={1} h="7px" bg="rgba(255,255,255,0.08)" borderRadius="sm" overflow="hidden">
      <motion.div
        animate={{ width: ['0%', '100%', '100%', '0%'], opacity: [0.8, 1, 0.4, 0.8] }}
        transition={{ repeat: Infinity, duration: 12, times: [0, 0.78, 0.92, 1], ease: 'easeInOut' }}
        style={{ height: '100%', background: 'linear-gradient(90deg,#7722cc,#cc66ff)', borderRadius: '2px' }}
      />
    </Box>
    <Text fontSize="10px" fontFamily="monospace" color="#cc88ff" w="24px" textAlign="right">✦</Text>
  </Flex>
)

// ATB gauge — perpetually charging
const AtbBar = () => (
  <Flex align="center" gap={2} mt={1}>
    <Text fontSize="10px" fontFamily="monospace" color={GOLD} w="30px">
      ATB
    </Text>
    <Box flex={1} h="7px" bg="rgba(255,255,255,0.08)" borderRadius="sm" overflow="hidden">
      <motion.div
        animate={{ width: ['0%', '100%', '100%', '0%'] }}
        transition={{ repeat: Infinity, duration: 3.2, times: [0, 0.65, 0.9, 1], ease: 'linear' }}
        style={{ height: '100%', background: '#ffcc00', borderRadius: '2px' }}
      />
    </Box>
    <Text fontSize="10px" fontFamily="monospace" color="#ffcc00" w="24px" textAlign="right">
      ▶
    </Text>
  </Flex>
)

// Stats tuned for DRAGON KNIGHT — STR/VIT primary like Freya, MAG secondary
// Effective totals include equipment bonuses shown in the Equipment panel:
//   WPN TypeScript +18 STR | HLM System Design +15 SPI | ARM Docker +20 VIT
//   BDY Node.js +12 SPD   | ACC TikTok API +10 SPD
const STATS = [
  { label: 'STR', value: 88, color: '#ff8844' }, // Execution power — primary for Dragon Knight
  { label: 'VIT', value: 84, color: '#00cc55' }, // Endurance & consistency
  { label: 'SPI', value: 78, color: '#44ccff' }, // Community & leadership
  { label: 'SPD', value: 74, color: '#ffcc00' }, // Shipping velocity
  { label: 'MAG', value: 60, color: '#aa66ff' }, // Tech depth — secondary for DK
]

const FfixCharSheet = () => (
  <Box
    bg={PANEL_BG}
    border={`2px solid ${GOLD}`}
    borderRadius="sm"
    boxShadow={`0 0 0 3px rgba(8,14,40,0.9), 0 0 0 5px ${GOLD}33`}
    overflow="hidden"
    fontFamily="monospace"
  >
    {/* Panel header */}
    <Box px={4} py={2} bg="rgba(200,168,0,0.06)" borderBottom={`1px solid ${GOLD}44`}>
      <Text fontSize="10px" color={GOLD} letterSpacing="0.15em">
        ◆ CHARACTER
      </Text>
    </Box>

    <Box px={4} py={3}>
      {/* Name + Job */}
      <Flex justify="space-between" align="baseline" mb={3} pb={2} borderBottom={`1px solid ${GOLD}33`}>
        <Box>
          <Text fontSize="10px" color={MUTED} letterSpacing="0.1em" mb={0.5}>
            NAME
          </Text>
          <Text color={CREAM} fontWeight="bold" fontSize="sm" letterSpacing="0.06em">
            TONY TIN NGUYEN
          </Text>
        </Box>
        <Box textAlign="right">
          <Text fontSize="10px" color={MUTED} letterSpacing="0.1em" mb={0.5}>
            JOB
          </Text>
          <Text color="#ffb866" fontSize="xs" fontWeight="bold" letterSpacing="0.04em">
            DRAGON KNIGHT
          </Text>
        </Box>
      </Flex>

      {/* HP + MP row */}
      <Flex gap={3} mb={3}>
        <Box flex={1}>
          <Flex justify="space-between" mb={1}>
            <Text fontSize="10px" color={GOLD}>HP</Text>
            <Text fontSize="10px" color="#00cc55">7168/8400</Text>
          </Flex>
          <Box h="6px" bg="rgba(255,255,255,0.08)" borderRadius="sm" overflow="hidden">
            <Box h="full" w="85%" bg="linear-gradient(90deg,#009933,#00ff55)" />
          </Box>
        </Box>
        <Box flex={1}>
          <Flex justify="space-between" mb={1}>
            <Text fontSize="10px" color={GOLD}>MP</Text>
            <Text fontSize="10px" color="#4488ff">464/580</Text>
          </Flex>
          <Box h="6px" bg="rgba(255,255,255,0.08)" borderRadius="sm" overflow="hidden">
            <Box h="full" w="80%" bg="linear-gradient(90deg,#2244bb,#4499ff)" />
          </Box>
        </Box>
      </Flex>

      <AtbBar />
      <TranceBar />

      {/* Divider */}
      <Box borderTop={`1px solid ${GOLD}33`} my={3} />

      {/* Attributes */}
      <Text fontSize="10px" color={MUTED} letterSpacing="0.12em" mb={2}>
        ◆ ATTRIBUTES
      </Text>
      {STATS.map(s => (
        <StatBar key={s.label} {...s} />
      ))}

      {/* LV + EXP footer */}
      <Flex justify="space-between" mt={3} pt={2} borderTop={`1px solid ${GOLD}33`}>
        <Text fontSize="10px" color={GOLD}>
          LV <Text as="span" color={CREAM}>39</Text>
        </Text>
        <Text fontSize="10px" color={MUTED}>
          EXP <Text as="span" color={CREAM}>19 YRS</Text>
        </Text>
      </Flex>

      {/* Gil counter */}
      <Flex justify="flex-end" mt={1.5}>
        <Text fontSize="10px" color={GOLD} letterSpacing="0.05em">
          GIL <Text as="span" color="#ffd700" fontWeight="bold">8,888,888</Text>
        </Text>
      </Flex>
    </Box>
  </Box>
)

export default FfixCharSheet
