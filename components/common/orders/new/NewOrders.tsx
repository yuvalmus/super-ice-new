import {
  SectionList,
  SectionListData,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Order } from "@/models/Order";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import NewOrderTicket from "./NewOrderTicket";
import { getOrderStatus } from "@/utils/Order/OrderUtils";
interface NewOrdersProps {
  sectionedOrdersList: SectionListData<Order>[];
  disableScroll?: boolean;
  onOrderPress?: (orderId: number) => void;
}

const NewOrders = (props: NewOrdersProps) => {
  const sectionedNewOrders = props.sectionedOrdersList
    .map((section) => ({
      ...section,
      data: section.data.filter(
        (order) => getOrderStatus(order as Order) === "newOrder"
      ),
    }))
    .filter((section) => section.data.length > 0);

  return (
    <SectionList
      sections={sectionedNewOrders}
      scrollEnabled={!props.disableScroll}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.sectionListStyle}
      renderItem={({ item: order }) => (
        <NewOrderTicket order={order} onOrderPress={props.onOrderPress} />
      )}
      renderSectionHeader={({ section: { title } }) =>
        title ? (
          <Text style={styles.distributionAreaTitleStyle}>{title}</Text>
        ) : (
          <></>
        )
      }
      renderSectionFooter={() => <View style={styles.separator} />}
      ListEmptyComponent={() => (
        <Text style={styles.noResultsTextStyle}>אין הזמנות חדשות</Text>
      )}
    />
  );
};

export default NewOrders;

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
  sectionListStyle: {
    width: "100%",
    alignItems: "center",
    padding: ScreenWidth * 0.04,
    paddingBottom: ScreenHeight * 0.15,
  },
  distributionAreaTitleStyle: {
    fontSize: ScreenWidth * 0.06,
    fontWeight: "bold",
    color: "#21a7fd",
    marginBottom: ScreenHeight * 0.018,
    textShadowColor: "rgba(255, 255, 255, 0.4)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  separator: {
    height: 1.5,
    width: ScreenWidth,
    backgroundColor: "#8FCCE3",
    marginBottom: ScreenHeight * 0.02,
  },
  noResultsTextStyle: {
    fontSize: ScreenWidth * 0.06,
    color: "#3AA1D8",
    textAlign: "center",
    marginVertical: ScreenHeight * 0.04,
  },
});
