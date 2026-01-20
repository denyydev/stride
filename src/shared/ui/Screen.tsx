import { useTheme } from "@/core/theme/ThemeProvider";
import { ReactNode } from "react";
import { View } from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

type Props = SafeAreaViewProps & {
  children: ReactNode;
};

export function Screen({ children, style, ...rest }: Props) {
  const { colors, spacing } = useTheme();

  return (
    <SafeAreaView
      {...rest}
      style={[
        {
          flex: 1,
          backgroundColor: colors.background,
        },
        style,
      ]}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.lg,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  );
}
