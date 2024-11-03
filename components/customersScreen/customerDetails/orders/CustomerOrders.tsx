import { StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useCustomer } from "@/app/(tabs)/customers/_layout";
import { orders } from "@/mock/orders";
import PendingOrders from "./PendingOrders";
import CompletedOrders from "./CompletedNotPaidOrders";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";

type OrdersStatusOptions = "לביצוע" | "בוצעו ולא שולמו";

const SegmentIndices: Record<OrdersStatusOptions, number> = {
  "בוצעו ולא שולמו": 0,
  לביצוע: 1,
} as const;

type SegmentType = keyof typeof SegmentIndices;

const CustomerOrders = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(
    SegmentIndices["לביצוע"]
  );
  const { customerDetails } = useCustomer();
  const customerOrders = orders.filter(
    (order) => order.customerId === customerDetails?.businessNumber
  );

  return (
    <>
      <Text style={styles.titleTextStyle}>הזמנות</Text>
      <SegmentedControl
        values={Object.keys(SegmentIndices) as SegmentType[]}
        selectedIndex={selectedIndex}
        style={{
          marginTop: ScreenHeight * 0.02,
          width: "80%",
          alignSelf: "center",
        }}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
      />
      {selectedIndex === SegmentIndices["לביצוע"] ? (
        <PendingOrders customerOrders={customerOrders} />
      ) : (
        <CompletedOrders customerOrders={customerOrders} />
      )}
    </>
  );
};

export default CustomerOrders;

const styles = StyleSheet.create({
  titleTextStyle: {
    color: "#001B61",
    fontSize: ScreenWidth * 0.06,
    marginRight: ScreenWidth * 0.04,
    marginTop: ScreenHeight * 0.02,
    fontWeight: "bold",
    textAlign: "right",
  },
});
