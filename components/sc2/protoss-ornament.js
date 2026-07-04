import { Box } from '@chakra-ui/react'
import {
  KHALA_GOLD,
  PROTOSS_CYAN,
  PROTOSS_DEEP_GOLD
} from '../../lib/site-theme-context'

// Corner transforms: mirror the top-left wing into each corner
const CORNERS = {
  tl: { top: '-3px', left: '-3px', transform: 'none' },
  tr: { top: '-3px', right: '-3px', transform: 'scaleX(-1)' },
  bl: { bottom: '-3px', left: '-3px', transform: 'scaleY(-1)' },
  br: { bottom: '-3px', right: '-3px', transform: 'scale(-1,-1)' }
}

// Ornate gold corner wing — Protoss frame flourish. Purely decorative.
export const ProtossCornerWing = ({ corner = 'tl', size = 26 }) => {
  const { transform, ...pos } = CORNERS[corner] || CORNERS.tl
  return (
    <Box
      aria-hidden
      position="absolute"
      pointerEvents="none"
      zIndex={1}
      style={{ transform }}
      {...pos}
    >
      <svg width={size} height={size} viewBox="0 0 26 26" fill="none">
        {/* outer gold wing */}
        <path
          d="M1 25 L1 9 L9 1 L25 1"
          stroke={KHALA_GOLD}
          strokeWidth="2.5"
          strokeLinecap="square"
        />
        {/* inner psionic energy trace */}
        <path
          d="M4 18 L4 10 L10 4 L18 4"
          stroke={PROTOSS_CYAN}
          strokeWidth="1"
          opacity="0.65"
        />
      </svg>
    </Box>
  )
}

// Small khaydarin crystal gem with pulsing cyan core (pulse defined in
// protoss-global.js, disabled under prefers-reduced-motion).
export const ProtossCrystalGem = ({ size = 10, ...pos }) => (
  <Box aria-hidden position="absolute" pointerEvents="none" zIndex={1} {...pos}>
    <svg width={size} height={size * 1.4} viewBox="0 0 10 14" fill="none">
      <polygon
        points="5,0 10,4 8,13 2,13 0,4"
        fill="#1a1030"
        stroke={PROTOSS_DEEP_GOLD}
        strokeWidth="1"
      />
      <polygon
        className="protoss-gem-core"
        points="5,2 8,4.5 7,11 3,11 2,4.5"
        fill={PROTOSS_CYAN}
        opacity="0.6"
      />
    </svg>
  </Box>
)

// Convenience: all four corner wings for a panel
export const ProtossFrameCorners = ({ size }) => (
  <>
    {Object.keys(CORNERS).map(c => (
      <ProtossCornerWing key={c} corner={c} size={size} />
    ))}
  </>
)
