import React, { useEffect, useMemo } from "react";
import { Dimensions, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import { colors } from "../ui/colors";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const { width } = Dimensions.get("window");

function calcPolylineLength(pts: { x: number; y: number }[]) {
  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x;
    const dy = pts[i].y - pts[i - 1].y;
    len += Math.sqrt(dx * dx + dy * dy);
  }
  return len;
}

export default function LineChart({
  points,
  playKey,
  labels,
}: {
  points: number[];
  playKey: string;
  labels?: string[]; // например ["M","T","W","T","F","S","S"]
}) {
  const w = width - 32;
  const h = 120; // чуть выше, чтобы влезли лейблы
  const padX = 8;
  const padY = 16;

  // “площадь графика” (без зоны лейблов)
  const labelZone = 18;
  const plotH = h - labelZone;

  const pts = useMemo(() => {
    const n = points.length;
    return points.map((v, i) => {
      const x = padX + (i * (w - padX * 2)) / Math.max(1, n - 1);
      const y = padY + (1 - v) * (plotH - padY * 2);
      return { x, y };
    });
  }, [points, w, plotH]);

  const d = useMemo(() => {
    if (pts.length === 0) return "";
    return pts
      .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
      .join(" ");
  }, [pts]);

  const length = useMemo(() => Math.max(1, calcPolylineLength(pts)), [pts]);

  const t = useSharedValue(0);
  useEffect(() => {
    t.value = 0;
    t.value = withTiming(1, {
      duration: 850,
      easing: Easing.out(Easing.cubic),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playKey]);

  const lineAnimatedProps = useAnimatedProps(() => {
    return { strokeDashoffset: length * (1 - t.value) } as any;
  });

  // дефолтные лейблы на 7 дней, если не передали
  const fallbackLabels = useMemo(() => {
    const base = ["M", "T", "W", "T", "F", "S", "S"];
    if (pts.length === 7) return base;
    // если другое кол-во — просто 1..N
    return Array.from({ length: pts.length }, (_, i) => String(i + 1));
  }, [pts.length]);

  const dayLabels =
    labels && labels.length === pts.length ? labels : fallbackLabels;

  // Grid
  const gridColor = "rgba(255,255,255,0.06)";
  const gridColorStrong = "rgba(255,255,255,0.08)";

  return (
    <View style={{ marginTop: 10 }}>
      <Svg width={w} height={h}>
        <Defs>
          <LinearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={colors.accentDark} />
            <Stop offset="1" stopColor={colors.accentLight} />
          </LinearGradient>
        </Defs>

        {/* ===== “calendar” background ===== */}

        {/* horizontal levels (3 линии) */}
        <Path
          d={`M ${padX} ${padY} L ${w - padX} ${padY}`}
          stroke={gridColor}
          strokeWidth={1}
        />
        <Path
          d={`M ${padX} ${plotH / 2} L ${w - padX} ${plotH / 2}`}
          stroke={gridColorStrong}
          strokeWidth={1}
        />
        <Path
          d={`M ${padX} ${plotH - padY} L ${w - padX} ${plotH - padY}`}
          stroke={gridColor}
          strokeWidth={1}
        />

        {/* vertical day separators (по каждой точке) */}
        {pts.map((p, idx) => (
          <Path
            key={`v-${idx}`}
            d={`M ${p.x} ${padY} L ${p.x} ${plotH - padY}`}
            stroke={gridColor}
            strokeWidth={1}
            strokeDasharray="2 6"
          />
        ))}

        {/* baseline (низ графика) */}
        <Path
          d={`M 0 ${plotH - 1} L ${w} ${plotH - 1}`}
          stroke="rgba(255,255,255,0.10)"
          strokeWidth={1}
        />

        {/* ===== main line ===== */}
        <AnimatedPath
          d={d}
          stroke="url(#lineGrad)"
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${length} ${length}`}
          animatedProps={lineAnimatedProps}
        />

        {/* points */}
        {pts.map((p, idx) => (
          <Circle
            key={`pt-${idx}`}
            cx={p.x}
            cy={p.y}
            r={5}
            fill="#FFFFFF"
            opacity={0.92}
          />
        ))}

        {/* ===== labels under chart ===== */}
        {pts.map((p, idx) => (
          <SvgText
            key={`lbl-${idx}`}
            x={p.x}
            y={plotH + 14}
            fill="rgba(255,255,255,0.55)"
            fontSize={11}
            fontFamily="Inter_600SemiBold"
            textAnchor="middle"
          >
            {dayLabels[idx]}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}
