/**
 * AegisFleet Model Context Protocol (MCP) Server
 * Exposes AI Agent tools for Petrol Tanker Fleet Telematics & Anti-Theft Management.
 */

import { INITIAL_TANKERS, INITIAL_ALARMS } from '../data/fleetData.js';

export const MCP_TOOLS_MANIFEST = [
  {
    name: "get_tanker_status",
    description: "Query real-time telematics, GPS location, speed, compartment fuel levels, and seal status for a specific Nigerian petrol tanker truck.",
    inputSchema: {
      type: "object",
      properties: {
        tanker_id: { type: "string", description: "Tanker ID (e.g. TNKR-LA-01, TNKR-KN-09)" }
      },
      required: ["tanker_id"]
    }
  },
  {
    name: "list_active_fuel_alerts",
    description: "Retrieve all active unacknowledged fuel theft, geofence breach, or valve tampering alerts across Nigerian transport corridors.",
    inputSchema: {
      type: "object",
      properties: {
        severity_filter: { type: "string", enum: ["ALL", "CRITICAL", "WARNING"], description: "Optional severity filter" }
      }
    }
  },
  {
    name: "immobilize_truck_engine",
    description: "Transmit a remote ECU kill-switch signal to freeze the engine of a compromised petrol tanker truck immediately.",
    inputSchema: {
      type: "object",
      properties: {
        tanker_id: { type: "string", description: "Tanker ID to immobilize" },
        reason: { type: "string", description: "Reason for emergency immobilization" }
      },
      required: ["tanker_id", "reason"]
    }
  },
  {
    name: "generate_nmdpra_waybill",
    description: "Generate an NMDPRA-compliant digital delivery certificate for fuel discharge at a retail gas station.",
    inputSchema: {
      type: "object",
      properties: {
        tanker_id: { type: "string", description: "Tanker ID" },
        retail_station: { type: "string", description: "Destination gas station name" }
      },
      required: ["tanker_id", "retail_station"]
    }
  }
];

export function executeMcpToolCall(toolName, args, fleetState) {
  const tankers = fleetState?.tankers || INITIAL_TANKERS;
  const alarms = fleetState?.alarms || INITIAL_ALARMS;

  switch (toolName) {
    case 'get_tanker_status': {
      const truck = tankers.find(t => t.id === args.tanker_id || t.plateNumber.includes(args.tanker_id));
      if (!truck) {
        return { error: `Tanker '${args.tanker_id}' not found in Nigerian fleet database.` };
      }
      return {
        id: truck.id,
        plateNumber: truck.plateNumber,
        driver: truck.driverName,
        status: truck.status,
        speedKmH: truck.speedKmH,
        currentLocation: truck.currentLocation,
        coordinates: { lat: truck.gpsLat, lng: truck.gpsLng },
        fuelVolumeLiters: `${truck.currentVolumeLiters} / ${truck.capacityLiters} L`,
        sealStatus: truck.sealStatus,
        compartments: truck.compartments
      };
    }

    case 'list_active_fuel_alerts': {
      const active = alarms.filter(a => !a.acknowledged);
      return {
        count: active.length,
        alerts: active.map(a => ({
          id: a.id,
          timestamp: a.timestamp,
          tankerId: a.tankerId,
          severity: a.severity,
          message: a.message
        }))
      };
    }

    case 'immobilize_truck_engine': {
      const truck = tankers.find(t => t.id === args.tanker_id);
      if (!truck) return { error: `Tanker '${args.tanker_id}' not found.` };
      return {
        success: true,
        tankerId: truck.id,
        action: "ECU_STARTER_CUTOFF_TRANSMITTED",
        vehicleStatus: "IMMOBILIZED_REMOTE",
        speedKmH: 0,
        lawEnforcementNotice: "Police Command & Sector Control Notified",
        auditReason: args.reason
      };
    }

    case 'generate_nmdpra_waybill': {
      const truck = tankers.find(t => t.id === args.tanker_id);
      return {
        waybillNumber: `NMDPRA-WB-${Math.floor(100000 + Math.random() * 900000)}`,
        issueDate: new Date().toISOString(),
        transporter: truck?.transporter || "Oando Logistics",
        product: truck?.product || "PMS Petrol",
        volumeDischargedLiters: truck?.capacityLiters || 45000,
        destinationStation: args.retail_station,
        sealVerification: "VERIFIED_INTACT_AT_DISCHARGE",
        digitalSignatureHash: `0x8F9A...${Math.floor(1000 + Math.random() * 9000)}`
      };
    }

    default:
      return { error: `Unknown MCP tool '${toolName}'` };
  }
}
