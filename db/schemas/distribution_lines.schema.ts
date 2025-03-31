import { tableSchema } from "@nozbe/watermelondb";

export const distributionLinesSchema = tableSchema({
  name: "distribution_lines",
  columns: [
    { name: "id", type: "number", isIndexed: true },
    { name: "driver_id", type: "number" },
    { name: "scheduled_date", type: "string" },
    { name: "is_completed", type: "boolean" },
  ],
});
