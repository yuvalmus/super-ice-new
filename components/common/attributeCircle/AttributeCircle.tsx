import { Platform, StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScreenWidth } from "@/constants/Dimensions";

type AttributeImportance = "primary" | "secondary";

const AttributeImportanceGradient: Record<AttributeImportance, string[]> = {
  primary: ["#21a7fd", "#8FCCE3"],
  secondary: ["#4DB6F9", "white"],
};

interface AttributeCircleProps {
  data: ReactNode;
  title?: string;
  attributeImportance: AttributeImportance;
}

const AttributeCircle = (props: AttributeCircleProps) => {
  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={AttributeImportanceGradient[props.attributeImportance]}
        style={styles.dataContainer}
      >
        {typeof props.data === "string" ? (
          <Text style={styles.dataStyle}>{props.data}</Text>
        ) : (
          props.data
        )}
      </LinearGradient>
      {props.title && <Text style={styles.titleStyle}>{props.title}</Text>}
    </View>
  );
};

export default AttributeCircle;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "70%",
    width: "auto",
    gap: 5,
  },
  dataContainer: {
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    aspectRatio: 1,
    ...(Platform.OS === "ios" && {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.29,
      shadowRadius: 3,
    }),
    ...(Platform.OS === "android"
      ? {
          elevation: 5,
        }
      : null),
  },
  dataStyle: {
    color: "black",
    fontSize: ScreenWidth * 0.04,
  },
  titleStyle: {
    fontSize: ScreenWidth * 0.03,
    textAlign: "center",
    fontWeight: "400",
  },
});
