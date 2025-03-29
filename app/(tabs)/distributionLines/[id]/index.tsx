import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useDistributionLine } from "../_layout";
import { router, useLocalSearchParams } from "expo-router";
import { Order } from "@/models/Order";
import { DistributionLine } from "@/models/DistributionLine";
import { ScreenWrapper } from "@/components/ScreenWrapper";

import DraggableOrderList from "./components/DraggableOrderList";
import EmptyOrdersList from "./components/EmptyOrdersList";
import LoadingState from "@/components/common/loadingState/LoadingState";
import UpdatingIndicator from "@/components/common/updatingIndicator/UpdatingIndicator";
import DistributionLineHeader from "./components/DistributionLineHeader";

import { fetchDistributionLineDetails } from "@/utils/DistributionLine/distributionLineService";
import {
  fetchOrders,
  handleDragEnd,
  handleUpdateOrderAmount,
} from "@/components/distributionLinesScreen/OrderItem/orderOperations";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const DistributionLineScreen = () => {
  const { setDistributionLineDetails } = useDistributionLine();
  const { id } = useLocalSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [distributionLine, setDistributionLine] =
    useState<DistributionLine | null>(null);

  const distributionLineId = Number(id);

  // Fetch distribution line details
  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      const lineDetails = fetchDistributionLineDetails(distributionLineId);
      setDistributionLine(lineDetails);
      setDistributionLineDetails(lineDetails);
      setIsLoading(false);
    };

    fetchDetails();
  }, [distributionLineId]);

  useEffect(() => {
    fetchOrders(distributionLineId, setOrders);
  }, [distributionLineId]);

  const handleOrderDragEnd = async ({ data }: { data: Order[] }) => {
    await handleDragEnd(data, orders, setOrders, setIsUpdating);
  };

  const handleOrderAmountUpdate = async (orderId: number, amount: number) => {
    return await handleUpdateOrderAmount(
      orderId,
      amount,
      orders,
      setOrders,
      setIsUpdating
    );
  };

  const handleBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <ScreenWrapper title={`קו חלוקה #${id}`}>
        <LoadingState />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper
      title={`קו חלוקה #${id}`}
      topButton={
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TouchableOpacity onPress={handleBack}>
            <MaterialCommunityIcons
              name="arrow-right"
              size={28}
              color="#001B61"
            />
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
              onPress={() => {}}
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
      }
      disableScroll
    >
      <View style={styles.container}>
        {distributionLine && (
          <DistributionLineHeader distributionLine={distributionLine} />
        )}

        <View style={styles.ordersContainer}>
          {orders.length === 0 ? (
            <EmptyOrdersList />
          ) : (
            <DraggableOrderList
              orders={orders}
              onDragEnd={handleOrderDragEnd}
              onUpdateAmount={handleOrderAmountUpdate}
            />
          )}
        </View>
        <UpdatingIndicator isVisible={isUpdating} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  leftSideButtonsContainer: {
    flexDirection: "row",
    gap: 15,
  },
  container: {
    flex: 1,
    position: "relative",
  },
  ordersContainer: {
    flex: 1,
  },
});

export default DistributionLineScreen;
