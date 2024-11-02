import { ScreenHeight } from "@/constants/Dimensions";
import { Ionicons } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import {
  StyleSheet,
  StatusBar,
  ImageBackground,
  GestureResponderEvent,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const bg = require("@/assets/images/bg.jpg");

interface IconButtonProps extends ComponentProps<typeof Ionicons> {
  onPress: (event: GestureResponderEvent) => void;
}

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: object;
  topButton?: IconButtonProps;
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
        <View style={styles.topButtonContainer}>
          <TouchableOpacity onPress={props.topButton.onPress}>
            <Ionicons {...{ ...props.topButton, onPress: undefined }} />
          </TouchableOpacity>
        </View>
      )}
      <ScrollView contentContainerStyle={styles.screenScrollViewStyle}>{props.children}</ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topButtonContainer: {
    width: "100%",
  },
  screenScrollViewStyle: {
    paddingBottom: ScreenHeight * 0.06
  }
});
