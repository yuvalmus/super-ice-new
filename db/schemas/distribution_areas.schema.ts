import { tableSchema } from "@nozbe/watermelondb";

export const distributionAreasSchema = tableSchema({
  name: "distribution_areas",
  columns: [
    { name: "name", type: "string" },

    { name: "created_at", type: "number" },
    { name: "updated_at", type: "number" },
  ],
});
