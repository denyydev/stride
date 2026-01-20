import {
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";

SplashScreen.preventAutoHideAsync().catch(() => {});

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [loaded] = useFonts({
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded]);

  if (!loaded) return null;

  return <>{children}</>;
}
