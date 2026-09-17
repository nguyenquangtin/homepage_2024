import {
  KHALA_GOLD,
  PROTOSS_BRONZE,
  PROTOSS_CYAN,
  PROTOSS_CYAN_BRIGHT
} from '../../lib/site-theme-context'
import { SCENE_HEX } from './phase-smith-scene-style'

// Arm geometry in scene units (viewBox 1200x450). The far arm crosses the
// waist in 3/4 view (drawn behind the torso, so only its forearm shows);
// the near arm comes off the front pauldron. Each arm is a navy sleeve with
// an optional upper-arm plate, an elbow cop and a chunky plated
// tool gauntlet whose emitter crystal fires the phase beam (see
// phase-smith-phase-beams-svg.js — `tip` is where that beam starts).
export const ARMS = {
  far: {
    sleeve: 'M 372 200 C 410 246, 470 300, 530 324 C 556 334, 580 342, 596 346',
    width: 22,
    elbow: [532, 324],
    gauntlet: '587,328 642,344 650,358 638,372 630,380 577,356',
    knuckle: 'M 596 336 L 636 350',
    emitter: '640,352 654,358 650,372 636,366',
    tip: [654, 362],
    fingers: [
      [632, 380, 646, 394],
      [642, 374, 660, 386]
    ],
    shade: 0.8
  },
  near: {
    sleeve: 'M 518 204 C 548 226, 580 256, 598 290 C 612 314, 632 326, 654 332',
    width: 26,
    upperPlate: '548,232 562,220 596,258 582,272',
    elbow: [600, 292],
    gauntlet: '643,314 699,338 708,354 696,368 681,374 629,338',
    knuckle: 'M 652 322 L 694 346',
    emitter: '698,340 712,348 708,362 694,356',
    tip: [712, 352],
    fingers: [
      [688, 372, 704, 386],
      [698, 366, 716, 378]
    ],
    shade: 1
  }
}

const hex = (cx, cy, r) =>
  [0, 60, 120, 180, 240, 300]
    .map(a => {
      const t = (a * Math.PI) / 180
      return `${(cx + r * Math.cos(t)).toFixed(1)},${(cy + r * Math.sin(t)).toFixed(1)}`
    })
    .join(' ')

// Gold plate with a bronze edge; used for every armour piece on the arm
const Plate = ({ id, points }) => (
  <polygon
    points={points}
    fill={`url(#${id('gold')})`}
    stroke={PROTOSS_BRONZE}
    strokeWidth="1.5"
    strokeLinejoin="round"
  />
)

export const PhaseSmithArm = ({ id, side }) => {
  const a = ARMS[side]
  return (
    <g opacity={a.shade}>
      {/* lit edge first so the sleeve separates from the suit behind it */}
      <path
        d={a.sleeve}
        fill="none"
        stroke={SCENE_HEX.cordLit}
        strokeWidth={a.width + 3}
        strokeLinecap="round"
      />
      <path
        d={a.sleeve}
        fill="none"
        stroke={`url(#${id('sleeve')})`}
        strokeWidth={a.width}
        strokeLinecap="round"
      />
      {a.upperPlate && <Plate id={id} points={a.upperPlate} />}
      <Plate id={id} points={hex(a.elbow[0], a.elbow[1], 11)} />

      {/* tool gauntlet: plated fingers under, chunky plate over, emitter */}
      {a.fingers.map(([x1, y1, x2, y2], i) => (
        <g key={i}>
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={PROTOSS_BRONZE}
            strokeWidth="8"
            strokeLinecap="round"
          />
          <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={KHALA_GOLD}
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
      ))}
      <Plate id={id} points={a.gauntlet} />
      <path
        d={a.knuckle}
        fill="none"
        stroke={PROTOSS_CYAN}
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />
      <circle
        className="tc-pulse"
        cx={a.tip[0]}
        cy={a.tip[1]}
        r="22"
        fill={`url(#${id('hand-glow')})`}
        opacity="0.9"
      />
      <polygon
        points={a.emitter}
        fill={`url(#${id('crystal')})`}
        stroke={PROTOSS_CYAN_BRIGHT}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </g>
  )
}
