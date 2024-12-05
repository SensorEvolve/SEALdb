import { SQLite } from 'expo-sqlite';

export class DatabaseConnection {
  private static database: any;

  private constructor() {}

  public static getConnection() {
    if (!this.database) {
      this.database = SQLite.openDatabase('russia.db');
    }
    return this.database;
  }
}
