import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { distributionLines } from "@/mock/distributionLines";
import { Order } from "@/models/Order";
import { useRouter } from "expo-router";
import React, { ReactNode } from "react";
import {
  View,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const generateTornEdgePath = (
  width: number,
  height: number,
  numPoints: number
) => {
  let path = `M0 0 L0 ${height * 0.9} `;
  const pointWidth = width / numPoints;

  for (let i = 1; i <= numPoints; i++) {
    const x = pointWidth * i;
    const y = i % 2 === 0 ? height * 0.9 : height;
    path += `L${x} ${y} `;
  }

  path += `L${width} ${height} L${width} 0 Z`;
  return path;
};

export const getDistributionLineDate = (distributionLineId: number) => {
  return distributionLines.find((line) => line.id === distributionLineId)
    ?.scheduledDate;
};

export interface OrderTicketDetail {
  title?: string;
  data: ReactNode;
}

interface OrderTicketProps {
  order: Order;
  width: number;
  title?: string;
  regularDetails?: OrderTicketDetail[];
  importantDetails?: OrderTicketDetail[];
  otherDetails?: OrderTicketDetail[];
  style?: StyleProp<ViewStyle>;
  onOrderPress?: (orderId: number) => void;
}

const OrderTicket = (props: OrderTicketProps) => {
  const MIN_HEIGHT = ScreenHeight * 0.03;
  const NUM_OF_RIPS = 15;
  const router = useRouter();

  const calculateTicketHeight = () => {
    return (
      ScreenHeight *
      ((props.title ? 0.05 : 0) +
        (props.regularDetails ? props.regularDetails.length : 0) * 0.04 +
        (props.importantDetails ? props.importantDetails.length : 0) * 0.04 +
        (props.otherDetails ? props.otherDetails.length : 0) * 0.052)
    );
  };

  const height = MIN_HEIGHT + calculateTicketHeight();
  return (
    <TouchableOpacity
      onPress={() =>
        props.onOrderPress
          ? props.onOrderPress(props.order.id)
          : router.push(`/orders/${props.order.id}`)
      }
      style={[
        styles.container,
        { width: props.width, height: height },
        props.style,
      ]}
    >
      <Svg
        width={props.width}
        height={height}
        viewBox={`0 0 ${props.width} ${height}`}
      >
        <Path
          d={generateTornEdgePath(props.width, height, NUM_OF_RIPS)}
          fill="#3AA1D8"
          stroke="#FFFBF3"
          strokeWidth={2}
        />
      </Svg>
      <View style={styles.content}>
        {props.title && (
          <Text
            style={styles.headerText}
            numberOfLines={1}
            lineBreakMode="tail"
          >
            {props.title}
          </Text>
        )}
        {props.regularDetails?.map((detail, index) => (
          <View key={index} style={styles.line}>
            <Text style={styles.regularText}>{detail.title}</Text>
            <Text style={styles.regularText}>{detail.data}</Text>
          </View>
        ))}
        {props.importantDetails?.map((importantDetail, index) => (
          <View key={index} style={styles.line}>
            <Text style={styles.importantText}>{importantDetail.title}</Text>
            <Text style={styles.importantText}>{importantDetail.data}</Text>
          </View>
        ))}
        {props.otherDetails?.map((otherDetail, index) => (
          <View
            key={index}
            style={[
              styles.line,
              !otherDetail.title && { justifyContent: "center" },
            ]}
          >
            {otherDetail?.title && (
              <Text style={styles.regularText}>{otherDetail.title}</Text>
            )}
            {otherDetail.data}
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    marginBottom: ScreenHeight * 0.01,
    overflow: "hidden",
  },
  content: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    padding: ScreenWidth * 0.04,
    zIndex: 2,
  },
  headerText: {
    color: "#FFFBF3",
    textAlign: "center",
    fontSize: ScreenWidth * 0.04,
    fontWeight: "bold",
    marginBottom: ScreenHeight * 0.015,
  },
  regularText: {
    color: "#FFFBF3",
    fontSize: ScreenWidth * 0.037,
  },
  line: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: ScreenHeight * 0.01,
  },
  importantText: {
    color: "#FFFBF3",
    fontSize: ScreenWidth * 0.038,
    fontWeight: "bold",
  },
});

export default OrderTicket;
