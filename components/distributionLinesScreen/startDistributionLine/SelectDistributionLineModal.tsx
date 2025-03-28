import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import SwipeableModal from "@/components/common/swipeableModal/SwipeableModal";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { distributionLines } from "@/mock/distributionLines";
import { userState } from "@/mock/userState";
import DistributionLineCard from "../distributionLineCard/DistributionLineCard";

interface SelectDistributionLineModalProps {
  isVisible: boolean;
  onSelect: (selectedLineId: number) => void;
  onClose: () => void;
}

const SelectDistributionLineModal = (
  props: SelectDistributionLineModalProps
) => {
  const [selectedLineId, setSelectedLineId] = useState<number | null>(null);
  const driverLines = distributionLines.filter(
    (line) => line.driverId === userState.userId && !line.isCompleted
  );

  const handleClose = () => {
    setSelectedLineId(null);
    props.onClose();
  };

  const handleSelect = (lineId: number) => {
    setSelectedLineId(lineId);
  };

  return (
    <SwipeableModal isVisible={props.isVisible} onClose={handleClose}>
      <View style={styles.container}>
        <Text style={styles.title}>בחר קו חלוקה</Text>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          {driverLines.map((line, index) => (
            <View key={line.id} style={index > 0 && styles.cardMargin}>
              <Pressable
                onPress={() => handleSelect(line.id)}
                style={({ pressed }) => [
                  styles.cardWrapper,
                  selectedLineId === line.id && styles.selectedCard,
                  pressed && styles.pressed,
                ]}
              >
                <DistributionLineCard distributionLine={line} />
              </Pressable>
            </View>
          ))}
        </ScrollView>
        {selectedLineId && (
          <Pressable
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => {
              // TODO: set the selected line as the active line for the driver
              props.onSelect(selectedLineId);
              handleClose();
            }}
          >
            <Text style={styles.startButtonText}>התחל קו חלוקה</Text>
          </Pressable>
        )}
      </View>
    </SwipeableModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: ScreenHeight * 0.04,
  },
  title: {
    fontSize: ScreenWidth * 0.06,
    fontWeight: "bold",
    color: "#001B61",
    textAlign: "center",
    marginBottom: ScreenHeight * 0.02,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: ScreenWidth * 0.05,
    paddingBottom: ScreenHeight * 0.02,
  },
  cardWrapper: {
    borderRadius: 30,
    overflow: "hidden",
    transform: [{ scale: 1 }],
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  buttonPressed: {
    opacity: 0.8,
  },
  cardMargin: {
    marginTop: ScreenHeight * 0.02,
  },
  selectedCard: {
    borderColor: "#21a7fd",
    borderWidth: 2.5,
    borderRadius: 30,
  },
  startButton: {
    backgroundColor: "#21a7fd",
    margin: ScreenWidth * 0.05,
    padding: ScreenHeight * 0.015,
    borderRadius: 10,
    alignItems: "center",
  },
  startButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: ScreenWidth * 0.045,
  },
});

export default SelectDistributionLineModal;
