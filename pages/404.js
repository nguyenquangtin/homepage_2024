import NextLink from 'next/link'
import { Box, Heading, Text, Container } from '@chakra-ui/react'
import Sc2Panel from '../components/sc2/sc2-panel'
import Sc2Button from '../components/sc2/sc2-button'
import { PROTOSS_CYAN_RGB, PALETTES } from '../lib/site-theme-context'

// SC2 console error screen — signal lost
const NotFound = () => {
  return (
    <Container pt={10}>
      <Sc2Panel title="signal lost" meta="ERR-404">
        <Heading
          as="h1"
          fontFamily="mono"
          fontSize="2xl"
          textTransform="uppercase"
          letterSpacing="0.12em"
          color="#c0e8ff"
          textShadow={`0 0 16px rgba(${PROTOSS_CYAN_RGB}, 0.6)`}
          mb={3}
        >
          404 — Sector Not Found
        </Heading>
        <Text fontFamily="mono" fontSize="sm" color={PALETTES.sc2.muted} mb={6}>
          The coordinates you warped to do not exist in this sector. The Khala
          holds no memory of this place.
        </Text>
        <Box textAlign="center" my={4}>
          <Sc2Button as={NextLink} href="/" variant="gold">
            Return to Nexus
          </Sc2Button>
        </Box>
      </Sc2Panel>
    </Container>
  )
}

export default NotFound
