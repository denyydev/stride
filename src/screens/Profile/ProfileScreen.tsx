import { Card } from "@/shared/ui/Card";
import { Screen } from "@/shared/ui/Screen";
import { Text } from "@/shared/ui/Text";

export function ProfileScreen() {
  return (
    <Screen>
      <Text variant="h1">Profile</Text>
      <Card style={{ marginTop: 24 }}>
        <Text variant="body" color="textSecondary">
          Your step profile will appear here. Come back after a few walks.
        </Text>
      </Card>
    </Screen>
  );
}
