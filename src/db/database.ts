import { openDatabase as openSQLiteDatabase } from 'expo-sqlite';

let db: ReturnType<typeof openSQLiteDatabase> | null = null;

export const openDatabase = () => {
  if (db === null) {
    db = openSQLiteDatabase('russia.db');
  }
  return db;
};
