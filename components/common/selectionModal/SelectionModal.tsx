import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import SwipeableModal from "@/components/common/swipeableModal/SwipeableModal";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";

interface SelectionModalProps {
  isVisible: boolean;
  onSelect: (selectedIds: number[]) => void;
  onClose: () => void;
  itemIdExtractor: (item: any) => number;
  title: string;
  startButtonText: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
  items: any[];
  renderItem: (item: any) => React.ReactNode;
  multiple?: boolean;
  noItemsText: string;
  selectedBorderColor?: string;
}

const SelectionModal = (props: SelectionModalProps) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleClose = () => {
    setSelectedItems([]);
    props.onClose();
  };

  const handleSelect = (itemId: number) => {
    if (props.multiple) {
      setSelectedItems((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setSelectedItems([itemId]);
    }
  };

  return (
    <SwipeableModal isVisible={props.isVisible} onClose={handleClose}>
      <View style={[styles.container, props.contentContainerStyle]}>
        <Text style={styles.title}>{props.title}</Text>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          {props.items.length > 0 ? (
            props.items.map((item, index) => {
              const itemId = props.itemIdExtractor(item);
              return (
                <View key={itemId} style={index > 0 && styles.cardMargin}>
                  <Pressable
                    onPress={() => handleSelect(itemId)}
                    style={({ pressed }) => [
                      styles.cardWrapper,
                      selectedItems.includes(itemId) && [
                        styles.selectedCard,
                        {
                          borderColor: props.selectedBorderColor || "#21a7fd",
                        },
                      ],
                      pressed && styles.pressed,
                    ]}
                  >
                    {props.renderItem(item)}
                  </Pressable>
                </View>
              );
            })
          ) : (
            <View style={styles.noItemsContainer}>
              <Text style={styles.noItemsText}>{props.noItemsText}</Text>
            </View>
          )}
        </ScrollView>
        {selectedItems.length > 0 && (
          <Pressable
            style={({ pressed }) => [
              styles.startButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => {
              props.onSelect(selectedItems);
              handleClose();
            }}
          >
            <Text style={styles.startButtonText}>{props.startButtonText}</Text>
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
  noItemsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noItemsText: {
    textAlign: "center",
    fontSize: ScreenWidth * 0.045,
    color: "#666",
  },
});

export default SelectionModal;
