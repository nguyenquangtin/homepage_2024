import { createContext, useContext, useState, useEffect, useCallback } from 'react'

// Color palettes for each game theme
export const PALETTES = {
  ffix: {
    accent: '#c8a800',    // gold
    text: '#f0e6a0',      // cream
    panelBg: 'rgba(8, 14, 40, 0.97)',
    muted: '#9890a0',
    jobColor: '#bb77ff',
    headerBg: 'rgba(200,168,0,0.06)',
    headerBorder: '#c8a80044',
    itemBg: 'rgba(200,168,0,0.07)',
    itemBorder: '#c8a80033',
  },
  sc2: {
    accent: '#00bbdd',    // protoss cyan
    text: '#c0e8ff',      // light cyan
    panelBg: 'rgba(4, 12, 28, 0.97)',
    muted: '#7090a8',
    jobColor: '#00ddff',
    headerBg: 'rgba(0,187,221,0.06)',
    headerBorder: '#00bbdd44',
    itemBg: 'rgba(0,187,221,0.07)',
    itemBorder: '#00bbdd33',
  },
}

const SiteThemeContext = createContext({ theme: 'ffix', toggleTheme: () => {} })

export function SiteThemeProvider({ children }) {
  const [theme, setTheme] = useState('ffix')

  useEffect(() => {
    const stored = localStorage.getItem('siteTheme')
    if (stored === 'sc2') setTheme('sc2')
  }, [])

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
