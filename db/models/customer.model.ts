import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Customer extends Model {
  static table = "customers";

  @field("name") name!: string;
  @field("invoice_name") invoiceName!: string | null;
  @field("address") address!: string;
  @field("distribution_area_id") distributionAreaId!: number;
  @field("freezer_id") freezerId!: number | null;
  @field("bag_price_2kg") bagPrice2kg!: number;
  @field("preferred_delivery_document") preferredDeliveryDocument!:
    | string
    | null;
  @field("preferred_payment_method") preferredPaymentMethod!: string | null;
}
