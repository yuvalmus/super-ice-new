import DistributionStats from "@/components/common/distributionStats/DistributionStats";
import StartDistributionLine from "@/components/distributionLinesScreen/startDistributionLine/StartDistributionLine";
import DriversCardsSection from "@/components/homeScreen/DriversCardsSection";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { ScreenWidth, ScreenHeight } from "@/constants/Dimensions";
import { useMemo } from "react";
import { distributionLines } from "@/mock/distributionLines";
import { drivers } from "@/mock/drivers";
import { userState } from "@/mock/userState";
import { Image, StyleSheet, View, Text } from "react-native";
import ActiveDistributionLineStats from "@/components/common/distributionStats/ActiveDistributionLineStats";

const superIceTruck = require("@/assets/images/superIceTruck.png");

export default function HomeScreen() {
  const activeDistributionLine = useMemo(() => {
    const currentDriver = drivers.find(
      (driver) => driver.id === userState.userId
    );
    return distributionLines.find(
      (line) => line.driverId === currentDriver?.activeDistributionLineId
    );
  }, [drivers, userState]);

  return (
    <ScreenWrapper>
      <Image
        source={superIceTruck}
        alt="superIceTruck"
        style={styles.truckImage}
      />
      <ActiveDistributionLineStats />
      <DriversCardsSection />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  truckImage: {
    width: ScreenWidth,
    height: ScreenHeight * 0.3,
  },
  activeLineTitle: {
    fontSize: ScreenWidth * 0.05,
    fontWeight: "bold",
    color: "#2E5CB8",
    marginHorizontal: ScreenWidth * 0.04,
    marginTop: ScreenHeight * 0.02,
  },
  statsBox: {
    borderColor: "#21a7fd",
    borderWidth: 2.5,
  },
});
