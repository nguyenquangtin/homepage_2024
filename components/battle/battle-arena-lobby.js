import { Box, Flex, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { BattleSprite } from './battle-sprites'
import Sc2Button from '../sc2/sc2-button'
import { PALETTES, PROTOSS_CYAN_RGB, KHALA_GOLD_RGB } from '../../lib/site-theme-context'

const sc2 = PALETTES.sc2

const WEAKNESS_LABEL = {
  phase: 'Phase Beam',
  solar: 'Solar Lance',
  probe: 'Deploy Probe',
}

// Pre-fight lobby shown inside the arena panel — enemy scouting report plus
// the Engage / New enemy controls. Split out of pages/battle.js (<200 lines).
const BattleArenaLobby = ({ enemy, onEngage, onReroll }) => (
  <Flex
    direction="column"
    align="center"
    justify="center"
    h="100%"
    px={4}
    py={6}
    gap={4}
    textAlign="center"
    bg="linear-gradient(180deg, #050510 0%, #0a0a2a 40%, #101035 100%)"
  >
    <Text
      fontFamily="mono"
      fontSize="10px"
      letterSpacing="0.2em"
      textTransform="uppercase"
      color={sc2.muted}
    >
      &#9656; Scouting report
    </Text>

    <motion.div
      key={enemy.name}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Box mb={2}>
        <BattleSprite spriteKey={enemy.spriteKey} size={96} />
      </Box>

      <Text
        fontFamily="heading"
        fontWeight={600}
        fontSize={{ base: 'md', md: 'lg' }}
        letterSpacing="0.06em"
        color={sc2.text}
        textShadow={`0 0 10px rgba(${PROTOSS_CYAN_RGB}, 0.5)`}
      >
        {enemy.name}
      </Text>

      <Text fontFamily="mono" fontSize="xs" color={sc2.muted} mt={1} maxW="360px">
        {enemy.desc}
      </Text>

      <Flex
        gap={4}
        mt={3}
        justify="center"
        fontFamily="mono"
        fontSize="xs"
        color={sc2.text}
        letterSpacing="0.05em"
      >
        <Text>HP <Text as="span" color={`rgba(${KHALA_GOLD_RGB}, 0.9)`}>{enemy.hp}</Text></Text>
        <Text>
          WEAKNESS{' '}
          <Text as="span" color={enemy.weakness ? '#00ddff' : sc2.muted}>
            {enemy.weakness ? (WEAKNESS_LABEL[enemy.weakness] || enemy.weakness) : 'Unknown'}
          </Text>
        </Text>
      </Flex>
    </motion.div>

    <Flex gap={3} mt={2}>
      <Sc2Button variant="gold" onClick={onEngage}>Engage</Sc2Button>
      <Sc2Button variant="cyan" onClick={onReroll}>New enemy</Sc2Button>
    </Flex>
  </Flex>
)

export default BattleArenaLobby
