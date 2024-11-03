import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Order } from "@/models/Order";
import { distributionLines } from "@/mock/distributionLines";
import OrderTicket, {
  getDistributionLineDate,
} from "@/components/common/orderTicket/OrderTicket";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { useCustomer } from "@/app/(tabs)/customers/_layout";
import {
  DeliveryDocColor,
  PaymentMethodImage,
} from "@/components/common/orderTicket/DeliveryAndPayment";
import { cutDecimalDigits } from "@/utils/General";

interface PendingOrdersProps {
  customerOrders: Order[];
}

const PendingOrders = (props: PendingOrdersProps) => {
  const { customerDetails } = useCustomer();
  const DEFAULT_BAG_PRICE = 6;

  const pendingOrders = props.customerOrders.filter(
    (order) =>
      order.attachedDistributionLineId === null ||
      !distributionLines.find(
        (line) => line.id === order.attachedDistributionLineId
      )?.isCompleted
  );

  return (
    <View style={{ alignItems: "center", marginTop: ScreenHeight * 0.02 }}>
      {pendingOrders.length > 0 ? (
        pendingOrders.map((order, index) => (
          <OrderTicket
            key={index}
            order={order}
            width={ScreenWidth * 0.62}
            title={order.creationDate}
            regularDetails={[{ title: "כמות:", data: order.amountRequired }]}
            importantDetails={[
              {
                title: "סכום צפוי:",
                data:
                  cutDecimalDigits(
                    order.amountRequired * (customerDetails?.bagPrice2kg ?? DEFAULT_BAG_PRICE),
                    2
                  ) + " ₪",
              },
              {
                title: "קו חלוקה משויך:",
                data: order.attachedDistributionLineId
                  ? getDistributionLineDate(order.attachedDistributionLineId)
                  : "לא משויך",
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
        <Text style={styles.emptyListTextStyle}>אין הזמנות לביצוע</Text>
      )}
    </View>
  );
};

export default PendingOrders;

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
