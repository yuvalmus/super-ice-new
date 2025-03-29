import { screenOptions } from "@/constants/ScreenOptions";
import { DistributionLine } from "@/models/DistributionLine";
import { Stack } from "expo-router";
import { createContext, useContext, useState } from "react";

interface DistributionLineContextType {
  distributionLineDetails: DistributionLine | null;
  setDistributionLineDetails: React.Dispatch<
    React.SetStateAction<DistributionLine | null>
  >;
}

const DistributionLineContext =
  createContext<DistributionLineContextType | null>(null);

export const useDistributionLine = () => {
  const context = useContext(DistributionLineContext);
  if (!context)
    throw new Error(
      "useDistributionLine must be used within a DistributionLineProvider"
    );
  return context;
};

export default function DistributionLineLayout() {
  const [distributionLineDetails, setDistributionLineDetails] =
    useState<DistributionLine | null>(null);

  return (
    <DistributionLineContext.Provider
      value={{ distributionLineDetails, setDistributionLineDetails }}
    >
      <Stack>
        <Stack.Screen name="index" options={screenOptions} />
        <Stack.Screen name="[id]/index" options={screenOptions} />
      </Stack>
    </DistributionLineContext.Provider>
  );
}
