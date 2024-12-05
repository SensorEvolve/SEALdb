import * as SQLite from 'expo-sqlite';
import { CREATE_TABLES } from './schema';

let db: SQLite.SQLiteDatabase | null = null;

export const openDatabase = () => {
  if (db === null) {
    db = SQLite.openDatabase('russia.db');
  }
  return db;
};
