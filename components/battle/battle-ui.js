import { useState } from 'react'
import { Box, Text, Flex } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { SPELLS } from './battle-engine'

const PANEL = 'rgba(8, 14, 40, 0.97)'
const GOLD = '#c8a800'
const CREAM = '#f0e6a0'
const MUTED = '#9890a0'
const panelBorder = `2px solid ${GOLD}`
const panelShadow = `0 0 0 3px rgba(8,14,40,0.9), 0 0 0 5px ${GOLD}33`

// ── HP / MP Bar ──
const StatBar = ({ value, max, color, label, w = '100%' }) => (
  <Flex align="center" gap={1} fontFamily="monospace" fontSize="10px" color={CREAM} w={w}>
    <Text w="24px" flexShrink={0}>{label}</Text>
    <Box flex={1} h="8px" bg="rgba(0,0,0,0.6)" borderRadius="1px" overflow="hidden">
      <motion.div
        style={{ height: '100%', background: color, borderRadius: '1px' }}
        animate={{ width: `${Math.max(0, (value / max) * 100)}%` }}
        transition={{ duration: 0.4 }}
      />
    </Box>
    <Text w="50px" textAlign="right" flexShrink={0}>{value}/{max}</Text>
  </Flex>
)

// ── Battle HUD (player + enemy stats) ──
export const BattleHud = ({ player, enemy }) => (
  <Flex justify="space-between" w="100%" px={2} pt={2} position="absolute" top={0} left={0} zIndex={2}>
    {/* Enemy stats - top left */}
    <Box bg={PANEL} border={panelBorder} borderRadius="sm" px={3} py={2} minW="140px" boxShadow={panelShadow}>
      <Text fontFamily="monospace" fontSize="11px" color={GOLD} mb={1} letterSpacing="0.1em">
        {enemy.name}
      </Text>
      <StatBar value={enemy.hp} max={enemy.maxHp} color="#cc3333" label="HP" />
    </Box>
    {/* Player stats - top right */}
    <Box bg={PANEL} border={panelBorder} borderRadius="sm" px={3} py={2} minW="140px" boxShadow={panelShadow}>
      <Text fontFamily="monospace" fontSize="11px" color={GOLD} mb={1} letterSpacing="0.1em">
        BLACK MAGE TONY
      </Text>
      <StatBar value={player.hp} max={player.maxHp} color="#33aa55" label="HP" />
      <StatBar value={player.mp} max={player.maxMp} color="#4488ff" label="MP" />
    </Box>
  </Flex>
)

// ── Command Menu ──
export const CommandMenu = ({ onAttack, onCast, onItem, onRun, player }) => {
  const [sub, setSub] = useState(null) // null | 'magic'

  const Btn = ({ label, onClick, disabled }) => (
    <Box
      as="button"
      onClick={disabled ? undefined : onClick}
      fontFamily="monospace"
      fontSize={{ base: '11px', md: '13px' }}
      color={disabled ? '#555' : CREAM}
      bg="transparent"
      px={3} py={1}
      textAlign="left"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      _hover={disabled ? {} : { bg: `${GOLD}22`, color: GOLD }}
      letterSpacing="0.08em"
      w="100%"
      transition="all 0.15s"
    >
      ▸ {label}
    </Box>
  )

  if (sub === 'magic') {
    return (
      <Box bg={PANEL} border={panelBorder} borderRadius="sm" p={2} boxShadow={panelShadow} minW="130px">
        {Object.entries(SPELLS).map(([key, s]) => (
          <Btn
            key={key}
            label={`${s.label} ${s.mp}mp`}
            onClick={() => { onCast(key); setSub(null) }}
            disabled={player.mp < s.mp}
          />
        ))}
        <Btn label="Back" onClick={() => setSub(null)} />
      </Box>
    )
  }

  return (
    <Box bg={PANEL} border={panelBorder} borderRadius="sm" p={2} boxShadow={panelShadow} minW="110px">
      <Btn label="Attack" onClick={onAttack} />
      <Btn label="Magic ▸" onClick={() => setSub('magic')} />
      <Btn label="Item" onClick={onItem} disabled={player.itemUsed} />
      <Btn label="Run" onClick={onRun} />
    </Box>
  )
}

// ── Battle Log ──
export const BattleLog = ({ messages }) => (
  <Box bg={PANEL} border={panelBorder} borderRadius="sm" px={3} py={2} boxShadow={panelShadow} flex={1} minH="52px">
    {messages.map((msg, i) => (
      <Text key={i} fontFamily="monospace" fontSize={{ base: '10px', md: '12px' }} color={i === messages.length - 1 ? CREAM : MUTED} letterSpacing="0.05em">
        {msg}
      </Text>
    ))}
  </Box>
)

// ── Floating Damage Number ──
export const DamageNumber = ({ value, position }) => (
  <AnimatePresence>
    {value !== 0 && (
      <motion.div
        key={`${Date.now()}`}
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 0, y: -30 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9 }}
        style={{
          position: 'absolute', ...position, zIndex: 10, pointerEvents: 'none'
        }}
      >
        <Text
          fontFamily="monospace"
          fontWeight="bold"
          fontSize="20px"
          color={value < 0 ? '#44dd66' : '#ff4444'}
          textShadow="0 0 4px rgba(0,0,0,0.8)"
        >
          {value < 0 ? `+${Math.abs(value)}` : value}
        </Text>
      </motion.div>
    )}
  </AnimatePresence>
)

// ── Victory Screen ──
export const VictoryScreen = ({ enemyName, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20, cursor: 'pointer' }}
    onClick={onClose}
  >
    <Box bg={PANEL} border={panelBorder} borderRadius="md" px={8} py={6} textAlign="center" boxShadow={`0 0 30px ${GOLD}44`}>
      <Text fontFamily="monospace" fontSize="xl" color={GOLD} fontWeight="bold" letterSpacing="0.2em" mb={2}>
        ★ VICTORY ★
      </Text>
      <Text fontFamily="monospace" fontSize="sm" color={CREAM}>
        {enemyName} was defeated!
      </Text>
      <Text fontFamily="monospace" fontSize="xs" color={MUTED} mt={3}>
        (click to close)
      </Text>
    </Box>
  </motion.div>
)

// ── Defeat Screen ──
export const DefeatScreen = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20, background: 'rgba(80,0,0,0.3)', cursor: 'pointer' }}
    onClick={onClose}
  >
    <Box bg={PANEL} border="2px solid #882222" borderRadius="md" px={8} py={6} textAlign="center">
      <Text fontFamily="monospace" fontSize="xl" color="#ff4444" fontWeight="bold" letterSpacing="0.2em" mb={2}>
        GAME OVER
      </Text>
      <Text fontFamily="monospace" fontSize="sm" color={MUTED}>
        The darkness prevails...
      </Text>
      <Text fontFamily="monospace" fontSize="xs" color={MUTED} mt={3}>
        (click to close)
      </Text>
    </Box>
  </motion.div>
)
