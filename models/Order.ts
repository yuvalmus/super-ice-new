export type DeliveryDoc = "invoice" | "receipt" | "deliveryNote";
export type PaymentMethod = "cash" | "cheque" | "transfer";

export interface Order {
  id: number;
  customerId: number;
  amountRequired: number;
  amountSupplied: number;
  attachedDistributionLineId: number | null;
  creationDate: string;
  suppliedDate: string | null;
  isPaid: boolean;
  totalPrice: number;
  deliveryDocument?: DeliveryDoc;
  paymentMethod?: PaymentMethod;
}
