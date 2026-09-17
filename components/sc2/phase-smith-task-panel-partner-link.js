import { KHALA_GOLD, PALETTES, PROTOSS_CYAN, PROTOSS_CYAN_BRIGHT } from '../../lib/site-theme-context'

const sc2 = PALETTES.sc2
const Y = 120
const LEFT_X = 90
const RIGHT_X = 330

const Node = ({ x, label }) => (
  <g>
    <polygon
      className="tc-pulse"
      points={`${x},${Y - 20} ${x + 20},${Y} ${x},${Y + 20} ${x - 20},${Y}`}
      fill={KHALA_GOLD}
      fillOpacity="0.25"
      stroke={KHALA_GOLD}
      strokeWidth="1.5"
    />
    <text x={x} y={Y - 32} fontSize="16" textAnchor="middle" fill={sc2.text}>
      {label}
    </text>
  </g>
)

const METRICS = [
  { label: 'LATENCY', value: '42ms' },
  { label: 'UPTIME', value: '99.9%' },
  { label: 'EVENTS', value: 'sync ▲' }
]
const ROW_START_Y = 214
const ROW_H = 26
const SPARK_POINTS = '262,255 288,235 314,248 340,215 366,228 392,200'

// Panel 4/4 — partner API link: two nexus nodes, a handshake line drawn in
// (.tts-line-draw) and packets travelling both ways (.tts-pulse-travel on
// two paths, one reversed), a status readout, and a two-column telemetry
// block (label/value rows plus a latency sparkline). Dashoffset/opacity only.
const PhaseSmithTaskPanelPartnerLink = () => (
  <g>
    <polyline
      className="tts-line-draw"
      points={`${LEFT_X},${Y} ${RIGHT_X},${Y}`}
      fill="none"
      stroke={KHALA_GOLD}
      strokeOpacity="0.5"
      strokeWidth="2"
      pathLength="1"
      strokeDasharray="1"
    />
    <polyline
      className="tts-pulse-travel"
      points={`${LEFT_X},${Y - 8} ${RIGHT_X},${Y - 8}`}
      fill="none"
      stroke={PROTOSS_CYAN_BRIGHT}
      strokeWidth="4"
      strokeLinecap="round"
      pathLength="1"
      strokeDasharray="0.06 0.94"
    />
    <polyline
      className="tts-pulse-travel"
      points={`${RIGHT_X},${Y + 8} ${LEFT_X},${Y + 8}`}
      fill="none"
      stroke={PROTOSS_CYAN}
      strokeWidth="4"
      strokeLinecap="round"
      pathLength="1"
      strokeDasharray="0.06 0.94"
      style={{ animationDelay: '0.6s' }}
    />

    <Node x={LEFT_X} label="ECOMDY" />
    <Node x={RIGHT_X} label="PARTNER API" />

    <circle className="tc-pulse" cx="150" cy="168" r="5" fill={PROTOSS_CYAN_BRIGHT} />
    <text x="164" y="173" fontSize="18" fill={PROTOSS_CYAN_BRIGHT}>
      200 OK · LINKED
    </text>

    <line x1="20" y1="188" x2="410" y2="188" stroke={KHALA_GOLD} strokeOpacity="0.25" />

    {METRICS.map((m, i) => (
      <g key={m.label}>
        <text x="30" y={ROW_START_Y + i * ROW_H} fontSize="16" fill={KHALA_GOLD}>
          {m.label}
        </text>
        <text x="190" y={ROW_START_Y + i * ROW_H} fontSize="16" fill={PROTOSS_CYAN_BRIGHT}>
          {m.value}
        </text>
      </g>
    ))}

    <text x="260" y="205" fontSize="16" fill={sc2.muted}>
      TREND
    </text>
    <polyline
      className="tts-line-draw"
      points={SPARK_POINTS}
      fill="none"
      stroke={PROTOSS_CYAN_BRIGHT}
      strokeWidth="2"
      pathLength="1"
      strokeDasharray="1"
      style={{ animationDelay: '0.4s' }}
    />
    <circle className="tc-pulse" cx="392" cy="200" r="4" fill={PROTOSS_CYAN_BRIGHT} />
  </g>
)

export default PhaseSmithTaskPanelPartnerLink
