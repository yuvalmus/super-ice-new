import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import StartDistributionLine from "@/components/distributionLinesScreen/startDistributionLine/StartDistributionLine";
import DistributionStats from "./DistributionStats";
import { distributionLines } from "@/mock/distributionLines";
import { drivers } from "@/mock/drivers";
import { ScreenWidth, ScreenHeight } from "@/constants/Dimensions";
import { useAuth } from "@/contexts/AuthContext";

const ActiveDistributionLineStats = () => {
  const { user } = useAuth();

  const activeDistributionLine = useMemo(() => {
    if (!user?.id) return null;

    const currentDriver = drivers.find((driver) => driver.id === user.id);
    if (!currentDriver?.activeDistributionLineId) return null;

    return distributionLines.find(
      (line) => line.id === currentDriver.activeDistributionLineId
    );
  }, [drivers, user]);

  return (
    <>
      {activeDistributionLine ? (
        <View>
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
