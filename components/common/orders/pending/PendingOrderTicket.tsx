import React from "react";
import { Order } from "@/models/Order";
import { customers } from "@/mock/customers";
import OrderTicket from "../orderTicket/OrderTicket";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { getDistributionLineDate } from "@/utils/DistributionLine/distributionLineUtils";

interface PendingOrderTicketProps {
  order: Order;
  onOrderPress?: (orderId: number) => void;
}

const PendingOrderTicket = (props: PendingOrderTicketProps) => {
  const currCustomer = customers.find(
    (customer) => customer.businessNumber === props.order.customerId
  );

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
    </TouchableOpacity>
  );
};

export default PendingOrderTicket;
