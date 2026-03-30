import { motion } from 'framer-motion'

// Converts a 16x16 grid (array of strings) + palette into an SVG
// Each char in the string maps to a color via palette. '0' = transparent.
const PixelSprite = ({ grid, palette, size = 128, flip = false, ...props }) => {
  const cells = []
  const px = size / 16
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y]
    for (let x = 0; x < row.length; x++) {
      const c = row[x]
      if (c === '0') continue
      const color = palette[c]
      if (!color) continue
      cells.push(
        <rect key={`${x}-${y}`} x={x * px} y={y * px} width={px} height={px} fill={color} />
      )
    }
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ imageRendering: 'pixelated', transform: flip ? 'scaleX(-1)' : undefined }}
      {...props}
    >
      {cells}
    </svg>
  )
}

// ── Palettes ──
const P_MAGE = {
  1: '#1a1a2e', // dark outline
  2: '#3b2d7a', // dark purple robe
  3: '#5b3fb5', // purple robe
  4: '#c8a800', // gold trim / eyes
  5: '#f0e6a0', // cream / face glow
  6: '#2a1a4e', // hat dark
  7: '#7b5fd0', // light purple
  8: '#4a3090', // mid purple
  9: '#ffcc00', // bright gold staff tip
}

const P_BUG = {
  1: '#2d1b00', 2: '#cc3300', 3: '#ff6633', 4: '#ff9944',
  5: '#ffcc66', 6: '#441100', 7: '#ff4422', 8: '#ffffff',
}

const P_LEGACY = {
  1: '#2a2520', 2: '#5c5040', 3: '#8a7b60', 4: '#b8a880',
  5: '#d8d0b0', 6: '#403828', 7: '#ff6644', 8: '#ffaa66',
}

const P_SCOPE = {
  1: '#1a0a2e', 2: '#4b2080', 3: '#7b40c0', 4: '#40cc70',
  5: '#80ff90', 6: '#2a1050', 7: '#a060e0', 8: '#60ee80',
}

const P_DEAD = {
  1: '#1a0000', 2: '#880000', 3: '#cc2200', 4: '#ff4400',
  5: '#ffaa00', 6: '#440000', 7: '#ff6644', 8: '#ffffff',
}

const P_MERGE = {
  1: '#0a1030', 2: '#2244cc', 3: '#4488ff', 4: '#cc2244',
  5: '#ff4466', 6: '#112266', 7: '#88aaff', 8: '#ff8899',
}

// ── 16x16 Sprite Grids ──
// Black Mage Tony — pointed hat, glowing eyes, dark robe, staff
const MAGE_GRID = [
  '0000006660000000',
  '0000066166000000',
  '0000661116600000',
  '0006611116600000',
  '0066111116600000',
  '0661111111600000',
  '0066666666600000',
  '0001154451100000',
  '0001144441100000',
  '0000133331000000',
  '0001238832100000',
  '0012233332210000',
  '0012233332210000',
  '0001223322100000',
  '0000122221009000',
  '0000011110099000',
]

// Wild Bug — insect with antennae and legs
const BUG_GRID = [
  '0060000000000600',
  '0006000000006000',
  '0000611111160000',
  '0006233333260000',
  '0063344444336000',
  '0632344444326300',
  '6003244444230060',
  '0003344444330000',
  '0063234443236000',
  '6003233333230060',
  '0006233333260000',
  '0000622222600000',
  '0006011111060000',
  '0060000000006000',
  '0600000000000600',
  '0000000000000000',
]

// Legacy Code — crumbling scroll/book with glowing runes
const LEGACY_GRID = [
  '0000111111110000',
  '0001555555551000',
  '0015555555555100',
  '0154447544475100',
  '0155555555555100',
  '0155474755555100',
  '0155555555475100',
  '0155547455555100',
  '0155555555555100',
  '0155555474555100',
  '0155475555555100',
  '0154555555545100',
  '0015533335551000',
  '0001553335510000',
  '0000111111100000',
  '0000000000000000',
]

// Scope Creep — amorphous blob with tendrils
const SCOPE_GRID = [
  '0000001100000000',
  '0000012210000050',
  '0000123321000500',
  '0001233332105000',
  '0012344443210000',
  '0123444444321000',
  '1234444444432100',
  '1234444444432100',
  '0234444444432000',
  '0023444444320500',
  '0002344443205000',
  '0500234432050000',
  '0050023200500000',
  '0005002005000000',
  '0000500500000000',
  '0000050000000000',
]

// Deadline — menacing hourglass with red glow
const DEAD_GRID = [
  '0001111111100000',
  '0001555555100000',
  '0000544445000000',
  '0000054450000000',
  '0000005400000000',
  '0000005400000000',
  '0000054450000000',
  '0000544445000000',
  '0001533335100000',
  '0001553355100000',
  '0001555555100000',
  '0001111111100000',
  '0000033300000000',
  '0000344430000000',
  '0003444443000000',
  '0000333330000000',
]

// Merge Conflict — two overlapping arrows clashing
const MERGE_GRID = [
  '0000000006000000',
  '0000000066000000',
  '0222222666200000',
  '2333333766320000',
  '2333337777332000',
  '2333333766320000',
  '0222222666200000',
  '0000000066000000',
  '0000004400000000',
  '0000044500000000',
  '0004445555444000',
  '0004555888554000',
  '0045558888554000',
  '0004555888554000',
  '0004445555444000',
  '0000044500000000',
]

const SPRITE_DATA = {
  blackMage:    { grid: MAGE_GRID, palette: P_MAGE },
  bug:          { grid: BUG_GRID, palette: P_BUG },
  legacyCode:   { grid: LEGACY_GRID, palette: P_LEGACY },
  scopeCreep:   { grid: SCOPE_GRID, palette: P_SCOPE },
  deadline:     { grid: DEAD_GRID, palette: P_DEAD },
  mergeConflict:{ grid: MERGE_GRID, palette: P_MERGE },
}

// Animated sprite wrapper with idle bobbing
export const BattleSprite = ({ spriteKey, size = 128, flip = false, ...rest }) => {
  const data = SPRITE_DATA[spriteKey]
  if (!data) return null
  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      {...rest}
    >
      <PixelSprite grid={data.grid} palette={data.palette} size={size} flip={flip} />
    </motion.div>
  )
}

export default BattleSprite
