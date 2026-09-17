import { keyframes } from '@emotion/react'

// Phase-smith banner: one-off SVG gradient stops that have no site token.
// Kept few and named here so no raw hex leaks into the scene files.
export const SCENE_HEX = {
  space: '#05080f', // body bg (theme.js)
  spaceTop: '#0b1232',
  nebula: '#2a1f66',
  suitLit: '#2f2c6c', // navy under-suit + tabard
  suit: '#1b1740',
  suitDeep: '#0b0a1e',
  cord: '#221d48', // nerve cords, sleeve shadow edge
  cordLit: '#3d3778',
  skin: '#4a5578', // protoss grey-blue
  skinLit: '#8ea0c4',
  raisedTop: '#224076', // mirrors PROTOSS_NAVY_RAISED stops
  raisedBottom: '#0a142d'
}

// Every loop below animates opacity / transform / stroke-dashoffset only
// (brief §5). `sceneSx` kills all of them under prefers-reduced-motion, so
// each element's static attribute state must already be a finished frame.
const hoverBob = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`
const pulse = keyframes`
  0%, 100% { opacity: .5; }
  50% { opacity: 1; }
`
// Steady phase beam: only the dashed flow line travels along the beam
const beamFlow = keyframes`
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -28; }
`
const sparkFlicker = keyframes`
  0%, 30%, 100% { opacity: 0; }
  5% { opacity: 1; }
  12% { opacity: .2; }
  18% { opacity: .8; }
`
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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

// Class hooks for the scene (prefix tc- = the console scene). Applied via
// `sx` on the root <svg>; screen panels may reuse .tc-pulse / .tc-cursor.
export const sceneSx = {
  '.tc-figure': { animation: `${hoverBob} 4.5s ease-in-out infinite` },
  '.tc-drone': { animation: `${hoverBob} 3.2s ease-in-out -1.1s infinite` },
  '.tc-pulse': { animation: `${pulse} 2.8s ease-in-out infinite` },
  '.tc-beam': {
    strokeDasharray: '4 10',
    animation: `${beamFlow} 0.9s linear infinite`
  },
  '.tc-spark': { animation: `${sparkFlicker} 2.4s linear infinite` },
  '.tc-schematic': { ...boxed, animation: `${spin} 14s linear infinite` },
  '.tc-key': { animation: `${keyPulse} 2.4s ease-in-out infinite` },
  '.tc-sweep': { animation: `${sweep} 5.5s linear infinite` },
  '.tc-mote': { animation: `${moteRise} 8s linear infinite` },
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
  // Off-screen: freeze every loop in place (set by PhaseSmithConsoleScene)
  '&[data-paused] *': { animationPlayState: 'paused !important' },
  '@media (prefers-reduced-motion: reduce)': {
    '&, & *': { animation: 'none !important' }
  }
}
