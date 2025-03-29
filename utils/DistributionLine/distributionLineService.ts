import { DistributionLine } from "@/models/DistributionLine";
import { distributionLines } from "@/mock/distributionLines";

// Fetch distribution line details by ID
export const fetchDistributionLineDetails = (
  id: number
): DistributionLine | null => {
  return (
    distributionLines.find((distributionLine) => distributionLine.id === id) ??
    null
  );
};

// Fetch distribution line details and update state
export const fetchDistributionLineData = async (
  id: number,
  setDistributionLineDetails: (data: DistributionLine | null) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  setIsLoading(true);
  // Simulate async operation
  const data = fetchDistributionLineDetails(id);
  setDistributionLineDetails(data);
  setIsLoading(false);
};
