// hooks/useVehicles.ts
import { useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { QUERIES } from "../db/queries";
import { Vehicle } from "../types/vehicle";

export function useVehicles() {
  const db = useSQLiteContext();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVehicles() {
      try {
        const loadedVehicles: Vehicle[] = [];

        for (const [category, query] of Object.entries(QUERIES)) {
          const result = await db.getAllAsync<Vehicle>(query);
          // Add category to each vehicle
          const vehiclesWithCategory = result.map((vehicle) => ({
            ...vehicle,
            category,
          }));
          loadedVehicles.push(...vehiclesWithCategory);
        }

        setVehicles(loadedVehicles);
      } catch (err) {
        console.error("Error loading vehicles:", err);
        setError("Failed to load database");
      }
    }

    loadVehicles();
  }, [db]);

  return { vehicles, selectedCategory, setSelectedCategory, error };
}
