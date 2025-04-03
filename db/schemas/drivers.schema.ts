import { tableSchema } from "@nozbe/watermelondb";

export const driversSchema = tableSchema({
  name: "drivers",
  columns: [
    { name: "name", type: "string" },
    { name: "user_id", type: "string" },
    { name: "active_distribution_line_id", type: "string", isOptional: true },

    { name: "created_at", type: "string" },
    { name: "updated_at", type: "string" },
  ],
});
