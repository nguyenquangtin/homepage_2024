import { Box, Text, Flex } from '@chakra-ui/react'

const PANEL_BG = 'rgba(8, 14, 40, 0.97)'
const GOLD = '#c8a800'
const CREAM = '#f0e6a0'
const MUTED = '#9890a0'

const EQUIP = [
  { slot: 'WPN', name: 'TypeScript',    bonus: '+18 STR', color: '#ff8844' }, // lance — precision execution
  { slot: 'HLM', name: 'System Design', bonus: '+15 SPI', color: '#44ccff' }, // helm — strategic leadership
  { slot: 'ARM', name: 'Docker',         bonus: '+20 VIT', color: '#00cc55' }, // armor — rock-solid stability
  { slot: 'BDY', name: 'Node.js',        bonus: '+12 SPD', color: '#ffcc00' }, // body — runtime foundation
  { slot: 'ACC', name: 'TikTok API',    bonus: '+10 SPD', color: '#ffcc00' }, // accessory — platform edge
]

const FfixEquipment = () => (
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
      <Text fontSize="10px" color={GOLD} letterSpacing="0.15em">◆ EQUIPMENT</Text>
    </Box>

    <Box p={3}>
      {EQUIP.map(({ slot, name, bonus, color }) => (
        <Flex key={slot} align="center" gap={2} mb={3}>
          {/* Slot label */}
          <Text fontSize="9px" color={GOLD} w="26px" letterSpacing="0.1em" flexShrink={0}>
            {slot}
          </Text>
          {/* Item box */}
          <Box
            flex={1}
            bg="rgba(255,255,255,0.04)"
            border={`1px solid ${GOLD}22`}
            borderRadius="sm"
            px={2}
            py={1}
          >
            <Text fontSize="xs" color={CREAM} fontWeight={600} lineHeight={1.2}>
              {name}
            </Text>
          </Box>
          {/* Bonus */}
          <Text fontSize="9px" color={color} w="44px" textAlign="right" flexShrink={0}>
            {bonus}
          </Text>
        </Flex>
      ))}

      {/* Equip tip */}
      <Box mt={1} pt={2} borderTop={`1px solid ${GOLD}22`}>
        <Text fontSize="9px" color={MUTED} letterSpacing="0.08em">
          ◇ All abilities mastered
        </Text>
      </Box>
    </Box>
  </Box>
)

export default FfixEquipment
