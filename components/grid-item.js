import NextLink from 'next/link'
import Image from 'next/image'
import { Box, Text, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { Sc2CornerBrackets } from './sc2/sc2-panel'
import { Meta } from './work'
import {
  CHAMFER,
  chamferClip,
  KHALA_GOLD,
  KHALA_GOLD_RGB,
  PROTOSS_CYAN,
  PROTOSS_CYAN_RGB,
  PROTOSS_DEEP_GOLD,
  PROTOSS_PANEL_BG
} from '../lib/site-theme-context'

// Tier accent colors — one-off, not part of the shared token table (LotV pass)
const TIER_COLORS = { legendary: KHALA_GOLD, epic: '#bb77ff', rare: PROTOSS_CYAN }

const cardTitleProps = {
  mt: 2,
  fontFamily: 'heading',
  fontSize: 'sm',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: '#c0e8ff'
}

const cardDescProps = { fontFamily: 'body', fontSize: '13px', color: '#7090a8', mt: 1 }

// SC2 unit-card frame shared by GridItem + WorkGridItem: TL+BR chamfer, gold
// gradient frame, left tier bar, portrait slot, tags row, hover scan + lift,
// hover-only footer strip (LotV pass).
const UnitCardFrame = ({
  linkBoxProps,
  tier = 'rare',
  thumbnail,
  title,
  tags = [],
  titleOverlay,
  children
}) => {
  const accent = TIER_COLORS[tier] || TIER_COLORS.rare
  const frame = a =>
    `linear-gradient(150deg, rgba(${KHALA_GOLD_RGB}, ${a}), rgba(${KHALA_GOLD_RGB}, ${a * 0.45}) 55%, ${PROTOSS_DEEP_GOLD})`
  // The outer Box is the unclipped positioning root: it hosts the selection
  // brackets, which sit at -2px and were being cut away inside the card's
  // clip-path, and carries role="group" for every hover reveal (LotV pass).
  return (
    <Box w="100%" position="relative" role="group" textAlign="center">
      <Sc2CornerBrackets hoverReveal />
      <LinkBox
        className="protoss-scan-host"
        position="relative"
        display="block"
        cursor="pointer"
        clipPath={chamferClip(CHAMFER.md)}
        bg={frame(0.4)}
        p="1px"
        transition="transform 0.2s, background 0.2s"
        _hover={{ transform: 'translateY(-2px)', bg: frame(0.85) }}
        // the focus ring rides an overlay above the body: an inset shadow on
        // the LinkBox itself is painted over by the opaque panel (LotV pass)
        sx={{
          '&:focus-visible .unit-card-focus, &:has(:focus-visible) .unit-card-focus': {
            boxShadow: `inset 0 0 0 2px rgba(${PROTOSS_CYAN_RGB}, 0.9)`
          }
        }}
        {...linkBoxProps}
      >
        <Box
          position="relative"
          clipPath={chamferClip(CHAMFER.md - 1)}
          bg={PROTOSS_PANEL_BG}
          overflow="hidden"
          pl={4}
          pr={3}
          py={3}
          textAlign="left"
        >
          <Box aria-hidden position="absolute" top={0} left={0} bottom={0} w="3px" bg={accent} />
          {/* one-shot cyan scan sweep, see protoss-global.js */}
          <Box aria-hidden className="protoss-scan" position="absolute" inset={0} />

          {/* portrait slot */}
          <Box position="relative" overflow="hidden" borderRadius="2px" border={`1px solid ${PROTOSS_DEEP_GOLD}`}>
            <Image src={thumbnail} alt={title} className="grid-item-thumbnail" placeholder="blur" loading="lazy" />
          </Box>

          {titleOverlay}
          {children}

          {tags.length > 0 && (
            <Box mt={2}>
              {tags.map(tag => (
                <Meta key={tag}>{tag}</Meta>
              ))}
            </Box>
          )}

          <Text
            aria-hidden
            mt={2}
            fontFamily="mono"
            fontSize="10px"
            letterSpacing="0.1em"
            color={PROTOSS_CYAN}
            textAlign="right"
            opacity={0}
            transition="opacity 0.15s"
            _groupHover={{ opacity: 1 }}
          >
            &#9670; VIEW UNIT
          </Text>
        </Box>
        <Box
          aria-hidden
          className="unit-card-focus"
          position="absolute"
          inset={0}
          zIndex={2}
          pointerEvents="none"
        />
      </LinkBox>
    </Box>
  )
}

export const GridItem = ({ children, href, title, thumbnail, tier, tags }) => (
  <UnitCardFrame
    tier={tier}
    thumbnail={thumbnail}
    title={title}
    tags={tags}
    titleOverlay={
      <LinkOverlay href={href} target="_blank">
        <Text {...cardTitleProps}>{title}</Text>
      </LinkOverlay>
    }
  >
    <Text {...cardDescProps}>{children}</Text>
  </UnitCardFrame>
)

export const WorkGridItem = ({ children, category = 'works', id, title, thumbnail, tier, tags }) => (
  <UnitCardFrame
    linkBoxProps={{ as: NextLink, href: `/${category}/${id}`, scroll: false }}
    tier={tier}
    thumbnail={thumbnail}
    title={title}
    tags={tags}
    titleOverlay={
      <LinkOverlay as="div" href={`/${category}/${id}`}>
        <Text {...cardTitleProps} fontSize="md">
          {title}
        </Text>
      </LinkOverlay>
    }
  >
    <Text {...cardDescProps}>{children}</Text>
  </UnitCardFrame>
)

// Thumbnails idle slightly dimmed, brighten when the card slot is hovered
export const GridItemStyle = () => (
  <Global
    styles={`
      .grid-item-thumbnail {
        filter: brightness(0.88);
        transition: filter 0.2s ease;
      }
      [role='group']:hover .grid-item-thumbnail {
        filter: brightness(1.05);
      }
    `}
  />
)
