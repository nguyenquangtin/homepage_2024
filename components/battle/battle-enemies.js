// Dev-themed enemies for the 8-bit RPG battle mini-game
// Each enemy has stats, a weakness element, and a sprite key for battle-sprites.js

const ENEMIES = [
  {
    name: 'WILD BUG',
    hp: 220,
    atk: 22,
    def: 12,
    weakness: 'fire',
    spriteKey: 'bug',
    desc: 'A crawling menace from the codebase depths.'
  },
  {
    name: 'LEGACY CODE',
    hp: 320,
    atk: 18,
    def: 20,
    weakness: 'thunder',
    spriteKey: 'legacyCode',
    desc: 'Ancient spaghetti that refuses to die.'
  },
  {
    name: 'SCOPE CREEP',
    hp: 280,
    atk: 26,
    def: 14,
    weakness: 'ice',
    spriteKey: 'scopeCreep',
    desc: 'It just keeps growing...'
  },
  {
    name: 'DEADLINE',
    hp: 380,
    atk: 32,
    def: 16,
    weakness: null,
    spriteKey: 'deadline',
    desc: 'Time waits for no developer.'
  },
  {
    name: 'MERGE CONFLICT',
    hp: 300,
    atk: 28,
    def: 15,
    weakness: null,
    spriteKey: 'mergeConflict',
    desc: 'Two realities collide. Only one survives.'
  }
]

export const getRandomEnemy = () => {
  const template = ENEMIES[Math.floor(Math.random() * ENEMIES.length)]
  return { ...template, maxHp: template.hp }
}

export default ENEMIES
