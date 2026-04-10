import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@chakra-ui/react'
import { useSiteTheme } from '../lib/site-theme-context'

const GameThemeToggle = () => {
  const { theme, toggleTheme } = useSiteTheme()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        style={{ display: 'inline-block', marginRight: '8px' }}
        key={theme}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          aria-label="Toggle game theme"
          size="sm"
          fontFamily="monospace"
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="0.08em"
          bg={theme === 'ffix' ? '#c8a800' : '#00bbdd'}
          color={theme === 'ffix' ? '#1a1000' : '#001a22'}
          _hover={{
            bg: theme === 'ffix' ? '#e0c000' : '#00ddff',
            transform: 'translateY(-1px)',
          }}
          transition="all 0.15s"
          onClick={toggleTheme}
        >
          {theme === 'ffix' ? 'FFIX' : 'SC2'}
        </Button>
      </motion.div>
    </AnimatePresence>
  )
}

export default GameThemeToggle
