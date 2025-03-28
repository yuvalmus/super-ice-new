import { ScreenWrapper } from "@/components/ScreenWrapper";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DistributionLineCard from "@/components/distributionLinesScreen/distributionLineCard/DistributionLineCard";
import { distributionLines } from "@/mock/distributionLines";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { userState } from "@/mock/userState";
import { useMemo, useState } from "react";
import { drivers } from "@/mock/drivers";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { compareDates } from "@/utils/Date/dateUtils";
import { Ionicons } from "@expo/vector-icons";
import ActiveDistributionLineStats from "@/components/common/distributionStats/ActiveDistributionLineStats";

type DistributionLineFilter = "הקווים שלי" | "קווים אחרים";
const SegmentIndices: Record<DistributionLineFilter, number> = {
  "קווים אחרים": 0,
  "הקווים שלי": 1,
} as const;
type SegmentType = keyof typeof SegmentIndices;

export default function DistributionLineScreen() {
  const [selectedIndex, setSelectedIndex] = useState<number>(
    SegmentIndices["הקווים שלי"]
  );

  const activeDistributionLine = useMemo(() => {
    const currentDriver = drivers.find(
      (driver) => driver.id === userState.userId
    );
    return distributionLines.find(
      (line) => line.driverId === currentDriver?.activeDistributionLineId
    );
  }, [drivers, userState]);

  const filteredDistributionLines = useMemo(() => {
    const currentDriver = drivers.find(
      (driver) => driver.id === userState.userId
    );

    const lines =
      selectedIndex === SegmentIndices["הקווים שלי"]
        ? distributionLines.filter(
            (line) => line.driverId === currentDriver?.id
          )
        : distributionLines.filter(
            (line) => line.driverId !== currentDriver?.id
          );

    return lines.sort((a, b) => compareDates(a.scheduledDate, b.scheduledDate));
  }, [selectedIndex, distributionLines, drivers, userState]);

  return (
    <ScreenWrapper
      title="רשימת קווי חלוקה"
      topButton={
        <TouchableOpacity
          style={{ alignSelf: "flex-start" }}
          onPress={() => {}}
        >
          <Ionicons name="add" size={28} color="#001B61" />
        </TouchableOpacity>
      }
      disableScroll
    >
      <ActiveDistributionLineStats />
      <SegmentedControl
        values={Object.keys(SegmentIndices) as SegmentType[]}
        selectedIndex={selectedIndex}
        style={styles.segmentedControl}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
      />

      <FlatList
        data={filteredDistributionLines}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {}}>
            <DistributionLineCard
              distributionLine={item}
              style={{ marginTop: ScreenHeight * 0.02 }}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingBottom: activeDistributionLine
            ? ScreenHeight * 0.4
            : ScreenHeight * 0.25,
        }}
        ListEmptyComponent={() => (
          <Text style={styles.noResultsTextStyle}>אין תוצאות מתאימות</Text>
        )}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  noResultsTextStyle: {
    fontSize: ScreenWidth * 0.06,
    color: "#3AA1D8",
    textAlign: "center",
    marginVertical: ScreenHeight * 0.04,
  },
  segmentedControl: {
    marginTop: ScreenHeight * 0.015,
    marginBottom: ScreenHeight * 0.005,
    width: "80%",
    alignSelf: "center",
  },
});
