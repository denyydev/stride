import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { BarChart3, Home, Settings, Target, User } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/* ===== COLORS ===== */
const ACTIVE = "#00D5FF"; // neon cyan
const INACTIVE = "rgba(255,255,255,0.45)";
const LABEL_INACTIVE = "rgba(255,255,255,0.55)";

const ICON_SIZE = 22;

/* ===== ICON MAP ===== */
const ICONS: Record<string, React.ComponentType<any>> = {
  index: Home,
  history: BarChart3,
  goals: Target,
  profile: User,
  settings: Settings,
};

/* ===== CUSTOM TAB BAR ===== */
function PremiumTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = useState(0);
  const indicatorX = useRef(new Animated.Value(0)).current;

  const tabCount = state.routes.length;

  useEffect(() => {
    if (!barWidth || tabCount === 0) return;

    const tabWidth = barWidth / tabCount;
    const indicatorWidth = tabWidth * 0.28;
    const offset = tabWidth * state.index + (tabWidth - indicatorWidth) / 2;

    Animated.timing(indicatorX, {
      toValue: offset,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [state.index, barWidth, tabCount]);

  const paddingBottom =
    Platform.OS === "ios" ? Math.max(insets.bottom - 4, 10) : 10;

  return (
    <View
      pointerEvents="box-none"
      style={[styles.rootContainer, { paddingBottom }]}
    >
      <BlurView
        intensity={Platform.OS === "ios" ? 28 : 18}
        tint="dark"
        style={styles.blurWrapper}
      >
        <View
          style={styles.barContainer}
          onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
        >
          {/* Dark glass layer */}
          <View style={styles.materialLayer} />

          {/* Active indicator */}
          {barWidth > 0 && (
            <Animated.View
              pointerEvents="none"
              style={[
                styles.indicator,
                {
                  width: (barWidth / tabCount) * 0.28,
                  transform: [{ translateX: indicatorX }],
                },
              ]}
            />
          )}

          {/* Tabs */}
          <View style={styles.tabsRow}>
            {state.routes.map((route, index) => {
              const isFocused = state.index === index;
              const { options } = descriptors[route.key];

              const label = options.tabBarLabel ?? options.title ?? route.name;

              const Icon = ICONS[route.name] ?? Home;

              const onPress = () => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              return (
                <Pressable
                  key={route.key}
                  onPress={onPress}
                  style={({ pressed }) => [
                    styles.tabItem,
                    pressed && styles.tabItemPressed,
                  ]}
                >
                  <Icon
                    size={ICON_SIZE + (isFocused ? 2 : 0)}
                    color={isFocused ? ACTIVE : INACTIVE}
                    strokeWidth={isFocused ? 2.4 : 2.0}
                  />
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.tabLabel,
                      isFocused
                        ? styles.tabLabelActive
                        : styles.tabLabelInactive,
                    ]}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </BlurView>
    </View>
  );
}

/* ===== TABS LAYOUT ===== */
export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <PremiumTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: "Сегодня" }} />
      <Tabs.Screen name="history" options={{ title: "История" }} />
      <Tabs.Screen name="goals" options={{ title: "Цель" }} />
      <Tabs.Screen name="profile" options={{ title: "Профиль" }} />
      <Tabs.Screen name="settings" options={{ title: "Настройки" }} />
    </Tabs>
  );
}

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  rootContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },

  blurWrapper: {
    width: "100%",
    paddingHorizontal: 16,
  },

  barContainer: {
    borderRadius: 28,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.45,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 18 },
    elevation: 20,
  },

  materialLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor:
      Platform.OS === "ios" ? "rgba(8,10,12,0.55)" : "rgba(8,10,12,0.92)",

    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
  },

  tabsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    paddingTop: 12,
    paddingBottom: 14,
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    gap: 4,
  },

  tabItemPressed: {
    opacity: 0.85,
  },

  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.6,
  },

  tabLabelActive: {
    color: ACTIVE,
  },

  tabLabelInactive: {
    color: LABEL_INACTIVE,
  },

  indicator: {
    position: "absolute",
    bottom: 8,
    height: 2,
    borderRadius: 999,
    backgroundColor: ACTIVE,
    opacity: 0.95,

    shadowColor: ACTIVE,
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
});
