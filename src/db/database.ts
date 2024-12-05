const { openDatabase } = require('expo-sqlite');

export class DatabaseConnection {
  private static database: any;

  private constructor() {}

  public static getConnection() {
    if (!this.database) {
      this.database = openDatabase('russia.db');
    }
    return this.database;
  }
}
