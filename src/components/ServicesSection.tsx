import React, { useState } from 'react';
import { ServiceItem, LogisticsProduct } from '../data/companyData';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Calculator,
  Sparkles,
  Crown,
  ShoppingBag,
  Layers,
  Clock,
  ShieldCheck,
  Tag,
  Package,
  Truck
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
  // Tab state: 'tots' or specific luxury collection id ('vestits', 'sastreria', 'complements')
  const [activeTab, setActiveTab] = useState<string>('tots');

  // Luxury Order & White-Glove Shipping Estimator state
  const [calcDestination, setCalcDestination] = useState('peninsula');
  const [calcCollection, setCalcCollection] = useState('vestits');
  const [calcQuantity, setCalcQuantity] = useState(1);
  const [calcGarmentCase, setCalcGarmentCase] = useState(true);

  const calculateEstimate = () => {
    let unitPrice = 490;
    if (calcCollection === 'vestits') unitPrice = 490;
    if (calcCollection === 'traje_home') unitPrice = 790;
    if (calcCollection === 'traje_dona') unitPrice = 640;
    if (calcCollection === 'complements') unitPrice = 380;

    const safeQty = Math.max(1, Math.min(50, calcQuantity || 1));
    const garmentsTotal = Math.round(unitPrice * safeQty);

    let shippingFee = 0;
    if (calcDestination === 'peninsula') {
      shippingFee = garmentsTotal >= 350 ? 0 : 18;
    } else if (calcDestination === 'europa') {
      shippingFee = garmentsTotal >= 600 ? 0 : 35;
    } else if (calcDestination === 'internacional') {
      shippingFee = 65;
    }

    const cedarCaseFee = calcGarmentCase ? 25 : 0;
    const total = Number((garmentsTotal + shippingFee + cedarCaseFee).toFixed(2));

    return { garmentsTotal, shippingFee, cedarCaseFee, total, safeQty };
  };

  const estimate = calculateEstimate();

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'vestits':
        return <Sparkles className="w-5 h-5" />;
      case 'sastreria':
        return <Crown className="w-5 h-5" />;
      case 'complements':
        return <ShoppingBag className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  const tabs = [
    {
      id: 'tots',
      label: 'Tota la Col·lecció',
      icon: <Layers className="w-4 h-4" />,
      badge: '3 Línies'
    },
    {
      id: 'vestits',
      label: 'Vestits & Alta Costura',
      icon: <Sparkles className="w-4 h-4" />,
      badge: '4 Peces'
    },
    {
      id: 'sastreria',
      label: 'Trajes Home i Dona',
      icon: <Crown className="w-4 h-4" />,
      badge: '4 Sastreria'
    },
    {
      id: 'complements',
      label: 'Marroquineria & VIP',
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: '4 Peces'
    }
  ];

  const currentService = services.find((s) => s.id === activeTab);

  return (
    <section id="serveis" className="py-20 bg-pink-50/25 border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-pink-600 mb-2">
            <span>Col·leccions Privades 2026</span>
            <span aria-hidden="true" className="text-pink-300">/</span>
            <span>Maison TRANSAZZI</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight text-balance">
            Vestits d&apos;Alta Costura i Sastreria Exclusiva
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Peces distingides en seda pura, caixmir i llana Super 150s per a dona i home. Explora les pestanyes per descobrir cada vestit, traje a mida i complement.
          </p>
        </div>

        {/* Interactive Tabs Bar */}
        <div className="mb-10 bg-white p-2 rounded-2xl border border-pink-200/90 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 focus:outline-hidden ${
                    isActive
                      ? 'bg-pink-600 text-white shadow-md shadow-pink-600/25'
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

        {/* Tab Content: All Collections View */}
        {activeTab === 'tots' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-pink-100 hover:border-pink-300 overflow-hidden shadow-xs hover:shadow-lg hover:shadow-pink-100/50 transition-all duration-300 flex flex-col group text-left"
                >
                  {/* Card Image Container */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                    {/* Editorial number */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-xs font-bold font-mono text-pink-600 border border-pink-100 shadow-xs">
                      {service.number}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="p-1 rounded-md bg-white/20 backdrop-blur-xs text-white">
                          {getServiceIcon(service.id)}
                        </span>
                        <span className="text-xs text-pink-200 font-medium tracking-wide">
                          {service.id === 'vestits'
                            ? 'Alta Costura Dona'
                            : service.id === 'sastreria'
                            ? 'Sastreria Home & Dona'
                            : 'Marroquineria & Seda'}
                        </span>
                      </div>
                      <h3 className="font-serif-luxury text-2xl font-semibold text-white tracking-tight leading-snug">
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

                      {/* Specs List */}
                      <div className="border-t border-b border-pink-100/80 py-4 mb-6 space-y-2.5">
                        <div className="text-xs font-semibold uppercase tracking-wider text-pink-700 mb-2">
                          Confecció i teixits nobles
                        </div>
                        {service.specs.slice(0, 3).map((spec, sIdx) => (
                          <div key={sIdx} className="flex items-start justify-between text-xs gap-3">
                            <span className="text-slate-500 font-medium">{spec.label}:</span>
                            <span className="text-slate-900 font-semibold text-right">{spec.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Key Highlights */}
                      <div className="space-y-2 mb-6">
                        <div className="text-xs font-semibold uppercase tracking-wider text-pink-700 mb-2">
                          Segell d&apos;exclusivitat
                        </div>
                        {service.modalities.slice(0, 3).map((mod, mIdx) => (
                          <div key={mIdx} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0 mt-0.5" />
                            <span>{mod}</span>
                          </div>
                        ))}
                      </div>

                      {/* Quick Garment Preview */}
                      {service.products && service.products.length > 0 && (
                        <div className="mb-6 bg-pink-50/50 p-3.5 rounded-xl border border-pink-100">
                          <span className="text-[11px] font-bold text-pink-800 uppercase tracking-wider block mb-2">
                            Peces destacades:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {service.products.map((p) => (
                              <button
                                key={p.id}
                                onClick={() => setActiveTab(service.id)}
                                className="text-[11px] px-2 py-0.5 rounded-md bg-white text-slate-700 border border-pink-200 hover:border-pink-500 hover:text-pink-600 transition-colors text-left"
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
                          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-pink-600 bg-pink-50 hover:bg-pink-100/80 border border-pink-200 rounded-xl transition-colors whitespace-nowrap"
                        >
                          <Package className="w-3.5 h-3.5" />
                          <span>Veure Peces</span>
                        </button>

                        <button
                          onClick={() => onOpenServiceDetail(service)}
                          className="w-full flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap"
                        >
                          <span>Fitxa &amp; Talles</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onSelectServiceForQuote(service.title)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-xl transition-colors shadow-sm shadow-pink-600/20 whitespace-nowrap"
                      >
                        <span>Encarregar Comanda</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Dedicated Collection & Garments View */}
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
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950 via-slate-950/35 to-transparent" />
                <div className="absolute top-4 left-4 bg-pink-600 text-white text-xs font-bold font-mono px-3 py-1 rounded-md shadow-md">
                  Línia {currentService.number}
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-pink-400 uppercase tracking-wider mb-2">
                    {getServiceIcon(currentService.id)}
                    <span>Maison TRANSAZZI · Barcelona</span>
                  </div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-white mb-3">
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
                    <span>Talles: <strong>{currentService.incoterms.join(' · ')}</strong></span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onOpenServiceDetail(currentService)}
                      className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
                    >
                      Guia de Talles i Confecció
                    </button>
                    <button
                      onClick={() => onSelectServiceForQuote(currentService.title)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-lg shadow-sm transition-colors"
                    >
                      Encarregar Comanda
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-products Header for this Tab */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t border-pink-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-pink-600 block mb-1">
                  Selecció d&apos;Atelier
                </span>
                <h4 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-slate-900">
                  Peces disponibles a {currentService.title}
                </h4>
              </div>
              <p className="text-xs text-slate-500">
                Confecció limitada · Fes clic en qualsevol peça per reservar la teva talla o cita a mida.
              </p>
            </div>

            {/* Grid of Specific Garments under this Tab */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentService.products?.map((product: LogisticsProduct) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-pink-200 hover:border-pink-400 p-6 shadow-xs hover:shadow-lg hover:shadow-pink-100/60 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Clean unboxed metadata header */}
                    <div className="flex items-center justify-between gap-3 mb-2 text-xs">
                      <span className="font-bold uppercase tracking-wider text-pink-600">
                        {product.badge}
                      </span>
                      <span className="font-mono text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-pink-600" />
                        {product.deliveryTime}
                      </span>
                    </div>

                    <h5 className="font-serif-luxury text-2xl font-semibold text-slate-900 mb-1.5 leading-snug">
                      {product.name}
                    </h5>

                    {/* Price & Sizes metric highlight */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 text-pink-200 font-mono tabular-nums text-xs font-bold my-2">
                      <Tag className="w-3 h-3 text-pink-400" />
                      <span>{product.capacity}</span>
                    </div>

                    <p className="text-xs text-slate-600 mb-4">
                      <strong className="text-slate-800">Ocasió ideal:</strong> {product.idealFor}
                    </p>

                    {/* Bullet specs */}
                    <div className="space-y-2 mb-4 bg-pink-50/40 p-3.5 rounded-xl border border-pink-100">
                      <span className="text-[11px] font-bold text-pink-800 uppercase tracking-wider block mb-1.5">
                        Detalls de sastreria i acabats:
                      </span>
                      {product.specifications.map((spec, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>

                    {/* Fabric Info */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 pb-2 border-b border-pink-100">
                      <Truck className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>Teixit: <strong className="text-slate-700">{product.equipment}</strong></span>
                    </div>
                  </div>

                  {/* Actions for this individual garment */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() =>
                        onSelectServiceForQuote(
                          `${currentService.title} - ${product.name} (${product.capacity})`
                        )
                      }
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-xl shadow-xs hover:shadow-md hover:shadow-pink-600/30 transition-all whitespace-nowrap"
                    >
                      <span>Encarregar aquesta peça</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() =>
                        onSelectServiceForQuote(
                          `Cita privada / Mides per a: ${product.name}`
                        )
                      }
                      className="px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:text-pink-600 bg-pink-50/70 hover:bg-pink-100 border border-pink-200 rounded-xl transition-colors whitespace-nowrap"
                      title="Sol·licitar ajust a mida amb sastre"
                    >
                      A mida
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Tab Quick Actions Bar */}
            <div className="bg-white p-4 rounded-xl border border-pink-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-600">
                Vols descobrir la resta de col·leccions o tornar a la selecció completa?
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('tots')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Tota la Col·lecció
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

        {/* Interactive Luxury Order & White-Glove Delivery Estimator */}
        <div className="mt-16 bg-white rounded-2xl border border-pink-200 p-6 sm:p-8 shadow-sm text-left">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-pink-100 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-2xl font-semibold text-slate-900">
                  Calculador de Comanda Privada i Enviament VIP
                </h3>
                <p className="text-xs text-slate-500">
                  Estima la inversió del teu vestuari i les condicions d&apos;entrega amb servei de guant blanc des de Barcelona.
                </p>
              </div>
            </div>

            <div className="text-xs text-pink-700 bg-pink-50 px-3 py-1.5 rounded-lg border border-pink-200">
              *Enviament VIP gratuït a Espanya en compres superiors a 350 €.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Destí del Lliurament
              </label>
              <select
                value={calcDestination}
                onChange={(e) => setCalcDestination(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 text-slate-800 bg-white"
              >
                <option value="peninsula">Barcelona, Madrid i Península (24h)</option>
                <option value="europa">París, Milà, Londres i Europa (48h)</option>
                <option value="internacional">Suïssa, Mònaco i Internacional (3-4 dies)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Selecció d&apos;Alta Moda
              </label>
              <select
                value={calcCollection}
                onChange={(e) => setCalcCollection(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 text-slate-800 bg-white"
              >
                <option value="vestits">Vestit Llarg Seda Natural (490 €)</option>
                <option value="traje_home">Traje Creuat Home Super 150s (790 €)</option>
                <option value="traje_dona">Traje Sastre Dona Marfil &amp; Seda (640 €)</option>
                <option value="complements">Complements Pell &amp; Cashmere (~380 €)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Quantitat de Peces
              </label>
              <input
                type="number"
                min="1"
                max="50"
                step="1"
                value={calcQuantity}
                onChange={(e) => setCalcQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 text-slate-800 font-mono tabular-nums"
              />
            </div>

            <div className="flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 bg-pink-50/50 p-2.5 rounded-lg border border-pink-200 hover:bg-pink-100/60 transition-colors">
                <input
                  type="checkbox"
                  checked={calcGarmentCase}
                  onChange={(e) => setCalcGarmentCase(e.target.checked)}
                  className="rounded text-pink-600 focus:ring-pink-500"
                />
                <span>Porta-trajes de lli &amp; perxa cedre</span>
              </label>
            </div>
          </div>

          {/* Result Strip in Dark Slate & Pink */}
          <div className="bg-slate-950 text-white rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 border border-pink-900/40">
            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm">
              <div>
                <span className="text-slate-400 block text-xs">Peces ({estimate.safeQty} u.):</span>
                <span className="font-bold font-mono tabular-nums text-slate-100 text-base">{estimate.garmentsTotal} €</span>
              </div>
              <div className="text-slate-600">+</div>
              <div>
                <span className="text-slate-400 block text-xs">Enviament Guant Blanc:</span>
                <span className="font-bold font-mono tabular-nums text-slate-100 text-base">
                  {estimate.shippingFee === 0 ? 'INCLÒS' : `${estimate.shippingFee.toFixed(2)} €`}
                </span>
              </div>
              {calcGarmentCase && (
                <>
                  <div className="text-slate-600">+</div>
                  <div>
                    <span className="text-slate-400 block text-xs">Porta-Trajes &amp; Cedre:</span>
                    <span className="font-bold font-mono tabular-nums text-slate-100 text-base">{estimate.cedarCaseFee.toFixed(2)} €</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800 pt-3 md:pt-0">
              <div className="text-right">
                <span className="text-xs text-pink-300 block">Total Estimat Comanda:</span>
                <span className="text-xl sm:text-2xl font-extrabold font-mono tabular-nums text-pink-400">
                  {estimate.total} €
                </span>
              </div>
              <button
                onClick={() =>
                  onSelectServiceForQuote(
                    `Comanda Alta Costura: ${estimate.safeQty} peça/s (${calcCollection}) · Destí ${calcDestination} - Est: ${estimate.total}€`
                  )
                }
                className="px-4 py-2.5 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-pink-600/30"
              >
                Reservar Comanda
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
