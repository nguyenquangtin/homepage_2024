import { motion } from 'framer-motion'
import { Box } from '@chakra-ui/react'

const center = {
  position: 'absolute', inset: 0,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  pointerEvents: 'none', zIndex: 5,
}

// ── Physical Attack — diagonal slash with trail ──
export const AttackEffect = ({ onComplete }) => (
  <motion.div onAnimationComplete={onComplete} style={center}>
    {/* Screen flash */}
    <motion.div
      animate={{ opacity: [0, 0.15, 0] }}
      transition={{ duration: 0.3 }}
      style={{ position: 'absolute', inset: 0, background: 'white' }}
    />
    {/* Main slash */}
    <motion.div
      initial={{ opacity: 0, rotate: -60, scale: 0.2 }}
      animate={{ opacity: [0, 1, 1, 0], rotate: 60, scale: 1.5 }}
      transition={{ duration: 0.35, times: [0, 0.15, 0.6, 1] }}
    >
      <Box w="80px" h="3px" bg="white" borderRadius="full"
        boxShadow="0 0 15px white, 0 0 30px rgba(255,255,255,0.6), 0 -2px 8px #aaccff" />
    </motion.div>
    {/* Secondary slash */}
    <motion.div
      initial={{ opacity: 0, rotate: -30, scale: 0.2 }}
      animate={{ opacity: [0, 0.7, 0.7, 0], rotate: 30, scale: 1.3 }}
      transition={{ duration: 0.3, delay: 0.08, times: [0, 0.15, 0.6, 1] }}
    >
      <Box w="60px" h="2px" bg="#aaccff" borderRadius="full"
        boxShadow="0 0 10px #aaccff" />
    </motion.div>
  </motion.div>
)

// ── Fire Effect — erupting flames with embers ──
export const FireEffect = ({ onComplete }) => (
  <motion.div onAnimationComplete={onComplete} style={center}>
    {/* Background heat glow */}
    <motion.div
      animate={{ opacity: [0, 0.25, 0.15, 0] }}
      transition={{ duration: 0.8 }}
      style={{ position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 50% 60%, rgba(255,80,0,0.4) 0%, transparent 60%)' }}
    />
    {/* Main fireball burst */}
    {[0, 0.06, 0.12].map((delay, i) => (
      <motion.div
        key={`burst-${i}`}
        initial={{ scale: 0.1, opacity: 1 }}
        animate={{ scale: [0.1, 1.2 + i * 0.3, 1.8 + i * 0.2], opacity: [1, 0.8, 0] }}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
        style={{
          position: 'absolute', width: 70, height: 70, borderRadius: '50%',
          background: `radial-gradient(circle, ${['#ffcc00', '#ff6600', '#ff3300'][i]} 0%, #ff4400 40%, transparent 70%)`,
          boxShadow: `0 0 ${20 + i * 10}px #ff4400, 0 0 ${40 + i * 10}px rgba(255,68,0,0.4)`,
        }}
      />
    ))}
    {/* Rising flame tongues */}
    {[0, 1, 2, 3, 4].map(i => (
      <motion.div
        key={`flame-${i}`}
        initial={{ opacity: 0, y: 10, scale: 0.5 }}
        animate={{ opacity: [0, 1, 0.8, 0], y: [10, -30 - i * 8], scale: [0.5, 1, 0.3] }}
        transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
        style={{
          position: 'absolute',
          width: 12, height: 20,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          background: i % 2 === 0 ? '#ff8800' : '#ffcc00',
          left: `${38 + i * 6}%`,
          boxShadow: `0 0 6px ${i % 2 === 0 ? '#ff6600' : '#ffaa00'}`,
        }}
      />
    ))}
    {/* Sparks/embers flying out */}
    {[0, 1, 2, 3, 4, 5].map(i => {
      const angle = (i / 6) * Math.PI * 2
      const dist = 35 + Math.random() * 20
      return (
        <motion.div
          key={`ember-${i}`}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist - 15,
          }}
          transition={{ duration: 0.5, delay: 0.15 + i * 0.03 }}
          style={{
            position: 'absolute', width: 4, height: 4, borderRadius: '50%',
            background: '#ffdd44',
            boxShadow: '0 0 4px #ff8800',
          }}
        />
      )
    })}
  </motion.div>
)

// ── Ice Effect — frost burst with crystals and freeze flash ──
export const IceEffect = ({ onComplete }) => {
  const shards = [
    { x: -25, y: -20, r: 0, s: 1 },
    { x: 20, y: -25, r: 45, s: 1.2 },
    { x: -15, y: 20, r: -30, s: 0.8 },
    { x: 25, y: 15, r: 60, s: 1.1 },
    { x: 0, y: -30, r: 15, s: 1.3 },
    { x: -30, y: 5, r: -50, s: 0.7 },
    { x: 30, y: -5, r: 70, s: 0.9 },
  ]
  return (
    <motion.div onAnimationComplete={onComplete} style={center}>
      {/* Freeze flash */}
      <motion.div
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.3 }}
        style={{ position: 'absolute', inset: 0,
          background: 'radial-gradient(circle, rgba(100,180,255,0.5) 0%, transparent 60%)' }}
      />
      {/* Central frost ring */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 1.5], opacity: [1, 0] }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'absolute', width: 80, height: 80, borderRadius: '50%',
          border: '2px solid rgba(150,220,255,0.7)',
          boxShadow: '0 0 15px rgba(100,180,255,0.5), inset 0 0 15px rgba(100,180,255,0.3)',
        }}
      />
      {/* Ice crystal shards */}
      {shards.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, s.s, s.s, 0.3],
            x: s.x, y: s.y,
            rotate: s.r,
          }}
          transition={{ duration: 0.5, delay: i * 0.04, ease: 'easeOut' }}
          style={{
            position: 'absolute', width: 14, height: 24,
            background: 'linear-gradient(180deg, #ccefff 0%, #4488ff 40%, #88ddff 100%)',
            clipPath: 'polygon(50% 0%, 85% 35%, 100% 100%, 0% 100%, 15% 35%)',
            boxShadow: '0 0 10px rgba(100,180,255,0.6)',
          }}
        />
      ))}
      {/* Frost particles */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
        const a = (i / 8) * Math.PI * 2
        return (
          <motion.div
            key={`frost-${i}`}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              x: Math.cos(a) * 40,
              y: Math.sin(a) * 40,
            }}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.02 }}
            style={{
              position: 'absolute', width: 3, height: 3, borderRadius: '50%',
              background: '#ccefff',
              boxShadow: '0 0 4px #88ccff',
            }}
          />
        )
      })}
    </motion.div>
  )
}

// ── Thunder Effect — multiple bolts with screen flash ──
export const ThunderEffect = ({ onComplete }) => (
  <motion.div onAnimationComplete={onComplete} style={center}>
    {/* Screen flash — double strobe */}
    <motion.div
      animate={{ opacity: [0, 0.5, 0, 0.35, 0, 0.2, 0] }}
      transition={{ duration: 0.6, times: [0, 0.08, 0.15, 0.22, 0.35, 0.45, 0.6] }}
      style={{ position: 'absolute', inset: 0, background: '#ffffaa' }}
    />
    {/* Main bolt */}
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: [0, 1, 1, 0], scaleY: [0, 1, 1, 1] }}
      transition={{ duration: 0.45, times: [0, 0.1, 0.6, 1] }}
      style={{ position: 'absolute', transformOrigin: 'top center', filter: 'drop-shadow(0 0 8px #ffee00)' }}
    >
      <svg width="50" height="110" viewBox="0 0 50 110">
        <polygon
          points="25,0 33,35 27,35 38,70 30,70 50,110 15,65 24,65 10,35 22,35"
          fill="#ffee00" stroke="#ffaa00" strokeWidth="1"
        />
      </svg>
    </motion.div>
    {/* Secondary bolt — offset left */}
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: [0, 0.7, 0.7, 0], scaleY: [0, 1, 1, 1] }}
      transition={{ duration: 0.4, delay: 0.08, times: [0, 0.12, 0.6, 1] }}
      style={{ position: 'absolute', left: '-15px', top: '-10px', transformOrigin: 'top center',
        filter: 'drop-shadow(0 0 6px #ffee00)' }}
    >
      <svg width="30" height="80" viewBox="0 0 30 80">
        <polygon
          points="15,0 20,25 16,25 24,50 18,50 30,80 8,48 14,48 5,25 13,25"
          fill="#ffee00" stroke="#ffcc00" strokeWidth="0.5" opacity="0.7"
        />
      </svg>
    </motion.div>
    {/* Electric sparks radiating */}
    {[0, 1, 2, 3, 4, 5].map(i => {
      const a = (i / 6) * Math.PI * 2
      return (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: Math.cos(a) * 30,
            y: Math.sin(a) * 30,
          }}
          transition={{ duration: 0.3, delay: 0.15 + i * 0.03 }}
          style={{
            position: 'absolute', width: 6, height: 2, borderRadius: '1px',
            background: '#ffee44',
            boxShadow: '0 0 4px #ffee00',
            transform: `rotate(${(a * 180) / Math.PI}deg)`,
          }}
        />
      )
    })}
    {/* Impact glow at bottom */}
    <motion.div
      initial={{ scale: 0.3, opacity: 0 }}
      animate={{ scale: [0.3, 1.2, 0.8], opacity: [0, 0.6, 0] }}
      transition={{ duration: 0.4, delay: 0.1 }}
      style={{
        position: 'absolute', bottom: '20%',
        width: 60, height: 30, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(255,238,0,0.6) 0%, transparent 70%)',
        boxShadow: '0 0 20px rgba(255,238,0,0.4)',
      }}
    />
  </motion.div>
)

// ── Enemy Attack Effect — red impact with shockwave ──
export const EnemyAttackEffect = ({ onComplete }) => (
  <motion.div onAnimationComplete={onComplete} style={center}>
    <motion.div
      animate={{ opacity: [0, 0.2, 0] }}
      transition={{ duration: 0.35 }}
      style={{ position: 'absolute', inset: 0, background: '#ff0000' }}
    />
    <motion.div
      initial={{ scale: 0.2, opacity: 1 }}
      animate={{ scale: [0.2, 1.5], opacity: [1, 0] }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'absolute', width: 70, height: 70, borderRadius: '50%',
        border: '2px solid rgba(255,80,80,0.6)',
        boxShadow: '0 0 20px rgba(255,0,0,0.4)',
      }}
    />
    <motion.div
      animate={{ opacity: [0, 0.9, 0, 0.7, 0] }}
      transition={{ duration: 0.4 }}
      style={{ position: 'absolute' }}
    >
      <Box w="70px" h="70px" borderRadius="50%"
        bg="radial-gradient(circle, rgba(255,50,50,0.9) 0%, transparent 70%)"
        boxShadow="0 0 30px rgba(255,0,0,0.6)" />
    </motion.div>
  </motion.div>
)

// ── Item Heal Effect — rising green sparkles with glow ──
export const ItemEffect = ({ onComplete }) => (
  <motion.div onAnimationComplete={onComplete} style={center}>
    <motion.div
      animate={{ opacity: [0, 0.15, 0] }}
      transition={{ duration: 0.7 }}
      style={{ position: 'absolute', inset: 0,
        background: 'radial-gradient(circle, rgba(50,220,80,0.3) 0%, transparent 60%)' }}
    />
    {[0, 1, 2, 3, 4, 5].map(i => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 25, scale: 0.5 }}
        animate={{ opacity: [0, 1, 0.8, 0], y: [25, -25 - i * 5], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 0.7, delay: i * 0.07 }}
        style={{
          position: 'absolute',
          width: 6 + (i % 2) * 3, height: 6 + (i % 2) * 3, borderRadius: '50%',
          background: i % 2 === 0 ? '#44dd66' : '#88ffaa',
          boxShadow: `0 0 ${6 + i * 2}px #44dd66`,
          left: `${30 + i * 8}%`,
        }}
      />
    ))}
  </motion.div>
)

// Effect dispatcher
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
