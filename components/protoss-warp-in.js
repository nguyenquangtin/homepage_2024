import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useSiteTheme, PROTOSS_CYAN_RGB } from '../lib/site-theme-context'

// Resting state of the warp-in — also what reduced-motion users land on.
const SETTLED = {
  opacity: 1,
  scale: 1,
  filter: 'blur(0px) brightness(1) saturate(1)'
}

// Protoss warp-in reveal — unit-summon effect: overbright blur shimmer
// settling into place, with a psionic glow that fades out.
// framer's useReducedMotion() is seeded synchronously, so it is true on the
// first client render but false during SSR: branching the DOM on it desynced
// hydration. One DOM structure is rendered either way and only the tween
// values change, read behind a post-mount flag so SSR and the first client
// render agree (LotV pass).
const ProtossWarpIn = ({ children, delay = 0 }) => {
  const { theme } = useSiteTheme()
  const reduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // theme is SSR-stable (see site-theme-context), so it may gate the DOM
  if (theme !== 'sc2') return <>{children}</>

  const still = mounted && reduceMotion
  const instant = { duration: 0 }

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 1.04,
        filter: 'blur(10px) brightness(2.4) saturate(1.6)'
      }}
      animate={SETTLED}
      transition={
        still ? instant : { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }
      }
      style={{ position: 'relative' }}
    >
      {/* Psionic energy glow — flares on arrival, then dissipates */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 0 }}
        transition={
          still
            ? instant
            : { duration: 1.4, delay: delay + 0.15, ease: 'easeOut' }
        }
        style={{
          position: 'absolute',
          inset: -8,
          borderRadius: 12,
          pointerEvents: 'none',
          background: `radial-gradient(ellipse at center, rgba(${PROTOSS_CYAN_RGB}, 0.2), transparent 70%)`,
          boxShadow: `0 0 42px rgba(${PROTOSS_CYAN_RGB}, 0.35)`
        }}
      />
      {children}
    </motion.div>
  )
}

export default ProtossWarpIn
