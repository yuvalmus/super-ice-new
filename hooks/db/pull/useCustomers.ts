import { useDbModels, UseDbModelResult } from "./useDbCollection";
import { Customer as CustomerModel } from "@/models/Customer";
import { DeliveryDoc, PaymentMethod } from "@/models/Order";
import { Customer as CustomerDB } from "@/db/models";

export const transformCustomerToModel = (
  customerDB: CustomerDB
): CustomerModel => {
  return {
    id: customerDB.id,
    businessNumber: customerDB.businessNumber,
    name: customerDB.name,
    address: customerDB.address,
    distributionAreaId: customerDB.distributionAreaId,
    bagPrice2kg: customerDB.bagPrice2kg,
    invoiceName: customerDB.invoiceName,
    freezerId: customerDB.freezerId,
    preferredDeliveryDocument: customerDB.preferredDeliveryDocument as
      | DeliveryDoc
      | undefined,
    preferredPaymentMethod: customerDB.preferredPaymentMethod as
      | PaymentMethod
      | undefined,
    notes: customerDB.notes,
  };
};

/**
 * React hook for accessing customer models from the database
 * @returns {UseDbModelResult<CustomerModel>} Transformed customer models with loading/error states
 */
export const useCustomers = (): UseDbModelResult<CustomerModel> => {
  return useDbModels<CustomerDB, CustomerModel>(
    "customers",
    transformCustomerToModel
  );
};
