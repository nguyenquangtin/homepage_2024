import { useReducer, useCallback } from 'react'

// Player base stats (Black Mage Tony)
const PLAYER_BASE = {
  hp: 380, maxHp: 380,
  mp: 72, maxMp: 72,
  atk: 12, def: 10, mag: 28,
  itemUsed: false
}

// Spells with cost and element
const SPELLS = {
  fire:    { mp: 12, element: 'fire',    label: 'Fire' },
  ice:     { mp: 12, element: 'ice',     label: 'Ice' },
  thunder: { mp: 14, element: 'thunder', label: 'Thunder' }
}

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const calcPhysical = (atk, def) => Math.max(1, Math.floor(rand(8, 14) * atk / def))

const calcMagic = (mag, def, element, weakness) => {
  const mult = element === weakness ? 2.0 : 1.0
  return Math.max(1, Math.floor(rand(18, 28) * mag / def * mult))
}

const calcEnemyDmg = (atk, def) =>
  Math.max(1, Math.floor(rand(atk * 7, atk * 13) / 10 - def / 3))

// State machine phases
// player_turn → player_anim → enemy_turn → enemy_anim → player_turn ...
// Any turn can transition to victory or defeat

function battleReducer(state, action) {
  switch (action.type) {
    case 'ATTACK': {
      const dmg = calcPhysical(state.player.atk, state.enemy.def)
      const enemyHp = Math.max(0, state.enemy.hp - dmg)
      return {
        ...state,
        phase: 'player_anim',
        animType: 'attack',
        lastDmg: dmg,
        enemy: { ...state.enemy, hp: enemyHp },
        log: [...state.log, `Tony attacks! ${dmg} damage!`].slice(-3)
      }
    }

    case 'CAST_SPELL': {
      const spell = SPELLS[action.spell]
      if (!spell || state.player.mp < spell.mp) return state
      const dmg = calcMagic(state.player.mag, state.enemy.def, spell.element, state.enemy.weakness)
      const enemyHp = Math.max(0, state.enemy.hp - dmg)
      const isWeak = spell.element === state.enemy.weakness
      const msg = isWeak
        ? `Tony casts ${spell.label}! Critical! ${dmg} damage!`
        : `Tony casts ${spell.label}! ${dmg} damage!`
      return {
        ...state,
        phase: 'player_anim',
        animType: action.spell,
        lastDmg: dmg,
        player: { ...state.player, mp: state.player.mp - spell.mp },
        enemy: { ...state.enemy, hp: enemyHp },
        log: [...state.log, msg].slice(-3)
      }
    }

    case 'USE_ITEM': {
      if (state.player.itemUsed) return state
      const heal = Math.floor(state.player.maxHp * 0.5)
      const newHp = Math.min(state.player.maxHp, state.player.hp + heal)
      return {
        ...state,
        phase: 'player_anim',
        animType: 'item',
        lastDmg: -heal,
        player: { ...state.player, hp: newHp, itemUsed: true },
        log: [...state.log, `Tony uses Potion! Heals ${heal} HP!`].slice(-3)
      }
    }

    case 'RUN': {
      const escaped = Math.random() < 0.7
      if (escaped) {
        return { ...state, phase: 'escaped', log: [...state.log, 'Got away safely!'].slice(-3) }
      }
      return {
        ...state,
        phase: 'enemy_turn',
        log: [...state.log, "Can't escape!"].slice(-3)
      }
    }

    case 'ANIM_DONE': {
      if (state.enemy.hp <= 0) {
        return { ...state, phase: 'victory', log: [...state.log, `${state.enemy.name} defeated!`].slice(-3) }
      }
      if (state.phase === 'enemy_anim') {
        if (state.player.hp <= 0) {
          return { ...state, phase: 'defeat' }
        }
        return { ...state, phase: 'player_turn' }
      }
      return { ...state, phase: 'enemy_turn' }
    }

    case 'ENEMY_ATTACK': {
      const dmg = calcEnemyDmg(state.enemy.atk, state.player.def)
      const playerHp = Math.max(0, state.player.hp - dmg)
      return {
        ...state,
        phase: 'enemy_anim',
        animType: 'enemy_attack',
        lastDmg: dmg,
        player: { ...state.player, hp: playerHp },
        log: [...state.log, `${state.enemy.name} attacks! ${dmg} damage!`].slice(-3)
      }
    }

    default:
      return state
  }
}

export function useBattleEngine(enemy) {
  const initialState = {
    phase: 'player_turn',
    player: { ...PLAYER_BASE },
    enemy: { ...enemy },
    log: [`${enemy.name} appeared!`],
    animType: null,
    lastDmg: 0
  }

  const [state, dispatch] = useReducer(battleReducer, initialState)

  const attack = useCallback(() => dispatch({ type: 'ATTACK' }), [])
  const castSpell = useCallback((spell) => dispatch({ type: 'CAST_SPELL', spell }), [])
  const useItem = useCallback(() => dispatch({ type: 'USE_ITEM' }), [])
  const run = useCallback(() => dispatch({ type: 'RUN' }), [])
  const animDone = useCallback(() => dispatch({ type: 'ANIM_DONE' }), [])
  const enemyAttack = useCallback(() => dispatch({ type: 'ENEMY_ATTACK' }), [])

  return { state, attack, castSpell, useItem, run, animDone, enemyAttack }
}

export { SPELLS }
