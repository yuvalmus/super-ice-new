import { tableSchema } from "@nozbe/watermelondb";

export const distributionAreasSchema = tableSchema({
  name: "distribution_areas",
  columns: [
    { name: "id", type: "number", isIndexed: true },
    { name: "name", type: "string" },
  ],
});
