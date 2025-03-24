import { StyleSheet, Text, View } from "react-native";
import React from "react";
import OrderTicket from "../orderTicket/OrderTicket";
import { Order } from "@/models/Order";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { cutDecimalDigits } from "@/utils/General";
import {
  DeliveryDocColor,
  PaymentMethodImage,
} from "../orderTicket/DeliveryAndPayment";
import { customers } from "@/mock/customers";

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

  return (
    <OrderTicket
      order={props.order}
      width={ScreenWidth * 0.62}
      title={currCustomer?.name}
      onOrderPress={props.onOrderPress}
      regularDetails={[
        { title: "תאריך אספקה:", data: props.order.suppliedDate },
        { title: "כמות שסופקה:", data: props.order.amountSupplied },
      ]}
      importantDetails={[
        {
          title: "סכום לתשלום:",
          data: cutDecimalDigits(props.order.totalPrice, 2) + " ₪",
        },
      ]}
      otherDetails={[
        props.order.paymentMethod && {
          title: "אמצעי תשלום:",
          data: (
            <View style={styles.paymentMethodImageContainer}>
              {PaymentMethodImage[props.order.paymentMethod]}
            </View>
          ),
        },
        props.order.deliveryDocument && {
          data: (
            <View
              style={[
                styles.deliveryDocStyle,
                {
                  backgroundColor:
                    DeliveryDocColor[props.order.deliveryDocument],
                },
              ]}
            />
          ),
        },
      ].filter((item) => item != undefined)}
    />
  );
};

export default CompletedNotPaidOrderTicket;

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
