import { tableSchema } from "@nozbe/watermelondb";

export const contactsSchema = tableSchema({
  name: "contacts",
  columns: [
    { name: "customer_id", type: "string", isIndexed: true },
    { name: "name", type: "string" },
    { name: "phone", type: "string" },

    { name: "created_at", type: "number" },
    { name: "updated_at", type: "number" },
  ],
});
