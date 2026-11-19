import React, { useState } from 'react';
import {
  MapPin,
  Crown,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Globe,
  Navigation,
  Compass
} from 'lucide-react';

export interface OperationalPoint {
  id: string;
  name: string;
  city: string;
  country: string;
  category: 'peninsula' | 'europe' | 'global';
  typeLabel: string;
  x: number;
  y: number;
  location: string;
  transitTime: string;
  facilities: string[];
  equipment: string;
  description: string;
  isHQ?: boolean;
}

const OPERATIONAL_POINTS: OperationalPoint[] = [
  {
    id: 'bcn',
    name: 'Barcelona (Atelier Central & Salon Privé)',
    city: 'Barcelona',
    country: 'Catalunya / Espanya',
    category: 'peninsula',
    typeLabel: 'Maison Central & Sastreria',
    x: 62,
    y: 58,
    isHQ: true,
    location: 'Passeig de Gràcia 84, Principal / Eixample',
    transitTime: 'Lliurament Concierge el mateix dia (< 4h)',
    facilities: [
      'Salon privat de proves per a vestits de gala i trajes a mida',
      'Mestres sastres i modistes d’alta costura propis',
      'Preparació en porta-trajes rígid amb perxa de cedre',
      'Sortides diàries en flota climatitzada cap a tot Europa'
    ],
    equipment: 'Vehicles privats condicionats per a peces llargues penjades',
    description: 'El cor de Maison TRANSAZZI. Des d’aquí dissenyem, ajustem i enviem cada vestit de seda i traje Super 150s.'
  },
  {
    id: 'madrid',
    name: 'Madrid (Showroom Salamanca)',
    city: 'Madrid',
    country: 'Espanya',
    category: 'peninsula',
    typeLabel: 'Salon Privé & Entrega Guant Blanc',
    x: 46,
    y: 64,
    location: 'Carrer de Serrano / Barri de Salamanca',
    transitTime: 'Lliurament en 24 hores',
    facilities: [
      'Presa de mides bespoke i proves privades amb cita prèvia',
      'Reposició urgent de vestits i trajes per a cerimònies',
      'Servei d’entrega directa a domicili o hotel'
    ],
    equipment: 'Missatgeria privada vertical de guant blanc',
    description: 'El nostre salon madrileny per a clients que busquen sastreria italiana i vestits d’alta costura amb entrega immediata.'
  },
  {
    id: 'valencia',
    name: 'València (Salon Eixample)',
    city: 'València',
    country: 'Espanya',
    category: 'peninsula',
    typeLabel: 'Boutique & Concierge Llevant',
    x: 58,
    y: 69,
    location: 'Carrer de Colón / Plaça de los Pinazo',
    transitTime: 'Lliurament en menys de 24 hores',
    facilities: [
      'Col·lecció completa de vestits de seda per a esdeveniments',
      'Sastreria d’home en llanes fresques i lli irlandès',
      'Recollida i canvi de talla a domicili gratuït'
    ],
    equipment: 'Ruta directa Mediterrània en porta-trajes',
    description: 'Elegància atemporal per a cerimònies, nits d’estiu i armari executiu a tot el Llevant.'
  },
  {
    id: 'tarragona',
    name: 'Tarragona & Costa Daurada',
    city: 'Tarragona',
    country: 'Catalunya',
    category: 'peninsula',
    typeLabel: 'Ruta Directa Atelier',
    x: 59,
    y: 61,
    location: 'Rambla Nova / Lliurament Privat',
    transitTime: 'Entrega mateix dia o 24h',
    facilities: [
      'Enviament directe des de Passeig de Gràcia en el dia',
      'Ajustament de baixos de pantaló i vestits',
      'Embalatge VIP amb targeta cal·ligràfica'
    ],
    equipment: 'Furgoneta privada TransAzzi Catalunya',
    description: 'Servei prioritari per a clients particulars de Tarragona, Reus i Sitges.'
  },
  {
    id: 'marbella',
    name: 'Marbella & Sotogrande (Hub Sud)',
    city: 'Marbella',
    country: 'Espanya',
    category: 'peninsula',
    typeLabel: 'Boutique Estiu & Gala',
    x: 37,
    y: 83,
    location: 'Milla d’Or de Marbella / Puerto Banús',
    transitTime: 'Lliurament VIP en 24/48h',
    facilities: [
      'Selecció de vestits de seda fluida, lli i americanes creuades',
      'Entrega directa en vil·les privades, clubs nàutics i hotels',
      'Servei d’estilisme per a gales benèfiques i bodes'
    ],
    equipment: 'Transport climatitzat vertical sense arrugues',
    description: 'Vestuari de màxim nivell i entrega discreta a la Costa del Sol.'
  },
  {
    id: 'bilbao',
    name: 'Bilbao & Sant Sebastià',
    city: 'Bilbao',
    country: 'Espanya',
    category: 'peninsula',
    typeLabel: 'Sastreria Nord',
    x: 48,
    y: 44,
    location: 'Gran Vía Bilbao / Àrea Metropolitana',
    transitTime: 'Lliurament en 24h',
    facilities: [
      'Abrics double-face de caixmir i trajes tres peces',
      'Protecció impermeabilitzada en cada porta-trajes',
      'Assessorament de mesures a distància'
    ],
    equipment: 'Flota express amb funda antihumitat',
    description: 'Sastreria clàssica de llana Super 150s i abrics nobles per al nord peninsular.'
  },
  {
    id: 'zaragoza',
    name: 'Saragossa (Centre)',
    city: 'Saragossa',
    country: 'Espanya',
    category: 'peninsula',
    typeLabel: 'Entrega VIP 24h',
    x: 54,
    y: 53,
    location: 'Passeig de la Independència',
    transitTime: '24 hores garantides',
    facilities: [
      'Entrega en mà a domicili o despatx',
      'Caixa rígida marfil amb paper de seda rosa',
      'Canvis gratuïts durant 30 dies'
    ],
    equipment: 'Missatgeria dedicada d’alta costura',
    description: 'Cobertura diària des del nostre atelier central cap a Aragó.'
  },
  {
    id: 'paris',
    name: 'París (Salon Faubourg Saint-Honoré)',
    city: 'París',
    country: 'França',
    category: 'europe',
    typeLabel: 'Showroom Alta Costura',
    x: 61,
    y: 26,
    location: 'Rue du Faubourg Saint-Honoré, París',
    transitTime: 'Enviament Express Europa 48h',
    facilities: [
      'Salon de presentació de vestits de gala i seda francesa',
      'Lliurament directe en hotels de 5 estrelles i residències',
      'Atenció privada amb modistes especialitzades'
    ],
    equipment: 'Enllaç internacional directe Barcelona - París',
    description: 'La nostra adreça de referència a París per a proves i enviaments d’alta costura.'
  },
  {
    id: 'milano',
    name: 'Milà & Biella (Telers & Sastreria)',
    city: 'Milà',
    country: 'Itàlia',
    category: 'europe',
    typeLabel: 'Filatures & Moda Itàlia',
    x: 78,
    y: 41,
    location: 'Quadrilàter de la Moda / Via Montenapoleone',
    transitTime: 'Connexió directe 48h',
    facilities: [
      'Origen de les nostres llanes Super 150s i sedes de Como',
      'Confecció artesanal napolitana i milanesa',
      'Enviament directe a clients de tota Itàlia'
    ],
    equipment: 'Transport privat entre telers i atelier',
    description: 'On neixen els nostres teixits més exclusius abans d’arribar a Barcelona.'
  },
  {
    id: 'zurich',
    name: 'Ginebra & Zúric (Suïssa)',
    city: 'Zúric',
    country: 'Suïssa',
    category: 'europe',
    typeLabel: 'Concierge & Duana VIP Suïssa',
    x: 73,
    y: 27,
    location: 'Bahnhofstrasse / Rue du Rhône',
    transitTime: 'Enviament assegurat 48/72h',
    facilities: [
      'Despatx duaner suís preferent pre-validat',
      'Gran demanda en abrics de caixmir i trajes executius',
      'Entrega privada amb cita concertada'
    ],
    equipment: 'Correu aeri i terrestre assegurat a tot risc',
    description: 'Servei discret i puntual per als nostres clients de banca i diplomàcia a Suïssa.'
  },
  {
    id: 'londres',
    name: 'Londres (Mayfair & Savile Row)',
    city: 'Londres',
    country: 'Regne Unit',
    category: 'global',
    typeLabel: 'Tradicions de Sastreria',
    x: 47,
    y: 16,
    location: 'Mayfair, Londres',
    transitTime: 'Enviament Express 48/72h (amb duana)',
    facilities: [
      'Inspiració de sastreria clàssica anglesa i doble botonadura',
      'Gestió duanera UK completa inclosa a la comanda',
      'Enviament en porta-trajes rígid fins al domicili'
    ],
    equipment: 'Servei aeri internacional de guant blanc',
    description: 'Connexió regular amb Londres per a clients amants del tall clàssic europeu.'
  }
];

interface OperationsMapProps {
  onSelectLocationForQuote?: (locationName: string) => void;
}

export const OperationsMap: React.FC<OperationsMapProps> = ({
  onSelectLocationForQuote
}) => {
  const [selectedPointId, setSelectedPointId] = useState<string>('bcn');
  const [filterCategory, setFilterCategory] = useState<'all' | 'peninsula' | 'europe' | 'global'>('all');

  const selectedPoint = OPERATIONAL_POINTS.find((p) => p.id === selectedPointId) || OPERATIONAL_POINTS[0];

  const filteredPoints = OPERATIONAL_POINTS.filter((p) => {
    if (filterCategory === 'all') return true;
    return p.category === filterCategory;
  });

  const bcnHQ = OPERATIONAL_POINTS.find((p) => p.id === 'bcn')!;

  return (
    <div className="bg-slate-950 text-white rounded-3xl border border-pink-900/40 p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden text-left">
      {/* Map Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-800 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-400 mb-2">
            <Compass className="w-4 h-4 text-pink-500" />
            <span>Xarxa d&apos;Ateliers, Salons &amp; Lliuraments VIP</span>
            <span aria-hidden="true" className="text-pink-600">/</span>
            <span>TRANSAZZI</span>
          </div>
          <h3 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            On dissenyem i enviem les nostres col·leccions
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl">
            Des del nostre <strong>Salon Privé a Passeig de Gràcia (Barcelona)</strong>, realitzem enviaments exclusius en porta-trajes fins a Madrid, Marbella, París, Milà, Suïssa i Londres.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 self-start lg:self-auto">
          {[
            { id: 'all', label: 'Totes les Seus (11)' },
            { id: 'peninsula', label: 'Espanya & Catalunya (7)' },
            { id: 'europe', label: 'París, Milà & Suïssa (3)' },
            { id: 'global', label: 'Londres Mayfair (1)' }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilterCategory(filter.id as 'all' | 'peninsula' | 'europe' | 'global')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterCategory === filter.id
                  ? 'bg-pink-600 text-white shadow-sm shadow-pink-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map + Inspector Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-pink-950/80 p-4 sm:p-6 relative overflow-hidden shadow-inner flex flex-col justify-between min-h-[460px] sm:min-h-[520px]">
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(#ec4899 1px, transparent 1px), radial-gradient(#64748b 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 12px 12px'
            }}
          />

          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
            <div className="flex items-center gap-2">
              <span>RUTES D&apos;ALTA COSTURA &amp; CONCIERGE</span>
            </div>
            <span className="text-pink-400">ATELIERS · SALONS · LLIURAMENT VIP</span>
          </div>

          <div className="relative w-full aspect-[4/3] my-auto">
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full drop-shadow-md overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="pink-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <path
                d="M 210 300 L 350 285 L 400 325 L 490 340 L 505 405 L 480 460 L 420 500 L 320 510 L 235 480 L 210 410 Z"
                fill="#0f172a"
                stroke="#1e293b"
                strokeWidth="2"
              />

              <path
                d="M 440 335 L 480 285 L 510 210 L 550 150 L 620 130 L 680 150 L 700 220 L 670 280 L 640 320 L 580 360 L 520 355 L 480 345 Z"
                fill="#0f172a"
                stroke="#1e293b"
                strokeWidth="2"
              />

              {filteredPoints.map((point) => {
                if (point.id === 'bcn') return null;
                const x1 = (bcnHQ.x / 100) * 800;
                const y1 = (bcnHQ.y / 100) * 600;
                const x2 = (point.x / 100) * 800;
                const y2 = (point.y / 100) * 600;
                const isSelected = selectedPointId === point.id;
                const cx = (x1 + x2) / 2 - (y2 - y1) * 0.15;
                const cy = (y1 + y2) / 2 + (x2 - x1) * 0.15;

                return (
                  <g key={`line-${point.id}`}>
                    <path
                      d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                      fill="none"
                      stroke={isSelected ? '#ec4899' : '#334155'}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                      strokeDasharray={isSelected ? '6 4' : '3 3'}
                      opacity={isSelected ? 1 : 0.6}
                    />
                  </g>
                );
              })}

              {filteredPoints.map((point) => {
                const px = (point.x / 100) * 800;
                const py = (point.y / 100) * 600;
                const isSelected = selectedPointId === point.id;
                const isHQ = point.isHQ;

                return (
                  <g
                    key={`node-${point.id}`}
                    className="cursor-pointer transition-transform duration-200"
                    onClick={() => setSelectedPointId(point.id)}
                  >
                    {(isHQ || isSelected) && (
                      <circle
                        cx={px}
                        cy={py}
                        r={isSelected ? 18 : 14}
                        fill="none"
                        stroke="#ec4899"
                        strokeWidth="1.5"
                        opacity="0.55"
                      />
                    )}

                    <circle
                      cx={px}
                      cy={py}
                      r={isHQ ? 12 : isSelected ? 10 : 7}
                      fill={isHQ ? '#ec4899' : isSelected ? '#f43f5e' : '#1e293b'}
                      stroke={isSelected || isHQ ? '#ffffff' : '#ec4899'}
                      strokeWidth={isSelected || isHQ ? '2.5' : '1.5'}
                      filter={isSelected ? 'url(#pink-glow)' : ''}
                    />

                    <circle
                      cx={px}
                      cy={py}
                      r={isHQ ? 4 : isSelected ? 3.5 : 2.5}
                      fill={isHQ || isSelected ? '#ffffff' : '#ec4899'}
                    />

                    <text
                      x={px}
                      y={py - 14}
                      textAnchor="middle"
                      className={`text-[11px] font-sans font-bold select-none transition-all ${
                        isSelected
                          ? 'fill-pink-300 font-extrabold text-[12px]'
                          : isHQ
                          ? 'fill-white'
                          : 'fill-slate-400'
                      }`}
                    >
                      {point.city}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="relative z-10 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500 ring-2 ring-pink-300 inline-block" />
                <span>Atelier Central (Barcelona)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-700 border border-pink-400 inline-block" />
                <span>Salons &amp; Destins VIP</span>
              </span>
            </div>
            <span className="text-pink-400">Fes clic sobre qualsevol ciutat per inspeccionar-la</span>
          </div>
        </div>

        {/* Right Side: Detailed Location Inspector Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="bg-slate-900 rounded-2xl border border-pink-500/40 p-6 sm:p-7 shadow-xl relative animate-in fade-in duration-200">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-pink-600/20 text-pink-400 border border-pink-500/30">
                  {selectedPoint.isHQ ? <Crown className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                </span>
                <span className="text-xs font-mono font-bold text-pink-400 uppercase tracking-wider">
                  {selectedPoint.typeLabel}
                </span>
              </div>
              {selectedPoint.isHQ && (
                <span className="px-2.5 py-0.5 rounded-md bg-pink-600 text-white text-[10px] font-bold uppercase tracking-wider">
                  Maison Central
                </span>
              )}
            </div>

            <h4 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-white mb-1">
              {selectedPoint.name}
            </h4>
            <div className="text-xs text-slate-400 mb-4 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-pink-400" />
              <span>{selectedPoint.country}</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              {selectedPoint.description}
            </p>

            <div className="space-y-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800 mb-5 text-xs">
              <div className="flex items-start gap-2.5">
                <Navigation className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Adreça / Zona VIP:</span>
                  <span className="font-semibold text-slate-100">{selectedPoint.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-850">
                <Clock className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Termini de lliurament:</span>
                  <span className="font-semibold text-pink-300 font-mono">{selectedPoint.transitTime}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-850">
                <Truck className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Transport assignat:</span>
                  <span className="font-semibold text-slate-100">{selectedPoint.equipment}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-[11px] font-bold text-pink-400 uppercase tracking-wider block mb-2">
                Serveis privats en aquesta ciutat:
              </span>
              <div className="space-y-1.5">
                {selectedPoint.facilities.map((fac, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-500 shrink-0 mt-0.5" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                if (onSelectLocationForQuote) {
                  onSelectLocationForQuote(`Encàrrec o cita privada a ${selectedPoint.name}`);
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-xl shadow-md shadow-pink-600/30 transition-all duration-150"
            >
              <span>Sol·licitar enviament o cita a {selectedPoint.city}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 block mb-2 font-medium">
              Tots els salons i destins actius:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {OPERATIONAL_POINTS.map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => setSelectedPointId(pt.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedPointId === pt.id
                      ? 'bg-pink-600 text-white font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {pt.city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
