import { useDbModels, UseDbModelResult } from "./useDbCollection";
import {
  Order as OrderModel,
  DeliveryDoc,
  PaymentMethod,
} from "@/models/Order";
import { Order as OrderDB } from "@/db/models";

export const transformOrderToModel = (orderDB: OrderDB): OrderModel => {
  return {
    id: orderDB.id,
    orderNumber: orderDB.orderNumber,
    customerId: orderDB.customerId,
    amountRequired: orderDB.amountRequired,
    amountSupplied: orderDB.amountSupplied,
    attachedDistributionLineId: orderDB.attachedDistributionLineId,
    position: orderDB.position,
    creationDate: orderDB.creationDate,
    isPaid: orderDB.isPaid,
    totalPrice: orderDB.totalPrice,
    deliveryDocument: orderDB.deliveryDocument as DeliveryDoc | undefined,
    paymentMethod: orderDB.paymentMethod as PaymentMethod | undefined,
    notes: orderDB.notes,
  };
};

/**
 * React hook for accessing order models from the database
 * @returns {UseDbModelResult<OrderModel>} Transformed order models with loading/error states
 */
export const useOrders = (): UseDbModelResult<OrderModel> => {
  return useDbModels<OrderDB, OrderModel>("orders", transformOrderToModel);
};
