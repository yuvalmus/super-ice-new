import { tableSchema } from "@nozbe/watermelondb";

export const usersSchema = tableSchema({
  name: "users",
  columns: [
    { name: "google_uid", type: "string" },
    { name: "name", type: "string" },
    { name: "email", type: "string" },
    { name: "role", type: "string" }, // 'driver', 'admin', or 'supervisor'
    { name: "picture", type: "string", isOptional: true },
    { name: "driver_id", type: "string", isOptional: true },

    { name: "created_at", type: "string" },
    { name: "updated_at", type: "string" },
  ],
});
