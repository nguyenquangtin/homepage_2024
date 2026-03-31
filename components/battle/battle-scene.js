import { useEffect, useCallback, useRef, useState } from 'react'
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useBattleEngine } from './battle-engine'
import { BattleSprite } from './battle-sprites'
import { BattleHud, CommandMenu, BattleLog, DamageNumber, VictoryScreen, DefeatScreen } from './battle-ui'
import { BattleEffect } from './battle-effects'

const BattleScene = ({ enemy, onClose }) => {
  const { state, attack, castSpell, useItem, run, animDone, enemyAttack } = useBattleEngine(enemy)
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

  // Auto-trigger enemy turn after short delay
  useEffect(() => {
    if (phase === 'enemy_turn') {
      const t = setTimeout(enemyAttack, 600)
      return () => clearTimeout(t)
    }
  }, [phase, enemyAttack])

  // Auto-close victory/defeat after 4s
  useEffect(() => {
    if (phase === 'victory' || phase === 'defeat' || phase === 'escaped') {
      autoCloseRef.current = setTimeout(onClose, 4000)
      return () => clearTimeout(autoCloseRef.current)
    }
  }, [phase, onClose])

  // ESC key to close
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Show damage number + fallback timer for animDone
  const animDoneCalledRef = useRef(false)
  useEffect(() => {
    if (phase === 'player_anim' || phase === 'enemy_anim') {
      animDoneCalledRef.current = false
      const isEnemy = phase === 'enemy_anim'
      setDmgDisplay({
        value: lastDmg,
        position: isEnemy
          ? { left: '30%', top: '35%' }
          : { left: '22%', top: '30%' }
      })
      const t1 = setTimeout(() => setDmgDisplay(null), 900)
      // Fallback: if onComplete never fires, advance after 800ms
      const t2 = setTimeout(() => {
        if (!animDoneCalledRef.current) {
          animDoneCalledRef.current = true
          animDone()
        }
      }, 800)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [phase, lastDmg, animDone])

  const safeAnimDone = useCallback(() => {
    if (!animDoneCalledRef.current) {
      animDoneCalledRef.current = true
      animDone()
    }
  }, [animDone])

  const handleClose = useCallback(() => {
    clearTimeout(autoCloseRef.current)
    onClose()
  }, [onClose])

  const isPlayerTurn = phase === 'player_turn'

  return (
    <Box
      position="relative"
      w="100%"
      h="100%"
      bg="linear-gradient(180deg, #050510 0%, #0a0a2a 40%, #101035 100%)"
      overflow="hidden"
      userSelect="none"
    >
      {/* Starfield */}
      {stars.map((s, i) => (
        <Box
          key={i}
          position="absolute"
          left={`${s.x}%`}
          top={`${s.y}%`}
          w={`${s.size}px`}
          h={`${s.size}px`}
          bg="white"
          borderRadius="full"
          opacity={s.opacity}
        />
      ))}

      {/* Ground line */}
      <Box
        position="absolute"
        bottom="30%"
        left={0}
        right={0}
        h="1px"
        bg="linear-gradient(90deg, transparent 5%, #c8a80033 30%, #c8a80022 70%, transparent 95%)"
      />

      {/* HUD */}
      <BattleHud player={player} enemy={foe} />

      {/* Enemy sprite — left side */}
      <Box position="absolute" left={{ base: '12%', md: '18%' }} top="30%" zIndex={1}>
        <AnimatePresence>
          {foe.hp > 0 && (
            <motion.div
              exit={{ opacity: 0, scale: 0.5, filter: 'brightness(3)' }}
              transition={{ duration: 0.6 }}
            >
              {/* Hit blink when enemy takes damage */}
              <motion.div
                animate={phase === 'player_anim' ? { opacity: [1, 0.2, 1, 0.2, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                <BattleSprite
                  spriteKey={foe.spriteKey}
                  size={spriteSize}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Enemy effect overlay */}
        {phase === 'player_anim' && animType !== 'item' && (
          <BattleEffect animType={animType} onComplete={safeAnimDone} />
        )}
      </Box>

      {/* Player sprite — right side */}
      <Box position="absolute" right={{ base: '12%', md: '18%' }} top="28%" zIndex={1}>
        <motion.div
          animate={phase === 'enemy_anim' ? { opacity: [1, 0.3, 1, 0.3, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          <BattleSprite
            spriteKey="blackMage"
            size={spriteSize}
            flip
          />
        </motion.div>
        {/* Player effect overlay (heal / enemy attack) */}
        {phase === 'player_anim' && animType === 'item' && (
          <BattleEffect animType="item" onComplete={safeAnimDone} />
        )}
        {phase === 'enemy_anim' && (
          <BattleEffect animType="enemy_attack" onComplete={safeAnimDone} />
        )}
      </Box>

      {/* Damage numbers */}
      {dmgDisplay && <DamageNumber value={dmgDisplay.value} position={dmgDisplay.position} />}

      {/* Bottom UI — log + commands */}
      <Flex
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        p={{ base: 2, md: 3 }}
        gap={2}
        align="flex-end"
        zIndex={3}
      >
        <BattleLog messages={log} />
        {isPlayerTurn && (
          <CommandMenu
            onAttack={attack}
            onCast={castSpell}
            onItem={useItem}
            onRun={run}
            player={player}
          />
        )}
      </Flex>

      {/* Victory / Defeat / Escaped overlays */}
      <AnimatePresence>
        {phase === 'victory' && <VictoryScreen enemyName={foe.name} onClose={handleClose} />}
        {phase === 'defeat' && <DefeatScreen onClose={handleClose} />}
        {phase === 'escaped' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20, cursor: 'pointer' }}
            onClick={handleClose}
          >
            <Box
              bg="rgba(8, 14, 40, 0.97)"
              border="2px solid #c8a800"
              borderRadius="md"
              px={8} py={6}
              textAlign="center"
              fontFamily="monospace"
              color="#f0e6a0"
              fontSize="lg"
              letterSpacing="0.15em"
            >
              Got away safely!
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default BattleScene
