import React, { useState } from 'react';
import { ArrowRight, Layers, ShieldCheck, Search, Anchor, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  companyName: string;
  onOpenQuoteModal: () => void;
  onNavigateToServices: () => void;
  onSearchTracking: (code: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  companyName,
  onOpenQuoteModal,
  onNavigateToServices,
  onSearchTracking
}) => {
  const [quickCode, setQuickCode] = useState('');

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickCode.trim()) {
      onSearchTracking(quickCode.trim().toUpperCase());
    }
  };

  const proofMetrics = [
    { value: '+120.000', label: 'TEUs Marítims Gestionats', sub: 'Volum anual consolidat' },
    { value: '145+', label: 'Ports Internacionals', sub: 'Connexions marítimes directes' },
    { value: '99,4%', label: 'Puntualitat en Lliurament', sub: 'SLA garantit per contracte' },
    { value: 'OEA & ISO', label: 'Seguretat Duanera Certificada', sub: 'Despatx preferent canal verd' },
  ];

  return (
    <section className="relative min-h-[680px] lg:min-h-[740px] flex flex-col justify-between pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-pink-200 overflow-hidden bg-slate-900 text-white">
      {/* Background Image: The uploaded TransAzzi truck and port container fleet */}
      <img
        src="/assets/aistudio/Gemini_Generated_Image_hbvtdohbvtdohbvt_3b587e18.jpg"
        alt="Flota de transport portuari TransAzzi de fons"
        className="absolute inset-0 w-full h-full object-cover object-center lg:object-[center_top] pointer-events-none"
        referrerPolicy="no-referrer"
      />

      {/* Low-intensity black veil: keeps contrast for white text while letting the truck photo shine through */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/25 to-black/15 pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Unboxed pink metadata kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-400 mb-4">
              <span>Flota Pròpia TransAzzi</span>
              <span aria-hidden="true" className="text-pink-600/70">·</span>
              <span>Operador Logístic OEA</span>
              <span aria-hidden="true" className="text-pink-600/70">·</span>
              <span>Hub Port de Barcelona</span>
            </div>

            {/* Eslògan principal (H1): Solucions logístiques integrals i transport portuari d'alta eficàcia. */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white tracking-tight leading-[1.15] text-balance mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              Solucions logístiques integrals i transport portuari d'alta eficàcia.
            </h1>

            {/* Subtítol: Connectem el teu negoci amb els principals ports globals mitjançant transport de contenidors ràpid, segur i personalitzat. */}
            <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed max-w-2xl mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Connectem el teu negoci amb els principals ports globals mitjançant transport de contenidors ràpid, segur i personalitzat.
            </p>

            {/* Botons d'acció (CTA): [ Sol·licitar Pressupost ] i [ Cotitzar Transport ] */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-pink-600 hover:bg-pink-500 active:bg-pink-700 rounded-xl shadow-lg shadow-pink-600/30 hover:shadow-pink-600/50 transition-all duration-200 active:scale-[0.99] whitespace-nowrap"
              >
                Sol·licitar Pressupost
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-900 bg-white hover:bg-pink-50 border border-pink-200/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.99] whitespace-nowrap"
              >
                <Layers className="w-4 h-4 text-pink-600" />
                Cotitzar Transport
              </button>
            </div>

            {/* Quick Live Container Tracking Input with soft translucent dark veil */}
            <div className="bg-black/35 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl max-w-xl">
              <form onSubmit={handleTrackingSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={quickCode}
                    onChange={(e) => setQuickCode(e.target.value)}
                    placeholder="Número de contenidor o B/L (ex: BCN-98234)"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-white/20 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 font-mono text-white placeholder:text-slate-300 bg-black/40"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-lg transition-colors whitespace-nowrap shadow-xs"
                >
                  Rastrejar Càrrega
                </button>
              </form>

              <div className="flex flex-wrap items-center gap-2 mt-2.5 text-[11px] text-slate-200">
                <span className="font-medium text-pink-300">Demos ràpides:</span>
                <button
                  type="button"
                  onClick={() => onSearchTracking('BCN-98234')}
                  className="text-pink-300 hover:text-white hover:underline font-mono"
                >
                  BCN-98234 (Xangai → BCN)
                </button>
                <span aria-hidden="true" className="text-white/40">·</span>
                <button
                  type="button"
                  onClick={() => onSearchTracking('MED-44102')}
                  className="text-pink-300 hover:text-white hover:underline font-mono"
                >
                  MED-44102 (València → Hamburg)
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Translucent low-intensity glass card so the pink truck is fully visible through it */}
          <div className="lg:col-span-5 relative">
            <div className="bg-black/25 backdrop-blur-xs rounded-2xl p-6 border border-white/20 shadow-xl text-left">
              <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-pink-600/30 text-pink-300 flex items-center justify-center border border-pink-400/40">
                    <Anchor className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white drop-shadow-xs">Hub Logístic Port de Barcelona</h3>
                    <span className="text-[11px] font-mono text-pink-300">TERMINAL BEST / ZAL PRAT</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/30 text-emerald-200 text-[11px] font-semibold border border-emerald-400/40">
                  Operativa 24/7
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start justify-between gap-4 p-2.5 rounded-lg bg-black/20 border border-white/10">
                  <span className="text-slate-300">Flota dedicada:</span>
                  <span className="font-semibold text-white font-mono text-right">Tractors Scania Euro 6 & Semiremolcs</span>
                </div>
                <div className="flex items-start justify-between gap-4 p-2.5 rounded-lg bg-black/20 border border-white/10">
                  <span className="text-slate-300">Temps de resposta moll:</span>
                  <span className="font-semibold text-pink-300 font-mono text-right">&lt; 35 minuts d'atracament</span>
                </div>
                <div className="flex items-start justify-between gap-4 p-2.5 rounded-lg bg-black/20 border border-white/10">
                  <span className="text-slate-300">Certificació de Seguretat:</span>
                  <span className="font-semibold text-white text-right">OEA Simplificació & Seguretat</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between">
                <div className="text-[11px] text-slate-200">
                  Volum en trànsit actiu avui: <strong className="text-pink-300 font-mono">1.420 TEUs</strong>
                </div>
                <button
                  onClick={onOpenQuoteModal}
                  className="text-xs font-semibold text-pink-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Sol·licitar nòlit</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Floating Quality Seal in TransAzzi Pink */}
            <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-pink-600 text-white rounded-xl p-3 shadow-lg border border-pink-400 items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-white shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-pink-200 font-bold">Acreditació</div>
                <div className="text-xs font-semibold text-white">Operador OEA Oficial</div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width proof metrics strip below hero split with translucent backdrop */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-950/50 backdrop-blur-md border border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {proofMetrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col text-left">
              <span className="text-2xl sm:text-3xl font-extrabold text-pink-400 tracking-tight font-mono tabular-nums mb-1">
                {metric.value}
              </span>
              <span className="text-sm font-semibold text-white leading-snug">
                {metric.label}
              </span>
              <span className="text-xs text-slate-300 mt-0.5">
                {metric.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
