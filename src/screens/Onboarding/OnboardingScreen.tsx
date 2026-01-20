import { View } from 'react-native'
import { router } from 'expo-router'
import { Screen } from '@/shared/ui/Screen'
import { Text } from '@/shared/ui/Text'
import { Card } from '@/shared/ui/Card'
import { Button } from '@/shared/ui/Button'
import { storage, STORAGE_KEYS } from '@/shared/lib/storage'

export function OnboardingScreen() {
  const handleContinue = async () => {
    await storage.setItem(STORAGE_KEYS.HAS_ONBOARDED, true)
    router.replace('/(tabs)/home')
  }

  return (
    <Screen>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <View>
          <Text variant="h1">Welcome to Step Pulse</Text>
          <Text variant="body" color="textSecondary" style={{ marginTop: 8 }}>
            Track your daily steps, follow your goals and see your progress over time.
          </Text>
        </View>

        <Card
          style={{
            marginTop: 24,
          }}
        >
          <Text variant="title">Stay consistent</Text>
          <Text variant="body" color="textSecondary" style={{ marginTop: 8 }}>
            Set a daily step goal and let Step Pulse help you build a healthy routine.
          </Text>
        </Card>

        <View
          style={{
            marginTop: 'auto',
          }}
        >
          <Button label="Continue" onPress={handleContinue} />
        </View>
      </View>
    </Screen>
  )
}


