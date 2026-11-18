import React from 'react';
import { LEGAL_TEXTS } from '../data/companyData';
import { X, ShieldAlert, FileText, CheckCircle } from 'lucide-react';

interface LegalModalProps {
  type: 'avisLegal' | 'privacitat' | 'cookies' | 'certificacions' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const doc = LEGAL_TEXTS[type];
  if (!doc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-pink-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 text-left">
        {/* Header */}
        <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-pink-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-600 text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{doc.title}</h3>
              <p className="text-[11px] text-pink-300">Darrera actualització: {doc.lastUpdated}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Academic disclaimer inside legal modal */}
        <div className="p-4 bg-pink-50/90 border-b border-pink-200 flex items-start gap-3 text-xs text-pink-950">
          <ShieldAlert className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold block">Nota Informativa d'Àmbit Estudiantil:</strong>
            Aquest document legal fictici ha estat redactat per a la simulació acadèmica d'una plataforma de logística i comerç exterior en el marc formatiu.
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {doc.sections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-pink-600" />
                <span>{section.heading}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-5">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-pink-50/50 px-6 py-4 border-t border-pink-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-pink-200 hover:bg-pink-100/60 rounded-lg transition-colors"
          >
            Tancar document
          </button>
        </div>
      </div>
    </div>
  );
};
