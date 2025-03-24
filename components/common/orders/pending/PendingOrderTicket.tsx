import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Order } from "@/models/Order";
import { customers } from "@/mock/customers";
import OrderTicket, {
  getDistributionLineDate,
} from "../orderTicket/OrderTicket";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { cutDecimalDigits } from "@/utils/General";
import {
  DeliveryDocColor,
  PaymentMethodImage,
} from "../orderTicket/DeliveryAndPayment";

interface PendingOrderTicketProps {
  order: Order;
  onOrderPress?: (orderId: number) => void;
}

const PendingOrderTicket = (props: PendingOrderTicketProps) => {
  const currCustomer = customers.find(
    (customer) => customer.businessNumber === props.order.customerId
  );

  return (
    <OrderTicket
      order={props.order}
      style={{ marginBottom: ScreenHeight * 0.03 }}
      width={ScreenWidth * 0.62}
      title={currCustomer?.name}
      regularDetails={[{ title: "כמות:", data: props.order.amountRequired }]}
      onOrderPress={props.onOrderPress}
      importantDetails={[
        {
          title: "תאריך הזמנה:",
          data: props.order.creationDate,
        },
        {
          title: "קו חלוקה משויך:",
          data: props.order.attachedDistributionLineId
            ? getDistributionLineDate(props.order.attachedDistributionLineId)
            : "לא משויך",
        },
      ]}
    />
  );
};

export default PendingOrderTicket;

const styles = StyleSheet.create({
  paymentMethodImageContainer: {
    height: ScreenHeight * 0.05,
  },
  deliveryDocStyle: {
    height: ScreenHeight * 0.035,
    aspectRatio: 1,
    borderRadius: 100,
    alignSelf: "center",
  },
});
