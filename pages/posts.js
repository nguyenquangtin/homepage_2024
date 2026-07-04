import Parser from 'rss-parser'
import { Box, Container, Text, Link, Flex } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import Sc2SectionHeader from '../components/sc2/sc2-section-header'
import { PROTOSS_CYAN, PALETTES } from '../lib/site-theme-context'

// SC2 console tokens (#7)
const PANEL_BG = PALETTES.sc2.panelBg
const ACCENT = PROTOSS_CYAN
const TEXT = PALETTES.sc2.text
const MUTED = PALETTES.sc2.muted

// Format ISO date → "Mar 2026"
const formatDate = iso =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

// Single console-styled transmission row
const PostRow = ({ title, link, pubDate, contentSnippet }, i) => (
  <Box
    key={link}
    as={Link}
    href={link}
    isExternal
    display="block"
    _hover={{ textDecoration: 'none' }}
    mb={3}
  >
    <Flex
      gap={3}
      p={3}
      bg={PANEL_BG}
      border={`1px solid ${ACCENT}33`}
      borderRadius="sm"
      fontFamily="monospace"
      _hover={{ borderColor: `${ACCENT}88`, bg: 'rgba(0,187,221,0.05)' }}
      transition="all 0.15s"
      align="flex-start"
    >
      {/* Index */}
      <Text fontSize="10px" color={ACCENT} mt="2px" flexShrink={0} w="18px">
        {String(i + 1).padStart(2, '0')}
      </Text>
      <Box flex={1} minW={0}>
        <Text
          fontSize="sm"
          color={TEXT}
          fontWeight={600}
          lineHeight={1.3}
          mb={1}
        >
          {title}
        </Text>
        {contentSnippet && (
          <Text fontSize="11px" color={MUTED} noOfLines={2} lineHeight={1.5}>
            {contentSnippet}
          </Text>
        )}
      </Box>
      <Text fontSize="10px" color={MUTED} flexShrink={0} mt="2px">
        {pubDate ? formatDate(pubDate) : '—'}
      </Text>
    </Flex>
  </Box>
)

const Posts = ({ posts, error }) => (
  <Layout title="Posts">
    <Container>
      <Sc2SectionHeader as="h1" mt={0}>
        Posts
      </Sc2SectionHeader>

      {/* Console panel header */}
      <Box
        bg={PANEL_BG}
        border={`2px solid ${ACCENT}`}
        borderRadius="sm"
        boxShadow={`0 0 0 3px rgba(4,12,28,0.9), 0 0 0 5px ${ACCENT}33, inset 0 0 24px rgba(0,221,255,0.05)`}
        overflow="hidden"
        mb={6}
      >
        <Flex
          px={4}
          py={2}
          bg="rgba(0,187,221,0.06)"
          borderBottom={`1px solid ${ACCENT}44`}
          justify="space-between"
          align="center"
        >
          <Text
            fontFamily="monospace"
            fontSize="10px"
            color={ACCENT}
            letterSpacing="0.15em"
          >
            ▸ KHALAI ARCHIVE — coderhorizon.com
          </Text>
          <Text fontFamily="monospace" fontSize="10px" color={MUTED}>
            {posts.length} transmissions
          </Text>
        </Flex>

        <Box p={4}>
          {error && (
            <Text fontFamily="monospace" fontSize="sm" color="#ff6666">
              ◇ Could not load posts — visit coderhorizon.com directly
            </Text>
          )}
          {!error && posts.length === 0 && (
            <Text fontFamily="monospace" fontSize="sm" color={MUTED}>
              ◇ No transmissions yet — check back soon
            </Text>
          )}
          {posts.map((post, i) => PostRow(post, i))}
        </Box>
      </Box>

      <Section delay={0.2}>
        <Flex justify="center">
          <Link
            href="https://coderhorizon.com/"
            isExternal
            fontFamily="monospace"
            fontSize="xs"
            color={ACCENT}
            letterSpacing="0.1em"
            _hover={{ color: TEXT }}
          >
            ▸ Subscribe on Substack →
          </Link>
        </Flex>
      </Section>
    </Container>
  </Layout>
)

export async function getStaticProps() {
  try {
    const parser = new Parser({ timeout: 8000 })
    const feed = await parser.parseURL('https://coderhorizon.com/feed')
    const posts = (feed.items || []).map(
      ({ title, link, pubDate, contentSnippet }) => ({
        title: title || '',
        link: link || '',
        pubDate: pubDate || null,
        contentSnippet: contentSnippet ? contentSnippet.slice(0, 200) : ''
      })
    )
    return { props: { posts, error: false }, revalidate: 3600 } // refresh hourly
  } catch {
    return { props: { posts: [], error: true }, revalidate: 300 }
  }
}

export default Posts
