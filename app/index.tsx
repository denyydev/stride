import { storage, STORAGE_KEYS } from "@/shared/lib/storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const value = await storage.getItem<boolean>(STORAGE_KEYS.HAS_ONBOARDED);
      const hasOnboarded = value ?? false;
      if (cancelled) return;

      router.replace(hasOnboarded ? "/(tabs)/home" : "/onboarding");
    };

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
}
