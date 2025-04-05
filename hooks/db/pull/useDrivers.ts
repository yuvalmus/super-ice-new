import { useState, useEffect } from "react";
import database from "@/db";
import { Driver as DriverModel } from "@/models/Driver";
import { Driver as DriverDB } from "@/db/models";

export const transformDriverToModel = (driverDB: DriverDB): DriverModel => {
  return {
    id: driverDB.id,
    name: driverDB.name,
    activeDistributionLineId: driverDB.activeDistributionLineId,
  };
};

export const useDriverModels = () => {
  const drivers = useDrivers();

  return drivers.map(transformDriverToModel);
};

export const useDrivers = () => {
  const [drivers, setDrivers] = useState<DriverDB[]>([]);

  useEffect(() => {
    const query = database.get<DriverDB>("drivers").query();

    const subscription = query.observe().subscribe((newDrivers: DriverDB[]) => {
      setDrivers(newDrivers);
    });

    return () => subscription.unsubscribe();
  }, []);

  return drivers;
};
