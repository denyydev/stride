import { Screen } from '@/shared/ui/Screen'
import { Text } from '@/shared/ui/Text'
import { Card } from '@/shared/ui/Card'

export function HomeScreen() {
  return (
    <Screen>
      <Text variant="h1">Today</Text>
      <Card style={{ marginTop: 24 }}>
        <Text variant="body" color="textSecondary">
          Your steps for today will appear here.
        </Text>
      </Card>
    </Screen>
  )
}

