import React, { useState, useRef } from "react";
import { Image, Animated, PanResponder, StyleSheet } from "react-native";
import { ScreenWidth } from "@/constants/Dimensions";

const greenCheckMarkIcon = require("@/assets/images/greenCheckMark.png");

interface SwipeHandlerProps extends React.PropsWithChildren {
  isActive: boolean;
  onComplete?: () => void;
}

const SwipeHandler = (props: SwipeHandlerProps) => {
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);

  const horizontalOffset = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;

  const SWIPE_THRESHOLD = ScreenWidth * 0.05;
  const SWIPE_SUCCESS_THRESHOLD = ScreenWidth * 0.1;

  // Handle completion when swiping right
  const onComplete = () => {
    props.onComplete?.();

    // Reset position with animation
    Animated.timing(horizontalOffset, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setIsSwipeActive(false);
      setShowCheckmark(false);
    });

    // Fade out the check mark
    Animated.timing(opacityValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only respond to horizontal movements and not during drag operations
        const shouldRespond =
          !props.isActive &&
          Math.abs(gestureState.dx) > 10 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 2;

        if (shouldRespond) {
          setIsSwipeActive(true);
          opacityValue.setValue(0);
        }
        return shouldRespond;
      },
      onPanResponderMove: (evt, gestureState) => {
        // Only allow swipe right
        if (gestureState.dx > 0) {
          horizontalOffset.setValue(gestureState.dx);

          // Start showing checkmark when swiping past threshold
          if (gestureState.dx > SWIPE_THRESHOLD) {
            setShowCheckmark(true);
            const opacity =
              (gestureState.dx - SWIPE_THRESHOLD) /
              (SWIPE_SUCCESS_THRESHOLD - SWIPE_THRESHOLD);
            opacityValue.setValue(Math.min(opacity, 1));
          } else {
            opacityValue.setValue(0);
          }
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > SWIPE_SUCCESS_THRESHOLD) {
          // Swiped far enough to trigger completion
          onComplete();
        } else {
          // Reset position with animation
          Animated.timing(horizontalOffset, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }).start();

          // Hide the check mark
          setShowCheckmark(false);
          setIsSwipeActive(false);
        }
      },
    })
  ).current;

  const swipeStyles = {
    transform: [{ translateX: horizontalOffset }],
  };

  const checkMarkStyle = {
    opacity: opacityValue,
  };

  return (
    <Animated.View style={swipeStyles} {...panResponder.panHandlers}>
      {showCheckmark && (
        <Animated.View style={[styles.swipeCheckmarkContainer, checkMarkStyle]}>
          <Image source={greenCheckMarkIcon} style={styles.swipeCheckmark} />
        </Animated.View>
      )}

      {props.children}
    </Animated.View>
  );
};

export default SwipeHandler;

const styles = StyleSheet.create({
  swipeCheckmarkContainer: {
    position: "absolute",
    left: -ScreenWidth * 0.15,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: ScreenWidth * 0.15,
    zIndex: 10,
  },
  swipeCheckmark: {
    width: ScreenWidth * 0.1,
    height: ScreenWidth * 0.1,
  },
});
