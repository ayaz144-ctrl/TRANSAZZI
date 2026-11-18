import React from 'react';
import { ServiceItem } from '../data/companyData';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Clock, Tag } from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequestQuote: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onRequestQuote
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-pink-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header with Image */}
        <div className="relative h-48 sm:h-60 w-full overflow-hidden bg-slate-900">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-slate-900/60 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white text-left">
            <span className="text-xs font-mono font-bold text-pink-400">
              FITXA TÈCNICA {service.number}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto text-left">
          {/* Description */}
          <p className="text-sm text-slate-700 leading-relaxed">
            {service.shortDesc}
          </p>

          {/* Key Specs Table */}
          <div className="bg-pink-50/40 rounded-xl p-5 border border-pink-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-700 mb-3">
              Paràmetres Tècnics & Rangs Operatius
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {service.specs.map((spec, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-pink-100 shadow-2xs">
                  <div className="text-slate-500 font-medium">{spec.label}</div>
                  <div className="text-slate-900 font-bold text-sm mt-0.5">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Operational features */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-700 mb-3">
              Avantatges i Garanties Contractuals
            </h4>
            <div className="space-y-2">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-Products in ServiceDetailModal */}
          {service.products && service.products.length > 0 && (
            <div className="bg-pink-50/50 p-4 rounded-xl border border-pink-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-pink-800 mb-3">
                Productes & Solucions Operatives Homologades
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {service.products.map((p) => (
                  <div key={p.id} className="bg-white p-3 rounded-lg border border-pink-100 shadow-2xs">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-slate-900">{p.name}</span>
                      <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-pink-100 text-pink-700">
                        {p.badge}
                      </span>
                    </div>
                    <div className="text-[11px] text-pink-700 font-mono font-medium mb-1">
                      {p.capacity}
                    </div>
                    <div className="text-slate-600 text-[11px] line-clamp-2">
                      {p.idealFor}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Commercial & Incoterms info in Pink Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200 text-xs">
            <div className="bg-pink-50/70 p-3.5 rounded-lg border border-pink-200">
              <div className="flex items-center gap-1.5 text-pink-700 font-bold mb-1">
                <Tag className="w-3.5 h-3.5" />
                <span>Incoterms Habituals</span>
              </div>
              <div className="flex flex-wrap gap-1 font-mono text-slate-700">
                {service.incoterms.join(', ')}
              </div>
            </div>

            <div className="bg-pink-50/70 p-3.5 rounded-lg border border-pink-200">
              <div className="flex items-center gap-1.5 text-pink-700 font-bold mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Trànsit Mitjà</span>
              </div>
              <div className="text-slate-700">{service.typicalTransit}</div>
            </div>

            <div className="bg-pink-50/70 p-3.5 rounded-lg border border-pink-200">
              <div className="flex items-center gap-1.5 text-pink-700 font-bold mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Règim Aranzelari</span>
              </div>
              <div className="text-slate-700">{service.baseRateEstimate}</div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-pink-50/50 px-6 py-4 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-pink-100/60 rounded-lg transition-colors"
          >
            Tancar
          </button>

          <button
            onClick={() => {
              onClose();
              onRequestQuote(service.title);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-lg shadow-sm shadow-pink-600/30 transition-colors"
          >
            <span>Demanar cotització per a {service.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
