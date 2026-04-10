// Dev-themed enemies for FFIX Black Mage battles
const FFIX_ENEMIES = [
  { name: 'WILD BUG',       hp: 220, atk: 22, def: 12, weakness: 'fire',    spriteKey: 'bug',           desc: 'A crawling menace from the codebase depths.' },
  { name: 'LEGACY CODE',    hp: 320, atk: 18, def: 20, weakness: 'thunder', spriteKey: 'legacyCode',    desc: 'Ancient spaghetti that refuses to die.' },
  { name: 'SCOPE CREEP',    hp: 280, atk: 26, def: 14, weakness: 'ice',     spriteKey: 'scopeCreep',    desc: 'It just keeps growing...' },
  { name: 'DEADLINE',       hp: 380, atk: 32, def: 16, weakness: null,      spriteKey: 'deadline',      desc: 'Time waits for no developer.' },
  { name: 'MERGE CONFLICT', hp: 300, atk: 28, def: 15, weakness: null,      spriteKey: 'mergeConflict', desc: 'Two realities collide. Only one survives.' },
]

// Zerg-themed enemies for SC2 High Templar battles
const SC2_ENEMIES = [
  { name: 'ZERGLING SWARM', hp: 180, atk: 24, def: 10, weakness: 'psionic',     spriteKey: 'zergling',  desc: 'Fast, cheap, and many.' },
  { name: 'HYDRALISK',      hp: 300, atk: 28, def: 14, weakness: 'feedback',    spriteKey: 'hydralisk', desc: 'Spines shred shields in seconds.' },
  { name: 'BANELING NEST',  hp: 220, atk: 35, def: 8,  weakness: 'psionic',     spriteKey: 'baneling',  desc: 'One wrong step and boom.' },
  { name: 'ULTRALISK',      hp: 400, atk: 30, def: 22, weakness: null,          spriteKey: 'ultralisk', desc: 'The ground shakes as it approaches.' },
  { name: 'BROOD LORD',     hp: 340, atk: 26, def: 18, weakness: 'hallucinate', spriteKey: 'broodLord', desc: 'Broodlings rain from the sky.' },
]

export const getRandomEnemy = (theme = 'ffix') => {
  const pool = theme === 'sc2' ? SC2_ENEMIES : FFIX_ENEMIES
  const template = pool[Math.floor(Math.random() * pool.length)]
  return { ...template, maxHp: template.hp }
}

export default FFIX_ENEMIES
