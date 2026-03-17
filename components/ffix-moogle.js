import { useState, useEffect, useRef } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

// SVG Moogle — fluffy body, bat wings (2 membranes each), open mouth with teeth
const MoogleSVG = ({ size = 70 }) => (
  <svg
    width={size}
    height={size * 1.12}
    viewBox="0 0 90 100"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: 'visible', display: 'block' }}
  >
    {/* Antenna */}
    <line x1="45" y1="20" x2="45" y2="33" stroke="#999" strokeWidth="2.5" strokeLinecap="round" />

    {/* Pompom */}
    <circle cx="45" cy="11" r="10" fill="#e02828" />
    <circle cx="41" cy="8"  r="3.5" fill="#ff6666" opacity="0.6" />

    {/* Ears — round with inner highlight */}
    <ellipse cx="22" cy="36" rx="9"  ry="7"  fill="#ece0c4" />
    <ellipse cx="68" cy="36" rx="9"  ry="7"  fill="#ece0c4" />
    <ellipse cx="22" cy="35" rx="5"  ry="4"  fill="#f8eed8" />
    <ellipse cx="68" cy="35" rx="5"  ry="4"  fill="#f8eed8" />

    {/* ── Wings — bat style, two overlapping membranes per side ── */}

    {/* Left wing: upper membrane (longer, points high) */}
    <path d="M 14 57 Q 1 44 5 25 Q 13 38 20 50 Z" fill="#e06aaa" />
    {/* Left wing: lower membrane (shorter, gives finger effect) */}
    <path d="M 14 62 Q 2 55 7 42 Q 15 50 21 58 Z" fill="#c45898" opacity="0.85" />
    {/* Left wing veins */}
    <path d="M 14 58 Q 1 44 5 25" fill="none" stroke="#a84080" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M 14 62 Q 2 55 7 42"  fill="none" stroke="#a84080" strokeWidth="0.7" strokeLinecap="round" opacity="0.7" />

    {/* Right wing: upper membrane */}
    <path d="M 76 57 Q 89 44 85 25 Q 77 38 70 50 Z" fill="#e06aaa" />
    {/* Right wing: lower membrane */}
    <path d="M 76 62 Q 88 55 83 42 Q 75 50 69 58 Z" fill="#c45898" opacity="0.85" />
    {/* Right wing veins */}
    <path d="M 76 58 Q 89 44 85 25" fill="none" stroke="#a84080" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M 76 62 Q 88 55 83 42"  fill="none" stroke="#a84080" strokeWidth="0.7" strokeLinecap="round" opacity="0.7" />

    {/* Body — large fluffy round */}
    <ellipse cx="45" cy="66" rx="31" ry="27" fill="#f2ead6" />

    {/* Belly tuft */}
    <ellipse cx="45" cy="76" rx="14" ry="10" fill="#e8dfc8" />

    {/* Eyes */}
    <circle cx="33" cy="60" r="5.5" fill="#1a0e0e" />
    <circle cx="57" cy="60" r="5.5" fill="#1a0e0e" />
    {/* Eye shine */}
    <circle cx="31" cy="58" r="2"   fill="white" />
    <circle cx="55" cy="58" r="2"   fill="white" />

    {/* Nose */}
    <ellipse cx="45" cy="68" rx="5" ry="3.5" fill="#e87090" />

    {/* Mouth — open smile with two teeth */}
    {/* Dark mouth interior */}
    <path d="M 37 74 Q 45 82 53 74 L 53 73 Q 45 79 37 73 Z" fill="#6a2828" />
    {/* Two little teeth */}
    <rect x="41"   y="72.5" width="3.5" height="4" rx="0.8" fill="white" />
    <rect x="45.5" y="72.5" width="3.5" height="4" rx="0.8" fill="white" />
    {/* Mouth curve outline */}
    <path d="M 37 73 Q 45 80 53 73" fill="none" stroke="#9a3838" strokeWidth="1" strokeLinecap="round" />
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
