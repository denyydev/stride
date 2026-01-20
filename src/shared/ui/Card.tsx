import { useTheme } from "@/core/theme/ThemeProvider";
import { View, ViewProps } from "react-native";

type Props = ViewProps;

export function Card({ style, ...rest }: Props) {
  const { colors, spacing } = useTheme();

  return (
    <View
      {...rest}
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: 16,
          padding: spacing.lg,
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
    />
  );
}
