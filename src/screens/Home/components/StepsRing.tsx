import { PersonStanding } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../ui/colors";
import { typography } from "../ui/typography";
import Ring from "./Ring";

function formatInt(n: number) {
  return n.toLocaleString("en-US");
}

export default function StepsRing({
  steps,
  goal,
}: {
  steps: number;
  goal: number;
}) {
  const progress = steps / Math.max(goal, 1);
  const ringSize = 260;
  const ringStroke = 14;

  return (
    <View style={styles.ringBlock}>
      <View style={{ width: ringSize, height: ringSize }}>
        <Ring
          size={ringSize}
          stroke={ringStroke}
          progress={progress}
          gradientId="accentGrad"
        />

        <View style={styles.ringCenter}>
          <PersonStanding size={28} color="#FFFFFF" opacity={0.92} />
          <Text style={styles.stepsText}>{formatInt(steps)}</Text>
          <Text style={styles.goalText}>
            GOAL <Text style={styles.goalNumber}>{formatInt(goal)}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ringBlock: {
    alignItems: "center",
    marginTop: 6,
  },
  ringCenter: {
    position: "absolute",
    inset: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  stepsText: {
    color: "#FFFFFF",
    ...typography.steps,
  },
  goalText: {
    color: colors.muted2,
    ...typography.goal,
  },
  goalNumber: {
    color: colors.muted,
    fontFamily: typography.goal.fontFamily,
    letterSpacing: 0.4,
  },
});
