import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Driver extends Model {
  static table = "drivers";

  @field("name") name!: string;
  @field("user_id") userId!: string;
  @field("active_distribution_line_id") activeDistributionLineId?: string;

  @field("created_at") createdAt!: string;
  @field("updated_at") updatedAt!: string;
}
