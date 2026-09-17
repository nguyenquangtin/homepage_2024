import { keyframes } from '@emotion/react'

// High Templar banner: one-off SVG gradient stops that have no site token.
// Kept few and named here so no raw hex leaks into the scene files.
export const SCENE_HEX = {
  space: '#05080f', // body bg (theme.js)
  spaceTop: '#0b1232',
  nebula: '#2a1f66',
  robeLit: '#2f2c6c',
  robe: '#1b1740',
  robeDeep: '#0b0a1e',
  cord: '#221d48',
  cordLit: '#3d3778',
  hoodShadow: '#06050d',
  skin: '#4a5578', // protoss grey-blue
  skinLit: '#8ea0c4',
  raisedTop: '#224076', // mirrors PROTOSS_NAVY_RAISED stops
  raisedBottom: '#0a142d'
}

// Every loop below animates opacity / transform / stroke-dashoffset only
// (brief §5). `sceneSx` kills all of them under prefers-reduced-motion, so
// each element's static attribute state must already be a finished frame.
const auraBreathe = keyframes`
  0%, 100% { transform: scale(1); opacity: .7; }
  50% { transform: scale(1.06); opacity: 1; }
`
const hoverBob = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`
const pulse = keyframes`
  0%, 100% { opacity: .5; }
  50% { opacity: 1; }
`
const arcFlow = keyframes`
  0% { stroke-dashoffset: 0; opacity: .5; }
  35% { opacity: 1; }
  65% { opacity: .45; }
  100% { stroke-dashoffset: -28; opacity: .9; }
`
const crackle = keyframes`
  0%, 22%, 100% { opacity: 0; }
  6% { opacity: .95; }
  10% { opacity: .15; }
  14% { opacity: .8; }
`
const keyPulse = keyframes`
  0%, 100% { opacity: .3; }
  50% { opacity: 1; }
`
const sweep = keyframes`
  0% { transform: translateY(-40px); opacity: 0; }
  12% { opacity: .55; }
  88% { opacity: .55; }
  100% { transform: translateY(300px); opacity: 0; }
`
const moteRise = keyframes`
  0% { transform: translateY(0); opacity: 0; }
  20% { opacity: .9; }
  80% { opacity: .5; }
  100% { transform: translateY(-80px); opacity: 0; }
`
const cordSway = keyframes`
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(1.6deg); }
`
const twinkle = keyframes`
  0%, 100% { opacity: .25; }
  50% { opacity: 1; }
`
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

// Task-screen (tts- prefix) one-shot reveals — typing lines, bars growing,
// lines drawing in — plus a continuous travelling beacon. All transform /
// stroke-dashoffset, and all use fill-mode 'both' so a panel parks on
// its finished frame and holds the start state through any delay (no
// flash); reduced motion drops the animation entirely, which
// also lands on the finished frame since no attribute sets a hidden start.
const typeReveal = keyframes`
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
`
const barGrow = keyframes`
  0% { transform: scaleY(0); }
  100% { transform: scaleY(1); }
`
const lineDraw = keyframes`
  0% { stroke-dashoffset: 1; }
  100% { stroke-dashoffset: 0; }
`
const pulseTravel = keyframes`
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -1; }
`

const boxed = { transformBox: 'fill-box', transformOrigin: 'center' }

// Class hooks for the scene (prefix tc- = templar console). Applied via
// `sx` on the root <svg>; screen panels may reuse .tc-pulse / .tc-cursor.
export const sceneSx = {
  '.tc-aura': { ...boxed, animation: `${auraBreathe} 4s ease-in-out infinite` },
  '.tc-figure': { animation: `${hoverBob} 4.5s ease-in-out infinite` },
  '.tc-pulse': { animation: `${pulse} 2.8s ease-in-out infinite` },
  '.tc-arc': {
    strokeDasharray: '5 9',
    animation: `${arcFlow} 1.3s linear infinite`
  },
  '.tc-crackle': { animation: `${crackle} 3.6s linear infinite` },
  '.tc-key': { animation: `${keyPulse} 2.4s ease-in-out infinite` },
  '.tc-sweep': { animation: `${sweep} 5.5s linear infinite` },
  '.tc-mote': { animation: `${moteRise} 8s linear infinite` },
  '.tc-cords': {
    transformBox: 'fill-box',
    transformOrigin: '100% 0%',
    animation: `${cordSway} 5s ease-in-out infinite`
  },
  '.tc-crystal': { animation: `${hoverBob} 6s ease-in-out infinite` },
  '.tc-star': { animation: `${twinkle} 3s ease-in-out infinite` },
  '.tc-cursor': { animation: `${blink} 1.1s steps(2, start) infinite` },
  '.tts-type': {
    transformBox: 'fill-box',
    transformOrigin: '0% 50%',
    animation: `${typeReveal} 0.8s steps(10, end) both`
  },
  '.tts-bar': {
    transformBox: 'fill-box',
    transformOrigin: '50% 100%',
    animation: `${barGrow} 0.9s ease-out both`
  },
  '.tts-line-draw': { animation: `${lineDraw} 1.2s ease-out both` },
  '.tts-pulse-travel': { animation: `${pulseTravel} 1.8s linear infinite` },
  '@media (prefers-reduced-motion: reduce)': {
    '&, & *': { animation: 'none !important' }
  }
}
