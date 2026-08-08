import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FleetMap from './components/FleetMap';
import CompartmentGauges from './components/CompartmentGauges';
import SecurityControls from './components/SecurityControls';
import WaybillHub from './components/WaybillHub';
import DriverTelematics from './components/DriverTelematics';
import AlarmLog from './components/AlarmLog';
import McpConsoleModal from './components/McpConsoleModal';

import { INITIAL_TANKERS, INITIAL_ALARMS } from './data/fleetData';
import { updateFleetTelemetry, triggerRemoteEngineImmobilizer } from './services/fleetEngine';

export default function App() {
  const [tankers, setTankers] = useState(INITIAL_TANKERS);
  const [alarms, setAlarms] = useState(INITIAL_ALARMS);
  
  const [selectedTanker, setSelectedTanker] = useState(INITIAL_TANKERS[0]);
  const [activeIncident, setActiveIncident] = useState(null);
  
  const [isStreaming, setIsStreaming] = useState(true);
  const [isMcpModalOpen, setIsMcpModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('MAP');

  const currentSelectedTanker = tankers.find(t => t.id === selectedTanker?.id) || tankers[0];

  const systemStatus = tankers.some(t => t.status === 'TAMPER_ALERT') ? 'CRITICAL' : 'NORMAL';
  const criticalAlarmCount = alarms.filter(a => a.severity === 'CRITICAL' && !a.acknowledged).length;

  // Real-time telematics stream tick (1000ms)
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      setTankers(prev => updateFleetTelemetry(prev, activeIncident));
    }, 1000);

    return () => clearInterval(interval);
  }, [isStreaming, activeIncident]);

  // Remote engine immobilizer action
  const handleRemoteImmobilize = (tankerId) => {
    setTankers(prev => triggerRemoteEngineImmobilizer(prev, tankerId));

    if (activeIncident && activeIncident.tankerId === tankerId) {
      setActiveIncident(null);
    }

    setAlarms(prev => [
      {
        id: `ALM-FLEET-${Math.floor(100 + Math.random() * 900)}`,
        timestamp: new Date().toISOString(),
        tankerId,
        severity: 'NOTICE',
        category: 'ENGINE_IMMOBILIZER',
        message: `Remote ECU starter cutoff signal transmitted to ${tankerId}. Vehicle engine power cut to 0 km/h. Police command notified.`,
        acknowledged: true,
        status: 'ACTIVE'
      },
      ...prev
    ]);
  };

  const handleAcknowledgeAlarm = (alarmId) => {
    setAlarms(prev => prev.map(a => a.id === alarmId ? { ...a, acknowledged: true } : a));
  };

  return (
    <div className="scada-container">
      
      {/* Navbar Header */}
      <Navbar
        isStreaming={isStreaming}
        setIsStreaming={setIsStreaming}
        systemStatus={systemStatus}
        onOpenMcpModal={() => setIsMcpModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        criticalAlarmCount={criticalAlarmCount}
      />

      {/* Main View Area */}
      <main style={{ padding: '20px', flex: 1, maxWidth: '1600px', width: '100%', margin: '0 auto' }}>
        
        {activeTab === 'MAP' && (
          <>
            <FleetMap
              tankers={tankers}
              selectedTanker={currentSelectedTanker}
              onSelectTanker={(t) => setSelectedTanker(t)}
            />

            <CompartmentGauges selectedTanker={currentSelectedTanker} />

            <AlarmLog alarms={alarms} onAcknowledgeAlarm={handleAcknowledgeAlarm} />
          </>
        )}

        {activeTab === 'SECURITY' && (
          <SecurityControls
            tankers={tankers}
            onRemoteImmobilize={handleRemoteImmobilize}
          />
        )}

        {activeTab === 'WAYBILL' && (
          <WaybillHub tankers={tankers} />
        )}

        {activeTab === 'DRIVERS' && (
          <DriverTelematics tankers={tankers} />
        )}

      </main>

      {/* MCP AI Agent Terminal Modal */}
      <McpConsoleModal
        isOpen={isMcpModalOpen}
        onClose={() => setIsMcpModalOpen(false)}
        fleetState={{ tankers, alarms }}
        onImmobilizeFromMcp={handleRemoteImmobilize}
      />

    </div>
  );
}
