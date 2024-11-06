import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useState } from "react";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownFieldProps {
  dropdownOptions: DropdownOption[];
  title: string;
  value: string;
  onChange?: (item: DropdownOption) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

const DropdownField = (props: DropdownFieldProps) => {
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const renderItem = (item: DropdownOption) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldTitle}>{props.title}</Text>
      <View style={styles.fieldInputContainer}>
        <Dropdown
          style={[styles.fieldInputStyle, props.style]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={props.dropdownOptions}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={props.placeholder}
          value={value}
          onChange={(item) => {
            setValue(item.value);
          }}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default DropdownField;

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
    height: ScreenHeight * 0.055,
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
    fontSize: ScreenWidth * 0.03,
  },
  icon: {
    marginLeft: ScreenWidth * 0.03,
  },
  item: {
    padding: ScreenWidth * 0.04,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: ScreenWidth * 0.04,
  },
  placeholderStyle: {
    fontSize: ScreenWidth * 0.04,
    direction: "rtl",
    textAlign: "right",
  },
  selectedTextStyle: {
    fontSize: ScreenWidth * 0.04,
    direction: "rtl",
  },
  iconStyle: {
    width: ScreenHeight * 0.02,
    height: ScreenHeight * 0.02,
  },
});
