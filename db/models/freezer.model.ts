import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Freezer extends Model {
  static table = "freezers";

  @field("capacity") capacity!: number;

  @field("created_at") createdAt!: string;
  @field("updated_at") updatedAt!: string;
}
