import { useDbModels, UseDbModelResult } from "./useDbCollection";
import { DistributionLine as DistributionLineModel } from "@/models/DistributionLine";
import { DistributionLine as DistributionLineDB } from "@/db/models";

export const transformDistributionLineToModel = (
  lineDB: DistributionLineDB
): DistributionLineModel => {
  return {
    id: lineDB.id,
    driverId: lineDB.driverId,
    lineNumber: lineDB.lineNumber,
    scheduledDate: lineDB.scheduledDate,
    isCompleted: lineDB.isCompleted,
    notes: lineDB.notes,
  };
};

/**
 * React hook for accessing distribution line models from the database
 * @returns {UseDbModelResult<DistributionLineModel>} Transformed distribution line models with loading/error states
 */
export const useDistributionLines =
  (): UseDbModelResult<DistributionLineModel> => {
    return useDbModels<DistributionLineDB, DistributionLineModel>(
      "distribution_lines",
      transformDistributionLineToModel
    );
  };
