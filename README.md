# 🚚 AegisFleet Nigeria — Petrol Tanker Telematics & MCP AI Agent Hub

[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-JSON--RPC_2.0-A855F7)](https://modelcontextprotocol.io/)
[![Regulatory Compliance](https://img.shields.io/badge/NMDPRA%20%2F%20FRSC-Compliant-10B981)](#-nmdpra--regulatory-compliance)

**AegisFleet Nigeria** is a modern, enterprise-grade telematics and anti-fuel theft management platform designed specifically for downstream petroleum logistics across Nigerian transport corridors (Lagos, Port Harcourt, Warri, Ore, Lokoja, Abuja, Enugu, Kano).

It combines a real-time **Leaflet OpenStreetMap control dashboard** with an integrated **Model Context Protocol (MCP) Server**, enabling AI Agents (Gemini, Claude, Cursor) to autonomously inspect fleet metrics, audit anti-theft alarms, and remotely trigger vehicle engine immobilizers.

---

## 🇳🇬 The Problem & Business Solution

In West Africa and Nigeria, downstream petroleum distribution loses millions of dollars annually to:
* **Fuel Pilferage & Siphoning**: Drivers or unauthorized third parties unlatching compartment discharge valves in transit.
* **Route Diversions**: Petrol tankers deviating off approved highway corridors to illegal discharge points.
* **Manual Waybill Fraud**: Discrepancies between loaded refinery depot volume and delivered retail filling station volume.

**AegisFleet** solves these challenges by uniting IoT ultrasonic fuel probes, GPS geofencing, electronic solenoid valve seals, remote ECU engine immobilization, and cryptographic NMDPRA digital discharge receipts into a single command center.

---

## ✨ Key Feature Modules

### 1. 🗺️ Real-Time Leaflet GIS Telematics Map
* Real-world **Leaflet OpenStreetMap** tiles centered over Nigeria (`[8.012, 6.842]`).
* Pre-mapped Nigerian highway corridors (*Lagos ➔ Ibadan ➔ Lokoja ➔ Abuja*, *Port Harcourt ➔ Enugu*, *Ore ➔ Kano*).
* Interactive tanker markers color-coded by status (*Green: In Transit*, *Red: Tamper/Theft Breach*, *Amber: Geofence Divert*).

### 2. 🛢️ Multi-Compartment Fuel Sensor Engine
* Live monitoring of 3 to 5 internal truck compartments carrying **PMS (Premium Motor Spirit - Petrol)**, **AGO (Automotive Gas Oil - Diesel)**, and **DPK (Kerosene)**.
* Ultrasonic fuel level probes calculating volume in Liters, fill percentage %, and liquid temperature (°F).

### 3. 🛡️ Anti-Theft & Remote Engine Immobilizer Deck
* **Electronic Hatch & Discharge Seal Monitor**: Real-time status of solenoid locks (`LOCKED_SECURE` vs `BREACHED_UNAUTHORIZED`).
* **1-Click Remote Engine Immobilizer**: Transmits an ECU starter cutoff signal to freeze vehicle power to 0 km/h remotely during hijack or siphoning attempts.

### 4. 📄 NMDPRA Digital Discharge Receipts & Waybills
* Generates cryptographic, tamper-proof digital discharge certificates upon fuel delivery at registered retail filling stations (NNPCL Mega Stations, TotalEnergies, Oando, Sahara Retail).

### 🤖 Model Context Protocol (MCP) AI Agent Server
AegisFleet exposes native **MCP JSON-RPC tools** allowing LLMs and AI Agents to query telemetry and actuate safety interlocks:

| MCP Tool Name | Description |
| :--- | :--- |
| **`get_tanker_status`** | Fetches live GPS coordinates, speed, compartment volumes, and seal status for a specified truck. |
| **`list_active_fuel_alerts`** | Retrieves active unacknowledged fuel theft alerts and geofence breaches across Nigeria. |
| **`immobilize_truck_engine`** | Transmits remote ECU starter cutoff command to immobilize a compromised tanker. |
| **`generate_nmdpra_waybill`** | Generates an official NMDPRA digital discharge receipt for retail station deliveries. |

---

## 🛠️ Tech Stack & Architecture

* **Frontend**: React 18, Vite 5, JavaScript (ES Module)
* **GIS Mapping**: Leaflet 1.9, React-Leaflet, OpenStreetMap tiles
* **Styling**: Modern Vanilla CSS, Glassmorphism, Industrial Dark Theme, Lucide Icons
* **Protocol Standard**: Model Context Protocol (MCP) JSON-RPC 2.0
* **Typography**: Chakra Petch, Inter, JetBrains Mono

---

## 🚀 Quickstart & Local Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher)
* `npm` or `yarn`

### Installation

1. **
   npm run mcp
   ```

---


Distributed under the MIT License. Designed in compliance with **NMDPRA** (Nigerian Midstream and Downstream Petroleum Regulatory Commission) digital tracking protocols and **FRSC** speed governor guidelines.
