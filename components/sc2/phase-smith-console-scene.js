import { useId } from 'react'
import { Box, chakra, useBreakpointValue } from '@chakra-ui/react'
import { sceneSx } from './phase-smith-scene-style'
import {
  PhaseSmithSceneBackdrop,
  PhaseSmithSceneMotes
} from './phase-smith-scene-backdrop'
import PhaseSmithFigure from './phase-smith-figure-svg'
import PhaseSmithConsole, { SCREEN } from './phase-smith-console-svg'

export { SCREEN }

// Scene units: 1200x450 (16:6). Phones get a 4:3 crop of the same drawing
// centred on phase-smith + console; the backdrop is painted well past the
// viewBox so the crop never shows a hard edge.
export const VIEWBOX = {
  desktop: '0 0 1200 450',
  mobile: '300 -10 780 585'
}
const ASPECT = { base: '4 / 3', md: '8 / 3' }

const ARIA_LABEL =
  'Tony as a Protoss master phase-smith in engineer armor, visor glowing, using phase-beam gauntlets at a floating khaydarin console while a holographic screen shows his current work.'

// The cinematic banner artwork. `screen` is rendered inside the holo-screen
// slot (see SCREEN in phase-smith-console-svg.js). Gradient ids are prefixed
// with React's useId so several scenes on one page never collide.
// `paused` freezes all CSS loops (e.g. while the banner is off-screen).
const PhaseSmithConsoleScene = ({ screen, paused = false, ...rest }) => {
  const uid = useId().replace(/:/g, '')
  const id = name => `${uid}-${name}`
  // md fallback keeps SSR and the first client paint identical (see
  // protoss-warp-in.js for the same hydration reasoning)
  const viewBox = useBreakpointValue(
    { base: VIEWBOX.mobile, md: VIEWBOX.desktop },
    { fallback: 'md', ssr: true }
  )

  return (
    <Box position="relative" w="100%" sx={{ aspectRatio: ASPECT }} {...rest}>
      <chakra.svg
        role="img"
        aria-label={ARIA_LABEL}
        focusable="false"
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid slice"
        position="absolute"
        inset="0"
        w="100%"
        h="100%"
        display="block"
        data-paused={paused || undefined}
        sx={sceneSx}
      >
        <PhaseSmithSceneBackdrop id={id} />
        <PhaseSmithConsole id={id}>{screen}</PhaseSmithConsole>
        <PhaseSmithFigure id={id} />
        <PhaseSmithSceneMotes />
      </chakra.svg>
    </Box>
  )
}

export default PhaseSmithConsoleScene
