import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { getRandomEnemy } from './battle/battle-enemies'
import { useSiteTheme } from '../lib/site-theme-context'

const BattleScene = dynamic(() => import('./battle/battle-scene'), { ssr: false })

const FfixEncounter = () => {
  const { theme, palette } = useSiteTheme()
  const [phase, setPhase] = useState(null)
  const [enemy, setEnemy] = useState(null)
  const timersRef = useRef([])

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  useEffect(() => {
    const trigger = () => {
      clearTimers()
      const e = getRandomEnemy(theme)
      setEnemy(e)
      setPhase('flash')
      const t1 = setTimeout(() => setPhase('battle'), 400)
      timersRef.current.push(t1)
    }
    window.addEventListener('ffix-encounter', trigger)
    return () => { window.removeEventListener('ffix-encounter', trigger); clearTimers() }
  }, [theme])

  const handleClose = useCallback(() => {
    clearTimers()
    setPhase('fade')
    const t = setTimeout(() => { setPhase(null); setEnemy(null) }, 600)
    timersRef.current.push(t)
  }, [])

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
        <motion.div key="flash"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.4, times: [0, 0.1, 0.8, 1] }}
          style={{ position: 'fixed', inset: 0, background: theme === 'sc2' ? '#00ddff' : 'white', zIndex: 99999, pointerEvents: 'none' }}
        />
      )}
      {phase === 'battle' && enemy && (
        <motion.div key="battle"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
          style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)' }}>
          <div style={{
            width: '80vw', height: '80vh', borderRadius: '8px',
            border: `3px solid ${palette.accent}`,
            boxShadow: `0 0 0 5px rgba(8,14,40,0.9), 0 0 40px ${palette.accent}4d, 0 0 80px rgba(0,0,0,0.8)`,
            overflow: 'hidden', position: 'relative',
          }}>
            <BattleScene enemy={enemy} onClose={handleClose} />
          </div>
        </motion.div>
      )}
      {phase === 'fade' && (
        <motion.div key="fade"
          initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.6 }}
          style={{ position: 'fixed', inset: 0, background: 'black', zIndex: 99999, pointerEvents: 'none' }}
        />
      )}
    </AnimatePresence>
  )
}

export default FfixEncounter
