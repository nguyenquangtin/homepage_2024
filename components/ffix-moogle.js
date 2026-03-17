import { useState, useEffect, useRef } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

// SVG Moogle — drawn with simple shapes, no external assets
const MoogleSVG = ({ size = 70 }) => (
  <svg
    width={size}
    height={size * 1.15}
    viewBox="0 0 80 92"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: 'visible', display: 'block' }}
  >
    <line x1="40" y1="20" x2="40" y2="32" stroke="#888" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="40" cy="11" r="9.5" fill="#e03030" />
    <circle cx="36" cy="8" r="3.5" fill="#ff7070" opacity="0.65" />
    <ellipse cx="19" cy="35" rx="9" ry="6.5" fill="#ece0c4" />
    <ellipse cx="61" cy="35" rx="9" ry="6.5" fill="#ece0c4" />
    <path d="M8 54 Q0 40 13 29 Q22 46 22 58 Z" fill="#e878c0" opacity="0.9" />
    <path d="M72 54 Q80 40 67 29 Q58 46 58 58 Z" fill="#e878c0" opacity="0.9" />
    <ellipse cx="40" cy="59" rx="29" ry="26" fill="#f0e8d4" />
    <ellipse cx="40" cy="69" rx="12" ry="9" fill="#e0d8c0" />
    <circle cx="30" cy="54" r="5" fill="#1a0e0e" />
    <circle cx="50" cy="54" r="5" fill="#1a0e0e" />
    <circle cx="28" cy="52" r="1.8" fill="white" />
    <circle cx="48" cy="52" r="1.8" fill="white" />
    <ellipse cx="40" cy="62" rx="5" ry="3.5" fill="#e87090" />
  </svg>
)

const KupoBubble = () => (
  <Box
    position="absolute"
    bottom="100%"
    left="50%"
    transform="translateX(-50%)"
    mb={1}
    bg="rgba(8,14,40,0.97)"
    border="1.5px solid #c8a800"
    borderRadius="md"
    px={3}
    py={1}
    whiteSpace="nowrap"
    zIndex={10001}
    _after={{
      content: '""',
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderTop: '7px solid #c8a800',
    }}
  >
    <Text fontSize="xs" color="#f0e060" fontFamily="monospace" fontWeight="bold" lineHeight={1.2}>
      Kupo! ♪
    </Text>
  </Box>
)

// Returns a random viewport-safe position, keeping the Moogle fully visible
const randomPos = (w, h, size) => ({
  x: 60 + Math.random() * (w - size - 100),
  y: 60 + Math.random() * (h - size * 1.3 - 80),
})

// Flying Moogle — fixed-positioned, roams around the viewport
export const FfixMoogleFlying = ({ size = 58 }) => {
  const [pos, setPos]         = useState({ x: -200, y: -200 }) // off-screen until mounted
  const [flipped, setFlipped] = useState(false)
  const [hovered, setHovered] = useState(false)
  const prevX                 = useRef(0)
  const clickCount            = useRef(0)

  const handleClick = () => {
    clickCount.current += 1
    if (clickCount.current >= 5) {
      clickCount.current = 0
      window.dispatchEvent(new Event('ffix-encounter'))
    }
  }

  // Set initial position after mount (needs window)
  useEffect(() => {
    const x = window.innerWidth * 0.78
    const y = window.innerHeight * 0.15
    setPos({ x, y })
    prevX.current = x
  }, [])

  // Roam: pick a new random spot every ~3.5 s
  useEffect(() => {
    const roam = () => {
      const { x, y } = randomPos(window.innerWidth, window.innerHeight, size)
      setFlipped(x < prevX.current)
      prevX.current = x
      setPos({ x, y })
    }
    const id = setInterval(roam, 3500)
    return () => clearInterval(id)
  }, [size])

  return (
    // Outer: handles the viewport-level glide (x/y translation)
    <motion.div
      style={{ position: 'fixed', zIndex: 9999, pointerEvents: 'none' }}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ duration: 2.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Flip layer: mirrors horizontally based on direction of travel */}
      <motion.div
        style={{ display: 'inline-block' }}
        animate={{ scaleX: flipped ? -1 : 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Interactive layer: hover + bobbing */}
        <motion.div
          style={{ display: 'inline-block', position: 'relative', pointerEvents: 'auto' }}
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2.0, ease: 'easeInOut' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleClick}
          whileHover={{ scale: 1.15 }}
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="kupo"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  // un-flip the bubble so text is always readable
                  scaleX: flipped ? -1 : 1,
                }}
              >
                <KupoBubble />
              </motion.div>
            )}
          </AnimatePresence>
          <MoogleSVG size={size} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Static in-place version (kept for potential reuse elsewhere)
const FfixMoogle = ({ size = 70 }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <Box position="relative" display="inline-block">
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="kupo-static"
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', zIndex: 20, whiteSpace: 'nowrap' }}
          >
            <KupoBubble />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: 'pointer', display: 'inline-block' }}
        whileHover={{ scale: 1.08 }}
      >
        <MoogleSVG size={size} />
      </motion.div>
    </Box>
  )
}

export default FfixMoogle
