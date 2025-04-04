import { DeliveryDoc, PaymentMethod } from "./Order";

export interface Customer {
  id: string;
  businessNumber: number;
  name: string;
  invoiceName?: string;
  address: string;
  distributionAreaId: string;
  bagPrice2kg: number;
  freezerId?: string;
  preferredDeliveryDocument?: DeliveryDoc;
  preferredPaymentMethod?: PaymentMethod;
  notes?: string;
}
