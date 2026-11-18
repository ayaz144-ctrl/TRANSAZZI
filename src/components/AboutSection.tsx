import React from 'react';
import { Shield, Award, Navigation, Users, MapPin, CheckCircle } from 'lucide-react';
import { OperationsMap } from './OperationsMap';

interface AboutSectionProps {
  companyName: string;
  onSelectLocationForQuote?: (locationName: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  companyName,
  onSelectLocationForQuote
}) => {
  const hubs = [
    {
      city: 'Barcelona (Hub Central)',
      location: 'ZAL Port de Barcelona & Moll Prat',
      desc: 'Quarter general operatiu, magatzem duaner DDA de 45.000 m² i connexió directa amb la terminal de contenidors BEST.',
      features: ['Connexió ferroviària UIC', 'Servei de guàrdia 24/7', 'Oficina OEA integrada']
    },
    {
      city: 'València (Hub Llevant)',
      location: 'Port de València - Terminal CSP',
      desc: 'Plataforma especialitzada en tràfics transoceànics, cítrics i agroalimentari amb contenidors Reefer d’última generació.',
      features: ['Inspecció fitosanitària ràpida', 'Trànsits directes Amèrica', 'Cross-docking refrigerat']
    },
    {
      city: 'Rotterdam (Porta Nord d’Europa)',
      location: 'Maasvlakte 2 EuroHub',
      desc: 'Enllaç estratègic per a la distribució cap a Alemanya, Països Baixos, Escandinàvia i Europa Central per via fluvial i tren.',
      features: ['Barge & Rail feeders', 'Despatx fiscal intracomunitari', 'Emmagatzematge ADR']
    }
  ];

  const values = [
    {
      title: 'Solvència i Seguretat OEA',
      desc: 'Com a Operador Econòmic Autoritzat reconegut per la Unió Europea, garantim la màxima agilitat duanera i rigor en cada tràmit.',
      icon: Shield
    },
    {
      title: 'Traçabilitat Satel·litari 24/7',
      desc: 'Visibilitat punta a punta mitjançant telemetria IoT en contenidors i connexió directe telemàtica amb autoritats portuàries.',
      icon: Navigation
    },
    {
      title: 'Compromís Mediambiental',
      desc: 'Prioritzem rutes multimodals ferro-marítimes per reduir un 40% la petjada de carboni en compliment de la normativa IMO 2030.',
      icon: Award
    },
    {
      title: 'Equip Expert Multilingüe',
      desc: 'Consignataris, transitaris col·legiats i agents de duana propis amb més de 25 anys d’experiència en dret de comerç internacional.',
      icon: Users
    }
  ];

  return (
    <section id="qui-som" className="py-20 bg-white border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 mb-2">
            <span>Trajectòria & Flota Pròpia</span>
            <span aria-hidden="true" className="text-pink-300">/</span>
            <span>Qui Som</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Liderant la logística portuària
          </h2>
          <div className="mt-4 space-y-3 text-base text-slate-600 leading-relaxed">
            <p>
              A <strong className="font-semibold text-slate-900">TRANSAZZI</strong> som especialistes en solucions de transport marítim i terrestre. Amb una flota moderna i un equip altament qualificat, garantim que la teva mercaderia arribi sempre a temps i en perfectes condicions.
            </p>
            <p>
              La nostra missió és optimitzar la cadena de subministrament dels nostres clients mitjançant la transparència, la puntualitat i la màxima eficiència operativa.
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
                className="bg-pink-50/40 rounded-xl p-6 border border-pink-100 hover:border-pink-300 hover:shadow-md hover:shadow-pink-100/50 transition-all text-left"
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

        {/* Interactive Strategic Operations Map showing all locations where TRANSAZZI operates */}
        <div className="mb-14">
          <OperationsMap onSelectLocationForQuote={onSelectLocationForQuote} />
        </div>

        {/* Fleet Showcase Highlight with Pink Styling */}
        <div className="rounded-2xl bg-slate-950 text-white p-6 sm:p-8 lg:p-10 border border-pink-900/40 shadow-xl">

          {/* Fleet Showcase Highlight with Pink Styling */}
          <div className="mt-8 pt-8 border-t border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 rounded-xl overflow-hidden border border-pink-600/40 shadow-lg">
              <img
                src="/assets/aistudio/Gemini_Generated_Image_hbvtdohbvtdohbvt_3b587e18.jpg"
                alt="Flota de camions i contenidors TransAzzi al moll de descàrrega portuària"
                className="w-full h-56 sm:h-64 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:col-span-5 text-left">
              <span className="text-[11px] font-mono font-bold text-pink-400 uppercase tracking-wider block mb-1">
                Flota Pròpia TransAzzi
              </span>
              <h4 className="text-lg font-bold text-white mb-2">
                Tracció Portuària i Transport Terrestre Dedicat
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Disposem de caps tractors Euro 6 i xassissos porta-contenidors propis amb la retolació corporativa TransAzzi, garantint el transport immediat del contenidor des de la grua portuària fins a la fàbrica o magatzem del client sense intermediaris.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-pink-400" />
                  Traçabilitat GPS per satèl·lit
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-pink-400" />
                  Lliurament just-in-time
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
