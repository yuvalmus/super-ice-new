import { useDbModels, UseDbModelResult } from "./useDbCollection";
import { Driver as DriverModel } from "@/models/Driver";
import { Driver as DriverDB } from "@/db/models";

export const transformDriverToModel = (driverDB: DriverDB): DriverModel => {
  return {
    id: driverDB.id,
    name: driverDB.name,
    activeDistributionLineId: driverDB.activeDistributionLineId,
  };
};

/**
 * React hook for accessing driver models from the database
 * @returns {UseDbModelResult<DriverModel>} Transformed driver models with loading/error states
 */
export const useDrivers = (): UseDbModelResult<DriverModel> => {
  return useDbModels<DriverDB, DriverModel>("drivers", transformDriverToModel);
};
