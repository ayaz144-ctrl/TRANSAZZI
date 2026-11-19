import React, { useState } from 'react';
import {
  Clock,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Activity,
  Zap
} from 'lucide-react';

interface CustomsSimulatorProps {
  onOpenQuoteModal: (servicePrefill: string) => void;
}

export const CustomsSimulatorSection: React.FC<CustomsSimulatorProps> = ({
  onOpenQuoteModal
}) => {
  const [garmentCategory, setGarmentCategory] = useState<'vestits' | 'traje_home' | 'traje_dona' | 'complements' | 'bespoke'>('vestits');
  const [dispatchZone, setDispatchZone] = useState<'catalunya' | 'espanya' | 'europa' | 'internacional'>('catalunya');
  const [expressPriority, setExpressPriority] = useState<boolean>(true);
  const [seasonDemand, setSeasonDemand] = useState<'fluid' | 'moderate' | 'peak'>('fluid');
  const [preClearedDocs, setPreClearedDocs] = useState<boolean>(true);

  const calculateDeliveryEstimate = () => {
    let channel: 'verd' | 'groc' | 'taronja' = 'verd';

    if (dispatchZone === 'internacional') {
      channel = preClearedDocs && expressPriority ? 'groc' : 'taronja';
    } else if (garmentCategory === 'bespoke') {
      channel = expressPriority ? 'verd' : 'groc';
    } else {
      channel = 'verd';
    }

    let hoursBase = 12;

    if (dispatchZone === 'catalunya') {
      hoursBase = expressPriority ? 8 : 24;
    } else if (dispatchZone === 'espanya') {
      hoursBase = expressPriority ? 24 : 48;
    } else if (dispatchZone === 'europa') {
      hoursBase = expressPriority ? 36 : 72;
    } else {
      hoursBase = expressPriority ? (preClearedDocs ? 64 : 96) : 120;
    }

    if (garmentCategory === 'bespoke') {
      hoursBase += 24; // Custom hand-basted fitting adjustments
    }

    let demandMultiplier = 1.0;
    if (seasonDemand === 'fluid') demandMultiplier = 1.0;
    if (seasonDemand === 'moderate') demandMultiplier = 1.15;
    if (seasonDemand === 'peak') demandMultiplier = 1.3;

    const totalHours = Math.round(hoursBase * demandMultiplier);
    const standardHours = Math.round(totalHours * 1.9);
    const savedHours = Math.max(6, standardHours - totalHours);

    const formatDuration = (hrs: number) => {
      if (hrs < 24) {
        return `${hrs} hores`;
      }
      const days = Math.floor(hrs / 24);
      const remH = hrs % 24;
      if (remH === 0) return `${days} ${days === 1 ? 'dia' : 'dies'} (${hrs}h)`;
      return `${days}d ${remH}h (${hrs} hores)`;
    };

    return {
      channel,
      totalHours,
      formattedTime: formatDuration(totalHours),
      savedTimeFormatted: `${savedHours} hores`,
      channelLabel:
        channel === 'verd'
          ? 'Canal Verd VIP · Sortida Immediata en Porta-Trajes'
          : channel === 'groc'
          ? 'Despatx Preferent de Seda i Llana d’Exportació'
          : 'Control Duaner Internacional Estàndard',
      channelDesc:
        channel === 'verd'
          ? 'La teva peça es vaporitza a mà, es col·loca en perxa de cedre dins la funda de lli i surt directament cap al teu domicili.'
          : channel === 'groc'
          ? 'Validació prioritària de certificats de pell i teixit italià abans de creuar la duana cap a Londres, Ginebra o Mònaco.'
          : 'Tramitació aranzelària d’alta costura fora de la UE amb factura consular i assegurança a tot risc.',
      customsClearanceMinutes: expressPriority ? '20 minuts' : '3 hores'
    };
  };

  const estimate = calculateDeliveryEstimate();

  const getZoneLabel = (z: string) => {
    switch (z) {
      case 'catalunya':
        return 'Barcelona & Catalunya (Chauffeur Atelier)';
      case 'espanya':
        return 'Madrid, Marbella, València & Espanya';
      case 'europa':
        return 'París, Milà, Mònaco & Unió Europea';
      case 'internacional':
        return 'Suïssa, Regne Unit & Nova York';
      default:
        return 'Enviament VIP';
    }
  };

  return (
    <section id="simulador-duana" className="py-20 bg-white border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-pink-600 mb-2">
            <Activity className="w-4 h-4" />
            <span>Servei de Guant Blanc &amp; Duana Preferent</span>
            <span aria-hidden="true" className="text-pink-300">/</span>
            <span>TRANSAZZI CONCIERGE</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight text-balance">
            Simulador de Preparació d&apos;Atelier i Temps de Duana VIP
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Comprova l&apos;estat de les sortides i la duana internacional per calcular en quantes hores rebràs el teu vestit o traje impecable a casa.
          </p>
        </div>

        {/* Live Status Bar */}
        <div className="mb-10 bg-pink-50/60 p-4 rounded-2xl border border-pink-200/90 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-slate-800">
            <span className="font-bold text-slate-900">Estat Actual Atelier &amp; Duana Internacional:</span>
            <span className="text-pink-700 font-semibold bg-white px-2.5 py-0.5 rounded border border-pink-200">
              Canal Verd VIP Actiu (Sortides sense demora)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-600">
            <div>
              Vaporitzat i funda rígid: <strong className="text-slate-900 font-mono">40 min</strong>
            </div>
            <div className="hidden sm:block text-slate-300">|</div>
            <div>
              Lliuraments VIP puntuals: <strong className="text-pink-600 font-mono font-bold">99,6%</strong>
            </div>
          </div>
        </div>

        {/* Simulator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-pink-200 p-6 sm:p-8 shadow-xs text-left space-y-6">
            <div className="flex items-center justify-between border-b border-pink-100 pb-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Package className="w-4 h-4 text-pink-600" />
                <span>Paràmetres de la teva Peça d&apos;Alta Moda</span>
              </div>
              <span className="text-xs text-slate-500">Càlcul en directe</span>
            </div>

            {/* 1. Tipus de Peça */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-2">
                1. Tipus de Vestit, Traje o Complement
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'vestits', label: 'Vestit de Gala / Seda Pura', sub: 'Transport penjat sense plegats' },
                  { id: 'traje_home', label: 'Traje Creuat Home Super 150s', sub: 'Porta-trajes rígid + cedre' },
                  { id: 'traje_dona', label: 'Traje Sastre Dona & Blazer', sub: 'Caixmir i seda vaporitzats' },
                  { id: 'complements', label: 'Bossa Pell & Mocador Cashmere', sub: 'Cofre rígid amb llaç rosa' },
                  { id: 'bespoke', label: 'Ajust Bespoke / Arranjament Sastre', sub: 'Personalitzat a les teves mides' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGarmentCategory(item.id as 'vestits' | 'traje_home' | 'traje_dona' | 'complements' | 'bespoke')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      garmentCategory === item.id
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

            {/* 2. Zona de Destí */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-2">
                2. Destí del Lliurament VIP des de Barcelona
              </label>
              <select
                value={dispatchZone}
                onChange={(e) => setDispatchZone(e.target.value as 'catalunya' | 'espanya' | 'europa' | 'internacional')}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-pink-500 text-slate-900 bg-white"
              >
                <option value="catalunya">Barcelona &amp; Catalunya (Repartiment privat en el dia)</option>
                <option value="espanya">Madrid (Salamanca), Marbella i València</option>
                <option value="europa">París, Milà, Mònaco &amp; Europa UE</option>
                <option value="internacional">Suïssa (Ginebra/Zúric), Londres &amp; Internacional</option>
              </select>
            </div>

            {/* 3. Servei Concierge Express */}
            <div className="bg-pink-50/70 p-4 rounded-xl border border-pink-200">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      Prioritat Concierge &amp; Guant Blanc TRANSAZZI
                    </span>
                    <span className="text-[11px] text-slate-600 block">
                      Recollida prioritària a l&apos;atelier, vehicle climatitzat vertical i tràmit duaner preferent.
                    </span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={expressPriority}
                    onChange={(e) => setExpressPriority(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                </label>
              </div>
            </div>

            {/* 4. Temporada i documentació */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Demanda a l&apos;Atelier
                </label>
                <select
                  value={seasonDemand}
                  onChange={(e) => setSeasonDemand(e.target.value as 'fluid' | 'moderate' | 'peak')}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 bg-white text-slate-800"
                >
                  <option value="fluid">Servei Fluït (Lliurament immediat)</option>
                  <option value="moderate">Temporada d&apos;Esdeveniments &amp; Bodes</option>
                  <option value="peak">Alta Temporada de Gala / Nadal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Certificats CITES / Origen Pre-validats
                </label>
                <select
                  value={preClearedDocs ? 'yes' : 'no'}
                  onChange={(e) => setPreClearedDocs(e.target.value === 'yes')}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 bg-white text-slate-800"
                >
                  <option value="yes">Sí - Documentació de luxe telemàtica</option>
                  <option value="no">No - Revisió física en frontera</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-7 border border-pink-900/40 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-[11px] font-mono text-pink-300 uppercase tracking-wider">
                  ESTIMACIÓ DE LLIURAMENT VIP
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {new Date().toLocaleDateString('ca-ES')}
                </span>
              </div>

              <div className="mb-4">
                <span className="text-xs text-slate-400 block mb-1">
                  Temps total fins a rebre la peça impecable:
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-pink-400 tracking-tight flex items-baseline gap-2">
                  <span>{estimate.formattedTime}</span>
                </div>
              </div>

              <div
                className={`p-3.5 rounded-xl border mb-5 ${
                  estimate.channel === 'verd'
                    ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200'
                    : estimate.channel === 'groc'
                    ? 'bg-amber-950/70 border-amber-500/40 text-amber-200'
                    : 'bg-orange-950/70 border-orange-500/40 text-orange-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs mb-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{estimate.channelLabel}</span>
                </div>
                <p className="text-[11px] leading-relaxed opacity-90">
                  {estimate.channelDesc}
                </p>
              </div>

              {expressPriority && (
                <div className="bg-pink-900/30 border border-pink-700/50 rounded-xl p-3 mb-5 flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-white block">
                      Avantatge Servei Concierge:
                    </span>
                    <span className="text-pink-300">
                      Guanyes <strong>{estimate.savedTimeFormatted}</strong> respecte d&apos;un enviament convencional sense protecció vertical.
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
                <div className="flex items-start gap-2.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">1. Vaporitzat &amp; Perxa de Cedre</span>
                    <div className="text-[11px] text-slate-400">Atelier Passeig de Gràcia, Barcelona</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-slate-300">
                  <Clock className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">2. Pas per Duana / Verificació</span>
                    <div className="text-[11px] text-slate-400">Resolució estimada: {estimate.customsClearanceMinutes}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-slate-300">
                  <Truck className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">3. Entrega en Mà a Domicili o Hotel</span>
                    <div className="text-[11px] text-slate-400">Termini total: {estimate.formattedTime}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={() =>
                    onOpenQuoteModal(
                      `Enviament VIP (${getZoneLabel(dispatchZone)}) - Lliurament: ${estimate.formattedTime}`
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-xl shadow-md shadow-pink-600/30 transition-all"
                >
                  <span>Sol·licitar Enviament VIP Ara</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-pink-50/70 p-4 rounded-xl border border-pink-200 text-xs text-slate-700">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                <Building2 className="w-4 h-4 text-pink-600" />
                <span>Garantia de Vestuari Sense Arrugues</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600">
                Tots els vestits llargs i trajes creuats s&apos;envien assegurats a tot risc i penjats en vehicles climatitzats perquè arribin directes per a l&apos;esdeveniment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
