import { Box, Text, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import {
  KHALA_GOLD,
  KHALA_GOLD_RGB,
  PROTOSS_CYAN,
  PALETTES,
  chamferClip
} from '../lib/site-theme-context'

const Footer = () => {
  return (
    <Box mt={10} mb={4} textAlign="center">
      {/* Gold hairline with a centre notch — vertical mirror of the
          command-bar notch in navbar.js (LotV pass). */}
      <Box
        aria-hidden
        position="relative"
        h="1px"
        mb={6}
        bg={`linear-gradient(90deg, transparent, rgba(${KHALA_GOLD_RGB}, 0.45) 18%, rgba(${KHALA_GOLD_RGB}, 0.45) 82%, transparent)`}
        pointerEvents="none"
        _after={{
          content: '""',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          top: '-5px',
          width: '22px',
          height: '6px',
          bg: `rgba(${KHALA_GOLD_RGB}, 0.55)`,
          clipPath: chamferClip(3, 'tr-bl')
        }}
      />

      {/* SC2 Pylon beacon (#7) */}
      <Flex direction="column" align="center" gap={1.5}>
        {/* Pulsing khaydarin crystal */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          style={{ display: 'inline-block' }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer glow ring */}
            <circle
              cx="14"
              cy="14"
              r="13"
              fill="none"
              stroke={KHALA_GOLD}
              strokeWidth="0.6"
              opacity="0.4"
            />
            {/* Crystal gem shape */}
            <polygon
              points="14,3 22,10 22,18 14,25 6,18 6,10"
              fill="#001a33"
              stroke={PROTOSS_CYAN}
              strokeWidth="1.2"
            />
            <polygon points="14,3 22,10 14,14" fill="#004488" opacity="0.8" />
            <polygon points="14,3 6,10 14,14" fill="#0066bb" opacity="0.6" />
            <polygon points="6,10 6,18 14,14" fill="#002255" opacity="0.9" />
            <polygon points="22,10 22,18 14,14" fill="#003366" opacity="0.7" />
            <polygon points="6,18 14,25 14,14" fill="#001a44" opacity="0.8" />
            <polygon points="22,18 14,25 14,14" fill="#002244" opacity="0.6" />
            {/* Shine */}
            <polygon points="14,3 18,8 14,9 10,8" fill="white" opacity="0.25" />
          </svg>
        </motion.div>

        <Text
          fontFamily="monospace"
          fontSize="9px"
          color={PROTOSS_CYAN}
          letterSpacing="0.18em"
          opacity={0.8}
        >
          ⟡ PYLON BEACON — EN TARO ADUN ⟡
        </Text>
        <Text
          fontFamily="monospace"
          fontSize="9px"
          color={PALETTES.sc2.muted}
          letterSpacing="0.08em"
        >
          &copy; {new Date().getFullYear()} Tony Tin Nguyen — All rights
          reserved
        </Text>
      </Flex>
    </Box>
  )
}

export default Footer
