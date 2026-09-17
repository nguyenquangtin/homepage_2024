import {
  KHALA_GOLD,
  PROTOSS_CYAN,
  PROTOSS_CYAN_BRIGHT,
  PROTOSS_CYAN_RGB
} from '../../lib/site-theme-context'

const ORBITRON = "'Orbitron', sans-serif"
const BAR_BASE_Y = 274
const BAR_MAX_H = 150
const BAR_W = 34
const BAR_GAP = 12
const START_X = 34
// Relative bar heights (0..1) — a generic upward spend trend, no client data
const HEIGHTS = [0.32, 0.48, 0.4, 0.62, 0.55, 0.8, 0.72]

const barX = i => START_X + i * (BAR_W + BAR_GAP)
const barTop = h => BAR_BASE_Y - h * BAR_MAX_H

// Panel 2/4 — TikTok ad-spend readout: an Orbitron headline, growth bars
// that scale up from the baseline (.tts-bar) and a trend line drawn in with
// stroke-dashoffset, normalised via pathLength so it works at any length.
const TemplarTaskPanelAdSpend = () => {
  const points = HEIGHTS.map(
    (h, i) => `${barX(i) + BAR_W / 2},${barTop(h) - 10}`
  ).join(' ')

  return (
    <g>
      <text x="24" y="70" fontFamily={ORBITRON} fontSize="30" fontWeight="700" fill={KHALA_GOLD}>
        $ SPEND
      </text>
      <text x="230" y="70" fontFamily={ORBITRON} fontSize="30" fontWeight="700" fill={PROTOSS_CYAN_BRIGHT}>
        ▲ 38%
      </text>

      {HEIGHTS.map((h, i) => (
        <rect
          key={i}
          className="tts-bar"
          x={barX(i)}
          y={barTop(h)}
          width={BAR_W}
          height={h * BAR_MAX_H}
          fill={`rgba(${PROTOSS_CYAN_RGB}, 0.35)`}
          stroke={PROTOSS_CYAN}
          strokeOpacity="0.8"
          style={{ animationDelay: `${i * 0.08}s` }}
        />
      ))}

      <polyline
        className="tts-line-draw"
        points={points}
        fill="none"
        stroke={PROTOSS_CYAN_BRIGHT}
        strokeWidth="2.5"
        pathLength="1"
        strokeDasharray="1"
        style={{ animationDelay: '0.5s' }}
      />
    </g>
  )
}

export default TemplarTaskPanelAdSpend
