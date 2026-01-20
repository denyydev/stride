import { AppProviders } from "@/core/providers/AppProviders";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack screenOptions={{ headerShown: false }} />
    </AppProviders>
  );
}
