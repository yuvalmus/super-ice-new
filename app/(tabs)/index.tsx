import DriversCardsSection from "@/components/homeScreen/DriversCardsSection";
import { ScreenWrapper } from "@/components/ScreenWrapper";
import { ScreenWidth, ScreenHeight } from "@/constants/Dimensions";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import ActiveDistributionLineStats from "@/components/common/distributionStats/ActiveDistributionLineStats";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";

const superIceTruck = require("@/assets/images/superIceTruck.png");

export default function HomeScreen() {
  const { user } = useRequireAuth();
  const { logout } = useAuth();

  // If user is not authenticated, the hook will redirect to login
  if (!user) return null;

  return (
    <ScreenWrapper
      topButton={
        <TouchableOpacity onPress={() => logout()}>
          <MaterialCommunityIcons name="logout" size={26} />
        </TouchableOpacity>
      }
    >
      <Image
        source={superIceTruck}
        alt="superIceTruck"
        style={styles.truckImage}
      />
      <ActiveDistributionLineStats />
      <DriversCardsSection />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  truckImage: {
    width: ScreenWidth,
    height: ScreenHeight * 0.3,
  },
  activeLineTitle: {
    fontSize: ScreenWidth * 0.05,
    fontWeight: "bold",
    color: "#2E5CB8",
    marginHorizontal: ScreenWidth * 0.04,
    marginTop: ScreenHeight * 0.02,
  },
  statsBox: {
    borderColor: "#21a7fd",
    borderWidth: 2.5,
  },
});
