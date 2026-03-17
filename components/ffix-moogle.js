import { useState, useEffect, useRef } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

// SVG Moogle — modelled after FFIX design:
// round merged head+body, small cat ears, red-iris eyes, dark purple bat wings,
// fluffy chest patch, stubby arms, small feet, open mouth with teeth
const MoogleSVG = ({ size = 70 }) => (
  <svg
    width={size}
    height={size * 1.15}
    viewBox="0 0 100 115"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: 'visible', display: 'block' }}
  >
    {/* ── Antenna + pompom ── */}
    <line x1="50" y1="19" x2="50" y2="30" stroke="#c0a888" strokeWidth="2" strokeLinecap="round" />
    <circle cx="50" cy="11"  r="10"  fill="#cc2020" />
    <circle cx="46" cy="8.5" r="3.5" fill="#ee5555" opacity="0.6" />

    {/* ── Dark purple bat wings — behind body, 3 finger membranes each ── */}
    {/* Left wing */}
    <path d="M 21 62 Q 5  46 10 28 Q 16 42 22 54 Z"  fill="#7a3265" />
    <path d="M 21 66 Q 2  56 9  42 Q 16 52 22 60 Z"  fill="#6a2858" opacity="0.92" />
    <path d="M 21 70 Q 4  66 11 56 Q 17 63 22 66 Z"  fill="#5a2050" opacity="0.8"  />
    <path d="M 21 63 Q 5  46 10 28" fill="none" stroke="#3a1030" strokeWidth="0.7" strokeLinecap="round" />
    <path d="M 21 67 Q 2  56 9  42" fill="none" stroke="#3a1030" strokeWidth="0.6" strokeLinecap="round" opacity="0.7" />
    {/* Right wing */}
    <path d="M 79 62 Q 95 46 90 28 Q 84 42 78 54 Z"  fill="#7a3265" />
    <path d="M 79 66 Q 98 56 91 42 Q 84 52 78 60 Z"  fill="#6a2858" opacity="0.92" />
    <path d="M 79 70 Q 96 66 89 56 Q 83 63 78 66 Z"  fill="#5a2050" opacity="0.8"  />
    <path d="M 79 63 Q 95 46 90 28" fill="none" stroke="#3a1030" strokeWidth="0.7" strokeLinecap="round" />
    <path d="M 79 67 Q 98 56 91 42" fill="none" stroke="#3a1030" strokeWidth="0.6" strokeLinecap="round" opacity="0.7" />

    {/* ── Small cat ears — on top of head ── */}
    <ellipse cx="33" cy="33" rx="7"   ry="6"   fill="#f0ddd0" />
    <ellipse cx="67" cy="33" rx="7"   ry="6"   fill="#f0ddd0" />
    <ellipse cx="33" cy="33" rx="3.8" ry="3.2" fill="#f0b8b0" />
    <ellipse cx="67" cy="33" rx="3.8" ry="3.2" fill="#f0b8b0" />

    {/* ── Body — single large oval, head merges into torso ── */}
    <ellipse cx="50" cy="65" rx="30" ry="34" fill="#f2e2d4" />

    {/* Fluffy chest patch */}
    <ellipse cx="50" cy="72" rx="18" ry="16" fill="#ecddd0" />

    {/* ── Stubby arms ── */}
    <ellipse cx="23" cy="74" rx="7"  ry="9"  fill="#ecd8c8" transform="rotate(-18 23 74)" />
    <ellipse cx="77" cy="74" rx="7"  ry="9"  fill="#ecd8c8" transform="rotate(18 77 74)" />

    {/* ── Small feet ── */}
    <ellipse cx="40" cy="97" rx="10" ry="6"  fill="#d8c4a8" />
    <ellipse cx="60" cy="97" rx="10" ry="6"  fill="#d8c4a8" />

    {/* ── Eyes — white sclera, red iris, dark pupil (FFIX style) ── */}
    <circle cx="38" cy="56" r="8"   fill="white" />
    <circle cx="62" cy="56" r="8"   fill="white" />
    <circle cx="38" cy="56" r="5.5" fill="#cc2828" />
    <circle cx="62" cy="56" r="5.5" fill="#cc2828" />
    <circle cx="38" cy="56" r="2.8" fill="#1a0808" />
    <circle cx="62" cy="56" r="2.8" fill="#1a0808" />
    {/* Eye shine */}
    <circle cx="35" cy="53" r="2"   fill="white" />
    <circle cx="59" cy="53" r="2"   fill="white" />

    {/* ── Nose ── */}
    <ellipse cx="50" cy="64" rx="4" ry="2.8" fill="#e87090" />

    {/* ── Mouth — open with two white teeth ── */}
    <path d="M 42 70 Q 50 78 58 70 L 58 69 Q 50 76 42 69 Z" fill="#7a2828" />
    <rect x="46"   y="69" width="3.2" height="4" rx="0.8" fill="white" />
    <rect x="50.5" y="69" width="3.2" height="4" rx="0.8" fill="white" />
    <path d="M 42 69 Q 50 77 58 69" fill="none" stroke="#a03030" strokeWidth="0.9" strokeLinecap="round" />
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
          style={{ display: 'inline-block', position: 'relative', pointerEvents: 'auto', cursor: 'pointer' }}
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
