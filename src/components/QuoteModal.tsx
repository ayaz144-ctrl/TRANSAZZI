import React, { useState } from 'react';
import { X, Send, CheckCircle2, Crown, AlertCircle } from 'lucide-react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdegnaqk';

interface QuoteModalProps {
  initialService?: string;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  initialService = "Vestits d'Alta Costura & Gala",
  onClose
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: initialService,
    originCity: 'Atelier Passeig de Gràcia (BCN)',
    destCity: 'Barcelona / Madrid / París',
    sizeRange: '38 (M) / Home 50',
    cargoDescription: '',
    estimatedUnits: '1 Peça (Entrega Guant Blanc)',
    packagingType: 'Porta-Trajes Rígid & Perxa Cedre'
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const ref = `VIP-TRZ-${Math.floor(10000 + Math.random() * 90000)}`;

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          _subject: `[TRANSAZZI Encàrrec VIP] ${formData.service} - ${formData.name} (${ref})`,
          referencia: ref,
          nom_client: formData.name,
          esdeveniment_o_client: formData.company,
          email: formData.email,
          telefon: formData.phone,
          peca_o_colleccio: formData.service,
          atelier_origen: formData.originCity,
          adreca_desti: formData.destCity,
          talla_o_mesura: formData.sizeRange,
          quantitat: formData.estimatedUnits,
          presentacio_vip: formData.packagingType,
          notes_mesures: formData.cargoDescription,
          origen_formulari: 'Modal Encàrrec Privat TRANSAZZI'
        })
      });

      if (response.ok) {
        setSubmittedRef(ref);
      } else {
        const data = await response.json().catch(() => null);
        const errorMsg =
          data?.errors?.map((err: { message: string }) => err.message).join(', ') ||
          "No s'ha pogut tramitar l'encàrrec en aquest moment. Torna-ho a provar o escriu-nos a atelier@transazzi.com.";
        setSubmitError(errorMsg);
      }
    } catch {
      setSubmitError("Error de connexió en enviar l'encàrrec. Comprova la teva connexió i torna-ho a intentar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-pink-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 text-left">
        {/* Header */}
        <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-pink-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-600 text-white flex items-center justify-center shadow-xs">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Encàrrec Privat d&apos;Alta Costura o Sastreria
              </h3>
              <p className="text-[11px] text-pink-300">
                Confecció en teixits italians i entrega en porta-trajes sense arrugues
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
              <h4 className="font-serif-luxury text-2xl font-semibold text-slate-900 mb-1">
                Sol·licitud VIP Confirmada!
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto mb-4">
                El nostre servei Concierge ja prepara la selecció de teixits, talles i l&apos;enviament prioritari en porta-trajes. Ens posarem en contacte en menys de 2 hores.
              </p>

              <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 max-w-xs mx-auto mb-6 text-left text-xs">
                <span className="text-slate-500 block">Codi de Reserva Privada:</span>
                <span className="text-base font-mono font-bold text-pink-600 block my-1">
                  {submittedRef}
                </span>
                <span className="text-slate-600 block">Selecció: {formData.service}</span>
                <span className="text-slate-600 block">Talla: {formData.sizeRange} · {formData.destCity}</span>
              </div>

              <button
                onClick={onClose}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-lg transition-colors"
              >
                Tancar finestra
              </button>
            </div>
          ) : (
            <form action={FORMSPREE_ENDPOINT} method="POST" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nom i Cognoms <span className="text-pink-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nom del titular"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Esdeveniment o Destinatari <span className="text-pink-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Ex: Gala / Cerimònia / Armari Executiu"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Correu electrònic <span className="text-pink-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nom@correu.cat"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Telèfon Concierge / Lliurament
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

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vestit, Traje o Peça Sol·licitada
                </label>
                <input
                  type="text"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 bg-pink-50/40 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Salon d&apos;Origen
                  </label>
                  <input
                    type="text"
                    value={formData.originCity}
                    onChange={(e) => setFormData({ ...formData, originCity: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ciutat / Adreça VIP
                  </label>
                  <input
                    type="text"
                    value={formData.destCity}
                    onChange={(e) => setFormData({ ...formData, destCity: e.target.value })}
                    placeholder="Ex: Madrid Salamanca / París"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Talla o Bespoke
                  </label>
                  <select
                    value={formData.sizeRange}
                    onChange={(e) => setFormData({ ...formData, sizeRange: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500 bg-white"
                  >
                    <option value="Dona 34 (XS)">Dona 34 (XS)</option>
                    <option value="Dona 36 (S)">Dona 36 (S)</option>
                    <option value="Dona 38 (M)">Dona 38 (M)</option>
                    <option value="Dona 40 (L)">Dona 40 (L)</option>
                    <option value="Dona 42-44 (XL)">Dona 42-44 (XL)</option>
                    <option value="Home 48">Home Talla 48</option>
                    <option value="Home 50">Home Talla 50</option>
                    <option value="Home 52">Home Talla 52</option>
                    <option value="Home 54-56">Home Talla 54-56</option>
                    <option value="Confecció a Mida (Bespoke)">Confecció a Mida (Bespoke)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nombre de Peces
                  </label>
                  <input
                    type="text"
                    value={formData.estimatedUnits}
                    onChange={(e) => setFormData({ ...formData, estimatedUnits: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Presentació / Embalatge
                  </label>
                  <input
                    type="text"
                    value={formData.packagingType}
                    onChange={(e) => setFormData({ ...formData, packagingType: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferències d&apos;ajust, color o horari d&apos;entrega (opcional)
                </label>
                <textarea
                  rows={2}
                  value={formData.cargoDescription}
                  onChange={(e) => setFormData({ ...formData, cargoDescription: e.target.value })}
                  placeholder="Indica'ns si necessites ajust del baix del vestit o pantaló, gravat d'inicials a la bossa o lliurament en hotel..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {submitError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg flex items-start gap-2 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-pink-600 hover:bg-pink-500 disabled:bg-pink-400 rounded-xl shadow-md shadow-pink-600/30 transition-colors"
                >
                  {isSubmitting ? (
                    <span>Tramitant reserva...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Confirmar Encàrrec Privat VIP</span>
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
