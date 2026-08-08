import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Truck, Navigation, ShieldAlert, CheckCircle, MapPin, Gauge } from 'lucide-react';
import { NIGERIAN_ROUTES } from '../data/fleetData';

// Custom Leaflet Icons for Petrol Tankers
const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function FleetMap({ tankers, selectedTanker, onSelectTanker }) {
  const centerNigeria = [8.012, 6.842]; // Lokoja / Central Nigeria

  return (
    <div className="glass-panel" style={{ padding: '16px', position: 'relative' }}>
      
      {/* Panel Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Truck size={18} color="var(--accent-emerald)" /> REAL-TIME NIGERIAN PETROL TANKER GPS MAP
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
            Live Leaflet OpenStreetMap telemetry, geofence corridor tracking & anti-siphoning alerts
          </p>
        </div>

        <div style={{ display: 'flex', gap: '14px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%' }}></span> In Transit (Normal)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', background: '#ef4444', borderRadius: '50%', boxShadow: '0 0 6px #ef4444' }}></span> Theft / Tamper Breach
          </div>
        </div>
      </div>

      {/* Leaflet Map Canvas */}
      <div style={{ width: '100%', height: '460px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
        <MapContainer center={centerNigeria} zoom={6} style={{ width: '100%', height: '100%' }}>
          
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Highway Route Polylines */}
          {NIGERIAN_ROUTES.map(route => (
            <Polyline
              key={route.id}
              positions={route.waypoints}
              pathOptions={{ color: '#06b6d4', weight: 3, opacity: 0.6, dashArray: '6 6' }}
            />
          ))}

          {/* Petrol Tanker Markers */}
          {tankers.map(tanker => {
            const isBreached = tanker.status === 'TAMPER_ALERT';
            const icon = isBreached ? redIcon : greenIcon;

            return (
              <Marker
                key={tanker.id}
                position={[tanker.gpsLat, tanker.gpsLng]}
                icon={icon}
                eventHandlers={{
                  click: () => onSelectTanker(tanker)
                }}
              >
                <Popup>
                  <div style={{ minWidth: '180px', fontFamily: 'Inter, sans-serif' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {tanker.plateNumber}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '4px' }}>
                      Driver: {tanker.driverName}<br />
                      Product: <strong>{tanker.product}</strong><br />
                      Volume: <strong>{tanker.currentVolumeLiters.toLocaleString()} / {tanker.capacityLiters.toLocaleString()} L</strong><br />
                      Speed: <strong>{tanker.speedKmH} km/h</strong><br />
                      Status: <span style={{ color: isBreached ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>{tanker.status}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}

        </MapContainer>
      </div>

    </div>
  );
}
