import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import DriverCard from "./DriverCard";
import { ScreenWidth, ScreenHeight } from "@/constants/Dimensions";
import { Driver } from "@/models/Driver";
import { drivers } from "@/mock/drivers";
import { useAuth } from "@/contexts/AuthContext";

const DriversCardsSection = () => {
  const { user } = useAuth();

  const currentUser = useMemo(() => {
    if (!user?.id) return null;
    return drivers.find((driver) => driver.id === user.id);
  }, [drivers, user]);

  const otherDrivers = useMemo(() => {
    if (!user?.id) return drivers;
    return drivers.filter((driver) => driver.id !== user.id);
  }, [drivers, user]);

  const hasCurrentDriver = !!currentUser;

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
        {hasCurrentDriver && (
          <DriverCard
            driver={currentUser as Driver}
            style={{ marginRight: ScreenWidth * 0.04 }}
          />
        )}

        {otherDrivers.map((driver: Driver, index) => (
          <DriverCard
            key={driver.id}
            driver={driver}
            style={
              index !== otherDrivers.length - 1 && {
                marginRight: ScreenWidth * 0.04,
              }
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
  },
  scrollViewStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
});
