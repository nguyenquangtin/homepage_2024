import { Box } from '@chakra-ui/react'
import { PROTOSS_CYAN_RGB, PROTOSS_TEAL_RGB } from '../lib/site-theme-context'

// Mission-briefing space backdrop (#19): planet seen from orbit with a
// cyan atmosphere rim (ref: LotV challenges screen). Pure static CSS —
// no animation cost, no reduced-motion concerns. Sits at the very back
// of the fixed layer stack (planet −3, psionic canvas −2, shield −1).
const PlanetHorizon = () => (
  <Box
    aria-hidden
    position="fixed"
    inset={0}
    zIndex={-3}
    pointerEvents="none"
    overflow="hidden"
  >
    {/* Deep-space nebula tint, upper left */}
    <Box
      position="absolute"
      top="-20%"
      left="-10%"
      w="70vmax"
      h="70vmax"
      borderRadius="full"
      background="radial-gradient(circle, rgba(40, 20, 80, 0.25), transparent 65%)"
    />

    {/* Planet body — huge circle rising from the bottom-right, only the
        upper arc is visible in the viewport */}
    <Box
      position="absolute"
      bottom="-130vmax"
      right="-60vmax"
      w="160vmax"
      h="160vmax"
      borderRadius="full"
      background={`radial-gradient(circle at 30% 25%, #0c1c30 0%, #071220 40%, #030810 75%)`}
      boxShadow={`0 0 90px 24px rgba(${PROTOSS_CYAN_RGB}, 0.22), inset 40px 60px 160px rgba(${PROTOSS_TEAL_RGB}, 0.18)`}
    />

    {/* Atmosphere rim highlight along the horizon arc */}
    <Box
      position="absolute"
      bottom="-130.4vmax"
      right="-60.4vmax"
      w="160.8vmax"
      h="160.8vmax"
      borderRadius="full"
      border={`1.5px solid rgba(${PROTOSS_CYAN_RGB}, 0.45)`}
      filter="blur(1px)"
    />
  </Box>
)

export default PlanetHorizon
