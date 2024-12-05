import { useState, useEffect } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { QUERIES } from '../db/queries';

export interface Vehicle {
  Name: string;
  Type: string;
  'Max Speed (km/h)': number;
  'Service Ceiling (m)': number;
  'Range (km)': number;
  'Combat Radius (km)'?: number;
  category: string;
}

export function useVehicles() {
  const db = useSQLiteContext();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVehicles() {
      try {
        const loadedVehicles: Vehicle[] = [];
        
        for (const [category, query] of Object.entries(QUERIES)) {
          const result = await db.getAllAsync(query);
          loadedVehicles.push(...result);
        }

        setVehicles(loadedVehicles);
      } catch (err) {
        console.error('Error loading vehicles:', err);
        setError('Failed to load database');
      }
    }

    loadVehicles();
  }, [db]);

  return {
    vehicles,
    selectedCategory,
    setSelectedCategory,
    error
  };
}
