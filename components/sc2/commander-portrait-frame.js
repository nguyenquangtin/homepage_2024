import Image from 'next/image'
import { Box, Text } from '@chakra-ui/react'
import {
  CHAMFER,
  chamferClip,
  KHALA_GOLD,
  KHALA_GOLD_RGB,
  PROTOSS_CYAN_RGB,
  PROTOSS_DEEP_GOLD,
  PROTOSS_GOLD_LIGHT,
  PROTOSS_GOLD_LIGHT_RGB,
  PROTOSS_PANEL_BG,
  PROTOSS_PANEL_RGB
} from '../../lib/site-theme-context'
import { ProtossFrameCorners, ProtossCrystalGem } from './protoss-ornament'

const PORTRAIT = { base: '112px', md: '140px' }
// Hero cut scales down on phones (brief §6) — CHAMFER.md base, lg from md up
const HERO_CHAMFER = { base: CHAMFER.md, md: CHAMFER.lg }

// chamferClip for a plain px value or a Chakra responsive object
const clipAt = (chamfer, corners, delta = 0) =>
  typeof chamfer === 'number'
    ? chamferClip(chamfer + delta, corners)
    : Object.fromEntries(
        Object.entries(chamfer).map(([bp, px]) => [
          bp,
          chamferClip(px + delta, corners)
        ])
      )

// A real CSS border is never painted along a 45° cut, so every "1px line" in
// the LotV frame stack is a padded parent background (same recipe as
// Sc2Panel — this file only adds the all-four-corner hero variant).
export const ChamferPlate = ({
  chamfer = CHAMFER.md,
  corners = 'all',
  edge,
  edgeWidth = 1,
  fill = PROTOSS_PANEL_BG,
  innerShadow,
  children,
  ...rest
}) => (
  <Box
    clipPath={clipAt(chamfer, corners)}
    bg={edge}
    p={`${edgeWidth}px`}
    {...rest}
  >
    <Box
      position="relative"
      h="100%"
      clipPath={clipAt(chamfer, corners, -edgeWidth)}
      bg={fill}
      boxShadow={innerShadow}
    >
      {children}
    </Box>
  </Box>
)

// Brushed-gold edge gradient — the frame reads as plating, not as a flat rule
export const GOLD_EDGE = `linear-gradient(150deg, ${PROTOSS_GOLD_LIGHT} 0%, ${KHALA_GOLD} 34%, ${PROTOSS_DEEP_GOLD} 68%, ${KHALA_GOLD} 100%)`

// Body fill: LotV panels are lit navy at the top, deep space at the bottom
const BODY_FILL = `linear-gradient(168deg, rgba(26, 38, 78, 0.9) 0%, rgba(13, 16, 40, 0.96) 42%, ${PROTOSS_PANEL_BG} 100%)`

// Portrait slot: cyan energy ring (breathing) behind a gold-framed photo
export const PortraitSlot = () => (
  <Box flexShrink={0} textAlign="center">
    <Box position="relative" w={PORTRAIT} h={PORTRAIT} mx="auto">
      <Box
        aria-hidden
        className="protoss-ring-pulse"
        position="absolute"
        inset="-7px"
        clipPath={chamferClip(CHAMFER.md + 7)}
        bg={`rgba(${PROTOSS_CYAN_RGB}, 0.85)`}
        p="2px"
        pointerEvents="none"
        boxShadow={`0 0 20px rgba(${PROTOSS_CYAN_RGB}, 0.45)`}
      >
        <Box
          w="100%"
          h="100%"
          clipPath={chamferClip(CHAMFER.md + 5)}
          bg={PROTOSS_PANEL_BG}
        />
      </Box>
      <ChamferPlate
        position="relative"
        h="100%"
        chamfer={CHAMFER.md}
        corners="tl-br"
        edge={GOLD_EDGE}
        edgeWidth={2}
      >
        <Image
          src="/images/tony.png"
          alt="Tony Tin Nguyen"
          fill
          sizes="140px"
          style={{ objectFit: 'cover' }}
          priority
        />
        {/* in-game portrait grade: cool psionic tint + dark base */}
        <Box
          aria-hidden
          position="absolute"
          inset="0"
          pointerEvents="none"
          bgImage={`linear-gradient(180deg, rgba(${PROTOSS_CYAN_RGB}, 0.14) 0%, rgba(${PROTOSS_CYAN_RGB}, 0.04) 45%, rgba(${PROTOSS_PANEL_RGB}, 0.72) 100%)`}
          boxShadow={`inset 0 0 22px rgba(${PROTOSS_PANEL_RGB}, 0.85)`}
        />
      </ChamferPlate>
    </Box>

    <Box
      mt="10px"
      clipPath={chamferClip(8)}
      bg={`rgba(${KHALA_GOLD_RGB}, 0.1)`}
      boxShadow={`inset 0 0 0 1px rgba(${KHALA_GOLD_RGB}, 0.45)`}
      px={2}
      py="3px"
    >
      <Text
        fontFamily="mono"
        fontSize="9px"
        fontWeight="bold"
        letterSpacing="0.18em"
        color={PROTOSS_GOLD_LIGHT}
      >
        HIGH TEMPLAR
      </Text>
    </Box>
  </Box>
)

// Commander-select shell (LotV pass): outer hairline plate → gold frame line →
// navy body, all chamfered on four corners. Wings / gems / seam live outside
// the clipped stack because clip-path would eat them.
const CommanderFrame = ({ children, chamfer = HERO_CHAMFER, ...rest }) => (
  <Box position="relative" {...rest}>
    <Box
      aria-hidden
      position="absolute"
      inset="-5px"
      clipPath={clipAt(chamfer, 'all', 5)}
      bg={`rgba(${KHALA_GOLD_RGB}, 0.28)`}
      p="1px"
      pointerEvents="none"
    >
      <Box
        w="100%"
        h="100%"
        clipPath={clipAt(chamfer, 'all', 4)}
        bg={`rgba(${PROTOSS_PANEL_RGB}, 0.85)`}
      />
    </Box>

    <ChamferPlate
      position="relative"
      chamfer={chamfer}
      edge={GOLD_EDGE}
      edgeWidth={2}
      fill={BODY_FILL}
      innerShadow={`inset 0 0 80px rgba(${PROTOSS_CYAN_RGB}, 0.1), inset 0 2px 0 rgba(${PROTOSS_GOLD_LIGHT_RGB}, 0.45), inset 0 -18px 40px rgba(0, 0, 0, 0.45)`}
    >
      {/* static diagonal light shaft across the plate */}
      <Box
        aria-hidden
        position="absolute"
        inset="0"
        pointerEvents="none"
        bgImage={`linear-gradient(112deg, transparent 16%, rgba(${PROTOSS_GOLD_LIGHT_RGB}, 0.07) 28%, rgba(${PROTOSS_CYAN_RGB}, 0.11) 37%, rgba(${PROTOSS_GOLD_LIGHT_RGB}, 0.04) 44%, transparent 60%)`}
      />
      <Box position="relative">{children}</Box>
    </ChamferPlate>

    <ProtossFrameCorners size={30} />
    <ProtossCrystalGem bottom="-7px" left="34px" />
    <ProtossCrystalGem bottom="-7px" right="34px" />
    <Box
      aria-hidden
      className="protoss-seam"
      position="absolute"
      top="0"
      left="16%"
      right="16%"
      h="2px"
      pointerEvents="none"
    />
  </Box>
)

export default CommanderFrame
