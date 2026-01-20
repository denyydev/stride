import { Screen } from '@/shared/ui/Screen'
import { Text } from '@/shared/ui/Text'
import { Card } from '@/shared/ui/Card'

export function GoalsScreen() {
  return (
    <Screen>
      <Text variant="h1">Goals</Text>
      <Card style={{ marginTop: 24 }}>
        <Text variant="body" color="textSecondary">
          Set your daily step targets and adjust them as your routine evolves.
        </Text>
      </Card>
    </Screen>
  )
}


