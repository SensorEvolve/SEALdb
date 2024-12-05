import { openDatabase as SQLiteOpenDB } from 'expo-sqlite';

export class DatabaseConnection {
  private static database: any;

  private constructor() {}

  public static getConnection() {
    if (!this.database) {
      this.database = SQLiteOpenDB('russia.db');
    }
    return this.database;
  }
}
