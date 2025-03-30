import { distributionLines } from "@/mock/distributionLines";
import { Order } from "@/models/Order";
import { ImageSourcePropType } from "react-native";

const newOrder = require("@/assets/images/receivedOrder.png");
const pending = require("@/assets/images/pending.png");
const completedNotPaid = require("@/assets/images/completedNotPaid.png");
const completed = require("@/assets/images/completed.png");

export type OrderStatus =
  | "newOrder"
  | "pending"
  | "completedNotPaid"
  | "completed";

export const statusToText: Record<OrderStatus, string> = {
  newOrder: "הזמנה חדשה",
  pending: "ממתין לביצוע",
  completedNotPaid: "בוצע ולא שולם",
  completed: "בוצע ושולם",
};

export const statusToColor: Record<OrderStatus, string> = {
  newOrder: "#000",
  pending: "#EA9C00",
  completedNotPaid: "#ff0000",
  completed: "#38d313",
};

export const statusToIcon: Record<OrderStatus, ImageSourcePropType> = {
  newOrder,
  pending,
  completedNotPaid,
  completed,
};

export const getOrderStatus = (orderDetails: Order): OrderStatus => {
  if (orderDetails?.attachedDistributionLineId === null) return "newOrder";

  if (
    !distributionLines.find(
      (line) => line.id === orderDetails?.attachedDistributionLineId
    )?.isCompleted
  )
    return "pending";

  if (!orderDetails?.isPaid) return "completedNotPaid";

  return "completed";
};
