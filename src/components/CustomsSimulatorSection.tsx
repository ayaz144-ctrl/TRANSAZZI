import React, { useState } from 'react';
import {
  Clock,
  ShieldCheck,
  Building2,
  CheckCircle2,
  FileSearch,
  Truck,
  Sparkles,
  ArrowRight,
  Layers,
  Activity,
  Zap
} from 'lucide-react';

interface CustomsSimulatorProps {
  onOpenQuoteModal: (servicePrefill: string) => void;
}

export const CustomsSimulatorSection: React.FC<CustomsSimulatorProps> = ({
  onOpenQuoteModal
}) => {
  // Simulator input state
  const [cargoCategory, setCargoCategory] = useState<'general' | 'perishable' | 'chemical' | 'electronics' | 'textile'>('general');
  const [portTerminal, setPortTerminal] = useState<'best' | 'apm' | 'valencia' | 'zal'>('best');
  const [hasOEA, setHasOEA] = useState<boolean>(true);
  const [trafficLevel, setTrafficLevel] = useState<'fluid' | 'moderate' | 'congested'>('fluid');
  const [preArrivalFiling, setPreArrivalFiling] = useState<boolean>(true);

  // Calculation logic for customs clearance channel and estimated release time
  const calculateCustomsEstimate = () => {
    // Determine typical channel based on cargo type and OEA status
    let channel: 'verd' | 'groc' | 'taronja' | 'vermell' = 'verd';
    let probabilityGreen = hasOEA ? 88 : 55;

    if (cargoCategory === 'perishable') {
      channel = hasOEA ? 'groc' : 'vermell';
    } else if (cargoCategory === 'chemical') {
      channel = hasOEA ? 'taronja' : 'vermell';
    } else if (cargoCategory === 'electronics') {
      channel = hasOEA ? 'verd' : 'taronja';
    } else if (cargoCategory === 'textile') {
      channel = hasOEA ? 'verd' : 'taronja';
    } else {
      channel = hasOEA ? 'verd' : 'groc';
    }

    // Base time in minutes
    let minutesBase = 35; // Canal verd OEA standard

    if (channel === 'verd') {
      minutesBase = hasOEA ? (preArrivalFiling ? 25 : 45) : 90;
    } else if (channel === 'groc') {
      minutesBase = hasOEA ? (preArrivalFiling ? 120 : 180) : 360;
    } else if (channel === 'taronja') {
      minutesBase = hasOEA ? (preArrivalFiling ? 150 : 240) : 420;
    } else if (channel === 'vermell') {
      minutesBase = hasOEA ? (preArrivalFiling ? 480 : 720) : 1200;
    }

    // Terminal multiplier
    let terminalMultiplier = 1.0;
    if (portTerminal === 'best') terminalMultiplier = 0.95; // High automation
    if (portTerminal === 'apm') terminalMultiplier = 1.0;
    if (portTerminal === 'valencia') terminalMultiplier = 1.05;
    if (portTerminal === 'zal') terminalMultiplier = 0.85; // Direct TransAzzi warehouse

    // Traffic congestion multiplier
    let trafficMultiplier = 1.0;
    if (trafficLevel === 'fluid') trafficMultiplier = 1.0;
    if (trafficLevel === 'moderate') trafficMultiplier = 1.35;
    if (trafficLevel === 'congested') trafficMultiplier = 1.8;

    const totalMinutes = Math.round(minutesBase * terminalMultiplier * trafficMultiplier);

    // Non-OEA comparison time
    const nonOEAMinutes = Math.round(totalMinutes * 2.6);
    const savedMinutes = Math.max(0, nonOEAMinutes - totalMinutes);

    // Human readable duration formatting
    const formatDuration = (mins: number) => {
      if (mins < 60) {
        return `${mins} minuts`;
      }
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      return m > 0 ? `${h}h ${m}min` : `${h} hores`;
    };

    return {
      channel,
      probabilityGreen,
      totalMinutes,
      formattedTime: formatDuration(totalMinutes),
      savedTimeFormatted: formatDuration(savedMinutes),
      channelLabel:
        channel === 'verd'
          ? 'Canal Verd (Llevant Immediat)'
          : channel === 'groc'
          ? 'Canal Groc (Control Paraduaner / Certificats)'
          : channel === 'taronja'
          ? 'Canal Taronja (Revisió Documental Aranzelària)'
          : 'Canal Vermell (Inspecció Física PIF / Escàner)',
      channelDesc:
        channel === 'verd'
          ? 'Mercaderia despatxada automàticament per l’Agència Tributària sense requeriments addicionals. Camions TransAzzi llestos per a recollida immediata.'
          : channel === 'groc'
          ? 'Revisió de certificats sanitaris, SOIVRE o fitosanitaris per part dels organismes paraduaners abans d’emetre el llevant.'
          : channel === 'taronja'
          ? 'Comprovació de valor en duana, factura comercial i declaració de valor abans d’autoritzar la sortida.'
          : 'Obertura del contenidor al Punt d’Inspecció Fronterera (PIF) o pas per escàner mòbil de la terminal.',
      channelColor:
        channel === 'verd'
          ? 'emerald'
          : channel === 'groc'
          ? 'amber'
          : channel === 'taronja'
          ? 'orange'
          : 'rose'
    };
  };

  const estimate = calculateCustomsEstimate();

  // Terminal names display
  const getTerminalLabel = (t: string) => {
    switch (t) {
      case 'best':
        return 'Terminal BEST (Port de Barcelona - Moll Prat)';
      case 'apm':
        return 'Terminal APM (Port de Barcelona)';
      case 'valencia':
        return 'Terminal CSP (Port de València)';
      case 'zal':
        return 'Dipòsit Franc TransAzzi (Zona Franca Barcelona)';
      default:
        return 'Terminal Portuària';
    }
  };

  return (
    <section id="simulador-duana" className="py-20 bg-white border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-2">
            <Activity className="w-4 h-4" />
            <span>Monitoratge en Temps Real & Intel·ligència Duanera</span>
            <span aria-hidden="true" className="text-pink-300">/</span>
            <span>TRANSAZZI OEA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Simulador de Despatx Duaner i Temps de Llevant
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Comprova com està la duana i calcula el temps exacte que trigarà la teva mercaderia a rebre el llevant i sortir de la terminal portuària cap al camió de repartiment.
          </p>
        </div>

        {/* Live Port Status Bar */}
        <div className="mb-10 bg-pink-50/60 p-4 rounded-2xl border border-pink-200/90 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-slate-800">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-600"></span>
            </span>
            <span className="font-bold text-slate-900">Estat Operatiu de la Duana Port de Barcelona:</span>
            <span className="text-pink-700 font-semibold bg-white px-2 py-0.5 rounded border border-pink-200">
              Connexió EDI AEAT Activa (Canal Verd Fluït)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-600">
            <div>
              Temps mitjà canal verd: <strong className="text-slate-900 font-mono">28 min</strong>
            </div>
            <div className="hidden sm:block text-slate-300">|</div>
            <div>
              Trànsits OEA TransAzzi prioritaris: <strong className="text-pink-600 font-mono font-bold">96,4%</strong>
            </div>
          </div>
        </div>

        {/* Simulator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-pink-200 p-6 sm:p-8 shadow-xs text-left space-y-6">
            <div className="flex items-center justify-between border-b border-pink-100 pb-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <FileSearch className="w-4 h-4 text-pink-600" />
                <span>Paràmetres de la teva Mercaderia</span>
              </div>
              <span className="text-xs text-slate-500">Ajusta les opcions per recalcular</span>
            </div>

            {/* 1. Tipus de Mercaderia */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-2">
                1. Tipologia de la Mercaderia / Sector
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'general', label: 'Càrrega General / Industrial', sub: 'Maquinària, metall, recanvis' },
                  { id: 'perishable', label: 'Alimentació / Peribles (Reefer)', sub: 'Inspecció Sanitària / Fito' },
                  { id: 'chemical', label: 'Química / Cosmètica / Farma', sub: 'Control farmacèutic / SOIVRE' },
                  { id: 'electronics', label: 'Electrònica & Tecnologia', sub: 'Bateries de liti / CE' },
                  { id: 'textile', label: 'Tèxtil / Calçat / Moda', sub: 'Control d’origen i aranzelari' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCargoCategory(item.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      cargoCategory === item.id
                        ? 'bg-pink-50 border-pink-600 text-slate-900 ring-2 ring-pink-500/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-pink-300 text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Terminal Portuària */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-2">
                2. Terminal Portuària d'Atracament i Descàrrega
              </label>
              <select
                value={portTerminal}
                onChange={(e) => setPortTerminal(e.target.value as any)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pink-500 text-slate-900 bg-white"
              >
                <option value="best">Terminal BEST (Port de Barcelona - Moll Prat) [Semi-automatitzada]</option>
                <option value="apm">Terminal APM (Port de Barcelona)</option>
                <option value="valencia">Terminal CSP (Port de València)</option>
                <option value="zal">Dipòsit Franc TransAzzi (Zona Franca de Barcelona)</option>
              </select>
            </div>

            {/* 3. Estatus OEA TransAzzi */}
            <div className="bg-pink-50/70 p-4 rounded-xl border border-pink-200">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Aplicar Certificació OEA de TRANSAZZI
                    </span>
                    <span className="text-[11px] text-slate-600 block">
                      Operador Econòmic Autoritzat: menys controls físics, despatx documental preferent i carril ràpid.
                    </span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={hasOEA}
                    onChange={(e) => setHasOEA(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                </label>
              </div>
            </div>

            {/* 4. Congestió i Pre-declaració */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Congestió de Trànsit a les Portes del Port
                </label>
                <select
                  value={trafficLevel}
                  onChange={(e) => setTrafficLevel(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 bg-white text-slate-800"
                >
                  <option value="fluid">Trànsit Normal / Fluid (Cua &lt; 15 min)</option>
                  <option value="moderate">Moderat (Arribada simultània de vaixells)</option>
                  <option value="congested">Alta Congestió (Temps addicional d'espera)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Presentació Telemàtica Anticipada DUA
                </label>
                <select
                  value={preArrivalFiling ? 'yes' : 'no'}
                  onChange={(e) => setPreArrivalFiling(e.target.value === 'yes')}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 bg-white text-slate-800"
                >
                  <option value="yes">Sí - Pre-DUA presentat abans d'atracar</option>
                  <option value="no">No - Presentació després de la descàrrega</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Column: Estimated Release & Circuit Output (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Primary Result Card */}
            <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-7 border border-pink-900/40 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-[11px] font-mono text-pink-300 uppercase tracking-wider">
                  PREVISIÓ DE LLEVANT DUANER
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {new Date().toLocaleDateString('ca-ES')}
                </span>
              </div>

              {/* Huge Time Metric */}
              <div className="mb-4">
                <span className="text-xs text-slate-400 block mb-1">
                  Temps estimat fins a la sortida de la mercaderia:
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-pink-400 tracking-tight flex items-baseline gap-2">
                  <span>{estimate.formattedTime}</span>
                  <span className="text-xs font-sans text-slate-300 font-normal">
                    (des de l'atracament)
                  </span>
                </div>
              </div>

              {/* Channel badge box */}
              <div
                className={`p-3.5 rounded-xl border mb-5 ${
                  estimate.channel === 'verd'
                    ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200'
                    : estimate.channel === 'groc'
                    ? 'bg-amber-950/70 border-amber-500/40 text-amber-200'
                    : estimate.channel === 'taronja'
                    ? 'bg-orange-950/70 border-orange-500/40 text-orange-200'
                    : 'bg-rose-950/70 border-rose-500/40 text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs mb-1">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      estimate.channel === 'verd'
                        ? 'bg-emerald-400'
                        : estimate.channel === 'groc'
                        ? 'bg-amber-400'
                        : estimate.channel === 'taronja'
                        ? 'bg-orange-400'
                        : 'bg-rose-400'
                    }`}
                  />
                  <span>{estimate.channelLabel}</span>
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">
                  {estimate.channelDesc}
                </p>
              </div>

              {/* OEA Savings Callout */}
              {hasOEA && (
                <div className="bg-pink-900/30 border border-pink-700/50 rounded-xl p-3 mb-5 flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-white block">
                      Estalvi amb TRANSAZZI OEA:
                    </span>
                    <span className="text-pink-300">
                      Estalvies aproximadament <strong>{estimate.savedTimeFormatted}</strong> en comparació amb un despatx convencional sense OEA.
                    </span>
                  </div>
                </div>
              )}

              {/* Stepper Timeline */}
              <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
                <div className="flex items-start gap-2.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">1. Presentació Sumària i DUA telemàtic</span>
                    <div className="text-[11px] text-slate-400">Connexió directa amb la Seu Electrònica de l'AEAT</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-slate-300">
                  <Clock className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">2. Resolució del Circuit i Llevant</span>
                    <div className="text-[11px] text-slate-400">Temps estimat: {estimate.formattedTime}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-slate-300">
                  <Truck className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">3. Carrega al camió TransAzzi</span>
                    <div className="text-[11px] text-slate-400">Retirada a terminal en &lt; 35 minuts d'obtenir el llevant</div>
                  </div>
                </div>
              </div>

              {/* CTA Inside the simulator */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={() =>
                    onOpenQuoteModal(
                      `Simulació Duana: ${estimate.channelLabel} (${getTerminalLabel(portTerminal)}) - Temps Estimat: ${estimate.formattedTime}`
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-xl shadow-md shadow-pink-600/30 transition-all"
                >
                  <span>Sol·licitar Despatx Duaner Urgent</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quality Guarantee Box */}
            <div className="bg-pink-50/70 p-4 rounded-xl border border-pink-200 text-xs text-slate-700">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <Building2 className="w-4 h-4 text-pink-600" />
                <span>Oficina Duanera TransAzzi a Zona Franca</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600">
                Agents de duana col·legiats propis de guàrdia 24/7/365 per resoldre incidències documentals, sol·licitar canals verds i evitar costos de demorres i ocupacions portuàries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
