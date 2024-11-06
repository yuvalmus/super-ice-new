import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { Ionicons } from "@expo/vector-icons";
import React, { ComponentProps, ReactNode } from "react";
import {
  StyleSheet,
  StatusBar,
  ImageBackground,
  GestureResponderEvent,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const bg = require("@/assets/images/bg.jpg");

interface ScreenWrapperProps {
  children: React.ReactNode;
  title?: string;
  style?: StyleProp<ViewStyle>;
  topButton?: ReactNode;
  topSectionStyle?: StyleProp<ViewStyle>;
  disableScroll?: boolean; // useful when the screen has a list or different scrollview that can interfere
}

export const ScreenWrapper = (props: ScreenWrapperProps) => {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={bg}
      resizeMode="cover"
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
        props.style,
      ]}
    >
      <StatusBar barStyle="default" translucent backgroundColor="transparent" />
      {props.topButton && (
        <View style={[styles.topButtonContainer, props.topSectionStyle]}>
          {props.topButton}
        </View>
      )}
      {props.title && <Text style={styles.titleTextStyle}>{props.title}</Text>}
      {props.disableScroll ? (
        <View style={styles.screenScrollViewStyle}>{props.children}</View>
      ) : (
        <ScrollView contentContainerStyle={styles.screenScrollViewStyle}>
          {props.children}
        </ScrollView>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topButtonContainer: {
    width: "100%",
    paddingHorizontal: ScreenWidth * 0.05,
  },
  titleTextStyle: {
    color: "#001B61",
    fontSize: ScreenWidth * 0.08,
    marginRight: ScreenWidth * 0.04,
    fontWeight: "bold",
    textAlign: "right",
  },
  screenScrollViewStyle: {
    paddingBottom: ScreenHeight * 0.06,
  },
});
