import { useDbModels, UseDbModelResult } from "./useDbCollection";
import { User as UserModel } from "@/models/User";
import { User as UserDB } from "@/db/models";

export const transformUserToModel = (userDB: UserDB): UserModel => {
  return {
    id: userDB.id,
    googleUid: userDB.googleUid,
    name: userDB.name,
    email: userDB.email,
    role: userDB.role,
    picture: userDB.picture,
    driverId: userDB.driverId,
  };
};

/**
 * React hook for accessing user models from the database
 * @returns {UseDbModelResult<UserModel>} Transformed user models with loading/error states
 */
export const useUsers = (): UseDbModelResult<UserModel> => {
  return useDbModels<UserDB, UserModel>("users", transformUserToModel);
};
