import { Model } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";
import DistributionArea from "./distributionArea.model";
import Freezer from "./freezer.model";

export default class Customer extends Model {
  static table = "customers";

  @field("business_number") businessNumber!: number;
  @field("name") name!: string;
  @field("address") address!: string;
  @field("distribution_area_id") distributionAreaId!: string;
  @field("bag_price_2kg") bagPrice2kg!: number;
  @field("invoice_name") invoiceName?: string;
  @field("freezer_id") freezerId?: string;
  @field("preferred_delivery_document") preferredDeliveryDocument?: string;
  @field("preferred_payment_method") preferredPaymentMethod?: string;
  @field("notes") notes?: string;

  @field("created_at") createdAt!: string;
  @field("updated_at") updatedAt!: string;

  // Relations
  @relation("distribution_areas", "distribution_area_id")
  distributionArea!: DistributionArea;
  @relation("freezers", "freezer_id") freezer?: Freezer;
}
