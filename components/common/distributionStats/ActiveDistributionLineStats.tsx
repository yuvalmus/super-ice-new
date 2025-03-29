import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import StartDistributionLine from "@/components/distributionLinesScreen/startDistributionLine/StartDistributionLine";
import DistributionStats from "./DistributionStats";
import { distributionLines } from "@/mock/distributionLines";
import { drivers } from "@/mock/drivers";
import { userState } from "@/mock/userState";
import { ScreenWidth, ScreenHeight } from "@/constants/Dimensions";

const ActiveDistributionLineStats = () => {
  const activeDistributionLine = useMemo(() => {
    const currentDriver = drivers.find(
      (driver) => driver.id === userState.userId
    );
    return distributionLines.find(
      (line) => line.driverId === currentDriver?.activeDistributionLineId
    );
  }, [drivers, userState]);

  return (
    <>
      {activeDistributionLine ? (
        <View>
          <Text style={styles.activeLineTitle}>קו חלוקה פעיל:</Text>
          <DistributionStats statsBoxStyle={styles.statsBox} />
        </View>
      ) : (
        <StartDistributionLine />
      )}
    </>
  );
};

export default ActiveDistributionLineStats;

const styles = StyleSheet.create({
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
