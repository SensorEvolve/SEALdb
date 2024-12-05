import * as SQLite from 'expo-sqlite';

type DatabaseType = ReturnType<typeof SQLite.openDatabaseSync>;

let db: DatabaseType | null = null;

export const openDatabase = (): DatabaseType => {
  if (db === null) {
    db = SQLite.openDatabaseSync('russia.db');
  }
  return db;
};
