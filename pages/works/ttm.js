import {
  Container,
  Badge,
  Link,
  List,
  ListItem,
  // AspectRatio
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="Tiktok Management System">
    <Container>
      <Title>
        TikTok Management (TTM) <Badge>2021-</Badge>
      </Title>
      <P>
        TikTok Ads Management (TTM) is a SaaS tool for managing TikTok accounts and fund management between your Ads accounts.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Product Info Website</Meta>
          <Link href="https://ecomdymedia.com/ecomdy-platform">
            https://ecomdymedia.com/ecomdy-platform <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://tiktok.ecomdymedia.com/">
          https://tiktok.ecomdymedia.com <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>

        <ListItem>
          <Meta>Platform</Meta>
          <span>Web</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>
            NodeJs, Vue.js, Stripe, TikTok API, Docker, Kubernetes, Nginx
          </span>
        </ListItem>
        <ListItem>
          <Meta>Features</Meta>
          <Link href="https://www.tiktok.com/business/en-US/inspiration/ecomdy-media">
            Ecomdy Media | TikTok for Business Case Study
            <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
      </List>

      <WorkImage src="/images/works/ttm.png" alt="TikTok Ads Management by Ecomdy" />
      {/* <AspectRatio maxW="640px" ratio={1.7} my={4}>
        <iframe
          src="https://www.youtube.com/embed/-qBavwqc_mY"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </AspectRatio> */}
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../components/chakra'
