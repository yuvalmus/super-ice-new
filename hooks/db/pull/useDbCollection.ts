import { useState, useEffect, useCallback } from "react";
import database from "@/db";
import { Model } from "@nozbe/watermelondb";

export interface UseDbModelResult<U> {
  data: U[];
  isLoading: boolean;
  error: Error | null;
  refresh: () => void;
}

/**
 * A React hook for fetching and transforming database models into domain models
 *
 * @param collectionName The name of the collection to query
 * @param transformer Function to transform database models to domain models
 * @returns Object containing transformed data, loading state, error state, and refresh function
 */
export function useDbModels<T extends Model, U>(
  collectionName: string,
  transformer: (item: T) => U
): UseDbModelResult<U> {
  const [data, setData] = useState<U[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setError(null);

    const query = database.get<T>(collectionName).query();

    return query.observe().subscribe({
      next: (newItems: T[]) => {
        setData(newItems.map(transformer));
        setIsLoading(false);
      },
      error: (err: Error) => {
        setError(err);
        setIsLoading(false);
      },
    });
  }, [collectionName, transformer]);

  useEffect(() => {
    const subscription = fetchData();
    return () => subscription.unsubscribe();
  }, [fetchData]);

  const refresh = useCallback(() => {
    const subscription = fetchData();
    return () => subscription.unsubscribe();
  }, [fetchData]);

  return { data, isLoading, error, refresh };
}
