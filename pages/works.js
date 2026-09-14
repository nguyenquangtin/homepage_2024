import { Container, SimpleGrid, Box } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'
import Sc2SectionHeader from '../components/sc2/sc2-section-header'
import { ProtossCrystalGem } from '../components/sc2/protoss-ornament'
import { PROTOSS_LABELS } from '../lib/protoss-terminology'
import { KHALA_GOLD_RGB } from '../lib/site-theme-context'

import thumbTTM from '../public/images/works/ttm.png'
import thumbTTMW from '../public/images/works/ttm_w.png'
import thumbLaravue from '../public/images/works/laravue.png'
import thumbVtve from '../public/images/works/vtv_giaitri.png'
import thumbShopware6 from '../public/images/works/shopware6.png'

// Gold seam with a centered khaydarin gem, replacing the plain Divider
// between chronicle tiers (LotV pass)
const SeamDivider = () => (
  <Box
    aria-hidden
    position="relative"
    my={6}
    h="1px"
    bg={`rgba(${KHALA_GOLD_RGB}, 0.25)`}
  >
    <Box position="absolute" top="-7px" left="50%" transform="translateX(-50%)">
      <ProtossCrystalGem />
    </Box>
  </Box>
)

const Works = () => (
  <Layout title="Works">
    <Container>
      <Sc2SectionHeader as="h1" mt={0}>
        {PROTOSS_LABELS.works}
      </Sc2SectionHeader>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section>
          <WorkGridItem
            id="ttm"
            title="TikTok Management"
            thumbnail={thumbTTM}
            tier="legendary"
            tags={['Vue', 'Laravel', 'TikTok API', 'SaaS']}
          >
            A SaaS tool for managing TikTok accounts and Fund management
          </WorkGridItem>
        </Section>

        <Section>
          <WorkGridItem
            id="ttm-whitelabel"
            title="TikTok Management Whitelabel"
            thumbnail={thumbTTMW}
            tier="legendary"
            tags={['Vue', 'Laravel', 'Whitelabel']}
          >
            The Whitelable system for TikTok Management. You want to be a TikTok
            Agency? This is the right choice.
          </WorkGridItem>
        </Section>
      </SimpleGrid>

      <Section delay={0.2}>
        <SeamDivider />

        <Sc2SectionHeader>{PROTOSS_LABELS.contribute}</Sc2SectionHeader>
      </Section>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section delay={0.3}>
          <WorkGridItem
            id="shopware6"
            thumbnail={thumbShopware6}
            title="Shopware 6"
            tier="epic"
            tags={['PHP', 'Symfony', 'Vue 3', 'OSS']}
          >
            Shopware 6 is an open headless commerce platform powered by Symfony
            7 and Vue.js 3.
          </WorkGridItem>
        </Section>
        <Section delay={0.3}>
          <WorkGridItem
            id="laravue"
            thumbnail={thumbLaravue}
            title="Laravue"
            tier="epic"
            tags={['Laravel', 'Vue', 'Element', 'OSS']}
          >
            Laravue is a beautiful dashboard combination of Laravel, Vue.js and
            the UI toolkit Element a.
          </WorkGridItem>
        </Section>
      </SimpleGrid>

      <Section delay={0.4}>
        <SeamDivider />

        <Sc2SectionHeader>{PROTOSS_LABELS.oldWorks}</Sc2SectionHeader>
      </Section>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section delay={0.5}>
          <WorkGridItem
            id="vtv_giaitri"
            thumbnail={thumbVtve}
            title="VTV GiaiTri"
            tier="rare"
            tags={['Web', 'Media', '2014']}
          >
            VTV Entertainment is an application that provides exclusive
            entertainment content from Vietnam Television Station.
          </WorkGridItem>
        </Section>
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Works
export { getServerSideProps } from '../components/chakra'
