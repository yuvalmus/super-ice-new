import React from "react";
import { Order } from "@/models/Order";
import { customers } from "@/mock/customers";
import OrderTicket, {
  getDistributionLineDate,
} from "../orderTicket/OrderTicket";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";

interface NewOrderTicketProps {
  order: Order;
  onOrderPress?: (orderId: number) => void;
}

const NewOrderTicket = (props: NewOrderTicketProps) => {
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
      ]}
    />
  );
};

export default NewOrderTicket;
