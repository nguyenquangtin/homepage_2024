import { Box, Text, Button, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { EmailIcon } from '@chakra-ui/icons'

const GOLD = '#c8a800'
const CREAM = '#f0e6a0'
const MUTED = '#9890a0'
const PANEL_BG = 'rgba(8, 14, 40, 0.97)'

// Animated envelope icon (bobs gently)
const EnvelopeSVG = () => (
  <svg width="32" height="24" viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="30" height="22" rx="2" fill="none" stroke={GOLD} strokeWidth="1.5" />
    <polyline points="1,1 16,14 31,1" fill="none" stroke={GOLD} strokeWidth="1.5" />
  </svg>
)

const FfixMognet = () => (
  <Box
    bg={PANEL_BG}
    border={`2px solid ${GOLD}`}
    borderRadius="sm"
    boxShadow={`0 0 0 3px rgba(8,14,40,0.9), 0 0 0 5px ${GOLD}33`}
    overflow="hidden"
    fontFamily="monospace"
  >
    {/* Header */}
    <Box px={4} py={2} bg="rgba(200,168,0,0.06)" borderBottom={`1px solid ${GOLD}44`}>
      <Text fontSize="10px" color={GOLD} letterSpacing="0.15em">◆ MOGNET DELIVERY</Text>
    </Box>

    <Flex p={4} gap={4} align="center" direction={{ base: 'column', sm: 'row' }}>
      {/* Animated envelope */}
      <motion.div
        animate={{ y: [0, -5, 0], rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        style={{ flexShrink: 0 }}
      >
        <EnvelopeSVG />
      </motion.div>

      {/* Message */}
      <Box flex={1}>
        <Box
          bg="rgba(255,255,255,0.03)"
          border={`1px solid ${GOLD}22`}
          borderRadius="sm"
          p={3}
          mb={3}
        >
          <Text fontSize="xs" color={CREAM} lineHeight={1.7}>
            <Text as="span" color={GOLD}>Dear Kupo,</Text>
            <br />
            Mog has a new dispatch waiting — tips, builds, and things Tony ships along the way.
          </Text>
        </Box>

        <Flex align="center" justify="space-between" gap={3} wrap="wrap">
          <Text fontSize="9px" color={MUTED} letterSpacing="0.08em">
            FROM: TONY · VIA SUBSTACK
          </Text>
          <Button
            as="a"
            href="https://coderhorizon.com/"
            target="_blank"
            rel="noopener noreferrer"
            leftIcon={<EmailIcon />}
            size="xs"
            bg={GOLD}
            color="black"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="0.08em"
            _hover={{ bg: '#f0d000', transform: 'translateY(-1px)' }}
            transition="all 0.15s"
          >
            READ MESSAGE →
          </Button>
        </Flex>
      </Box>
    </Flex>
  </Box>
)

export default FfixMognet
