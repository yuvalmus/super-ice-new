import { tableSchema } from "@nozbe/watermelondb";

export const ordersSchema = tableSchema({
  name: "orders",
  columns: [
    { name: "id", type: "number", isIndexed: true },
    { name: "customer_id", type: "number" },
    { name: "amount_required", type: "number" },
    { name: "amount_supplied", type: "number" },
    { name: "attached_distribution_line_id", type: "number", isOptional: true },
    { name: "position", type: "number", isOptional: true },
    { name: "creation_date", type: "string" },
    { name: "is_paid", type: "boolean" },
    { name: "total_price", type: "number" },
    { name: "delivery_document", type: "string", isOptional: true },
    { name: "payment_method", type: "string", isOptional: true },
  ],
});
