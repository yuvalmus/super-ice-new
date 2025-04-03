import { Model } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";
import Driver from "./driver.model";

export default class DistributionLine extends Model {
  static table = "distribution_lines";

  @field("driver_id") driverId!: number;
  @field("line_number") lineNumber!: number;
  @field("scheduled_date") scheduledDate!: string;
  @field("is_completed") isCompleted!: boolean;
  @field("notes") notes?: string;

  @field("created_at") createdAt!: string;
  @field("updated_at") updatedAt!: string;

  // Relations
  @relation("drivers", "driver_id") driver!: Driver;
}
