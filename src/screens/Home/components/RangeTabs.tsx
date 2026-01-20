import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Range } from "../model/types";
import { colors } from "../ui/colors";
import { typography } from "../ui/typography";

export default function RangeTabs({
  value,
  onChange,
}: {
  value: Range;
  onChange: (v: Range) => void;
}) {
  const items: Range[] = ["DAY", "WEEK", "MONTH"];

  return (
    <View style={styles.segment}>
      {items.map((k) => {
        const active = value === k;
        return (
          <Pressable
            key={k}
            onPress={() => onChange(k)}
            style={[styles.segmentItem, active && styles.segmentItemActive]}
          >
            <Text
              style={[styles.segmentText, active && styles.segmentTextActive]}
            >
              {k}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  segment: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
  },
  segmentItem: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "transparent",
  },
  segmentItemActive: {
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  segmentText: {
    color: colors.muted2,
    ...typography.segment,
  },
  segmentTextActive: {
    color: "#FFFFFF",
    opacity: 0.95,
  },
});
