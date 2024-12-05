import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { SQLiteProvider } from "expo-sqlite";
import { VehicleList } from "./src/components/VehicleList";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SQLiteProvider databaseName="russia.db" onInit={initDatabase}>
        <VehicleList />
      </SQLiteProvider>
    </SafeAreaView>
  );
}

async function initDatabase(db: SQLite.SQLiteDatabase) {
  await db.execAsync(CREATE_TABLES);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2022",
  },
});
