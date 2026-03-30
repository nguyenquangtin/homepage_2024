import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { getRandomEnemy } from './battle/battle-enemies'

// Lazy-load battle scene — only fetched when encounter triggers
const BattleScene = dynamic(() => import('./battle/battle-scene'), { ssr: false })

// Triggered by: window.dispatchEvent(new Event('ffix-encounter'))
// Click the Moogle 5× to activate — see ffix-moogle.js

const FfixEncounter = () => {
  const [phase, setPhase] = useState(null) // null | 'flash' | 'battle' | 'fade'
  const [enemy, setEnemy] = useState(null)

  useEffect(() => {
    const trigger = () => {
      setEnemy(getRandomEnemy())
      setPhase('flash')
      const t1 = setTimeout(() => setPhase('battle'), 350)
      return () => clearTimeout(t1)
    }

    window.addEventListener('ffix-encounter', trigger)
    return () => window.removeEventListener('ffix-encounter', trigger)
  }, [])

  const handleClose = useCallback(() => {
    setPhase('fade')
    const t = setTimeout(() => setPhase(null), 600)
    return () => clearTimeout(t)
  }, [])

  // ESC key to close
  useEffect(() => {
    if (!phase) return
    const handler = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase, handleClose])

  return (
    <AnimatePresence>
      {phase === 'flash' && (
        <motion.div
          key="flash"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.35, times: [0, 0.1, 0.8, 1] }}
          style={{ position: 'fixed', inset: 0, background: 'white', zIndex: 99999, pointerEvents: 'none' }}
        />
      )}

      {phase === 'battle' && enemy && (
        <motion.div
          key="battle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ position: 'fixed', inset: 0, zIndex: 99999 }}
        >
          <BattleScene enemy={enemy} onClose={handleClose} />
        </motion.div>
      )}

      {phase === 'fade' && (
        <motion.div
          key="fade"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ position: 'fixed', inset: 0, background: 'black', zIndex: 99999, pointerEvents: 'none' }}
        />
      )}
    </AnimatePresence>
  )
}

export default FfixEncounter
