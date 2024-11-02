import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { ScreenWidth } from "@/constants/Dimensions";
import { Driver } from "@/models/Driver";
const driverIcon = require("@/assets/images/driverIcon.png");

interface DriverCardProps {
  driver: Driver;
  style?: StyleProp<ViewStyle>;
}

const DriverCard = (props: DriverCardProps) => {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <View style={styles.imageContainer}>
        <Image source={driverIcon} alt="driverIcon" style={styles.image} />
      </View>
      <View style={styles.driverStatusContainer}>
        <Icon
          name={
            props.driver.activeDistributionLineId
              ? "alpha-v-circle"
              : "alpha-x-circle"
          }
          size={ScreenWidth * 0.05}
          color={props.driver.activeDistributionLineId ? "green" : "red"}
        />
        <Text style={styles.statusText}>
          {props.driver.activeDistributionLineId ? "בחלוקה" : "במנוחה"}
        </Text>
      </View>

      <View style={styles.driverNameContainer}>
        <Text style={styles.driverNameText}>{props.driver.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DriverCard;

const styles = StyleSheet.create({
  container: {
    width: 0.23 * ScreenWidth,
    aspectRatio: 0.7,
    backgroundColor: "#FFFBF3",
    borderRadius: 20,
    shadowColor: "#121212",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.27,
    elevation: 7,
    overflow: "hidden",
  },
  imageContainer: {
    flex: 5,
    width: "100%",
    backgroundColor: "#80DEFF",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    width: "85%",
    height: "85%",
  },
  driverStatusContainer: {
    flex: 1.6,
    width: "100%",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: "#3AA1D8",
    flexDirection: "row-reverse",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  statusText: {
    fontSize: ScreenWidth * 0.03,
  },
  driverNameContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  driverNameText: {
    fontWeight: "900",
    color: "#001B61",
    fontSize: ScreenWidth * 0.038,
  },
});
