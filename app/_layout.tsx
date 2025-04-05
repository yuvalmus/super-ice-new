import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { I18nManager } from "react-native";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { AlertProvider } from "@/contexts/AlertContext";

import { useColorScheme } from "@/hooks/useColorScheme";
import { screenOptions } from "@/constants/ScreenOptions";
import { AuthProvider } from "@/contexts/AuthContext";
import { getUserProfile } from "@/utils/Auth/authStorage";
import { User } from "@/models/User";

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);
// Keep the splash screen visible until app loads
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const [initialUser, setInitialUser] = useState<User | null>(null);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Load user from storage
        console.log("Loading user from storage during app initialization");
        const storedUser = await getUserProfile();

        if (storedUser) {
          console.log("Found stored user, setting as initial user");
          const user = storedUser as User;

          setInitialUser(user);
        } else {
          console.log("No stored user found");
        }

        setAppIsReady(true);
      } catch (error) {
        console.warn("Error during app initialization:", error);
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <AuthProvider initialUser={initialUser}>
      <AlertProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={screenOptions} />
            <Stack.Screen name="login" options={screenOptions} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </AlertProvider>
    </AuthProvider>
  );
}
