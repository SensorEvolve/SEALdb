import * as SQLite from 'expo-sqlite';

export const openDatabase = () => {
  return SQLite.openDatabase('russia.db');
};
