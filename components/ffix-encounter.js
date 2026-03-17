import { useEffect, useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

// Triggered by: window.dispatchEvent(new Event('ffix-encounter'))
// Click the Moogle 5× to activate — see ffix-moogle.js

const MESSAGES = [
  { enemy: 'WILD BUG',        action: 'Deploy fix?' },
  { enemy: 'SCOPE CREEP',     action: 'Defend scope?' },
  { enemy: 'LEGACY CODE',     action: 'Refactor?' },
  { enemy: 'DEADLINE',        action: 'Ship now?' },
  { enemy: 'MERGE CONFLICT',  action: 'Resolve?' },
]

const FfixEncounter = () => {
  const [phase, setPhase]     = useState(null) // null | 'flash' | 'battle' | 'fade'
  const [encounter, setEncounter] = useState(MESSAGES[0])

  useEffect(() => {
    const trigger = () => {
      // Pick a random encounter message
      setEncounter(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])

      setPhase('flash')
      const t1 = setTimeout(() => setPhase('battle'), 350)
      const t2 = setTimeout(() => setPhase('fade'),   1600)
      const t3 = setTimeout(() => setPhase(null),     2200)
      return () => [t1, t2, t3].forEach(clearTimeout)
    }

    window.addEventListener('ffix-encounter', trigger)
    return () => window.removeEventListener('ffix-encounter', trigger)
  }, [])

  return (
    <AnimatePresence>
      {phase === 'flash' && (
        <motion.div
          key="flash"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.35, times: [0, 0.1, 0.8, 1] }}
          style={{ position: 'fixed', inset: 0, background: 'white', zIndex: 99999, pointerEvents: 'none' }}
        />
      )}

      {phase === 'battle' && (
        <motion.div
          key="battle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ position: 'fixed', inset: 0, zIndex: 99999, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Box
            bg="rgba(0,0,0,0.92)"
            w="100%"
            h="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap={4}
          >
            {/* Enemy name flash */}
            <motion.div
              animate={{ x: [-10, 0] }}
              transition={{ duration: 0.2 }}
            >
              <Text
                fontFamily="monospace"
                fontSize={{ base: 'xl', md: '3xl' }}
                fontWeight="bold"
                color="#f0e6a0"
                letterSpacing="0.2em"
              >
                ！{encounter.enemy} appeared！
              </Text>
            </motion.div>

            {/* ATB-style action prompt */}
            <Box
              border="2px solid #c8a800"
              borderRadius="sm"
              px={6}
              py={3}
              bg="rgba(8,14,40,0.97)"
            >
              <Text fontFamily="monospace" fontSize="sm" color="#c8a800" letterSpacing="0.15em">
                ◆ {encounter.action}
              </Text>
            </Box>

            <Text fontFamily="monospace" fontSize="xs" color="#9890a0" letterSpacing="0.1em">
              (hint: click Moogle 5× to trigger)
            </Text>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FfixEncounter
