import React, { useState } from 'react';
import { Bot, X, Play, Code, CheckCircle, Terminal } from 'lucide-react';
import { MCP_TOOLS_MANIFEST, executeMcpToolCall } from '../mcp/mcpServer';

export default function McpConsoleModal({ isOpen, onClose, fleetState, onImmobilizeFromMcp }) {
  if (!isOpen) return null;

  const [selectedTool, setSelectedTool] = useState(MCP_TOOLS_MANIFEST[0].name);
  const [tankerInput, setTankerInput] = useState('TNKR-KN-09');
  const [reasonInput, setReasonInput] = useState('Unauthorized discharge detected at unapproved highway milepost');
  const [stationInput, setStationInput] = useState('NNPCL Mega Station, Central Area Abuja');
  const [mcpResult, setMcpResult] = useState(null);

  const handleExecute = (e) => {
    e.preventDefault();

    let args = {};
    if (selectedTool === 'get_tanker_status') {
      args = { tanker_id: tankerInput };
    } else if (selectedTool === 'list_active_fuel_alerts') {
      args = { severity_filter: 'ALL' };
    } else if (selectedTool === 'immobilize_truck_engine') {
      args = { tanker_id: tankerInput, reason: reasonInput };
      if (onImmobilizeFromMcp) onImmobilizeFromMcp(tankerInput);
    } else if (selectedTool === 'generate_nmdpra_waybill') {
      args = { tanker_id: tankerInput, retail_station: stationInput };
    }

    const output = executeMcpToolCall(selectedTool, args, fleetState);
    setMcpResult(output);
  };

  const toolManifest = MCP_TOOLS_MANIFEST.find(t => t.name === selectedTool);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(8, 13, 26, 0.88)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px'
    }}>
      
      <div className="glass-panel" style={{ width: '100%', maxWidth: '640px', padding: '24px', border: '1px solid var(--accent-purple)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bot size={24} color="var(--accent-purple)" />
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>
                AEGISFLEET MCP AI AGENT TERMINAL
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                Model Context Protocol (JSON-RPC 2.0) Agent Tool Execution Console
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleExecute} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Tool Selector */}
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              SELECT MCP TOOL (EXPOSED TO GEMINI / CLAUDE AGENTS)
            </label>
            <select
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value)}
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
              {MCP_TOOLS_MANIFEST.map(t => (
                <option key={t.name} value={t.name}>
                  {t.name} — {t.description.substring(0, 50)}...
                </option>
              ))}
            </select>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(30, 41, 59, 0.4)', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
            <strong>Tool Schema Description:</strong> {toolManifest?.description}
          </div>

          {/* Dynamic Inputs based on selected tool */}
          {(selectedTool === 'get_tanker_status' || selectedTool === 'immobilize_truck_engine' || selectedTool === 'generate_nmdpra_waybill') && (
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                ARGUMENT: tanker_id
              </label>
              <input
                type="text"
                value={tankerInput}
                onChange={(e) => setTankerInput(e.target.value)}
                placeholder="e.g. TNKR-KN-09"
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
          )}

          {selectedTool === 'immobilize_truck_engine' && (
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                ARGUMENT: reason
              </label>
              <input
                type="text"
                value={reasonInput}
                onChange={(e) => setReasonInput(e.target.value)}
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
          )}

          {selectedTool === 'generate_nmdpra_waybill' && (
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                ARGUMENT: retail_station
              </label>
              <input
                type="text"
                value={stationInput}
                onChange={(e) => setStationInput(e.target.value)}
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
          )}

          <button type="submit" className="scada-btn scada-btn-purple" style={{ justifyContent: 'center' }}>
            <Play size={16} /> EXECUTE MCP TOOL CALL
          </button>

        </form>

        {/* MCP Output Console Payload */}
        {mcpResult && (
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-purple)', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={14} /> MCP JSON-RPC RESPONSE PAYLOAD
            </div>
            <pre className="font-mono" style={{
              background: '#040711',
              color: '#34d399',
              padding: '12px',
              borderRadius: '6px',
              fontSize: '0.75rem',
              maxHeight: '180px',
              overflowY: 'auto',
              border: '1px solid var(--border-color)'
            }}>
              {JSON.stringify(mcpResult, null, 2)}
            </pre>
          </div>
        )}

      </div>
    </div>
  );
}
