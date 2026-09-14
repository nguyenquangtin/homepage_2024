import { Box, Flex, Grid, LinkBox, LinkOverlay, Text } from '@chakra-ui/react'
import {
  KHALA_GOLD,
  KHALA_GOLD_RGB,
  PALETTES,
  PROTOSS_CYAN,
  PROTOSS_CYAN_BRIGHT,
  PROTOSS_CYAN_RGB
} from '../../lib/site-theme-context'

const sc2 = PALETTES.sc2

// ISO date -> "Mon YYYY" (also used for the panel's LAST SYNC line)
export const formatDate = iso => {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  })
}

// 5-bar signal meter — gold ascending bars, last bar cyan and pulsing
// (shares the `protoss-gem-core` keyframe from protoss-global.js).
// Renders as an inline `span` tree so it nests safely inside Sc2Panel's
// `meta`, which Chakra's `Text` wraps in a `<p>`.
export const SignalMeter = () => {
  const heights = [4, 6, 8, 10, 12]
  return (
    <Flex
      as="span"
      display="inline-flex"
      aria-hidden
      align="flex-end"
      gap="2px"
      h="12px"
    >
      {heights.map((h, i) => {
        const last = i === heights.length - 1
        return (
          <Box
            as="span"
            display="inline-block"
            key={i}
            w="2px"
            h={`${h}px`}
            bg={last ? PROTOSS_CYAN : KHALA_GOLD}
            className={last ? 'protoss-gem-core' : undefined}
            boxShadow={last ? `0 0 4px rgba(${PROTOSS_CYAN_RGB}, 0.8)` : undefined}
          />
        )
      })}
    </Flex>
  )
}

// Single transmission log row — whole row is the external link.
export const TransmissionRow = ({ post, index, isNew, isLast }) => {
  const { title, link, pubDate, contentSnippet } = post
  return (
    <LinkBox
      as="article"
      role="group"
      position="relative"
      _hover={{ bg: `rgba(${KHALA_GOLD_RGB}, 0.06)` }}
      _focusWithin={{
        outline: 'none',
        boxShadow: `inset 0 0 0 2px rgba(${PROTOSS_CYAN_RGB}, 0.9)`
      }}
      borderBottom={isLast ? 'none' : `1px solid rgba(${KHALA_GOLD_RGB}, 0.12)`}
      transition="background 0.15s"
    >
      {/* left cyan bar on hover/focus */}
      <Box
        aria-hidden
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        w="2px"
        bg={PROTOSS_CYAN}
        opacity={0}
        _groupHover={{ opacity: 1 }}
        pointerEvents="none"
        transition="opacity 0.15s"
      />
      {/* one-shot scan sweep on hover */}
      <Box
        aria-hidden
        className="protoss-scan"
        position="absolute"
        inset={0}
        pointerEvents="none"
      />

      <Grid
        templateColumns="28px 1fr 72px"
        gap={3}
        px={4}
        py={3}
        alignItems="flex-start"
      >
        <Flex align="center" gap="4px" mt="2px">
          {isNew && (
            <Box
              aria-hidden
              w="6px"
              h="6px"
              borderRadius="full"
              bg={PROTOSS_CYAN}
              boxShadow={`0 0 6px rgba(${PROTOSS_CYAN_RGB}, 0.9)`}
              flexShrink={0}
            />
          )}
          <Text fontFamily="mono" fontSize="10px" color={KHALA_GOLD}>
            {String(index + 1).padStart(2, '0')}
          </Text>
        </Flex>

        <Box minW={0}>
          <Flex align="center" gap={2} mb={1}>
            <LinkOverlay href={link} isExternal>
              <Text
                fontFamily="body"
                fontWeight={500}
                fontSize="14px"
                color={PROTOSS_CYAN_BRIGHT}
                lineHeight={1.3}
              >
                {title}
              </Text>
            </LinkOverlay>
            {isNew && (
              <Text
                as="span"
                fontFamily="mono"
                fontSize="9px"
                color={PROTOSS_CYAN}
                border={`1px solid rgba(${PROTOSS_CYAN_RGB}, 0.5)`}
                px="4px"
                lineHeight={1.6}
                letterSpacing="0.1em"
                flexShrink={0}
              >
                NEW
              </Text>
            )}
          </Flex>
          {contentSnippet && (
            <Text
              fontFamily="mono"
              fontSize="11px"
              color={sc2.muted}
              noOfLines={2}
              lineHeight={1.5}
            >
              {contentSnippet}
            </Text>
          )}
        </Box>

        <Text
          fontFamily="mono"
          fontSize="10px"
          color={sc2.muted}
          textAlign="right"
          mt="2px"
        >
          {formatDate(pubDate)}
        </Text>
      </Grid>
    </LinkBox>
  )
}
