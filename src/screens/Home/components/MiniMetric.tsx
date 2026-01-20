import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../ui/colors";
import { typography } from "../ui/typography";
import Ring from "./Ring";

export default function MiniMetric({
  icon,
  value,
  label,
  progress,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  progress: number;
}) {
  return (
    <View style={styles.miniItem}>
      <View style={styles.miniRingWrap}>
        <Ring size={56} stroke={6} progress={progress} gradientId="miniGrad" />
        <View style={styles.miniIconCenter}>{icon}</View>
      </View>

      <Text style={styles.miniValue}>{value}</Text>
      {!!label && <Text style={styles.miniLabel}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  miniItem: {
    alignItems: "center",
  },
  miniRingWrap: {
    width: 56,
    height: 56,
    marginBottom: 8,
  },
  miniIconCenter: {
    position: "absolute",
    inset: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  miniValue: {
    color: "#fff",
    ...typography.miniValue,
    marginTop: 2,
  },
  miniLabel: {
    color: colors.muted2,
    ...typography.miniLabel,
    marginTop: 2,
  },
});
