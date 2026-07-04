import { forwardRef } from 'react'
import Logo from './logo'
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
  KHALA_GOLD_RGB
} from '../lib/site-theme-context'
// GameThemeToggle + ThemeToggleButton removed while FFIX is hidden (#7) —
// site is locked to the SC2 dark console look. Components kept for re-enable.

// LotV challenges-style top menu tab (#19): large uppercase text item;
// active = raised gradient block with a bright top edge (ref: LotV
// challenges screen — CAMPAGNE tab)
const LinkItem = ({ href, path, target, children, ...props }) => {
  const active = path === href
  return (
    <Link
      as={NextLink}
      href={href}
      scroll={false}
      px={5}
      py={2.5}
      fontFamily="mono"
      fontSize="sm"
      fontWeight="bold"
      textTransform="uppercase"
      letterSpacing="0.16em"
      bg={
        active
          ? 'linear-gradient(180deg, rgba(34, 64, 118, 0.95), rgba(10, 20, 45, 0.95))'
          : 'transparent'
      }
      color={active ? '#ffffff' : '#8fb8cc'}
      boxShadow={
        active
          ? `inset 0 2px 0 rgba(${PROTOSS_CYAN_RGB}, 0.9), inset 0 0 24px rgba(${PROTOSS_CYAN_RGB}, 0.18), 0 0 14px rgba(${PROTOSS_CYAN_RGB}, 0.25)`
          : 'none'
      }
      textShadow={active ? `0 0 12px rgba(${PROTOSS_CYAN_RGB}, 0.8)` : 'none'}
      _hover={{
        textDecoration: 'none',
        color: '#eafcff',
        textShadow: `0 0 10px rgba(${PROTOSS_CYAN_RGB}, 0.6)`
      }}
      _focusVisible={{
        color: '#c0e8ff',
        outline: `2px solid ${PROTOSS_CYAN}`,
        outlineOffset: '2px'
      }}
      transition="all 0.15s"
      target={target}
      {...props}
    >
      {children}
    </Link>
  )
}

const MenuLink = forwardRef((props, ref) => (
  <Link ref={ref} as={NextLink} {...props} />
))

const Navbar = props => {
  const { path } = props

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg="rgba(4, 10, 24, 0.85)"
      borderBottom={`1px solid rgba(${KHALA_GOLD_RGB}, 0.35)`}
      boxShadow={`0 0 18px rgba(${KHALA_GOLD_RGB}, 0.10)`}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={2}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.xl"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
          spacing={1}
        >
          <LinkItem href="/works" path={path}>
            Works
          </LinkItem>
          <LinkItem href="/posts" path={path}>
            Blog
          </LinkItem>
        </Stack>

        <Box flex={1} align="right">
          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                borderColor={`rgba(${KHALA_GOLD_RGB}, 0.5)`}
                color="#c0e8ff"
                _hover={{ bg: `rgba(${PROTOSS_CYAN_RGB}, 0.12)` }}
                aria-label="Options"
              />
              <MenuList
                bg="rgba(4, 12, 28, 0.97)"
                borderColor={`rgba(${KHALA_GOLD_RGB}, 0.45)`}
                fontFamily="mono"
                fontSize="sm"
              >
                <MenuItem
                  as={MenuLink}
                  href="/"
                  bg="transparent"
                  color="#c0e8ff"
                  _hover={{ bg: `rgba(${PROTOSS_CYAN_RGB}, 0.12)` }}
                >
                  About
                </MenuItem>
                <MenuItem
                  as={MenuLink}
                  href="/works"
                  bg="transparent"
                  color="#c0e8ff"
                  _hover={{ bg: `rgba(${PROTOSS_CYAN_RGB}, 0.12)` }}
                >
                  Works
                </MenuItem>
                <MenuItem
                  as={MenuLink}
                  href="/posts"
                  bg="transparent"
                  color="#c0e8ff"
                  _hover={{ bg: `rgba(${PROTOSS_CYAN_RGB}, 0.12)` }}
                >
                  Blog
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
