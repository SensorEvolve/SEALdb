// hooks/useVehicles.ts
import { useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";

export function useVehicles(initialCategory: string = "all") {
  const db = useSQLiteContext();
  const [vehicles, setVehicles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVehicles() {
      try {
        let query = "";
        if (selectedCategory === "all") {
          query = `
            SELECT
              Name,
              Type,
              "Max Speed (km/h)",
              "Service Ceiling (m)",
              "Range (km)",
              "Radar System",
              "Radar Range (km)",
              "Service Year",
              Status,
              'fighter' as category
            FROM russian_fighters
            UNION ALL
            SELECT
              Name,
              Type,
              "Max Speed (km/h)",
              "Service Ceiling (m)",
              "Range (km)",
              "Radar System",
              "Radar Range (km)",
              "Service Year",
              Status,
              'helicopter' as category
            FROM russian_helicopters
            UNION ALL
            SELECT
              Name,
              Type,
              "Max Speed (km/h)",
              "Service Ceiling (m)",
              "Range (km)",
              "Radar System",
              "Radar Range (km)",
              "Service Year",
              Status,
              'transport' as category
            FROM russian_transport_aircraft
          `;
        } else {
          const tables = {
            fighter: "russian_fighters",
            helicopter: "russian_helicopters",
            transport: "russian_transport_aircraft",
          };
          const table = tables[selectedCategory as keyof typeof tables];
          query = `SELECT * FROM ${table}`;
        }

        const result = await db.getAllAsync(query);
        setVehicles(result);
      } catch (err) {
        console.error("Error loading vehicles:", err);
        setError("Failed to load database");
      }
    }

    loadVehicles();
  }, [db, selectedCategory]);

  return { vehicles, selectedCategory, setSelectedCategory, error };
}
