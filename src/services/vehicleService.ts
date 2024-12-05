import * as SQLite from "expo-sqlite";
import { Vehicle } from "../types/vehicle";
import React from "react";

type SetVehiclesAction = React.Dispatch<React.SetStateAction<Vehicle[]>>;

export const loadVehicles = (
  database: SQLite.WebSQLDatabase,
  setVehicles: SetVehiclesAction
): void => {
  const categories = {
    bombers: 'SELECT *, "bomber" as category FROM russian_bombers',
    fighters: 'SELECT *, "fighter" as category FROM russian_fighters',
    helicopters: 'SELECT *, "helicopter" as category FROM russian_helicopters',
    transport:
      'SELECT *, "transport" as category FROM russian_transport_aircraft',
  };

  database.transaction((tx) => {
    Object.entries(categories).forEach(([key, query]) => {
      tx.executeSql(
        query,
        [],
        (_, result) => {
          const vehicles = Array.from(
            { length: result.rows.length },
            (_, i) => result.rows.item(i) as Vehicle
          );
          setVehicles((current) => [...current, ...vehicles]);
        },
        (_, error) => {
          console.error(`Error loading ${key}:`, error);
          return false;
        }
      );
    });
  });
};
