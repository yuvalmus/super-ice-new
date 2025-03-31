import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useMemo } from "react";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { DistributionLine } from "@/models/DistributionLine";
import { orders } from "@/mock/orders";
import { drivers } from "@/mock/drivers";
import { Driver } from "@/models/Driver";
import {
  formatDateWithDay,
  isToday,
  hasDatePassed,
} from "@/utils/Date/dateUtils";

interface DistributionLineCardProps {
  distributionLine: DistributionLine;
  style?: StyleProp<ViewStyle>;
}

const DistributionLineCard = (props: DistributionLineCardProps) => {
  const assignedDriver: Driver | undefined = useMemo(() => {
    return drivers.find(
      (driver) => driver.id === props.distributionLine.driverId
    );
  }, [props.distributionLine, drivers]);

  const numberOfOrders = useMemo(() => {
    return orders.filter(
      (order) => order.attachedDistributionLineId === props.distributionLine.id
    ).length;
  }, [props.distributionLine, orders]);

  const dateTextStyle = useMemo(() => {
    const date = props.distributionLine.scheduledDate;
    if (hasDatePassed(date)) {
      return styles.passedDate;
    }
    if (isToday(date)) {
      return styles.todayDate;
    }
    return styles.lineInfoValue;
  }, [props.distributionLine.scheduledDate]);

  return (
    <View style={[styles.cardContainer, props.style]}>
      <Text style={styles.lineTitle}>
        {`קו חלוקה #${props.distributionLine.id}`}
      </Text>
      <View style={styles.lineInfoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.lineInfoTitle}>הנהג המבצע:</Text>
          <Text style={styles.lineInfoValue}>{assignedDriver?.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.lineInfoTitle}>תאריך:</Text>
          <Text style={dateTextStyle}>
            {formatDateWithDay(props.distributionLine.scheduledDate)}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.lineInfoTitle}>מספר נקודות חלוקה:</Text>
          <Text style={styles.lineInfoValue}>{numberOfOrders} נקודות</Text>
        </View>
      </View>
    </View>
  );
};

export default DistributionLineCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: ScreenWidth * 0.85,
    flexDirection: "column",
    backgroundColor: "#F5F5F5",
    borderRadius: 30,
    alignItems: "center",
    paddingVertical: ScreenHeight * 0.015,
    alignSelf: "center",
  },
  lineTitle: {
    fontSize: ScreenWidth * 0.048,
    fontWeight: "bold",
    color: "#001B61",
    marginRight: "2%",
  },
  lineInfoContainer: {
    width: "90%",
    marginTop: ScreenHeight * 0.01,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  lineInfoTitle: {
    fontSize: ScreenWidth * 0.04,
    color: "#001B61",
    fontWeight: "600",
  },
  lineInfoValue: {
    fontSize: ScreenWidth * 0.04,
    color: "#333",
  },
  passedDate: {
    fontSize: ScreenWidth * 0.04,
    color: "#FF3B30",
    fontWeight: "500",
  },
  todayDate: {
    fontSize: ScreenWidth * 0.04,
    color: "#34C759",
    fontWeight: "500",
  },
});
