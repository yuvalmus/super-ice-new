import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

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

  @field("created_at") createdAt!: string;
  @field("updated_at") updatedAt!: string;
}
