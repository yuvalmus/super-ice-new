import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { useOrder } from "@/app/(tabs)/orders/_layout";
import OrderStatus from "./OrderStatus";
import MainInfo from "../mainInfo/MainInfo";

const orderIcon = require("@/assets/images/orderIcon.png");

const TopOrderSection = () => {
  const { orderDetails } = useOrder();

  return (
    <View style={styles.topSection}>
      <View style={styles.orderIconContainer}>
        <Image
          source={orderIcon}
          alt="order icon"
          style={styles.orderIconStyle}
        />
      </View>
      <Text numberOfLines={1} style={styles.orderNumberStyle}>
        {`הזמנה #${orderDetails?.id}`}
      </Text>
      <OrderStatus />
      <MainInfo />
    </View>
  );
};

export default TopOrderSection;

const styles = StyleSheet.create({
  topSection: {
    width: "100%",
    padding: "3%",
    backgroundColor: "#8FCCE3",
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  orderNumberStyle: {
    color: "#001B61",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: ScreenWidth * 0.06,
  },
  orderIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  orderIconStyle: {
    height: ScreenWidth * 0.25,
    aspectRatio: 1,
  },
});
