import {
  KHALA_GOLD,
  PROTOSS_BRONZE,
  PROTOSS_CYAN,
  PROTOSS_CYAN_BRIGHT,
  PROTOSS_DEEP_GOLD,
  PROTOSS_GOLD_LIGHT
} from '../../lib/site-theme-context'
import { SCENE_HEX } from './phase-smith-scene-style'

// Gradients for the phase-smith figure (suit, gold plating, skin, visor,
// leg fade, rim light). Ids are prefixed by the scene so instances never clash.
const PhaseSmithFigureDefs = ({ id }) => (
  <defs>
    <radialGradient id={id('hand-glow')}>
      <stop offset="0" stopColor={PROTOSS_CYAN_BRIGHT} stopOpacity="0.6" />
      <stop offset="1" stopColor={PROTOSS_CYAN} stopOpacity="0" />
    </radialGradient>
    <linearGradient id={id('suit')} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={SCENE_HEX.suitLit} />
      <stop offset="0.45" stopColor={SCENE_HEX.suit} />
      <stop offset="1" stopColor={SCENE_HEX.suitDeep} />
    </linearGradient>
    <linearGradient id={id('sleeve')} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor={SCENE_HEX.suitLit} />
      <stop offset="1" stopColor={SCENE_HEX.suit} />
    </linearGradient>
    {/* legs fade out below the knee, like the old robe hem had no feet */}
    <linearGradient id={id('leg')} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={SCENE_HEX.suit} />
      <stop offset="0.5" stopColor={SCENE_HEX.suitDeep} />
      <stop offset="1" stopColor={SCENE_HEX.suitDeep} stopOpacity="0" />
    </linearGradient>
    <linearGradient id={id('gold')} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor={PROTOSS_GOLD_LIGHT} />
      <stop offset="0.35" stopColor={KHALA_GOLD} />
      <stop offset="0.7" stopColor={PROTOSS_DEEP_GOLD} />
      <stop offset="1" stopColor={PROTOSS_BRONZE} />
    </linearGradient>
    <radialGradient id={id('face')} cx="0.7" cy="0.4" r="0.8">
      <stop offset="0" stopColor={SCENE_HEX.skinLit} />
      <stop offset="1" stopColor={SCENE_HEX.skin} />
    </radialGradient>
    <linearGradient id={id('visor')} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor={PROTOSS_CYAN} />
      <stop offset="0.5" stopColor={PROTOSS_CYAN_BRIGHT} />
      <stop offset="1" stopColor={PROTOSS_CYAN} />
    </linearGradient>
    <linearGradient id={id('cyan-rim')} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={PROTOSS_CYAN} stopOpacity="0.75" />
      <stop offset="1" stopColor={PROTOSS_CYAN} stopOpacity="0" />
    </linearGradient>
    <linearGradient id={id('crystal')} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={PROTOSS_CYAN_BRIGHT} />
      <stop offset="1" stopColor={PROTOSS_CYAN} />
    </linearGradient>
  </defs>
)

export default PhaseSmithFigureDefs
