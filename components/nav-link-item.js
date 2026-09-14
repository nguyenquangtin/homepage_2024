import { forwardRef } from 'react'
import NextLink from 'next/link'
import { Box, Link, MenuItem } from '@chakra-ui/react'
import {
  PROTOSS_CYAN,
  PROTOSS_CYAN_RGB,
  PROTOSS_CYAN_BRIGHT,
  PROTOSS_BRONZE,
  PROTOSS_NAVY_RAISED,
  CHAMFER,
  chamferClip,
  KHALA_GOLD_RGB
} from '../lib/site-theme-context'

// Command-bar link primitives, split out of navbar.js to keep it small.
// Reusable pseudo props — inset ring, clip-path clips outline (a11y §6)
export const focusRing = {
  outline: 'none',
  boxShadow: `inset 0 0 0 2px ${PROTOSS_CYAN}`
}

const ACTIVE_SHADOW = `inset 0 2px 0 rgba(${PROTOSS_CYAN_RGB}, .9), inset 0 0 24px rgba(${PROTOSS_CYAN_RGB}, .18), 0 0 14px rgba(${PROTOSS_CYAN_RGB}, .25)`

// LotV pass: chamfered tab. Inactive = bronze hairline + dim gold text;
// hover = gold fill + cyan glow + scan sweep; active = raised navy block.
export const LinkItem = ({ href, path, target, children, ...props }) => {
  const active = path === href
  return (
    <Link
      as={NextLink}
      href={href}
      scroll={false}
      className="protoss-scan-host"
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
      h="100%"
      px={5}
      fontFamily="mono"
      fontSize="sm"
      fontWeight="bold"
      textTransform="uppercase"
      letterSpacing="0.16em"
      clipPath={chamferClip(CHAMFER.sm, 'tl')}
      bg={active ? PROTOSS_NAVY_RAISED : 'transparent'}
      color={active ? '#ffffff' : `rgba(${KHALA_GOLD_RGB}, 0.5)`}
      borderBottom={active ? 'none' : `1px solid ${PROTOSS_BRONZE}`}
      boxShadow={active ? ACTIVE_SHADOW : 'none'}
      textShadow={active ? `0 0 12px rgba(${PROTOSS_CYAN_RGB}, .8)` : 'none'}
      _hover={{
        textDecoration: 'none',
        bg: active ? undefined : `rgba(${KHALA_GOLD_RGB}, 0.08)`,
        color: active ? '#ffffff' : PROTOSS_CYAN_BRIGHT,
        textShadow: `0 0 10px rgba(${PROTOSS_CYAN_RGB}, 0.6)`
      }}
      _focusVisible={focusRing}
      transition="all 0.15s"
      target={target}
      {...props}
    >
      {children}
      {/* one-shot cyan sweep, decorative, never intercepts clicks */}
      <Box
        as="span"
        className="protoss-scan"
        aria-hidden="true"
        pointerEvents="none"
        position="absolute"
        inset={0}
      />
    </Link>
  )
}

const MenuLink = forwardRef((props, ref) => (
  <Link ref={ref} as={NextLink} {...props} />
))
MenuLink.displayName = 'MenuLink'

const menuItemHoverProps = {
  bg: `rgba(${KHALA_GOLD_RGB}, 0.12)`,
  color: PROTOSS_CYAN_BRIGHT,
  _before: { opacity: 1 }
}

// LotV pass: mono uppercase item, `▸` prefix fades in on hover/focus
// (kept in _before so it never shifts layout at rest).
export const MobileMenuItem = ({ href, children }) => (
  <MenuItem
    as={MenuLink}
    href={href}
    bg="transparent"
    color="#c0e8ff"
    textTransform="uppercase"
    letterSpacing="0.1em"
    _before={{
      content: '"▸ "',
      color: PROTOSS_CYAN,
      opacity: 0,
      transition: 'opacity 0.15s'
    }}
    _hover={menuItemHoverProps}
    _focus={menuItemHoverProps}
  >
    {children}
  </MenuItem>
)
