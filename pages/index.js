import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  SimpleGrid,
  Button,
  List,
  ListItem,
  useColorModeValue
} from '@chakra-ui/react'
import { ChevronRightIcon, EmailIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { GridItem } from '../components/grid-item'
import { IoLogoTwitter, IoLogoInstagram, IoLogoGithub } from 'react-icons/io5'
import thumbYouTube from '../public/images/links/youtube.png'
import thumbEcomdyMedia from '../public/images/links/ecomdy-media.png'
import Image from 'next/image'

const Home = () => (
  <Layout>
    <Container>
      <Box
        borderRadius="lg"
        mb={6}
        p={3}
        textAlign="center"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        css={{ backdropFilter: 'blur(10px)' }}
      >
        Hello, I&apos;m an software developer based in Danang, Vietnam.
      </Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Tony Tin Nguyen
          </Heading>
          <p>Digital Enthusiast (developer // entrepreneur // consultant)</p>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="100px"
            h="100px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <Image
              src="/images/tony.png"
              alt="Profile image"
              width="100"
              height="100"
            />
          </Box>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Work
        </Heading>
        <Paragraph>
          Tony is a highly skilled Web Development & Design Expert specializing
          in WordPress,a PHP, NodeJS, ReactJS, and VueJS. With a decade of
          experience, Tony has developed websites for renowned brands like
          BreadTalk and CooperVision. Their strengths include hand-coding,
          e-commerce integration, and API expertise. Passionate about
          JavaScript, Tony prioritizes mobile optimization and responsive
          design. Continual learning and industry participation keep them at the
          forefront of trends and solutions. Dedicated to delivering exceptional
          web solutions and building strong client relationships.
        </Paragraph>
        <br />
        <Paragraph>
          Nowadays he working as CTO with his wonderful colleges at{' '}
          <Link href="https://ecomdymedia.com/" target="_blank">
            Ecomdy
          </Link>{' '}
          -{' '}
          <Link href="https://partners.tiktok.com/partner-details/7047014454382297089/pc/en?rid=472pckxp14b">
            Tiktok Marketing Partner
          </Link>
          . Ecomdy was featured as{' '}
          <Link
            href="https://www.tiktok.com/business/en-US/inspiration/ecomdy-media?"
            target="_blank"
          >
            API showcases
          </Link>{' '}
          and one of the{' '}
          <Link href="https://www.tiktok.com/business/en/blog/badged-agency-marketing-partners">
            top agency in APAC
          </Link>
          .
        </Paragraph>
        <br />
        <Paragraph>
          Whenever he has free time, he is busy with the local developer
          commnutity as co-founder in{' '}
          <Link href="https://gdgmientrung.com/" target="_blank">
            Google Developer Group Mientrung
          </Link>{' '}
          in the beautiful sea city -
          <Link
            href="https://maps.app.goo.gl/8u2VrpY1XTDUELCf8"
            target="_blank"
          >
            Danang, Vietnam.
          </Link>
        </Paragraph>
        <Box align="center" my={4}>
          <Button
            as={NextLink}
            href="/works"
            scroll={false}
            rightIcon={<ChevronRightIcon />}
            colorScheme="teal"
          >
            My portfolio
          </Button>
        </Box>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Resume
        </Heading>
        <BioSection>
          <BioYear>2022 to present</BioYear>
          CTO at {' '}
          <Link href="https://ecomdymedia.com/" target="_blank">
            Ecomdy Media
          </Link>{' '}

        </BioSection>

        <BioSection>
          <BioYear>2020-2022</BioYear>
          Technical Leader at {' '}
          <Link href="https://nfq.asia/" target="_blank">
            NFQ Asia
          </Link>
          {'//'} Core Developer at {' '}
          <Link href="https://shopware.com/en/" target="_blank">
            Shopware
          </Link>
          <br />
          He leads the Shopware 6 core team at Shopware Asia - Danang branch.
          The team collaborates with the German team on PHP Symfony and Vue.js
          for back-end administration features and develope new premium themes
          for Shopware 6
        </BioSection>

        <BioSection>
          <BioYear>2019-2020</BioYear>
          Technical Leader at {' '}
          <Link href="https://www.facebook.com/Ylinkee/" target="_blank">
            Ylinkee
          </Link> <br />
          A young startup in Danang, Vietnam We focus on digital marketing, ecommerce and  products online.
        </BioSection>

        <BioSection>
          <BioYear>2018-2019</BioYear>
          Technical Leader // Product Manager at Dotmark Connect <br />
          Release product { ' ' }
          <Link href="https://vtv.vn/vtv-giai-tri.html" target='_blank'>VTV Giải Trí</Link>{' '}
           and ZAZU which TV platform for next Vietnamese generation.
           We reached <strong>298k CCU</strong> for &quot;Về nhà đi con&quot; TV series and <strong>80k CCU</strong> for hot sport live streaming.
        </BioSection>

        <BioSection>
          <BioYear>2014-2017</BioYear>
          Branch Manager Vietnam - {' '}
          <Link target="_blank" href="https://webpuppies.com.sg/">
            Webpuppies Singapore
          </Link>
          <br />I lead a small team
          in Vietnam to share the workload with Singapore team. We now focus on
          these areas Social Media Management, Digital Campaigns, Digital
          Marketing, Ecommerce Solutions.
        </BioSection>

        <BioSection>
          <BioYear>2010-2014</BioYear>Senior Interactive Web-developer at {' '}
          <Link target="_blank" href="https://webpuppies.com.sg/">
            Webpuppies Singapore
          </Link>
          <br />
          Manage and develop on servals projects and digital marketing campaigns
          for BreadTalk (Gen 2nd, Gen 3rd and 4th), FoodRepublic, Toast Box, Din
          Tai Fung, The Icing Room, Thy Moh Chan, Bread Society, BreadTalk IHQ,
          RamenPlay.
        </BioSection>

        <BioSection>
          <BioYear>2008-2010</BioYear>
          Interactive Web-developer at {' '}
          <Link target="_blank" href="https://clearpathdevelopment.com/">
            Clearpath Development
          </Link>
        </BioSection>

        <BioSection>
          <BioYear>2007-2008</BioYear>
          Frontend Web-developer at {' '}
          <Link target="_blank" href="https://successsoftware.global/">
            Success Software Services
          </Link>
        </BioSection>

        <BioSection>
          <BioYear>2007</BioYear>
          C# developer at Tien Hoang Ltd for product &quot;StockMan&quot; - stock
          management software.
        </BioSection>

        <BioSection>
          <BioYear>1987</BioYear>
          Born in Buon Ho, Daklak, Vietnam.
        </BioSection>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          What I ♥
        </Heading>
        <Paragraph>
          Music, Books, Coffee, Running
        </Paragraph>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          On the web
        </Heading>
        <List>
          <ListItem>
            <Link href="https://github.com/nguyenquangtin" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoGithub />}
              >
                @nguyenquangtin
              </Button>
            </Link>
          </ListItem>

          <ListItem>
            <Link href="https://twitter.com/nguyenquangtin" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoTwitter/>}
              >
                @nguyenquangtin
              </Button>
            </Link>
          </ListItem>

          <ListItem>
            <Link href="https://instagram.com/tonytinnguyen" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoInstagram />}
              >
                @tonytinnguyen
              </Button>
            </Link>
          </ListItem>
        </List>

        <SimpleGrid columns={[1, 2, 2]} gap={6}>
          <GridItem
            href="https://www.youtube.com/@coderhorizon"
            title="Coder Horizon"
            thumbnail={thumbYouTube}
          >
            My YouTube channel
          </GridItem>
          <GridItem
            href="https://ecomdymedia.com/"
            title="Ecomdy Media"
            thumbnail={thumbEcomdyMedia}
          >
            TikTok Ads Management
          </GridItem>
        </SimpleGrid>

        <Heading as="h3" variant="section-title">
          Newsletter
        </Heading>
        <p>
          Join me on my journey to build a better life as a developer.{' '}
          I&apos;ll share tips and tricks  I learn along the way.
        </p>

        <Box align="center" my={4}>
          <Button
            as={NextLink}
            href="https://tonytinnguyen.substack.com/"
            scroll={false}
            leftIcon={<EmailIcon />}
            colorScheme="teal"
          >
            Sign up my newsletter here
          </Button>
        </Box>
      </Section>
    </Container>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
