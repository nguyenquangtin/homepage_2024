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
        Laravue <Badge>2020-2021</Badge>
      </Title>
      <P>
        Laravue (pronounced /&apos;larəvjuː/) is a beautiful dashboard combination of Laravel, Vue.js and the UI toolkit Element.
      </P>
      <P>
        It is inspired by vue-element-admin with our love on top of that. With the the Laravel framework for the backend and Vue.js for the frontend, Laravue aims to be a full-stack solution.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://doc.laravue.dev/">
            https://doc.laravue.dev/ <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>

        <ListItem>
          <Meta>Source code</Meta>
          <Link href="https://github.com/tuandm/laravue">
            https://github.com/tuandm/laravue <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>

        <ListItem>
          <Meta>Platform</Meta>
          <span>Web</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>
          Laravel, Vue.js
          </span>
        </ListItem>
      </List>

      <WorkImage src="/images/works/laravue.png" alt="Laravue" />
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
