import React from 'react';
import { ShieldAlert, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { OFFICE_DATA } from '../data/companyData';

interface FooterProps {
  companyName: string;
  onNavigate: (sectionId: string) => void;
  onOpenLegal: (type: 'avisLegal' | 'privacitat' | 'cookies' | 'certificacions') => void;
}

export const Footer: React.FC<FooterProps> = ({
  companyName,
  onNavigate,
  onOpenLegal
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-pink-900/40 text-left">
      {/* Disclaimer Banner */}
      <div className="bg-pink-950/80 border-b border-pink-900 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-pink-200">
            <ShieldAlert className="w-4 h-4 text-pink-400 shrink-0" />
            <span>
              <strong className="text-white font-semibold">AVÍS ACADÈMIC / ENTORN EDUCATIU:</strong> Portal web de demostració corporativa generat en l'àmbit estudiantil per a projectes d'e-commerce, transport internacional i comerç exterior.
            </span>
          </div>
          <span className="text-[11px] font-mono text-pink-300 shrink-0 bg-pink-900/60 px-2 py-0.5 rounded border border-pink-700/60">
            Simulació Pedagògica 2026
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Exact 3 Columns Specified in the Brief */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {/* Columna 1 - Marca: TRANSAZZI */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-9 px-2.5 py-1 bg-white rounded-lg inline-flex items-center justify-center shrink-0 shadow-2xs border border-pink-200">
                <img
                  src="/assets/aistudio/image_3d887871.png"
                  alt="TRANSAZZI"
                  className="h-5.5 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                {OFFICE_DATA.companyFormal}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              Líders en transport portuari i gestió logística de contenidors.
            </p>

            <p className="text-xs text-slate-400 leading-relaxed">
              Especialistes en connectar terminals marítimes amb la cadena de subministrament industrial mitjançant transport de contenidors ràpid, segur i personalitzat.
            </p>

            <div className="pt-2 text-[11px] text-slate-400 font-mono space-y-1">
              <div>NIF Fictici: {OFFICE_DATA.vatNumber}</div>
              <div>Acreditació Duanera: {OFFICE_DATA.oeaRegister}</div>
            </div>
          </div>

          {/* Columna 2 - Enllaços ràpids: 1. Inici 2. Serveis 3. Qui Som 4. Blog 5. Contacte */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-pink-400">
              Enllaços ràpids
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('inici')}
                  className="hover:text-pink-300 transition-colors"
                >
                  Inici
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('serveis')}
                  className="hover:text-pink-300 transition-colors"
                >
                  Serveis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('simulador-duana')}
                  className="hover:text-pink-300 transition-colors"
                >
                  Simulador Duana
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('qui-som')}
                  className="hover:text-pink-300 transition-colors"
                >
                  Qui Som
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-pink-300 transition-colors"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contacte')}
                  className="hover:text-pink-300 transition-colors"
                >
                  Contacte
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Dades de contacte */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-pink-400">
              Dades de contacte
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              {/* 📍 Adreça: Zona Franca Portuària, Sector 3, Carrer Principal 12, 08040 Barcelona, Espanya */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Adreça:</strong> {OFFICE_DATA.address}, {OFFICE_DATA.postalCode}
                </span>
              </div>

              {/* 📞 Telèfon: +34 932 100 850 */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-pink-400 shrink-0" />
                <span>
                  <strong>Telèfon:</strong>{' '}
                  <a href={`tel:${OFFICE_DATA.phone}`} className="hover:text-pink-300 font-mono transition-colors">
                    {OFFICE_DATA.phone}
                  </a>
                </span>
              </div>

              {/* ✉️ Email: contacte@transazzi.com */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-pink-400 shrink-0" />
                <span>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${OFFICE_DATA.emailGeneral}`} className="hover:text-pink-300 transition-colors">
                    {OFFICE_DATA.emailGeneral}
                  </a>
                </span>
              </div>

              {/* Horari d'atenció */}
              <div className="flex items-center gap-2.5 pt-1 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-pink-400 shrink-0" />
                <span>
                  <strong>Horari:</strong> {OFFICE_DATA.schedule}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright (A baix de tot) amb els 3 enllaços legals: Avís Legal | Política de Privacitat | Política de Cookies */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 TRANSAZZI. Tots els drets reservats.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenLegal('avisLegal')}
              className="hover:text-pink-400 transition-colors"
            >
              Avís Legal
            </button>
            <span aria-hidden="true" className="text-slate-700">|</span>

            <button
              onClick={() => onOpenLegal('privacitat')}
              className="hover:text-pink-400 transition-colors"
            >
              Política de Privacitat
            </button>
            <span aria-hidden="true" className="text-slate-700">|</span>

            <button
              onClick={() => onOpenLegal('cookies')}
              className="hover:text-pink-400 transition-colors"
            >
              Política de Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
