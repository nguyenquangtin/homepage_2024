import {
  KHALA_GOLD,
  PROTOSS_BRONZE,
  PROTOSS_CYAN,
  PROTOSS_CYAN_BRIGHT,
  PROTOSS_GOLD_LIGHT
} from '../../lib/site-theme-context'
import * as P from './phase-smith-figure-paths'

// Head of the phase-smith: open crested helm over a bare protoss face, a
// glowing tech visor across the eyes and a loupe eyepiece. No hood, no
// mystic slit eyes — this is an engineer's kit.
const PhaseSmithHead = ({ id }) => {
  const url = name => `url(#${id(name)})`
  return (
    <g>
      {/* helm: gold plate over crown + back-swept cranium */}
      <path
        d={P.HELM}
        fill={url('gold')}
        stroke={PROTOSS_BRONZE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d={P.HELM_CREST}
        fill="none"
        stroke={PROTOSS_GOLD_LIGHT}
        strokeOpacity="0.85"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {P.HELM_VENTS.map(d => (
        <path
          key={d}
          d={d}
          stroke={PROTOSS_CYAN}
          strokeOpacity="0.7"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}

      {/* face: bare skin, rim-lit by the screen on the right */}
      <path d={P.FACE} fill={url('face')} />
      <path
        d={P.FACE_RIM}
        fill="none"
        stroke={PROTOSS_CYAN}
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d={P.CHIN_STRAP}
        fill="none"
        stroke={KHALA_GOLD}
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />
      <path
        d={P.HELM_EDGE}
        fill="none"
        stroke={PROTOSS_GOLD_LIGHT}
        strokeOpacity="0.7"
        strokeWidth="1.5"
      />

      {/* visor: pulsing glow, cyan band, gold-ringed eyepiece */}
      <ellipse
        className="tc-pulse"
        cx="474"
        cy="132"
        rx="40"
        ry="20"
        fill={url('hand-glow')}
      />
      <polygon
        points={P.VISOR}
        fill={url('visor')}
        stroke={PROTOSS_CYAN}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d={P.EYEPIECE_ARM}
        stroke={KHALA_GOLD}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle
        cx={P.EYEPIECE.cx}
        cy={P.EYEPIECE.cy}
        r={P.EYEPIECE.r}
        fill={PROTOSS_CYAN_BRIGHT}
        stroke={KHALA_GOLD}
        strokeWidth="2.5"
      />
    </g>
  )
}

export default PhaseSmithHead
