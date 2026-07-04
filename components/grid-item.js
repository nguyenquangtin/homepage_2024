import NextLink from 'next/link'
import Image from 'next/image'
import { Box, Text, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { Sc2CornerBrackets } from './sc2/sc2-panel'
import { PROTOSS_CYAN_RGB, KHALA_GOLD_RGB } from '../lib/site-theme-context'

// SC2 command-card slot styling shared by both grid variants:
// dark navy slot, luminous border, hover = corner brackets + psionic glow
const cardSlotProps = {
  role: 'group',
  position: 'relative',
  display: 'block',
  bg: 'rgba(10, 8, 24, 0.85)',
  border: `1px solid rgba(${KHALA_GOLD_RGB}, 0.35)`,
  borderRadius: '4px',
  p: 3,
  cursor: 'pointer',
  transition: 'all 0.2s',
  _hover: {
    borderColor: `rgba(${KHALA_GOLD_RGB}, 0.85)`,
    boxShadow: `0 0 18px rgba(${PROTOSS_CYAN_RGB}, 0.25), inset 0 0 14px rgba(${PROTOSS_CYAN_RGB}, 0.06)`
  }
}

const cardTitleProps = {
  mt: 2,
  fontFamily: 'mono',
  fontSize: 'sm',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: '#c0e8ff'
}

const cardDescProps = {
  fontSize: '13px',
  color: '#7090a8',
  mt: 1
}

export const GridItem = ({ children, href, title, thumbnail }) => (
  <Box w="100%" textAlign="center">
    <LinkBox {...cardSlotProps}>
      <Sc2CornerBrackets hoverReveal />
      <Image
        src={thumbnail}
        alt={title}
        className="grid-item-thumbnail"
        placeholder="blur"
        loading="lazy"
      />
      <LinkOverlay href={href} target="_blank">
        <Text {...cardTitleProps}>{title}</Text>
      </LinkOverlay>
      <Text {...cardDescProps}>{children}</Text>
    </LinkBox>
  </Box>
)

export const WorkGridItem = ({
  children,
  category = 'works',
  id,
  title,
  thumbnail
}) => (
  <Box w="100%" textAlign="center">
    <LinkBox
      as={NextLink}
      href={`/${category}/${id}`}
      scroll={false}
      {...cardSlotProps}
    >
      <Sc2CornerBrackets hoverReveal />
      <Image
        src={thumbnail}
        alt={title}
        className="grid-item-thumbnail"
        placeholder="blur"
      />
      <LinkOverlay as="div" href={`/${category}/${id}`}>
        <Text {...cardTitleProps} fontSize="md">
          {title}
        </Text>
      </LinkOverlay>
      <Text {...cardDescProps}>{children}</Text>
    </LinkBox>
  </Box>
)

// Thumbnails idle slightly dimmed, brighten when the card slot is hovered
export const GridItemStyle = () => (
  <Global
    styles={`
      .grid-item-thumbnail {
        border-radius: 2px;
        filter: brightness(0.88);
        transition: filter 0.2s ease;
      }
      [role='group']:hover .grid-item-thumbnail {
        filter: brightness(1.05);
      }
    `}
  />
)
