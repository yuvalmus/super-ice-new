import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useOrder } from "../_layout";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import OrderDetails from "@/components/common/orders/orderDetails/OrderDetails";
import { Order } from "@/models/Order";
import { orders } from "@/mock/orders";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AlertButton, useAlert } from "@/contexts/AlertContext";
import { userState } from "@/mock/userState";
import { drivers } from "@/mock/drivers";
import { distributionLines } from "@/mock/distributionLines";
import SelectDistributionLineModal from "@/components/distributionLinesScreen/startDistributionLine/SelectDistributionLineModal";
import { DistributionLine } from "@/models/DistributionLine";
import { getOrderStatus } from "@/utils/Order/OrderUtils";

const addToDistributionLineIcon = require("@/assets/images/addToDistributionLine.png");

const OrderDetailsScreen = () => {
  const { orderDetails, setOrderDetails } = useOrder();
  const { id, fromCustomer, customerId } = useLocalSearchParams();
  const { showAlert } = useAlert();
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const activeDistributionLine = useMemo(() => {
    const currentDriver = drivers.find(
      (driver) => driver.id === userState.userId
    );
    return distributionLines.find(
      (line) => line.driverId === currentDriver?.activeDistributionLineId
    );
  }, [drivers, distributionLines, userState]);

  const updateAttachedDistributionLineToActiveLine = () => {
    setOrderDetails((prev) =>
      prev
        ? {
            ...prev,
            attachedDistributionLineId: (
              activeDistributionLine as DistributionLine
            ).id,
          }
        : null
    );
  };

  // TODO: refactor this function
  const handleAddToDistributionLine = () => {
    const hasDistributionLine =
      orderDetails?.attachedDistributionLineId !== null;
    const isActiveLineAvailable = !!activeDistributionLine;

    if (!hasDistributionLine) {
      // Order has no distribution line attached
      if (isActiveLineAvailable) {
        showAlert(
          "הכנסת ההזמנה לקו חלוקה",
          "האם להכניס את ההזמנה לקו החלוקה הנוכחי או לקו חלוקה אחר?",
          [
            {
              text: "קו חלוקה אחר",
              onPress: () => setIsModalVisible(true),
              style: "cancel",
            },
            {
              text: "קו חלוקה נוכחי",
              onPress: updateAttachedDistributionLineToActiveLine,
              style: "default",
            },
          ]
        );
      } else {
        setIsModalVisible(true);
      }
    } else {
      // Order already has a distribution line attached
      const title = "החלפת קו חלוקה להזמנה";
      const message =
        "הזמנה זו כבר משויכת לקו חלוקה. האם אתה רוצה לשייך את ההזמנה לקו חלוקה אחר?";

      if (isActiveLineAvailable) {
        showAlert(title, message, [
          {
            text: "קו חלוקה אחר",
            onPress: () => setIsModalVisible(true),
            style: "cancel",
          },
          {
            text: "קו חלוקה נוכחי",
            onPress: updateAttachedDistributionLineToActiveLine,
            style: "default",
          },
          {
            text: "ביטול",
            onPress: () => console.log("ביטול"),
            style: "destructive",
          },
        ]);
      } else {
        showAlert(title, message, [
          {
            text: "קו חלוקה אחר",
            onPress: () => setIsModalVisible(true),
            style: "cancel",
          },
          {
            text: "ביטול",
            onPress: () => console.log("ביטול"),
            style: "destructive",
          },
        ]);
      }
    }
  };

  const canChangeDistributionLine = useMemo(() => {
    return (
      getOrderStatus(orderDetails as Order) === "newOrder" ||
      getOrderStatus(orderDetails as Order) === "pending"
    );
  }, [orderDetails]);

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
            {canChangeDistributionLine && (
              <TouchableOpacity onPress={handleAddToDistributionLine}>
                <Image
                  source={addToDistributionLineIcon}
                  style={styles.addToDistributionLineIcon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      }
      topSectionStyle={{ backgroundColor: "#8FCCE3" }}
    >
      <OrderDetails />
      <SelectDistributionLineModal
        isVisible={isModalVisible}
        startButtonText="הכנסה לקו חלוקה"
        onSelect={(selectedLineIds: number[]) => {
          setOrderDetails((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              attachedDistributionLineId: selectedLineIds[0],
            };
          });
        }}
        onClose={() => setIsModalVisible(false)}
      />
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
