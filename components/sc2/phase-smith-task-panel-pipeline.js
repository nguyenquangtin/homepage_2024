import { useId } from 'react'
import { KHALA_GOLD, KHALA_GOLD_RGB, PALETTES, PROTOSS_CYAN, PROTOSS_CYAN_BRIGHT } from '../../lib/site-theme-context'

const sc2 = PALETTES.sc2
const Y = 150
const NODES = [
  { x: 35, label: 'INTAKE' },
  { x: 123, label: 'PLAN' },
  { x: 210, label: 'BUILD' },
  { x: 298, label: 'REVIEW' },
  { x: 385, label: 'SHIP' }
]
const SPINE = NODES.map(n => `${n.x},${Y}`).join(' ')

const STAGE = 3
const STAGE_TOTAL = NODES.length
const BAR_X = 20
const BAR_Y = 204
const BAR_W = 280
const BAR_FILL_W = (BAR_W * STAGE) / STAGE_TOTAL

const LOG = [
  '▸ intake  brief parsed',
  '▸ build   3 agents active',
  '▸ review  0 blockers'
]
const LOG_START_Y = 232
const LOG_LINE_H = 24

// Panel 3/4 — AI agent pipeline: five stage nodes linked by a spine that
// draws in (.tts-line-draw) with a beacon travelling along it forever
// (.tts-pulse-travel), a "STAGE n/5" progress bar and a status log that
// types in line by line below (.tts-type clip reveal, staggered delays).
// All motion is transform / stroke-dashoffset / opacity, fill-mode both.
const PhaseSmithTaskPanelPipeline = () => {
  const uid = useId().replace(/:/g, '')
  return (
    <g>
      <polyline
        className="tts-line-draw"
        points={SPINE}
        fill="none"
        stroke={KHALA_GOLD}
        strokeOpacity="0.5"
        strokeWidth="2"
        pathLength="1"
        strokeDasharray="1"
      />
      <polyline
        className="tts-pulse-travel"
        points={SPINE}
        fill="none"
        stroke={PROTOSS_CYAN_BRIGHT}
        strokeWidth="5"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="0.05 0.95"
      />

      {NODES.map((n, i) => (
        <g key={n.label}>
          <polygon
            className="tc-pulse"
            points={`${n.x},${Y - 16} ${n.x + 16},${Y} ${n.x},${Y + 16} ${n.x - 16},${Y}`}
            fill={PROTOSS_CYAN}
            fillOpacity="0.35"
            stroke={PROTOSS_CYAN_BRIGHT}
            strokeWidth="1.5"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
          <text x={n.x} y={Y + 40} fontSize="16" textAnchor="middle" fill={sc2.text}>
            {n.label}
          </text>
        </g>
      ))}

      <rect x={BAR_X} y={BAR_Y} width={BAR_W} height="6" fill={`rgba(${KHALA_GOLD_RGB}, 0.15)`} />
      <rect
        className="tts-type"
        x={BAR_X}
        y={BAR_Y}
        width={BAR_FILL_W}
        height="6"
        fill={PROTOSS_CYAN_BRIGHT}
        style={{ animationDelay: '0.3s' }}
      />
      <text x={BAR_X + BAR_W + 12} y={BAR_Y + 9} fontSize="16" fill={sc2.muted}>
        STAGE {STAGE}/{STAGE_TOTAL}
      </text>

      {LOG.map((line, i) => (
        <text
          key={line}
          x="20"
          y={LOG_START_Y + i * LOG_LINE_H}
          fontSize="16"
          clipPath={`url(#${uid}-pipe-log-${i})`}
        >
          <tspan fill={KHALA_GOLD}>{line.slice(0, 2)}</tspan>
          <tspan fill={sc2.text}>{line.slice(2)}</tspan>
        </text>
      ))}
      <defs>
        {LOG.map((line, i) => (
          <clipPath id={`${uid}-pipe-log-${i}`} key={line}>
            <rect
              className="tts-type"
              x="0"
              y={LOG_START_Y + i * LOG_LINE_H - 18}
              width="420"
              height="24"
              style={{ animationDelay: `${0.3 + i * 0.35}s` }}
            />
          </clipPath>
        ))}
      </defs>
    </g>
  )
}

export default PhaseSmithTaskPanelPipeline
