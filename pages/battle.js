import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Container, Text } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Sc2SectionHeader from '../components/sc2/sc2-section-header'
import Sc2Panel from '../components/sc2/sc2-panel'
import BattleArenaLobby from '../components/battle/battle-arena-lobby'
import { getRandomEnemy } from '../components/battle/battle-enemies'
import { PROTOSS_LABELS } from '../lib/protoss-terminology'
import { PALETTES } from '../lib/site-theme-context'

// BattleScene mounts a Three.js-free but still client-only canvas of motion
// effects — keep it out of the server bundle (same pattern as ffix-encounter).
const BattleScene = dynamic(() => import('../components/battle/battle-scene'), { ssr: false })

const Battle = () => {
  // Enemy is picked client-side only — Math.random() during render would
  // desync the SSR markup from the client on hydration.
  const [enemy, setEnemy] = useState(null)
  const [engaged, setEngaged] = useState(false)

  useEffect(() => {
    setEnemy(getRandomEnemy('sc2'))
  }, [])

  const reroll = useCallback(() => setEnemy(getRandomEnemy('sc2')), [])
  const engage = useCallback(() => setEngaged(true), [])

  // Returning from BattleScene (victory/defeat/escape/Esc) drops back to a
  // fresh lobby encounter rather than the same defeated foe.
  const handleClose = useCallback(() => {
    setEngaged(false)
    setEnemy(getRandomEnemy('sc2'))
  }, [])

  return (
    <Layout title="Battle">
      <Container maxW="container.md">
        <Sc2SectionHeader as="h1" mt={0}>
          {PROTOSS_LABELS.battle}
        </Sc2SectionHeader>

        <Text
          fontFamily="mono"
          fontSize="sm"
          color={PALETTES.sc2.muted}
          mb={4}
          letterSpacing="0.02em"
        >
          Master Phase-Smith Tony, Khalai engineer, answers the Swarm&apos;s
          call once more — a scouting report on today&apos;s threat, then
          engage at will.
        </Text>

        <Sc2Panel
          unpadded
          tone="gold"
          h={{ base: '70vh', md: '520px' }}
          position="relative"
        >
          {enemy && !engaged && (
            <BattleArenaLobby enemy={enemy} onEngage={engage} onReroll={reroll} />
          )}
          {enemy && engaged && <BattleScene enemy={enemy} onClose={handleClose} />}
        </Sc2Panel>
      </Container>
    </Layout>
  )
}

export default Battle
