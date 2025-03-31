import { BackHandler, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useAlert } from "@/contexts/AlertContext";
import SelectOrdersModal from "@/components/common/selectionModal/selectableModals/SelectOrdersModal";
import { getOrderStatus } from "@/utils/Order/OrderUtils";
import { orders } from "@/mock/orders";
import { distributionLines } from "@/mock/distributionLines";

const TopDistributionLineSection = () => {
  const { id, fromOrder, orderId } = useLocalSearchParams();
  const { showAlert } = useAlert();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isDistributionLineCompleted = distributionLines.find(
    (line) => line.id === Number(id)
  )?.isCompleted;

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
          onPress: () => setIsModalVisible(true),
        },
      ]
    );
  };

  const handleSelectOrders = (selectedIds: number[]) => {
    orders.forEach((order) => {
      if (selectedIds.includes(order.id)) {
        order.attachedDistributionLineId = Number(id);
      }
    });
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

      {!isDistributionLineCompleted && (
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
      )}

      <SelectOrdersModal
        isVisible={isModalVisible}
        filterRules={(order) =>
          (getOrderStatus(order) === "newOrder" ||
            getOrderStatus(order) === "pending") &&
          order.attachedDistributionLineId !== Number(id)
        }
        onSelect={handleSelectOrders}
        onClose={() => setIsModalVisible(false)}
      />
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
