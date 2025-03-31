import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Order extends Model {
  static table = "orders";

  @field("customer_id") customerId!: number;
  @field("amount_required") amountRequired!: number;
  @field("amount_supplied") amountSupplied!: number;
  @field("attached_distribution_line_id") attachedDistributionLineId!:
    | number
    | null;
  @field("position") position!: number | null;
  @field("creation_date") creationDate!: string;
  @field("is_paid") isPaid!: boolean;
  @field("total_price") totalPrice!: number;
  @field("delivery_document") deliveryDocument!: string | null;
  @field("payment_method") paymentMethod!: string | null;
}
