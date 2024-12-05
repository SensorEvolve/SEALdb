export const QUERIES = {
  GET_BOMBERS: `
    SELECT 
      Name,
      Type,
      "Max Speed (km/h)",
      "Service Ceiling (m)",
      "Range (km)",
      "Combat Radius (km)",
      'bomber' as category
    FROM russian_bombers
  `,
  GET_FIGHTERS: `
    SELECT 
      Name,
      Type,
      "Max Speed (km/h)",
      "Service Ceiling (m)",
      "Range (km)",
      "Combat Radius (km)",
      'fighter' as category
    FROM russian_fighters
  `,
  GET_HELICOPTERS: `
    SELECT 
      Name,
      Type,
      "Max Speed (km/h)",
      "Service Ceiling (m)",
      "Range (km)",
      "Combat Radius (km)",
      'helicopter' as category
    FROM russian_helicopters
  `,
  GET_TRANSPORT: `
    SELECT 
      Name,
      Type,
      "Max Speed (km/h)",
      "Service Ceiling (m)",
      "Range (km)",
      NULL as "Combat Radius (km)",
      'transport' as category
    FROM russian_transport_aircraft
  `
};
