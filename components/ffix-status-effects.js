import { useState, useEffect } from 'react'
import { Box, Text, Flex } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

// Status effects with FFIX colour coding
const EFFECTS = [
  { label: 'FOCUSED',     color: '#aa66ff' },
  { label: 'CAFFEINATED', color: '#ffcc00' },
  { label: 'SHIPPING',    color: '#00cc55' },
  { label: 'DEBUGGING',   color: '#ff8844' },
  { label: 'INSPIRED',    color: '#44ccff' },
  { label: 'IN FLOW',     color: '#ff88bb' },
  { label: 'COFFEE+CODE', color: '#c8a800' },
]

// Show 3 effects at a time, cycle one out every 2.5 s
const FfixStatusEffects = () => {
  const [trio, setTrio] = useState([0, 1, 2])

  useEffect(() => {
    const id = setInterval(() => {
      setTrio(prev => {
        const next = (prev[2] + 1) % EFFECTS.length
        return [prev[1], prev[2], next]
      })
    }, 2500)
    return () => clearInterval(id)
  }, [])

  return (
    <Flex gap={2} wrap="wrap" align="center">
      <Text fontSize="9px" fontFamily="monospace" color="#9890a0" letterSpacing="0.1em" mr={1}>
        STATUS
      </Text>
      <AnimatePresence mode="popLayout">
        {trio.map(i => (
          <motion.div
            key={i}
            layout
            initial={{ opacity: 0, scale: 0.75, y: -4 }}
            animate={{ opacity: 1, scale: 1,    y: 0   }}
            exit={{    opacity: 0, scale: 0.75, y:  4   }}
            transition={{ duration: 0.3 }}
          >
            <Box
              bg="rgba(8,14,40,0.97)"
              border={`1px solid ${EFFECTS[i].color}55`}
              borderRadius="sm"
              px={2}
              py="2px"
            >
              <Text
                fontSize="9px"
                fontFamily="monospace"
                color={EFFECTS[i].color}
                fontWeight="bold"
                letterSpacing="0.12em"
              >
                ✦ {EFFECTS[i].label}
              </Text>
            </Box>
          </motion.div>
        ))}
      </AnimatePresence>
    </Flex>
  )
}

export default FfixStatusEffects
