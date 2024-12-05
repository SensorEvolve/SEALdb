// src/db/database.ts
import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

interface SQLTransaction {
  executeSql: (
    sqlStatement: string,
    args?: any[],
    callback?: (transaction: SQLTransaction, resultSet: SQLResultSet) => void,
    errorCallback?: (transaction: SQLTransaction, error: Error) => boolean
  ) => void;
}

interface SQLResultSet {
  insertId: number;
  rowsAffected: number;
  rows: {
    length: number;
    _array: any[];
    item: (idx: number) => any;
  };
}

const db = SQLite.openDatabase("russia.db");

export const setupDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx: SQLTransaction) => {
        tx.executeSql("DROP TABLE IF EXISTS russian_fighters");
        tx.executeSql("DROP TABLE IF EXISTS russian_helicopters");
        tx.executeSql("DROP TABLE IF EXISTS russian_transport_aircraft");

        tx.executeSql(`
          CREATE TABLE russian_fighters (
            "Name" TEXT,
            "Type" TEXT,
            "Generation" TEXT,
            "Max Speed (km/h)" INTEGER,
            "Service Ceiling (m)" INTEGER,
            "Range (km)" INTEGER,
            "Combat Radius (km)" INTEGER,
            "Radar System" TEXT,
            "Radar Range (km)" TEXT,
            "Service Year" INTEGER,
            "Status" TEXT,
            "Armament" TEXT,
            "Special Features" TEXT,
            "Variants" TEXT
          )
        `);
      },
      (error: Error) => {
        console.error("Error setting up database:", error);
        reject(error);
      },
      () => {
        console.log("Database setup completed");
        resolve();
      }
    );
  });
};

export { db };
