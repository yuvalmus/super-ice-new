import { useDbModels, UseDbModelResult } from "./useDbCollection";
import { Contact as ContactModel } from "@/models/Contact";
import { Contact as ContactDB } from "@/db/models";

export const transformContactToModel = (contactDB: ContactDB): ContactModel => {
  return {
    id: contactDB.id,
    customerId: contactDB.customerId,
    name: contactDB.name,
    phone: contactDB.phone,
  };
};

/**
 * React hook for accessing contact models from the database
 * @returns {UseDbModelResult<ContactModel>} Transformed contact models with loading/error states
 */
export const useContacts = (): UseDbModelResult<ContactModel> => {
  return useDbModels<ContactDB, ContactModel>(
    "contacts",
    transformContactToModel
  );
};
