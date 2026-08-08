import React from 'react';
import { UserCheck, Clock, ShieldCheck, Phone, AlertCircle, Award } from 'lucide-react';

export default function DriverTelematics({ tankers }) {
  return (
    <div className="glass-panel" style={{ padding: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.1rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserCheck size={20} color="var(--accent-emerald)" /> DRIVER SAFETY & FATIGUE TELEMATICS SCORECARDS
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
            FRSC speed governor monitoring, 4-hour mandatory driving rest timers & telematics scorecards
          </p>
        </div>

        <span className="status-badge status-badge-success">
          FRSC / NMDPRA CERTIFIED
        </span>
      </div>

      {/* Grid of Drivers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {tankers.map(tanker => {
          const isSpeeding = tanker.speedKmH > 70;

          return (
            <div key={tanker.id} style={{ background: 'rgba(15, 23, 42, 0.85)', borderRadius: '8px', border: '1px solid var(--border-color)', padding: '16px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{tanker.driverName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tanker.transporter}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(16,185,129,0.15)', color: 'var(--accent-emerald)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                  <Award size={14} /> SCORE: 94/100
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={13} color="var(--accent-cyan)" />
                  <span>Phone: <strong style={{ color: '#fff' }}>{tanker.driverPhone}</strong></span>
                </div>
                <div>Assigned Vehicle: <strong style={{ color: '#fff' }}>{tanker.plateNumber}</strong></div>
                <div>Current Speed: <strong className="font-mono" style={{ color: isSpeeding ? 'var(--accent-crimson)' : 'var(--accent-emerald)' }}>{tanker.speedKmH} km/h</strong> (Limit: 70 km/h)</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <Clock size={13} color="var(--accent-amber)" />
                  <span>Continuous Drive Time: <strong className="font-mono" style={{ color: 'var(--accent-amber)' }}>2h 45m</strong> (Rest in 1h 15m)</span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
