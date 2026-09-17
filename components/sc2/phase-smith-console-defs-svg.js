import {
  KHALA_GOLD,
  PROTOSS_BRONZE,
  PROTOSS_CYAN,
  PROTOSS_CYAN_BRIGHT,
  PROTOSS_PANEL_RGB
} from '../../lib/site-theme-context'
import { SCENE_HEX } from './phase-smith-scene-style'

// Gradients, scanline pattern and screen clip for the holo-console.
// `screen` is the SCREEN rect from phase-smith-console-svg.js.
const PhaseSmithConsoleDefs = ({ id, screen }) => (
  <defs>
    <radialGradient id={id('screen-glow')}>
      <stop offset="0" stopColor={PROTOSS_CYAN} stopOpacity="0.3" />
      <stop offset="1" stopColor={PROTOSS_CYAN} stopOpacity="0" />
    </radialGradient>
    <linearGradient id={id('cone')} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={PROTOSS_CYAN} stopOpacity="0.05" />
      <stop offset="1" stopColor={PROTOSS_CYAN} stopOpacity="0.45" />
    </linearGradient>
    <linearGradient id={id('slab')} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={SCENE_HEX.raisedTop} />
      <stop offset="1" stopColor={SCENE_HEX.raisedBottom} />
    </linearGradient>
    <linearGradient id={id('plating')} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={KHALA_GOLD} />
      <stop offset="1" stopColor={PROTOSS_BRONZE} />
    </linearGradient>
    <linearGradient id={id('emitter')} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={PROTOSS_CYAN_BRIGHT} />
      <stop offset="1" stopColor={PROTOSS_CYAN} stopOpacity="0.5" />
    </linearGradient>
    <linearGradient id={id('sweep')} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={PROTOSS_CYAN} stopOpacity="0" />
      <stop offset="0.5" stopColor={PROTOSS_CYAN} stopOpacity="0.35" />
      <stop offset="1" stopColor={PROTOSS_CYAN} stopOpacity="0" />
    </linearGradient>
    <pattern
      id={id('scanlines')}
      width="4"
      height="4"
      patternUnits="userSpaceOnUse"
    >
      <rect
        width="4"
        height="2"
        fill={`rgb(${PROTOSS_PANEL_RGB})`}
        opacity="0.22"
      />
    </pattern>
    <clipPath id={id('screen-clip')}>
      <rect x={screen.x} y={screen.y} width={screen.w} height={screen.h} />
    </clipPath>
  </defs>
)

export default PhaseSmithConsoleDefs
