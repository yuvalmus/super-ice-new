import { tableSchema } from "@nozbe/watermelondb";

export const usersSchema = tableSchema({
  name: "users",
  columns: [
    { name: "username", type: "string" },
    { name: "password_hash", type: "string" },
    { name: "token", type: "string", isOptional: true },
    { name: "created_at", type: "string" },
    { name: "updated_at", type: "string" },
  ],
});
