import CompletedNotPaidOrders from "@/components/common/orders/completedNotPaid/CompletedNotPaidOrders";
import NewOrders from "@/components/common/orders/new/NewOrders";
import PendingOrders from "@/components/common/orders/pending/PendingOrders";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { ScreenHeight } from "@/constants/Dimensions";
import { orders } from "@/mock/orders";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { ReactElement, useMemo, useState } from "react";
import SearchBar from "@/components/common/searchBar/SearchBar";
import { distributionAreas } from "@/mock/distributionAreas";
import { customers } from "@/mock/customers";
type OrdersStatusOptions = "לביצוע" | "בוצעו ולא שולמו" | "חדשות";

const SegmentIndices: Record<OrdersStatusOptions, number> = {
  חדשות: 0,
  לביצוע: 1,
  "בוצעו ולא שולמו": 2,
} as const;

type SegmentType = keyof typeof SegmentIndices;

export default function OrdersScreen() {
  const [searchedName, setSearchedName] = useState("");

  const [selectedIndex, setSelectedIndex] = useState<number>(
    SegmentIndices["חדשות"]
  );

  const sectionedData = useMemo(
    () =>
      distributionAreas
        .map((area) => ({
          title: area.name,
          data: orders.filter((order) => {
            const customer = customers.find(
              (customer) => customer.businessNumber === order.customerId
            );

            return (
              customer?.distributionAreaId === area.id &&
              customer?.name.includes(searchedName)
            );
          }),
        }))
        .filter((section) => section.data.length > 0),
    [searchedName, customers, distributionAreas]
  );

  const screenRenderIndexMap: Record<number, ReactElement> = useMemo(
    () => ({
      0: <NewOrders sectionedOrdersList={sectionedData} />,
      1: <PendingOrders sectionedOrdersList={sectionedData} />,
      2: <CompletedNotPaidOrders sectionedOrdersList={sectionedData} />,
    }),
    [orders, sectionedData]
  );

  return (
    <ScreenWrapper title="רשימת הזמנות" disableScroll>
      <SearchBar placeholder="הקלד שם לקוח" onChangeText={setSearchedName} />
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
    </ScreenWrapper>
  );
}
