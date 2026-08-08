export const INITIAL_TANKERS = [
  {
    id: 'TNKR-LA-01',
    plateNumber: 'KJA-842-XY (Lagos)',
    driverName: 'Ibrahim Musa',
    driverPhone: '+234 803 112 4491',
    transporter: 'Oando Fleet Logistics',
    product: 'PMS (Premium Motor Spirit - Petrol)',
    capacityLiters: 45000,
    currentVolumeLiters: 45000,
    originDepot: 'Atlas Cove Depot, Lagos',
    destinationDepot: 'NNPCL Mega Station, Central Area Abuja',
    currentLocation: 'Km 142 (Lagos-Ibadan Expressway near Ogere)',
    speedKmH: 68,
    status: 'IN_TRANSIT', // IN_TRANSIT | OFFLOADING | TAMPER_ALERT | IMMOBILIZED_REMOTE
    gpsLat: 6.902,
    gpsLng: 3.654,
    sealStatus: 'LOCKED_SECURE',
    compartments: [
      { id: 'C1', capacity: 15000, volume: 15000, product: 'PMS Petrol', tempF: 84.2 },
      { id: 'C2', capacity: 15000, volume: 15000, product: 'PMS Petrol', tempF: 84.0 },
      { id: 'C3', capacity: 15000, volume: 15000, product: 'PMS Petrol', tempF: 84.5 }
    ]
  },
  {
    id: 'TNKR-PH-04',
    plateNumber: 'RSH-319-AA (Rivers)',
    driverName: 'Chidi Okonkwo',
    driverPhone: '+234 802 884 1029',
    transporter: 'TotalEnergies Marketing Nigeria',
    product: 'AGO (Automotive Gas Oil - Diesel)',
    capacityLiters: 33000,
    currentVolumeLiters: 33000,
    originDepot: 'Port Harcourt Refining Depot, Eleme',
    destinationDepot: 'Total Station, Commercial Avenue Enugu',
    currentLocation: 'Km 85 (Port Harcourt-Aba Expressway near Ihiala)',
    speedKmH: 54,
    status: 'IN_TRANSIT',
    gpsLat: 5.124,
    gpsLng: 7.342,
    sealStatus: 'LOCKED_SECURE',
    compartments: [
      { id: 'C1', capacity: 11000, volume: 11000, product: 'AGO Diesel', tempF: 86.0 },
      { id: 'C2', capacity: 11000, volume: 11000, product: 'AGO Diesel', tempF: 85.8 },
      { id: 'C3', capacity: 11000, volume: 11000, product: 'AGO Diesel', tempF: 86.2 }
    ]
  },
  {
    id: 'TNKR-KN-09',
    plateNumber: 'KNO-512-ZB (Kano)',
    driverName: 'Usman Garba',
    driverPhone: '+234 814 772 9012',
    transporter: 'Sahara Group Energy Fleet',
    product: 'PMS Petrol',
    capacityLiters: 40000,
    currentVolumeLiters: 28500, // Unexpected 11,500L drop alert!
    originDepot: 'Ore Depot, Ondo State',
    destinationDepot: 'Sahara Retail Station, Sharada Kano',
    currentLocation: 'Km 210 (Lokoja-Abuja Highway near Koton Karfe)',
    speedKmH: 0,
    status: 'TAMPER_ALERT',
    gpsLat: 8.012,
    gpsLng: 6.842,
    sealStatus: 'BREACHED_UNAUTHORIZED',
    compartments: [
      { id: 'C1', capacity: 15000, volume: 15000, product: 'PMS Petrol', tempF: 88.0 },
      { id: 'C2', capacity: 15000, volume: 8500, product: 'PMS (UNAUTHORIZED DROP)', tempF: 92.4 },
      { id: 'C3', capacity: 10000, volume: 5000, product: 'PMS (UNAUTHORIZED DROP)', tempF: 93.0 }
    ]
  },
  {
    id: 'TNKR-ED-05',
    plateNumber: 'BEN-401-CE (Edo)',
    driverName: 'Godwin Osagie',
    driverPhone: '+234 805 331 6028',
    transporter: 'Aradel Downstream Fleet',
    product: 'DPK (Dual Purpose Kerosene)',
    capacityLiters: 30000,
    currentVolumeLiters: 30000,
    originDepot: 'Warri Refinery Depot, Delta',
    destinationDepot: 'Aradel Retail Depot, Benin City',
    currentLocation: 'Km 42 (Warri-Benin Dual Carriageway)',
    speedKmH: 62,
    status: 'IN_TRANSIT',
    gpsLat: 5.824,
    gpsLng: 5.712,
    sealStatus: 'LOCKED_SECURE',
    compartments: [
      { id: 'C1', capacity: 10000, volume: 10000, product: 'DPK Kerosene', tempF: 85.0 },
      { id: 'C2', capacity: 10000, volume: 10000, product: 'DPK Kerosene', tempF: 85.2 },
      { id: 'C3', capacity: 10000, volume: 10000, product: 'DPK Kerosene', tempF: 84.8 }
    ]
  }
];

export const NIGERIAN_ROUTES = [
  {
    id: 'ROUTE-LAG-ABJ',
    name: 'Corridor 1: Lagos ➔ Ibadan ➔ Lokoja ➔ Abuja',
    waypoints: [
      [6.524, 3.379], // Lagos
      [7.377, 3.947], // Ibadan
      [7.802, 6.733], // Lokoja
      [9.076, 7.398]  // Abuja
    ]
  },
  {
    id: 'ROUTE-PH-ENU',
    name: 'Corridor 2: Port Harcourt ➔ Aba ➔ Enugu',
    waypoints: [
      [4.815, 7.049], // Port Harcourt
      [5.106, 7.366], // Aba
      [6.458, 7.546]  // Enugu
    ]
  }
];

export const INITIAL_ALARMS = [
  {
    id: 'ALM-FLEET-801',
    timestamp: new Date(Date.now() - 240000).toISOString(),
    tankerId: 'TNKR-KN-09',
    severity: 'CRITICAL',
    category: 'UNAUTHORIZED_DISCHARGE',
    message: 'Discharge Valve C2 & C3 unlatched at unapproved location (Koton Karfe Lokoja Axis). Mass loss: -11,500L',
    acknowledged: false,
    status: 'ACTIVE'
  },
  {
    id: 'ALM-FLEET-800',
    timestamp: new Date(Date.now() - 1500000).toISOString(),
    tankerId: 'TNKR-LA-01',
    severity: 'NOTICE',
    category: 'GEOFENCE_CHECK',
    message: 'Tanker KJA-842-XY verified entering Ogun State Highway Safety Zone (Speed: 68 km/h)',
    acknowledged: true,
    status: 'CLEARED'
  }
];
