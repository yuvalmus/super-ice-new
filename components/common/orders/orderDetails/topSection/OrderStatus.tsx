import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useOrder } from "@/app/(tabs)/orders/_layout";
import { ScreenWidth } from "@/constants/Dimensions";
import {
  statusToIcon,
  statusToColor,
  statusToText,
  getOrderStatus,
} from "@/utils/Order/OrderUtils";
import { Order } from "@/models/Order";

const OrderStatus = () => {
  const { orderDetails } = useOrder();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>סטטוס:</Text>
      <View style={styles.statusContainer}>
        <Text
          style={[
            styles.statusTextStyle,
            { color: statusToColor[getOrderStatus(orderDetails as Order)] },
          ]}
        >
          {statusToText[getOrderStatus(orderDetails as Order)]}
        </Text>
        <View style={styles.statusIconContainer}>
          <Image
            source={statusToIcon[getOrderStatus(orderDetails as Order)]}
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
