import { Model } from "@nozbe/watermelondb";
import { field, relation } from "@nozbe/watermelondb/decorators";
import User from "./user.model";
import DistributionLine from "./distributionLine.model";

export default class Driver extends Model {
  static table = "drivers";

  @field("name") name!: string;
  @field("user_id") userId!: string;
  @field("active_distribution_line_id") activeDistributionLineId?: string;

  @field("created_at") createdAt!: number;
  @field("updated_at") updatedAt!: number;

  // Relations
  @relation("users", "user_id") user!: User;
  @relation("distribution_lines", "active_distribution_line_id")
  activeDistributionLine?: DistributionLine;
}
