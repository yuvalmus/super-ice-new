import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const LoadingState = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#21a7fd" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingState;
