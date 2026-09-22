import { Container, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => (
  <Layout title="Ecomdy Office 3D">
    <Container>
      <Title>
        Ecomdy Office 3D <Meta>2026</Meta>
      </Title>
      <P>
        A personal project: an interactive 3D model of the Ecomdy Media office
        at 55 Le Quang Hoa, Da Nang. Orbit, zoom and click through each floor,
        the rooftop, the front yard with its koi pond and the event courtyard.
      </P>
      <P>
        It also includes night mode, an event layout, a Mid-Autumn theme and
        layers for staff seating, parking and wiring.
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://ecomdy-office.vercel.app/" isExternal>
            https://ecomdy-office.vercel.app/ <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Web</span>
        </ListItem>
        <ListItem>
          <Meta>Stack</Meta>
          <span>Three.js, WebGL</span>
        </ListItem>
      </List>

      <WorkImage src="/images/works/ecomdy-office.png" alt="Ecomdy Office 3D" />
    </Container>
  </Layout>
)

export default Work
export { getServerSideProps } from '../../components/chakra'
