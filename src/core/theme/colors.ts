export type ThemeMode = 'light' | 'dark' | 'system'

export type ThemeColors = {
  background: string
  text: string
  textSecondary: string
  card: string
  border: string
  primary: string
}

export const lightColors: ThemeColors = {
  background: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  card: '#F9FAFB',
  border: '#E5E7EB',
  primary: '#2563EB',
}

export const darkColors: ThemeColors = {
  background: '#020617',
  text: '#F9FAFB',
  textSecondary: '#9CA3AF',
  card: '#020617',
  border: '#1F2937',
  primary: '#60A5FA',
}


