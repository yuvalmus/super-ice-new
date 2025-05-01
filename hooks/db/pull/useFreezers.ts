import { useDbModels, UseDbModelResult } from "./useDbCollection";
import { Freezer as FreezerModel } from "@/models/Freezer";
import { Freezer as FreezerDB } from "@/db/models";

export const transformFreezerToModel = (freezerDB: FreezerDB): FreezerModel => {
  return {
    id: freezerDB.id,
    capacity: freezerDB.capacity,
  };
};

/**
 * React hook for accessing freezer models from the database
 * @returns {UseDbModelResult<FreezerModel>} Transformed freezer models with loading/error states
 */
export const useFreezers = (): UseDbModelResult<FreezerModel> => {
  return useDbModels<FreezerDB, FreezerModel>(
    "freezers",
    transformFreezerToModel
  );
};
