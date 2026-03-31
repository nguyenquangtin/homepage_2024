import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { getRandomEnemy } from './battle/battle-enemies'

// Lazy-load battle scene — only fetched when encounter triggers
const BattleScene = dynamic(() => import('./battle/battle-scene'), { ssr: false })

// Triggered by: window.dispatchEvent(new Event('ffix-encounter'))
// Click the Moogle 5x to activate — see ffix-moogle.js

const FfixEncounter = () => {
  const [phase, setPhase] = useState(null) // null | 'flash' | 'battle' | 'fade'
  const [enemy, setEnemy] = useState(null)
  const timersRef = useRef([])

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  useEffect(() => {
    const trigger = () => {
      clearTimers()
      const e = getRandomEnemy()
      setEnemy(e)
      setPhase('flash')
      const t1 = setTimeout(() => setPhase('battle'), 400)
      timersRef.current.push(t1)
    }

    window.addEventListener('ffix-encounter', trigger)
    return () => {
      window.removeEventListener('ffix-encounter', trigger)
      clearTimers()
    }
  }, [])

  const handleClose = useCallback(() => {
    clearTimers()
    setPhase('fade')
    const t = setTimeout(() => {
      setPhase(null)
      setEnemy(null)
    }, 600)
    timersRef.current.push(t)
  }, [])

  // ESC key to close
  useEffect(() => {
    if (!phase) return
    const handler = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase, handleClose])

  if (!phase) return null

  return (
    <AnimatePresence mode="wait">
      {phase === 'flash' && (
        <motion.div
          key="flash"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.4, times: [0, 0.1, 0.8, 1] }}
          style={{ position: 'fixed', inset: 0, background: 'white', zIndex: 99999, pointerEvents: 'none' }}
        />
      )}

      {phase === 'battle' && enemy && (
        <motion.div
          key="battle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.7)',
          }}
        >
          <div style={{
            width: '80vw',
            height: '80vh',
            borderRadius: '8px',
            border: '3px solid #c8a800',
            boxShadow: '0 0 0 5px rgba(8,14,40,0.9), 0 0 40px rgba(200,168,0,0.3), 0 0 80px rgba(0,0,0,0.8)',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <BattleScene enemy={enemy} onClose={handleClose} />
          </div>
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
