import Logo from './logo'
import NavResourceBar from './sc2/nav-resource-bar'
import {
  Container,
  Box,
  Stack,
  Flex,
  Menu,
  MenuList,
  MenuButton,
  IconButton
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { focusRing, LinkItem, MobileMenuItem } from './nav-link-item'
import {
  PROTOSS_CYAN_RGB,
  PROTOSS_GOLD_LIGHT_RGB,
  PROTOSS_PANEL_BG,
  CHAMFER,
  chamferClip,
  KHALA_GOLD_RGB
} from '../lib/site-theme-context'
// GameThemeToggle + ThemeToggleButton removed while FFIX is hidden (#7) —
// site is locked to the SC2 dark console look. Components kept for re-enable.

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
      {...props}
    >
      <Container
        display="flex"
        pt={2}
        px={2}
        pb={0}
        maxW="container.xl"
        flexWrap="wrap"
        alignItems="stretch"
        justifyContent="space-between"
      >
        {/* Wordmark slot doubles as the anchor for the hairline notch:
            centred on the logo itself, so it tracks any width change
            instead of a hardcoded offset from the bar edge (LotV pass). */}
        <Flex
          align="center"
          mr={5}
          pb={2}
          position="relative"
          _after={{
            content: '""',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '-3px',
            width: '22px',
            height: '6px',
            bg: `rgba(${KHALA_GOLD_RGB}, 0.55)`,
            clipPath: chamferClip(3, 'tl-br'),
            pointerEvents: 'none'
          }}
        >
          {/* not a heading: each route owns its single <h1> (LotV pass) */}
          <Box letterSpacing={'tighter'}>
            <Logo />
          </Box>
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
          <LinkItem href="/battle" path={path}>
            Battle
          </LinkItem>
        </Stack>

        <Flex align="center" ml="auto" pb={2} gap={4}>
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
                <MobileMenuItem href="/battle">Battle</MobileMenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar
