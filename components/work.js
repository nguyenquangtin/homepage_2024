import NextLink from 'next/link'
import { Heading, Box, Image, Link, Badge } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { PROTOSS_CYAN_RGB, KHALA_GOLD_RGB } from '../lib/site-theme-context'

export const Title = ({ children }) => (
  <Box>
    <Link as={NextLink} href="/works">
      Works
    </Link>
    <span>
      {' '}
      <ChevronRightIcon />{' '}
    </span>
    <Heading
      display="inline-block"
      as="h3"
      fontSize={20}
      mb={4}
      textShadow={`0 0 12px rgba(${PROTOSS_CYAN_RGB}, 0.4)`}
    >
      {children}
    </Heading>
  </Box>
)

export const WorkImage = ({ src, alt }) => (
  <Image
    borderRadius="4px"
    border={`1px solid rgba(${KHALA_GOLD_RGB}, 0.35)`}
    w="full"
    src={src}
    alt={alt}
    mb={4}
  />
)

// SC2 command tag — cyan console badge for tech/platform meta
export const Meta = ({ children }) => (
  <Badge
    fontFamily="mono"
    bg={`rgba(${KHALA_GOLD_RGB}, 0.14)`}
    color="#ffe8b0"
    border={`1px solid rgba(${KHALA_GOLD_RGB}, 0.5)`}
    borderRadius="2px"
    mr={2}
  >
    {children}
  </Badge>
)
