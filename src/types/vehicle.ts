export const CREATE_TABLES = `
CREATE TABLE IF NOT EXISTS russian_fighters (
  "Name" TEXT PRIMARY KEY,
  "Type" TEXT,
  "Generation" TEXT,
  "Max Speed (km/h)" INTEGER,
  "Service Ceiling (m)" INTEGER,
  "Range (km)" INTEGER,
  "Combat Radius (km)" INTEGER,
  "Radar System" TEXT,
  "Radar Range (km)" TEXT,
  "Service Year" INTEGER,
  "Status" TEXT,
  "Armament" TEXT,
  "Special Features" TEXT,
  "Variants" TEXT
);

CREATE TABLE IF NOT EXISTS russian_helicopters (
  "Name" TEXT PRIMARY KEY,
  "Type" TEXT,
  "Max Speed (km/h)" INTEGER,
  "Service Ceiling (m)" INTEGER,
  "Range (km)" INTEGER,
  "Combat Radius (km)" TEXT,
  "Radar System" TEXT,
  "Radar Range (km)" TEXT,
  "Service Year" INTEGER,
  "Status" TEXT,
  "Main Armament" TEXT,
  "Secondary Systems" TEXT,
  "Variants" TEXT
);

CREATE TABLE IF NOT EXISTS russian_transport_aircraft (
  "Name" TEXT PRIMARY KEY,
  "Type" TEXT,
  "Max Speed (km/h)" INTEGER,
  "Service Ceiling (m)" INTEGER,
  "Range (km)" INTEGER,
  "Max Takeoff Weight (tons)" INTEGER,
  "Cargo Capacity (tons)" REAL,
  "Radar System" TEXT,
  "Radar Range (km)" TEXT,
  "Service Year" TEXT,
  "Status" TEXT,
  "Special Features" TEXT,
  "Variants" TEXT
);

-- Initial data for fighters
INSERT OR IGNORE INTO russian_fighters VALUES
('Su-57', 'Fighter', '5th', 2440, 20000, 3500, 1500, 'N036 Byelka', '400', 2020, 'Active', 'Air-to-air missiles, 30mm cannon', 'Stealth features, Supercruise', 'Su-57E'),
('Su-35S', 'Fighter', '4++', 2400, 18000, 3600, 1580, 'Irbis-E', '350', 2014, 'Active', '30mm cannon, missiles, bombs', 'Thrust vectoring, Advanced avionics', 'Su-35SK'),
('MiG-35', 'Fighter', '4++', 2400, 17500, 2000, 1000, 'Zhuk-AE', '160', 2019, 'Active', '30mm cannon, missiles', 'AESA radar, Advanced cockpit', 'MiG-35D');

-- Initial data for helicopters
INSERT OR IGNORE INTO russian_helicopters VALUES
('Ka-52', 'Attack Helicopter', 310, 5500, 460, '250', 'FH-01', '20', 2011, 'Active', '30mm cannon, ATGMs', 'FLIR, Laser rangefinder', 'Ka-52K'),
('Mi-28N', 'Attack Helicopter', 300, 5600, 450, '200', 'N025', '15', 2009, 'Active', '30mm cannon, ATGMs', 'Night vision, Target tracking', 'Mi-28NM'),
('Mi-26', 'Heavy Transport', 295, 4600, 800, 'N/A', 'None', 'N/A', 1983, 'Active', 'None', 'Loading systems', 'Mi-26T2'),
