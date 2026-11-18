import React, { useState } from 'react';
import { X, Send, CheckCircle2, Calculator, ShieldCheck } from 'lucide-react';

interface QuoteModalProps {
  initialService?: string;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  initialService = 'Transport Marítim & Multimodal Internacional',
  onClose
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: initialService,
    originPort: 'Shanghai (Xina)',
    destPort: 'Port de Barcelona',
    incoterm: 'FOB',
    cargoDescription: '',
    estimatedVolume: "1x 40' High Cube",
    grossWeight: '18.000 kg'
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const ref = `COT-TRZ-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedRef(ref);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-pink-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 text-left">
        {/* Header in Dark Pink */}
        <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-pink-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-600 text-white flex items-center justify-center shadow-xs">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Sol·licitud de Cotització Logística Formal
              </h3>
              <p className="text-[11px] text-pink-300">
                Tarifes de nòlit marítim, tracció portuària TransAzzi i despatx OEA
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

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          {submittedRef ? (
            <div className="py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">
                Petició de Cotització Tramitada!
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto mb-4">
                El departament de 'pricing' marítim ha rebut els requeriments de càrrega. Rebràs la proposta detallada amb condicions d'assegurança i trànsit en menys de 4 hores.
              </p>

              <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 max-w-xs mx-auto mb-6 text-left text-xs">
                <span className="text-slate-500 block">Número de Cotització:</span>
                <span className="text-base font-mono font-bold text-pink-600 block my-1">
                  {submittedRef}
                </span>
                <span className="text-slate-600 block">Servei: {formData.service}</span>
                <span className="text-slate-600 block">Ruta: {formData.originPort} → {formData.destPort}</span>
              </div>

              <button
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-lg transition-colors"
              >
                Tancar finestra
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nom del sol·licitant <span className="text-pink-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nom complet"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Empresa importadora/exportadora <span className="text-pink-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Raó social o nom comercial"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Correu electrònic corporatiu <span className="text-pink-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="correu@empresa.cat"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Telèfon de contacte directe
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+34 600 000 000"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Modalitat o Servei Sol·licitat
                </label>
                <input
                  type="text"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 bg-pink-50/40 font-medium"
                />
              </div>

              {/* Route & Incoterm */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Port d'Origen
                  </label>
                  <input
                    type="text"
                    value={formData.originPort}
                    onChange={(e) => setFormData({ ...formData, originPort: e.target.value })}
                    placeholder="Ex: Ningbo o Hamburg"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Port de Destinació
                  </label>
                  <input
                    type="text"
                    value={formData.destPort}
                    onChange={(e) => setFormData({ ...formData, destPort: e.target.value })}
                    placeholder="Ex: Port de Barcelona"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Incoterm Aplicable
                  </label>
                  <select
                    value={formData.incoterm}
                    onChange={(e) => setFormData({ ...formData, incoterm: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 bg-white"
                  >
                    <option value="FOB">FOB (Free on Board)</option>
                    <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                    <option value="CFR">CFR (Cost and Freight)</option>
                    <option value="DAP">DAP (Delivered at Place)</option>
                    <option value="DDP">DDP (Delivered Duty Paid)</option>
                    <option value="EXW">EXW (Ex Works)</option>
                    <option value="FCA">FCA (Free Carrier)</option>
                  </select>
                </div>
              </div>

              {/* Volume & Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Volum estimat / Equips
                  </label>
                  <input
                    type="text"
                    value={formData.estimatedVolume}
                    onChange={(e) => setFormData({ ...formData, estimatedVolume: e.target.value })}
                    placeholder="Ex: 2x 40'HC o 8 Europalets"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tipologia de Mercaderia & Pes
                  </label>
                  <input
                    type="text"
                    value={formData.grossWeight}
                    onChange={(e) => setFormData({ ...formData, grossWeight: e.target.value })}
                    placeholder="Ex: Maquinària industrial, 14.500 kg"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Requeriments addicionals (opcional)
                </label>
                <textarea
                  rows={2}
                  value={formData.cargoDescription}
                  onChange={(e) => setFormData({ ...formData, cargoDescription: e.target.value })}
                  placeholder="Detalla si requereix inspecció sanitària, assegurança a tot risc, emmagatzematge en trànsit o descàrrega amb plataforma..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-xl shadow-md shadow-pink-600/30 transition-colors"
                >
                  {isSubmitting ? (
                    <span>Processant cotització...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Demanar Cotització Formal de Nòlit</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
