import React, { useState } from 'react';
import { ServiceItem, LogisticsProduct } from '../data/companyData';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Calculator,
  Globe,
  Warehouse,
  Truck,
  Ship,
  Snowflake,
  Layers,
  Clock,
  ShieldCheck,
  Tag,
  Box
} from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectServiceForQuote: (serviceTitle: string) => void;
  onOpenServiceDetail: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectServiceForQuote,
  onOpenServiceDetail
}) => {
  // Tab state: 'tots' or specific service id ('portuari', 'emmagatzematge', 'especialitzada')
  const [activeTab, setActiveTab] = useState<string>('tots');

  // Quick rate estimator calculator state
  const [calcOrigin, setCalcOrigin] = useState('shanghai');
  const [calcCargoType, setCalcCargoType] = useState('fcl40');
  const [calcWeight, setCalcWeight] = useState(15000);
  const [calcCustomsIncluded, setCalcCustomsIncluded] = useState(true);

  const calculateEstimate = () => {
    let base = 1200;
    if (calcOrigin === 'shanghai') base = 2100;
    if (calcOrigin === 'ningbo') base = 2050;
    if (calcOrigin === 'newyork') base = 1650;
    if (calcOrigin === 'rotterdam') base = 650;
    if (calcOrigin === 'dubai') base = 1400;

    let multiplier = 1;
    if (calcCargoType === 'fcl20') multiplier = 0.65;
    if (calcCargoType === 'fcl40') multiplier = 1.0;
    if (calcCargoType === 'lcl') multiplier = 0.35 + (calcWeight / 20000) * 0.4;

    const freight = Math.round(base * multiplier);
    const customs = calcCustomsIncluded ? 120 : 0;
    const thcFee = 180;
    const total = freight + customs + thcFee;

    return { freight, customs, thcFee, total };
  };

  const estimate = calculateEstimate();

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'portuari':
        return <Ship className="w-5 h-5" />;
      case 'emmagatzematge':
        return <Warehouse className="w-5 h-5" />;
      case 'especialitzada':
        return <Snowflake className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  const tabs = [
    {
      id: 'tots',
      label: 'Tots els Serveis',
      icon: <Layers className="w-4 h-4" />,
      badge: '3 Àrees'
    },
    {
      id: 'portuari',
      label: 'Transport Portuari',
      icon: <Ship className="w-4 h-4" />,
      badge: '4 Productes FCL/LCL'
    },
    {
      id: 'emmagatzematge',
      label: 'Logística i Magatzem',
      icon: <Warehouse className="w-4 h-4" />,
      badge: '4 Productes WMS/DDA'
    },
    {
      id: 'especialitzada',
      label: 'Càrrega Especialitzada',
      icon: <Snowflake className="w-4 h-4" />,
      badge: '4 Productes Reefer/ADR'
    }
  ];

  const currentService = services.find((s) => s.id === activeTab);

  return (
    <section id="serveis" className="py-20 bg-pink-50/30 border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-2">
            <span>Catàleg d'Operacions & Productes Logístics</span>
            <span aria-hidden="true" className="text-pink-300">/</span>
            <span>TRANSAZZI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Els Nostres Serveis
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Solucions de transport personalitzades per a cada tipus de càrrega. Navega per les pestanyes per explorar els productes i equips operatius que posem a la teva disposició.
          </p>
        </div>

        {/* Interactive Tabs Bar (Navegació per Pestanyes) */}
        <div className="mb-10 bg-white p-2 rounded-2xl border border-pink-200/90 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap focus:outline-hidden ${
                    isActive
                      ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30'
                      : 'text-slate-700 hover:text-pink-600 hover:bg-pink-50/70'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-pink-600'}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-pink-50 text-pink-700 border border-pink-200/60'
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content: All Services View (Vista General de 3 Targetes) */}
        {activeTab === 'tots' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-pink-100 hover:border-pink-300 overflow-hidden shadow-xs hover:shadow-lg hover:shadow-pink-100/50 transition-all duration-300 flex flex-col group text-left"
                >
                  {/* Card Image Container */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                    {/* Pink editorial number badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-xs font-bold font-mono text-pink-600 border border-pink-100 shadow-xs">
                      {service.number}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="p-1 rounded-md bg-white/20 backdrop-blur-xs text-white">
                          {getServiceIcon(service.id)}
                        </span>
                        <span className="text-xs text-pink-300 font-semibold">
                          {service.id === 'portuari'
                            ? 'Transport Portuari'
                            : service.id === 'emmagatzematge'
                            ? 'Logística & Magatzem'
                            : 'Càrrega Especialitzada'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {service.shortDesc}
                      </p>

                      {/* Technical Specs List */}
                      <div className="border-t border-b border-pink-100/80 py-4 mb-6 space-y-2.5">
                        <div className="text-xs font-semibold uppercase tracking-wider text-pink-700 mb-2">
                          Especificacions clau
                        </div>
                        {service.specs.slice(0, 3).map((spec, sIdx) => (
                          <div key={sIdx} className="flex items-start justify-between text-xs gap-3">
                            <span className="text-slate-500 font-medium">{spec.label}:</span>
                            <span className="text-slate-900 font-semibold text-right">{spec.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Key Modalities */}
                      <div className="space-y-2 mb-6">
                        <div className="text-xs font-semibold uppercase tracking-wider text-pink-700 mb-2">
                          Modalitats operatives
                        </div>
                        {service.modalities.slice(0, 3).map((mod, mIdx) => (
                          <div key={mIdx} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0 mt-0.5" />
                            <span>{mod}</span>
                          </div>
                        ))}
                      </div>

                      {/* Quick Sub-products Pill Preview */}
                      {service.products && service.products.length > 0 && (
                        <div className="mb-6 bg-pink-50/60 p-3.5 rounded-xl border border-pink-100">
                          <span className="text-[11px] font-bold text-pink-700 uppercase tracking-wider block mb-2">
                            Productes d'aquesta línia:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {service.products.map((p) => (
                              <button
                                key={p.id}
                                onClick={() => setActiveTab(service.id)}
                                className="text-[11px] px-2 py-0.5 rounded-md bg-white text-slate-700 border border-pink-200 hover:border-pink-500 hover:text-pink-600 transition-colors"
                              >
                                {p.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="pt-4 border-t border-pink-100/80 flex flex-col gap-2.5">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setActiveTab(service.id)}
                          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-pink-600 bg-pink-50 hover:bg-pink-100/80 border border-pink-200 rounded-xl transition-colors"
                        >
                          <Box className="w-3.5 h-3.5" />
                          <span>Pestanya Productes</span>
                        </button>

                        <button
                          onClick={() => onOpenServiceDetail(service)}
                          className="w-full flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                        >
                          <span>Fitxa Tècnica</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onSelectServiceForQuote(service.title)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-xl transition-colors shadow-sm shadow-pink-600/20"
                      >
                        <span>Contactar amb un Agent</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Dedicated Service & Specific Sub-Products View */}
        {activeTab !== 'tots' && currentService && (
          <div className="space-y-8 animate-in fade-in zoom-in-98 duration-200 text-left">
            {/* Category Spotlight Banner */}
            <div className="bg-slate-950 text-white rounded-2xl overflow-hidden border border-pink-900/40 shadow-xl grid grid-cols-1 lg:grid-cols-12">
              <div className="relative h-64 lg:h-auto lg:col-span-5 overflow-hidden">
                <img
                  src={currentService.image}
                  alt={currentService.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-4 left-4 bg-pink-600 text-white text-xs font-bold font-mono px-3 py-1 rounded-md shadow-md">
                  Pestanya Activa: {currentService.number}
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-pink-400 uppercase tracking-wider mb-2">
                    {getServiceIcon(currentService.id)}
                    <span>Línia Operativa TransAzzi</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {currentService.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {currentService.shortDesc}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-t border-slate-800 text-xs">
                    {currentService.specs.map((s, idx) => (
                      <div key={idx}>
                        <span className="text-slate-400 block text-[11px]">{s.label}:</span>
                        <span className="font-semibold text-slate-100">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-pink-400" />
                    <span>Incoterms: <strong>{currentService.incoterms.join(', ')}</strong></span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onOpenServiceDetail(currentService)}
                      className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
                    >
                      Veure Fitxa General
                    </button>
                    <button
                      onClick={() => onSelectServiceForQuote(currentService.title)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-lg shadow-sm transition-colors"
                    >
                      Contactar amb un Agent
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-products Header for this Tab */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t border-pink-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-pink-600 block mb-1">
                  Catàleg de Productes i Equips
                </span>
                <h4 className="text-xl font-extrabold text-slate-900">
                  Productes disponibles en {currentService.title}
                </h4>
              </div>
              <p className="text-xs text-slate-500">
                Fes clic a qualsevol producte per sol·licitar-ne la cotització immediata.
              </p>
            </div>

            {/* Grid of Specific Products under this Tab */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentService.products?.map((product: LogisticsProduct) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-pink-200 hover:border-pink-400 p-6 shadow-xs hover:shadow-lg hover:shadow-pink-100/60 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Top product badges */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-pink-50 text-pink-700 border border-pink-200">
                        {product.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-pink-600" />
                        {product.deliveryTime}
                      </span>
                    </div>

                    <h5 className="text-lg font-bold text-slate-900 mb-1 leading-snug">
                      {product.name}
                    </h5>

                    {/* Capacity metric highlight */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 text-pink-300 font-mono text-xs font-bold my-2">
                      <Tag className="w-3 h-3 text-pink-400" />
                      <span>{product.capacity}</span>
                    </div>

                    <p className="text-xs text-slate-600 mb-4">
                      <strong className="text-slate-800">Ideal per a:</strong> {product.idealFor}
                    </p>

                    {/* Bullet specs */}
                    <div className="space-y-2 mb-4 bg-pink-50/40 p-3.5 rounded-xl border border-pink-100">
                      <span className="text-[11px] font-bold text-pink-800 uppercase tracking-wider block mb-1.5">
                        Característiques operatives:
                      </span>
                      {product.specifications.map((spec, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>

                    {/* Vehicle Equipment Info */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 pb-2 border-b border-pink-100">
                      <Truck className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>Equip: <strong className="text-slate-700">{product.equipment}</strong></span>
                    </div>
                  </div>

                  {/* Actions for this individual product */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() =>
                        onSelectServiceForQuote(
                          `${currentService.title} - ${product.name} (${product.capacity})`
                        )
                      }
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-xl shadow-xs hover:shadow-md hover:shadow-pink-600/30 transition-all"
                    >
                      <span>Cotitzar aquest producte</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() =>
                        onSelectServiceForQuote(
                          `Consulta sobre ${product.name}`
                        )
                      }
                      className="px-3 py-2.5 text-xs font-semibold text-slate-700 hover:text-pink-600 bg-pink-50/70 hover:bg-pink-100 border border-pink-200 rounded-xl transition-colors"
                      title="Contactar amb un Agent"
                    >
                      Agent
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Tab Quick Actions Bar */}
            <div className="bg-white p-4 rounded-xl border border-pink-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-600">
                Vols veure la resta de línies de transport o retornar a la panoràmica general?
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('tots')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Veure Tots els Serveis
                </button>
                {tabs
                  .filter((t) => t.id !== 'tots' && t.id !== activeTab)
                  .map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-pink-700 hover:text-pink-900 bg-pink-50 hover:bg-pink-100 rounded-lg border border-pink-200 transition-colors"
                    >
                      {t.label}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Interactive Logistics Quick Freight Calculator / Estimator with Pink Accents */}
        <div className="mt-16 bg-white rounded-2xl border border-pink-200 p-6 sm:p-8 shadow-sm text-left">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-pink-100 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Simulador de Tarifes i Costos Operatius
                </h3>
                <p className="text-xs text-slate-500">
                  Calcula una estimació orientativa de nòlit i despatx per a la teva importació marítima amb destí Port de Barcelona.
                </p>
              </div>
            </div>

            <div className="text-xs text-pink-700 bg-pink-50 px-3 py-1.5 rounded-lg border border-pink-200">
              *Estimació referencial subjecta a fluctuacions de mercat i combustible (BAF/CAF).
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Port d'Origen
              </label>
              <select
                value={calcOrigin}
                onChange={(e) => setCalcOrigin(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 text-slate-800 bg-white"
              >
                <option value="shanghai">Shanghai (Xina) - Ruta Directa</option>
                <option value="ningbo">Ningbo (Xina)</option>
                <option value="newyork">Nova York (EUA)</option>
                <option value="rotterdam">Rotterdam (Països Baixos)</option>
                <option value="dubai">Jebel Ali (Dubai / UAE)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tipus de Càrrega / Contenidor
              </label>
              <select
                value={calcCargoType}
                onChange={(e) => setCalcCargoType(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 text-slate-800 bg-white"
              >
                <option value="fcl40">FCL 40' High Cube (76 m³)</option>
                <option value="fcl20">FCL 20' Dry (33 m³)</option>
                <option value="lcl">LCL Grupaje Consolidat (Paletitzat)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Pes Brut Estimant (kg)
              </label>
              <input
                type="number"
                min="500"
                max="28000"
                step="500"
                value={calcWeight}
                onChange={(e) => setCalcWeight(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 text-slate-800 font-mono"
              />
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 bg-pink-50/50 p-2.5 rounded-lg border border-pink-200 hover:bg-pink-100/60 transition-colors">
                <input
                  type="checkbox"
                  checked={calcCustomsIncluded}
                  onChange={(e) => setCalcCustomsIncluded(e.target.checked)}
                  className="rounded text-pink-600 focus:ring-pink-500"
                />
                <span>Incloure despatx DUA OEA</span>
              </label>
            </div>
          </div>

          {/* Result Strip in Dark Slate & Pink */}
          <div className="bg-slate-950 text-white rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 border border-pink-900/40">
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm">
              <div>
                <span className="text-slate-400 block text-xs">Nòlit Marítim:</span>
                <span className="font-bold font-mono text-slate-100 text-base">{estimate.freight} €</span>
              </div>
              <div className="text-slate-600">+</div>
              <div>
                <span className="text-slate-400 block text-xs">Taxes Portuàries (THC):</span>
                <span className="font-bold font-mono text-slate-100 text-base">{estimate.thcFee} €</span>
              </div>
              {calcCustomsIncluded && (
                <>
                  <div className="text-slate-600">+</div>
                  <div>
                    <span className="text-slate-400 block text-xs">Despatx Duaner OEA:</span>
                    <span className="font-bold font-mono text-slate-100 text-base">{estimate.customs} €</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
              <div className="text-right">
                <span className="text-xs text-pink-300 block">Total Estimant Aproximat:</span>
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-pink-400">
                  {estimate.total} €
                </span>
              </div>
              <button
                onClick={() =>
                  onSelectServiceForQuote(
                    `Simulació: ${calcOrigin.toUpperCase()} a Barcelona (${calcCargoType.toUpperCase()}) - Est: ${estimate.total}€`
                  )
                }
                className="px-4 py-2.5 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-pink-600/30"
              >
                Formalitzar Cotització
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
