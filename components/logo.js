import Link from 'next/link'
import { Text } from '@chakra-ui/react'
import CodeBracketIcon from './icons/code-bracket'
import styled from '@emotion/styled'
import { PALETTES, PROTOSS_CYAN_BRIGHT, PROTOSS_CYAN_RGB } from '../lib/site-theme-context'

// LotV pass: Orbitron chrome wordmark, dark-only (no useColorModeValue —
// the site is locked to the SC2 console look, see navbar.js note).
const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;

  > svg {
    transition: 200ms ease;
  }

  &:hover > svg {
    transform: rotate(20deg);
  }

  &:hover .logo-wordmark {
    color: ${PROTOSS_CYAN_BRIGHT};
    text-shadow: 0 0 10px rgba(${PROTOSS_CYAN_RGB}, 0.7);
  }
`

const Logo = () => {
  return (
    <Link href="/" scroll={false}>
      <LogoBox>
        <CodeBracketIcon />
        <Text
          className="logo-wordmark"
          color={PALETTES.sc2.text}
          fontFamily="heading"
          fontWeight="600"
          fontSize="13px"
          textTransform="uppercase"
          letterSpacing="0.14em"
          ml={3}
          transition="color 150ms ease, text-shadow 150ms ease"
        >
          Tony Tin Nguyen
        </Text>
      </LogoBox>
    </Link>
  )
}

export default Logo
