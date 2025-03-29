import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { ScreenWidth, ScreenHeight } from "@/constants/Dimensions";
import SelectDistributionLineModal from "./SelectDistributionLineModal";

const StartDistributionLine = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setIsModalVisible(true)}
    >
      <Text style={styles.title}>התחל קו חלוקה</Text>
      <SelectDistributionLineModal
        isVisible={isModalVisible}
        onSelect={(selectedLineIds: number[]) => {
          // TODO: set the selected line as the active line for the driver
        }}
        onClose={() => setIsModalVisible(false)}
      />
    </TouchableOpacity>
  );
};

export default StartDistributionLine;

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth * 0.85,
    flexDirection: "column",
    backgroundColor: "#F5F5F5",
    borderRadius: 30,
    marginTop: ScreenHeight * 0.02,
    alignItems: "center",
    paddingVertical: ScreenHeight * 0.015,
    alignSelf: "center",
    borderColor: "#21a7fd",
    borderWidth: 3,
    borderStyle: "dotted",
    marginBottom: ScreenHeight * 0.02,
  },
  title: {
    fontSize: ScreenWidth * 0.05,
    fontWeight: "bold",
    color: "#001B61",
  },
});
