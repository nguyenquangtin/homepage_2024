import { Box, Text, Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const PANEL_BG = 'rgba(8, 14, 40, 0.97)'
const GOLD  = '#c8a800'
const LAND  = '#1a3a2a'
const OCEAN = PANEL_BG

// Simplified world map paths in a 700×320 viewBox (Mercator-ish)
// Danang, Vietnam: 108.2°E 16.1°N → x≈641, y≈164 — marked with pulsing dot
const CONTINENTS = [
  // North America
  'M 68 58 L 138 48 L 168 68 L 178 98 L 162 158 L 128 172 L 88 164 L 62 138 L 54 108 Z',
  // Greenland
  'M 180 25 L 218 18 L 228 40 L 208 58 L 182 54 Z',
  // South America
  'M 118 178 L 152 168 L 168 192 L 178 244 L 160 295 L 126 302 L 106 280 L 108 234 Z',
  // Europe
  'M 295 55 L 356 48 L 368 72 L 348 102 L 306 108 L 284 86 Z',
  // Africa
  'M 288 108 L 356 102 L 370 142 L 360 218 L 318 238 L 280 218 L 270 165 L 280 126 Z',
  // Asia main body
  'M 362 48 L 544 36 L 584 58 L 596 92 L 568 138 L 508 152 L 438 148 L 392 118 L 366 82 Z',
  // Indian subcontinent
  'M 418 132 L 458 128 L 470 168 L 454 196 L 422 196 L 410 164 Z',
  // SE Asia peninsula (Vietnam)
  'M 536 140 L 562 136 L 568 178 L 556 218 L 534 222 L 524 192 L 526 158 Z',
  // Japan archipelago
  'M 576 78 L 596 72 L 602 98 L 592 112 L 575 108 Z',
  // Australia
  'M 538 238 L 612 228 L 628 258 L 618 294 L 574 302 L 538 282 L 528 260 Z',
  // UK/Ireland
  'M 280 64 L 294 60 L 298 80 L 285 84 Z',
]

// Danang coordinates in the same projection
const DANANG = { x: 550, y: 168 }

const FfixWorldMap = () => (
  <Box
    bg={PANEL_BG}
    border={`2px solid ${GOLD}`}
    borderRadius="sm"
    boxShadow={`0 0 0 3px rgba(8,14,40,0.9), 0 0 0 5px ${GOLD}33`}
    overflow="hidden"
    fontFamily="monospace"
  >
    {/* Header */}
    <Flex px={3} py={2} bg="rgba(200,168,0,0.06)" borderBottom={`1px solid ${GOLD}44`} justify="space-between" align="center">
      <Text fontSize="10px" color={GOLD} letterSpacing="0.15em">◆ WORLD MAP</Text>
      <Flex align="center" gap={1}>
        <Box w={2} h={2} borderRadius="full" bg="green.400" />
        <Text fontSize="9px" color="#9890a0">DANANG, VIETNAM</Text>
      </Flex>
    </Flex>

    {/* SVG map */}
    <Box bg={OCEAN} position="relative">
      <svg
        viewBox="0 0 700 320"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', width: '100%' }}
      >
        {/* Ocean grid lines */}
        {[...Array(8)].map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="700" y2={i * 40} stroke="#ffffff06" strokeWidth="0.5" />
        ))}
        {[...Array(14)].map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="320" stroke="#ffffff06" strokeWidth="0.5" />
        ))}

        {/* Continents */}
        {CONTINENTS.map((d, i) => (
          <path key={i} d={d} fill={LAND} stroke="#2a5a3a" strokeWidth="0.8" opacity={0.9} />
        ))}

        {/* Danang — outer pulse ring */}
        <motion.circle
          cx={DANANG.x}
          cy={DANANG.y}
          r="12"
          fill="none"
          stroke="#00cc55"
          strokeWidth="1"
          initial={{ r: 6, opacity: 0.8 }}
          animate={{ r: 16, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
        />
        {/* Danang — dot */}
        <circle cx={DANANG.x} cy={DANANG.y} r="4" fill="#00ff66" />
        <circle cx={DANANG.x} cy={DANANG.y} r="2" fill="white" />

        {/* Danang — label */}
        <text
          x={DANANG.x + 8}
          y={DANANG.y - 6}
          fontSize="9"
          fill={GOLD}
          fontFamily="monospace"
          letterSpacing="0.5"
        >
          DANANG
        </text>
      </svg>
    </Box>
  </Box>
)

export default FfixWorldMap
