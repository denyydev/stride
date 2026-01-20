import { useTheme } from "@/core/theme/ThemeProvider";
import { View, ViewProps } from "react-native";

type Props = ViewProps & {
  rounded?: boolean;
};

export function Skeleton({ style, rounded = false, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <View
      {...rest}
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: rounded ? 999 : 12,
          overflow: "hidden",
        },
        style,
      ]}
    />
  );
}
