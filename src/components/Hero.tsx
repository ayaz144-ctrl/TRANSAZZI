import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Search, Crown, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  companyName: string;
  onOpenQuoteModal: () => void;
  onNavigateToServices: () => void;
  onSearchTracking: (code: string) => void;
  onOpenTrackingPage?: (code?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenQuoteModal,
  onNavigateToServices,
  onSearchTracking,
  onOpenTrackingPage
}) => {
  const [quickCode, setQuickCode] = useState('');

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = quickCode.trim();
    if (onOpenTrackingPage) {
      onOpenTrackingPage(trimmed);
    } else if (trimmed) {
      onSearchTracking(trimmed.toUpperCase());
    }
  };

  const proofMetrics = [
    { value: 'Super 150s', label: 'Llanes & Cashmere d’Itàlia', sub: 'Filatura exclusiva de Biella' },
    { value: '22 Momme', label: 'Seda Mulberry Pura', sub: 'Vestits de gala tallats al biaix' },
    { value: '24/48h VIP', label: 'Enviament en Porta-Trajes', sub: 'Lliurament vertical sense arrugues' },
    { value: 'Bespoke', label: 'Sastreria Home & Dona', sub: 'Arranjaments a mida inclosos' },
  ];

  return (
    <section className="relative min-h-[680px] lg:min-h-[750px] flex flex-col justify-between pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-pink-200 overflow-hidden bg-slate-900 text-white">
      {/* Background Image: Uploaded TransAzzi fleet truck photo with low-intensity black veil */}
      <img
        src="/assets/aistudio/Gemini_Generated_Image_hbvtdohbvtdohbvt_3b587e18.jpg"
        alt="Flota de distribució privada d'alta moda TransAzzi de fons"
        className="absolute inset-0 w-full h-full object-cover object-center lg:object-[center_top] pointer-events-none"
        referrerPolicy="no-referrer"
      />

      {/* Low-intensity black veil: keeps contrast for white text while letting the photo shine through */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/15 pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Unboxed luxury metadata kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-pink-300 mb-4">
              <span>Maison TRANSAZZI</span>
              <span aria-hidden="true" className="text-pink-500">·</span>
              <span>Alta Costura &amp; Sastreria</span>
              <span aria-hidden="true" className="text-pink-500">·</span>
              <span>Passeig de Gràcia</span>
            </div>

            {/* Luxury Serif Editorial Headline (H1) */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.08] text-balance mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              Alta costura en seda, vestits d&apos;etiqueta i sastreria exclusiva per a home i dona.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed max-w-2xl mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Confeccionats amb llanes italianes Super 150s, cashmere i seda pura. Enviem la teva comanda en porta-trajes rígid i funda de lli fins a casa teva sense una sola arruga.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-pink-600 hover:bg-pink-500 active:bg-pink-700 rounded-xl shadow-lg shadow-pink-600/30 hover:shadow-pink-600/50 transition-all duration-200 active:scale-[0.99] whitespace-nowrap"
              >
                Encarregar Comanda Privada
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onNavigateToServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-900 bg-white hover:bg-pink-50 border border-pink-200/80 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.99] whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-pink-600" />
                Veure Vestits &amp; Trajes
              </button>
            </div>

            {/* Quick Live Shipment Tracking Input */}
            <div className="bg-black/35 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl max-w-xl">
              <form onSubmit={handleTrackingSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={quickCode}
                    onChange={(e) => setQuickCode(e.target.value)}
                    placeholder="Codi de seguiment VIP (ex: BCN-98234)"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-white/20 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 font-mono text-white placeholder:text-slate-300 bg-black/40"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-lg transition-colors whitespace-nowrap shadow-xs"
                >
                  Localitzar Enviament
                </button>
              </form>

              <div className="flex flex-wrap items-center justify-between gap-2 mt-2.5 text-[11px] text-slate-200">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-pink-300">Demos ràpides:</span>
                  <button
                    type="button"
                    onClick={() => onSearchTracking('BCN-98234')}
                    className="text-pink-300 hover:text-white hover:underline font-mono"
                  >
                    BCN-98234 (Vestit &amp; Traje Madrid)
                  </button>
                  <span aria-hidden="true" className="text-white/40">·</span>
                  <button
                    type="button"
                    onClick={() => onSearchTracking('MED-44102')}
                    className="text-pink-300 hover:text-white hover:underline font-mono"
                  >
                    MED-44102 (Cofre VIP València)
                  </button>
                </div>

                {onOpenTrackingPage && (
                  <button
                    type="button"
                    onClick={() => onOpenTrackingPage('')}
                    className="text-pink-300 hover:text-white font-semibold underline-offset-2 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Portal Seguiment</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Translucent low-intensity glass card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-black/25 backdrop-blur-xs rounded-2xl p-6 border border-white/20 shadow-xl text-left">
              <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-pink-600/30 text-pink-300 flex items-center justify-center border border-pink-400/40">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white drop-shadow-xs">Atelier Privé Passeig de Gràcia</h3>
                    <span className="text-[11px] font-mono text-pink-300">SASTRERIA &amp; ALTA COSTURA</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/25 text-emerald-200 text-[11px] font-semibold border border-emerald-400/40">
                  Servei Concierge
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start justify-between gap-4 p-2.5 rounded-lg bg-black/20 border border-white/10">
                  <span className="text-slate-300">Teixits d&apos;origen:</span>
                  <span className="font-semibold text-white font-mono text-right">Biella Super 150s &amp; Seda Como</span>
                </div>
                <div className="flex items-start justify-between gap-4 p-2.5 rounded-lg bg-black/20 border border-white/10">
                  <span className="text-slate-300">Presentació VIP:</span>
                  <span className="font-semibold text-pink-300 font-mono text-right">Porta-trajes rígid &amp; perxa cedre</span>
                </div>
                <div className="flex items-start justify-between gap-4 p-2.5 rounded-lg bg-black/20 border border-white/10">
                  <span className="text-slate-300">Ajust a mida:</span>
                  <span className="font-semibold text-white text-right">Sastre i modista inclosos</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between">
                <div className="text-[11px] text-slate-200">
                  Lliurament en mà arreu d&apos;Europa: <strong className="text-pink-300 font-mono">24 / 48 hores</strong>
                </div>
                <button
                  onClick={onOpenQuoteModal}
                  className="text-xs font-semibold text-pink-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Sol·licitar peça</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Floating Quality Seal in TransAzzi Pink */}
            <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-pink-600 text-white rounded-xl p-3 shadow-lg border border-pink-400 items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-white shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-pink-200 font-bold">Maison Oficial</div>
                <div className="text-xs font-semibold text-white">Qualitat Alta Costura</div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width proof metrics strip below hero split */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-950/55 backdrop-blur-md border border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
