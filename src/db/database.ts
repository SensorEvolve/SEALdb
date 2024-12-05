import * as SQLite from 'expo-sqlite';
import { CREATE_TABLES } from './schema';

type SQLiteCallback = SQLite.SQLTransaction;

export const openDatabase = (): SQLite.SQLiteDatabase => {
  try {
    const db = SQLite.openDatabase('russia.db');
    db.transaction(
      (tx: SQLiteCallback) => {
        tx.executeSql(CREATE_TABLES);
      },
      (error) => {
        console.error('Error creating tables:', error);
      },
      () => {
        console.log('Database initialized successfully');
      }
    );
    return db;
  } catch (error) {
    console.error('Error opening database:', error);
    throw error;
  }
};
