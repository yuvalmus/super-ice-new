import { Model } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";
import Customer from "./customer.model";
import DistributionLine from "./distributionLine.model";

export default class Order extends Model {
  static table = "orders";

  @field("order_number") orderNumber!: number;
  @field("customer_id") customerId!: string;
  @field("amount_required") amountRequired!: number;
  @field("amount_supplied") amountSupplied!: number;
  @field("creation_date") creationDate!: string;
  @field("is_paid") isPaid!: boolean;
  @field("total_price") totalPrice!: number;
  @field("attached_distribution_line_id") attachedDistributionLineId?: string;
  @field("position") position?: number;
  @field("delivery_document") deliveryDocument?: string;
  @field("payment_method") paymentMethod?: string;
  @field("notes") notes?: string;

  @field("created_at") createdAt!: number;
  @field("updated_at") updatedAt!: number;

  // Relations
  @relation("customers", "customer_id") customer!: Customer;
  @relation("distribution_lines", "attached_distribution_line_id")
  distributionLine?: DistributionLine;
}
