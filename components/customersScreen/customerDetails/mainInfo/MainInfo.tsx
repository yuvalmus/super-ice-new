import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { useCustomer } from "@/app/(tabs)/customers/_layout";
import { distributionAreas } from "@/mock/distributionAreas";

const MainInfo = () => {
  const { customerDetails } = useCustomer();

  const distributionArea = distributionAreas.find(
    (area) => area.id === customerDetails?.distributionAreaId
  );

  return (
    <View style={styles.mainInfoContainer}>
      <View style={styles.middleInfoContainer}>
        <Text numberOfLines={1} style={styles.businessNameStyle}>
          {customerDetails?.name}
        </Text>
        <View style={styles.businessAreaContainer}>
          <Text numberOfLines={1} style={styles.distributionAreaStyle}>
            {distributionArea?.name}
          </Text>
          <Text numberOfLines={1} style={styles.addressStyle}>
            {customerDetails?.address}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MainInfo;

const styles = StyleSheet.create({
  mainInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#8FCCE3",
  },
  middleInfoContainer: {
    alignItems: "center",
    flex: 1,
  },
  businessNameStyle: {
    color: "#001B61",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: ScreenWidth * 0.06,
  },
  businessAreaContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  distributionAreaStyle: {
    fontSize: ScreenWidth * 0.036,
    color: "#21a7fd",
  },
  addressStyle: {
    fontSize: ScreenWidth * 0.036,
    paddingTop: ScreenHeight * 0.02,
  },
});
