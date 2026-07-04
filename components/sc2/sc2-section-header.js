import { Box, Heading } from '@chakra-ui/react'
import { PROTOSS_CYAN, PROTOSS_CYAN_RGB } from '../../lib/site-theme-context'

// Angular tab-style section heading (SC2 research screen header tab):
// uppercase mono, cyan glow, clipped top-left corner, luminous underline.
const Sc2SectionHeader = ({ children, as = 'h2', ...rest }) => (
  <Box mt={6} mb={4} {...rest}>
    <Heading
      as={as}
      display="inline-block"
      fontFamily="mono"
      fontSize="13px"
      fontWeight={700}
      textTransform="uppercase"
      letterSpacing="0.18em"
      color="#c0e8ff"
      textShadow={`0 0 10px rgba(${PROTOSS_CYAN_RGB}, 0.5)`}
      bg={`rgba(${PROTOSS_CYAN_RGB}, 0.08)`}
      border={`1px solid rgba(${PROTOSS_CYAN_RGB}, 0.3)`}
      borderBottom={`2px solid ${PROTOSS_CYAN}`}
      px={4}
      py={1.5}
      clipPath="polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)"
    >
      ▸ {children}
    </Heading>
  </Box>
)

export default Sc2SectionHeader
