import type { HomeMock } from "./types";

export const mockHome: HomeMock = {
  date: "17 June 2017",
  steps: 8212,
  goal: 10000,
  metrics: [
    { key: "kcal", value: "383", label: "KCAL", progress: 383 / 600 },
    { key: "km", value: "6.1", label: "KM", progress: 6.1 / 10 },
    { key: "time", value: "1:50 H", label: "", progress: 0.55 },
  ],
  charts: {
    DAY: [0.35, 0.32, 0.38, 0.45, 0.52, 0.46, 0.4],
    WEEK: [0.4, 0.35, 0.55, 0.62, 0.5, 0.3, 0.38],
    MONTH: [0.22, 0.22, 0.22, 0.22, 0.22, 0.25, 0.78],
  },
};
