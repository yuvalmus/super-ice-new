import { tableSchema } from "@nozbe/watermelondb";

export const ordersSchema = tableSchema({
  name: "orders",
  columns: [
    { name: "order_number", type: "number" },
    { name: "customer_id", type: "string", isIndexed: true },
    { name: "amount_required", type: "number" },
    { name: "amount_supplied", type: "number" },
    { name: "creation_date", type: "string" },
    { name: "is_paid", type: "boolean" },
    { name: "total_price", type: "number" },
    {
      name: "attached_distribution_line_id",
      type: "string",
      isOptional: true,
      isIndexed: true,
    },
    { name: "position", type: "number", isOptional: true },
    { name: "delivery_document", type: "string", isOptional: true },
    { name: "payment_method", type: "string", isOptional: true },
    { name: "notes", type: "string", isOptional: true },

    { name: "created_at", type: "number" },
    { name: "updated_at", type: "number" },
  ],
});
