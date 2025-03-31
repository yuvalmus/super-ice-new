import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DistributionArea } from "@/models/DistributionArea";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";

interface DistributionAreasListProps {
  areas: DistributionArea[];
}

const MAX_VISIBLE_AREAS = 2;

const DistributionAreasList = (props: DistributionAreasListProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const hasMoreAreas = props.areas.length > MAX_VISIBLE_AREAS;

  const visibleAreas = hasMoreAreas
    ? props.areas.slice(0, MAX_VISIBLE_AREAS)
    : props.areas;

  const renderAreaChip = (area: DistributionArea, index: number) => (
    <View
      key={area.id}
      style={[
        styles.areaChip,
        index < props.areas.length - 1 && styles.areaChipWithMargin,
      ]}
    >
      <Text style={styles.areaChipText}>{area.name}</Text>
    </View>
  );

  const showFullList = () => {
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.iconContainer}>
          <Ionicons name="location" size={ScreenWidth * 0.04} color="white" />
        </View>
        <Text style={styles.titleText}>אזורי חלוקה:</Text>
      </View>

      <View style={styles.areasContainer}>
        {visibleAreas.map((area, index) => renderAreaChip(area, index))}

        {hasMoreAreas && (
          <TouchableOpacity onPress={showFullList} style={styles.moreButton}>
            <Text style={styles.moreButtonText}>
              ...עוד {props.areas.length - MAX_VISIBLE_AREAS}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Full list modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>אזורי חלוקה בקו זה</Text>

              <FlatList
                data={props.areas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.modalAreaItem}>
                    <Text style={styles.modalAreaText}>{item.name}</Text>
                  </View>
                )}
                contentContainerStyle={styles.modalList}
              />

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>סגור</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: ScreenHeight * 0.01,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
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
  titleText: {
    fontSize: ScreenWidth * 0.038,
    color: "#666",
    fontWeight: "bold",
  },
  areasContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: ScreenHeight * 0.01,
    paddingHorizontal: ScreenWidth * 0.02,
  },
  areaChip: {
    backgroundColor: "#e6f4ff",
    borderRadius: 20,
    paddingVertical: ScreenHeight * 0.006,
    paddingHorizontal: ScreenWidth * 0.03,
    borderWidth: 1,
    borderColor: "#b3e0ff",
  },
  areaChipWithMargin: {
    marginRight: ScreenWidth * 0.02,
  },
  areaChipText: {
    color: "#21a7fd",
    fontSize: ScreenWidth * 0.035,
    fontWeight: "500",
  },
  moreButton: {
    paddingHorizontal: ScreenWidth * 0.015,
    paddingVertical: ScreenHeight * 0.006,
  },
  moreButtonText: {
    color: "#21a7fd",
    fontWeight: "bold",
    fontSize: ScreenWidth * 0.035,
    direction: "rtl",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: ScreenWidth * 0.85,
    borderRadius: 12,
    overflow: "hidden",
  },
  modalContent: {
    backgroundColor: "white",
    padding: ScreenWidth * 0.04,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: ScreenWidth * 0.055,
    fontWeight: "bold",
    color: "#333",
    marginBottom: ScreenHeight * 0.02,
  },
  modalList: {
    width: "100%",
  },
  modalAreaItem: {
    paddingVertical: ScreenHeight * 0.015,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    width: "100%",
    alignItems: "center",
  },
  modalAreaText: {
    fontSize: ScreenWidth * 0.045,
    color: "#333",
  },
  closeButton: {
    marginTop: ScreenHeight * 0.02,
    backgroundColor: "#21a7fd",
    paddingVertical: ScreenHeight * 0.01,
    paddingHorizontal: ScreenWidth * 0.08,
    borderRadius: 25,
  },
  closeButtonText: {
    color: "white",
    fontSize: ScreenWidth * 0.045,
    fontWeight: "bold",
  },
});

export default DistributionAreasList;
