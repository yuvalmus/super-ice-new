import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { LinearGradient } from "expo-linear-gradient";
import AttributeCircle from "@/components/common/attributeCircle/AttributeCircle";
import { Customer } from "@/models/Customer";
import { useRouter } from "expo-router";

interface CustomerCardProps {
  customerDetails: Customer;
}

const CustomerCard = (props: CustomerCardProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.outerContainer}
      onPress={() =>
        router.push(`/customers/${props.customerDetails.businessNumber}`)
      }
    >
      <LinearGradient
        colors={["#8FCCE3", "white"]}
        style={styles.innerContainer}
        start={[1, 0]}
        end={[0, 0]}
      >
        <AttributeCircle
          data={props.customerDetails.businessNumber.toString()}
          attributeImportance="secondary"
        />
        <View style={styles.mainDetailsContainer}>
          <Text style={styles.bussinessNameStyle} numberOfLines={1}>
            {props.customerDetails.name}
          </Text>
          <Text
            style={styles.distributionAreaTextStyle}
            numberOfLines={1}
            ellipsizeMode="middle"
          >
            {props.customerDetails.address}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomerCard;

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    height: ScreenHeight * 0.07,
    marginBottom: "5%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  innerContainer: {
    width: "100%",
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: "2%",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  mainDetailsContainer: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: "3%",
  },
  bussinessNameStyle: {
    fontSize: ScreenWidth * 0.045,
    color: "#001B61",
  },
  distributionAreaTextStyle: {
    fontSize: ScreenWidth * 0.035,
    color: "#21a7fd",
  },
});
