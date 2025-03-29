import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";

const EmptyOrdersList = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>עוד לא שויכו הזמנות לקו החלוקה</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: ScreenHeight * 0.02,
  },
  emptyText: {
    fontSize: ScreenWidth * 0.04,
    color: "#666",
  },
});

export default EmptyOrdersList;
