import { Order } from "@/models/Order";

export const orders: Order[] = [
  {
    id: 1,
    customerId: 3,
    attachedDistributionLineId: 1,
    amountRequired: 40,
    amountSupplied: 40,
    creationDate: "31/10/2024",
    suppliedDate: "01/11/2024",
    debtLeft: 240,
  },
  {
    id: 2,
    customerId: 1,
    attachedDistributionLineId: 2,
    amountRequired: 40,
    amountSupplied: -1,
    creationDate: "02/11/2024",
    suppliedDate: null,
    debtLeft: 0,
    paymentMethod: "cheque",
    deliveryDocument: "receipt",
  },
];
