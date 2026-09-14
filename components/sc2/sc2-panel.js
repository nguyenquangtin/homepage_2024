import { Box, Flex, Text } from '@chakra-ui/react'
import {
  CHAMFER,
  chamferClip,
  PALETTES,
  PROTOSS_CYAN,
  PROTOSS_CYAN_BRIGHT,
  PROTOSS_CYAN_RGB,
  PROTOSS_DEEP_GOLD,
  PROTOSS_GOLD_LIGHT_RGB,
  KHALA_GOLD_RGB,
  PROTOSS_PANEL_BG,
  PROTOSS_PANEL_RGB
} from '../../lib/site-theme-context'
import { ProtossFrameCorners, ProtossCrystalGem } from './protoss-ornament'

const sc2 = PALETTES.sc2

// Four corner brackets — SC2 selection frame (white angles on the active
// card). Render inside a position:relative parent. With `hoverReveal` the
// brackets stay hidden until the parent (role="group") is hovered.
export const Sc2CornerBrackets = ({
  hoverReveal = false,
  size = '14px',
  color = '#e8f8ff'
}) => (
  <>
    {[
      {
        top: '-2px',
        left: '-2px',
        borderTopWidth: '2px',
        borderLeftWidth: '2px'
      },
      {
        top: '-2px',
        right: '-2px',
        borderTopWidth: '2px',
        borderRightWidth: '2px'
      },
      {
        bottom: '-2px',
        left: '-2px',
        borderBottomWidth: '2px',
        borderLeftWidth: '2px'
      },
      {
        bottom: '-2px',
        right: '-2px',
        borderBottomWidth: '2px',
        borderRightWidth: '2px'
      }
    ].map((pos, i) => (
      <Box
        key={i}
        aria-hidden
        position="absolute"
        w={size}
        h={size}
        borderColor={color}
        borderStyle="solid"
        borderWidth="0"
        opacity={hoverReveal ? 0 : 1}
        _groupHover={hoverReveal ? { opacity: 1 } : undefined}
        transition="opacity 0.15s"
        pointerEvents="none"
        zIndex={1}
        {...pos}
      />
    ))}
  </>
)

// Tone presets — the frame is always gold; `cyan` only pushes the energy
// (header text, seam, inner glow) for live-data panels (LotV pass).
const TONES = {
  gold: {
    title: PROTOSS_CYAN,
    titleGlow: `0 0 8px rgba(${PROTOSS_CYAN_RGB}, 0.35)`,
    headerFill: `rgba(${KHALA_GOLD_RGB}, 0.07)`,
    innerGlow: `inset 0 0 24px rgba(${PROTOSS_CYAN_RGB}, 0.06)`,
    seam: 0.7
  },
  cyan: {
    title: PROTOSS_CYAN_BRIGHT,
    titleGlow: `0 0 10px rgba(${PROTOSS_CYAN_RGB}, 0.7)`,
    headerFill: `rgba(${PROTOSS_CYAN_RGB}, 0.09)`,
    innerGlow: `inset 0 0 34px rgba(${PROTOSS_CYAN_RGB}, 0.16)`,
    seam: 1
  }
}

// Command-console panel: THE frame system. An unclipped positioning root
// carries the ornaments (they would be cut away by clip-path), wrapping a
// 1px gold frame layer and the navy body, both chamfered TL+BR.
const Sc2Panel = ({
  title,
  meta,
  brackets = false,
  unpadded = false,
  tone = 'gold',
  dense = false,
  chamfer = CHAMFER.md,
  children,
  ...rest
}) => {
  const t = TONES[tone] || TONES.gold
  return (
    <Box position="relative" role={brackets ? 'group' : undefined} {...rest}>
      {/* outer hairline + dark gap, chamfered to track the 45° cuts. Sits
          behind the body because clip-path would eat an outer box-shadow. */}
      <Box
        aria-hidden
        position="absolute"
        inset="-4px"
        clipPath={chamferClip(chamfer + 4)}
        bg={`rgba(${KHALA_GOLD_RGB}, 0.25)`}
        p="1px"
        pointerEvents="none"
      >
        <Box
          w="100%"
          h="100%"
          clipPath={chamferClip(chamfer + 3)}
          bg={`rgba(${PROTOSS_PANEL_RGB}, 0.8)`}
        />
      </Box>

      {/* gold frame line — drawn as a 1px inlay so the 45° cut keeps its edge */}
      <Box
        position="relative"
        h="100%"
        clipPath={chamferClip(chamfer)}
        bg={`linear-gradient(150deg, rgba(${KHALA_GOLD_RGB}, 0.85), rgba(${KHALA_GOLD_RGB}, 0.45) 50%, ${PROTOSS_DEEP_GOLD})`}
        p="1px"
      >
        <Box
          h="100%"
          clipPath={chamferClip(chamfer - 1)}
          bg={PROTOSS_PANEL_BG}
          boxShadow={`${t.innerGlow}, inset 0 1px 0 rgba(${PROTOSS_GOLD_LIGHT_RGB}, 0.35)`}
        >
          {title && (
            <Flex
              px={dense ? 3 : 4}
              py={dense ? 1.5 : 2}
              bg={t.headerFill}
              borderBottom={`1px solid rgba(${KHALA_GOLD_RGB}, 0.35)`}
              justify="space-between"
              align="center"
            >
              <Text
                fontFamily="mono"
                fontSize="10px"
                color={t.title}
                textShadow={t.titleGlow}
                letterSpacing="0.15em"
                textTransform="uppercase"
              >
                &#9656; {title}
              </Text>
              {meta && (
                <Text fontFamily="mono" fontSize="10px" color={sc2.muted}>
                  {meta}
                </Text>
              )}
            </Flex>
          )}
          {unpadded ? children : <Box p={dense ? 3 : 4}>{children}</Box>}
        </Box>
      </Box>

      {/* Ornaments sit outside the clipped stack. TL+BR are chamfered, so
          only the square corners get a wing (#9 + LotV pass). */}
      <ProtossFrameCorners corners={['tr', 'bl']} />
      <ProtossCrystalGem bottom="-7px" left="24px" />
      <ProtossCrystalGem bottom="-7px" right="24px" />
      <Box
        aria-hidden
        className="protoss-seam"
        position="absolute"
        top="0"
        left="12%"
        right="12%"
        h="2px"
        opacity={t.seam}
        pointerEvents="none"
      />
      {brackets && <Sc2CornerBrackets hoverReveal />}
    </Box>
  )
}

export default Sc2Panel
