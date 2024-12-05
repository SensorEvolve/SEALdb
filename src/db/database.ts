import * as SQLite from 'expo-sqlite';

let db: SQLite.WebSQLDatabase | null = null;

export const openDatabase = () => {
  if (!db) {
    db = SQLite.openDatabase('russia.db');
  }
  return db;
};
