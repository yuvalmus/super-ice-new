import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
} from "react-native";
import { Order } from "@/models/Order";
import { customers } from "@/mock/customers";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SwipeHandler from "@/components/common/swipeHandler/SwipeHandler";
import OrderItemActionsSection from "./orderItemActionsSection/OrderItemActionsSection";

interface OrderItemProps {
  order: Order;
  drag: () => void;
  isActive: boolean;
  onUpdateAmount?: (amount: number) => void;
}

const OrderItem = (props: OrderItemProps) => {
  const [providedAmount, setProvidedAmount] = useState(
    props.order.amountSupplied
  );
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Animation value for expansion
  const expandAnimation = useRef(new Animated.Value(0)).current;

  const getCustomerName = () => {
    const customer = customers.find(
      (customer) => customer.businessNumber === props.order.customerId
    );
    return customer?.name;
  };

  const amountProvidedChangeHandler = (newValue: string) => {
    if (newValue === "") {
      setProvidedAmount(0);
      return;
    }
    if (isNaN(parseInt(newValue.slice(-1)))) {
      return;
    }
    const newAmount = Number(newValue);

    setProvidedAmount(newAmount);
    props.onUpdateAmount?.(newAmount);
  };

  const onComplete = useCallback(() => {
    setProvidedAmount((prevProvidedAmount) => {
      if (prevProvidedAmount !== props.order.amountRequired) {
        props.onUpdateAmount?.(props.order.amountRequired);
        return props.order.amountRequired;
      }
      return prevProvidedAmount;
    });
  }, [props.order.amountRequired, props.onUpdateAmount]);

  const toggleExpand = () => {
    const toValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);

    Animated.timing(expandAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const expandedHeight = expandAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, ScreenHeight * 0.06],
  });

  return (
    <SwipeHandler isActive={props.isActive} onComplete={onComplete}>
      <View style={[styles.container, props.isActive && styles.activeItem]}>
        {/* Main content row */}
        <TouchableOpacity
          onPress={toggleExpand}
          style={styles.mainContent}
          delayPressIn={100}
          disabled={props.isActive}
        >
          {/* Drag handle area */}
          <TouchableOpacity
            onLongPress={props.drag}
            style={styles.draggableSection}
            delayLongPress={150}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="drag"
              size={ScreenWidth * 0.06}
              color="#21a7fd"
              style={styles.dragIcon}
            />
          </TouchableOpacity>

          <View style={styles.distributionPointNameSection}>
            <Text
              style={styles.distributionPointNameStyle}
              numberOfLines={1}
              lineBreakMode="tail"
            >
              {getCustomerName()}
            </Text>
          </View>

          <View style={styles.amountSection}>
            <TextInput
              keyboardType="number-pad"
              style={[
                styles.amountInputStyle,
                providedAmount > props.order.amountRequired
                  ? styles.redText
                  : null,
                isFocused && styles.focusedInput,
              ]}
              maxLength={3}
              value={String(providedAmount)}
              onChangeText={amountProvidedChangeHandler}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              editable={!props.isActive}
            />
            <Text style={styles.totalAmountStyle}>
              / {props.order.amountRequired}
            </Text>
          </View>
        </TouchableOpacity>

        <Animated.View
          style={[styles.actionsContainer, { height: expandedHeight }]}
        >
          <OrderItemActionsSection order={props.order} />
        </Animated.View>
      </View>
    </SwipeHandler>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderTopWidth: 1,
    borderColor: "#8FCCE3",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#D9E6EB",
  },
  activeItem: {
    elevation: 5,
    transform: [{ scale: 1.02 }],
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 100,
  },
  mainContent: {
    height: ScreenHeight * 0.07,
    flexDirection: "row",
  },
  draggableSection: {
    flex: 1.5,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  dragIcon: {
    opacity: 0.8,
  },
  distributionPointNameSection: {
    flex: 5.5,
    justifyContent: "center",
  },
  distributionPointNameStyle: {
    fontSize: ScreenWidth * 0.05,
  },
  amountSection: {
    flex: 2.5,
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: "3%",
  },
  amountInputStyle: {
    fontSize: ScreenWidth * 0.05,
    flex: 1,
    color: "#21a7fd",
    borderBottomWidth: 1.5,
    borderBottomColor: "#21a7fd",
    textAlign: "center",
  },
  focusedInput: {
    borderBottomColor: "#0077cc",
    borderBottomWidth: 2,
    backgroundColor: "rgba(33, 167, 253, 0.1)",
  },
  redText: {
    color: "red",
  },
  totalAmountStyle: {
    fontSize: ScreenWidth * 0.05,
    flex: 1,
    color: "#21a7fd",
    marginRight: "5%",
    textAlign: "center",
  },
  actionsContainer: {
    width: "100%",
    backgroundColor: "#D9E6EB",
    overflow: "hidden",
  },
});
