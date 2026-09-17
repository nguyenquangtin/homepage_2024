import {
  KHALA_GOLD,
  PROTOSS_CYAN,
  PROTOSS_CYAN_BRIGHT
} from '../../lib/site-theme-context'
import { ARMS } from './phase-smith-arms-energy-svg'

// Engineering light in scene units (viewBox 1200x450): two straight phase
// beams from the gauntlet emitters — the far hand keys into the slab, the
// near hand phase-welds a crystal component hovering above the keys inside
// a slowly spinning schematic ring — plus weld sparks and faint hex glyphs.
const PART = { cx: 776, cy: 364 }
const KEY_HIT = [700, 418]
const BEAMS = [
  { from: ARMS.far.tip, to: KEY_HIT, delay: '0s' },
  { from: ARMS.near.tip, to: [PART.cx - 12, PART.cy], delay: '-0.4s' }
]
const SPARKS = [
  { d: 'M 784 354 L 794 344', delay: '0s' },
  { d: 'M 790 370 L 802 374', delay: '-0.5s' },
  { d: 'M 768 378 L 762 390', delay: '-1.1s' },
  { d: 'M 762 354 L 752 348', delay: '-1.6s' },
  { d: 'M 704 412 L 712 402', delay: '-0.8s' },
  { d: 'M 694 424 L 686 432', delay: '-1.9s' }
]
const GLYPHS = [
  { cx: 740, cy: 326, r: 9, o: 0.3 },
  { cx: 762, cy: 306, r: 6, o: 0.22 },
  { cx: 726, cy: 302, r: 5, o: 0.18 }
]

const hex = (cx, cy, r) =>
  [30, 90, 150, 210, 270, 330]
    .map(a => {
      const t = (a * Math.PI) / 180
      return `${(cx + r * Math.cos(t)).toFixed(1)},${(cy + r * Math.sin(t)).toFixed(1)}`
    })
    .join(' ')

const Beam = ({ id, from, to, delay }) => {
  const line = { x1: from[0], y1: from[1], x2: to[0], y2: to[1] }
  return (
    <g strokeLinecap="round">
      <line {...line} stroke={PROTOSS_CYAN} strokeOpacity="0.3" strokeWidth="7" />
      <line {...line} stroke={PROTOSS_CYAN} strokeWidth="2.4" />
      {/* the flow line is the only thing that moves; static it is still dashed */}
      <line
        className="tc-beam"
        {...line}
        stroke={PROTOSS_CYAN_BRIGHT}
        strokeWidth="1.6"
        style={{ animationDelay: delay }}
      />
      <circle cx={to[0]} cy={to[1]} r="14" fill={`url(#${id('hand-glow')})`} />
    </g>
  )
}

const PhaseBeams = ({ id }) => (
  <g fill="none">
    {GLYPHS.map(g => (
      <polygon
        key={g.cx}
        points={hex(g.cx, g.cy, g.r)}
        stroke={PROTOSS_CYAN}
        strokeOpacity={g.o}
        strokeWidth="1.2"
      />
    ))}
    {BEAMS.map((b, i) => (
      <Beam key={i} id={id} {...b} />
    ))}

    {/* the component under construction: gold bracket around a crystal */}
    <circle
      className="tc-pulse"
      cx={PART.cx}
      cy={PART.cy}
      r="24"
      fill={`url(#${id('hand-glow')})`}
    />
    <g className="tc-schematic" stroke={PROTOSS_CYAN} strokeOpacity="0.55">
      <circle cx={PART.cx} cy={PART.cy} r="26" strokeWidth="1.2" strokeDasharray="6 5" />
      <circle cx={PART.cx} cy={PART.cy} r="19" strokeWidth="0.8" strokeOpacity="0.35" />
      <path
        d={`M ${PART.cx} ${PART.cy - 26} v -5 M ${PART.cx} ${PART.cy + 26} v 5 M ${PART.cx - 26} ${PART.cy} h -5 M ${PART.cx + 26} ${PART.cy} h 5`}
        strokeWidth="1.5"
      />
    </g>
    <polygon
      points={hex(PART.cx, PART.cy, 13)}
      stroke={KHALA_GOLD}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <polygon
      points={`${PART.cx},${PART.cy - 10} ${PART.cx + 8},${PART.cy} ${PART.cx},${PART.cy + 10} ${PART.cx - 8},${PART.cy}`}
      fill={`url(#${id('crystal')})`}
      stroke={PROTOSS_CYAN_BRIGHT}
      strokeWidth="1"
    />

    {SPARKS.map(s => (
      <path
        key={s.d}
        className="tc-spark"
        d={s.d}
        stroke={PROTOSS_CYAN_BRIGHT}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0"
        style={{ animationDelay: s.delay }}
      />
    ))}
  </g>
)

export default PhaseBeams
