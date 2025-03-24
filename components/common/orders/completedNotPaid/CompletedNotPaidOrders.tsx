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
import CompletedNotPaidOrderTicket from "./CompletedNotPaidOrderTicket";

interface CompletedNotPaidOrdersProps {
  sectionedOrdersList: SectionListData<Order>[];
  disableSectionScroll?: boolean;
  onOrderPress?: (orderId: number) => void;
}

const CompletedNotPaidOrders = (props: CompletedNotPaidOrdersProps) => {
  const sectionedCompletedNotPaidOrders = props.sectionedOrdersList
    .map((section) => ({
      ...section,
      data: section.data.filter(
        (order) =>
          distributionLines.find(
            (line) => line.id === order.attachedDistributionLineId
          )?.isCompleted && !order.isPaid
      ),
    }))
    .filter((section) => section.data.length > 0);

  return (
    <View
      style={{
        alignItems: "center",
        marginTop: ScreenHeight * 0.01,
        paddingBottom: ScreenHeight * 0.2,
      }}
    >
      <SectionList
        sections={sectionedCompletedNotPaidOrders}
        scrollEnabled={!props.disableSectionScroll}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.sectionListStyle}
        renderItem={({ item: order }) => (
          <CompletedNotPaidOrderTicket
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
          <Text style={styles.noResultsTextStyle}>אין הזמנות שלא שולמו</Text>
        )}
      />
    </View>
  );
};

export default CompletedNotPaidOrders;

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
