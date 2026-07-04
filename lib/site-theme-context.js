import { createContext, useContext, useState, useCallback } from 'react'

// Color palettes for each game theme
export const PALETTES = {
  ffix: {
    accent: '#c8a800', // gold
    text: '#f0e6a0', // cream
    panelBg: 'rgba(8, 14, 40, 0.97)',
    muted: '#9890a0',
    jobColor: '#bb77ff',
    headerBg: 'rgba(200,168,0,0.06)',
    headerBorder: '#c8a80044',
    itemBg: 'rgba(200,168,0,0.07)',
    itemBorder: '#c8a80033'
  },
  sc2: {
    accent: '#00bbdd', // protoss cyan
    text: '#c0e8ff', // light cyan
    panelBg: 'rgba(4, 12, 28, 0.97)',
    muted: '#7090a8',
    jobColor: '#00ddff',
    headerBg: 'rgba(0,187,221,0.06)',
    headerBorder: '#00bbdd44',
    itemBg: 'rgba(0,187,221,0.07)',
    itemBorder: '#00bbdd33'
  }
}

// Shared effect colors — single source for Protoss/FFIX glow accents.
// RGB triplets are for rgba() templates, hex for style props.
export const PROTOSS_CYAN = '#00ddff'
export const PROTOSS_CYAN_RGB = '0, 221, 255'
export const PROTOSS_TEAL_RGB = '0, 187, 221'
export const KHALA_GOLD = '#f0c040'
export const KHALA_GOLD_RGB = '240, 192, 64'
export const FFIX_GOLD_RGB = '224, 192, 0'
// Protoss canon frame tokens (#9): gold/bronze chrome, purple-navy bodies
export const PROTOSS_BRONZE = '#8a6d2f'
export const PROTOSS_DEEP_GOLD = '#c89a30'
export const PROTOSS_PANEL_BG = 'rgba(10, 8, 24, 0.97)'
export const PROTOSS_PANEL_RGB = '10, 8, 24'

const SiteThemeContext = createContext({ theme: 'sc2', toggleTheme: () => {} })

export function SiteThemeProvider({ children }) {
  // FFIX theme temporarily hidden (#7) — SC2 is the sole active theme.
  // To re-enable: default back to 'ffix', re-add <GameThemeToggle /> in
  // components/navbar.js, and restore the localStorage preference read:
  //   useEffect(() => {
  //     const stored = localStorage.getItem('siteTheme')
  //     if (stored === 'sc2') setTheme('sc2')
  //   }, [])
  const [theme, setTheme] = useState('sc2')

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'ffix' ? 'sc2' : 'ffix'
      localStorage.setItem('siteTheme', next)
      return next
    })
  }, [])

  return (
    <SiteThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </SiteThemeContext.Provider>
  )
}

export function useSiteTheme() {
  const ctx = useContext(SiteThemeContext)
  return { ...ctx, palette: PALETTES[ctx.theme] }
}
