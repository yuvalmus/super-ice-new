import { StyleSheet, View } from "react-native";
import React from "react";
import AttributeCircle from "@/components/common/attributeCircle/AttributeCircle";
import { useCustomer } from "@/app/(tabs)/customers/_layout";
import { freezers } from "@/mock/freezers";
import { ScreenHeight } from "@/constants/Dimensions";

const CustomerAttributes = () => {
  const { customerDetails } = useCustomer();

  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <View style={styles.attributesContainer}>
        <AttributeCircle
          data={customerDetails?.businessNumber.toString() ?? ""}
          title="מס' ברווחית"
          attributeImportance="primary"
        />
        <AttributeCircle
          data={customerDetails?.bagPrice2kg + "₪"}
          title='מחיר 2 ק"ג'
          attributeImportance="secondary"
        />
        <AttributeCircle
          data={
            customerDetails?.freezerId !== null
              ? freezers
                  .find((freezer) => freezer.id === customerDetails?.freezerId)
                  ?.capacity.toString() ?? ""
              : "אין"
          }
          title="תכולת מקפיא"
          attributeImportance="secondary"
        />
      </View>
    </View>
  );
};

export default CustomerAttributes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8FCCE3",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  separator: {
    height: 1,
    width: "80%",
    backgroundColor: "#BBEAF7",
    alignSelf: "center",
    marginTop: ScreenHeight * 0.02,
  },
  attributesContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: ScreenHeight * 0.1,
    marginVertical: ScreenHeight * 0.02,
  },
});
