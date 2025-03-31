import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Order } from "@/models/Order";
import { ScreenWidth } from "@/constants/Dimensions";
import {
  navigateToOrder,
  navigateToCustomer,
  navigateToMap,
  contactCustomer,
} from "./navigationActions";

interface OrderItemActionsSectionProps {
  order: Order;
}

const OrderItemActionsSection = (props: OrderItemActionsSectionProps) => {
  return (
    <View style={styles.container}>
      <ActionButton
        icon="information-circle-outline"
        label="פרטי הזמנה"
        onPress={() => navigateToOrder(props.order.id)}
      />

      <ActionButton
        icon="business-outline"
        label="פרטי לקוח"
        onPress={() => navigateToCustomer(props.order.customerId)}
      />

      <ActionButton
        icon="navigate-outline"
        label="נווט"
        onPress={() => navigateToMap(props.order.customerId)}
      />

      <ActionButton
        icon="call-outline"
        label="צור קשר"
        onPress={() => contactCustomer(props.order.customerId)}
      />
    </View>
  );
};

export default OrderItemActionsSection;

interface ActionButtonProps {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  onPress?: () => void;
}

const ActionButton = (props: ActionButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.actionButton}
      onPress={props.onPress}
      activeOpacity={0.7}
      disabled={!props.onPress}
    >
      <Ionicons
        name={props.icon}
        size={ScreenWidth * 0.05}
        color={props.onPress ? "#21a7fd" : "#999"}
      />
      <Text
        style={[styles.actionLabel, !props.onPress && styles.disabledText]}
        numberOfLines={1}
      >
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  actionLabel: {
    fontSize: ScreenWidth * 0.025,
    color: "#21a7fd",
    marginTop: 2,
    textAlign: "center",
  },
  disabledText: {
    color: "#999",
  },
});
