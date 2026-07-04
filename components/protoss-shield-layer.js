import { Box } from '@chakra-ui/react'
import { PROTOSS_CYAN_RGB } from '../lib/site-theme-context'

// Protoss plasma-shield background layer (#16): translucent cyan hexagonal
// energy field with a slow shimmer and occasional expanding ripples.
// Pure SVG/CSS (GPU-cheap); animations defined in protoss-global.js and
// disabled under prefers-reduced-motion. Sits above the psionic canvas,
// below all content.

// Pointy-top hexagon tile, 28px wide — repeated via SVG <pattern>
const HEX_PATH = 'M14 0 L28 8 L28 24 L14 32 L0 24 L0 8 Z'

const ProtossShieldLayer = () => (
  <Box
    aria-hidden
    position="fixed"
    inset={0}
    zIndex={-1}
    pointerEvents="none"
    overflow="hidden"
  >
    {/* Hexagonal energy lattice */}
    <svg width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <pattern
          id="protoss-hex-lattice"
          width="42"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path
            d={HEX_PATH}
            transform="translate(7, 8)"
            fill="none"
            stroke={`rgba(${PROTOSS_CYAN_RGB}, 0.05)`}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#protoss-hex-lattice)"
        className="protoss-shield-shimmer"
      />
    </svg>

    {/* Expanding shield ripples — staggered, very low opacity */}
    <Box
      className="protoss-shield-ripple"
      position="absolute"
      top="30%"
      left="20%"
      w="40vmax"
      h="40vmax"
      borderRadius="full"
      border={`1px solid rgba(${PROTOSS_CYAN_RGB}, 0.25)`}
      boxShadow={`0 0 40px rgba(${PROTOSS_CYAN_RGB}, 0.08) inset`}
    />
    <Box
      className="protoss-shield-ripple"
      position="absolute"
      top="55%"
      left="65%"
      w="34vmax"
      h="34vmax"
      borderRadius="full"
      border={`1px solid rgba(${PROTOSS_CYAN_RGB}, 0.2)`}
      style={{ animationDelay: '3.5s' }}
    />
  </Box>
)

export default ProtossShieldLayer
