import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { ScreenHeight, ScreenWidth } from "@/constants/Dimensions";
import { IS_DEV_MODE } from "@/utils/Auth/googleAuth";

const googleLogo = require("@/assets/images/google-logo.png");
const superIceLogo = require("@/assets/images/superice-logo.png");

export default function LoginScreen() {
  const { loginWithGoogle, isLoading, user } = useAuth();
  const [localLoading, setLocalLoading] = useState(false);

  // If already logged in, redirect to home
  useEffect(() => {
    if (user) {
      console.log("User already logged in, redirecting to home");
      router.replace("/");
    }
  }, [user]);

  const handleGoogleLogin = async () => {
    try {
      setLocalLoading(true);
      console.log("Starting Google login process");
      const userFromGoogle = await loginWithGoogle();

      if (userFromGoogle) {
        console.log("Login successful, navigating to home screen");

        router.replace("/");
      } else {
        // Handle authentication failure
        console.log("Login failed");
        alert("Login failed. You may not have permission to access this app.");
        setLocalLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
      setLocalLoading(false);
    }
  };

  // Combined loading state for UI
  const showLoading = isLoading || localLoading;

  // If we're already logged in and waiting for redirect, show loading indicator
  if (user) {
    return (
      <ScreenWrapper>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#21a7fd" />
          <Text style={styles.loadingText}>כבר מחובר, מעביר לדף הבית...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Image source={superIceLogo} style={styles.logo} />

        <Text style={styles.title}>🧊סופר אייס🧊</Text>
        <Text style={styles.subtitle}>אנא התחבר כדי להמשיך</Text>

        {IS_DEV_MODE && (
          <View style={styles.devModeContainer}>
            <Text style={styles.devModeText}>
              מצב פיתוח: התחברות ללא אימות גוגל
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}
          disabled={showLoading}
        >
          {showLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Image source={googleLogo} style={styles.googleLogo} />
              <Text style={styles.buttonText}>
                {IS_DEV_MODE ? "התחבר (מצב פיתוח)" : "התחבר עם גוגל"}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: ScreenWidth * 0.8,
    marginBottom: ScreenHeight * 0.02,
  },
  title: {
    fontSize: ScreenWidth * 0.09,
    fontWeight: "bold",
    color: "#001B61",
    marginBottom: ScreenHeight * 0.06,
    textAlign: "center",
  },
  subtitle: {
    fontSize: ScreenWidth * 0.04,
    color: "#333",
    marginBottom: ScreenHeight * 0.02,
    textAlign: "center",
  },
  loadingText: {
    marginTop: ScreenHeight * 0.02,
    fontSize: ScreenWidth * 0.04,
    color: "#333",
  },
  devModeContainer: {
    backgroundColor: "#f8d7da",
    padding: ScreenWidth * 0.02,
    borderRadius: ScreenWidth * 0.01,
    marginBottom: ScreenHeight * 0.02,
  },
  devModeText: {
    color: "#721c24",
    fontSize: ScreenWidth * 0.035,
    textAlign: "center",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4285F4",
    paddingVertical: ScreenWidth * 0.02,
    paddingHorizontal: ScreenWidth * 0.04,
    borderRadius: ScreenWidth * 0.01,
    elevation: 3,
  },
  googleLogo: {
    width: ScreenWidth * 0.06,
    height: ScreenWidth * 0.06,
    marginRight: ScreenWidth * 0.02,
    backgroundColor: "white",
    borderRadius: ScreenWidth * 0.03,
  },
  buttonText: {
    color: "white",
    fontSize: ScreenWidth * 0.04,
    fontWeight: "bold",
  },
});
