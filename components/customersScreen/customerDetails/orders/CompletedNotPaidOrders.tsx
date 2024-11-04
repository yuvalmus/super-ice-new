import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Order } from "@/models/Order";
import { distributionLines } from "@/mock/distributionLines";
import OrderTicket from "@/components/common/orderTicket/OrderTicket";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import {
  DeliveryDocColor,
  PaymentMethodImage,
} from "@/components/common/orderTicket/DeliveryAndPayment";
import { cutDecimalDigits } from "@/utils/General";

interface CompletedOrdersProps {
  customerOrders: Order[];
}

const CompletedNoPaidOrders = (props: CompletedOrdersProps) => {
  const completedNoPaidOrders = props.customerOrders.filter(
    (order) =>
      distributionLines.find(
        (line) => line.id === order.attachedDistributionLineId
      )?.isCompleted && order.debtLeft > 0
  );

  return (
    <View style={{ alignItems: "center", marginTop: ScreenHeight * 0.02 }}>
      {completedNoPaidOrders.length > 0 ? (
        completedNoPaidOrders.map((order, index) => (
          <OrderTicket
            key={index}
            order={order}
            width={ScreenWidth * 0.62}
            regularDetails={[
              { title: "תאריך אספקה:", data: order.suppliedDate },
              { title: "כמות שסופקה:", data: order.amountSupplied },
            ]}
            importantDetails={[
              {
                title: "סכום לתשלום:",
                data: cutDecimalDigits(order.debtLeft, 2) + " ₪",
              },
            ]}
            otherDetails={[
              order.paymentMethod && {
                title: "אמצעי תשלום:",
                data: (
                  <View style={styles.paymentMethodImageContainer}>
                    {PaymentMethodImage[order.paymentMethod]}
                  </View>
                ),
              },
              order.deliveryDocument && {
                data: (
                  <View
                    style={[
                      styles.deliveryDocStyle,
                      {
                        backgroundColor:
                          DeliveryDocColor[order.deliveryDocument],
                      },
                    ]}
                  />
                ),
              },
            ].filter((item) => item != undefined)}
          />
        ))
      ) : (
        <Text style={styles.emptyListTextStyle}>אין הזמנות שלא שולמו</Text>
      )}
    </View>
  );
};

export default CompletedNoPaidOrders;

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
  emptyListTextStyle: {
    fontSize: ScreenWidth * 0.04,
    color: "#001B61",
  },
});
