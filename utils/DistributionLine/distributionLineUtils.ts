import { distributionLines } from "@/mock/distributionLines";

export const getDistributionLineDate = (distributionLineId: number) => {
  return distributionLines.find((line) => line.id === distributionLineId)
    ?.scheduledDate;
};
