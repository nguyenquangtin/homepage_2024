import { useId } from 'react'
import { Box, chakra, useBreakpointValue } from '@chakra-ui/react'
import { sceneSx } from './templar-scene-style'
import {
  TemplarSceneBackdrop,
  TemplarSceneMotes
} from './templar-scene-backdrop'
import TemplarFigure from './templar-figure-svg'
import TemplarConsole, { SCREEN } from './templar-console-svg'

export { SCREEN }

// Scene units: 1200x450 (16:6). Phones get a 4:3 crop of the same drawing
// centred on templar + console; the backdrop is painted well past the
// viewBox so the crop never shows a hard edge.
export const VIEWBOX = {
  desktop: '0 0 1200 450',
  mobile: '300 -10 780 585'
}
const ASPECT = { base: '4 / 3', md: '8 / 3' }

const ARIA_LABEL =
  'Tony as a Protoss High Templar, hood glowing, channelling psionic energy into a floating khaydarin console while a holographic screen shows his current work.'

// The cinematic banner artwork. `screen` is rendered inside the holo-screen
// slot (see SCREEN in templar-console-svg.js). Gradient ids are prefixed
// with React's useId so several scenes on one page never collide.
const TemplarConsoleScene = ({ screen, ...rest }) => {
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
        sx={sceneSx}
      >
        <TemplarSceneBackdrop id={id} />
        <TemplarConsole id={id}>{screen}</TemplarConsole>
        <TemplarFigure id={id} />
        <TemplarSceneMotes />
      </chakra.svg>
    </Box>
  )
}

export default TemplarConsoleScene
