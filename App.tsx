import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import * as SQLite from "expo-sqlite";
import { VehicleList } from "./src/components/VehicleList";
import { CREATE_TABLES } from "./src/db/schema";

async function initDatabase(db: SQLite.SQLiteDatabase) {
  await db.execAsync(CREATE_TABLES);
  // Verify data
  const result = await db.getFirstAsync(
    "SELECT COUNT(*) as count FROM russian_fighters"
  );
  console.log("Fighters in DB:", result);
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SQLite.SQLiteProvider databaseName="russia.db" onInit={initDatabase}>
        <VehicleList />
      </SQLite.SQLiteProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2022",
  },
});
