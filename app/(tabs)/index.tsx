import DistributionStats from "@/components/common/distributionStats/DistributionStats";
import DriversCardsSection from "@/components/homeScreen/DriversCardsSection";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { ScreenWidth, ScreenHeight } from "@/constants/Dimensions";
import { Image, StyleSheet } from "react-native";

const superIceTruck = require("@/assets/images/superIceTruck.png");

export default function HomeScreen() {
  return (
    <ScreenWrapper>
      <Image
        source={superIceTruck}
        alt="superIceTruck"
        style={styles.truckImage}
      />
      <DistributionStats />
      <DriversCardsSection />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  truckImage: {
    width: ScreenWidth,
    height: ScreenHeight * 0.3,
  },
});
