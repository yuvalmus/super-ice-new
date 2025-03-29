import React from "react";
import { Animated, StyleSheet } from "react-native";
import { ScreenHeight } from "@/constants/Dimensions";

const BALL_SIZE = ScreenHeight * 0.008;

interface AnimatedBallsProps {
  ballAnimations: Animated.Value[];
  getBallStyle: (animation: Animated.Value) => any;
  isReady?: boolean;
}

const AnimatedBalls = React.memo(function AnimatedBalls({
  ballAnimations,
  getBallStyle,
  isReady = false,
}: AnimatedBallsProps) {
  if (!isReady || !ballAnimations) {
    return null;
  }

  return (
    <>
      {ballAnimations.map((anim, index) => (
        <Animated.View key={index} style={[styles.ball, getBallStyle(anim)]} />
      ))}
    </>
  );
});

const styles = StyleSheet.create({
  ball: {
    position: "absolute",
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    top: "50%",
    marginTop: -BALL_SIZE / 2,
    left: -BALL_SIZE / 2,
  },
});

export default AnimatedBalls;
