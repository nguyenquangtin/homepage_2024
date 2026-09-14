import Parser from 'rss-parser'
import { Container, Flex, Text } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import Sc2SectionHeader from '../components/sc2/sc2-section-header'
import Sc2Panel from '../components/sc2/sc2-panel'
import Sc2Button from '../components/sc2/sc2-button'
import {
  SignalMeter,
  TransmissionRow,
  formatDate
} from '../components/sc2/transmission-row'
import { PALETTES } from '../lib/site-theme-context'
import { PROTOSS_LABELS } from '../lib/protoss-terminology'

const MUTED = PALETTES.sc2.muted
const NEW_COUNT = 3

const Posts = ({ posts, error }) => (
  <Layout title="Posts">
    <Container>
      <Sc2SectionHeader as="h1" mt={0}>
        {PROTOSS_LABELS.posts}
      </Sc2SectionHeader>

      <Sc2Panel
        tone="cyan"
        unpadded
        mb={6}
        title="KHALAI ARCHIVE — coderhorizon.com"
        meta={
          <Flex as="span" display="inline-flex" align="center" gap={2}>
            <Text as="span">{posts.length} TRANSMISSIONS</Text>
            <SignalMeter />
          </Flex>
        }
      >
        {/* status strip */}
        <Flex
          px={4}
          py={2}
          borderBottom="1px solid rgba(240, 192, 64, 0.12)"
        >
          <Text
            fontFamily="mono"
            fontSize="10px"
            color={MUTED}
            letterSpacing="0.1em"
            textTransform="uppercase"
          >
            &#9656; CHANNEL: SUBSTACK &middot; ENCRYPTION: KHALA &middot; LAST
            SYNC: {posts[0] ? formatDate(posts[0].pubDate) : '—'}
          </Text>
        </Flex>

        {error && (
          <Text fontFamily="mono" fontSize="sm" color="#ff6666" p={4}>
            &#9671; Could not load posts — visit coderhorizon.com directly
          </Text>
        )}
        {!error && posts.length === 0 && (
          <Text fontFamily="mono" fontSize="sm" color={MUTED} p={4}>
            &#9671; No transmissions yet — check back soon
          </Text>
        )}
        {posts.map((post, i) => (
          <TransmissionRow
            key={post.link}
            post={post}
            index={i}
            isNew={i < NEW_COUNT}
            isLast={i === posts.length - 1}
          />
        ))}
      </Sc2Panel>

      <Section delay={0.2}>
        <Flex justify="center">
          <Sc2Button
            as="a"
            href="https://coderhorizon.com/"
            target="_blank"
            rel="noopener"
            variant="gold"
            size="sm"
          >
            OPEN CHANNEL →
          </Sc2Button>
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
