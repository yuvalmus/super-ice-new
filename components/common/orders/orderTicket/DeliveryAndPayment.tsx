import { DeliveryDoc, PaymentMethod } from "@/models/Order";
import { ReactNode } from "react";
import { ColorValue, Image, ImageStyle, StyleProp } from "react-native";

const cash = require("@/assets/images/cash.png");
const cheque = require("@/assets/images/cheque.png");
const transfer = require("@/assets/images/bankTransfer.png");

export const DeliveryDocColor: Record<DeliveryDoc, ColorValue> = {
  invoice: "white",
  receipt: "red",
  deliveryNote: "yellow",
};

export const DeliveryDocumentToHebrew: Record<DeliveryDoc, string> = {
  invoice: "חשבונית",
  receipt: "קבלה",
  deliveryNote: "תעודת משלוח",
};

const paymentMethodImageStyle: StyleProp<ImageStyle> = {
  height: "100%",
  aspectRatio: 1,
};

export const PaymentMethodImage: Record<PaymentMethod, ReactNode> = {
  cash: <Image source={cash} style={paymentMethodImageStyle} />,
  cheque: <Image source={cheque} style={paymentMethodImageStyle} />,
  transfer: <Image source={transfer} style={paymentMethodImageStyle} />,
};
