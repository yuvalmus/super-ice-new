import { tableSchema } from "@nozbe/watermelondb";

export const freezersSchema = tableSchema({
  name: "freezers",
  columns: [
    { name: "id", type: "number", isIndexed: true },
    { name: "capacity", type: "number" },
  ],
});
