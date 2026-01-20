import AsyncStorage from '@react-native-async-storage/async-storage'

export const STORAGE_KEYS = {
  HAS_ONBOARDED: 'HAS_ONBOARDED',
  STEPS_GOAL: 'STEPS_GOAL',
  UNITS: 'UNITS',
  THEME: 'THEME',
} as const

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS]

async function getItem<T>(key: StorageKey): Promise<T | null> {
  const value = await AsyncStorage.getItem(key)
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

async function setItem(key: StorageKey, value: unknown): Promise<void> {
  const serialized = JSON.stringify(value)
  await AsyncStorage.setItem(key, serialized)
}

async function removeItem(key: StorageKey): Promise<void> {
  await AsyncStorage.removeItem(key)
}

export const storage = {
  getItem,
  setItem,
  removeItem,
}


