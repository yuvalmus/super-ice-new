import { tableSchema } from "@nozbe/watermelondb";

export const usersSchema = tableSchema({
  name: "users",
  columns: [
    { name: "id", type: "number", isIndexed: true },
    { name: "username", type: "string", isOptional: false },
    { name: "password_hash", type: "string" },
    { name: "token", type: "string", isOptional: true },
  ],
});
