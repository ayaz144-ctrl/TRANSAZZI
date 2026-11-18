import React, { useState } from 'react';
import { OFFICE_DATA } from '../data/companyData';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldCheck, Building2 } from 'lucide-react';

interface ContactSectionProps {
  companyName: string;
  prefilledService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  companyName,
  prefilledService = 'Transport Portuari'
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceType: prefilledService || 'Transport Portuari',
    message: '',
    privacyAccepted: true
  });

  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const randomTicket = `TRZ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedTicket(randomTicket);
      setIsSubmitting(false);
    }, 500);
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      serviceType: 'Transport Portuari',
      message: '',
      privacyAccepted: true
    });
  };

  return (
    <section id="contacte" className="py-20 bg-white border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-2">
            <span>Atenció al Client</span>
            <span aria-hidden="true" className="text-pink-300">/</span>
            <span>TRANSAZZI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Contacta amb nosaltres
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Estem a la teva disposició per resoldre qualsevol dubte o oferir-te una cotització personalitzada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Dades de Contacte Reals (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6 text-left">
              <div className="bg-pink-50/50 p-6 rounded-2xl border border-pink-200">
                <div className="flex items-center gap-2 text-xs font-bold text-pink-600 uppercase tracking-wider mb-3">
                  <Building2 className="w-4 h-4" />
                  <span>Dades de Contacte Reals</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">{OFFICE_DATA.companyFormal}</h3>

                <div className="space-y-4 text-xs sm:text-sm">
                  {/* Adreça física */}
                  <div className="flex items-start gap-3 text-slate-700">
                    <MapPin className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">Adreça física:</div>
                      <div>{OFFICE_DATA.address}, {OFFICE_DATA.postalCode}</div>
                    </div>
                  </div>

                  {/* Telèfon d'atenció */}
                  <div className="flex items-start gap-3 text-slate-700">
                    <Phone className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">Telèfon d'atenció:</div>
                      <div>
                        <a href={`tel:${OFFICE_DATA.phone}`} className="font-medium text-pink-600 hover:underline">
                          {OFFICE_DATA.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Correu electrònic */}
                  <div className="flex items-start gap-3 text-slate-700">
                    <Mail className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">Correu electrònic:</div>
                      <div>
                        <a href={`mailto:${OFFICE_DATA.emailGeneral}`} className="font-medium text-pink-600 hover:underline">
                          {OFFICE_DATA.emailGeneral}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Horari d'atenció */}
                  <div className="flex items-start gap-3 text-slate-700 pt-2 border-t border-pink-200/60">
                    <Clock className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">Horari d'atenció:</div>
                      <div>{OFFICE_DATA.schedule}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-4 rounded-xl bg-pink-50/80 border border-pink-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700">
                  <span className="font-bold text-pink-950 block">Atenció Ràpida i Personalitzada</span>
                  El nostre equip de coordinació de transport portuari respon a totes les consultes en menys de 24 hores hàbils.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Formulari de Contacte Visual (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-pink-200/90 p-6 sm:p-8 shadow-xs text-left">
              {submittedTicket ? (
                <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Missatge Enviat Correctament!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4">
                    Gràcies per contactar amb TRANSAZZI. Hem registrat la teva sol·licitud i et respondrem en menys de 24 hores.
                  </p>

                  <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 max-w-sm mx-auto mb-6 text-left text-xs">
                    <div className="text-slate-500 font-medium">Referència de seguiment:</div>
                    <div className="text-base font-bold font-mono text-pink-600 my-1">{submittedTicket}</div>
                    <div className="text-slate-500">Nom: <strong className="text-slate-800">{formData.fullName}</strong></div>
                    <div className="text-slate-500">Correu: <strong className="text-slate-800">{formData.email}</strong></div>
                    <div className="text-slate-500">Servei: <strong className="text-slate-800">{formData.serviceType}</strong></div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-lg transition-colors"
                  >
                    Enviar un altre missatge
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Títol del formulari: Envia'ns un missatge i et respondrem en menys de 24 hores. */}
                  <div className="border-b border-pink-100 pb-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      Envia'ns un missatge i et respondrem en menys de 24 hores.
                    </h3>
                  </div>

                  {/* 1. Nom i Cognoms (Text) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Nom i Cognoms <span className="text-pink-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Introdueix el teu nom i cognoms"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* 2. Correu Electrònic (Email) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Correu Electrònic <span className="text-pink-600">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="el.teu.correu@empresa.com"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-slate-900 placeholder:text-slate-400"
                      />
                    </div>

                    {/* 3. Telèfon de Contacte (Telèfon) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Telèfon de Contacte <span className="text-pink-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+34 600 000 000"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* 4. Tipus de Servei requerit (Desplegable: Transport Portuari / Emmagatzematge / Càrrega Especial) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Tipus de Servei requerit <span className="text-pink-600">*</span>
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-slate-900 bg-white"
                    >
                      <option value="Transport Portuari">Transport Portuari</option>
                      <option value="Emmagatzematge">Emmagatzematge</option>
                      <option value="Càrrega Especial">Càrrega Especial</option>
                    </select>
                  </div>

                  {/* 5. Missatge o Detalls de la Càrrega (Àrea de text) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Missatge o Detalls de la Càrrega <span className="text-pink-600">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Explica'ns els detalls de la teva càrrega: origen, destí, dimensions, dates d'arribada al port..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-slate-900 placeholder:text-slate-400 leading-relaxed"
                    />
                  </div>

                  {/* 6. Casella de verificació: "He llegit i accepto la Política de Privacitat." */}
                  <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
                    <input
                      type="checkbox"
                      id="privacy"
                      checked={formData.privacyAccepted}
                      onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                      required
                      className="rounded text-pink-600 focus:ring-pink-500"
                    />
                    <label htmlFor="privacy" className="cursor-pointer">
                      He llegit i accepto la Política de Privacitat.
                    </label>
                  </div>

                  {/* Botó d'enviament: [ Enviar Missatge ] */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 text-xs sm:text-sm font-semibold text-white bg-pink-600 hover:bg-pink-500 disabled:bg-pink-400 rounded-xl shadow-md shadow-pink-600/30 transition-all duration-150"
                  >
                    {isSubmitting ? (
                      <span>Enviant missatge...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar Missatge</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
