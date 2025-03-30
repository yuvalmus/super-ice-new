import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useMemo } from "react";
import { useOrder } from "@/app/(tabs)/orders/_layout";
import { distributionLines } from "@/mock/distributionLines";
import { ScreenWidth } from "@/constants/Dimensions";

const newOrder = require("@/assets/images/receivedOrder.png");
const pending = require("@/assets/images/pending.png");
const completedNotPaid = require("@/assets/images/completedNotPaid.png");
const completed = require("@/assets/images/completed.png");

type OrderStatus = "newOrder" | "pending" | "completedNotPaid" | "completed";

const OrderStatus = () => {
  const { orderDetails } = useOrder();

  const statusToText: Record<OrderStatus, string> = {
    newOrder: "הזמנה חדשה",
    pending: "ממתין לביצוע",
    completedNotPaid: "בוצע ולא שולם",
    completed: "בוצע ושולם",
  };

  const statusToColor: Record<OrderStatus, string> = {
    newOrder: "#000",
    pending: "#EA9C00",
    completedNotPaid: "#ff0000",
    completed: "#38d313",
  };

  const statusToIcon: Record<OrderStatus, ImageSourcePropType> = {
    newOrder,
    pending,
    completedNotPaid,
    completed,
  };

  // TODO: use this status also for the lists of orders
  const getOrderStatus = useMemo((): (() => OrderStatus) => {
    return () => {
      if (orderDetails?.attachedDistributionLineId === null) return "newOrder";

      if (
        !distributionLines.find(
          (line) => line.id === orderDetails?.attachedDistributionLineId
        )?.isCompleted
      )
        return "pending";

      if (!orderDetails?.isPaid) return "completedNotPaid";

      return "completed";
    };
  }, [orderDetails]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>סטטוס:</Text>
      <View style={styles.statusContainer}>
        <Text
          style={[
            styles.statusTextStyle,
            { color: statusToColor[getOrderStatus()] },
          ]}
        >
          {statusToText[getOrderStatus()]}
        </Text>
        <View style={styles.statusIconContainer}>
          <Image
            source={statusToIcon[getOrderStatus()]}
            style={styles.statusIconStyle}
          />
        </View>
      </View>
    </View>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#001B61",
    marginHorizontal: ScreenWidth * 0.02,
    fontSize: ScreenWidth * 0.04,
  },
  statusContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: ScreenWidth * 0.02,
  },
  statusTextStyle: {
    fontSize: ScreenWidth * 0.04,
    fontWeight: "bold",
  },
  statusIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  statusIconStyle: {
    height: ScreenWidth * 0.09,
    aspectRatio: 1,
  },
});
