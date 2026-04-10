import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import VoxelDogLoader from '../voxel-dog-loader'
import { useSiteTheme } from '../../lib/site-theme-context'

const LazySword = dynamic(() => import('../voxel-dog'), {
  ssr: false,
  loading: () => <VoxelDogLoader />
})

const LazyProtossPylon = dynamic(() => import('../protoss-pylon'), {
  ssr: false,
  loading: () => <VoxelDogLoader />
})

const Main = ({ children, router }) => {
  const { theme } = useSiteTheme()
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Building products that scale. Head of Tech Partnership at Ecomdy Media, TikTok Marketing Partner. 19+ years in JavaScript & e-commerce. Danang, Vietnam." />
        <meta name="author" content="Tony Tin Nguyen" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.nguyenquangtin.com${router.asPath.split('?')[0]}`} />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nguyenquangtin" />
        <meta name="twitter:creator" content="@nguyenquangtin" />
        <meta name="twitter:title" content="Tony Tin Nguyen — Building products that scale." />
        <meta name="twitter:description" content="Building products that scale. Head of Tech Partnership at Ecomdy Media, TikTok Marketing Partner. 19+ years in JS & e-commerce." />
        <meta name="twitter:image" content="https://www.nguyenquangtin.com/card.png" />

        {/* Open Graph */}
        <meta property="og:site_name" content="Tony Tin Nguyen" />
        <meta property="og:title" content="Tony Tin Nguyen — Building products that scale." />
        <meta property="og:description" content="Building products that scale. Head of Tech Partnership at Ecomdy Media, TikTok Marketing Partner. 19+ years in JS & e-commerce." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.nguyenquangtin.com${router.asPath.split('?')[0]}`} />
        <meta property="og:image" content="https://www.nguyenquangtin.com/card.png" />
        <meta property="og:locale" content="en_US" />

        {/* JSON-LD Person schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Tony Tin Nguyen",
            "url": "https://www.nguyenquangtin.com",
            "jobTitle": "Head of Tech Partnership",
            "worksFor": { "@type": "Organization", "name": "Ecomdy Media", "url": "https://ecomdymedia.com" },
            "address": { "@type": "PostalAddress", "addressLocality": "Danang", "addressCountry": "VN" },
            "sameAs": [
              "https://github.com/nguyenquangtin",
              "https://twitter.com/nguyenquangtin",
              "https://coderhorizon.com"
            ]
          })}}
        />

        <title>Tony Tin Nguyen — Building products that scale.</title>
      </Head>

      <NavBar path={router.asPath} />

      <Container maxW="container.xl" pt={14}>
        {theme === 'sc2' ? <LazyProtossPylon /> : <LazySword />}

        {children}

        <Footer />
      </Container>
    </Box>
  )
}

export default Main
