import { useEffect, useCallback, useRef, useState } from 'react'
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useBattleEngine, THEME_CONFIG } from './battle-engine'
import { BattleSprite } from './battle-sprites'
import { BattleHud, CommandMenu, BattleLog, DamageNumber, VictoryScreen, DefeatScreen } from './battle-ui'
import { BattleEffect } from './battle-effects'
import { useSiteTheme } from '../../lib/site-theme-context'

const BattleScene = ({ enemy, onClose }) => {
  const { theme, palette } = useSiteTheme()
  const config = THEME_CONFIG[theme] || THEME_CONFIG.ffix
  const playerSpriteKey = theme === 'sc2' ? 'highTemplar' : 'blackMage'

  const { state, attack, castSpell, useItem, run, animDone, enemyAttack } = useBattleEngine(enemy, theme)
  const { phase, player, enemy: foe, log, animType, lastDmg } = state
  const [dmgDisplay, setDmgDisplay] = useState(null)
  const autoCloseRef = useRef(null)
  const spriteSize = useBreakpointValue({ base: 80, md: 120 }) || 80
  const starsRef = useRef(null)
  if (!starsRef.current) {
    starsRef.current = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100, y: Math.random() * 60,
      size: Math.random() * 2 + 1, opacity: Math.random() * 0.4 + 0.2,
    }))
  }
  const stars = starsRef.current

  useEffect(() => {
    if (phase === 'enemy_turn') {
      const t = setTimeout(enemyAttack, 600)
      return () => clearTimeout(t)
    }
  }, [phase, enemyAttack])

  useEffect(() => {
    if (phase === 'victory' || phase === 'defeat' || phase === 'escaped') {
      autoCloseRef.current = setTimeout(onClose, 4000)
      return () => clearTimeout(autoCloseRef.current)
    }
  }, [phase, onClose])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const animDoneCalledRef = useRef(false)
  useEffect(() => {
    if (phase === 'player_anim' || phase === 'enemy_anim') {
      animDoneCalledRef.current = false
      const isHeal = animType === 'item'
      const isEnemy = phase === 'enemy_anim'
      const position = isHeal
        ? { right: '22%', top: '30%' }  // heal shows on player (right side)
        : isEnemy
          ? { left: '30%', top: '35%' }   // enemy hit shows on player (left-ish)
          : { left: '22%', top: '30%' }    // player hit shows on enemy (left side)
      setDmgDisplay({ value: lastDmg, position })
      const t1 = setTimeout(() => setDmgDisplay(null), 900)
      const t2 = setTimeout(() => {
        if (!animDoneCalledRef.current) { animDoneCalledRef.current = true; animDone() }
      }, 800)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [phase, lastDmg, animDone])

  const safeAnimDone = useCallback(() => {
    if (!animDoneCalledRef.current) { animDoneCalledRef.current = true; animDone() }
  }, [animDone])

  const handleClose = useCallback(() => {
    clearTimeout(autoCloseRef.current); onClose()
  }, [onClose])

  const isPlayerTurn = phase === 'player_turn'

  return (
    <Box position="relative" w="100%" h="100%"
      bg="linear-gradient(180deg, #050510 0%, #0a0a2a 40%, #101035 100%)"
      overflow="hidden" userSelect="none">
      {stars.map((s, i) => (
        <Box key={i} position="absolute" left={`${s.x}%`} top={`${s.y}%`}
          w={`${s.size}px`} h={`${s.size}px`} bg="white" borderRadius="full" opacity={s.opacity} />
      ))}

      {/* Ground line */}
      <Box position="absolute" bottom="30%" left={0} right={0} h="1px"
        bg={`linear-gradient(90deg, transparent 5%, ${palette.accent}33 30%, ${palette.accent}22 70%, transparent 95%)`} />

      <BattleHud player={player} enemy={foe} />

      {/* Enemy sprite */}
      <Box position="absolute" left={{ base: '12%', md: '18%' }} top="30%" zIndex={1}>
        <AnimatePresence>
          {foe.hp > 0 && (
            <motion.div exit={{ opacity: 0, scale: 0.5, filter: 'brightness(3)' }} transition={{ duration: 0.6 }}>
              <motion.div animate={phase === 'player_anim' ? { opacity: [1, 0.2, 1, 0.2, 1] } : {}} transition={{ duration: 0.4 }}>
                <BattleSprite spriteKey={foe.spriteKey} size={spriteSize} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {phase === 'player_anim' && animType !== 'item' && (
          <BattleEffect animType={animType} onComplete={safeAnimDone} />
        )}
      </Box>

      {/* Player sprite */}
      <Box position="absolute" right={{ base: '12%', md: '18%' }} top="28%" zIndex={1}>
        <motion.div animate={phase === 'enemy_anim' ? { opacity: [1, 0.3, 1, 0.3, 1] } : {}} transition={{ duration: 0.4 }}>
          <BattleSprite spriteKey={playerSpriteKey} size={spriteSize} flip />
        </motion.div>
        {phase === 'player_anim' && animType === 'item' && (
          <BattleEffect animType="item" onComplete={safeAnimDone} />
        )}
        {phase === 'enemy_anim' && (
          <BattleEffect animType="enemy_attack" onComplete={safeAnimDone} />
        )}
      </Box>

      {dmgDisplay && <DamageNumber value={dmgDisplay.value} position={dmgDisplay.position} />}

      <Flex position="absolute" bottom={0} left={0} right={0} p={{ base: 2, md: 3 }} gap={2} align="flex-end" zIndex={3}>
        <BattleLog messages={log} />
        {isPlayerTurn && (
          <CommandMenu onAttack={attack} onCast={castSpell} onItem={useItem} onRun={run}
            player={player} spells={config.spells} />
        )}
      </Flex>

      <AnimatePresence>
        {phase === 'victory' && <VictoryScreen enemyName={foe.name} onClose={handleClose} />}
        {phase === 'defeat' && <DefeatScreen onClose={handleClose} />}
        {phase === 'escaped' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20, cursor: 'pointer' }}
            onClick={handleClose}>
            <Box bg={palette.panelBg} border={`2px solid ${palette.accent}`} borderRadius="md"
              px={8} py={6} textAlign="center" fontFamily="monospace" color={palette.text} fontSize="lg" letterSpacing="0.15em">
              {theme === 'sc2' ? 'Retreated safely!' : 'Got away safely!'}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default BattleScene
