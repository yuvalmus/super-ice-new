export interface DistributionLine {
  id: string;
  driverId: string;
  lineNumber: number;
  scheduledDate: string;
  isCompleted: boolean;
  notes?: string;
}
