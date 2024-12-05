import * as SQLite from "expo-sqlite";

export const openDatabase = (): SQLite.WebSQLDatabase => {
  return SQLite.openDatabaseSync("russia.db");
};
