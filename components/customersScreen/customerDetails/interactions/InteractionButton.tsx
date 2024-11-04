import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React from "react";

interface InteractionButtonProps {
  interactionIcon: React.ReactNode;
  interactionName?: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const InteractionButton = (props: InteractionButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.interactionButtonContainer,
        props.style,
        props.disabled && {
          opacity: 0.3,
        },
      ]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      {props.interactionIcon}
      <Text>{props.interactionName}</Text>
    </TouchableOpacity>
  );
};

export default InteractionButton;

const styles = StyleSheet.create({
  interactionButtonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
