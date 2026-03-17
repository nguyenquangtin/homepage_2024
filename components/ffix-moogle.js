import { useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

// SVG Moogle — drawn with simple shapes, no external assets
const MoogleSVG = ({ size = 70 }) => (
  <svg
    width={size}
    height={size * 1.15}
    viewBox="0 0 80 92"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: 'visible' }}
  >
    {/* Antenna wire */}
    <line x1="40" y1="20" x2="40" y2="32" stroke="#888" strokeWidth="2.5" strokeLinecap="round" />

    {/* Pompom */}
    <circle cx="40" cy="11" r="9.5" fill="#e03030" />
    <circle cx="36" cy="8" r="3.5" fill="#ff7070" opacity="0.65" />

    {/* Ears */}
    <ellipse cx="19" cy="35" rx="9" ry="6.5" fill="#ece0c4" />
    <ellipse cx="61" cy="35" rx="9" ry="6.5" fill="#ece0c4" />

    {/* Wings — left */}
    <path d="M8 54 Q0 40 13 29 Q22 46 22 58 Z" fill="#e878c0" opacity="0.9" />
    {/* Wings — right */}
    <path d="M72 54 Q80 40 67 29 Q58 46 58 58 Z" fill="#e878c0" opacity="0.9" />

    {/* Body */}
    <ellipse cx="40" cy="59" rx="29" ry="26" fill="#f0e8d4" />

    {/* Belly tuft */}
    <ellipse cx="40" cy="69" rx="12" ry="9" fill="#e0d8c0" />

    {/* Eyes */}
    <circle cx="30" cy="54" r="5" fill="#1a0e0e" />
    <circle cx="50" cy="54" r="5" fill="#1a0e0e" />
    {/* Eye shine */}
    <circle cx="28" cy="52" r="1.8" fill="white" />
    <circle cx="48" cy="52" r="1.8" fill="white" />

    {/* Nose */}
    <ellipse cx="40" cy="62" rx="5" ry="3.5" fill="#e87090" />
  </svg>
)

const FfixMoogle = ({ size = 70 }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Box position="relative" display="inline-block">
      {/* Kupo! speech bubble */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              top: '-38px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
              whiteSpace: 'nowrap',
            }}
          >
            <Box
              bg="rgba(8,14,40,0.97)"
              border="1.5px solid #c8a800"
              borderRadius="md"
              px={3}
              py={1}
              position="relative"
              _after={{
                content: '""',
                position: 'absolute',
                bottom: '-7px',
                left: '50%',
                transform: 'translateX(-50%)',
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '7px solid #c8a800',
              }}
            >
              <Text
                fontSize="xs"
                color="#f0e060"
                fontFamily="monospace"
                fontWeight="bold"
                lineHeight={1.2}
              >
                Kupo! ♪
              </Text>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bobbing animation wrapper */}
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
