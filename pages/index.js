import NextLink from 'next/link'
import {
  Link,
  Heading,
  Box,
  SimpleGrid,
  Button,
  Text,
  Flex,
  useColorModeValue
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { IoLogoTwitter, IoLogoInstagram, IoLogoGithub } from 'react-icons/io5'
import Paragraph from '../components/paragraph'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import Image from 'next/image'
import { FfixMoogleFlying } from '../components/ffix-moogle'
import FfixCharSheet from '../components/ffix-char-sheet'
import { FfixTechMenu, FfixInterestTags } from '../components/ffix-battle-menu'
import FfixEquipment from '../components/ffix-equipment'
import FfixStatusEffects from '../components/ffix-status-effects'
import FfixMognet from '../components/ffix-mognet'
import FfixTetraCards from '../components/ffix-tetra-card'
import FfixEncounter from '../components/ffix-encounter'
import FfixWorldMap from '../components/ffix-world-map'

// Resume timeline entries — keeps JSX clean
const career = [
  { year: 'Jan 2026–now', role: 'Head of Tech Partnership',    company: 'Ecomdy Media',           url: 'https://ecomdymedia.com/' },
  { year: '2022–2025',    role: 'CTO',                         company: 'Ecomdy Media',           url: 'https://ecomdymedia.com/' },
  { year: '2020–2022',    role: 'Technical Leader / Core Dev', company: 'NFQ Asia · Shopware',    url: 'https://nfq.asia/' },
  { year: '2019–2020',    role: 'Technical Leader',            company: 'Ylinkee',                url: 'https://www.facebook.com/Ylinkee/' },
  { year: '2018–2019',    role: 'Tech Lead / Product Manager', company: 'Dotmark Connect',        url: null },
  { year: '2014–2017',    role: 'Branch Manager Vietnam',      company: 'Webpuppies Singapore',   url: 'https://webpuppies.com.sg/' },
  { year: '2010–2014',    role: 'Senior Interactive Developer', company: 'Webpuppies Singapore',  url: 'https://webpuppies.com.sg/' },
  { year: '2008–2010',    role: 'Interactive Web Developer',   company: 'Clearpath Development',  url: 'https://clearpathdevelopment.com/' },
  { year: '2007–2008',    role: 'Frontend Web Developer',      company: 'Success Software',       url: 'https://successsoftware.global/' },
  { year: '1987',         role: 'Born',                        company: 'Buon Ho, Daklak, Vietnam', url: null },
]

const socialLinks = [
  { icon: <IoLogoGithub />,    label: '@nguyenquangtin', href: 'https://github.com/nguyenquangtin' },
  { icon: <IoLogoTwitter />,   label: '@nguyenquangtin', href: 'https://twitter.com/nguyenquangtin' },
  { icon: <IoLogoInstagram />, label: '@tonytinnguyen',  href: 'https://instagram.com/tonytinnguyen' },
]

const Home = () => {
  const cardBg       = useColorModeValue('white', 'whiteAlpha.50')
  const cardBorder   = useColorModeValue('gray.200', 'whiteAlpha.100')
  const mutedText    = useColorModeValue('gray.500', 'gray.400')
  const timelineLine = useColorModeValue('blue.400', 'blue.500')

  // ── Career sidebar (reused in both mobile stack and desktop sidebar)
  const CareerPanel = (
    <Box
      borderRadius="xl"
      border="1px solid"
      borderColor={cardBorder}
      bg={cardBg}
      p={5}
    >
      <Box borderLeft="2px solid" borderColor={timelineLine} pl={4}>
        {career.map((entry, i) => (
          <Box key={i} mb={i < career.length - 1 ? 4 : 0} position="relative">
            <Box
              position="absolute"
              left="-21px"
              top="5px"
              w="8px"
              h="8px"
              borderRadius="full"
              bg={timelineLine}
            />
            <Text fontSize="xs" color={mutedText} fontFamily="mono" mb={0.5}>
              {entry.year}
            </Text>
            <Text fontWeight={600} fontSize="sm" lineHeight={1.3}>
              {entry.role}
            </Text>
            <Text fontSize="xs" color={mutedText}>
              {entry.url
                ? <Link href={entry.url} isExternal>{entry.company}</Link>
                : entry.company}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  )

  return (
    <>
      <FfixMoogleFlying />
      <FfixEncounter />
      <Layout>

          {/* ── TWO-COLUMN DESKTOP LAYOUT ─────────────────── */}
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            align="flex-start"
            gap={8}
          >

            {/* ── LEFT COLUMN — main content ─────────────── */}
            <Box flex={3} minW={0}>

              {/* HERO */}
              <Section delay={0}>
                <Flex
                  direction={{ base: 'column', md: 'row' }}
                  align="center"
                  gap={6}
                  py={4}
                >
                  <Box flexShrink={0} textAlign="center">
                    <Box
                      w="120px"
                      h="120px"
                      borderRadius="full"
                      overflow="hidden"
                      border="2px solid"
                      borderColor={timelineLine}
                      mx="auto"
                    >
                      <Image
                        src="/images/tony.png"
                        alt="Tony Tin Nguyen"
                        width={120}
                        height={120}
                      />
                    </Box>
                    <Flex align="center" justify="center" mt={2} gap={1}>
                      <Box w={2} h={2} borderRadius="full" bg="green.400" />
                      <Text fontSize="xs" color={mutedText}>Danang, Vietnam</Text>
                    </Flex>
                  </Box>

                  <Box flex={1}>
                    <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={700}>
                      Tony Tin Nguyen
                    </Heading>
                    <Text color={mutedText} mt={1} fontSize="sm" fontFamily="mono">
                      engineer · entrepreneur · black mage
                    </Text>
                    <Box
                      mt={3}
                      p={3}
                      borderRadius="lg"
                      bg={cardBg}
                      border="1px solid"
                      borderColor={cardBorder}
                      fontSize="sm"
                      fontWeight={500}
                    >
                      Building products that scale — Head of Tech Partnership at{' '}
                      <Link href="https://ecomdymedia.com/" isExternal color="blue.400">Ecomdy</Link>
                      , TikTok Marketing Partner & co-founder of{' '}
                      <Link href="https://gdgmientrung.com/" isExternal color="blue.400">GDG Mien Trung</Link>.
                    </Box>
                  </Box>
                </Flex>
              </Section>

              {/* WORK */}
              <Section delay={0.1}>
                <Heading as="h3" variant="section-title">Work</Heading>
                <Paragraph>
                  19+ years shipping web products for global brands (BreadTalk, CooperVision) and
                  fast-growing startups. Expert in JavaScript ecosystems — Node.js, React, Vue,
                  TypeScript — with a focus on e-commerce, TikTok API integrations, and scalable architecture.
                </Paragraph>
                <Box mt={4} textAlign="center">
                  <Button
                    as={NextLink}
                    href="/works"
                    scroll={false}
                    rightIcon={<ChevronRightIcon />}
                    colorScheme="blue"
                    size="sm"
                  >
                    View portfolio
                  </Button>
                </Box>
              </Section>

              {/* FFIX CHARACTER SHEET */}
              <Section delay={0.15}>
                <Heading as="h3" variant="section-title">Character Sheet</Heading>
                <FfixStatusEffects />
                {/* 3-column row: CharSheet | Tech | Equipment */}
                <SimpleGrid
                  columns={{ base: 1, sm: 2 }}
                  gap={4}
                  alignItems="stretch"
                  mt={3}
                  sx={{
                    '@media (min-width: 48em)': {
                      gridTemplateColumns: '2fr 1.4fr 1.4fr',
                    }
                  }}
                >
                  <FfixCharSheet />
                  <FfixTechMenu />
                  <FfixEquipment />
                </SimpleGrid>
                {/* Interest pills — full-width row below */}
                <Box mt={4}>
                  <FfixInterestTags />
                </Box>
              </Section>

              {/* TETRA MASTER CARDS */}
              <Section delay={0.25}>
                <Heading as="h3" variant="section-title">Featured</Heading>
                <FfixTetraCards />
              </Section>

              {/* CAREER — mobile only (shows inline in stack) */}
              <Box display={{ base: 'block', lg: 'none' }}>
                <Section delay={0.2}>
                  <Heading as="h3" variant="section-title">Career</Heading>
                  {CareerPanel}
                </Section>
              </Box>

              {/* WORLD MAP */}
              <Section delay={0.3}>
                <Heading as="h3" variant="section-title">Location</Heading>
                <FfixWorldMap />
              </Section>

              {/* SOCIAL LINKS */}
              <Section delay={0.35}>
                <Heading as="h3" variant="section-title">On the web</Heading>
                <Flex gap={3} wrap="wrap" mt={2}>
                  {socialLinks.map(({ icon, label, href }) => (
                    <Link key={href} href={href} isExternal _hover={{ textDecoration: 'none' }}>
                      <Flex
                        align="center"
                        gap={2}
                        px={3}
                        py={2}
                        borderRadius="lg"
                        border="1px solid"
                        borderColor={cardBorder}
                        bg={cardBg}
                        fontSize="sm"
                        fontWeight={500}
                        _hover={{ borderColor: 'blue.400' }}
                        transition="border-color 0.2s"
                        cursor="pointer"
                      >
                        {icon}
                        <Text>{label}</Text>
                      </Flex>
                    </Link>
                  ))}
                </Flex>
              </Section>

              {/* MOGNET — newsletter CTA */}
              <Section delay={0.4}>
                <Heading as="h3" variant="section-title">Mognet</Heading>
                <FfixMognet />
              </Section>

            </Box>

            {/* ── RIGHT COLUMN — sticky career (desktop only) ─ */}
            <Box
              flex={2}
              minW="280px"
              display={{ base: 'none', lg: 'block' }}
              position="sticky"
              top="80px"
              alignSelf="flex-start"
            >
              <Section delay={0.2}>
                <Heading as="h3" variant="section-title">Career</Heading>
                {CareerPanel}
              </Section>
            </Box>

          </Flex>
      </Layout>
    </>
  )
}

export default Home
export { getServerSideProps } from '../components/chakra'
