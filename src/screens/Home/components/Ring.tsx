import React, { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { colors } from "../ui/colors";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function Ring({
  size,
  stroke,
  progress,
  gradientId = "accentGrad",
}: {
  size: number;
  stroke: number;
  progress: number; // 0..1
  gradientId?: string;
}) {
  const p = Math.max(0, Math.min(1, progress));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;

  const t = useSharedValue(0);

  useEffect(() => {
    t.value = 0;
    t.value = withTiming(p, {
      duration: 900,
      easing: Easing.out(Easing.cubic),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p]);

  const animatedProps = useAnimatedProps(() => {
    return { strokeDashoffset: c * (1 - t.value) } as any;
  });

  return (
    <Svg width={size} height={size}>
      <Defs>
        <LinearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={colors.accentDark} />
          <Stop offset="1" stopColor={colors.accentLight} />
        </LinearGradient>
      </Defs>

      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={colors.track}
        strokeWidth={stroke}
        fill="transparent"
        strokeLinecap="round"
      />

      <AnimatedCircle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={`url(#${gradientId})`}
        strokeWidth={stroke}
        fill="transparent"
        strokeLinecap="round"
        strokeDasharray={`${c} ${c}`}
        animatedProps={animatedProps}
        rotation={-90}
        originX={size / 2}
        originY={size / 2}
      />
    </Svg>
  );
}
