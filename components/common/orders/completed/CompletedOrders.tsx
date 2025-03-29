import {
  FlatList,
  SectionList,
  SectionListData,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Order } from "@/models/Order";
import { distributionLines } from "@/mock/distributionLines";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import CompletedOrderTicket from "./CompletedOrderTicket";

interface CompletedOrdersProps {
  sectionedOrdersList: SectionListData<Order>[];
  disableSectionScroll?: boolean;
  onOrderPress?: (orderId: number) => void;
}

const CompletedOrders = (props: CompletedOrdersProps) => {
  const sectionedCompletedOrders = props.sectionedOrdersList
    .map((section) => ({
      ...section,
      data: section.data.filter(
        (order) =>
          distributionLines.find(
            (line) => line.id === order.attachedDistributionLineId
          )?.isCompleted && order.isPaid
      ),
    }))
    .filter((section) => section.data.length > 0);

  return (
    <View
      style={{
        alignItems: "center",
        marginTop: ScreenHeight * 0.01,
        paddingBottom: ScreenHeight * 0.1,
      }}
    >
      <SectionList
        sections={sectionedCompletedOrders}
        scrollEnabled={!props.disableSectionScroll}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.sectionListStyle}
        renderItem={({ item: order }) => (
          <CompletedOrderTicket
            order={order}
            onOrderPress={props.onOrderPress}
          />
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
          <Text style={styles.noResultsTextStyle}>אין הזמנות שבוצעו</Text>
        )}
      />
    </View>
  );
};

export default CompletedOrders;

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
  sectionListStyle: {
    width: "100%",
    alignItems: "center",
    padding: ScreenWidth * 0.04,
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
