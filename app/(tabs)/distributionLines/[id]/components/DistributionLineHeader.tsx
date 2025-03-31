import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DistributionLine } from "@/models/DistributionLine";
import { DistributionArea } from "@/models/DistributionArea";
import { drivers } from "@/mock/drivers";
import { Ionicons } from "@expo/vector-icons";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import DistributionAreasList from "./DistributionAreasList";
import { getDistributionAreasForLine } from "@/utils/DistributionArea/distributionAreaUtils";
import { formatDateWithDay } from "@/utils/Date/dateUtils";

interface DistributionLineHeaderProps {
  distributionLine: DistributionLine;
}

const DistributionLineHeader = (props: DistributionLineHeaderProps) => {
  const [distributionAreas, setDistributionAreas] = useState<
    DistributionArea[]
  >([]);

  useEffect(() => {
    const areas = getDistributionAreasForLine(props.distributionLine.id);
    setDistributionAreas(areas);
  }, [props.distributionLine.id]);

  const getDriverName = () => {
    const driver = drivers.find(
      (driver) => driver.id === props.distributionLine.driverId
    );
    return driver?.name || "לא שויך";
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <View style={styles.iconContainer}>
            <Ionicons name="person" size={ScreenWidth * 0.04} color="white" />
          </View>
          <Text style={styles.infoLabel}>נהג משויך:</Text>
          <Text style={styles.infoValue}>{getDriverName()}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <View style={styles.iconContainer}>
            <Ionicons name="calendar" size={ScreenWidth * 0.04} color="white" />
          </View>
          <Text style={styles.infoLabel}>תאריך יציאה:</Text>
          <Text style={styles.infoValue}>
            {formatDateWithDay(props.distributionLine.scheduledDate)}
          </Text>
        </View>
      </View>

      {distributionAreas.length > 0 && (
        <DistributionAreasList areas={distributionAreas} />
      )}

      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: ScreenWidth * 0.03,
    marginHorizontal: ScreenWidth * 0.04,
    marginBottom: ScreenWidth * 0.04,
    marginTop: ScreenWidth * 0.04,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: ScreenHeight * 0.005,
  },
  iconContainer: {
    backgroundColor: "#21a7fd",
    height: ScreenHeight * 0.035,
    aspectRatio: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: ScreenWidth * 0.02,
  },
  infoLabel: {
    fontSize: ScreenWidth * 0.038,
    color: "#666",
    marginHorizontal: ScreenWidth * 0.01,
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: ScreenWidth * 0.044,
    marginLeft: ScreenWidth * 0.01,
    color: "#333",
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginTop: ScreenHeight * 0.01,
  },
});

export default DistributionLineHeader;
