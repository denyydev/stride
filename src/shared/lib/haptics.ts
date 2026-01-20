import * as Haptics from 'expo-haptics'

export async function impactLight() {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
}

export async function impactMedium() {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
}

export async function selection() {
  await Haptics.selectionAsync()
}


