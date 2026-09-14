import NextLink from 'next/link'
import { Heading, Box, Image, Link, Badge, Text } from '@chakra-ui/react'
import {
  CHAMFER,
  chamferClip,
  PROTOSS_CYAN,
  PROTOSS_CYAN_RGB,
  KHALA_GOLD_RGB
} from '../lib/site-theme-context'

// Breadcrumb: mono "WORKS ▸" console trail + Orbitron unit name (LotV pass)
export const Title = ({ children }) => (
  <Box mb={4}>
    <Link
      as={NextLink}
      href="/works"
      fontFamily="mono"
      fontSize="11px"
      letterSpacing="0.15em"
      textTransform="uppercase"
      color="#7090a8"
      _hover={{ color: PROTOSS_CYAN }}
    >
      Works
    </Link>
    <Text
      as="span"
      fontFamily="mono"
      fontSize="11px"
      color="#7090a8"
      mx={2}
    >
      &#9656;
    </Text>
    <Heading
      display="inline-block"
      as="h3"
      fontFamily="heading"
      fontSize={20}
      textTransform="uppercase"
      letterSpacing="0.04em"
      textShadow={`0 0 12px rgba(${PROTOSS_CYAN_RGB}, 0.4)`}
    >
      {children}
    </Heading>
  </Box>
)

// Thin gold frame stack + TL+BR chamfer around the detail-page hero image
export const WorkImage = ({ src, alt }) => (
  <Box
    clipPath={chamferClip(CHAMFER.md)}
    bg={`rgba(${KHALA_GOLD_RGB}, 0.4)`}
    p="1px"
    mb={4}
  >
    <Box clipPath={chamferClip(CHAMFER.md - 1)} bg="rgba(10, 8, 24, 0.97)" p="2px">
      <Image w="full" src={src} alt={alt} />
    </Box>
  </Box>
)

// SC2 command tag — gold console badge for tech/platform meta
export const Meta = ({ children }) => (
  <Badge
    fontFamily="mono"
    bg={`rgba(${KHALA_GOLD_RGB}, 0.14)`}
    color="#ffe8b0"
    border={`1px solid rgba(${KHALA_GOLD_RGB}, 0.5)`}
    clipPath={chamferClip(6, 'tl')}
    mr={2}
    mb={1}
  >
    {children}
  </Badge>
)
