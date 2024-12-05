import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { QUERIES } from './src/db/queries';
import { openDatabase } from './src/db/database';

type Vehicle = {
  Name: string;
  Type: string;
  'Max Speed (km/h)': number;
  'Service Ceiling (m)': number;
  'Range (km)': number;
  'Combat Radius (km)'?: number;
  category: string;
};

type SQLResultSet = {
  rows: {
    _array: any[];
    length: number;
    item: (index: number) => any;
  };
  rowsAffected: number;
  insertId?: number;
};

type SQLError = {
  message: string;
};

export default function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const db = openDatabase();

      Object.entries(QUERIES).forEach(([category, query]) => {
        db.transaction((tx: any) => {
          tx.executeSql(
            query,
            [],
            (_: any, result: SQLResultSet) => {
              setVehicles(curr => [...curr, ...(result.rows._array || [])]);
            },
            (_: any, error: SQLError): boolean => {
              console.error(`Error executing ${category} query:`, error);
              return false;
            }
          );
        });
      });
    } catch (err) {
      console.error('Database error:', err);
      setError('Failed to load database');
    }
  }, []);

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

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
          {['all', 'bomber', 'fighter', 'helicopter', 'transport'].map(
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
                selectedCategory === 'all' || v.category === selectedCategory
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
                    Speed: {vehicle['Max Speed (km/h)']} km/h
                  </Text>
                  <Text style={styles.specText}>
                    Range: {vehicle['Range (km)']} km
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
    backgroundColor: '#1E2022',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E5E5E5',
    marginBottom: 16,
  },
  categoryScroll: {
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#2C2F31',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#4A4E51',
  },
  categoryButtonActive: {
    backgroundColor: '#4A4E51',
  },
  categoryButtonText: {
    color: '#E5E5E5',
    fontSize: 16,
  },
  vehicleList: {
    gap: 16,
  },
  card: {
    backgroundColor: '#2C2F31',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E5E5E5',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#8B939A',
    fontSize: 14,
    marginBottom: 8,
  },
  specs: {
    gap: 4,
  },
  specText: {
    color: '#E5E5E5',
    fontSize: 14,
  },
  errorText: {
    color: '#E5E5E5',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
