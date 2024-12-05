import * as SQLite from 'expo-sqlite';
import { CREATE_TABLES } from './schema';

type Database = SQLite.SQLiteDatabase;
type SQLTransaction = SQLite.SQLTransaction;

export const openDatabase = () => {
  const db = SQLite.openDatabase('russia.db');
  initDatabase(db);
  return db;
};

const initDatabase = (db: Database) => {
  db.transaction(
    (tx: SQLTransaction) => {
      tx.executeSql(CREATE_TABLES);
    },
    error => console.error('Error initializing database:', error),
    () => console.log('Database initialized successfully')
  );
};
