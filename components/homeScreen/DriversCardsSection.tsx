import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import DriverCard from "./DriverCard";
import { ScreenWidth, ScreenHeight } from "@/constants/Dimensions";
import { Driver } from "@/models/Driver";
import { drivers } from "@/mock/drivers";
import { userState } from "@/mock/userState";

const DriversCardsSection = () => {
  const currentDriver = drivers.find(
    (driver) => driver.id === userState.userId
  );
  const otherDrivers = drivers.filter(
    (driver) => !(driver.id === userState.userId)
  );

  return (
    <View style={styles.driversSectionContainer}>
      <Text style={styles.title}>נהגים</Text>
      <ScrollView
        horizontal
        persistentScrollbar={true}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.scrollViewStyle}
        contentOffset={{ x: ScreenWidth, y: 0 }}
      >
        <DriverCard
          driver={currentDriver as Driver}
          style={{ marginLeft: ScreenWidth * 0.04 }}
        />
        {otherDrivers.map((driver: Driver, index) => (
          <DriverCard
            key={index}
            driver={driver}
            style={
              index !== otherDrivers.length - 1 && { marginLeft: ScreenWidth * 0.04 }
            }
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default DriversCardsSection;

const styles = StyleSheet.create({
  driversSectionContainer: {
    paddingHorizontal: ScreenWidth * 0.05,
    paddingTop: ScreenHeight * 0.01,
  },
  title: {
    fontSize: ScreenWidth * 0.06,
    fontWeight: "bold",
    color: "#001B61",
    textAlign: "right",
  },
  scrollViewStyle: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
});
