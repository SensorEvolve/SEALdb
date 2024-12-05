import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import * as SQLite from "expo-sqlite";

interface Vehicle {
  Name: string;
  Type: string;
  "Max Speed (km/h)": number;
  "Service Ceiling (m)": number;
  "Range (km)": number;
  "Combat Radius (km)": number;
  category: string;
}

export default function App() {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    try {
      const database = SQLite.openDatabaseSync("russia.db");
      setDb(database);
      loadVehicles(database);
    } catch (error) {
      console.error("Error opening database:", error);
    }
  }, []);
  const loadVehicles = async (database: SQLite.SQLiteDatabase) => {
    const categories = {
      bombers: 'SELECT *, "bomber" as category FROM russian_bombers',
      fighters: 'SELECT *, "fighter" as category FROM russian_fighters',
      helicopters:
        'SELECT *, "helicopter" as category FROM russian_helicopters',
      transport:
        'SELECT *, "transport" as category FROM russian_transport_aircraft',
    };
    database.transaction((tx) => {
      Object.entries(categories).forEach(([key, query]) => {
        tx.executeSql(
          query,
          [],
          (_tx: any, result: { rows: { _array: any[] } }) => {
            const {
              rows: { _array },
            } = result;
            setVehicles((current) => [...current, ...(_array as Vehicle[])]);
          },
          (_tx: any, error: Error) => {
            console.error(`Error loading ${key}:`, error);
            return false;
          }
        );
      });
    });
    try {
    } catch (error) {
      console.error("Database error:", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E2022" />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Military Aircraft Database</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {["all", "bomber", "fighter", "helicopter", "transport"].map(
            (category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={styles.categoryButtonText}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>

        <View style={styles.vehicleList}>
          {vehicles
            .filter(
              (v) =>
                selectedCategory === "all" || v.category === selectedCategory
            )
            .map((vehicle, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => setSelectedVehicle(vehicle)}
              >
                <Text style={styles.cardTitle}>{vehicle.Name}</Text>
                <Text style={styles.cardSubtitle}>{vehicle.Type}</Text>
                <View style={styles.specs}>
                  <Text style={styles.specText}>
                    Speed: {vehicle["Max Speed (km/h)"]} km/h
                  </Text>
                  <Text style={styles.specText}>
                    Range: {vehicle["Range (km)"]} km
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E2022",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E5E5E5",
    marginBottom: 16,
  },
  categoryScroll: {
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: "#2C2F31",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#4A4E51",
  },
  categoryButtonActive: {
    backgroundColor: "#4A4E51",
  },
  categoryButtonText: {
    color: "#E5E5E5",
    fontSize: 16,
  },
  vehicleList: {
    gap: 16,
  },
  card: {
    backgroundColor: "#2C2F31",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E5E5E5",
    marginBottom: 4,
  },
  cardSubtitle: {
    color: "#8B939A",
    fontSize: 14,
    marginBottom: 8,
  },
  specs: {
    gap: 4,
  },
  specText: {
    color: "#E5E5E5",
    fontSize: 14,
  },
});
