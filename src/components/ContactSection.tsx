import React, { useState, useEffect } from 'react';
import { OFFICE_DATA } from '../data/companyData';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldCheck, Building2, AlertCircle } from 'lucide-react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdegnaqk';

interface ContactSectionProps {
  companyName: string;
  prefilledService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefilledService = "Vestits d'Alta Costura & Gala"
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceType: prefilledService || "Vestits d'Alta Costura & Gala",
    message: '',
    privacyAccepted: true
  });

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, serviceType: prefilledService }));
    }
  }, [prefilledService]);

  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const ticketRef = `TRZ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          _subject: `[TRANSAZZI Maison Contacte] ${formData.serviceType} - ${formData.fullName} (${ticketRef})`,
          referencia: ticketRef,
          nom_i_cognoms: formData.fullName,
          email: formData.email,
          telefon: formData.phone,
          colleccio_o_cita: formData.serviceType,
          missatge: formData.message,
          privacitat_acceptada: formData.privacyAccepted ? 'Sí' : 'No',
          origen_formulari: 'Secció Contacte Maison TRANSAZZI'
        })
      });

      if (response.ok) {
        setSubmittedTicket(ticketRef);
      } else {
        const data = await response.json().catch(() => null);
        const errorMsg =
          data?.errors?.map((err: { message: string }) => err.message).join(', ') ||
          "No s'ha pogut enviar el missatge en aquest moment. Torna-ho a provar o escriu-nos a atelier@transazzi.com.";
        setSubmitError(errorMsg);
      }
    } catch {
      setSubmitError("Error de connexió en enviar el formulari. Comprova la teva connexió a internet i torna-ho a intentar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setSubmitError(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      serviceType: "Vestits d'Alta Costura & Gala",
      message: '',
      privacyAccepted: true
    });
  };

  return (
    <section id="contacte" className="py-20 bg-white border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-pink-600 mb-2">
            <span>Servei Concierge &amp; Cita Privada</span>
            <span aria-hidden="true" className="text-pink-300">/</span>
            <span>Maison TRANSAZZI</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight text-balance">
            Sol·licita Cita al Salon o Assessorament Privé
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Reserva una sessió amb el nostre mestre sastre, demana mesures per a un vestit de gala o consulta l&apos;enviament urgent del teu traje.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Salon Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6 text-left">
              <div className="bg-pink-50/50 p-6 rounded-2xl border border-pink-200">
                <div className="flex items-center gap-2 text-xs font-bold text-pink-600 uppercase tracking-wider mb-3">
                  <Building2 className="w-4 h-4" />
                  <span>Salon Privé Barcelona</span>
                </div>
                <h3 className="font-serif-luxury text-2xl font-semibold text-slate-900 mb-4">{OFFICE_DATA.companyFormal}</h3>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3 text-slate-700">
                    <MapPin className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">Adreça del Salon:</div>
                      <div>{OFFICE_DATA.address}, {OFFICE_DATA.postalCode}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-slate-700">
                    <Phone className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">Telèfon Concierge:</div>
                      <div>
                        <a href={`tel:${OFFICE_DATA.phone}`} className="font-medium text-pink-600 hover:underline">
                          {OFFICE_DATA.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-slate-700">
                    <Mail className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">Correu de l&apos;Atelier:</div>
                      <div>
                        <a href={`mailto:${OFFICE_DATA.emailGeneral}`} className="font-medium text-pink-600 hover:underline">
                          {OFFICE_DATA.emailGeneral}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-slate-700 pt-2 border-t border-pink-200/60">
                    <Clock className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">Horari de proves:</div>
                      <div>{OFFICE_DATA.schedule}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-pink-50/80 border border-pink-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700">
                  <span className="font-bold text-pink-950 block">Sastreria &amp; Alta Costura Personalitzada</span>
                  Cada consulta és atesa directament pels nostres estilistes i mestres sastres en menys de 24 hores.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-pink-200/90 p-6 sm:p-8 shadow-xs text-left">
              {submittedTicket ? (
                <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif-luxury text-2xl font-semibold text-slate-900 mb-2">
                    Sol·licitud Rebuda a l&apos;Atelier!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4">
                    Gràcies per contactar amb TRANSAZZI. El nostre equip de Concierge es posarà en contacte amb tu en breu.
                  </p>

                  <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 max-w-sm mx-auto mb-6 text-left text-xs">
                    <div className="text-slate-500 font-medium">Referència:</div>
                    <div className="text-base font-bold font-mono text-pink-600 my-1">{submittedTicket}</div>
                    <div className="text-slate-500">Client: <strong className="text-slate-800">{formData.fullName}</strong></div>
                    <div className="text-slate-500">Correu: <strong className="text-slate-800">{formData.email}</strong></div>
                    <div className="text-slate-500">Selecció: <strong className="text-slate-800">{formData.serviceType}</strong></div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-lg transition-colors"
                  >
                    Enviar una altra consulta
                  </button>
                </div>
              ) : (
                <form action={FORMSPREE_ENDPOINT} method="POST" onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-pink-100 pb-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      Escriu-nos i rebràs atenció privada en menys de 24 hores.
                    </h3>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Nom i Cognoms <span className="text-pink-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="nom_i_cognoms"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="El teu nom complet"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-slate-900 placeholder:text-slate-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Correu Electrònic <span className="text-pink-600">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nom@correu.cat"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-slate-900 placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Telèfon de Contacte <span className="text-pink-600">*</span>
                      </label>
                      <input
                        type="tel"
                        name="telefon"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+34 600 000 000"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Col·lecció o Servei d&apos;Interès <span className="text-pink-600">*</span>
                    </label>
                    <select
                      name="colleccio_o_cita"
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-slate-900 bg-white"
                    >
                      <option value="Vestits d'Alta Costura & Gala">Vestits d&apos;Alta Costura &amp; Gala</option>
                      <option value="Sastreria de Luxe Home (Super 150s)">Sastreria de Luxe Home (Super 150s)</option>
                      <option value="Sastreria de Luxe Dona & Blazers">Sastreria de Luxe Dona &amp; Blazers</option>
                      <option value="Marroquineria, Seda & Cofre VIP">Marroquineria, Seda &amp; Cofre VIP</option>
                      <option value="Cita Privada a Mida / Bespoke">Cita Privada a Mida / Bespoke</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Detalls del Vestit, Traje o Data de l&apos;Esdeveniment <span className="text-pink-600">*</span>
                    </label>
                    <textarea
                      name="missatge"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Explica'ns quina peça busques, la teva talla habitual o la data del teu esdeveniment..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-slate-900 placeholder:text-slate-400 leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
                    <input
                      type="checkbox"
                      id="privacy"
                      name="privacitat_acceptada"
                      checked={formData.privacyAccepted}
                      onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                      required
                      className="rounded text-pink-600 focus:ring-pink-500"
                    />
                    <label htmlFor="privacy" className="cursor-pointer">
                      He llegit i accepto la Política de Privacitat.
                    </label>
                  </div>

                  {submitError && (
                    <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg flex items-start gap-2 border border-red-200">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 text-xs sm:text-sm font-semibold text-white bg-pink-600 hover:bg-pink-500 disabled:bg-pink-400 rounded-xl shadow-md shadow-pink-600/30 transition-all duration-150"
                  >
                    {isSubmitting ? (
                      <span>Enviant sol·licitud...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar Consulta a l&apos;Atelier</span>
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
