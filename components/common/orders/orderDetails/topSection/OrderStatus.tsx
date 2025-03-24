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

const notHandled = require("@/assets/images/receivedOrder.png");
const pending = require("@/assets/images/pending.png");
const deliveredNotPaid = require("@/assets/images/deliveredNotPaid.png");
const completed = require("@/assets/images/completed.png");

type OrderStatus = "notHandled" | "pending" | "deliveredNotPaid" | "completed";

const OrderStatus = () => {
  const { orderDetails } = useOrder();

  const statusToText: Record<OrderStatus, string> = {
    notHandled: "לא טופל",
    pending: "ממתין לביצוע",
    deliveredNotPaid: "בוצע ולא שולם",
    completed: "בוצע ושולם",
  };

  const statusToColor: Record<OrderStatus, string> = {
    notHandled: "#000",
    pending: "#EA9C00",
    deliveredNotPaid: "#ff0000",
    completed: "#38d313",
  };

  const statusToIcon: Record<OrderStatus, ImageSourcePropType> = {
    notHandled,
    pending,
    deliveredNotPaid,
    completed,
  };

  const getOrderStatus = useMemo((): () => OrderStatus => {
    return () => {
      if (orderDetails?.attachedDistributionLineId === null) return "notHandled";

      if (
        !distributionLines.find(
          (line) => line.id === orderDetails?.attachedDistributionLineId
        )?.isCompleted
      )
        return "pending";

      if (!orderDetails?.isPaid) return "deliveredNotPaid";

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
