import { WebSQLDatabase } from "expo-sqlite";
import { QUERIES } from "../db/queries";
import { Vehicle } from "../types/vehicle";

export const loadVehicles = async (database: WebSQLDatabase): Promise<Vehicle[]> => {
  return new Promise((resolve, reject) => {
    const vehicles: Vehicle[] = [];
    const queries = Object.values(QUERIES);
    let completedQueries = 0;

    database.transaction(
      (tx) => {
        queries.forEach((query) => {
          tx.executeSql(
            query,
            [],
            (_, result) => {
              vehicles.push(...(result.rows._array as Vehicle[]));
              completedQueries++;
              if (completedQueries === queries.length) {
                resolve(vehicles);
              }
            },
            (_, error) => {
              console.error("Error executing query:", error);
              return false;
            }
          );
        });
      },
      (error) => {
        console.error("Transaction error:", error);
        reject(error);
      }
    );
  });
};
