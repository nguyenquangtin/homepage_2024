import { Box, Flex, Text } from '@chakra-ui/react'
import {
  PALETTES,
  PROTOSS_CYAN,
  PROTOSS_CYAN_RGB
} from '../../lib/site-theme-context'

const sc2 = PALETTES.sc2

// Four corner brackets — SC2 selection frame (white angles on the active
// card). Render inside a position:relative parent. With `hoverReveal` the
// brackets stay hidden until the parent (role="group") is hovered.
export const Sc2CornerBrackets = ({
  hoverReveal = false,
  size = '14px',
  color = '#e8f8ff'
}) => (
  <>
    {[
      {
        top: '-2px',
        left: '-2px',
        borderTopWidth: '2px',
        borderLeftWidth: '2px'
      },
      {
        top: '-2px',
        right: '-2px',
        borderTopWidth: '2px',
        borderRightWidth: '2px'
      },
      {
        bottom: '-2px',
        left: '-2px',
        borderBottomWidth: '2px',
        borderLeftWidth: '2px'
      },
      {
        bottom: '-2px',
        right: '-2px',
        borderBottomWidth: '2px',
        borderRightWidth: '2px'
      }
    ].map((pos, i) => (
      <Box
        key={i}
        aria-hidden
        position="absolute"
        w={size}
        h={size}
        borderColor={color}
        borderStyle="solid"
        borderWidth="0"
        opacity={hoverReveal ? 0 : 1}
        _groupHover={hoverReveal ? { opacity: 1 } : undefined}
        transition="opacity 0.15s"
        pointerEvents="none"
        zIndex={1}
        {...pos}
      />
    ))}
  </>
)

// Command-console panel: dark navy body, luminous double border, inner
// psionic glow, optional angular header bar with title + right-side meta.
const Sc2Panel = ({
  title,
  meta,
  brackets = false,
  unpadded = false,
  children,
  ...rest
}) => (
  <Box
    position="relative"
    role={brackets ? 'group' : undefined}
    bg={sc2.panelBg}
    border={`1px solid rgba(${PROTOSS_CYAN_RGB}, 0.35)`}
    borderRadius="4px"
    boxShadow={`inset 0 0 24px rgba(${PROTOSS_CYAN_RGB}, 0.07), 0 0 0 3px rgba(4, 12, 28, 0.8), 0 0 0 4px rgba(${PROTOSS_CYAN_RGB}, 0.15)`}
    {...rest}
  >
    {brackets && <Sc2CornerBrackets hoverReveal />}
    {title && (
      <Flex
        px={4}
        py={2}
        bg={sc2.headerBg}
        borderBottom={`1px solid ${sc2.headerBorder}`}
        justify="space-between"
        align="center"
      >
        <Text
          fontFamily="mono"
          fontSize="10px"
          color={PROTOSS_CYAN}
          letterSpacing="0.15em"
          textTransform="uppercase"
        >
          ▸ {title}
        </Text>
        {meta && (
          <Text fontFamily="mono" fontSize="10px" color={sc2.muted}>
            {meta}
          </Text>
        )}
      </Flex>
    )}
    {unpadded ? children : <Box p={4}>{children}</Box>}
  </Box>
)

export default Sc2Panel
