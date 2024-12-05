export const CREATE_TABLES = `
  CREATE TABLE IF NOT EXISTS russian_bombers (
    Name TEXT PRIMARY KEY,
    Type TEXT,
    "Max Speed (km/h)" INTEGER,
    "Service Ceiling (m)" INTEGER,
    "Range (km)" INTEGER,
    "Combat Radius (km)" INTEGER,
    "Radar System" TEXT,
    "Radar Range (km)" TEXT
  );

  CREATE TABLE IF NOT EXISTS russian_fighters (
    Name TEXT PRIMARY KEY,
    Type TEXT,
    "Max Speed (km/h)" INTEGER,
    "Service Ceiling (m)" INTEGER,
    "Range (km)" INTEGER,
    "Combat Radius (km)" INTEGER,
    "Generation" TEXT,
    "Radar System" TEXT,
    "Radar Range (km)" TEXT
  );

  CREATE TABLE IF NOT EXISTS russian_helicopters (
    Name TEXT PRIMARY KEY,
    Type TEXT,
    "Max Speed (km/h)" INTEGER,
    "Service Ceiling (m)" INTEGER,
    "Range (km)" INTEGER,
    "Combat Radius (km)" INTEGER,
    "Radar System" TEXT,
    "Radar Range (km)" TEXT
  );

  CREATE TABLE IF NOT EXISTS russian_transport_aircraft (
    Name TEXT PRIMARY KEY,
    Type TEXT,
    "Max Speed (km/h)" INTEGER,
    "Service Ceiling (m)" INTEGER,
    "Range (km)" INTEGER,
    "Max Takeoff Weight (tons)" INTEGER,
    "Cargo Capacity (tons)" REAL
  );
`;
