import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class User extends Model {
  static table = "users";

  @field("username") username!: string;
  @field("password_hash") passwordHash!: string;
  @field("token") token?: string;
}
