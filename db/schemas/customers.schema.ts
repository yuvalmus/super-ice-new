import { tableSchema } from "@nozbe/watermelondb";

export const customersSchema = tableSchema({
  name: "customers",
  columns: [
    { name: "id", type: "number", isIndexed: true },
    { name: "name", type: "string" },
    { name: "invoice_name", type: "string", isOptional: true },
    { name: "address", type: "string" },
    { name: "distribution_area_id", type: "number" },
    { name: "freezer_id", type: "number", isOptional: true },
    { name: "bag_price_2kg", type: "number" },
    { name: "preferred_delivery_document", type: "string", isOptional: true },
    { name: "preferred_payment_method", type: "string", isOptional: true },
  ],
});
