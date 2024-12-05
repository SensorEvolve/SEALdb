import { openDatabaseSync } from "expo-sqlite";

export function getDatabase() {
  return openDatabaseSync("russia.db");
}
