import { distributionLines } from "@/mock/distributionLines";

export const getDistributionLineDate = (distributionLineId: string) => {
  return distributionLines.find((line) => line.id === distributionLineId)
    ?.scheduledDate;
};
