import { Box, Text, Flex } from '@chakra-ui/react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  PROTOSS_CYAN,
  PROTOSS_CYAN_RGB,
  KHALA_GOLD,
  KHALA_GOLD_RGB,
  PROTOSS_PANEL_BG,
  PALETTES
} from '../lib/site-theme-context'

// SC2 tactical minimap (#16): dark terrain, cyan grid, unit blips,
// camera viewport rect, scan sweep. Base marker at Danang, Vietnam.
const LAND = '#0f2438' // dark tactical terrain
const LAND_EDGE = `rgba(${PROTOSS_CYAN_RGB}, 0.35)`

// Simplified world map paths in a 700×320 viewBox (Mercator-ish)
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
  'M 280 64 L 294 60 L 298 80 L 285 84 Z'
]

// Base (player) at Danang; fixed ally/enemy blips for tactical flavor
const DANANG = { x: 550, y: 168 }
const ALLY_BLIPS = [
  { x: 300, y: 80 }, // Europe
  { x: 590, y: 95 }, // Japan
  { x: 130, y: 110 }, // North America
  { x: 575, y: 265 } // Australia
]
const ENEMY_BLIPS = [
  { x: 330, y: 180 }, // Africa
  { x: 480, y: 60 } // North Asia
]

const FfixWorldMap = () => {
  const reduceMotion = useReducedMotion()
  return (
    <Box
      bg={PROTOSS_PANEL_BG}
      border={`2px solid rgba(${KHALA_GOLD_RGB}, 0.6)`}
      borderRadius="sm"
      boxShadow={`0 0 0 3px rgba(10,8,24,0.9), 0 0 0 5px rgba(${KHALA_GOLD_RGB}, 0.2)`}
      overflow="hidden"
      fontFamily="monospace"
    >
      {/* Command header */}
      <Flex
        px={3}
        py={2}
        bg={`rgba(${KHALA_GOLD_RGB}, 0.07)`}
        borderBottom={`1px solid rgba(${KHALA_GOLD_RGB}, 0.35)`}
        justify="space-between"
        align="center"
      >
        <Text fontSize="10px" color={PROTOSS_CYAN} letterSpacing="0.15em">
          ▸ TACTICAL MAP — SECTOR: EARTH
        </Text>
        <Flex align="center" gap={1}>
          <Box w={2} h={2} borderRadius="full" bg="green.400" />
          <Text fontSize="9px" color={PALETTES.sc2.muted}>
            BASE: DANANG · 16.1°N 108.2°E
          </Text>
        </Flex>
      </Flex>

      {/* Minimap */}
      <Box position="relative">
        <svg
          viewBox="0 0 700 320"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', width: '100%' }}
        >
          {/* Tactical grid */}
          {[...Array(16)].map((_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={i * 20}
              x2="700"
              y2={i * 20}
              stroke={`rgba(${PROTOSS_CYAN_RGB}, 0.05)`}
              strokeWidth="0.5"
            />
          ))}
          {[...Array(28)].map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 25}
              y1="0"
              x2={i * 25}
              y2="320"
              stroke={`rgba(${PROTOSS_CYAN_RGB}, 0.05)`}
              strokeWidth="0.5"
            />
          ))}

          {/* Terrain */}
          {CONTINENTS.map((d, i) => (
            <path
              key={i}
              d={d}
              fill={LAND}
              stroke={LAND_EDGE}
              strokeWidth="0.8"
              opacity={0.95}
            />
          ))}

          {/* Camera viewport rect over the base region (minimap idiom) */}
          <rect
            x={505}
            y={130}
            width={95}
            height={78}
            fill="none"
            stroke="rgba(232, 248, 255, 0.75)"
            strokeWidth="1.2"
          />

          {/* Ally blips (psionic cyan) */}
          {ALLY_BLIPS.map((b, i) => (
            <circle
              key={`a${i}`}
              cx={b.x}
              cy={b.y}
              r="2.4"
              fill={PROTOSS_CYAN}
              opacity="0.85"
            />
          ))}
          {/* Enemy blips */}
          {ENEMY_BLIPS.map((b, i) => (
            <circle
              key={`e${i}`}
              cx={b.x}
              cy={b.y}
              r="2.4"
              fill="#ff5544"
              opacity="0.85"
            />
          ))}

          {/* Base — outer pulse ring */}
          {!reduceMotion && (
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
          )}
          {/* Base — nexus dot */}
          <circle cx={DANANG.x} cy={DANANG.y} r="4" fill="#00ff66" />
          <circle cx={DANANG.x} cy={DANANG.y} r="2" fill="white" />
          <text
            x={DANANG.x + 8}
            y={DANANG.y - 6}
            fontSize="9"
            fill={KHALA_GOLD}
            fontFamily="monospace"
            letterSpacing="0.5"
          >
            NEXUS: DANANG
          </text>

          {/* Scan sweep — slow vertical pass */}
          {!reduceMotion && (
            <motion.line
              x1="0"
              x2="700"
              stroke={`rgba(${PROTOSS_CYAN_RGB}, 0.35)`}
              strokeWidth="1.5"
              initial={{ y1: 0, y2: 0, opacity: 0.5 }}
              animate={{ y1: 320, y2: 320, opacity: 0.15 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            />
          )}
        </svg>
      </Box>
    </Box>
  )
}

export default FfixWorldMap
