import React, { useState } from 'react';
import { FileText, CheckCircle2, ShieldCheck, Printer, Download, Search } from 'lucide-react';

export default function WaybillHub({ tankers }) {
  const [selectedTruck, setSelectedTruck] = useState(tankers[0].id);
  const [retailStation, setRetailStation] = useState('NNPCL Mega Station, Central Area Abuja');
  const [waybill, setWaybill] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    const truck = tankers.find(t => t.id === selectedTruck) || tankers[0];
    
    setWaybill({
      waybillNo: `NMDPRA-WB-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' WAT',
      transporter: truck.transporter,
      plateNumber: truck.plateNumber,
      driverName: truck.driverName,
      product: truck.product,
      originDepot: truck.originDepot,
      destinationStation: retailStation,
      volumeDischargedLiters: truck.capacityLiters,
      densityKgM3: 742.5,
      temperatureF: 84.0,
      sealState: 'VERIFIED_INTACT_AT_DISCHARGE',
      digitalHash: `0x9F7C${Math.floor(100000 + Math.random() * 900000)}`
    });
  };

  return (
    <div className="glass-panel" style={{ padding: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.1rem', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} color="var(--accent-cyan)" /> NMDPRA DIGITAL WAYBILL & DISCHARGE CERTIFICATE HUB
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
            Automated petroleum discharge volume reconciliation & tamper-proof cryptographic certificates
          </p>
        </div>

        <span className="status-badge status-badge-info">
          NMDPRA PIA 2021 COMPLIANT
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Generator Form */}
        <div style={{ background: 'rgba(15, 23, 42, 0.85)', borderRadius: '8px', border: '1px solid var(--border-color)', padding: '16px' }}>
          <h3 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '14px' }}>
            Generate Digital Discharge Certificate
          </h3>

          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                SELECT TANKER VEHICLE
              </label>
              <select
                value={selectedTruck}
                onChange={(e) => setSelectedTruck(e.target.value)}
                style={{
                  width: '100%',
                  background: '#080d1a',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                {tankers.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.plateNumber} ({t.product})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                DESTINATION RETAIL FILLING STATION
              </label>
              <input
                type="text"
                value={retailStation}
                onChange={(e) => setRetailStation(e.target.value)}
                style={{
                  width: '100%',
                  background: '#080d1a',
                  border: '1px solid var(--border-color)',
                  color: '#fff',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-heading)'
                }}
              />
            </div>

            <button type="submit" className="scada-btn scada-btn-success" style={{ marginTop: '6px', justifyContent: 'center' }}>
              <FileText size={16} /> GENERATE NMDPRA DIGITAL CERTIFICATE
            </button>
          </form>
        </div>

        {/* Certificate Display Preview */}
        <div style={{ background: 'rgba(9, 13, 20, 0.9)', borderRadius: '8px', border: '1px solid var(--border-color)', padding: '16px', position: 'relative' }}>
          {waybill ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                    NMDPRA OFFICIAL DISCHARGE WAYBILL
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {waybill.waybillNo}
                  </div>
                </div>

                <span className="status-badge status-badge-success" style={{ fontSize: '0.65rem' }}>
                  <ShieldCheck size={12} /> VERIFIED
                </span>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div>Transporter: <strong style={{ color: '#fff' }}>{waybill.transporter}</strong></div>
                <div>Vehicle Plate: <strong style={{ color: '#fff' }}>{waybill.plateNumber}</strong></div>
                <div>Driver: <strong style={{ color: '#fff' }}>{waybill.driverName}</strong></div>
                <div>Product Delivered: <strong style={{ color: 'var(--accent-cyan)' }}>{waybill.product}</strong></div>
                <div>Volume Discharged: <strong className="font-mono" style={{ color: '#fff' }}>{waybill.volumeDischargedLiters.toLocaleString()} Liters</strong></div>
                <div>Destination: <strong style={{ color: '#fff' }}>{waybill.destinationStation}</strong></div>
                <div>Hatch Seal Status: <strong style={{ color: 'var(--accent-emerald)' }}>{waybill.sealState}</strong></div>
                <div style={{ wordBreak: 'break-all', marginTop: '6px' }}>
                  Crypto Hash: <span className="font-mono" style={{ color: 'var(--accent-purple)' }}>{waybill.digitalHash}</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
              Select a tanker truck and click Generate to produce an official NMDPRA waybill certificate.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
