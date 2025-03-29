import {
  View,
  Text,
  Image,
  I18nManager,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import React from "react";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { useProgressAnimation } from "./animations/useProgressAnimation";
import AnimatedBalls from "./animations/AnimatedBalls";

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

  const progressWidth = ScreenWidth * 0.65;
  const progress = getProgress();
  const { ballAnimations, getBallStyle, isReady } = useProgressAnimation({
    progress,
    maxWidth: progressWidth * progress,
  });

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: progressWidth,
              transform: [{ scaleX: I18nManager.isRTL ? 1 : -1 }],
            },
          ]}
        >
          <View
            style={[
              styles.filledProgress,
              {
                width: `${progress * 100}%`,
              },
            ]}
          >
            <AnimatedBalls
              ballAnimations={ballAnimations}
              getBallStyle={getBallStyle}
              isReady={isReady}
            />
          </View>
        </View>
      </View>
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
  progressBarContainer: {
    overflow: "hidden",
    borderRadius: 100,
    backgroundColor: "#D9D9D9",
    width: ScreenWidth * 0.65,
    height: ScreenHeight * 0.023,
  },
  progressBar: {
    height: "100%",
    overflow: "hidden",
  },
  filledProgress: {
    height: "100%",
    backgroundColor: "#21a7fd",
    position: "relative",
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
