import { tableSchema } from "@nozbe/watermelondb";

export const driversSchema = tableSchema({
  name: "drivers",
  columns: [
    { name: "name", type: "string" },
    { name: "user_id", type: "string", isIndexed: true },
    {
      name: "active_distribution_line_id",
      type: "string",
      isOptional: true,
      isIndexed: true,
    },

    { name: "created_at", type: "number" },
    { name: "updated_at", type: "number" },
  ],
});
