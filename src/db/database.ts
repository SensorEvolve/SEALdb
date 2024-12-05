import * as SQLite from 'expo-sqlite';

export class DatabaseConnection {
  private static database: any;

  private constructor() {}

  public static getConnection() {
    if (!this.database) {
      this.database = SQLite.default.openDatabase('russia.db');
    }
    return this.database;
  }
}
