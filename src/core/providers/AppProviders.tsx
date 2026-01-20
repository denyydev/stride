import { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../theme/ThemeProvider";

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  return (
    <SafeAreaProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SafeAreaProvider>
  );
}
