import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class DistributionLine extends Model {
  static table = "distribution_lines";

  @field("driver_id") driverId!: number;
  @field("line_number") lineNumber!: number;
  @field("scheduled_date") scheduledDate!: string;
  @field("is_completed") isCompleted!: boolean;
  @field("notes") notes?: string;
}
