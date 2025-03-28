import { DistributionLine } from "@/models/DistributionLine";

export const distributionLines: DistributionLine[] = [
  {
    id: 1,
    driverId: 1,
    scheduledDate: "01/11/2024",
    isCompleted: true,
  },
  {
    id: 2,
    driverId: 1,
    scheduledDate: "04/11/2024",
    isCompleted: false,
  },
  {
    id: 3,
    driverId: 2,
    scheduledDate: "09/02/2025",
    isCompleted: false,
  },
  {
    id: 4,
    driverId: 3,
    scheduledDate: "25/03/2025",
    isCompleted: false,
  },
  {
    id: 5,
    driverId: 4,
    scheduledDate: "04/11/2024",
    isCompleted: false,
  },
];
