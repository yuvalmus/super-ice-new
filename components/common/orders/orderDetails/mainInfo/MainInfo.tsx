import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { useOrder } from "@/app/(tabs)/orders/_layout";
import { customers } from "@/mock/customers";
import { distributionLines } from "@/mock/distributionLines";
import { useRouter } from "expo-router";
import {
  DeliveryDocColor,
  DeliveryDocumentToHebrew,
  PaymentMethodImage,
} from "../../orderTicket/DeliveryAndPayment";

const MainInfo = () => {
  const { orderDetails } = useOrder();
  const router = useRouter();
  const customerDetails = useMemo(
    () =>
      customers.find(
        (customer) => customer.businessNumber === orderDetails?.customerId
      ),
    [customers, orderDetails]
  );

  const distributionLineDetails = useMemo(
    () =>
      orderDetails?.attachedDistributionLineId
        ? distributionLines.find(
            (line) => line.id === orderDetails.attachedDistributionLineId
          )
        : null,
    [orderDetails?.attachedDistributionLineId]
  );

  const handleCustomerPress = () => {
    if (customerDetails?.businessNumber) {
      router.push({
        pathname: "/(tabs)/customers/[id]",
        params: {
          id: customerDetails.businessNumber,
          fromOrder: "true",
          orderId: orderDetails?.id,
        },
      });
    }
  };

  const handleDistributionLinePress = () => {
    if (orderDetails?.attachedDistributionLineId) {
      router.push({
        pathname: "/(tabs)/distributionLines/[id]",
        params: {
          id: orderDetails.attachedDistributionLineId,
          fromOrder: "true",
          orderId: orderDetails.id,
        },
      });
    }
  };

  return (
    <View style={styles.mainInfoContainer}>
      <View style={styles.middleInfoContainer}>
        <TouchableOpacity
          onPress={handleCustomerPress}
          style={styles.businessNameContainer}
        >
          <Text numberOfLines={1} style={styles.businessNameStyle}>
            {customerDetails?.name}
          </Text>
        </TouchableOpacity>
        {customerDetails?.invoiceName && (
          <Text numberOfLines={1} style={styles.invoiceNameStyle}>
            {`(${customerDetails?.invoiceName})`}
          </Text>
        )}

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailTitle}>כמות שהוזמנה:</Text>
            <Text style={styles.detailValue}>
              {orderDetails?.amountRequired}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailTitle}>תאריך הזמנה:</Text>
            <Text style={styles.detailValue}>
              {orderDetails?.creationDate || "-"}
            </Text>
          </View>

          <View style={styles.distributionLineContainer}>
            <Text style={styles.distributionLineTitle}>קו חלוקה משויך:</Text>
            {orderDetails?.attachedDistributionLineId ? (
              <TouchableOpacity onPress={handleDistributionLinePress}>
                <Text style={styles.distributionLineValue}>
                  {distributionLineDetails?.scheduledDate}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.noDistributionLineValue}>לא משויך</Text>
            )}
          </View>

          {orderDetails?.paymentMethod && (
            <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>אמצעי תשלום:</Text>
              <View style={styles.paymentMethodContainer}>
                {PaymentMethodImage[orderDetails.paymentMethod]}
              </View>
            </View>
          )}

          {orderDetails?.deliveryDocument && (
            <View style={styles.detailRow}>
              <Text style={styles.detailTitle}>מסמך משלוח:</Text>
              <Text
                style={[
                  styles.detailValue,
                  { color: DeliveryDocColor[orderDetails.deliveryDocument] },
                ]}
              >
                {DeliveryDocumentToHebrew[orderDetails.deliveryDocument]}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default MainInfo;

const styles = StyleSheet.create({
  mainInfoContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginTop: ScreenHeight * 0.01,
    paddingBottom: ScreenHeight * 0.02,
  },
  middleInfoContainer: {
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
  },
  businessNameContainer: {
    padding: ScreenWidth * 0.0,
  },
  businessNameStyle: {
    color: "#0066CC",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: ScreenWidth * 0.05,
    textDecorationLine: "underline",
  },
  invoiceNameStyle: {
    color: "#001B61",
    textAlign: "center",
    fontSize: ScreenWidth * 0.04,
  },
  detailsContainer: {
    width: "100%",
    paddingHorizontal: ScreenWidth * 0.05,
    marginTop: ScreenHeight * 0.02,
  },
  detailRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: ScreenHeight * 0.01,
  },
  detailTitle: {
    color: "#001B61",
    fontSize: ScreenWidth * 0.04,
  },
  detailValue: {
    color: "#001B61",
    fontSize: ScreenWidth * 0.04,
  },
  distributionLineContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  distributionLineTitle: {
    color: "#001B61",
    fontSize: ScreenWidth * 0.04,
  },
  distributionLineValue: {
    color: "#0066CC",
    fontSize: ScreenWidth * 0.04,
    textDecorationLine: "underline",
  },
  noDistributionLineValue: {
    color: "red",
  },
  paymentMethodContainer: {
    height: ScreenWidth * 0.1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
