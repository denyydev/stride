import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import LineChart from "./components/LineChart";
import MiniMetrics from "./components/MiniMetrics";
import RangeTabs from "./components/RangeTabs";
import StepsRing from "./components/StepsRing";
import TopBar from "./components/TopBar";

import { mockHome } from "./model/mock";
import type { Range } from "./model/types";
import { colors } from "./ui/colors";

// под твой плавающий таббар (из (tabs)/_layout.tsx)
const FLOATING_TABBAR_HEIGHT = 84;
// высота area под RangeTabs
const RANGE_TABS_BLOCK = 56;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const [range, setRange] = useState<Range>("WEEK");
  const data = mockHome;

  const chartPoints = useMemo(() => data.charts[range], [data.charts, range]);

  // RangeTabs прибиваем над таббаром
  const rangeTabsBottom = insets.bottom + FLOATING_TABBAR_HEIGHT + 10;

  return (
    <View style={styles.screen}>
      {/* Верх с учетом safe area */}
      <View style={{ paddingTop: insets.top + 6, paddingHorizontal: 16 }}>
        <TopBar date={data.date} />
      </View>

      {/* Основной контент. Важно: paddingBottom чтобы не уехать под RangeTabs/TabBar */}
      <View
        style={[
          styles.content,
          {
            paddingBottom: rangeTabsBottom + RANGE_TABS_BLOCK + 10,
            paddingHorizontal: 16,
          },
        ]}
      >
        <StepsRing steps={data.steps} goal={data.goal} />

        <MiniMetrics metrics={data.metrics} />

        <View style={styles.chartBlock}>
          <LineChart points={chartPoints} playKey={range} />
        </View>
      </View>

      {/* RangeTabs sticky над таббаром */}
      <View style={[styles.stickyRangeTabs, { bottom: rangeTabsBottom }]}>
        <RangeTabs value={range} onChange={setRange} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  content: {
    flex: 1,
    alignItems: "stretch",
  },

  chartBlock: {
    marginTop: 14,
    paddingTop: 6,
  },

  stickyRangeTabs: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
