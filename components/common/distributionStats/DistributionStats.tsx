import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import Date from "@/utils/Date/Date";
import DistributionProgress from "./DistributionProgress";
import { ScreenWidth, ScreenHeight } from "@/constants/Dimensions";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

const stackedSacks = require("@/assets/images/stackedSacks.png");
const distributionRoute = require("@/assets/images/distributionRoute.png");

const getTodaysTitle = (): string => {
  return `קו חלוקה - יום ${Date.getCurrentDayName()} ${Date.getCurrentDate()}`;
};

interface DistributionStatsProps {
  customTitle?: string;
  collapsable?: boolean;
}

export const DistributionStats = (props: DistributionStatsProps) => {
  const [expanded, setExpanded] = useState(true);
  const [animation] = useState(new Animated.Value(1));
  const [arrowRotation] = useState(new Animated.Value(1));
  const router = useRouter();

  const toggleExpansion = () => {
    if (expanded) {
      // Collapse
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(arrowRotation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => setExpanded(false));
    } else {
      // Expand
      setExpanded(true);
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(arrowRotation, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const heightInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, ScreenHeight * 0.14],
  });

  const arrowRotationInterpolation = arrowRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["90deg", "0deg"], // Rotate 90 degrees when collapsed
  });

  return (
    <View style={styles.statsContainer}>
      <TouchableOpacity onPress={toggleExpansion} style={styles.header}>
        <Text style={styles.statsTitle}>
          {props.customTitle ? props.customTitle : getTodaysTitle()}
        </Text>
        <Animated.View
          style={{ transform: [{ rotate: arrowRotationInterpolation }] }}
        >
          <Ionicons name="caret-down" size={18} color="#001B61" />
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.navigate("/distributionLine")}>
        <Animated.View
          style={[styles.progressesContainer, { height: heightInterpolation }]}
        >
          {expanded && (
            <>
              <DistributionProgress
                amount={700}
                capacity={1400}
                statImageSrc={stackedSacks}
              />
              <DistributionProgress
                amount={19}
                capacity={25}
                statImageSrc={distributionRoute}
              />
            </>
          )}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default DistributionStats;

const styles = StyleSheet.create({
  statsContainer: {
    width: ScreenWidth * 0.9,
    flexDirection: "column",
    backgroundColor: "#F5F5F5",
    borderRadius: 30,
    marginTop: ScreenHeight * 0.02,
    alignItems: "center",
    paddingVertical: ScreenHeight * 0.015,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  statsTitle: {
    fontSize: ScreenWidth * 0.048,
    fontWeight: "bold",
    color: "#001B61",
    marginRight: "2%",
  },
  progressesContainer: {
    overflow: "hidden",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
});
