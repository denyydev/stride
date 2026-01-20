export type Range = "DAY" | "WEEK" | "MONTH";

export type MiniMetricKey = "kcal" | "km" | "time";

export type MiniMetric = {
  key: MiniMetricKey;
  value: string;
  label: string;
  progress: number; // 0..1
};

export type HomeMock = {
  date: string;
  steps: number;
  goal: number;
  metrics: MiniMetric[];
  charts: Record<Range, number[]>;
};
