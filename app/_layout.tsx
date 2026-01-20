import { AppProviders } from "@/core/providers/AppProviders";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AppProviders>
  );
}
