import { Button } from '@chakra-ui/react'
import {
  CHAMFER,
  PALETTES,
  chamferClip,
  PROTOSS_CYAN_BRIGHT,
  PROTOSS_CYAN_RGB,
  PROTOSS_GOLD_LIGHT,
  PROTOSS_GOLD_LIGHT_RGB,
  KHALA_GOLD_RGB
} from '../../lib/site-theme-context'

// Beveled console button (SC2 lobby style): clipped corners, inner glow.
// Variants: cyan (default action), gold (primary CTA), green (confirm/active).
// `gold` carries the heavier fill + bevel top line (LotV pass).
const VARIANTS = {
  cyan: {
    rgb: PROTOSS_CYAN_RGB,
    fill: 0.12,
    color: PALETTES.sc2.text,
    hoverColor: PROTOSS_CYAN_BRIGHT
  },
  gold: {
    rgb: KHALA_GOLD_RGB,
    fill: 0.18,
    color: PROTOSS_GOLD_LIGHT,
    hoverColor: '#fff6dd'
  },
  green: {
    rgb: '48, 216, 96',
    fill: 0.12,
    color: '#c8ffd8',
    hoverColor: '#eaffee'
  }
}

// md = the existing look; sm = compact console chip (LotV pass)
const SIZES = {
  md: { h: 10, px: 4, fontSize: 'xs', chamfer: CHAMFER.sm },
  sm: { h: 7, px: 3, fontSize: '10px', chamfer: 8 }
}

const Sc2Button = ({ variant = 'cyan', size = 'md', children, ...rest }) => {
  const v = VARIANTS[variant] || VARIANTS.cyan
  const s = SIZES[size] || SIZES.md
  const bevel = `inset 0 1px 0 rgba(${PROTOSS_GOLD_LIGHT_RGB}, ${
    variant === 'gold' ? 0.55 : 0.35
  })`
  return (
    <Button
      fontFamily="mono"
      fontSize={s.fontSize}
      fontWeight="bold"
      letterSpacing="0.12em"
      textTransform="uppercase"
      h={s.h}
      minW={0}
      px={s.px}
      color={v.color}
      bg={`rgba(${v.rgb}, ${v.fill})`}
      border="1px solid"
      borderColor={`rgba(${v.rgb}, 0.55)`}
      clipPath={chamferClip(s.chamfer)}
      boxShadow={`inset 0 0 12px rgba(${v.rgb}, 0.18), ${bevel}`}
      _hover={{
        bg: `rgba(${v.rgb}, ${v.fill + 0.12})`,
        color: v.hoverColor,
        boxShadow: `inset 0 0 20px rgba(${v.rgb}, 0.35), ${bevel}`,
        textShadow: `0 0 8px rgba(${v.rgb}, 0.8)`
      }}
      _active={{ transform: 'scale(0.97)' }}
      // inset focus ring — Chakra's default outer ring (and any outline) is
      // cut away by clipPath, so keyboard focus must render inside, in the
      // same cyan as the nav tabs (WCAG 2.4.7, brief §6) (LotV pass)
      _focusVisible={{
        outline: 'none',
        boxShadow: `inset 0 0 0 2px rgba(${PROTOSS_CYAN_RGB}, 0.9), ${bevel}`
      }}
      transition="all 0.15s"
      {...rest}
    >
      {children}
    </Button>
  )
}

export default Sc2Button
