import { tableSchema } from "@nozbe/watermelondb";

export const driversSchema = tableSchema({
  name: "drivers",
  columns: [
    { name: "id", type: "number", isIndexed: true },
    { name: "name", type: "string" },
    { name: "active_distribution_line_id", type: "number", isOptional: true },
    { name: "user_id", type: "number", isOptional: true },
  ],
});
