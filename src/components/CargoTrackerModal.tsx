import React, { useState } from 'react';
import { TRACKING_DATABASE, TrackingData } from '../data/companyData';
import { X, Search, ShoppingBag, Truck, MapPin, AlertCircle } from 'lucide-react';

interface CargoTrackerModalProps {
  initialCode?: string;
  onClose: () => void;
}

export const CargoTrackerModal: React.FC<CargoTrackerModalProps> = ({
  initialCode = 'BCN-98234',
  onClose
}) => {
  const [searchCode, setSearchCode] = useState(initialCode);
  const [activeTracking, setActiveTracking] = useState<TrackingData | null>(
    TRACKING_DATABASE[initialCode] || TRACKING_DATABASE['BCN-98234']
  );
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = searchCode.trim().toUpperCase();
    if (TRACKING_DATABASE[formatted]) {
      setActiveTracking(TRACKING_DATABASE[formatted]);
      setSearchError(null);
    } else {
      setSearchError(`No s'ha trobat cap enviament amb el codi "${formatted}". Prova amb les referències de demostració "BCN-98234" o "MED-44102".`);
    }
  };

  const selectQuick = (code: string) => {
    setSearchCode(code);
    setActiveTracking(TRACKING_DATABASE[code]);
    setSearchError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-pink-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header in Dark Pink */}
        <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-pink-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Seguiment Concierge d&apos;Alta Costura TRANSAZZI
              </h3>
              <p className="text-[11px] text-pink-300">
                Traçabilitat privada del teu vestit o traje des de Passeig de Gràcia
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input in modal */}
        <div className="p-6 bg-pink-50/40 border-b border-pink-100">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-pink-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Introdueix el codi de la teva comanda VIP (ex: BCN-98234)..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 bg-white font-mono text-slate-900"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              Consultar
            </button>
          </form>

          {/* Quick Demo selectors */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-600">
            <span className="font-semibold text-slate-700">Demos disponibles:</span>
            <button
              type="button"
              onClick={() => selectQuick('BCN-98234')}
              className={`px-2.5 py-1 rounded-md border text-xs font-mono transition-colors ${
                activeTracking?.code === 'BCN-98234'
                  ? 'bg-pink-600 text-white border-pink-600 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-pink-500 hover:text-pink-600'
              }`}
            >
              BCN-98234 (Vestit &amp; Traje · Madrid)
            </button>
            <button
              type="button"
              onClick={() => selectQuick('MED-44102')}
              className={`px-2.5 py-1 rounded-md border text-xs font-mono transition-colors ${
                activeTracking?.code === 'MED-44102'
                  ? 'bg-pink-600 text-white border-pink-600 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-pink-500 hover:text-pink-600'
              }`}
            >
              MED-44102 (Cofre VIP · València)
            </button>
          </div>

          {searchError && (
            <div className="mt-3 p-3 bg-red-50 text-red-700 text-xs rounded-lg flex items-start gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{searchError}</span>
            </div>
          )}
        </div>

        {/* Tracking Details Body */}
        {activeTracking && (
          <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
            {/* Status card in Dark Slate & Pink */}
            <div className="bg-slate-950 text-white rounded-xl p-5 border border-pink-900/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
                <div>
                  <span className="text-xs text-pink-300 font-mono">CODI DE COMANDA:</span>
                  <h4 className="text-xl font-bold font-mono text-white">{activeTracking.code}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-pink-500/20 text-pink-300 text-xs font-semibold border border-pink-400/30">
                    {activeTracking.status === 'En trànsit marítim'
                      ? 'En trànsit express'
                      : activeTracking.status === 'Despatx duaner completat'
                      ? 'En repartiment'
                      : activeTracking.status}
                  </span>
                </div>
              </div>

              {/* Progress bar in Pink */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                  <span>Progrés de l&apos;enviament</span>
                  <span className="font-mono text-pink-300 font-bold">{activeTracking.progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-600 to-rose-400 transition-all duration-500"
                    style={{ width: `${activeTracking.progress}%` }}
                  />
                </div>
              </div>

              {/* Route Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block">Origen:</span>
                    <span className="font-semibold text-slate-100">{activeTracking.origin}</span>
                    <div className="text-[11px] text-slate-400">{activeTracking.originPort}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block">Destinació (ETA):</span>
                    <span className="font-semibold text-slate-100">{activeTracking.destination}</span>
                    <div className="text-[11px] text-pink-300 font-medium">{activeTracking.eta}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Garment Meta */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-pink-50/40 p-4 rounded-xl border border-pink-200 text-xs">
              <div>
                <span className="text-slate-500 block">Transport:</span>
                <span className="font-semibold text-slate-900">{activeTracking.vessel}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Embalatge:</span>
                <span className="font-mono font-semibold text-slate-900">{activeTracking.containerId}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Pes paquet:</span>
                <span className="font-mono font-semibold text-slate-900">{activeTracking.weight}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Cura tèxtil:</span>
                <span className="font-semibold text-slate-900">{activeTracking.temperature || 'Protecció Boutique'}</span>
              </div>
            </div>

            {/* Milestones Timeline */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-pink-700 mb-4">
                Històric de Preparació i Ruta
              </h5>

              <div className="space-y-4 relative pl-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-pink-100">
                {activeTracking.milestones.map((m, mIdx) => (
                  <div key={mIdx} className="relative text-left">
                    <div
                      className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                        m.current
                          ? 'border-pink-600 text-pink-600 ring-4 ring-pink-100'
                          : m.completed
                          ? 'border-pink-500 text-pink-500'
                          : 'border-slate-300 text-slate-300'
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          m.current ? 'bg-pink-600' : m.completed ? 'bg-pink-500' : 'bg-transparent'
                        }`}
                      />
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-pink-100 shadow-2xs">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold text-slate-900">{m.title}</span>
                        <span className="text-[11px] font-mono text-pink-700">{m.date}</span>
                      </div>
                      <div className="text-xs text-slate-600">{m.location}</div>
                      {m.note && (
                        <div className="mt-1.5 text-[11px] text-pink-900 bg-pink-50 p-2 rounded-md font-medium border border-pink-100">
                          {m.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="bg-pink-50/50 px-6 py-4 border-t border-pink-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-pink-200 hover:bg-pink-100/70 rounded-lg transition-colors"
          >
            Tancar
          </button>
        </div>
      </div>
    </div>
  );
};
