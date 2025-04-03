import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class User extends Model {
  static table = "users";

  @field("google_uid") googleUid!: string;
  @field("name") name!: string;
  @field("email") email!: string;
  @field("role") role!: string;
  @field("picture") picture?: string;
  @field("driver_id") driverId?: string;

  @field("created_at") createdAt!: string;
  @field("updated_at") updatedAt!: string;
}
