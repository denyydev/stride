import { Flame, Route, Timer } from "lucide-react-native";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import type { MiniMetric as MiniMetricType } from "../model/types";
import { colors } from "../ui/colors";
import MiniMetric from "./MiniMetric";

const { width } = Dimensions.get("window");

export default function MiniMetrics({
  metrics,
}: {
  metrics: MiniMetricType[];
}) {
  // icon mapping by key
  const iconFor = (key: MiniMetricType["key"]) => {
    switch (key) {
      case "kcal":
        return <Flame size={18} color={colors.accentDark} />;
      case "km":
        return <Route size={18} color={colors.accentDark} />;
      case "time":
        return <Timer size={18} color={colors.accentDark} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.row}>
      {metrics.map((m) => (
        <View key={m.key} style={styles.itemWrap}>
          <MiniMetric
            icon={iconFor(m.key)}
            value={m.value}
            label={m.label}
            progress={m.progress}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    paddingHorizontal: 6,
  },
  itemWrap: {
    width: (width - 32) / 3,
    alignItems: "center",
  },
});
