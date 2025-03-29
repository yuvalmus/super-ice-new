import { useRef, useEffect, useMemo, useState } from "react";
import {
  Animated,
  Easing,
  InteractionManager,
  Dimensions,
  Platform,
} from "react-native";
import { useDebounce } from "@/hooks/useDebounce";

// Calculate optimal number of balls based on screen width
const SCREEN_WIDTH = Dimensions.get("window").width;
const calculateBallCount = () => Math.min(5, Math.floor(SCREEN_WIDTH / 100));
const NUM_BALLS = calculateBallCount();

const ANIMATION_DURATION = 2000;
const PROGRESS_THRESHOLD = 0.05;
const PROGRESS_DEBOUNCE_DELAY = 100;

interface AnimationConfig {
  progress: number;
  maxWidth: number;
}

export const useProgressAnimation = ({
  progress,
  maxWidth,
}: AnimationConfig) => {
  const [isReady, setIsReady] = useState(false);
  const debouncedProgress = useDebounce(progress, PROGRESS_DEBOUNCE_DELAY);

  // Lazy initialization of animation values
  const ballAnimations = useRef<Animated.Value[]>();
  if (!ballAnimations.current) {
    ballAnimations.current = Array(NUM_BALLS)
      .fill(0)
      .map(() => new Animated.Value(0));
  }

  // Memoize animation configuration
  const animationConfig = useMemo(
    () => ({
      toValue: 1,
      duration: ANIMATION_DURATION,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    []
  );

  // Wait for interactions to complete before starting animations
  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });

    return () => {
      interactionPromise.cancel();
    };
  }, []);

  useEffect(() => {
    // Only animate if:
    // 1. Component is ready
    // 2. Progress is above threshold
    // 3. Not running on a low-end Android device
    if (
      !isReady ||
      debouncedProgress < PROGRESS_THRESHOLD ||
      (Platform.OS === "android" && Platform.Version <= 23)
    ) {
      return;
    }

    const animations = ballAnimations.current!.map((anim, index) => {
      const delay = (index * ANIMATION_DURATION) / (NUM_BALLS * 2);
      return Animated.sequence([
        Animated.delay(delay),
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, animationConfig),
            Animated.timing(anim, {
              ...animationConfig,
              toValue: 0,
              duration: 0,
            }),
          ])
        ),
      ]);
    });

    const animationGroup = Animated.parallel(animations);
    animationGroup.start();

    return () => {
      animationGroup.stop();
    };
  }, [debouncedProgress, isReady, animationConfig]);

  const getBallStyle = (animation: Animated.Value) => ({
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, maxWidth],
        }),
      },
      {
        scale: animation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.3, 1, 0.3],
        }),
      },
    ],
    opacity: animation.interpolate({
      inputRange: [0, 0.2, 0.8, 1],
      outputRange: [0, 1, 1, 0],
    }),
  });

  return {
    ballAnimations: ballAnimations.current,
    getBallStyle,
    NUM_BALLS,
    isReady,
  };
};
