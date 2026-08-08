import React, { useState } from 'react';
import { AlertOctagon, CheckCircle2, ShieldAlert, Clock } from 'lucide-react';

export default function AlarmLog({ alarms, onAcknowledgeAlarm }) {
  const [filter, setFilter] = useState('ALL');

  const filteredAlarms = alarms.filter(alm => {
    if (filter === 'CRITICAL') return alm.severity === 'CRITICAL';
    if (filter === 'UNACKNOWLEDGED') return !alm.acknowledged;
    return true;
  });

  return (
    <div className="glass-panel" style={{ padding: '20px', marginTop: '16px' }}>
      
      {/* Header & Filter Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h3 style={{ fontSize: '1rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertOctagon size={18} color="var(--accent-crimson)" /> ISA 18.2 TELEMATICS ANTI-THEFT ALARM AUDIT LOG
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
            Automated event logs, geofence breaches, hatch tampering alerts, and operator response audit trail
          </p>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setFilter('ALL')}
            className={`scada-btn ${filter === 'ALL' ? 'scada-btn-success' : ''}`}
            style={{ fontSize: '0.75rem', padding: '4px 10px' }}
          >
            All ({alarms.length})
          </button>
          <button
            onClick={() => setFilter('CRITICAL')}
            className={`scada-btn ${filter === 'CRITICAL' ? 'scada-btn-danger' : ''}`}
            style={{ fontSize: '0.75rem', padding: '4px 10px' }}
          >
            Critical ({alarms.filter(a => a.severity === 'CRITICAL').length})
          </button>
          <button
            onClick={() => setFilter('UNACKNOWLEDGED')}
            className={`scada-btn ${filter === 'UNACKNOWLEDGED' ? 'scada-btn-amber' : ''}`}
            style={{ fontSize: '0.75rem', padding: '4px 10px' }}
          >
            Unacknowledged ({alarms.filter(a => !a.acknowledged).length})
          </button>
        </div>
      </div>

      {/* Alarms Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
              <th style={{ padding: '8px 12px' }}>TIMESTAMP (WAT)</th>
              <th style={{ padding: '8px 12px' }}>SEVERITY</th>
              <th style={{ padding: '8px 12px' }}>TRUCK / ASSET</th>
              <th style={{ padding: '8px 12px' }}>CATEGORY</th>
              <th style={{ padding: '8px 12px' }}>EVENT MESSAGE</th>
              <th style={{ padding: '8px 12px', textAlign: 'right' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlarms.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No active telematics security alarms matching current filter.
                </td>
              </tr>
            ) : (
              filteredAlarms.map(alm => (
                <tr key={alm.id} style={{
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  background: !alm.acknowledged && alm.severity === 'CRITICAL' ? 'rgba(239,68,68,0.08)' : 'transparent'
                }}>
                  
                  <td className="font-mono" style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>
                    <Clock size={12} style={{ marginRight: '6px', display: 'inline' }} />
                    {alm.timestamp.substring(11, 19)}
                  </td>

                  <td style={{ padding: '10px 12px' }}>
                    <span className={`status-badge ${
                      alm.severity === 'CRITICAL' ? 'status-badge-danger' : 
                      alm.severity === 'WARNING' ? 'status-badge-warning' : 'status-badge-info'
                    }`}>
                      {alm.severity}
                    </span>
                  </td>

                  <td className="font-mono" style={{ padding: '10px 12px', color: '#fff', fontWeight: 600 }}>
                    {alm.tankerId}
                  </td>

                  <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>
                    {alm.category}
                  </td>

                  <td style={{ padding: '10px 12px', color: alm.severity === 'CRITICAL' ? '#fca5a5' : '#fff' }}>
                    {alm.message}
                  </td>

                  <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                    {alm.acknowledged ? (
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={13} /> ACKNOWLEDGED
                      </span>
                    ) : (
                      <button
                        onClick={() => onAcknowledgeAlarm(alm.id)}
                        className="scada-btn scada-btn-amber"
                        style={{ fontSize: '0.7rem', padding: '3px 8px' }}
                      >
                        ACK ALARM
                      </button>
                    )}
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
