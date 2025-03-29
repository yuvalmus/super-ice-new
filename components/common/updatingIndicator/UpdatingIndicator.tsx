import { ScreenWidth } from "@/constants/Dimensions";
import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

interface UpdatingIndicatorProps {
  isVisible: boolean;
}

const UpdatingIndicator = (props: UpdatingIndicatorProps) => {
  if (!props.isVisible) return null;

  return (
    <View style={styles.updatingIndicator}>
      <ActivityIndicator size="small" color="white" />
      <Text style={styles.updatingText}>מעדכן...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  updatingIndicator: {
    position: "absolute",
    top: 0,
    right: ScreenWidth * 0.35,
    backgroundColor: "rgba(33, 167, 253, 0.7)",
    padding: ScreenWidth * 0.02,
    borderRadius: 20,
    zIndex: 1000,
    flexDirection: "row",
    alignItems: "center",
  },
  updatingText: {
    color: "white",
    marginHorizontal: ScreenWidth * 0.01,
    fontSize: ScreenWidth * 0.035,
    fontWeight: "bold",
  },
});

export default UpdatingIndicator;
