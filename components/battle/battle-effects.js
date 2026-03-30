import { motion } from 'framer-motion'
import { Box } from '@chakra-ui/react'

// ── Physical Attack Slash ──
export const AttackEffect = ({ onComplete }) => (
  <motion.div
    initial={{ opacity: 0, rotate: -45, scale: 0.3 }}
    animate={{ opacity: [0, 1, 1, 0], rotate: 45, scale: 1.2 }}
    transition={{ duration: 0.4, times: [0, 0.2, 0.7, 1] }}
    onAnimationComplete={onComplete}
    style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 5 }}
  >
    <Box w="60px" h="4px" bg="white" borderRadius="full" boxShadow="0 0 12px white, 0 0 24px rgba(255,255,255,0.5)" />
  </motion.div>
)

// ── Fire Effect — expanding orange rings ──
export const FireEffect = ({ onComplete }) => (
  <motion.div
    onAnimationComplete={onComplete}
    style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 5 }}
  >
    {[0, 0.1, 0.2].map((delay, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0.2, opacity: 0.9 }}
        animate={{ scale: [0.2, 1.5], opacity: [0.9, 0] }}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          width: 60, height: 60, borderRadius: '50%',
          background: `radial-gradient(circle, #ff6600 0%, #ff3300 50%, transparent 70%)`,
          boxShadow: '0 0 20px #ff4400',
        }}
      />
    ))}
  </motion.div>
)

// ── Ice Effect — crystal shards ──
export const IceEffect = ({ onComplete }) => {
  const shards = [
    { x: -20, y: -15, r: 0 },
    { x: 15, y: -20, r: 45 },
    { x: -10, y: 15, r: -30 },
    { x: 20, y: 10, r: 60 },
    { x: 0, y: -25, r: 20 },
  ]
  return (
    <motion.div
      onAnimationComplete={onComplete}
      style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 5 }}
    >
      {shards.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0.5], x: s.x, y: s.y }}
          transition={{ duration: 0.55, delay: i * 0.06, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: 14, height: 22,
            background: 'linear-gradient(135deg, #88ddff 0%, #4488ff 50%, #aaeeff 100%)',
            transform: `rotate(${s.r}deg)`,
            clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
            boxShadow: '0 0 8px #66bbff',
          }}
        />
      ))}
    </motion.div>
  )
}

// ── Thunder Effect — zigzag bolt ──
export const ThunderEffect = ({ onComplete }) => (
  <motion.div
    onAnimationComplete={onComplete}
    style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 5 }}
  >
    {/* Flash background */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.3, 0, 0.2, 0] }}
      transition={{ duration: 0.5 }}
      style={{ position: 'absolute', inset: 0, background: '#ffff00' }}
    />
    {/* Bolt SVG */}
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: [0, 1, 1, 0], scaleY: [0, 1, 1, 1] }}
      transition={{ duration: 0.5, times: [0, 0.15, 0.7, 1] }}
      style={{ position: 'absolute', transformOrigin: 'top center' }}
    >
      <svg width="40" height="90" viewBox="0 0 40 90">
        <polygon
          points="20,0 28,30 22,30 32,60 24,60 40,90 12,55 20,55 8,30 18,30"
          fill="#ffee00"
          stroke="#ffaa00"
          strokeWidth="1"
        />
      </svg>
    </motion.div>
  </motion.div>
)

// ── Enemy Attack Effect — red impact flash ──
export const EnemyAttackEffect = ({ onComplete }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.8, 0, 0.6, 0] }}
    transition={{ duration: 0.45 }}
    onAnimationComplete={onComplete}
    style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 5 }}
  >
    <Box
      w="70px" h="70px" borderRadius="50%"
      bg="radial-gradient(circle, rgba(255,50,50,0.8) 0%, transparent 70%)"
      boxShadow="0 0 30px rgba(255,0,0,0.6)"
    />
  </motion.div>
)

// ── Item Heal Effect — green sparkles ──
export const ItemEffect = ({ onComplete }) => (
  <motion.div
    onAnimationComplete={onComplete}
    style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 5 }}
  >
    {[0, 0.08, 0.16, 0.24].map((delay, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1, 0], y: [20, -20] }}
        transition={{ duration: 0.7, delay }}
        style={{
          position: 'absolute',
          width: 8, height: 8, borderRadius: '50%',
          background: '#44dd66',
          boxShadow: '0 0 8px #44dd66',
          left: `${35 + i * 10}%`,
        }}
      />
    ))}
  </motion.div>
)

// Effect dispatcher — renders correct effect based on animType
export const BattleEffect = ({ animType, onComplete }) => {
  switch (animType) {
    case 'attack':       return <AttackEffect onComplete={onComplete} />
    case 'fire':         return <FireEffect onComplete={onComplete} />
    case 'ice':          return <IceEffect onComplete={onComplete} />
    case 'thunder':      return <ThunderEffect onComplete={onComplete} />
    case 'enemy_attack': return <EnemyAttackEffect onComplete={onComplete} />
    case 'item':         return <ItemEffect onComplete={onComplete} />
    default:             return null
  }
}
