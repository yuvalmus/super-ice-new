import { tableSchema } from "@nozbe/watermelondb";

export const freezersSchema = tableSchema({
  name: "freezers",
  columns: [
    { name: "capacity", type: "number" },
    { name: "created_at", type: "string" },
    { name: "updated_at", type: "string" },
  ],
});
