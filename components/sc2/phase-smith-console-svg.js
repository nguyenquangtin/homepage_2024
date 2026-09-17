import {
  KHALA_GOLD,
  PROTOSS_CYAN,
  PROTOSS_CYAN_BRIGHT,
  PROTOSS_DEEP_GOLD,
  PROTOSS_GOLD_LIGHT,
  PROTOSS_PANEL_RGB
} from '../../lib/site-theme-context'
import PhaseSmithConsoleDefs from './phase-smith-console-defs-svg'

// SCREEN CONTRACT — the holographic display, in scene units (viewBox
// 1200x450). Task panels render inside a nested <svg> whose local
// coordinate system is 0..SCREEN.w x 0..SCREEN.h (500 x 300); anything
// outside is clipped. See plans/.../design-spec.md for the full contract.
export const SCREEN = { x: 640, y: 28, w: 500, h: 300 }
const FRAME_PAD = 6
const FRAME_CHAMFER = 14

// Four-corner chamfered rectangle as a points string
const chamferPoints = (x, y, w, h, c) =>
  [
    [x + c, y],
    [x + w - c, y],
    [x + w, y + c],
    [x + w, y + h - c],
    [x + w - c, y + h],
    [x + c, y + h],
    [x, y + h - c],
    [x, y + c]
  ]
    .map(p => p.join(','))
    .join(' ')

// Khaydarin key crystals: two staggered rows on the floating slab
const KEYS = [
  ...Array.from({ length: 12 }, (_, i) => [680 + i * 40, 404, i]),
  ...Array.from({ length: 13 }, (_, i) => [660 + i * 40, 420, i + 6])
]

const Bracket = ({ x, y, sx, sy }) => (
  <path
    d={`M ${x} ${y + 18 * sy} L ${x} ${y} L ${x + 18 * sx} ${y}`}
    fill="none"
    stroke={PROTOSS_CYAN_BRIGHT}
    strokeWidth="2"
  />
)

const PhaseSmithConsole = ({ id, children }) => {
  const fx = SCREEN.x - FRAME_PAD
  const fy = SCREEN.y - FRAME_PAD
  const fw = SCREEN.w + FRAME_PAD * 2
  const fh = SCREEN.h + FRAME_PAD * 2
  const url = name => `url(#${id(name)})`
  return (
    <g>
      <PhaseSmithConsoleDefs id={id} screen={SCREEN} />

      {/* hologram light spill + projection cone from the emitter */}
      <ellipse cx="890" cy="190" rx="360" ry="230" fill={url('screen-glow')} />
      <polygon
        points={`866,368 894,368 ${fx + fw},${fy + fh} ${fx},${fy + fh}`}
        fill={url('cone')}
      />

      {/* floating keyboard slab: raised navy top, gold plated front edge */}
      <polygon
        points="640,392 1150,392 1180,432 610,432"
        fill={url('slab')}
        stroke={KHALA_GOLD}
        strokeOpacity="0.8"
        strokeWidth="1.5"
      />
      <polygon
        points="610,432 1180,432 1176,444 614,444"
        fill={url('plating')}
      />
      <line
        x1="646"
        y1="394"
        x2="1144"
        y2="394"
        stroke={PROTOSS_GOLD_LIGHT}
        strokeOpacity="0.5"
      />
      {KEYS.map(([x, y, k], i) => (
        <polygon
          key={i}
          className="tc-key"
          points={`${x - 11},${y} ${x},${y - 6} ${x + 11},${y} ${x},${y + 6}`}
          fill={PROTOSS_CYAN}
          stroke={PROTOSS_CYAN_BRIGHT}
          strokeOpacity="0.8"
          strokeWidth="0.8"
          opacity="0.6"
          style={{ animationDelay: `-${(k * 0.37) % 2.4}s` }}
        />
      ))}
      {/* emitter crystal seated at the back of the slab */}
      <polygon
        points="880,362 898,380 892,404 868,404 862,380"
        fill={url('emitter')}
        stroke={PROTOSS_DEEP_GOLD}
        strokeWidth="1.5"
      />
      <circle
        className="tc-pulse"
        cx="880"
        cy="380"
        r="22"
        fill={url('screen-glow')}
      />

      {/* holo-screen: gold frame line, cyan inner seam, translucent navy */}
      <polygon
        points={chamferPoints(fx, fy, fw, fh, FRAME_CHAMFER)}
        fill={`rgba(${PROTOSS_PANEL_RGB}, 0.82)`}
        stroke={KHALA_GOLD}
        strokeOpacity="0.8"
        strokeWidth="1.5"
      />
      <polygon
        points={chamferPoints(
          fx + 3,
          fy + 3,
          fw - 6,
          fh - 6,
          FRAME_CHAMFER - 3
        )}
        fill="none"
        stroke={PROTOSS_CYAN}
        strokeOpacity="0.3"
        strokeWidth="1"
      />

      {/* SCREEN SLOT — task panels live here (local 0..500 x 0..300) */}
      <svg
        x={SCREEN.x}
        y={SCREEN.y}
        width={SCREEN.w}
        height={SCREEN.h}
        viewBox={`0 0 ${SCREEN.w} ${SCREEN.h}`}
        overflow="hidden"
      >
        {children}
      </svg>

      {/* hologram grade: scanlines, travelling sweep, energy brackets */}
      <g clipPath={url('screen-clip')} pointerEvents="none">
        <rect
          x={SCREEN.x}
          y={SCREEN.y}
          width={SCREEN.w}
          height={SCREEN.h}
          fill={url('scanlines')}
        />
        <rect
          className="tc-sweep"
          x={SCREEN.x}
          y={SCREEN.y}
          width={SCREEN.w}
          height="40"
          fill={url('sweep')}
          opacity="0"
        />
      </g>
      <line
        x1={fx + 40}
        y1={fy + 1}
        x2={fx + fw - 40}
        y2={fy + 1}
        stroke={PROTOSS_CYAN}
        strokeOpacity="0.7"
        strokeWidth="2"
      />
      <Bracket x={fx - 4} y={fy - 4} sx={1} sy={1} />
      <Bracket x={fx + fw + 4} y={fy - 4} sx={-1} sy={1} />
      <Bracket x={fx - 4} y={fy + fh + 4} sx={1} sy={-1} />
      <Bracket x={fx + fw + 4} y={fy + fh + 4} sx={-1} sy={-1} />
    </g>
  )
}

export default PhaseSmithConsole
