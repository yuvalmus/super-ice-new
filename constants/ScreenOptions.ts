import { Platform } from "react-native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const screenOptions: NativeStackNavigationOptions =
  Platform.select({
    android: {
      headerShown: false,
    },
    ios: {
      headerBackTitleVisible: false,
      headerTitle: "",
    },
  }) || {};
