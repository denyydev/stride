import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'
import { storage, STORAGE_KEYS } from '@/shared/lib/storage'
import { darkColors, lightColors, ThemeColors, ThemeMode } from './colors'
import { spacing, SpacingScale } from './spacing'
import { typography, Typography } from './typography'

type ThemeContextValue = {
  mode: ThemeMode
  resolvedMode: Exclude<ThemeMode, 'system'>
  colors: ThemeColors
  spacing: SpacingScale
  typography: Typography
  setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

type Props = {
  children: React.ReactNode
}

export function ThemeProvider({ children }: Props) {
  const systemScheme = useColorScheme()
  const [mode, setModeState] = useState<ThemeMode>('system')

  useEffect(() => {
    storage
      .getItem<ThemeMode>(STORAGE_KEYS.THEME)
      .then(saved => {
        if (saved === 'light' || saved === 'dark' || saved === 'system') {
          setModeState(saved)
        }
      })
      .catch(() => {})
  }, [])

  const resolvedMode: Exclude<ThemeMode, 'system'> =
    mode === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : mode

  const colors = resolvedMode === 'dark' ? darkColors : lightColors

  const setMode = (next: ThemeMode) => {
    setModeState(next)
    storage.setItem(STORAGE_KEYS.THEME, next)
  }

  const value = useMemo(
    () => ({
      mode,
      resolvedMode,
      colors,
      spacing,
      typography,
      setMode,
    }),
    [mode, resolvedMode, colors]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  const { colors, spacing, typography } = ctx
  return { colors, spacing, typography, mode: ctx.mode, resolvedMode: ctx.resolvedMode, setMode: ctx.setMode }
}


