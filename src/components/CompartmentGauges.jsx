import React from 'react';
import { Layers, Droplet, AlertOctagon, ShieldCheck } from 'lucide-react';

export default function CompartmentGauges({ selectedTanker }) {
  if (!selectedTanker) return null;

  const { plateNumber, driverName, transporter, product, currentVolumeLiters, capacityLiters, compartments, status } = selectedTanker;
  const totalFillPct = Math.round((currentVolumeLiters / capacityLiters) * 100);
  const isBreached = status === 'TAMPER_ALERT';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
      
      {/* 1. Master Fuel Volume Card */}
      <div className={`glass-panel ${isBreached ? 'glass-panel-danger' : ''}`} style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '8px' }}>
          <span>TOTAL CARGO VOLUME</span>
          <Droplet size={16} color={isBreached ? 'var(--accent-crimson)' : 'var(--accent-emerald)'} />
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span className="font-mono" style={{ fontSize: '1.75rem', fontWeight: 700, color: isBreached ? 'var(--accent-crimson)' : '#fff' }}>
            {currentVolumeLiters.toLocaleString()}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>LITERS</span>
        </div>

        <div style={{ marginTop: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
          <div style={{
            width: `${totalFillPct}%`,
            height: '100%',
            background: isBreached ? 'var(--accent-crimson)' : 'var(--accent-emerald)',
            borderRadius: '4px',
            transition: 'width 0.5s ease'
          }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-dim)', marginTop: '4px' }}>
          <span>{totalFillPct}% Total Capacity</span>
          <span>Max {capacityLiters.toLocaleString()} L</span>
        </div>
      </div>

      {/* 2. Multi-Compartment Visualizer */}
      <div className="glass-panel" style={{ padding: '16px', gridColumn: 'span 2' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '10px' }}>
          <span>MULTI-COMPARTMENT ULTRASONIC FUEL PROBES ({plateNumber})</span>
          <Layers size={16} color="var(--accent-cyan)" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${compartments.length}, 1fr)`, gap: '12px' }}>
          {compartments.map((comp) => {
            const fillPct = Math.round((comp.volume / comp.capacity) * 100);
            const isCompLoss = fillPct < 90;

            return (
              <div key={comp.id} style={{ background: 'rgba(9, 13, 20, 0.7)', borderRadius: '6px', padding: '12px', border: isCompLoss ? '1px solid var(--accent-crimson)' : '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
                  <span>{comp.id}</span>
                  <span style={{ color: isCompLoss ? 'var(--accent-crimson)' : 'var(--accent-emerald)' }}>{fillPct}%</span>
                </div>

                <div style={{ height: '50px', background: '#080d1a', borderRadius: '4px', border: '1px solid #334155', position: 'relative', overflow: 'hidden', marginBottom: '8px' }}>
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: `${fillPct}%`,
                    background: isCompLoss ? 'linear-gradient(180deg, #ef4444 0%, #dc2626 100%)' : 'linear-gradient(180deg, #10b981 0%, #06b6d4 100%)',
                    opacity: 0.85,
                    transition: 'height 0.5s ease'
                  }}></div>
                </div>

                <div className="font-mono" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>
                  {comp.volume.toLocaleString()} L
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>
                  Cap: {comp.capacity.toLocaleString()}L • Temp {comp.tempF}°F
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
