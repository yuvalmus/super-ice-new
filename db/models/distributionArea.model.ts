import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class DistributionArea extends Model {
  static table = "distribution_areas";

  @field("name") name!: string;

  @field("created_at") createdAt!: string;
  @field("updated_at") updatedAt!: string;
}
