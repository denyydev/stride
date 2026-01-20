import { useTheme } from "@/core/theme/ThemeProvider";
import { storage, STORAGE_KEYS } from "@/shared/lib/storage";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Screen } from "@/shared/ui/Screen";
import { Text } from "@/shared/ui/Text";
import { router } from "expo-router";
import { View } from "react-native";

export function SettingsScreen() {
  const { mode, setMode } = useTheme();

  const cycleTheme = () => {
    if (mode === "light") setMode("dark");
    else if (mode === "dark") setMode("system");
    else setMode("light");
  };

  const handleResetOnboarding = async () => {
    await storage.removeItem(STORAGE_KEYS.HAS_ONBOARDED);
    router.replace("/onboarding");
  };

  const themeLabel =
    mode === "system"
      ? "Theme: System"
      : mode === "light"
        ? "Theme: Light"
        : "Theme: Dark";

  return (
    <Screen>
      <Text variant="h1">Settings</Text>

      <View style={{ marginTop: 24, gap: 16 }}>
        <Card>
          <Text variant="title">Theme</Text>
          <Text variant="body" color="textSecondary" style={{ marginTop: 8 }}>
            Choose how Step Pulse looks.
          </Text>
          <View style={{ marginTop: 16 }}>
            <Button label={themeLabel} onPress={cycleTheme} />
          </View>
        </Card>

        <Card>
          <Text variant="title">Onboarding</Text>
          <Text variant="body" color="textSecondary" style={{ marginTop: 8 }}>
            Reset the intro flow and see onboarding again.
          </Text>
          <View style={{ marginTop: 16 }}>
            <Button label="Reset onboarding" onPress={handleResetOnboarding} />
          </View>
        </Card>
      </View>
    </Screen>
  );
}
