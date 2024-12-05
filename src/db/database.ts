import * as SQLite from "expo-sqlite";
import { WebSQLDatabase } from "expo-sqlite";
import { CREATE_TABLES } from "./schema";

let database: WebSQLDatabase | null = null;

export const openDatabase = async (): Promise<WebSQLDatabase> => {
  if (database === null) {
    database = SQLite.openDatabase("russia.db");
    await initializeDatabase(database);
  }
  return database;
};

const initializeDatabase = async (db: WebSQLDatabase): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(CREATE_TABLES);
      },
      (error) => {
        console.error("Error initializing database:", error);
        reject(error);
      },
      () => {
        resolve();
      }
    );
  });
};
