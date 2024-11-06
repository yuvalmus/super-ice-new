import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ViewStyle } from "react-native";
import React from "react";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";

interface InputFieldProps {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  allowPaste?: boolean;
}

const TextInputField = (props: InputFieldProps) => {
  return (
    <View style={[styles.fieldContainer, props.style]}>
      <Text style={styles.fieldTitle}>{props.title}</Text>
      <View style={styles.fieldInputContainer}>
        <TextInput
          style={[styles.fieldInputStyle, props.inputStyle]}
          value={props.value}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          keyboardType="number-pad"
        />
      </View>
    </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({
  fieldContainer: {
    paddingHorizontal: ScreenWidth * 0.05,
    justifyContent: "center",
    marginBottom: ScreenHeight * 0.03,
  },
  fieldTitle: {
    fontSize: ScreenWidth * 0.045,
    color: "#001B61",
    fontWeight: "bold",
    marginBottom: ScreenHeight * 0.008,
  },
  fieldInputContainer: {
    width: "100%",
    height: ScreenHeight * 0.05,
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    paddingHorizontal: ScreenWidth * 0.03,
  },
  fieldInputStyle: {
    width: "100%",
    height: "100%",
    textAlign: "right",
    fontSize: ScreenWidth * 0.035,
  },
});
