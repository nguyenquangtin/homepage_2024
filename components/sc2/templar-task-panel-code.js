import { useId } from 'react'
import { KHALA_GOLD, PALETTES, PROTOSS_CYAN_BRIGHT } from '../../lib/site-theme-context'

const sc2 = PALETTES.sc2
const LINE_H = 42
const START_Y = 88

const LINES = [
  { prompt: true, text: 'git push khala main' },
  { text: '▸ build ........ ok', accent: true },
  { text: '▸ deploy ........ ok', accent: true }
]

// Panel 1/4 — a terminal typing a short deploy sequence, then a blinking
// cursor. Each line reveals via a clip-path rect scaled in on x (.tts-type,
// stroke/transform only); under reduced motion the clip carries no
// transform, so the line is already fully open — a finished frame.
const TemplarTaskPanelCode = () => {
  const uid = useId().replace(/:/g, '')
  return (
    <g fontSize="19">
      <defs>
        {LINES.map((line, i) => (
          <clipPath id={`${uid}-code-${i}`} key={i}>
            <rect
              className="tts-type"
              x="0"
              y={START_Y + i * LINE_H - 24}
              width="400"
              height="32"
              style={{ animationDelay: `${i * 0.7}s` }}
            />
          </clipPath>
        ))}
      </defs>

      {LINES.map((line, i) => (
        <text
          key={i}
          x="24"
          y={START_Y + i * LINE_H}
          clipPath={`url(#${uid}-code-${i})`}
          fill={line.accent ? PROTOSS_CYAN_BRIGHT : sc2.text}
        >
          {line.prompt && <tspan fill={KHALA_GOLD}>$ </tspan>}
          {line.text}
        </text>
      ))}

      <text x="24" y={START_Y + LINES.length * LINE_H} fill={KHALA_GOLD}>
        $
      </text>
      <rect
        className="tc-cursor"
        x="42"
        y={START_Y + LINES.length * LINE_H - 18}
        width="12"
        height="22"
        fill={PROTOSS_CYAN_BRIGHT}
        opacity="0.9"
      />
    </g>
  )
}

export default TemplarTaskPanelCode
