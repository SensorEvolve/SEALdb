export const CREATE_TABLES = `
DROP TABLE IF EXISTS russian_fighters;
DROP TABLE IF EXISTS russian_helicopters;
DROP TABLE IF EXISTS russian_transport_aircraft;

CREATE TABLE russian_fighters (
    "Name" TEXT,
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

CREATE TABLE russian_helicopters (
    "Name" TEXT,
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

CREATE TABLE russian_transport_aircraft (
    "Name" TEXT,
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
`;
