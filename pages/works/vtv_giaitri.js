import {
  Container,
  Badge,
  Link,
  List,
  ListItem,
  AspectRatio
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="Shopware 6">
    <Container>
      <Title>
        VTV Giải Trí<Badge>2018-2019</Badge>
      </Title>
      <P>
        VTV Entertainment is an application that provides exclusive entertainment content from Vietnam Television Station. With the latest flat design interface, Full HD standard transmission technology, daily updated content, optimized for each individual and device, suitable for all ages; VTV Entertainment promises to bring the audience interesting experiences.
      </P>

      <P>
        In 2023, VTV Entertainment was merged into VTV Go - Vietnamese National Television&apos;s official application.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://doc.laravue.dev/">
            https://doc.laravue.dev/ <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>

        <ListItem>
          <Meta>Youtube</Meta>
          <Link href="https://www.youtube.com/channel/UCuJ5k3GndbHnXLYyiIR6Z8Q">
            VTV Giải Trí Official <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>

        <ListItem>
          <Meta>Platform</Meta>
          <span>Web, iOS, Android, Tizen</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>
            Django, React, Swift, Kotlin, Tizen SDK, Redis, Nginx, Docker
          </span>
        </ListItem>
      </List>

      <WorkImage src="/images/works/vtv_giaitri.png" alt="VTV Giatri" />
      <AspectRatio maxW="640px" ratio={1.7} my={4}>
        <iframe
          src="https://www.youtube.com/embed/QpfRsqTVwf0?si=iSvdL7BK_cuwDJGR"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </AspectRatio>
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../components/chakra'
