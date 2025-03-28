import { screenOptions } from "@/constants/ScreenOptions";
import { Stack } from "expo-router";

export default function DistributionLineLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={screenOptions} />
    </Stack>
  );
}
