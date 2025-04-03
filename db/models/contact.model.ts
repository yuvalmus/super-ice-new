import { Model } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";
import Customer from "./customer.model";

export default class Contact extends Model {
  static table = "contacts";

  @field("customer_id") customerId!: string;
  @field("name") name!: string;
  @field("phone") phone!: string;

  @field("created_at") createdAt!: string;
  @field("updated_at") updatedAt!: string;

  // Relations
  @relation("customers", "customer_id") customer!: Customer;
}
