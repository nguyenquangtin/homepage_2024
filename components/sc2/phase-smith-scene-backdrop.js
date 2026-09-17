import {
  KHALA_GOLD,
  PROTOSS_CYAN,
  PROTOSS_CYAN_BRIGHT,
  PROTOSS_TEAL_RGB
} from '../../lib/site-theme-context'
import { SCENE_HEX } from './phase-smith-scene-style'

// Deterministic scatter so SSR and client render the same starfield
const seeded = seed => () => {
  seed = (seed * 16807) % 2147483647
  return seed / 2147483647
}
const rnd = seeded(20260917)
const STARS = Array.from({ length: 46 }, (_, i) => ({
  x: Math.round(rnd() * 1300 - 50),
  y: Math.round(rnd() * 420 - 20),
  r: (0.6 + rnd() * 1.3).toFixed(1),
  o: (0.25 + rnd() * 0.6).toFixed(2),
  twinkle: i % 6 === 0,
  delay: (rnd() * 3).toFixed(1)
}))
const MOTES = Array.from({ length: 14 }, () => ({
  x: Math.round(rnd() * 1200),
  y: Math.round(140 + rnd() * 300),
  r: (1.2 + rnd() * 1.8).toFixed(1),
  dur: (6 + rnd() * 5).toFixed(1),
  delay: (rnd() * 8).toFixed(1)
}))

// Deep-space ground, nebulae, starfield, planet horizon and two distant
// khaydarin crystals — everything behind the phase-smith and the console.
export const PhaseSmithSceneBackdrop = ({ id }) => (
  <g>
    <defs>
      <linearGradient id={id('space')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={SCENE_HEX.spaceTop} />
        <stop offset="0.7" stopColor={SCENE_HEX.space} />
      </linearGradient>
      <radialGradient id={id('nebula-cyan')}>
        <stop
          offset="0"
          stopColor={`rgb(${PROTOSS_TEAL_RGB})`}
          stopOpacity="0.2"
        />
        <stop
          offset="1"
          stopColor={`rgb(${PROTOSS_TEAL_RGB})`}
          stopOpacity="0"
        />
      </radialGradient>
      <radialGradient id={id('nebula-indigo')}>
        <stop offset="0" stopColor={SCENE_HEX.nebula} stopOpacity="0.55" />
        <stop offset="1" stopColor={SCENE_HEX.nebula} stopOpacity="0" />
      </radialGradient>
      <linearGradient id={id('planet')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={KHALA_GOLD} stopOpacity="0.22" />
        <stop offset="0.02" stopColor={PROTOSS_CYAN} stopOpacity="0.09" />
        <stop offset="0.07" stopColor={SCENE_HEX.space} stopOpacity="0.96" />
      </linearGradient>
      <linearGradient id={id('crystal-far')} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={PROTOSS_CYAN_BRIGHT} stopOpacity="0.5" />
        <stop offset="1" stopColor={PROTOSS_CYAN} stopOpacity="0.08" />
      </linearGradient>
    </defs>

    <rect
      x="-200"
      y="-200"
      width="1600"
      height="900"
      fill={`url(#${id('space')})`}
    />
    <ellipse
      cx="900"
      cy="120"
      rx="520"
      ry="240"
      fill={`url(#${id('nebula-cyan')})`}
    />
    <ellipse
      cx="260"
      cy="330"
      rx="520"
      ry="300"
      fill={`url(#${id('nebula-indigo')})`}
    />

    {STARS.map((s, i) => (
      <circle
        key={i}
        className={s.twinkle ? 'tc-star' : undefined}
        cx={s.x}
        cy={s.y}
        r={s.r}
        fill={PROTOSS_CYAN_BRIGHT}
        opacity={s.o}
        style={s.twinkle ? { animationDelay: `${s.delay}s` } : undefined}
      />
    ))}

    {/* planet horizon rising to the right — gold rim, thin atmosphere */}
    <circle cx="1350" cy="1900" r="1650" fill={`url(#${id('planet')})`} />
    <circle
      cx="1350"
      cy="1900"
      r="1650"
      fill="none"
      stroke={KHALA_GOLD}
      strokeOpacity="0.35"
      strokeWidth="1.5"
    />

    {/* distant floating crystals fill the desktop-only left band */}
    {[
      [110, 250, 1, '0s'],
      [175, 165, 0.7, '-2.5s'],
      [70, 372, 0.5, '-4s']
    ].map(([cx, cy, k, delay], i) => (
      /* CSS transform would override the SVG transform attribute, so the
         bob class sits on an inner group */
      <g key={i} transform={`translate(${cx} ${cy}) scale(${k})`}>
        <g className="tc-crystal" style={{ animationDelay: delay }}>
          <polygon
            points="0,-46 16,-10 10,40 -10,40 -16,-10"
            fill={`url(#${id('crystal-far')})`}
            stroke={KHALA_GOLD}
            strokeOpacity="0.55"
            strokeWidth="1.2"
          />
          <line
            x1="0"
            y1="-40"
            x2="0"
            y2="34"
            stroke={PROTOSS_CYAN_BRIGHT}
            strokeOpacity="0.35"
          />
        </g>
      </g>
    ))}
  </g>
)

// Drifting psionic motes — rendered last so they float over everything
export const PhaseSmithSceneMotes = () => (
  <g aria-hidden>
    {MOTES.map((m, i) => (
      <circle
        key={i}
        className="tc-mote"
        cx={m.x}
        cy={m.y}
        r={m.r}
        fill={PROTOSS_CYAN}
        opacity="0.35"
        style={{
          animationDuration: `${m.dur}s`,
          animationDelay: `-${m.delay}s`
        }}
      />
    ))}
  </g>
)
