import { Settings, Share2 } from "lucide-react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../ui/colors";
import { typography } from "../ui/typography";

export default function TopBar({ date }: { date: string }) {
  return (
    <View style={styles.topBar}>
      <Pressable style={styles.topIconBtn}>
        <Settings size={22} color={colors.accentDark} />
      </Pressable>

      <Text style={styles.dateText}>{date}</Text>

      <Pressable style={styles.topIconBtn}>
        <Share2 size={22} color={colors.accentDark} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 12,
  },
  topIconBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    color: "#fff",
    opacity: 0.92,
    ...typography.date,
  },
});
