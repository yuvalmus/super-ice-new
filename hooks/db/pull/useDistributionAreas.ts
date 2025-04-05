import { useState, useEffect } from "react";
import database from "@/db";
import {
  DistributionArea as DistributionAreaModel,
  DistributionAreaNames,
} from "@/models/DistributionArea";
import { DistributionArea as DistributionAreaDB } from "@/db/models";

export const transformDistributionAreaToModel = (
  areaDB: DistributionAreaDB
): DistributionAreaModel => {
  return {
    id: areaDB.id,
    name: areaDB.name as DistributionAreaNames,
  };
};

export const useDistributionAreaModels = () => {
  const areas = useDistributionAreas();

  return areas.map(transformDistributionAreaToModel);
};

export const useDistributionAreas = () => {
  const [areas, setAreas] = useState<DistributionAreaDB[]>([]);

  useEffect(() => {
    const query = database
      .get<DistributionAreaDB>("distribution_areas")
      .query();

    const subscription = query
      .observe()
      .subscribe((newAreas: DistributionAreaDB[]) => {
        setAreas(newAreas);
      });

    return () => subscription.unsubscribe();
  }, []);

  return areas;
};
