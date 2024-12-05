import * as SQLite from 'expo-sqlite';

export class DatabaseConnection {
  private static database: SQLite.SQLiteDatabase;

  private constructor() {}

  public static getConnection(): SQLite.SQLiteDatabase {
    if (!this.database) {
      this.database = SQLite.openDatabase('russia.db');
    }
    return this.database;
  }
}
