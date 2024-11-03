import { Image, Linking, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import InteractionButton from "../interactions/InteractionButton";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { useCustomer } from "@/app/(tabs)/customers/_layout";

const userAvatarIcon = require("@/assets/images/userAvatarIcon.png");

const TopCustomerSection = () => {
  const [isNavigationPossible, setIsNavigationPossible] = useState(false);
  const { customerDetails } = useCustomer();

  const navigateToCustomer = () => {
    const address = encodeURIComponent(customerDetails?.address ?? "");
    const wazeAddressUrl = `waze:\/\/?q=${address}`;

    Linking.openURL(wazeAddressUrl).catch(() => {
      alert("האפליקציה וויז לא מותקנת בטלפון");
    });
  };

  useEffect(() => {
    const isWazeInstalled = async () => {
      const wazeUrl = `waze://`;
      setIsNavigationPossible(await Linking.canOpenURL(wazeUrl));
    };
    isWazeInstalled();
  }, [isNavigationPossible, setIsNavigationPossible]);

  return (
    <View style={styles.topSection}>
      <InteractionButton
        interactionIcon={<Ionicons name="navigate-outline" size={30} />}
        interactionName="נווט"
        onPress={navigateToCustomer}
        style={{ flex: 1 }}
        disabled={!isNavigationPossible}
      />
      <View style={styles.userAvatarContainer}>
        <Image
          source={userAvatarIcon}
          alt="user avatar"
          style={styles.userAvatarIconStyle}
        />
      </View>
      <InteractionButton
        interactionIcon={<AntDesign name="contacts" size={30} />}
        interactionName="אנשי קשר"
        onPress={() => {}}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default TopCustomerSection;

const styles = StyleSheet.create({
  topSection: {
    width: "100%",
    height: ScreenHeight * 0.17,
    flexDirection: 'row-reverse',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    padding: "3%",
    backgroundColor: "#8FCCE3",
  },
  userAvatarContainer: {
    height: '100%',
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userAvatarIconStyle: {
    height: "75%",
    aspectRatio: 1
  },
});
