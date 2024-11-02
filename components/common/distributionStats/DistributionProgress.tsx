import {
  View,
  Text,
  Image,
  I18nManager,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import React from "react";
import { Bar } from "react-native-progress";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";

interface DistributionProgressProps {
  amount: number;
  capacity: number;
  statImageSrc: ImageSourcePropType | undefined;
}

const DistributionProgress = (props: DistributionProgressProps) => {
  const getAmountProvidedMargin = (): number => {
    const MAX_AMOUNT_TEXT_LENGTH = 4;
    const missingCharsAmount =
      MAX_AMOUNT_TEXT_LENGTH - String(props.amount).length;
    return ScreenWidth * (missingCharsAmount * 0.022);
  };

  const getProgress = (): number => {
    return props.amount / props.capacity;
  };

  return (
    <View style={styles.progressContainer}>
      <Bar
        style={{ transform: [{ scaleX: I18nManager.isRTL ? 1 : -1 }] }}
        progress={getProgress()}
        width={ScreenWidth * 0.65}
        height={ScreenHeight * 0.023}
        borderRadius={100}
        color="#21a7fd"
        unfilledColor="#D9D9D9"
        borderWidth={0}
      />
      {/* amount text */}
      <Text
        style={[
          styles.progressBarText,
          {
            left: ScreenWidth * 0.21,
            marginLeft: getAmountProvidedMargin(),
          },
        ]}
      >
        {props.amount}
      </Text>
      {/* slash */}
      <Text
        style={[
          styles.progressBarText,
          {
            left: ScreenWidth * 0.32,
          },
        ]}
      >
        /
      </Text>
      {/* capacity text */}
      <Text
        style={[
          styles.progressBarText,
          {
            left: ScreenWidth * 0.35,
          },
        ]}
      >
        {props.capacity}
      </Text>
      <Image source={props.statImageSrc} style={styles.imageStyle} />
    </View>
  );
};

export default DistributionProgress;

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "89%",
  },
  imageStyle: {
    width: "11%",
    aspectRatio: 1,
  },
  progressBarText: {
    position: "absolute",
    fontSize: ScreenWidth * 0.039,
    fontWeight: "bold",
  },
});
