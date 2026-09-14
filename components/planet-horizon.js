import { Box } from '@chakra-ui/react'
import {
  PROTOSS_CYAN_RGB,
  PROTOSS_TEAL_RGB,
  KHALA_GOLD_RGB
} from '../lib/site-theme-context'

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
    {/* Deep-space nebula tint, upper left (LotV pass: deeper purple) */}
    <Box
      position="absolute"
      top="-20%"
      left="-10%"
      w="70vmax"
      h="70vmax"
      borderRadius="full"
      background="radial-gradient(circle, rgba(70, 30, 120, 0.28), transparent 65%)"
    />

    {/* Counter nebula, lower right — teal haze behind the planet (LotV pass) */}
    <Box
      position="absolute"
      bottom="-25%"
      right="-15%"
      w="80vmax"
      h="80vmax"
      borderRadius="full"
      background={`radial-gradient(circle, rgba(${PROTOSS_TEAL_RGB}, 0.14), transparent 62%)`}
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

    {/* Atmosphere rim — cyan energy line on the arc (LotV pass: brighter) */}
    <Box
      position="absolute"
      bottom="-130.4vmax"
      right="-60.4vmax"
      w="160.8vmax"
      h="160.8vmax"
      borderRadius="full"
      border={`1.5px solid rgba(${PROTOSS_CYAN_RGB}, 0.55)`}
      filter="blur(1px)"
    />

    {/* Gold chrome line just outside the rim — reads as plated horizon */}
    <Box
      position="absolute"
      bottom="-131vmax"
      right="-61vmax"
      w="162vmax"
      h="162vmax"
      borderRadius="full"
      border={`1px solid rgba(${KHALA_GOLD_RGB}, 0.35)`}
      filter="blur(2px)"
    />

    {/* Faint diagonal light shaft across the whole viewport (LotV pass) */}
    <Box
      position="absolute"
      inset={0}
      background={`linear-gradient(115deg, transparent 40%, rgba(${PROTOSS_CYAN_RGB}, 0.05) 50%, transparent 60%)`}
    />

    {/* Vignette — darkens the edges so the content column reads brighter */}
    <Box
      position="absolute"
      inset={0}
      background="radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.55) 100%)"
    />
  </Box>
)

export default PlanetHorizon
