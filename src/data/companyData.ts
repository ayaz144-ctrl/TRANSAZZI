export interface LogisticsProduct {
  id: string;
  name: string;
  badge: string;
  capacity: string;
  idealFor: string;
  specifications: string[];
  equipment: string;
  deliveryTime: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  image: string;
  modalities: string[];
  specs: { label: string; value: string }[];
  features: string[];
  incoterms: string[];
  typicalTransit: string;
  baseRateEstimate: string;
  products?: LogisticsProduct[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  author: {
    name: string;
    role: string;
  };
  content: string[];
  keyTakeaways: string[];
}

export interface TrackingData {
  code: string;
  origin: string;
  originPort: string;
  destination: string;
  destPort: string;
  vessel: string;
  containerId: string;
  status: 'En trànsit marítim' | 'Despatx duaner completat' | 'En preparació al port' | 'Lliurat al client';
  progress: number;
  eta: string;
  departureDate: string;
  carrier: string;
  temperature?: string;
  weight: string;
  cargoType: string;
  milestones: {
    title: string;
    location: string;
    date: string;
    completed: boolean;
    current?: boolean;
    note?: string;
  }[];
}

export const INITIAL_COMPANY_NAME = "TRANSAZZI Logistics S.L.";
export const INITIAL_COMPANY_SHORT = "TRANSAZZI";

export const OFFICE_DATA = {
  companyFormal: "TRANSAZZI Logistics S.L.",
  address: "Zona Franca Portuària, Sector 3, Carrer Principal 12",
  postalCode: "08040 Barcelona, Espanya",
  city: "Barcelona",
  phone: "+34 932 100 850",
  emailGeneral: "contacte@transazzi.com",
  emailOperations: "contacte@transazzi.com",
  emailQuotes: "contacte@transazzi.com",
  schedule: "Dilluns a Divendres de 08:00h a 19:00h",
  dispatchGuard: "Servei operatiu i tracció portuària 24/7/365",
  vatNumber: "ES-B65892104",
  oeaRegister: "ES-AEOF-2018-000491 (Operador Econòmic Autoritzat)"
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "portuari",
    number: "01",
    title: "Transport Portuari de Contenidors",
    shortDesc: "Recollida i lliurament directe de contenidors (FCL/LCL) des de les terminals portuàries cap a qualsevol punt de la península.",
    image: "/src/assets/images/service_maritime_freight_1793808594872.jpg",
    modalities: [
      "Recollida directa a terminals BEST i APM Port de Barcelona",
      "Contenidors complets FCL (20', 40' i High Cube) i grupaje LCL",
      "Connexió ràpida amb qualsevol punt de la Península Ibèrica",
      "Geolocalització satel·litari en temps real i traçabilitat contínua"
    ],
    specs: [
      { label: "Equips", value: "Tractors Scania Euro 6 & xassissos porta-contenidors" },
      { label: "Temps Resposta", value: "< 35 minuts d'atracament a terminal" },
      { label: "Seguiment", value: "Geolocalització satel·litari 24/7" },
      { label: "Cobertura", value: "Catalunya, Península Ibèrica i Corredor Mediterrani" }
    ],
    features: [
      "Retirada immediata a terminal per evitar demorres i ocupacions portuàries.",
      "Flota pròpia retolada TransAzzi amb conductors professionals formats en operativa portuària.",
      "Assegurança de mercaderies amb cobertura total durant tot el trajecte terrestre.",
      "Coordinació telemàtica directa amb l'Autoritat Portuària de Barcelona."
    ],
    incoterms: ["FOB", "CIF", "CFR", "DAP", "DDP"],
    typicalTransit: "Lliurament mateix dia en radi de 150 km",
    baseRateEstimate: "Tarifes altament competitives per viatge o contracte marc",
    products: [
      {
        id: "fcl-40hc",
        name: "Contenidor FCL 40' High Cube",
        badge: "Alta Demanda",
        capacity: "76,2 m³ / 28.500 kg màx",
        idealFor: "Grandes volums d'importació marítima asiàtica i maquinària",
        specifications: [
          "Dimensions interiors: 12,03m x 2,35m x 2,69m d'altura lliure",
          "Precintat d'alta seguretat homologat ISO/PAS 17712",
          "Retirada directa a terminals BEST i APM amb xassís porta-contenidors"
        ],
        equipment: "Cap tractor Scania Euro 6 + semiremolc extensible homologat",
        deliveryTime: "Mateix dia a Catalunya / 24-48h a la resta de la Península"
      },
      {
        id: "fcl-20dry",
        name: "Contenidor FCL 20' Dry Standard",
        badge: "Alta Densitat",
        capacity: "33,2 m³ / 21.600 kg màx",
        idealFor: "Càrregues pesades d'alta densitat, metall, matèries primeres i minerals",
        specifications: [
          "Dimensions interiors: 5,90m x 2,35m x 2,39m",
          "Xassís curt de 20 peus per a maniobrabilitat àgil en polígons estrets",
          "Descàrrega directa a moll de recepció del client"
        ],
        equipment: "Xassís de 20' amb suspensió pneumàtica",
        deliveryTime: "Lliurament garantit en menys de 24h d'atracament"
      },
      {
        id: "lcl-grupaje",
        name: "Grupaje Marítim Consolidat (LCL)",
        badge: "Econòmic / Flexible",
        capacity: "Des d'1 palet (1 m³) fins a 15 m³",
        idealFor: "PIMES i expedicions que no requereixen contenidor complet",
        specifications: [
          "Consolidació i desconsolidació a la nostra nau de Zona Franca",
          "Cost proporcional exacte segons volum i pes (w/m)",
          "Despatx duaner compartit amb estalvi administratiu"
        ],
        equipment: "Camions rígids amb plataforma elevadora a peu de carrer",
        deliveryTime: "Sortides terrestres diàries i marítimes setmanals"
      },
      {
        id: "traccio-moll",
        name: "Tracció Portuària Urgent Moll-a-Fàbrica",
        badge: "Express 24/7",
        capacity: "Contenidors 20', 40' i 45'",
        idealFor: "Línies de producció amb risc de parada industrial",
        specifications: [
          "Xofer assignat a la porta de la terminal abans que atraqui el vaixell",
          "Canal verd OEA per a sortida immediata sense retencions",
          "Seguiment GPS satel·litari en temps real amb telemetria"
        ],
        equipment: "Flota de guàrdia 24h/365 amb conductors dobles",
        deliveryTime: "< 35 minuts des de la sortida de la terminal portuària"
      }
    ]
  },
  {
    id: "emmagatzematge",
    number: "02",
    title: "Logística i Emmagatzematge",
    shortDesc: "Gestió d'emmagatzematge temporal, control d'estoc i preparació de comandes (picking & packing) en instal·lacions securitzades.",
    image: "/src/assets/images/service_warehouse_distribution_1793808595392.jpg",
    modalities: [
      "Emmagatzematge temporal i dipòsit regulador securitzat",
      "Preparació avançada de comandes (picking & packing d'alta velocitat)",
      "Control d'inventari i estoc en temps real via WMS",
      "Connexió directa amb magatzems de distribució i e-commerce"
    ],
    specs: [
      { label: "Superfície", value: "Instal·lacions securitzades a Zona Franca" },
      { label: "Seguretat", value: "CCTV 24/7, control d'accés biomètric i sistemes ESFR" },
      { label: "Sistemes", value: "SGA d'última generació amb traçabilitat per RF" },
      { label: "Règim", value: "Dipòsit Franc i simplificació duanera OEA" }
    ],
    features: [
      "Control exhaustiu de precintes i estat físic del contenidor a l'entrada i sortida.",
      "Minimització de costos de magatzematge gràcies a la planificació predictiva de viatges.",
      "Optimització de rutes per reduir la petjada d'emissions de carboni.",
      "Atenció dedicada amb gestor de compte assignat per a cada client."
    ],
    incoterms: ["EXW", "FCA", "DAP", "DDP"],
    typicalTransit: "Operativa contínua i preparació immediata",
    baseRateEstimate: "Pressupost personalitzat segons volum de palets i rotació",
    products: [
      {
        id: "diposit-aduaner",
        name: "Dipòsit Franc & Emmagatzematge Duaner (DDA/DA)",
        badge: "Avantatge Fiscal",
        capacity: "+45.000 m² de naus climatitzades a Zona Franca",
        idealFor: "Diferiment legal d'aranzels i IVA d'importació fins a la venda final",
        specifications: [
          "Instal·lacions securitzades amb CCTV 24/7 i accés biomètric",
          "Gestió documental OEA directament integrada amb la Duana",
          "Espais adaptats per a palets europeus i americans"
        ],
        equipment: "Carretons trilaterals elèctrics guiats i molls hidràulics",
        deliveryTime: "Custòdia immediata i disponibilitat permanent"
      },
      {
        id: "cross-docking",
        name: "Cross-Docking i Desconsolidació Ràpida",
        badge: "Alta Rotació",
        capacity: "Fins a 60 contenidors gestionats diàriament",
        idealFor: "Cadenes de retail, gran distribució alimentària i comerç electrònic",
        specifications: [
          "Buidat de contenidor, classificació i paletitzat en menys de 3 hores",
          "Zero costos de magatzematge perllongat",
          "Etiquetatge GS1 i expedició a destins finals sense esperes"
        ],
        equipment: "Sortidors automatitzats i terminals de radiofreqüència",
        deliveryTime: "Reexpedició el mateix dia d'arribada del contenidor"
      },
      {
        id: "picking-ecommerce",
        name: "Preparació de Comandes & Picking E-commerce",
        badge: "Alta Precisió",
        capacity: "+12.000 línies de comanda diàries",
        idealFor: "Botigues online, marques direct-to-consumer i recanvis industrials",
        specifications: [
          "Integració via API/EDI amb Shopify, WooCommerce, Magento i SAP",
          "Control d'estoc en temps real amb traçabilitat de número de sèrie i lot",
          "Embalatge corporatiu personalitzat i gestió de devolucions"
        ],
        equipment: "Sistemes Pick-to-Light i estacions de control ponderal",
        deliveryTime: "Comandes rebudes abans de les 14h expedides el mateix dia"
      },
      {
        id: "condicionament-palets",
        name: "Condicionament, Paletització & Retractilat",
        badge: "Seguretat de Càrrega",
        capacity: "Europalets (120x80) i Palets Americans (120x100)",
        idealFor: "Mercaderies que necessiten reforç o reparació d'estiba marítima",
        specifications: [
          "Flejador automàtic i plàstic retràctil d'alta resistència al trencament",
          "Reorganització de càrregues mogudes durant la travessia marítima",
          "Compliment estricte de la normativa fitosanitària NIMF-15"
        ],
        equipment: "Embolcalladores rotatives amb control de tensió digital",
        deliveryTime: "Execució immediata abans de la càrrega al camió"
      }
    ]
  },
  {
    id: "especialitzada",
    number: "03",
    title: "Transport de Càrrega Especialitzada",
    shortDesc: "Solucions per a mercaderies de gran volum, transport refrigerat i càrregues amb requeriments tècnics específics.",
    image: "/src/assets/images/service_customs_clearance_1793808595369.jpg",
    modalities: [
      "Transport de gran volumetria i pesos especials",
      "Càrrega a temperatura controlada (contenidors Reefer)",
      "Mercaderies d'alt valor amb protocol de seguretat dedicat",
      "Distribució industrial just-in-time amb requeriments tècnics"
    ],
    specs: [
      { label: "Capacitat", value: "Fins a 44 tones de massa màxima autoritzada" },
      { label: "Control", value: "Monitoratge tèrmic continu i registre digital" },
      { label: "Seguretat", value: "Sistemes de bloqueig avançat i telemetria activa" },
      { label: "Equips", value: "Plataformes extensibles i equips refrigerats" }
    ],
    features: [
      "Solucions a mida per a sectors exigents com l'agroalimentari, químic o tecnològic.",
      "Compliment rigorós de la normativa europea de transport i emissions Euro 6.",
      "Planificació de rutes especials amb autoritzacions administratives prèvies.",
      "Flexibilitat per atendre puntes d'activitat i càrregues d'urgència."
    ],
    incoterms: ["DAP", "DPU", "DDP", "FCA"],
    typicalTransit: "Programació a mida segons requeriments tècnics",
    baseRateEstimate: "Estudi tècnic i cotització directa sense compromís",
    products: [
      {
        id: "reefer-fred",
        name: "Contenidor Frigorífic Reefer (-25ºC a +25ºC)",
        badge: "Cadena de Fred",
        capacity: "Rang tèrmic garantit de -25ºC fins a +25ºC",
        idealFor: "Productes farmacèutics, carnis, peix congelat, fruita i lactis",
        specifications: [
          "Genset elèctric autònom instal·lat al camió durant tot el trajecte terrestre",
          "Monitoratge remot 24/7 amb certificat de temperatura HACCP i GDP",
          "Alarma d'obertura de portes i telemetria d'humitat i CO2"
        ],
        equipment: "Equips frigorífics Carrier & Thermo King d'última generació",
        deliveryTime: "Rutes directes sense aturades que trenquin la cadena de fred"
      },
      {
        id: "gran-volum",
        name: "Plataformes Extensibles de Gran Tonatge",
        badge: "Càrrega Especial",
        capacity: "Fins a 44 tones de MMA i llargades especials de 16 metres",
        idealFor: "Maquinària pesada, tubs d'obra civil, estructures i peces indivisibles",
        specifications: [
          "Tramitació de permisos especials amb la DGT i autoritats de trànsit",
          "Vehicle pilot i escorta viària reglamentària inclosa en el servei",
          "Estudi geomètric previ d'alçades de ponts i girs en ruta"
        ],
        equipment: "Góndoles rebaixades i semiremolcs extensibles de 3 i 4 eixos",
        deliveryTime: "Planificació i assignació d'itinerari en 48-72h"
      },
      {
        id: "quimic-adr",
        name: "Transport de Mercaderies Perilloses (ADR)",
        badge: "Homologació ADR",
        capacity: "Mercaderies perilloses Classes 2, 3, 4, 5, 6, 8 i 9",
        idealFor: "Indústria química, dissolvents, bateries de liti i pintures",
        specifications: [
          "Xofers amb carnet ADR homologat i formació en contenció de vessaments",
          "Extintors d'alta capacitat i plaques reflectants taronja reglamentàries",
          "Assessor de seguretat químic intern assignat a cada ordre de transport"
        ],
        equipment: "Tractors Scania amb tallacorrents antiespurna i caixes estanques",
        deliveryTime: "Circulació per xarxa d'itineraris de mercaderies perilloses (RIMP)"
      },
      {
        id: "alt-valor",
        name: "Transport de Càrrega d'Alt Valor amb Seguretat",
        badge: "Màxima Seguretat",
        capacity: "Assegurança a tot risc fins a 2.000.000 € per expedició",
        idealFor: "Dispositius electrònics, equips mèdics i components aeroespacials",
        specifications: [
          "Doble localitzador GPS satel·litari ocult amb canal autònom",
          "Tancament electrònic d'alta seguretat amb obertura remota des de centraleta",
          "Rutes nocturnes directes amb aturada en àrees de servei monitoritzades"
        ],
        equipment: "Semiremolcs blindats amb suspensió pneumàtica antivibració",
        deliveryTime: "Lliurament sincronitzat en franja exacta de 15 minuts"
      }
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "tendencies-logistica-2026",
    title: "Tendències en la logística portuària per al 2026",
    slug: "tendencies-logistica-portuaria-2026",
    date: "Novembre de 2026",
    readTime: "4 min de lectura",
    category: "Logística Portuària",
    summary: "Descobreix com la tecnologia i la sostenibilitat estan transformant el transport de contenidors global.",
    author: {
      name: "Equip Operatiu TransAzzi",
      role: "Especialistes en Trànsit Portuari"
    },
    keyTakeaways: [
      "Digitalització completa de les terminals amb sistemes d'accés automatitzat per a camions.",
      "Adopció creixent de vehicles de baixes emissions per al transport d'última milla portuària.",
      "Integració IoT per a la monitorització de contenidors en temps real.",
      "Importància de l'eficiència en els temps de descàrrega per evitar costos de demorres."
    ],
    content: [
      "El transport de contenidors als principals ports viu una transformació sense precedents impulsada per la digitalització i la sostenibilitat.",
      "A TransAzzi integrem eines telemàtiques que connecten la nostra flota directament amb els sistemes de les terminals del Port de Barcelona, agilitzant els accessos i garantint que cada contenidor es carregui i surti en temps rècord.",
      "L'aposta per motors d'alta eficiència Euro 6 i la planificació intel·ligent de rutes permet reduir la petjada ambiental de cada viatge, assegurant un servei ràpid, segur i respectuós amb els objectius europeus de descarbonització."
    ]
  },
  {
    id: "optimitzar-temps-lliurament",
    title: "Com optimitzar els temps de lliurament en el transport terrestre",
    slug: "optimitzar-temps-lliurament-transport-terrestre",
    date: "Octubre de 2026",
    readTime: "5 min de lectura",
    category: "Transport Terrestre",
    summary: "Claus i bones pràctiques per a una gestió eficient de les rutes de distribució.",
    author: {
      name: "Departament de Flota TransAzzi",
      role: "Coordinació de Trànsits Terrestres"
    },
    keyTakeaways: [
      "Planificació anticipada de finestres de descàrrega a les instal·lacions del receptor.",
      "Coordinació amb els horaris d'obertura de portes a les terminals marítimes.",
      "Ús de xassissos dedicats que permeten deixar el contenidor i recuperar el cap tractor.",
      "Comunicació transparent i actualitzacions d'estat automàtiques per al client."
    ],
    content: [
      "En el transport terrestre de contenidors, cada minut compta per mantenir la cadena de subministrament fluida i competitiva.",
      "La sincronització precisa entre l'atracament del vaixell i la posició del camió evita costos imprevistos de demorres i permet que les fàbriques i centres de distribució rebin la seva càrrega exactament quan la necessiten.",
      "Mitjançant el seguiment GPS de la flota TransAzzi, oferim als nostres clients una visibilitat completa del trajecte, assegurant que qualsevol incidència a la carretera es resolgui proactivament."
    ]
  }
];

export const TRACKING_DATABASE: Record<string, TrackingData> = {
  "BCN-98234": {
    code: "BCN-98234",
    origin: "Xangai (Xina)",
    originPort: "Port de Shanghai",
    destination: "Barcelona (Espanya)",
    destPort: "Terminal BEST - Port de Barcelona",
    vessel: "MSC Gülsün",
    containerId: "MEDU7482910 (40' High Cube)",
    status: "En trànsit marítim",
    progress: 72,
    eta: "14 Nov 2026, 06:30 CET",
    departureDate: "24 Oct 2026",
    carrier: "Mediterranean Shipping Company (MSC)",
    temperature: "Ambient (Dry)",
    weight: "22.450 kg",
    cargoType: "Components d'automoció i electrònica",
    milestones: [
      {
        title: "Càrrega a bord del vaixell",
        location: "Port de Shanghai",
        date: "24 Oct 2026 - 04:30",
        completed: true
      },
      {
        title: "Escala intermèdia",
        location: "Port de Singapur",
        date: "31 Oct 2026 - 11:15",
        completed: true
      },
      {
        title: "Entrada al Mediterrani",
        location: "Estret de Sicília",
        date: "04 Nov 2026 - Actualitat",
        completed: true,
        current: true,
        note: "Tracció TransAzzi assignada al Port de Barcelona per a recollida immediata."
      },
      {
        title: "Descàrrega i transport portuari TransAzzi",
        location: "Terminal BEST - Port de Barcelona",
        date: "14 Nov 2026 (Previsió)",
        completed: false
      }
    ]
  },
  "MED-44102": {
    code: "MED-44102",
    origin: "Port de València (Espanya)",
    originPort: "Terminal CSP Valencia",
    destination: "Hamburg (Alemanya)",
    destPort: "Terminal Altenwerder",
    vessel: "Maersk Mc-Kinney Moller",
    containerId: "MSKU9012384 (20' Reefer)",
    status: "Despatx duaner completat",
    progress: 90,
    eta: "07 Nov 2026, 14:00 CET",
    departureDate: "28 Oct 2026",
    carrier: "Maersk Line",
    temperature: "+4.0 ºC (Monitoritzat)",
    weight: "18.300 kg",
    cargoType: "Productes agroalimentaris frescos",
    milestones: [
      {
        title: "Recollida en origen per flota TransAzzi",
        location: "València",
        date: "27 Oct 2026 - 09:00",
        completed: true
      },
      {
        title: "Sortida marítima",
        location: "Port de València",
        date: "28 Oct 2026 - 22:30",
        completed: true
      },
      {
        title: "Arribada a destinació i transport final",
        location: "Hamburg",
        date: "07 Nov 2026 (Previsió)",
        completed: false
      }
    ]
  }
};

export const LEGAL_TEXTS = {
  avisLegal: {
    title: "Avís Legal",
    lastUpdated: "2026",
    sections: [
      {
        heading: "1. Dades identificatives",
        body: "En compliment de la normativa vigent, s'informa que aquest lloc web correspon a TRANSAZZI Logistics S.L., amb seu a Zona Franca Portuària, Sector 3, Carrer Principal 12, 08040 Barcelona, Espanya. Correu de contacte: contacte@transazzi.com. Telèfon: +34 932 100 850."
      },
      {
        heading: "2. Condicions d'ús",
        body: "L'accés i navegació per aquest lloc web atribueix la condició d'usuari i implica l'acceptació plena de totes les disposicions incloses en aquest Avís Legal."
      },
      {
        heading: "3. Propietat intel·lectual",
        body: "Tots els continguts, dissenys, logotips i marques pertanyen a TRANSAZZI Logistics S.L. o als seus legítims titulars."
      }
    ]
  },
  privacitat: {
    title: "Política de Privacitat",
    lastUpdated: "2026",
    sections: [
      {
        heading: "1. Responsable del tractament",
        body: "El responsable del tractament de les dades és TRANSAZZI Logistics S.L., amb domicili a Zona Franca Portuària, Sector 3, Carrer Principal 12, 08040 Barcelona, Espanya. Correu: contacte@transazzi.com."
      },
      {
        heading: "2. Finalitat del tractament",
        body: "Les dades recollides mitjançant el formulari de contacte s'utilitzen exclusivament per atendre les consultes rebudes i preparar cotitzacions de transport personalitzades."
      },
      {
        heading: "3. Drets de l'usuari",
        body: "L'usuari pot exercir els drets d'accés, rectificació, supressió i oposició enviant un correu electrònic a contacte@transazzi.com."
      }
    ]
  },
  cookies: {
    title: "Política de Cookies",
    lastUpdated: "2026",
    sections: [
      {
        heading: "1. Ús de Cookies",
        body: "Aquest lloc web utilitza cookies tècniques per garantir el funcionament correcte de la navegació i oferir una experiència de transport òptima a l'usuari."
      }
    ]
  },
  certificacions: {
    title: "Certificacions i Qualitat",
    lastUpdated: "2026",
    sections: [
      {
        heading: "Operador Econòmic Autoritzat (OEA)",
        body: "Acreditació oficial de màxima seguretat i agilitat en tràmits de transport i comerç internacional."
      }
    ]
  }
};
