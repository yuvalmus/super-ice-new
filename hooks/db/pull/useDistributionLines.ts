import { useState, useEffect } from "react";
import database from "@/db";
import DistributionLineDB from "@/db/models/distributionLine.model";
import { DistributionLine as DistributionLineModel } from "@/models/DistributionLine";

export const transformDistributionLineToModel = (
  lineDB: DistributionLineDB
): DistributionLineModel => {
  return {
    id: lineDB.id,
    driverId: lineDB.driverId,
    lineNumber: lineDB.lineNumber,
    scheduledDate: lineDB.scheduledDate,
    isCompleted: lineDB.isCompleted,
    notes: lineDB.notes,
  };
};

export const useDistributionLineModels = () => {
  const lines = useDistributionLines();

  return lines.map(transformDistributionLineToModel);
};

export const useDistributionLines = () => {
  const [lines, setLines] = useState<DistributionLineDB[]>([]);

  useEffect(() => {
    const query = database
      .get<DistributionLineDB>("distribution_lines")
      .query();

    const subscription = query
      .observe()
      .subscribe((newLines: DistributionLineDB[]) => {
        setLines(newLines);
      });

    return () => subscription.unsubscribe();
  }, []);

  return lines;
};
