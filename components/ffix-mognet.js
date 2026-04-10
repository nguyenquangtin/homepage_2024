import { Box, Text, Button, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { EmailIcon } from '@chakra-ui/icons'
import { useSiteTheme } from '../lib/site-theme-context'

// Animated envelope icon (bobs gently)
const EnvelopeSVG = ({ color }) => (
  <svg width="32" height="24" viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="30" height="22" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
    <polyline points="1,1 16,14 31,1" fill="none" stroke={color} strokeWidth="1.5" />
  </svg>
)

const THEME_DATA = {
  ffix: {
    header: '◆ MOGNET DELIVERY',
    greeting: 'Dear Kupo,',
    body: 'Mog has a new dispatch waiting — tips, builds, and things Tony ships along the way.',
    sender: 'FROM: TONY · VIA SUBSTACK',
    cta: 'READ MESSAGE →',
  },
  sc2: {
    header: '◆ KHALAI TRANSMISSION',
    greeting: 'Executor,',
    body: 'A new transmission from the Templar Archives — tech insights, builds, and dispatches from the field.',
    sender: 'FROM: TONY · VIA SUBSTACK',
    cta: 'OPEN CHANNEL →',
  },
}

const FfixMognet = () => {
  const { theme, palette } = useSiteTheme()
  const d = THEME_DATA[theme]
  const { accent, text, panelBg, muted } = palette

  return (
    <Box
      bg={panelBg}
      border={`2px solid ${accent}`}
      borderRadius="sm"
      boxShadow={`0 0 0 3px rgba(8,14,40,0.9), 0 0 0 5px ${accent}33`}
      overflow="hidden"
      fontFamily="monospace"
    >
      <Box px={4} py={2} bg={palette.headerBg} borderBottom={`1px solid ${palette.headerBorder}`}>
        <Text fontSize="10px" color={accent} letterSpacing="0.15em">{d.header}</Text>
      </Box>

      <Flex p={4} gap={4} align="center" direction={{ base: 'column', sm: 'row' }}>
        <motion.div
          animate={{ y: [0, -5, 0], rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          style={{ flexShrink: 0 }}
        >
          <EnvelopeSVG color={accent} />
        </motion.div>

        <Box flex={1}>
          <Box
            bg="rgba(255,255,255,0.03)"
            border={`1px solid ${accent}22`}
            borderRadius="sm"
            p={3}
            mb={3}
          >
            <Text fontSize="xs" color={text} lineHeight={1.7}>
              <Text as="span" color={accent}>{d.greeting}</Text>
              <br />
              {d.body}
            </Text>
          </Box>

          <Flex align="center" justify="space-between" gap={3} wrap="wrap">
            <Text fontSize="9px" color={muted} letterSpacing="0.08em">{d.sender}</Text>
            <Button
              as="a"
              href="https://coderhorizon.com/"
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<EmailIcon />}
              size="xs"
              bg={accent}
              color={theme === 'ffix' ? 'black' : '#001a22'}
              fontFamily="monospace"
              fontWeight="bold"
              letterSpacing="0.08em"
              _hover={{ bg: theme === 'ffix' ? '#e0c000' : '#00ddff', transform: 'translateY(-1px)' }}
              transition="all 0.15s"
            >
              {d.cta}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default FfixMognet
