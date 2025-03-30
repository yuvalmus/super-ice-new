import { View, StyleSheet, TouchableOpacity, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import { useDistributionLine } from "../_layout";
import { useLocalSearchParams, useRouter } from "expo-router";
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
} from "@/components/distributionLinesScreen/distributionLineDetails/OrderItem/orderOperations";
import TopDistributionLineSection from "@/components/distributionLinesScreen/distributionLineDetails/TopSection/TopDistributionLineSection";
const DistributionLineScreen = () => {
  const { setDistributionLineDetails } = useDistributionLine();
  const { id, fromOrder, orderId } = useLocalSearchParams();
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
      topButton={<TopDistributionLineSection />}
    >
      {distributionLine && (
        <DistributionLineHeader distributionLine={distributionLine} />
      )}
      {orders.length === 0 ? (
        <EmptyOrdersList />
      ) : (
        <DraggableOrderList
          orders={orders}
          onDragEnd={handleOrderDragEnd}
          onUpdateAmount={handleOrderAmountUpdate}
        />
      )}
      <UpdatingIndicator isVisible={isUpdating} />
    </ScreenWrapper>
  );
};

export default DistributionLineScreen;
