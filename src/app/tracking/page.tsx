'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  MapPin,
  Navigation,
  Calendar,
  LocateFixed,
  Package,
  Truck,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  Clock
} from 'lucide-react';

const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/y42l2zushlh59';

type SheetDBRow = Record<string, string | undefined>;

interface NormalizedShipment {
  trackingCode: string;
  origin: string;
  destination: string;
  eta: string;
  currentLocation: string;
  status: string;
  raw: SheetDBRow;
}

interface TrackingPageProps {
  initialCode?: string;
  onBackHome?: () => void;
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function getFieldValue(row: SheetDBRow, candidates: string[]): string {
  const entries = Object.entries(row);
  for (const candidate of candidates) {
    const normalizedCandidate = normalizeText(candidate);
    const match = entries.find(
      ([key, val]) =>
        val !== undefined &&
        val !== '' &&
        normalizeText(key) === normalizedCandidate
    );
    if (match && match[1]) {
      return String(match[1]).trim();
    }
  }
  return '';
}

function mapSheetRowToShipment(row: SheetDBRow, fallbackCode: string): NormalizedShipment {
  return {
    trackingCode:
      getFieldValue(row, ['tracking_code', 'codi', 'codigo', 'code', 'referencia']) ||
      fallbackCode,
    origin: getFieldValue(row, ['origen', 'origin', 'sortida', 'port_origen']) || 'No especificat',
    destination:
      getFieldValue(row, ['desti', 'destino', 'destination', 'port_desti']) || 'No especificat',
    eta:
      getFieldValue(row, [
        'eta',
        'data_prevista',
        'data prevista (eta)',
        'data prevista',
        'fecha_prevista',
        'estimated_arrival'
      ]) || 'Pendent de confirmació',
    currentLocation:
      getFieldValue(row, [
        'ubicacio_actual',
        'ubicacio actual',
        'ubicacio',
        'ubicacion_actual',
        'ubicacion',
        'current_location',
        'location'
      ]) || 'En processament operatiu',
    status: getFieldValue(row, ['estat', 'estado', 'status']) || 'En magatzem',
    raw: row
  };
}

function getTimelineConfig(status: string) {
  const normalized = normalizeText(status);

  if (normalized.includes('lliurat') || normalized.includes('entregado') || normalized.includes('delivered')) {
    return {
      label: 'Lliurat',
      percentage: 100,
      barColorClass: 'bg-green-500',
      badgeClass: 'bg-green-50 text-green-700 border-green-200',
      dotColorClass: 'bg-green-500',
      stepIndex: 2
    };
  }

  if (normalized.includes('transit') || normalized.includes('en curs') || normalized.includes('camino')) {
    return {
      label: 'En trànsit',
      percentage: 50,
      barColorClass: 'bg-blue-600',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      dotColorClass: 'bg-blue-600',
      stepIndex: 1
    };
  }

  if (normalized.includes('magatzem') || normalized.includes('almacen') || normalized.includes('warehouse')) {
    return {
      label: 'En magatzem',
      percentage: 10,
      barColorClass: 'bg-amber-500',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      dotColorClass: 'bg-amber-500',
      stepIndex: 0
    };
  }

  return {
    label: status || 'En magatzem',
    percentage: 10,
    barColorClass: 'bg-amber-500',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
    dotColorClass: 'bg-amber-500',
    stepIndex: 0
  };
}

export default function TrackingPage({ initialCode = '', onBackHome }: TrackingPageProps) {
  const [trackingCode, setTrackingCode] = useState(initialCode);
  const [shipment, setShipment] = useState<NormalizedShipment | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastCheckedAt, setLastCheckedAt] = useState<string | null>(null);

  const performSearch = useCallback(async (codeToSearch: string) => {
    const cleanCode = codeToSearch.trim();
    if (!cleanCode) {
      setErrorMessage('Introdueix un codi de seguiment vàlid.');
      setShipment(null);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setShipment(null);

    try {
      const url = `${SHEETDB_API_URL}/search?tracking_code=${encodeURIComponent(cleanCode)}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
      }

      const data: SheetDBRow[] = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        setErrorMessage('Codi no trobat');
        setShipment(null);
      } else {
        const mapped = mapSheetRowToShipment(data[0], cleanCode);
        setShipment(mapped);
        setLastCheckedAt(
          new Date().toLocaleTimeString('ca-ES', {
            hour: '2-digit',
            minute: '2-digit'
          })
        );
      }
    } catch {
      setErrorMessage('Error en consultar el servei de seguiment. Torna-ho a intentar en uns moments.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialCode && initialCode.trim()) {
      setTrackingCode(initialCode);
      performSearch(initialCode);
    }
  }, [initialCode, performSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(trackingCode);
  };

  const timeline = shipment ? getTimelineConfig(shipment.status) : null;

  const timelineSteps = [
    {
      label: 'En magatzem',
      percentLabel: '10%',
      sub: 'Recepció i preparació',
      icon: Package
    },
    {
      label: 'En trànsit',
      percentLabel: '50%',
      sub: 'Ruta activa cap a destí',
      icon: Truck
    },
    {
      label: 'Lliurat',
      percentLabel: '100%',
      sub: 'Recepció confirmada',
      icon: CheckCircle2
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Back Navigation (when integrated in SPA or standalone) */}
        <div className="flex items-center justify-between">
          {onBackHome ? (
            <button
              type="button"
              onClick={onBackHome}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-pink-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 hover:border-pink-300 shadow-2xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tornar a la pàgina principal</span>
            </button>
          ) : (
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-pink-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 hover:border-pink-300 shadow-2xs transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tornar a l&apos;Inici</span>
            </a>
          )}

          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-pink-600" />
            <span>Seguiment Verificat TRANSAZZI</span>
          </div>
        </div>

        {/* Search Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 text-left">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-pink-600 mb-2">
              Seguiment de Comandes de Moda &amp; Enviaments Express
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-slate-900 tracking-tight leading-tight">
              Localitza el teu enviament
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Introdueix el codi de seguiment de la teva comanda de roba per consultar-ne l&apos;estat actual, la ubicació i la data prevista de lliurament.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="Introdueix el codi de seguiment (ex: TRZ-2026-001)"
                aria-label="Codi de seguiment"
                className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base font-mono text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:bg-white transition-all placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-pink-600 hover:bg-pink-500 active:bg-pink-700 disabled:bg-pink-400 rounded-xl shadow-md shadow-pink-600/20 transition-all cursor-pointer whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Cercant...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Cercar</span>
                </>
              )}
            </button>
          </form>

          {/* Red Error Message ("Codi no trobat") */}
          {errorMessage && (
            <div
              role="alert"
              className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 shadow-2xs animate-in fade-in duration-200"
            >
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <p className="text-sm font-bold text-red-800">{errorMessage}</p>
                {errorMessage === 'Codi no trobat' && (
                  <p className="text-xs text-red-600 mt-0.5">
                    Revisa que el codi estigui escrit correctament o posa&apos;t en contacte amb el nostre equip operatiu.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results Card */}
        {shipment && timeline && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden text-left animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Top Status Strip */}
            <div className="bg-slate-950 text-white px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Codi de Seguiment
                </span>
                <div className="text-xl sm:text-2xl font-extrabold font-mono tracking-tight text-white mt-0.5">
                  {shipment.trackingCode}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {lastCheckedAt && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-pink-400" />
                    Actualitzat: {lastCheckedAt}
                  </span>
                )}
                <span
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border ${timeline.badgeClass}`}
                >
                  <span className={`w-2 h-2 rounded-full ${timeline.dotColorClass}`} />
                  {timeline.label}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Visual Timeline & Progress Bar */}
              <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Progrés de l&apos;Enviament (Timeline)
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Estat actual: <strong className="text-slate-800">{timeline.label}</strong>
                    </p>
                  </div>
                  <span className="text-lg font-extrabold font-mono text-slate-900">
                    {timeline.percentage}%
                  </span>
                </div>

                {/* Progress Track */}
                <div className="w-full h-3.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${timeline.barColorClass}`}
                    style={{ width: `${timeline.percentage}%` }}
                  />
                </div>

                {/* 3 Visual Timeline Milestones */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {timelineSteps.map((step, idx) => {
                    const StepIcon = step.icon;
                    const isCompleted = idx <= timeline.stepIndex;
                    const isCurrent = idx === timeline.stepIndex;

                    const activeCircleClass =
                      timeline.percentage === 100
                        ? 'bg-green-500 text-white border-green-500'
                        : timeline.percentage === 50
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-amber-500 text-white border-amber-500';

                    return (
                      <div key={step.label} className="flex flex-col items-start sm:items-center sm:text-center">
                        <div
                          className={`w-9 h-9 rounded-full border-2 flex items-center justify-center mb-2 transition-colors ${
                            isCompleted
                              ? activeCircleClass
                              : 'bg-white text-slate-400 border-slate-300'
                          } ${isCurrent ? 'ring-4 ring-slate-200' : ''}`}
                        >
                          <StepIcon className="w-4 h-4" />
                        </div>
                        <span
                          className={`text-xs font-bold ${
                            isCompleted ? 'text-slate-900' : 'text-slate-400'
                          }`}
                        >
                          {step.label}
                        </span>
                        <span className="text-[11px] text-slate-500 hidden sm:block mt-0.5">
                          {step.sub}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Clean 4-Card Data Grid: Origen, Destí, Data prevista (ETA), Ubicació actual */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 border border-pink-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                      Origen
                    </span>
                    <span className="text-base font-bold text-slate-900 mt-1 block">
                      {shipment.origin}
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 border border-pink-100 flex items-center justify-center shrink-0">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                      Destí
                    </span>
                    <span className="text-base font-bold text-slate-900 mt-1 block">
                      {shipment.destination}
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 border border-pink-100 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                      Data prevista (ETA)
                    </span>
                    <span className="text-base font-bold font-mono text-slate-900 mt-1 block">
                      {shipment.eta}
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 border border-pink-100 flex items-center justify-center shrink-0">
                    <LocateFixed className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                      Ubicació actual
                    </span>
                    <span className="text-base font-bold text-slate-900 mt-1 block">
                      {shipment.currentLocation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Footer Note inside Card */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dades sincronitzades en directe amb el sistema de gestió operativa TRANSAZZI.</span>
                </div>
                <span className="font-mono text-[11px] text-slate-400">
                  TRANSAZZI Moda Express 24/48h
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
