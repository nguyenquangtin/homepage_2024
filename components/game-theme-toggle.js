import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Button } from '@chakra-ui/react'
import {
  useSiteTheme,
  PROTOSS_CYAN,
  PROTOSS_CYAN_RGB,
  FFIX_GOLD_RGB
} from '../lib/site-theme-context'

// Full-screen psionic flash played during a theme switch — warp-in to SC2
// (cyan), warp-out back to FFIX (gold). Skipped under reduced motion.
const WarpFlash = ({ toSc2, onDone }) => (
  <motion.div
    aria-hidden
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.85, 0] }}
    transition={{ duration: 0.7, times: [0, 0.35, 1], ease: 'easeOut' }}
    onAnimationComplete={onDone}
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      pointerEvents: 'none',
      background: toSc2
        ? `radial-gradient(circle at 50% 40%, rgba(${PROTOSS_CYAN_RGB}, 0.85), rgba(0,60,90,0.55) 55%, transparent 80%)`
        : `radial-gradient(circle at 50% 40%, rgba(${FFIX_GOLD_RGB}, 0.8), rgba(60,40,0,0.5) 55%, transparent 80%)`
    }}
  />
)

const GameThemeToggle = () => {
  const { theme, toggleTheme } = useSiteTheme()
  const reduceMotion = useReducedMotion()
  const [warping, setWarping] = useState(false)

  const handleToggle = () => {
    if (warping) return // ignore clicks while the flash is playing
    toggleTheme()
    if (!reduceMotion) setWarping(true)
  }

  return (
    <>
      {/* theme here is already the NEW theme when the flash renders */}
      {warping && (
        <WarpFlash toSc2={theme === 'sc2'} onDone={() => setWarping(false)} />
      )}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          style={{ display: 'inline-block', marginRight: '8px' }}
          key={theme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            aria-label="Toggle game theme"
            size="sm"
            fontFamily="monospace"
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="0.08em"
            bg={theme === 'ffix' ? '#c8a800' : '#00bbdd'}
            color={theme === 'ffix' ? '#1a1000' : '#001a22'}
            _hover={{
              bg: theme === 'ffix' ? '#e0c000' : PROTOSS_CYAN,
              transform: 'translateY(-1px)',
              boxShadow:
                theme === 'ffix'
                  ? `0 0 12px rgba(${FFIX_GOLD_RGB}, 0.5)`
                  : `0 0 12px rgba(${PROTOSS_CYAN_RGB}, 0.55)`
            }}
            transition="all 0.15s"
            onClick={handleToggle}
          >
            {theme === 'ffix' ? 'FFIX' : 'SC2'}
          </Button>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default GameThemeToggle
