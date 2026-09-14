import { forwardRef } from 'react'
import Logo from './logo'
import NavResourceBar from './sc2/nav-resource-bar'
import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
  PROTOSS_CYAN,
  PROTOSS_CYAN_RGB,
  PROTOSS_CYAN_BRIGHT,
  PROTOSS_BRONZE,
  PROTOSS_GOLD_LIGHT_RGB,
  PROTOSS_NAVY_RAISED,
  PROTOSS_PANEL_BG,
  CHAMFER,
  chamferClip,
  KHALA_GOLD_RGB
} from '../lib/site-theme-context'
// GameThemeToggle + ThemeToggleButton removed while FFIX is hidden (#7) —
// site is locked to the SC2 dark console look. Components kept for re-enable.

// Reusable pseudo props — inset ring, clip-path clips outline (a11y §6)
const focusRing = { outline: 'none', boxShadow: `inset 0 0 0 2px ${PROTOSS_CYAN}` }
const ACTIVE_SHADOW = `inset 0 2px 0 rgba(${PROTOSS_CYAN_RGB}, .9), inset 0 0 24px rgba(${PROTOSS_CYAN_RGB}, .18), 0 0 14px rgba(${PROTOSS_CYAN_RGB}, .25)`

// LotV pass: chamfered tab. Inactive = bronze hairline + dim gold text;
// hover = gold fill + cyan glow + scan sweep; active = raised navy block.
const LinkItem = ({ href, path, target, children, ...props }) => {
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
      <Box as="span" className="protoss-scan" aria-hidden="true" pointerEvents="none" position="absolute" inset={0} />
    </Link>
  )
}

const MenuLink = forwardRef((props, ref) => <Link ref={ref} as={NextLink} {...props} />)

const menuItemHoverProps = { bg: `rgba(${KHALA_GOLD_RGB}, 0.12)`, color: PROTOSS_CYAN_BRIGHT, _before: { opacity: 1 } }

// LotV pass: mono uppercase item, `▸` prefix fades in on hover/focus
// (kept in _before so it never shifts layout at rest).
const MobileMenuItem = ({ href, children }) => (
  <MenuItem
    as={MenuLink}
    href={href}
    bg="transparent"
    color="#c0e8ff"
    textTransform="uppercase"
    letterSpacing="0.1em"
    _before={{ content: '"▸ "', color: PROTOSS_CYAN, opacity: 0, transition: 'opacity 0.15s' }}
    _hover={menuItemHoverProps}
    _focus={menuItemHoverProps}
  >
    {children}
  </MenuItem>
)

const Navbar = props => {
  const { path } = props
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg="rgba(4, 10, 24, 0.85)"
      borderBottom={`1px solid rgba(${KHALA_GOLD_RGB}, 0.45)`}
      boxShadow={`inset 0 1px 0 rgba(${PROTOSS_GOLD_LIGHT_RGB}, 0.15), 0 0 18px rgba(${KHALA_GOLD_RGB}, 0.10)`}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={2}
      // Center notch: chamfered gold bump riding the hairline under the
      // logo — pure CSS, never intercepts clicks.
      _after={{
        content: '""',
        position: 'absolute',
        left: '28px',
        bottom: '-3px',
        width: '18px',
        height: '6px',
        bg: `rgba(${KHALA_GOLD_RGB}, 0.45)`,
        clipPath: chamferClip(3, 'tl-br'),
        pointerEvents: 'none'
      }}
      {...props}
    >
      <Container display="flex" pt={2} px={2} pb={0} maxW="container.xl" wrap="wrap" align="stretch" justify="space-between">
        <Flex align="center" mr={5} pb={2}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="stretch"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
          mb={{ base: 2, md: 0 }}
          spacing={1}
        >
          <LinkItem href="/works" path={path}>
            Works
          </LinkItem>
          <LinkItem href="/posts" path={path}>
            Blog
          </LinkItem>
        </Stack>

        <Flex align="center" pb={2} gap={4}>
          <NavResourceBar />
          <Box display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                clipPath={chamferClip(CHAMFER.sm)}
                borderColor={`rgba(${KHALA_GOLD_RGB}, 0.5)`}
                color="#c0e8ff"
                _hover={{ bg: `rgba(${PROTOSS_CYAN_RGB}, 0.12)` }}
                _focusVisible={focusRing}
                aria-label="Options"
              />
              <MenuList
                bg={PROTOSS_PANEL_BG}
                border={`1px solid rgba(${KHALA_GOLD_RGB}, 0.45)`}
                clipPath={chamferClip(CHAMFER.sm, 'tl-br')}
                fontFamily="mono"
                fontSize="sm"
                py={1}
              >
                <MobileMenuItem href="/">About</MobileMenuItem>
                <MobileMenuItem href="/works">Works</MobileMenuItem>
                <MobileMenuItem href="/posts">Blog</MobileMenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar
