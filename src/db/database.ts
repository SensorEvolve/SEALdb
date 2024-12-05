// db/database.ts
import * as SQLite from "expo-sqlite";

interface SQLResultSet {
  insertId: number;
  rows: {
    length: number;
    item: (index: number) => any;
    _array: any[];
  };
  rowsAffected: number;
}

interface SQLError {
  code: number;
  message: string;
}

interface SQLTransaction {
  executeSql: (
    sqlStatement: string,
    args?: any[],
    callback?: (transaction: SQLTransaction, resultSet: SQLResultSet) => void,
    errorCallback?: (transaction: SQLTransaction, error: SQLError) => boolean
  ) => void;
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

        // Add sample data
        tx.executeSql(`
          INSERT INTO russian_fighters VALUES
          ('Su-57', 'Fighter', '5th', 2440, 20000, 3500, 1500, 'N036 Byelka', '400', 2020, 'Active', 'Air-to-air missiles, 30mm cannon', 'Stealth features, Supercruise', 'Su-57E')
        `);
      },
      (error: SQLError) => {
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
