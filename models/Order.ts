export type DeliveryDoc = "invoice" | "receipt" | "deliveryNote";
export type PaymentMethod = "cash" | "cheque" | "transfer";

export interface Order {
  id: string;
  orderNumber: number;
  customerId: string;
  amountRequired: number;
  amountSupplied: number;
  attachedDistributionLineId?: string;
  position?: number;
  creationDate: string;
  isPaid: boolean;
  totalPrice: number;
  deliveryDocument?: DeliveryDoc;
  paymentMethod?: PaymentMethod;
  notes?: string;
}
