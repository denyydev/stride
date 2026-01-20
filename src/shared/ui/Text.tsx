import { useTheme } from "@/core/theme/ThemeProvider";
import { Text as RNText, TextProps as RNTextProps } from "react-native";

type Variant = "h1" | "title" | "body" | "bodyBold" | "caption";
type Color = "text" | "textSecondary" | "primary";

type Props = RNTextProps & {
  variant?: Variant;
  color?: Color;
};

export function Text({
  variant = "body",
  color = "text",
  style,
  ...rest
}: Props) {
  const { colors, typography } = useTheme();

  const baseStyle =
    variant === "h1"
      ? typography.h1
      : variant === "title"
        ? typography.title
        : variant === "bodyBold"
          ? typography.bodyBold
          : variant === "caption"
            ? typography.caption
            : typography.body;

  const colorValue =
    color === "primary"
      ? colors.primary
      : color === "textSecondary"
        ? colors.textSecondary
        : colors.text;

  return <RNText {...rest} style={[baseStyle, { color: colorValue }, style]} />;
}
