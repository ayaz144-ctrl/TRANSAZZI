import React from 'react';
import { Crown, Award, Navigation, Users, CheckCircle } from 'lucide-react';
import { OperationsMap } from './OperationsMap';

interface AboutSectionProps {
  companyName: string;
  onSelectLocationForQuote?: (locationName: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onSelectLocationForQuote
}) => {
  const values = [
    {
      title: 'Filatures de Biella & Como',
      desc: 'Llana verge Super 150s, caixmir de Mongòlia i seda Mulberry de 22 Momme seleccionats als millors telers italians.',
      icon: Crown
    },
    {
      title: 'Sastreria Home i Dona a Mida',
      desc: 'Patrons arquitectònics amb entretela flotant, botons de banya polida i servei d’ajust privat inclosos.',
      icon: Award
    },
    {
      title: 'Enviament VIP Vertical 24h',
      desc: 'Flota pròpia climatitzada que transporta vestits i trajes penjats en porta-trajes de lli fins a la porta.',
      icon: Navigation
    },
    {
      title: 'Atenció Privada Concierge',
      desc: 'Assessorament discret d’estilisme i etiqueta per a gales, empreses, casaments i renovació d’armari.',
      icon: Users
    }
  ];

  return (
    <section id="qui-som" className="py-20 bg-white border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-pink-600 mb-2">
            <span>Maison d&apos;Alta Costura &amp; Sastreria</span>
            <span aria-hidden="true" className="text-pink-300">/</span>
            <span>La Maison</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-tight text-balance">
            L&apos;art de vestir amb elegància atemporal
          </h2>
          <div className="mt-4 space-y-3 text-base text-slate-600 leading-relaxed">
            <p>
              A <strong className="font-semibold text-slate-900">TRANSAZZI</strong> creem vestits d&apos;alta costura i sastreria clàssica per a home i dona que transmeten distinció sense estridències. Des del nostre salon de Passeig de Gràcia, unim la tradició sastre europea amb un servei d&apos;entrega privada impecable.
            </p>
            <p>
              Cada peça s&apos;elabora en tirades molt curtes, cuidant les solapes, el tall al biaix i la noblesa dels teixits perquè es vegi i se senti extraordinària des del primer segon.
            </p>
          </div>
        </div>

        {/* Corporate Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-pink-50/35 rounded-xl p-6 border border-pink-100 hover:border-pink-300 hover:shadow-md hover:shadow-pink-100/50 transition-all text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-pink-600 text-white flex items-center justify-center mb-4 shadow-sm shadow-pink-600/30">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {val.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Luxury Boutiques & Delivery Map */}
        <div className="mb-14">
          <OperationsMap onSelectLocationForQuote={onSelectLocationForQuote} />
        </div>

        {/* Luxury Showroom Showcase */}
        <div className="rounded-2xl bg-slate-950 text-white p-6 sm:p-8 lg:p-10 border border-pink-900/40 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 rounded-xl overflow-hidden border border-pink-600/40 shadow-lg">
              <img
                src="/assets/fashion/luxury_showroom.jpg"
                alt="Salon privat d'alta costura i sastreria TransAzzi amb vestits de gala i trajes a mida"
                className="w-full h-60 sm:h-72 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:col-span-5 text-left">
              <span className="text-[11px] font-mono font-bold text-pink-400 uppercase tracking-wider block mb-1">
                Salon Privé · Passeig de Gràcia
              </span>
              <h4 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-white mb-3">
                Vestits de gala i trajes exclusius llestos per a tu
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                Visiteu el nostre showroom privat a Barcelona o sol·liciteu l&apos;enviament VIP a domicili a qualsevol ciutat d&apos;Espanya i Europa amb el nostre servei de guant blanc.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-pink-400" />
                  Prova privada i sastre propi
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-pink-400" />
                  Entrega en porta-trajes rígid
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
