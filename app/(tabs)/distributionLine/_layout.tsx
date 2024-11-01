import { Stack } from "expo-router";

export default function DistributionLineLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
