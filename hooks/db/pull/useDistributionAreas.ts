import { useDbModels, UseDbModelResult } from "./useDbCollection";
import {
  DistributionArea as DistributionAreaModel,
  DistributionAreaNames,
} from "@/models/DistributionArea";
import { DistributionArea as DistributionAreaDB } from "@/db/models";

export const transformDistributionAreaToModel = (
  areaDB: DistributionAreaDB
): DistributionAreaModel => {
  return {
    id: areaDB.id,
    name: areaDB.name as DistributionAreaNames,
  };
};

/**
 * React hook for accessing distribution area models from the database
 * @returns {UseDbModelResult<DistributionAreaModel>} Transformed distribution area models with loading/error states
 */
export const useDistributionAreas =
  (): UseDbModelResult<DistributionAreaModel> => {
    return useDbModels<DistributionAreaDB, DistributionAreaModel>(
      "distribution_areas",
      transformDistributionAreaToModel
    );
  };
