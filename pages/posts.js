import Parser from 'rss-parser'
import { Box, Container, Heading, Text, Link, Flex } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'

const PANEL_BG = 'rgba(8, 14, 40, 0.97)'
const GOLD = '#c8a800'
const CREAM = '#f0e6a0'
const MUTED = '#9890a0'

// Format ISO date → "Mar 2026"
const formatDate = iso =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

// Single FFIX-styled post row
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
      border={`1px solid ${GOLD}33`}
      borderRadius="sm"
      fontFamily="monospace"
      _hover={{ borderColor: `${GOLD}88`, bg: 'rgba(200,168,0,0.04)' }}
      transition="all 0.15s"
      align="flex-start"
    >
      {/* Index */}
      <Text fontSize="10px" color={GOLD} mt="2px" flexShrink={0} w="18px">
        {String(i + 1).padStart(2, '0')}
      </Text>
      <Box flex={1} minW={0}>
        <Text fontSize="sm" color={CREAM} fontWeight={600} lineHeight={1.3} mb={1}>
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
      <Heading as="h1" fontSize={20} mb={4}>
        Posts
      </Heading>

      {/* FFIX panel header */}
      <Box
        bg={PANEL_BG}
        border={`2px solid ${GOLD}`}
        borderRadius="sm"
        boxShadow={`0 0 0 3px rgba(8,14,40,0.9), 0 0 0 5px ${GOLD}33`}
        overflow="hidden"
        mb={6}
      >
        <Flex
          px={4} py={2}
          bg="rgba(200,168,0,0.06)"
          borderBottom={`1px solid ${GOLD}44`}
          justify="space-between"
          align="center"
        >
          <Text fontFamily="monospace" fontSize="10px" color={GOLD} letterSpacing="0.15em">
            ◆ MOGNET ARCHIVES — coderhorizon.com
          </Text>
          <Text fontFamily="monospace" fontSize="10px" color={MUTED}>
            {posts.length} dispatches
          </Text>
        </Flex>

        <Box p={4}>
          {error && (
            <Text fontFamily="monospace" fontSize="sm" color="#ff6666">
              ◇ Could not load posts — visit substack directly
            </Text>
          )}
          {!error && posts.length === 0 && (
            <Text fontFamily="monospace" fontSize="sm" color={MUTED}>
              ◇ No dispatches yet — check back soon
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
            color={GOLD}
            letterSpacing="0.1em"
            _hover={{ color: CREAM }}
          >
            ◆ Subscribe on Substack →
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
    const posts = (feed.items || []).map(({ title, link, pubDate, contentSnippet }) => ({
      title: title || '',
      link: link || '',
      pubDate: pubDate || null,
      contentSnippet: contentSnippet ? contentSnippet.slice(0, 200) : '',
    }))
    return { props: { posts, error: false }, revalidate: 3600 } // refresh hourly
  } catch {
    return { props: { posts: [], error: true }, revalidate: 300 }
  }
}

export default Posts
