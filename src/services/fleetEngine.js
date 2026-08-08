/**
 * AegisFleet Telematics & Multi-Compartment Fuel Probe Engine
 */

export function updateFleetTelemetry(tankers, activeIncident) {
  return tankers.map(tanker => {
    if (tanker.status === 'IMMOBILIZED_REMOTE') {
      return {
        ...tanker,
        speedKmH: 0
      };
    }

    // Normal speed & GPS movement jitter
    const speedJitter = (Math.random() - 0.5) * 4;
    let newSpeed = Math.max(0, Math.min(80, Math.round(tanker.speedKmH + speedJitter)));

    let status = tanker.status;
    let currentVolume = tanker.currentVolumeLiters;
    let sealStatus = tanker.sealStatus;
    let compartments = [...tanker.compartments];

    if (activeIncident && activeIncident.tankerId === tanker.id) {
      status = 'TAMPER_ALERT';
      newSpeed = 0;
      sealStatus = 'BREACHED_UNAUTHORIZED';
      currentVolume = Math.max(10000, currentVolume - 250);
      
      compartments = compartments.map((c, idx) => {
        if (idx === 1 || idx === 2) {
          return { ...c, volume: Math.max(2000, c.volume - 120), tempF: 92.8 };
        }
        return c;
      });
    }

    return {
      ...tanker,
      speedKmH: newSpeed,
      status,
      currentVolumeLiters: currentVolume,
      sealStatus,
      compartments
    };
  });
}

export function triggerRemoteEngineImmobilizer(tankers, tankerId) {
  return tankers.map(t => {
    if (t.id === tankerId) {
      return {
        ...t,
        status: 'IMMOBILIZED_REMOTE',
        speedKmH: 0,
        sealStatus: 'ENGINE_IMMOBILIZED_REMOTE'
      };
    }
    return t;
  });
}
