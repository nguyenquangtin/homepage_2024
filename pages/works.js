import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'

import thumbTTM from '../public/images/works/ttm.png'
import thumbTTMW from '../public/images/works/ttm_w.png'
import thumbLaravue from '../public/images/works/laravue.png'
import thumbVtve from '../public/images/works/vtv_giaitri.png'
import thumbShopware6 from '../public/images/works/shopware6.png'

const Works = () => (
  <Layout title="Works">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Works
      </Heading>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section>
          <WorkGridItem id="ttm" title="TikTok Management" thumbnail={thumbTTM}>
            A SaaS tool for managing TikTok accounts and Fund management
          </WorkGridItem>
        </Section>

        <Section>
          <WorkGridItem id="ttm-whitelabel" title="TikTok Management Whitelabel" thumbnail={thumbTTMW}>
            The Whitelable system for TikTok Management.
            You want to be a TikTok Agency? This is the right choice.
          </WorkGridItem>
        </Section>

      </SimpleGrid>

      <Section delay={0.2}>
        <Divider my={6} />

        <Heading as="h3" fontSize={20} mb={4}>
          Contribute
        </Heading>
      </Section>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section delay={0.3}>
          <WorkGridItem id="shopware6" thumbnail={thumbShopware6} title="Shopware 6">
            Shopware 6 is an open headless commerce platform powered by Symfony 7 and Vue.js 3.
          </WorkGridItem>
        </Section>
        <Section delay={0.3}>
          <WorkGridItem id="laravue" thumbnail={thumbLaravue} title="Laravue">
            Laravue is a beautiful dashboard combination of Laravel, Vue.js and the UI toolkit Element a.
          </WorkGridItem>
        </Section>
      </SimpleGrid>

      <Section delay={0.4}>
        <Divider my={6} />

        <Heading as="h3" fontSize={20} mb={4}>
          Old works
        </Heading>
      </Section>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section delay={0.5}>
          <WorkGridItem id="vtv_giaitri" thumbnail={thumbVtve} title="VTV GiaiTri">
            VTV Entertainment is an application that provides exclusive entertainment
            content from Vietnam Television Station.
          </WorkGridItem>
        </Section>
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Works
export { getServerSideProps } from '../components/chakra'
