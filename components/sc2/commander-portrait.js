import NextLink from 'next/link'
import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react'
import CommanderFrame, { PortraitSlot } from './commander-portrait-frame'
import Sc2Button from './sc2-button'
import { PROTOSS_LABELS } from '../../lib/protoss-terminology'
import {
  PALETTES,
  KHALA_GOLD,
  KHALA_GOLD_RGB,
  PROTOSS_CYAN,
  PROTOSS_CYAN_RGB,
  PROTOSS_GOLD_LIGHT,
  PROTOSS_PANEL_BG
} from '../../lib/site-theme-context'

const sc2 = PALETTES.sc2

// Status chip — same visual grammar as the STATUS row in ffix-status-effects
const StatusChip = ({ color, label, dot = false }) => (
  <Flex
    align="center"
    gap={1.5}
    bg={PROTOSS_PANEL_BG}
    border={`1px solid ${color}55`}
    borderRadius="sm"
    px={2}
    py="3px"
  >
    {dot && (
      <Box
        w="6px"
        h="6px"
        borderRadius="full"
        bg={color}
        boxShadow={`0 0 6px ${color}`}
      />
    )}
    <Text
      fontSize="9px"
      fontFamily="mono"
      color={color}
      fontWeight="bold"
      letterSpacing="0.12em"
    >
      &#9670; {label}
    </Text>
  </Flex>
)

// Hero identity: chrome display name + rank readout + role + status chips
const IdentityBlock = () => (
  <Box flex={1} minW={0} textAlign={{ base: 'center', md: 'left' }}>
    <Box
      filter={`drop-shadow(0 0 16px rgba(${PROTOSS_CYAN_RGB}, 0.45)) drop-shadow(0 1px 0 rgba(0, 0, 0, 0.6))`}
    >
      <Heading
        as="h2"
        fontSize={{ base: '25px', sm: '30px', md: '38px' }}
        fontWeight={700}
        lineHeight={1.1}
        textTransform="uppercase"
        letterSpacing="0.04em"
        sx={{
          // chrome plate: gold highlight → white hotspot → cool cyan base
          backgroundImage: `linear-gradient(180deg, ${KHALA_GOLD} 0%, ${PROTOSS_GOLD_LIGHT} 22%, #ffffff 52%, ${sc2.text} 82%, #6fa8c8 100%)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent'
        }}
      >
        Tony Tin Nguyen
      </Heading>
    </Box>

    <Text
      mt={1.5}
      fontFamily="mono"
      fontSize="11px"
      letterSpacing="0.1em"
      color={sc2.muted}
    >
      engineer of the protoss · entrepreneur · high templar
    </Text>

    <Text
      mt={2}
      fontFamily="mono"
      fontSize={{ base: '11px', md: '12px' }}
      fontWeight="bold"
      letterSpacing="0.14em"
      color={PROTOSS_CYAN}
      textShadow={`0 0 10px rgba(${PROTOSS_CYAN_RGB}, 0.6)`}
    >
      &#9656; HIGH TEMPLAR · LV 39 · EXP 19 YRS
    </Text>

    <Text mt={3} fontSize={{ base: '13px', md: '14px' }} color={sc2.text}>
      Head of Tech Partnership at{' '}
      <Link href="https://ecomdymedia.com/" isExternal color={KHALA_GOLD}>
        Ecomdy Media
      </Link>
      , TikTok Marketing Partner &amp; co-founder of{' '}
      <Link href="https://gdgmientrung.com/" isExternal color={KHALA_GOLD}>
        GDG Mien Trung
      </Link>
      .
    </Text>

    <Text
      mt={2}
      fontFamily="mono"
      fontSize="10px"
      letterSpacing="0.16em"
      color={KHALA_GOLD}
      textShadow={`0 0 10px rgba(${KHALA_GOLD_RGB}, 0.45)`}
    >
      &#10209; EN TARO ADUN — ENGINEER OF THE PROTOSS RACE &#10209;
    </Text>

    <Flex
      mt={3}
      gap={2}
      wrap="wrap"
      justify={{ base: 'center', md: 'flex-start' }}
    >
      <StatusChip color="#ffcc00" label="ENERGIZED" />
      <StatusChip color="#30d860" label="DANANG, VIETNAM" dot />
    </Flex>
  </Box>
)

// Hero commander-select card + primary CTA row (LotV pass)
const CommanderPortrait = () => (
  <Box>
    <CommanderFrame>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'center', md: 'flex-start' }}
        gap={{ base: 4, md: 7 }}
        px={{ base: 5, md: 7 }}
        py={{ base: 6, md: 7 }}
      >
        <PortraitSlot />
        <IdentityBlock />
      </Flex>
    </CommanderFrame>

    <Flex mt={6} gap={3} wrap="wrap" justify="center">
      <Sc2Button as={NextLink} href="/works" scroll={false} variant="gold">
        {PROTOSS_LABELS.viewPortfolio}
      </Sc2Button>
      <Sc2Button as={NextLink} href="/posts" scroll={false} variant="cyan">
        Transmissions
      </Sc2Button>
    </Flex>
  </Box>
)

export default CommanderPortrait
