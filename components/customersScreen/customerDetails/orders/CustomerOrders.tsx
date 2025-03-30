import { StyleSheet, Text } from "react-native";
import React, { ReactElement, useMemo, useState } from "react";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useCustomer } from "@/app/(tabs)/customers/_layout";
import { orders } from "@/mock/orders";
import NewOrders from "@/components/common/orders/new/NewOrders";
import PendingOrders from "@/components/common/orders/pending/PendingOrders";
import CompletedNotPaidOrders from "@/components/common/orders/completedNotPaid/CompletedNotPaidOrders";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { useRouter } from "expo-router";

type OrdersStatusOptions = "לביצוע" | "בוצעו ולא שולמו" | "חדשות";

const SegmentIndices: Record<OrdersStatusOptions, number> = {
  "בוצעו ולא שולמו": 0,
  לביצוע: 1,
  חדשות: 2,
} as const;

type SegmentType = keyof typeof SegmentIndices;

const CustomerOrders = () => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number>(
    SegmentIndices["חדשות"]
  );
  const { customerDetails } = useCustomer();
  const customerOrders = useMemo(
    () =>
      orders.filter(
        (order) => order.customerId === customerDetails?.businessNumber
      ),
    [orders, customerDetails]
  );

  const handleOrderPress = (orderId: number) => {
    if (customerDetails?.businessNumber) {
      router.push({
        pathname: "/(tabs)/orders/[id]",
        params: {
          id: orderId,
          fromCustomer: "true",
          customerId: customerDetails?.businessNumber,
        },
      });
    }
  };

  const sectionedCustomerOrders = useMemo(() => {
    return {
      title: "",
      data: customerOrders,
    };
  }, [customerOrders]);

  const screenRenderIndexMap: Record<number, ReactElement> = useMemo(
    () => ({
      0: (
        <CompletedNotPaidOrders
          sectionedOrdersList={[sectionedCustomerOrders]}
          disableScroll={true}
          onOrderPress={handleOrderPress}
        />
      ),
      1: (
        <PendingOrders
          sectionedOrdersList={[sectionedCustomerOrders]}
          disableScroll={true}
          onOrderPress={handleOrderPress}
        />
      ),
      2: (
        <NewOrders
          sectionedOrdersList={[sectionedCustomerOrders]}
          disableScroll={true}
          onOrderPress={handleOrderPress}
        />
      ),
    }),
    [orders, sectionedCustomerOrders]
  );

  return (
    <>
      <Text style={styles.titleTextStyle}>הזמנות</Text>
      <SegmentedControl
        values={Object.keys(SegmentIndices) as SegmentType[]}
        selectedIndex={selectedIndex}
        style={{
          marginTop: ScreenHeight * 0.02,
          width: "90%",
          alignSelf: "center",
        }}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
      />
      {screenRenderIndexMap[selectedIndex]}
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
