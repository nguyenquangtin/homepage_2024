import { motion, useReducedMotion } from 'framer-motion'
import { useSiteTheme, PROTOSS_CYAN_RGB } from '../lib/site-theme-context'

// Protoss warp-in reveal — unit-summon effect: overbright blur shimmer
// settling into place, with a psionic glow that fades out.
// Renders plain children when FFIX theme is active or reduced motion is set.
const ProtossWarpIn = ({ children, delay = 0 }) => {
  const { theme } = useSiteTheme()
  const reduceMotion = useReducedMotion()

  if (theme !== 'sc2' || reduceMotion) return <>{children}</>

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 1.04,
        filter: 'blur(10px) brightness(2.4) saturate(1.6)'
      }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: 'blur(0px) brightness(1) saturate(1)'
      }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'relative' }}
    >
      {/* Psionic energy glow — flares on arrival, then dissipates */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.4, delay: delay + 0.15, ease: 'easeOut' }}
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
