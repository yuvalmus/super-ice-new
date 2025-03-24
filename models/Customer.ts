import { DeliveryDoc, PaymentMethod } from "./Order";

export interface Customer {
  businessNumber: number;
  name: string;
  invoiceName?: string;
  address: string;
  distributionAreaId: number;
  bagPrice2kg: number;
  freezerId: number | null;
  preferredDeliveryDocument?: DeliveryDoc;
  preferredPaymentMethod?: PaymentMethod;
}
