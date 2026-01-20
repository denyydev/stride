import { useTheme } from "@/core/theme/ThemeProvider";
import { impactLight } from "@/shared/lib/haptics";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Text } from "./Text";

type Props = PressableProps & {
  label: string;
  loading?: boolean;
};

export function Button({
  label,
  loading,
  style,
  onPress,
  disabled,
  ...rest
}: Props) {
  const { colors, spacing, typography } = useTheme();

  const handlePress: PressableProps["onPress"] = (event) => {
    if (disabled || loading) return;
    impactLight();
    onPress?.(event);
  };

  const baseStyle: ViewStyle = {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.sm,
    opacity: disabled || loading ? 0.7 : 1,
  };

  const labelStyle: TextStyle = {
    ...(typography.bodyBold as TextStyle),
    color: "#FFFFFF",
  };

  return (
    <Pressable
      {...rest}
      disabled={disabled || loading}
      onPress={handlePress}
      style={({ pressed }) => [
        baseStyle,
        pressed && { transform: [{ scale: 0.98 }] },
        typeof style === "function" ? style({ pressed }) : style,
      ]}
    >
      <Text style={labelStyle}>{label}</Text>
      {loading && <ActivityIndicator color="#FFFFFF" />}
    </Pressable>
  );
}
