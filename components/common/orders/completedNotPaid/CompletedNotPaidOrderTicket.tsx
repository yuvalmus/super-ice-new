import React from "react";
import OrderTicket from "../orderTicket/OrderTicket";
import { Order } from "@/models/Order";
import { ScreenWidth } from "@/constants/Dimensions";
import { cutDecimalDigits } from "@/utils/General";
import { customers } from "@/mock/customers";
import { distributionLines } from "@/mock/distributionLines";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

interface CompletedNotPaidOrderTicketProps {
  order: Order;
  onOrderPress?: (orderId: number) => void;
}

const CompletedNotPaidOrderTicket = (
  props: CompletedNotPaidOrderTicketProps
) => {
  const currCustomer = customers.find(
    (customer) => customer.businessNumber === props.order.customerId
  );
  const suppliedDate = distributionLines.find(
    (line) => line.id === props.order.attachedDistributionLineId
  )?.scheduledDate;

  return (
    <TouchableOpacity
      onPress={() =>
        props.onOrderPress
          ? props.onOrderPress(props.order.id)
          : router.push(`/orders/${props.order.id}`)
      }
    >
      <OrderTicket
        order={props.order}
        width={ScreenWidth * 0.62}
        title={currCustomer?.name}
        onOrderPress={props.onOrderPress}
        regularDetails={[
          { title: "תאריך אספקה:", data: suppliedDate },
          { title: "כמות שסופקה:", data: props.order.amountSupplied },
        ]}
        importantDetails={[
          {
            title: "סכום לתשלום:",
            data: cutDecimalDigits(props.order.totalPrice, 2) + " ₪",
          },
        ]}
      />
    </TouchableOpacity>
  );
};

export default CompletedNotPaidOrderTicket;
