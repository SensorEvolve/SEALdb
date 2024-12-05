// src/types/vehicle.ts

export interface Vehicle {
  Name: string;
  Type: string;
  "Max Speed (km/h)": number;
  "Service Ceiling (m)": number;
  "Range (km)": number;
  "Combat Radius (km)"?: number | string;
  "Radar System": string;
  "Radar Range (km)": string;
  "Service Year": number | string;
  Status: string;
  category?: string;
}

export interface Fighter extends Vehicle {
  Generation: string;
  Armament: string;
  "Special Features": string;
  Variants: string;
}

export interface Helicopter extends Vehicle {
  "Main Armament": string;
  "Secondary Systems": string;
  Variants: string;
}

export interface TransportAircraft extends Vehicle {
  "Max Takeoff Weight (tons)": number;
  "Cargo Capacity (tons)": number;
  "Special Features": string;
  Variants: string;
}

// Keep your CREATE_TABLES constant as is
export const CREATE_TABLES = `...`; // Your existing SQL
