import { tableSchema } from "@nozbe/watermelondb";

export const customersSchema = tableSchema({
  name: "customers",
  columns: [
    { name: "business_number", type: "number" },
    { name: "name", type: "string" },
    { name: "address", type: "string" },
    { name: "distribution_area_id", type: "string", isIndexed: true },
    { name: "bag_price_2kg", type: "number" },
    { name: "invoice_name", type: "string", isOptional: true },
    { name: "freezer_id", type: "string", isOptional: true, isIndexed: true },
    { name: "preferred_delivery_document", type: "string", isOptional: true },
    { name: "preferred_payment_method", type: "string", isOptional: true },
    { name: "notes", type: "string", isOptional: true },

    { name: "created_at", type: "number" },
    { name: "updated_at", type: "number" },
  ],
});
