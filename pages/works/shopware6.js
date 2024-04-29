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
  <Layout title="Shopware 6">
    <Container>
      <Title>
        Shopware 6<Badge>2020-2022</Badge>
      </Title>
      <P>
        Shopware 6 is an open headless commerce platform powered by Symfony 7 and Vue.js 3 that is used by thousands of shops and supported by a huge, worldwide community of developers, agencies and merchants.
      </P>
      <P>
      Tony used to contribute to the Admin Panel and some premium themes for Shopware 6 while working with the Core team in Schöppingen, German.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://www.shopware.com/en/">
          https://www.shopware.com/ <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>

        <ListItem>
          <Meta>Source code</Meta>
          <Link href="https://github.com/shopware/shopware">
          https://github.com/shopware/shopware <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>

        <ListItem>
          <Meta>Platform</Meta>
          <span>Web</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>Symfony 7, Vue.js 3</span>
        </ListItem>
      </List>

      <WorkImage src="/images/works/shopware6.png" alt="Shopware 6" />
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
