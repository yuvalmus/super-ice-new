import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Driver extends Model {
  static table = "drivers";

  @field("name") name!: string;
  @field("active_distribution_line_id") activeDistributionLineId!:
    | number
    | null;
  @field("user_id") userId!: number | null;
}
