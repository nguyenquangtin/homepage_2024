import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { KHALA_GOLD, KHALA_GOLD_RGB, PROTOSS_CYAN, PROTOSS_CYAN_BRIGHT } from '../../lib/site-theme-context'
import { SCREEN } from './phase-smith-console-svg'
import PhaseSmithTaskPanelCode from './phase-smith-task-panel-code'
import PhaseSmithTaskPanelAdSpend from './phase-smith-task-panel-ad-spend'
import PhaseSmithTaskPanelPipeline from './phase-smith-task-panel-pipeline'
import PhaseSmithTaskPanelPartnerLink from './phase-smith-task-panel-partner-link'

const MONO = "'Share Tech Mono', monospace"
const HEADER_H = 34
const PANEL_MS = 4500
// Mobile crops the screen — everything meaningful stays inside local
// x 0..430 (design-spec.md §7/§8); 430..500 may only hold decorative fill.
const SAFE_RIGHT = 430

export const TASKS = [
  { code: '01', label: 'CODE', Panel: PhaseSmithTaskPanelCode },
  { code: '02', label: 'AD SPEND', Panel: PhaseSmithTaskPanelAdSpend },
  { code: '03', label: 'AGENT PIPELINE', Panel: PhaseSmithTaskPanelPipeline },
  { code: '04', label: 'PARTNER LINK', Panel: PhaseSmithTaskPanelPartnerLink }
]

// Cycles the active task index every ~4.5s. Only ticks while `active` (the
// banner is on screen) and the tab is visible, and never advances under
// prefers-reduced-motion, so panel 1 stays put as the one complete, static
// frame. SSR and the first client paint both start at 0, matching
// ProtossWarpIn's hydration approach for useReducedMotion.
export const usePhaseSmithTaskCycle = (active = true) => {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion) {
      setIndex(0)
      return undefined
    }
    if (!active) return undefined
    let id = null
    const tick = () => setIndex(i => (i + 1) % TASKS.length)
    const start = () => {
      if (id === null) id = setInterval(tick, PANEL_MS)
    }
    const stop = () => {
      if (id !== null) clearInterval(id)
      id = null
    }
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') stop()
      else start()
    }
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduceMotion, active])

  return index
}

// Four step pips, right-aligned but kept inside SAFE_RIGHT for the mobile crop
const Pips = ({ active }) => {
  const w = 10
  const gap = 8
  const total = TASKS.length * w + (TASKS.length - 1) * gap
  const startX = SAFE_RIGHT - 10 - total
  return (
    <g aria-hidden="true">
      {TASKS.map((_, i) => (
        <rect
          key={i}
          x={startX + i * (w + gap)}
          y={HEADER_H / 2 - 4}
          width={w}
          height="8"
          fill={i === active ? PROTOSS_CYAN_BRIGHT : `rgba(${KHALA_GOLD_RGB}, 0.3)`}
          stroke={i === active ? PROTOSS_CYAN : 'none'}
        />
      ))}
    </g>
  )
}

// Cycling task screens: a header bar (build-order label + step pips) above
// one of four panels, crossfaded with framer-motion. `index` is controlled
// by the banner (usePhaseSmithTaskCycle) so the caption strip can mirror it.
const PhaseSmithTaskScreens = ({ index }) => {
  const task = TASKS[index]
  const Panel = task.Panel
  return (
    <g fontFamily={MONO}>
      <rect width={SCREEN.w} height={HEADER_H} fill={`rgba(${KHALA_GOLD_RGB}, 0.08)`} />
      <line
        x1="0"
        y1={HEADER_H}
        x2={SCREEN.w}
        y2={HEADER_H}
        stroke={KHALA_GOLD}
        strokeOpacity="0.35"
      />
      <text x="14" y="23" fontSize="17" letterSpacing="1.5" fill={PROTOSS_CYAN}>
        {task.code} · {task.label}
      </text>
      <Pips active={index} />

      <AnimatePresence initial={false}>
        <motion.g
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Panel />
        </motion.g>
      </AnimatePresence>
    </g>
  )
}

export default PhaseSmithTaskScreens
