import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type SafeAreaViewProps = {
  children: React.ReactNode;
  style?: object;
};

export const SafeAreaView: React.FC<SafeAreaViewProps> = ({
  children,
  style,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
        style,
      ]}
    >
      <StatusBar barStyle="default" translucent backgroundColor="transparent" />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
