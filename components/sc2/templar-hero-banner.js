import { useRef } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useInViewport } from '../../lib/use-in-viewport'
import CommanderFrame from './commander-portrait-frame'
import TemplarConsoleScene from './templar-console-scene'
import TemplarTaskScreens, { TASKS, useTemplarTaskCycle } from './templar-task-screens'
import {
  KHALA_GOLD_RGB,
  PALETTES,
  PROTOSS_CYAN,
  PROTOSS_CYAN_RGB
} from '../../lib/site-theme-context'

const sc2 = PALETTES.sc2

// Cinematic hero banner (High Templar pass): the animated templar scene in
// the same gold commander frame as the portrait card below it, plus a mono
// caption strip. `screen` overrides the cycling task screens (see
// templar-task-screens.js); the right label mirrors the active task.
const TemplarHeroBanner = ({ screen, ...rest }) => {
  const ref = useRef(null)
  const inView = useInViewport(ref)
  const index = useTemplarTaskCycle(inView)
  const task = TASKS[index]

  return (
    <Box ref={ref} mb={{ base: 6, md: 7 }} {...rest}>
      <CommanderFrame>
        <TemplarConsoleScene
          paused={!inView}
          screen={screen || <TemplarTaskScreens index={index} />}
        />

        <Flex
          px={{ base: 3, md: 4 }}
          py={1.5}
          bg={`rgba(${KHALA_GOLD_RGB}, 0.07)`}
          borderTop={`1px solid rgba(${KHALA_GOLD_RGB}, 0.35)`}
          justify="space-between"
          align="center"
          gap={3}
        >
          <Text
            fontFamily="mono"
            fontSize="10px"
            letterSpacing="0.15em"
            textTransform="uppercase"
            color={PROTOSS_CYAN}
            textShadow={`0 0 8px rgba(${PROTOSS_CYAN_RGB}, 0.35)`}
            whiteSpace="nowrap"
          >
            &#9656; High Templar · On Duty
          </Text>
          <Text
            fontFamily="mono"
            fontSize="10px"
            letterSpacing="0.12em"
            color={sc2.muted}
            whiteSpace="nowrap"
            display={{ base: 'none', sm: 'block' }}
          >
            TASK {task.code}/{String(TASKS.length).padStart(2, '0')} · {task.label}
          </Text>
        </Flex>
      </CommanderFrame>
    </Box>
  )
}

export default TemplarHeroBanner
