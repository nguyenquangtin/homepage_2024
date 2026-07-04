import { Button } from '@chakra-ui/react'
import { PROTOSS_CYAN_RGB, KHALA_GOLD_RGB } from '../../lib/site-theme-context'

// Beveled console button (SC2 lobby style): clipped corners, inner glow.
// Variants: cyan (default action), gold (primary CTA), green (confirm/active).
const VARIANTS = {
  cyan: {
    rgb: PROTOSS_CYAN_RGB,
    color: '#c0e8ff',
    hoverColor: '#eafcff'
  },
  gold: {
    rgb: KHALA_GOLD_RGB,
    color: '#ffe8b0',
    hoverColor: '#fff6dd'
  },
  green: {
    rgb: '48, 216, 96',
    color: '#c8ffd8',
    hoverColor: '#eaffee'
  }
}

const Sc2Button = ({ variant = 'cyan', children, ...rest }) => {
  const v = VARIANTS[variant] || VARIANTS.cyan
  return (
    <Button
      fontFamily="mono"
      fontSize="xs"
      fontWeight="bold"
      letterSpacing="0.12em"
      textTransform="uppercase"
      color={v.color}
      bg={`rgba(${v.rgb}, 0.12)`}
      border="1px solid"
      borderColor={`rgba(${v.rgb}, 0.55)`}
      borderRadius="2px"
      clipPath="polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
      boxShadow={`inset 0 0 12px rgba(${v.rgb}, 0.18)`}
      _hover={{
        bg: `rgba(${v.rgb}, 0.24)`,
        color: v.hoverColor,
        boxShadow: `inset 0 0 20px rgba(${v.rgb}, 0.35)`,
        textShadow: `0 0 8px rgba(${v.rgb}, 0.8)`
      }}
      _active={{ transform: 'scale(0.97)' }}
      transition="all 0.15s"
      {...rest}
    >
      {children}
    </Button>
  )
}

export default Sc2Button
