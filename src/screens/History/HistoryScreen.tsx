import { Screen } from '@/shared/ui/Screen'
import { Text } from '@/shared/ui/Text'
import { Card } from '@/shared/ui/Card'

export function HistoryScreen() {
  return (
    <Screen>
      <Text variant="h1">History</Text>
      <Card style={{ marginTop: 24 }}>
        <Text variant="body" color="textSecondary">
          Your step history will appear here. Come back after a few walks.
        </Text>
      </Card>
    </Screen>
  )
}


