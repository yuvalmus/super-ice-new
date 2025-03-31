import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  StyleSheet,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { debounce } from "lodash";

const searchIcon = require("@/assets/images/search.png");
const micIcon = require("@/assets/images/mic.png");
const clearIcon = require("@/assets/images/clear.png");

interface SearchBarProps {
  placeholder?: string;
  onChangeText?: (newValue: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const [term, setTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const handleTermChange = (newValue: string) => {
    setTerm(newValue);
    debouncedUpdateSearchTerm(newValue);
  };

  const debouncedUpdateSearchTerm = useMemo(
    () =>
      debounce((newValue: string) => {
        setSearchTerm(newValue);
        props.onChangeText && props.onChangeText(newValue);
      }, 500),
    [props.onChangeText]
  );

  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", () => {
      setIsKeyboardOpen(true);
    });
    Keyboard.addListener("keyboardWillHide", () => {
      setIsKeyboardOpen(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchIconContainer}>
          <Image source={searchIcon} style={styles.iconStyle} />
        </View>
        <TextInput
          style={styles.searchInputStyle}
          value={term}
          onChangeText={handleTermChange}
          placeholder={props.placeholder}
        />
        <TouchableOpacity style={styles.micIconContainer}>
          <Image source={micIcon} style={styles.iconStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.clearIconContainer}
          onPress={() => handleTermChange("")}
        >
          <Image source={clearIcon} style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
      {isKeyboardOpen && (
        <TouchableOpacity
          style={styles.cancelTextContainer}
          onPress={() => Keyboard.dismiss()}
        >
          <Text style={styles.cancelTextStyle}>בטל</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: ScreenHeight * 0.05,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: ScreenHeight * 0.02,
  },
  searchBarContainer: {
    width: "89%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  searchIconContainer: {
    height: "100%",
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  iconStyle: {
    width: "45%",
    height: "45%",
  },
  searchInputStyle: {
    flex: 8,
    width: "80%",
    height: "100%",
    textAlign: "right",
    fontSize: ScreenWidth * 0.04,
  },
  micIconContainer: {
    height: "100%",
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  clearIconContainer: {
    height: "100%",
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelTextContainer: {
    width: "15%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelTextStyle: {
    fontSize: ScreenWidth * 0.045,
    color: "#21a7fd",
  },
});
