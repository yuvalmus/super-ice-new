import { useState, useEffect } from "react";
import database from "@/db";
import { Freezer as FreezerModel } from "@/models/Freezer";
import { Freezer as FreezerDB } from "@/db/models";

export const transformFreezerToModel = (freezerDB: FreezerDB): FreezerModel => {
  return {
    id: freezerDB.id,
    capacity: freezerDB.capacity,
  };
};

export const useFreezerModels = () => {
  const freezers = useFreezers();

  return freezers.map(transformFreezerToModel);
};

export const useFreezers = () => {
  const [freezers, setFreezers] = useState<FreezerDB[]>([]);

  useEffect(() => {
    const query = database.get<FreezerDB>("freezers").query();

    const subscription = query
      .observe()
      .subscribe((newFreezers: FreezerDB[]) => {
        setFreezers(newFreezers);
      });

    return () => subscription.unsubscribe();
  }, []);

  return freezers;
};
