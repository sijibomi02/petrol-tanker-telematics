import React, { useState, useEffect } from 'react';
import { ShieldAlert, Truck, Activity, Play, Pause, AlertTriangle, Radio, Wrench, Layers, BookOpen, Bot, FileText, Compass } from 'lucide-react';

export default function Navbar({
  isStreaming,
  setIsStreaming,
  systemStatus,
  onOpenMcpModal,
  activeTab,
  setActiveTab,
  criticalAlarmCount
}) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toISOString().replace('T', ' ').substring(0, 19) + ' WAT / UTC+1');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', padding: '12px 24px', margin: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand & System Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #10b981 0%, #a855f7 100%)',
            padding: '10px',
            borderRadius: '8px',
            display: 'flex',
            boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
          }}>
            <Truck size={24} color="#080d1a" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.2rem', color: '#fff', margin: 0, fontWeight: 700 }}>
                AEGIS<span style={{ color: 'var(--accent-emerald)' }}>FLEET</span> NIGERIA
              </h1>
              <span className="status-badge status-badge-mcp" style={{ fontSize: '0.65rem' }}>
                MCP AI AGENT ENABLED
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
              Downstream Petrol Tanker Telematics & Remote Engine Immobilization Command Hub
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '6px', background: 'rgba(30, 41, 59, 0.5)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <button
            className={`scada-btn ${activeTab === 'MAP' ? 'scada-btn-success' : ''}`}
            onClick={() => setActiveTab('MAP')}
            style={{ fontSize: '0.8rem', padding: '6px 10px' }}
          >
            <Compass size={14} /> Fleet GPS Map
          </button>

          <button
            className={`scada-btn ${activeTab === 'SECURITY' ? 'scada-btn-danger' : ''}`}
            onClick={() => setActiveTab('SECURITY')}
            style={{ fontSize: '0.8rem', padding: '6px 10px' }}
          >
            <ShieldAlert size={14} /> Anti-Theft / Immobilizer
          </button>

          <button
            className={`scada-btn ${activeTab === 'WAYBILL' ? 'scada-btn-success' : ''}`}
            onClick={() => setActiveTab('WAYBILL')}
            style={{ fontSize: '0.8rem', padding: '6px 10px' }}
          >
            <FileText size={14} /> NMDPRA Waybills
          </button>

          <button
            className={`scada-btn ${activeTab === 'DRIVERS' ? 'scada-btn-success' : ''}`}
            onClick={() => setActiveTab('DRIVERS')}
            style={{ fontSize: '0.8rem', padding: '6px 10px' }}
          >
            <Layers size={14} /> Driver Scorecards
          </button>
        </div>

        {/* Right Status Controls & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          
          {/* Master Telemetry Stream Toggle */}
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`scada-btn ${isStreaming ? 'scada-btn-success' : ''}`}
            style={{ fontSize: '0.75rem', padding: '6px 10px' }}
          >
            {isStreaming ? (
              <>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)', display: 'inline-block', boxShadow: '0 0 8px var(--accent-emerald)' }}></span>
                <Pause size={14} /> TELEMETRY LIVE
              </>
            ) : (
              <>
                <Play size={14} color="var(--accent-amber)" /> PAUSED
              </>
            )}
          </button>

          {/* MCP AI Agent Console Button */}
          <button
            onClick={onOpenMcpModal}
            className="scada-btn scada-btn-purple"
            style={{ fontSize: '0.75rem' }}
          >
            <Bot size={15} /> Open MCP AI Console
          </button>

          {/* System Status Indicator */}
          <div className={`status-badge ${
            systemStatus === 'CRITICAL' ? 'status-badge-danger' : 'status-badge-success'
          }`}>
            <ShieldAlert size={14} />
            {systemStatus === 'CRITICAL' ? `FUEL BREACH (${criticalAlarmCount})` : systemStatus}
          </div>

          {/* Live WAT Clock */}
          <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', borderLeft: '1px solid var(--border-color)', paddingLeft: '10px' }}>
            {timeStr}
          </div>

        </div>

      </div>
    </header>
  );
}
