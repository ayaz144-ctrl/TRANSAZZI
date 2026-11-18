import React, { useState } from 'react';
import { Menu, X, ArrowRight, Compass } from 'lucide-react';

interface NavbarProps {
  companyName: string;
  onUpdateCompanyName?: (name: string) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenQuoteModal: () => void;
  onOpenTrackingModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  companyName,
  activeSection,
  onNavigate,
  onOpenQuoteModal,
  onOpenTrackingModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'inici', label: 'Inici' },
    { id: 'serveis', label: 'Serveis' },
    { id: 'simulador-duana', label: 'Simulador Duana' },
    { id: 'qui-som', label: 'Qui Som' },
    { id: 'blog', label: 'Blog' },
    { id: 'contacte', label: 'Contacte' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-pink-50/95 backdrop-blur-md border-b border-pink-200/90 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* A dalt a l'esquerra (Logo i Nom): [ Icona de fletxa > ] TRANSAZZI */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('inici')}
              className="flex items-center gap-3 text-left group focus:outline-hidden"
              aria-label="TRANSAZZI Inici"
            >
              {/* Clean White Card with the official [ Icona de fletxa > ] TRANSAZZI logo */}
              <div className="h-10 sm:h-11 flex items-center bg-white px-2.5 py-1 rounded-lg border border-pink-200 shadow-2xs group-hover:border-pink-400 group-hover:shadow-xs transition-all">
                <img
                  src="/assets/aistudio/image_3d887871.png"
                  alt="TRANSAZZI"
                  className="h-7 sm:h-8 w-auto max-w-[170px] sm:max-w-[210px] object-contain group-hover:scale-[1.02] transition-transform duration-200"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="sr-only">{companyName}</span>
            </button>
          </div>

          {/* Menú de Navegació: 1. Inici 2. Serveis 3. Qui Som 4. Blog 5. Contacte (Fons rosa fluix amb text fosc i accent rosa corporatiu) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors focus:outline-hidden ${
                    isActive
                      ? 'text-pink-600 font-bold'
                      : 'hover:text-pink-600 text-slate-700'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Botó principal al menú: [ Sol·licitar Pressupost ] + Seguiment */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenTrackingModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-pink-100/70 border border-pink-200 hover:border-pink-400 rounded-lg shadow-2xs transition-colors whitespace-nowrap shrink-0"
            >
              <Compass className="w-3.5 h-3.5 text-pink-600" />
              Seguiment
            </button>

            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-lg shadow-md shadow-pink-600/25 hover:shadow-pink-600/40 transition-all whitespace-nowrap shrink-0"
            >
              Sol·licitar Pressupost
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-pink-600 hover:bg-pink-100 rounded-lg transition-colors"
              aria-label="Obrir menú principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-pink-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown in Soft Pink */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-pink-200 bg-pink-50 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1.5 py-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-pink-100 text-pink-700 font-bold'
                    : 'text-slate-700 hover:bg-pink-100/70 hover:text-pink-600'
                }`}
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-600" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-pink-200 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrackingModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-700 bg-white hover:bg-pink-100/80 rounded-lg border border-pink-200 transition-colors"
            >
              <Compass className="w-4 h-4 text-pink-600" />
              Seguiment de Càrrega
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-lg shadow-sm shadow-pink-600/30 transition-colors"
            >
              Sol·licitar Pressupost
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
