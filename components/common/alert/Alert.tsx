import React, { useEffect, useRef, memo } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
  Pressable,
} from "react-native";
import { BlurView } from "expo-blur";
import { ScreenWidth, ScreenHeight } from "@/constants/Dimensions";

type ButtonStyle = "default" | "cancel" | "destructive";

interface AlertButton {
  text: string;
  onPress: () => void;
  style?: ButtonStyle;
}

interface AlertProps {
  visible: boolean;
  title: string;
  message: string;
  buttons: AlertButton[];
  onDismiss?: () => void;
}

const ANIMATION_CONFIG = {
  fadeIn: {
    duration: 200,
    toValue: 1,
  },
  fadeOut: {
    duration: 150,
    toValue: 0,
  },
  scaleIn: {
    friction: 8,
    tension: 40,
    toValue: 1,
  },
  scaleOut: {
    duration: 150,
    toValue: 0.3,
  },
} as const;

const Alert = memo<AlertProps>(
  ({ visible, title, message, buttons, onDismiss }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
      if (visible) {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            ...ANIMATION_CONFIG.fadeIn,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            ...ANIMATION_CONFIG.scaleIn,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            ...ANIMATION_CONFIG.fadeOut,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            ...ANIMATION_CONFIG.scaleOut,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }, [visible, fadeAnim, scaleAnim]);

    const handleButtonPress = (button: AlertButton) => {
      button.onPress();
      onDismiss?.();
    };

    const renderButton = (button: AlertButton, index: number) => (
      <React.Fragment key={index}>
        <TouchableOpacity
          style={[styles.button, getButtonStyle(button.style)]}
          onPress={() => handleButtonPress(button)}
        >
          <Text style={getButtonTextStyle(button.style)}>{button.text}</Text>
        </TouchableOpacity>
        {index < buttons.length - 1 && <View style={styles.buttonDivider} />}
      </React.Fragment>
    );

    return (
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={onDismiss}
      >
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <BlurView intensity={20} style={StyleSheet.absoluteFill} />
          <Pressable style={StyleSheet.absoluteFill} onPress={onDismiss} />
          <Animated.View
            style={[
              styles.alertContainer,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            <View style={styles.contentContainer}>
              <Text style={[styles.title, { textAlign: "right" }]}>
                {title}
              </Text>
              <Text style={[styles.message, { textAlign: "center" }]}>
                {message}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              {buttons.map(renderButton)}
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
    );
  }
);

const getButtonStyle = (style?: ButtonStyle) => {
  switch (style) {
    case "destructive":
      return styles.destructiveButton;
    case "cancel":
      return styles.cancelButton;
    default:
      return styles.defaultButton;
  }
};

const getButtonTextStyle = (style?: ButtonStyle) => {
  switch (style) {
    case "destructive":
      return styles.destructiveButtonText;
    case "cancel":
      return styles.cancelButtonText;
    default:
      return styles.defaultButtonText;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  alertContainer: {
    width: ScreenWidth * 0.85,
    backgroundColor: "white",
    borderRadius: ScreenWidth * 0.05,
    overflow: "hidden",
    zIndex: 1,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: ScreenHeight * 0.002 },
        shadowOpacity: 0.25,
        shadowRadius: ScreenWidth * 0.01,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  contentContainer: {
    padding: ScreenWidth * 0.05,
  },
  title: {
    fontSize: ScreenWidth * 0.05,
    fontWeight: "600",
    marginBottom: ScreenHeight * 0.01,
    color: "#000",
    writingDirection: "rtl",
  },
  message: {
    fontSize: ScreenWidth * 0.04,
    color: "#666",
    lineHeight: ScreenWidth * 0.055,
    writingDirection: "rtl",
  },
  buttonContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  button: {
    flex: 1,
    paddingVertical: ScreenHeight * 0.015,
    alignItems: "center",
  },
  buttonDivider: {
    width: 1,
    backgroundColor: "#eee",
  },
  defaultButton: {
    backgroundColor: "transparent",
  },
  defaultButtonText: {
    color: "#007AFF",
    fontSize: ScreenWidth * 0.035,
    fontWeight: "600",
    writingDirection: "rtl",
  },
  cancelButton: {
    backgroundColor: "transparent",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: ScreenWidth * 0.035,
    fontWeight: "600",
    writingDirection: "rtl",
  },
  destructiveButton: {
    backgroundColor: "transparent",
  },
  destructiveButtonText: {
    color: "#FF3B30",
    fontSize: ScreenWidth * 0.035,
    fontWeight: "600",
    writingDirection: "rtl",
  },
});

Alert.displayName = "Alert";

export default Alert;
