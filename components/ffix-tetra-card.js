import { Box, Text, Flex, SimpleGrid } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const GOLD = '#c8a800'
const PANEL_BG = 'rgba(8, 14, 40, 0.97)'

// Project cards styled as FFIX Tetra Master cards
// Values: A=Attack, P=Physical def, M=Magic def, X=Flexible
const CARDS = [
  {
    name: 'Ecomdy\nMedia',
    type: 'LEGEND',
    art: 'linear-gradient(135deg, #1a0a3a 0%, #3a1a6a 50%, #1a0a3a 100%)',
    glow: '#aa66ff',
    A: 9, P: 6, M: 8, X: 9,
  },
  {
    name: 'Coder\nHorizon',
    type: 'RARE',
    art: 'linear-gradient(135deg, #0a1a3a 0%, #1a4a6a 50%, #0a1a3a 100%)',
    glow: '#44ccff',
    A: 7, P: 5, M: 9, X: 8,
  },
  {
    name: 'GDG\nMien Trung',
    type: 'RARE',
    art: 'linear-gradient(135deg, #0a2a1a 0%, #1a5a2a 50%, #0a2a1a 100%)',
    glow: '#00cc55',
    A: 6, P: 7, M: 7, X: 9,
  },
  {
    name: 'NFQ Asia\nShopware',
    type: 'COMMON',
    art: 'linear-gradient(135deg, #2a1a0a 0%, #5a3a1a 50%, #2a1a0a 100%)',
    glow: '#ffcc00',
    A: 8, P: 8, M: 6, X: 7,
  },
]

// Single Tetra Master card
const TetraCard = ({ card }) => (
  <motion.div whileHover={{ scale: 1.05, rotate: 1 }} transition={{ duration: 0.2 }}>
    <Box
      bg={PANEL_BG}
      border={`2px solid ${card.glow}66`}
      borderRadius="sm"
      overflow="hidden"
      boxShadow={`0 0 0 1px rgba(8,14,40,0.9), 0 0 12px ${card.glow}22`}
      fontFamily="monospace"
      cursor="pointer"
      position="relative"
      _hover={{ boxShadow: `0 0 0 1px rgba(8,14,40,0.9), 0 0 20px ${card.glow}44` }}
      transition="box-shadow 0.2s"
    >
      {/* Card art area */}
      <Box h="80px" background={card.art} position="relative">
        {/* Corner A value (top-left) */}
        <Text
          position="absolute" top={1} left={2}
          fontSize="14px" fontWeight="bold" color={card.glow}
        >
          {card.A}
        </Text>
        {/* Type badge */}
        <Box position="absolute" top={1} right={2}>
          <Text fontSize="8px" color={`${card.glow}bb`} letterSpacing="0.1em">{card.type}</Text>
        </Box>
        {/* Decorative crystal shape */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="28px"
          h="28px"
          border={`1.5px solid ${card.glow}44`}
          borderRadius="sm"
          style={{ rotate: '45deg' }}
          opacity={0.4}
        />
      </Box>

      {/* Bottom stat row: P · M · X */}
      <Box px={2} py={1.5} borderTop={`1px solid ${card.glow}33`}>
        <Text
          fontSize="11px"
          fontWeight="bold"
          color="white"
          mb={1}
          lineHeight={1.3}
          whiteSpace="pre-line"
        >
          {card.name}
        </Text>
        <Flex justify="space-between">
          {[['P', card.P], ['M', card.M], ['X', card.X]].map(([k, v]) => (
            <Flex key={k} align="baseline" gap="2px">
              <Text fontSize="8px" color={GOLD}>{k}</Text>
              <Text fontSize="11px" fontWeight="bold" color={card.glow}>{v}</Text>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Box>
  </motion.div>
)

const FfixTetraCards = () => (
  <Box
    bg={PANEL_BG}
    border={`2px solid ${GOLD}`}
    borderRadius="sm"
    boxShadow={`0 0 0 3px rgba(8,14,40,0.9), 0 0 0 5px ${GOLD}33`}
    overflow="hidden"
    fontFamily="monospace"
  >
    <Box px={3} py={2} bg="rgba(200,168,0,0.06)" borderBottom={`1px solid ${GOLD}44`}>
      <Text fontSize="10px" color={GOLD} letterSpacing="0.15em">◆ TETRA MASTER — PROJECT CARDS</Text>
    </Box>
    <SimpleGrid columns={{ base: 2, sm: 4 }} gap={3} p={3}>
      {CARDS.map(card => <TetraCard key={card.name} card={card} />)}
    </SimpleGrid>
    <Box px={3} pb={2}>
      <Text fontSize="9px" color="#9890a0" letterSpacing="0.08em">
        A=Attack · P=Physical · M=Magic · X=Flexible
      </Text>
    </Box>
  </Box>
)

export default FfixTetraCards
