import React, { useState } from 'react';
import {
  MapPin,
  Anchor,
  Truck,
  Ship,
  Warehouse,
  CheckCircle2,
  Clock,
  ArrowRight,
  Globe,
  Navigation,
  Compass,
  Layers
} from 'lucide-react';

export interface OperationalPoint {
  id: string;
  name: string;
  city: string;
  country: string;
  category: 'peninsula' | 'europe' | 'global';
  typeLabel: string;
  x: number; // Percentage 0-100 on SVG map
  y: number; // Percentage 0-100 on SVG map
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
    name: 'Barcelona (Quarter General & Hub Central)',
    city: 'Barcelona',
    country: 'Catalunya / Espanya',
    category: 'peninsula',
    typeLabel: 'Seu Corporativa & Hub Marítim',
    x: 62,
    y: 58,
    isHQ: true,
    location: 'Zona Franca Portuària, Sector 3 / Terminal BEST Moll Prat / ZAL',
    transitTime: '< 35 minuts des de l’atracament del vaixell',
    facilities: [
      'Magatzem duaner DDA / DA de 45.000 m²',
      'Accés directe a terminals BEST i APM Port de Barcelona',
      'Connexió ferroviària d’ample internacional UIC',
      'Despatx OEA canal verd immediat 24/7'
    ],
    equipment: 'Flota pròpia de tractors Scania Euro 6 i xassissos extensibles',
    description: 'El cor de la nostra operativa. Des d’aquí gestionem la tracció portuària contínua, la recollida de contenidors i la distribució terrestre urgent.'
  },
  {
    id: 'valencia',
    name: 'Port de València (Hub Llevant)',
    city: 'València',
    country: 'Espanya',
    category: 'peninsula',
    typeLabel: 'Terminal Marítima de Contenidors',
    x: 58,
    y: 69,
    location: 'Terminal CSP Iberian Valencia Terminal / Moll de la Xina',
    transitTime: 'Lliurament en menys de 24 hores',
    facilities: [
      'Connexió directe amb línies transoceàniques',
      'Plataforma frigorífica Reefer amb connexió elèctrica Genset',
      'Inspecció sanitària i fitosanitària ràpida'
    ],
    equipment: 'Semiremolcs refrigerats i porta-contenidors de 20’ i 40’',
    description: 'Especialitzat en tràfics transoceànics, fruita, cítrics i agroalimentari amb contenidors Reefer d’última generació.'
  },
  {
    id: 'madrid',
    name: 'Madrid (Port Sec de Coslada)',
    city: 'Madrid',
    country: 'Espanya',
    category: 'peninsula',
    typeLabel: 'Port Sec & Plataforma Intermodal',
    x: 46,
    y: 64,
    location: 'Centro de Transportes de Coslada / Terminal Intermodal',
    transitTime: 'Connexió ferroviària diària 12h / Terrestre 6h',
    facilities: [
      'Connexió ferroviària directa diària des del Port de Barcelona',
      'Dipòsit regulador de contenidors buits i plens',
      'Distribució just-in-time per a la zona centre'
    ],
    equipment: 'Llançadores de carretera i servei ferro-portuari multimodal',
    description: 'Pont logístic central que connecta el port marítim amb les plataformes industrials i de comerç electrònic de la península.'
  },
  {
    id: 'tarragona',
    name: 'Tarragona (Pol Químic & Portuari)',
    city: 'Tarragona',
    country: 'Catalunya',
    category: 'peninsula',
    typeLabel: 'Pol Químic & Granel Industrial',
    x: 59,
    y: 61,
    location: 'Port de Tarragona / Polígon Petroquímic',
    transitTime: 'Lliurament mateix dia (< 2 hores)',
    facilities: [
      'Transport autoritzat de mercaderies perilloses ADR',
      'Custòdia i manipulació especialitzada de tancs ISO',
      'Accés directe a la xarxa d’autopistes AP-7 i A-27'
    ],
    equipment: 'Caps tractors amb tallacorrents antiespurna i cisternes ADR',
    description: 'Cobertura directa per a la indústria química, matèries primeres, adobs i granels industrials.'
  },
  {
    id: 'zaragoza',
    name: 'Saragossa (Plataforma Logística PLAZA)',
    city: 'Saragossa',
    country: 'Espanya',
    category: 'peninsula',
    typeLabel: 'Hub Logístic Terrestre',
    x: 54,
    y: 53,
    location: 'PLAZA (Plataforma Logística de Zaragoza)',
    transitTime: '4 hores des de la terminal marítima',
    facilities: [
      'Node estratègic de connexió amb el corredor nord i vall de l’Ebre',
      'Cross-docking i consolidació de càrregues',
      'Terminal ferroviària de contenidors marítims'
    ],
    equipment: 'Tractors d’alta capacitat Euro 6',
    description: 'Enllaç clau per a la indústria manufacturera, paperera i d’automoció de l’eix de l’Ebre.'
  },
  {
    id: 'bilbao',
    name: 'Bilbao (Port de Bilbao & Corredor Cantàbric)',
    city: 'Bilbao',
    country: 'Espanya',
    category: 'peninsula',
    typeLabel: 'Terminal Marítima Cantàbrica',
    x: 48,
    y: 44,
    location: 'Port de Bilbao (Moll de Santurtzi)',
    transitTime: 'Lliurament en 24h',
    facilities: [
      'Connexió directa amb rutes del Mar del Nord i Regne Unit',
      'Especialistes en càrrega de projecte i gran tonatge',
      'Magatzem de trànsit autoritzat'
    ],
    equipment: 'Góndoles baixes i equips per a maquinària pesada',
    description: 'Sortida marítima cap al nord d’Europa i eix atlàntic per a la indústria siderúrgica i pesada.'
  },
  {
    id: 'algeciras',
    name: 'Algesires (Hub de l’Estret)',
    city: 'Algesires',
    country: 'Espanya',
    category: 'peninsula',
    typeLabel: 'Port de Transbord Internacional',
    x: 39,
    y: 84,
    location: 'Terminal APM Algeciras / Moll Juan Carlos I',
    transitTime: 'Connexió 24-48h',
    facilities: [
      'Pas clau de les rutes marítimes entre Àsia, Amèrica i el Mediterrani',
      'Enllaç directe Ro-Ro i contenidors amb el Nord d’Àfrica (Tànger Med)',
      'Inspecció duanera àgil canal OEA'
    ],
    equipment: 'Xassissos porta-contenidors reforçats',
    description: 'Porta d’entrada estratègica per a mercaderies intercontinentals i transbords àgils.'
  },
  {
    id: 'rotterdam',
    name: 'Rotterdam (Porta Nord d’Europa)',
    city: 'Rotterdam',
    country: 'Països Baixos',
    category: 'europe',
    typeLabel: 'Mega-Hub Portuari Europeu',
    x: 64,
    y: 22,
    location: 'Maasvlakte 2 EuroHub / Port of Rotterdam',
    transitTime: 'Connexió multimodal 48-72h',
    facilities: [
      'El port més gran d’Europa amb calat per als majors portacontenidors',
      'Connexió per barcassa fluvial pel riu Rin fins a Alemanya i Suïssa',
      'Despatx fiscal intracomunitari immediat'
    ],
    equipment: 'Feeder marítim i trens bloc de mercaderies',
    description: 'Enllaç estratègic per a la distribució cap a Alemanya, Països Baixos, Escandinàvia i Europa Central.'
  },
  {
    id: 'hamburg',
    name: 'Hamburg (Corredor Centreeuropeu & Mar Bàltic)',
    city: 'Hamburg',
    country: 'Alemanya',
    category: 'europe',
    typeLabel: 'Terminal Marítima & Fluvial',
    x: 74,
    y: 18,
    location: 'Container Terminal Altenwerder (CTA)',
    transitTime: 'Connexió regular 3-4 dies',
    facilities: [
      'Terminal altament automatitzada amb connexió ferroviària europea',
      'Enllaç directe cap als països nòrdics i Bàltics',
      'Emmagatzematge a temperatura controlada'
    ],
    equipment: 'Contenidors Dry i Reefer monitoritzats telemàticament',
    description: 'Centre neuràlgic per a exportacions catalanes cap al mercat alemany i europeu oriental.'
  },
  {
    id: 'genova',
    name: 'Gènova & Milà (Corredor Itàlia Nord)',
    city: 'Gènova',
    country: 'Itàlia',
    category: 'europe',
    typeLabel: 'Terminal Mediterrània Nord',
    x: 79,
    y: 45,
    location: 'Port de Gènova / Terminal Sech & Vado Ligure',
    transitTime: 'Autopista del Mar 24h / Carretera 18h',
    facilities: [
      'Línia Ro-Pax i Ro-Ro directa diària Barcelona - Gènova',
      'Desplegament ràpid cap al pol industrial de Llombardia (Milà)',
      'Estalvi de peatges i emissions de CO2 per via marítima'
    ],
    equipment: 'Semiremolcs de càrrega general i plataformes Ro-Ro',
    description: 'Connexió fluïda amb el nord d’Itàlia que combina el transport per carretera amb l’autopista del mar.'
  },
  {
    id: 'shanghai',
    name: 'Xangai & Ningbo (Ruta Transoceànica Àsia-Mediterrani)',
    city: 'Xangai',
    country: 'Xina / Àsia',
    category: 'global',
    typeLabel: 'Ruta Regular d’Importació FCL/LCL',
    x: 93,
    y: 42,
    location: 'Yangshan Deep-Water Port / Ningbo-Zhoushan',
    transitTime: 'Trànsit marítim directe 24-28 dies',
    facilities: [
      'Línies marítimes regulars directes cap al Port de Barcelona',
      'Control de càrrega i inspecció prèvia a l’embarcament en origen',
      'Consolidació LCL i contenidors FCL 40’ High Cube'
    ],
    equipment: 'Vaixells portacontenidors de gran capacitat (+20.000 TEUs)',
    description: 'La nostra principal línia regular de comerç exterior, connectant les fàbriques xineses directament amb els nostres camions a Barcelona.'
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
            <span>Xarxa Operativa & Cobertura Geogràfica</span>
            <span aria-hidden="true" className="text-pink-600">/</span>
            <span>TRANSAZZI</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Tots els llocs on operem
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl">
            Des del nostre quarter general al <strong>Port de Barcelona (BEST / ZAL)</strong>, cobrim les principals terminals portuàries de la Península Ibèrica, els grans hubs europeus i les rutes marítimes globals.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 self-start lg:self-auto">
          {[
            { id: 'all', label: 'Tots els Centres (11)', count: 11 },
            { id: 'peninsula', label: 'Catalunya & Península (7)', count: 7 },
            { id: 'europe', label: 'Hubs Europeus (3)', count: 3 },
            { id: 'global', label: 'Rutes Globals (1)', count: 1 }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilterCategory(filter.id as any)}
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
        {/* Left Side: Interactive Stylized Map Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-pink-950/80 p-4 sm:p-6 relative overflow-hidden shadow-inner flex flex-col justify-between min-h-[460px] sm:min-h-[520px]">
          {/* Subtle Grid Watermark Pattern */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(#ec4899 1px, transparent 1px), radial-gradient(#64748b 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 12px 12px'
            }}
          />

          {/* Top Map Badges */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span>RADAR LOGÍSTIC ACTIU</span>
            </div>
            <span className="text-pink-400">CORREDOR MEDITERRANI & TRANSATLÀNTIC</span>
          </div>

          {/* SVG Map Graphic Container */}
          <div className="relative w-full aspect-[4/3] my-auto">
            <svg
              viewBox="0 0 800 600"
              className="w-full h-full drop-shadow-md overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Glow Filter for Active Point */}
                <filter id="pink-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Linear gradient for route lines */}
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Simplified stylized land outlines for Europe & Iberian Peninsula */}
              {/* Iberian Peninsula silhouette */}
              <path
                d="M 280 340 L 350 330 L 400 350 L 440 340 L 480 370 L 490 410 L 480 440 L 440 470 L 370 480 L 320 460 L 290 430 L 270 380 Z"
                fill="#0f172a"
                stroke="#1e293b"
                strokeWidth="2"
                className="transition-colors hover:fill-slate-900"
              />

              {/* Western & Central Europe silhouette */}
              <path
                d="M 440 335 L 480 310 L 510 240 L 540 200 L 580 180 L 630 190 L 660 230 L 640 280 L 610 320 L 580 360 L 520 370 L 480 370 Z"
                fill="#0f172a"
                stroke="#1e293b"
                strokeWidth="2"
              />

              {/* Mediterranean Sea subtle shape */}
              <path
                d="M 490 410 Q 560 410 630 430 Q 700 450 780 430"
                fill="none"
                stroke="#ec4899"
                strokeWidth="1"
                strokeDasharray="4 6"
                opacity="0.25"
              />

              {/* Dynamic Connection lines from Barcelona (HQ) to all points */}
              {filteredPoints.map((point) => {
                if (point.id === 'bcn') return null;
                // Calculate coordinate transforms from 0-100 to svg 800x600
                const x1 = (bcnHQ.x / 100) * 800;
                const y1 = (bcnHQ.y / 100) * 600;
                const x2 = (point.x / 100) * 800;
                const y2 = (point.y / 100) * 600;

                const isSelected = selectedPointId === point.id;

                // Curved control point
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
                      className={isSelected ? 'animate-pulse' : ''}
                    />
                  </g>
                );
              })}

              {/* Render Nodes / Pins on SVG */}
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
                    {/* Pulsing ring for HQ or selected point */}
                    {(isHQ || isSelected) && (
                      <circle
                        cx={px}
                        cy={py}
                        r={isSelected ? 18 : 14}
                        fill="none"
                        stroke="#ec4899"
                        strokeWidth="2"
                        opacity="0.8"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer glow circle */}
                    <circle
                      cx={px}
                      cy={py}
                      r={isHQ ? 12 : isSelected ? 10 : 7}
                      fill={isHQ ? '#ec4899' : isSelected ? '#f43f5e' : '#1e293b'}
                      stroke={isSelected || isHQ ? '#ffffff' : '#ec4899'}
                      strokeWidth={isSelected || isHQ ? '2.5' : '1.5'}
                      filter={isSelected ? 'url(#pink-glow)' : ''}
                    />

                    {/* Inner Center Dot */}
                    <circle
                      cx={px}
                      cy={py}
                      r={isHQ ? 4 : isSelected ? 3.5 : 2.5}
                      fill={isHQ || isSelected ? '#ffffff' : '#ec4899'}
                    />

                    {/* Label Tag */}
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

          {/* Interactive instruction bar */}
          <div className="relative z-10 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-500 ring-2 ring-pink-300 inline-block" />
                <span>Quarter General (Barcelona)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-700 border border-pink-400 inline-block" />
                <span>Hubs / Terminals</span>
              </span>
            </div>
            <span className="text-pink-400">Fes clic sobre qualsevol punt per inspeccionar-lo</span>
          </div>
        </div>

        {/* Right Side: Detailed Location Inspector Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="bg-slate-900 rounded-2xl border border-pink-500/40 p-6 sm:p-7 shadow-xl relative animate-in fade-in duration-200">
            {/* Location Type Badge */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-pink-600/20 text-pink-400 border border-pink-500/30">
                  {selectedPoint.isHQ ? <Anchor className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                </span>
                <span className="text-xs font-mono font-bold text-pink-400 uppercase tracking-wider">
                  {selectedPoint.typeLabel}
                </span>
              </div>
              {selectedPoint.isHQ && (
                <span className="px-2.5 py-0.5 rounded-md bg-pink-600 text-white text-[10px] font-bold uppercase tracking-wider">
                  Seu Central
                </span>
              )}
            </div>

            {/* City & Name */}
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-1">
              {selectedPoint.name}
            </h4>
            <div className="text-xs text-slate-400 mb-4 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-pink-400" />
              <span>{selectedPoint.country}</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              {selectedPoint.description}
            </p>

            {/* Detailed Parameters List */}
            <div className="space-y-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800 mb-5 text-xs">
              <div className="flex items-start gap-2.5">
                <Navigation className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Ubicació física / Moll:</span>
                  <span className="font-semibold text-slate-100">{selectedPoint.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-850">
                <Clock className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Temps de trànsit / Resposta:</span>
                  <span className="font-semibold text-pink-300 font-mono">{selectedPoint.transitTime}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-850">
                <Truck className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Equips i Flota assignada:</span>
                  <span className="font-semibold text-slate-100">{selectedPoint.equipment}</span>
                </div>
              </div>
            </div>

            {/* Specific Services Available at this Point */}
            <div className="mb-6">
              <span className="text-[11px] font-bold text-pink-400 uppercase tracking-wider block mb-2">
                Instal·lacions & Avantatges Clau:
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

            {/* Action CTA for this location */}
            <button
              onClick={() => {
                if (onSelectLocationForQuote) {
                  onSelectLocationForQuote(`Operativa amb origen/destí a ${selectedPoint.name}`);
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-pink-600 hover:bg-pink-500 rounded-xl shadow-md shadow-pink-600/30 transition-all duration-150"
            >
              <span>Demanar Cotització per a {selectedPoint.city}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Location Quick Switcher List */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 block mb-2 font-medium">
              Altres punts operatius actius:
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
