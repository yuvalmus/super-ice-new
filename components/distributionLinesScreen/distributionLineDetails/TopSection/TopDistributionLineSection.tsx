import { BackHandler, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useAlert } from "@/contexts/AlertContext";

const TopDistributionLineSection = () => {
  const { fromOrder, orderId } = useLocalSearchParams();
  const { showAlert } = useAlert();

  const handleBack = () => {
    if (fromOrder === "true" && orderId) {
      router.replace("/(tabs)/distributionLines");
      router.push({
        pathname: "/(tabs)/orders/[id]",
        params: { id: String(orderId) },
      });
    } else {
      router.push("/(tabs)/distributionLines");
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        handleBack();
        return true; // Prevent default back behavior
      }
    );

    return () => backHandler.remove();
  }, [fromOrder, orderId]);

  const handleAddOrders = () => {
    showAlert(
      "הוספת הזמנות לקו חלוקה",
      "האם ברצונך ליצור הזמנה חדשה או להוסיף הזמנות קיימות?",
      [
        {
          text: "יצירת הזמנה חדשה",
          style: "cancel",
          onPress: () => {
            console.log("יצירת הזמנה חדשה");
          },
        },
        {
          text: "הוספת הזמנות קיימות",
          style: "default",
          onPress: () => {
            console.log("הוספת הזמנות קיימות");
          },
        },
      ]
    );
  };

  return (
    <View
      style={{
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <TouchableOpacity onPress={handleBack}>
        <MaterialCommunityIcons name="arrow-right" size={28} color="#001B61" />
      </TouchableOpacity>

      <View style={styles.leftSideButtonsContainer}>
        <TouchableOpacity
          style={{ alignSelf: "flex-start" }}
          onPress={() => {}}
        >
          <Ionicons name="checkmark-circle" size={28} color="#001B61" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: "flex-start" }}
          onPress={() => handleAddOrders()}
        >
          <Ionicons name="add" size={28} color="#001B61" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: "flex-start" }}
          onPress={() => {}}
        >
          <MaterialCommunityIcons
            name="map-marker-distance"
            size={28}
            color="#001B61"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopDistributionLineSection;

const styles = StyleSheet.create({
  leftSideButtonsContainer: {
    flexDirection: "row",
    gap: 15,
  },
});
