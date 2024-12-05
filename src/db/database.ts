import { openDatabase } from 'expo-sqlite';

export function getDatabase() {
  return openDatabase('russia.db');
}
