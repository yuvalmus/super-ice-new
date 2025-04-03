import { tableSchema } from "@nozbe/watermelondb";

export const distributionLinesSchema = tableSchema({
  name: "distribution_lines",
  columns: [
    { name: "driver_id", type: "number" },
    { name: "line_number", type: "number" },
    { name: "scheduled_date", type: "string" },
    { name: "is_completed", type: "boolean" },
    { name: "notes", type: "string", isOptional: true },
    { name: "created_at", type: "string" },
    { name: "updated_at", type: "string" },
  ],
});
