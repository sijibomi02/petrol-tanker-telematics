import React from 'react';
import { ShieldAlert, Lock, Unlock, Power, Radio, PhoneCall, AlertTriangle } from 'lucide-react';

export default function SecurityControls({ tankers, onRemoteImmobilize }) {
  return (
    <div className="glass-panel" style={{ padding: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.1rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={20} color="var(--accent-crimson)" /> REMOTE ENGINE IMMOBILIZER & ELECTRONIC SEAL COMMAND MATRIX
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
            Automated ECU starter cutoff, discharge valve solenoid locks, and NMDPRA anti-theft interlocks
          </p>
        </div>

        <span className="status-badge status-badge-success">
          ECU INTERLOCKS ARMED
        </span>
      </div>

      {/* Grid of Tanker Security Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {tankers.map(tanker => {
          const isBreached = tanker.status === 'TAMPER_ALERT';
          const isImmobilized = tanker.status === 'IMMOBILIZED_REMOTE';

          return (
            <div
              key={tanker.id}
              className={`glass-panel ${isBreached ? 'glass-panel-danger' : ''}`}
              style={{ padding: '16px', background: isBreached ? 'rgba(239,68,68,0.1)' : 'rgba(15,23,42,0.85)' }}
            >
              
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{tanker.plateNumber}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tanker.transporter} • {tanker.product}</div>
                </div>

                <span className={`status-badge ${
                  isImmobilized ? 'status-badge-info' : 
                  isBreached ? 'status-badge-danger' : 'status-badge-success'
                }`}>
                  {isImmobilized ? 'IMMOBILIZED' : isBreached ? 'TAMPER BREACH' : 'IN TRANSIT'}
                </span>
              </div>

              {/* Status metrics */}
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                <div>Location: <strong style={{ color: '#fff' }}>{tanker.currentLocation}</strong></div>
                <div>Speed: <strong className="font-mono" style={{ color: '#fff' }}>{tanker.speedKmH} km/h</strong></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Digital Hatch Seal: 
                  <span style={{ color: isBreached ? 'var(--accent-crimson)' : 'var(--accent-emerald)', fontWeight: 600 }}>
                    {tanker.sealStatus}
                  </span>
                </div>
              </div>

              {/* Engine Immobilizer Action Button */}
              {isImmobilized ? (
                <div className="status-badge status-badge-info" style={{ width: '100%', justifyContent: 'center', padding: '8px' }}>
                  🔒 ECU ENGINE CUTOFF TRANSMITTED (SPEED: 0 KM/H)
                </div>
              ) : (
                <button
                  onClick={() => onRemoteImmobilize(tanker.id)}
                  className={`scada-btn ${isBreached ? 'scada-btn-danger' : 'scada-btn'}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Power size={14} /> TRIGGER REMOTE ENGINE IMMOBILIZER
                </button>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
