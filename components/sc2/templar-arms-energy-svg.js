import { PROTOSS_CYAN, PROTOSS_CYAN_BRIGHT } from '../../lib/site-theme-context'
import { SCENE_HEX } from './templar-scene-style'

// Arm geometry in scene units (viewBox 1200x450). The far arm crosses the
// waist in 3/4 view; the near arm comes off the front pauldron. Hands hover
// ~60 units above the key row so the arcs have room to crackle.
const ARMS = {
  far: {
    sleeve: 'M 372 200 C 410 246, 470 300, 530 324 C 556 334, 580 342, 596 346',
    width: 22,
    bracer: '578,356 590,359 598,332 586,329',
    palm: { cx: 612, cy: 352, rotate: 38 },
    fingers: [
      [616, 356, 631, 375],
      [620, 352, 636, 366],
      [622, 346, 638, 355]
    ],
    shade: 0.8
  },
  near: {
    sleeve: 'M 518 204 C 548 226, 580 256, 598 290 C 612 314, 632 326, 654 332',
    width: 26,
    bracer: '632,332 641,340 660,318 651,310',
    palm: { cx: 668, cy: 346, rotate: 40 },
    fingers: [
      [672, 350, 690, 368],
      [676, 346, 696, 359],
      [678, 340, 698, 348]
    ],
    shade: 1
  }
}

export const TemplarArm = ({ id, side }) => {
  const a = ARMS[side]
  return (
    <g opacity={a.shade}>
      {/* lit edge first so the sleeve separates from the robe behind it */}
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
      <polygon points={a.bracer} fill={`url(#${id('gold')})`} />
      <ellipse
        cx={a.palm.cx}
        cy={a.palm.cy}
        rx="12"
        ry="8"
        transform={`rotate(${a.palm.rotate} ${a.palm.cx} ${a.palm.cy})`}
        fill={SCENE_HEX.skin}
        stroke={SCENE_HEX.skinLit}
        strokeOpacity="0.6"
        strokeWidth="1"
      />
      {a.fingers.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={SCENE_HEX.skinLit}
          strokeWidth="5"
          strokeLinecap="round"
        />
      ))}
      {/* channelling glow in the palm — cyan energy gathering */}
      <circle
        className="tc-pulse"
        cx={a.palm.cx + 14}
        cy={a.palm.cy + 10}
        r="30"
        fill={`url(#${id('hand-glow')})`}
        opacity="0.8"
      />
    </g>
  )
}

// Lightning from fingertips into the khaydarin keys, plus stray crackle
// around the hood. Dash flow lives in .tc-arc; static state is still dashed.
const ARCS = [
  { d: '694,372 702,384 696,392 712,398 720,404', delay: '0s' },
  { d: '700,362 714,378 704,392 718,410 700,420', delay: '-0.4s' },
  { d: '702,350 722,368 716,384 740,396 760,404', delay: '-0.8s' },
  { d: '634,378 646,392 640,404 660,420', delay: '-0.2s' },
  { d: '638,368 654,382 650,394 672,398 680,404', delay: '-0.6s' }
]
const CRACKLE = [
  { d: '372,60 356,76 366,88 348,104', delay: '0s' },
  { d: '494,90 510,104 500,118 516,136', delay: '-1.7s' },
  { d: '330,190 318,204 328,214 314,232', delay: '-2.6s' }
]

export const PsionicEnergy = () => (
  <g fill="none" strokeLinejoin="round" strokeLinecap="round">
    {ARCS.map((a, i) => (
      <g key={i}>
        <polyline
          points={a.d}
          stroke={PROTOSS_CYAN}
          strokeOpacity="0.35"
          strokeWidth="4"
        />
        <polyline
          className="tc-arc"
          points={a.d}
          stroke={PROTOSS_CYAN_BRIGHT}
          strokeWidth="1.6"
          opacity="0.85"
          style={{ animationDelay: a.delay }}
        />
      </g>
    ))}
    {CRACKLE.map((c, i) => (
      <polyline
        key={i}
        className="tc-crackle"
        points={c.d}
        stroke={PROTOSS_CYAN_BRIGHT}
        strokeWidth="1.4"
        opacity="0"
        style={{ animationDelay: c.delay }}
      />
    ))}
  </g>
)
