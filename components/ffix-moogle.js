import { useState, useEffect, useRef } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSiteTheme } from '../lib/site-theme-context'

// SVG Moogle — FFIX design: round body, bat wings, red eyes, antenna pompom
const MoogleSVG = ({ size = 70 }) => (
  <svg
    width={size}
    height={size * 1.15}
    viewBox="0 0 100 115"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: 'visible', display: 'block' }}
  >
    {/* Antenna + pompom */}
    <line x1="50" y1="19" x2="50" y2="30" stroke="#c0a888" strokeWidth="2" strokeLinecap="round" />
    <circle cx="50" cy="11" r="10" fill="#cc2020" />
    <circle cx="46" cy="8.5" r="3.5" fill="#ee5555" opacity="0.6" />

    {/* Dark purple bat wings */}
    <path d="M 21 62 Q 5  46 10 28 Q 16 42 22 54 Z" fill="#7a3265" />
    <path d="M 21 66 Q 2  56 9  42 Q 16 52 22 60 Z" fill="#6a2858" opacity="0.92" />
    <path d="M 21 70 Q 4  66 11 56 Q 17 63 22 66 Z" fill="#5a2050" opacity="0.8" />
    <path d="M 21 63 Q 5  46 10 28" fill="none" stroke="#3a1030" strokeWidth="0.7" strokeLinecap="round" />
    <path d="M 21 67 Q 2  56 9  42" fill="none" stroke="#3a1030" strokeWidth="0.6" strokeLinecap="round" opacity="0.7" />
    <path d="M 79 62 Q 95 46 90 28 Q 84 42 78 54 Z" fill="#7a3265" />
    <path d="M 79 66 Q 98 56 91 42 Q 84 52 78 60 Z" fill="#6a2858" opacity="0.92" />
    <path d="M 79 70 Q 96 66 89 56 Q 83 63 78 66 Z" fill="#5a2050" opacity="0.8" />
    <path d="M 79 63 Q 95 46 90 28" fill="none" stroke="#3a1030" strokeWidth="0.7" strokeLinecap="round" />
    <path d="M 79 67 Q 98 56 91 42" fill="none" stroke="#3a1030" strokeWidth="0.6" strokeLinecap="round" opacity="0.7" />

    {/* Cat ears */}
    <ellipse cx="33" cy="33" rx="7" ry="6" fill="#f0ddd0" />
    <ellipse cx="67" cy="33" rx="7" ry="6" fill="#f0ddd0" />
    <ellipse cx="33" cy="33" rx="3.8" ry="3.2" fill="#f0b8b0" />
    <ellipse cx="67" cy="33" rx="3.8" ry="3.2" fill="#f0b8b0" />

    {/* Body */}
    <ellipse cx="50" cy="65" rx="30" ry="34" fill="#f2e2d4" />
    <ellipse cx="50" cy="72" rx="18" ry="16" fill="#ecddd0" />

    {/* Arms */}
    <ellipse cx="23" cy="74" rx="7" ry="9" fill="#ecd8c8" transform="rotate(-18 23 74)" />
    <ellipse cx="77" cy="74" rx="7" ry="9" fill="#ecd8c8" transform="rotate(18 77 74)" />

    {/* Feet */}
    <ellipse cx="40" cy="97" rx="10" ry="6" fill="#d8c4a8" />
    <ellipse cx="60" cy="97" rx="10" ry="6" fill="#d8c4a8" />

    {/* Eyes */}
    <circle cx="38" cy="56" r="8" fill="white" />
    <circle cx="62" cy="56" r="8" fill="white" />
    <circle cx="38" cy="56" r="5.5" fill="#cc2828" />
    <circle cx="62" cy="56" r="5.5" fill="#cc2828" />
    <circle cx="38" cy="56" r="2.8" fill="#1a0808" />
    <circle cx="62" cy="56" r="2.8" fill="#1a0808" />
    <circle cx="35" cy="53" r="2" fill="white" />
    <circle cx="59" cy="53" r="2" fill="white" />

    {/* Nose */}
    <ellipse cx="50" cy="64" rx="4" ry="2.8" fill="#e87090" />

    {/* Mouth */}
    <path d="M 42 70 Q 50 78 58 70 L 58 69 Q 50 76 42 69 Z" fill="#7a2828" />
    <rect x="46" y="69" width="3.2" height="4" rx="0.8" fill="white" />
    <rect x="50.5" y="69" width="3.2" height="4" rx="0.8" fill="white" />
    <path d="M 42 69 Q 50 77 58 69" fill="none" stroke="#a03030" strokeWidth="0.9" strokeLinecap="round" />
  </svg>
)

// SVG Protoss Probe — golden metallic body, blue photon lens, energy appendages
const ProbeSVG = ({ size = 70 }) => (
  <svg
    width={size}
    height={size * 1.15}
    viewBox="0 0 100 115"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: 'visible', display: 'block' }}
  >
    {/* Energy trail below — hover glow */}
    <ellipse cx="50" cy="100" rx="16" ry="4" fill="#00bbdd" opacity="0.15" />
    <ellipse cx="50" cy="100" rx="10" ry="2.5" fill="#00ddff" opacity="0.25" />

    {/* Side energy appendages — left */}
    <path d="M 25 58 L 12 48 L 14 52 L 22 60 Z" fill="#556688" stroke="#00aadd" strokeWidth="0.5" />
    <path d="M 25 66 L 8 72 L 12 70 L 24 66 Z" fill="#556688" stroke="#00aadd" strokeWidth="0.5" />
    {/* Appendage energy tips */}
    <circle cx="12" cy="48" r="2.5" fill="#00ddff" opacity="0.8" />
    <circle cx="8" cy="72" r="2.5" fill="#00ddff" opacity="0.8" />

    {/* Side energy appendages — right */}
    <path d="M 75 58 L 88 48 L 86 52 L 78 60 Z" fill="#556688" stroke="#00aadd" strokeWidth="0.5" />
    <path d="M 75 66 L 92 72 L 88 70 L 76 66 Z" fill="#556688" stroke="#00aadd" strokeWidth="0.5" />
    <circle cx="88" cy="48" r="2.5" fill="#00ddff" opacity="0.8" />
    <circle cx="92" cy="72" r="2.5" fill="#00ddff" opacity="0.8" />

    {/* Main body — metallic golden shell */}
    <ellipse cx="50" cy="62" rx="26" ry="30" fill="#8a7740" />
    {/* Body highlight */}
    <ellipse cx="50" cy="55" rx="22" ry="22" fill="#a08850" />
    {/* Body top shine */}
    <ellipse cx="46" cy="44" rx="12" ry="8" fill="#c0a060" opacity="0.6" />

    {/* Central ridge line */}
    <line x1="50" y1="32" x2="50" y2="85" stroke="#6a5a30" strokeWidth="1.5" opacity="0.4" />

    {/* Photon lens housing — dark recessed area */}
    <ellipse cx="50" cy="56" rx="14" ry="12" fill="#2a2a3a" />
    {/* Outer lens ring */}
    <ellipse cx="50" cy="56" rx="11" ry="9" fill="none" stroke="#00aadd" strokeWidth="1.5" opacity="0.6" />
    {/* Inner photon lens — glowing blue */}
    <circle cx="50" cy="56" r="7" fill="#003355" />
    <circle cx="50" cy="56" r="5" fill="#005588" />
    <circle cx="50" cy="56" r="3.5" fill="#00bbdd" />
    <circle cx="50" cy="56" r="2" fill="#00eeff" />
    {/* Lens shine */}
    <circle cx="47" cy="53" r="1.8" fill="white" opacity="0.6" />

    {/* Top antenna / psionic receiver */}
    <line x1="50" y1="32" x2="50" y2="22" stroke="#8a7740" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="50" cy="18" r="4" fill="#556688" stroke="#00aadd" strokeWidth="1" />
    <circle cx="50" cy="18" r="2" fill="#00ddff" opacity="0.9" />

    {/* Bottom thrusters */}
    <ellipse cx="40" cy="88" rx="5" ry="3" fill="#556688" />
    <ellipse cx="60" cy="88" rx="5" ry="3" fill="#556688" />
    <ellipse cx="40" cy="90" rx="3" ry="5" fill="#00bbdd" opacity="0.3" />
    <ellipse cx="60" cy="90" rx="3" ry="5" fill="#00bbdd" opacity="0.3" />

    {/* Panel lines for detail */}
    <path d="M 30 50 Q 50 38 70 50" fill="none" stroke="#6a5a30" strokeWidth="0.8" opacity="0.5" />
    <path d="M 28 65 Q 50 78 72 65" fill="none" stroke="#6a5a30" strokeWidth="0.8" opacity="0.5" />
  </svg>
)

const BUBBLE_DATA = {
  ffix: { text: 'Kupo! ♪', accent: '#c8a800', textColor: '#f0e060' },
  sc2:  { text: 'My life for Aiur!', accent: '#00bbdd', textColor: '#c0e8ff' },
}

const SpeechBubble = () => {
  const { theme } = useSiteTheme()
  const b = BUBBLE_DATA[theme]
  return (
    <Box
      position="absolute"
      bottom="100%"
      left="50%"
      transform="translateX(-50%)"
      mb={1}
      bg="rgba(8,14,40,0.97)"
      border={`1.5px solid ${b.accent}`}
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
        borderTop: `7px solid ${b.accent}`,
      }}
    >
      <Text fontSize="xs" color={b.textColor} fontFamily="monospace" fontWeight="bold" lineHeight={1.2}>
        {b.text}
      </Text>
    </Box>
  )
}

// Pick mascot SVG based on active theme
const MascotSVG = ({ size }) => {
  const { theme } = useSiteTheme()
  return theme === 'sc2' ? <ProbeSVG size={size} /> : <MoogleSVG size={size} />
}

const randomPos = (w, h, size) => ({
  x: 60 + Math.random() * (w - size - 100),
  y: 60 + Math.random() * (h - size * 1.3 - 80),
})

// Flying mascot — fixed-positioned, roams around the viewport
export const FfixMoogleFlying = ({ size = 58 }) => {
  const [pos, setPos]         = useState({ x: -200, y: -200 })
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

  useEffect(() => {
    const x = window.innerWidth * 0.78
    const y = window.innerHeight * 0.15
    setPos({ x, y })
    prevX.current = x
  }, [])

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
    <motion.div
      style={{ position: 'fixed', zIndex: 9999, pointerEvents: 'none' }}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ duration: 2.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        style={{ display: 'inline-block' }}
        animate={{ scaleX: flipped ? -1 : 1 }}
        transition={{ duration: 0.4 }}
      >
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
                key="bubble"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  scaleX: flipped ? -1 : 1,
                }}
              >
                <SpeechBubble />
              </motion.div>
            )}
          </AnimatePresence>
          <MascotSVG size={size} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Static in-place version
const FfixMoogle = ({ size = 70 }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <Box position="relative" display="inline-block">
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="bubble-static"
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', zIndex: 20, whiteSpace: 'nowrap' }}
          >
            <SpeechBubble />
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
        <MascotSVG size={size} />
      </motion.div>
    </Box>
  )
}

export default FfixMoogle
