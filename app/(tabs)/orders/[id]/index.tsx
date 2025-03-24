import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  BackHandler,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useOrder } from "../_layout";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import OrderDetails from "@/components/common/orders/orderDetails/OrderDetails";
import { Order } from "@/models/Order";
import { orders } from "@/mock/orders";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAlert } from "@/contexts/AlertContext";

const addToDistributionLineIcon = require("@/assets/images/addToDistributionLine.png");

const OrderDetailsScreen = () => {
  const { orderDetails, setOrderDetails } = useOrder();
  const { id, fromCustomer, customerId } = useLocalSearchParams();
  const { show } = useAlert();

  const handleBack = () => {
    if (fromCustomer === "true" && customerId) {
      router.replace("/(tabs)/orders");
      router.push({
        pathname: "/(tabs)/customers/[id]",
        params: { id: String(customerId) },
      });
    } else {
      router.push("/(tabs)/orders");
    }
  };

  const handleAddToDistributionLine = () => {
    if (orderDetails?.attachedDistributionLineId === null) {
      show({
        title: "הכנסת ההזמנה לקו חלוקה",
        message: "האם להכניס את ההזמנה לקו החלוקה הנוכחי או לקו חלוקה אחר?",
        buttons: [
          {
            text: "קו חלוקה אחר",
            onPress: () => console.log("קו חלוקה אחר"),
            style: "cancel",
          },
          {
            text: "קו חלוקה נוכחי",
            onPress: () => console.log("קו חלוקה נוכחי"),
            style: "default",
          },
        ],
      });
    } else {
      show({
        title: "החלפת קו חלוקה להזמנה",
        message:
          "הזמנה זו כבר משויכת לקו חלוקה. האם אתה רוצה לשייך את ההזמנה לקו חלוקה אחר?",
        buttons: [
          {
            text: "קו חלוקה אחר",
            onPress: () => console.log("קו חלוקה אחר"),
            style: "cancel",
          },
          {
            text: "קו חלוקה נוכחי",
            onPress: () => console.log("קו חלוקה נוכחי"),
            style: "default",
          },
          {
            text: "ביטול",
            onPress: () => console.log("ביטול"),
            style: "destructive",
          },
        ],
      });
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        handleBack();
        return true;
      }
    );

    return () => backHandler.remove();
  }, [fromCustomer, customerId]);

  const fetchOrderDetails = (): Order | null => {
    const order: Order | null =
      orders.find((order) => order.id === Number(id)) ?? null;

    return order;
  };

  useEffect(() => {
    setOrderDetails(null);

    const fetchData = async () => {
      const data = fetchOrderDetails();
      setOrderDetails(data);
    };
    fetchData();

    return () => {
      setOrderDetails(null);
    };
  }, [id]);

  return (
    <ScreenWrapper
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
              onPress={() => router.push(`/customers/${id}/edit`)}
            >
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={28}
                color="#001B61"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddToDistributionLine}>
              <Image
                source={addToDistributionLineIcon}
                style={styles.addToDistributionLineIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      }
      topSectionStyle={{ backgroundColor: "#8FCCE3" }}
    >
      <OrderDetails />
    </ScreenWrapper>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  leftSideButtonsContainer: {
    flexDirection: "row",
    gap: 15,
  },
  addToDistributionLineIcon: {
    height: 28,
    aspectRatio: 1,
  },
});
