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
import { PROTOSS_CYAN, PROTOSS_CYAN_RGB } from '../lib/site-theme-context'
// GameThemeToggle + ThemeToggleButton removed while FFIX is hidden (#7) —
// site is locked to the SC2 dark console look. Components kept for re-enable.

// Console tab link (SC2 menu style): uppercase mono, cyan glow when active
const LinkItem = ({ href, path, target, children, ...props }) => {
  const active = path === href
  return (
    <Link
      as={NextLink}
      href={href}
      scroll={false}
      px={3}
      py={2}
      fontFamily="mono"
      fontSize="xs"
      fontWeight="bold"
      textTransform="uppercase"
      letterSpacing="0.12em"
      color={active ? '#eafcff' : '#8fb8cc'}
      bg={active ? `rgba(${PROTOSS_CYAN_RGB}, 0.14)` : undefined}
      boxShadow={active ? `inset 0 -2px 0 ${PROTOSS_CYAN}` : undefined}
      textShadow={active ? `0 0 10px rgba(${PROTOSS_CYAN_RGB}, 0.7)` : 'none'}
      _hover={{
        textDecoration: 'none',
        color: '#c0e8ff',
        textShadow: `0 0 8px rgba(${PROTOSS_CYAN_RGB}, 0.6)`
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
      borderBottom={`1px solid rgba(${PROTOSS_CYAN_RGB}, 0.25)`}
      boxShadow={`0 0 18px rgba(${PROTOSS_CYAN_RGB}, 0.12)`}
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
                borderColor={`rgba(${PROTOSS_CYAN_RGB}, 0.45)`}
                color="#c0e8ff"
                _hover={{ bg: `rgba(${PROTOSS_CYAN_RGB}, 0.12)` }}
                aria-label="Options"
              />
              <MenuList
                bg="rgba(4, 12, 28, 0.97)"
                borderColor={`rgba(${PROTOSS_CYAN_RGB}, 0.35)`}
                fontFamily="mono"
                fontSize="sm"
              >
                <MenuItem as={MenuLink} href="/" bg="transparent">
                  About
                </MenuItem>
                <MenuItem as={MenuLink} href="/works" bg="transparent">
                  Works
                </MenuItem>
                <MenuItem as={MenuLink} href="/posts" bg="transparent">
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
