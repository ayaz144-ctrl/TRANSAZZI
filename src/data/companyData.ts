export interface LogisticsProduct {
  id: string;
  name: string;
  badge: string;
  capacity: string; // Price & Available Sizes
  idealFor: string;
  specifications: string[];
  equipment: string; // Luxury Fabric / Origin
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
  incoterms: string[]; // Sizes / Tailoring standards
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

export const INITIAL_COMPANY_NAME = "TRANSAZZI Maison S.L.";
export const INITIAL_COMPANY_SHORT = "TRANSAZZI";

export const OFFICE_DATA = {
  companyFormal: "TRANSAZZI Alta Costura & Sastreria S.L.",
  address: "Passeig de Gràcia 84, Principal / Atelier Privé",
  postalCode: "08008 Barcelona, Espanya",
  city: "Barcelona",
  phone: "+34 932 100 850",
  emailGeneral: "atelier@transazzi.com",
  emailOperations: "concierge@transazzi.com",
  emailQuotes: "comandes@transazzi.com",
  schedule: "Dilluns a Dissabte de 10:00h a 20:30h",
  dispatchGuard: "Enviament VIP en porta-trajes sense arrugues 24/48h",
  vatNumber: "ES-B65892104",
  oeaRegister: "Teixits Italians Loro Piana / Biella & Seda Mulberry 22 Momme"
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "vestits",
    number: "01",
    title: "Vestits d'Alta Costura & Gala",
    shortDesc: "Vestits llargs de seda natural, patrons arquitectònics i blazers de caixmir per a dones que busquen distinció discreta i elegància atemporal.",
    image: "/assets/fashion/luxury_dresses.jpg",
    modalities: [
      "Seda Mulberry 100% de caiguda líquida i crepè de seda francès",
      "Patronatge d'atelier tallat al biaix perquè estilitzi sense marcar",
      "Enviament penjat en funda de cotó transpirable sense cap arruga",
      "Arranjaments a mida inclosos o talla exacta de la 34 a la 46 (XS–XL)"
    ],
    specs: [
      { label: "Talles", value: "34 a 46 (XS–XL) i Confecció a Mida" },
      { label: "Enviament", value: "Guant Blanc 24h en porta-vestits de lli" },
      { label: "Teixits", value: "Seda Mulberry 22 Momme & Caixmir" },
      { label: "Garantia", value: "Canvi o recollida VIP gratuïta en 30 dies" }
    ],
    features: [
      "Cada vestit s'entrega vaporitzat en una funda protectora de cotó orgànic amb perxa de fusta de cedre.",
      "Acabats interiors amb costures franceses invisibles i folre de seda pura.",
      "Servei de modista privada en línia per ajustar el baix abans de l'enviament.",
      "Presentació en caixa rígida marfil i llaç de setí rosa empolsat."
    ],
    incoterms: ["34 (XS)", "36 (S)", "38 (M)", "40 (L)", "42 (XL)", "A Mida"],
    typicalTransit: "Entrega VIP en 24h a domicili o hotel",
    baseRateEstimate: "Peces des de 295 € fins a 580 € (enviament VIP inclòs)",
    products: [
      {
        id: "vestit-seda-marfil",
        name: "Vestit Llarg Seda Satinada Champagne & Marfil",
        badge: "Edició Atelier",
        capacity: "490,00 € · Talles 34 - 44",
        idealFor: "Gales, casaments de tarda, òpera i recepcions exclusives",
        specifications: [
          "Escot creuat artesanal amb esquena fluida i caiguda fins a terra",
          "Tall al biaix amb doble capa de seda perquè mai no transparenti",
          "Inclòs porta-vestits de viatge transpirable i perxa de fusta nobles"
        ],
        equipment: "100% Seda Mulberry Italiana 22 Momme (Como, Itàlia)",
        deliveryTime: "Enviament Guant Blanc 24h"
      },
      {
        id: "blazer-cashmere-rosa",
        name: "Blazer Sastreria Rosa Empolsat & Marfil Cashmere",
        badge: "Old Money",
        capacity: "420,00 € · Talles XS - XL",
        idealFor: "Reunions executives, clubs privats, sopars d'estiu i viatges",
        specifications: [
          "Botons de banya natural polida a mà i traus funcionals a les mànigues",
          "Folre interior de cupro Bemberg en to marfil sedós",
          "Estructura lleugera napolitana que s'adapta a les espatlles"
        ],
        equipment: "85% Llana Verge Merino / 15% Cashmere (Biella)",
        deliveryTime: "Enviament Express 24h"
      },
      {
        id: "vestit-cocktail-noir",
        name: "Vestit Cocktail Mid-Length Crepè de Seda",
        badge: "Més Desitjat",
        capacity: "365,00 € · Talles 34 - 44",
        idealFor: "Esdeveniments de dia, còctels al jardí i nits elegants",
        specifications: [
          "Silueta rellotge de sorra amb pinces esculturals a la cintura",
          "Cremallera posterior oculta de llautó daurat mat",
          "Lliurat vaporitzat i perfumat amb notes d'iris blanc"
        ],
        equipment: "Crepè pesat de seda i acetat noble francès",
        deliveryTime: "Enviament Express 24h"
      },
      {
        id: "abric-doubleface",
        name: "Abric Batí Double-Face Llana & Cashmere",
        badge: "Peca Icònica",
        capacity: "580,00 € · Talles XS - XL",
        idealFor: "Viatges a Ginebra, París o Londres amb màxima calidesa i lleugeresa",
        specifications: [
          "Confeccionat íntegrament a mà amb costures invisibles sense folre",
          "Cinturó llarg estil robe amb solapes amples elegants",
          "Capelina protectora i raspall de cura per a caixmir inclosos"
        ],
        equipment: "100% Double-Face Cashmere & Llana Verge Australiana",
        deliveryTime: "Enviament VIP 24/48h"
      }
    ]
  },
  {
    id: "sastreria",
    number: "02",
    title: "Sastreria de Luxe Home i Dona",
    shortDesc: "Trajes creuats i rectes per a home i dona tallats amb llanes italianes Super 150s, botons daurats o de nacre i caiguda impecable.",
    image: "/assets/fashion/luxury_suits.jpg",
    modalities: [
      "Trajes d'home i dona confeccionats en llana Super 150s i fil de seda",
      "Entretela completa de crinera de cavall per a una estructura eterna",
      "Camises de cotó egipci double-twisted i corbates de seda jacquard",
      "Enviament en porta-trajes rígid perquè arribi llest per vestir"
    ],
    specs: [
      { label: "Teixits", value: "Llana Super 150s, Cashmere & Lli d'Irlanda" },
      { label: "Tallatge", value: "Home (46–58) · Dona (34–46) · Bespoke" },
      { label: "Acabats", value: "Botons banya/daurats i costures a mà" },
      { label: "Origen", value: "Filatura Biella (Itàlia) & Patronatge BCN" }
    ],
    features: [
      "Servei conjunt de sastreria masculina i femenina ideal per a parelles i directius.",
      "Butxaques interiors portabitllets, repunt pick-stitch artesanal a les solapes.",
      "Pantalons de doble pinça amb ajustadors laterals metàl·lics sense necessitat de cinturó.",
      "Assessorament privat de mesures per videotrucada o al showroom de Passeig de Gràcia."
    ],
    incoterms: ["Home 46–56", "Dona 34–44", "Doble Pinça", "Bespoke"],
    typicalTransit: "En estoc: 24h · A mida: 10 dies laborables",
    baseRateEstimate: "Trajes complets des de 540 € fins a 920 €",
    products: [
      {
        id: "traje-creuat-navy-home",
        name: "Traje Creuat Home Llana Super 150s Blau Marí",
        badge: "Sastreria Home",
        capacity: "790,00 € · Talles 46 - 58",
        idealFor: "Consells d'administració, gales, clubs nàutics i cerimònies",
        specifications: [
          "Americana creuada de 6 botons daurats amb solapa en punta de llança",
          "Pantaló de tir alt amb doble pinça i cenyidors laterals",
          "Inclou funda rígida de viatge i perxa anatòmica de noguera"
        ],
        equipment: "100% Llana Verge Merino Super 150s (Vitale Barberis)",
        deliveryTime: "Enviament Porta-Trajes 24h"
      },
      {
        id: "traje-marfil-dona",
        name: "Traje Sastre Dona Blanc Trencat & Seda",
        badge: "Sastreria Dona",
        capacity: "640,00 € · Talles 34 - 44",
        idealFor: "Directives, esdeveniments de dia i vestimenta de luxe diürn",
        specifications: [
          "Jaqueta recta entallada amb folre interior de seda to xampany",
          "Pantaló fluid de ratlla diplomàtica planxada i caiguda ampla",
          "Botons folrats al to i punys oberts tipus sastreria"
        ],
        equipment: "Mescla de Llana Freda i Seda Tussah Italiana",
        deliveryTime: "Enviament Express 24h"
      },
      {
        id: "traje-gris-marengo-home",
        name: "Traje Clàssic Home Gris Marengo & Tres Peces",
        badge: "Clàssic Etern",
        capacity: "840,00 € · Talles 46 - 58",
        idealFor: "Etiqueta formal, despatxos jurídics i ocasions d'alta etiqueta",
        specifications: [
          "Inclou americana, armilla creuada i pantaló de tall recte impecable",
          "Construcció full-canvas que s'adapta al cos amb cada ús",
          "Cura professional inclosa amb bossa guarda-pols de lli"
        ],
        equipment: "Llana Super 150s amb tacte de caixmir (Biella)",
        deliveryTime: "Enviament en 24/48h"
      },
      {
        id: "camisa-coton-egipci",
        name: "Pack Camisa Cotó Egipci Giza 45 & Corbata Seda",
        badge: "Esencial Luxe",
        capacity: "245,00 € · Talles S - XXL",
        idealFor: "Completar qualsevol traje d'home o conjunt de sastreria",
        specifications: [
          "Botons australians de nacre gruixuda cosits en punt de gall",
          "Coll italià rígid que manté la forma amb corbata o sense",
          "Corbata de seda sete-plecs cosida a mà inclosa"
        ],
        equipment: "100% Cotó Egipci Giza 45 Double-Twisted & Seda Como",
        deliveryTime: "Enviament Express 24h"
      }
    ]
  },
  {
    id: "complements",
    number: "03",
    title: "Marroquineria, Seda & Caixa VIP",
    shortDesc: "Bosses estructurades de pell italiana, mocadors de caixmir i seda, ulleres de carei i caixes regal d'alta etiqueta preparades per fascinar.",
    image: "/assets/fashion/luxury_accessories.jpg",
    modalities: [
      "Pell de vedell plena flor italiana curtida sense metalls pesants",
      "Ferratges banyats en or xampany de 18 quilats resistents al desgast",
      "Embalatge de regal Maison TRANSAZZI en paper de seda rosa i caixa rígida",
      "Servei d'enviament directe per a clients privats i showrooms internacionals"
    ],
    specs: [
      { label: "Materials", value: "Pell Plena Flor, Caixmir & Acetat Mazzucchelli" },
      { label: "Ferratges", value: "Llautó massís banyat en Or Xampany" },
      { label: "Presentació", value: "Cofre Marfil i Rosa amb Targeta Cal·ligràfica" },
      { label: "Enviament", value: "Missatgeria Privada 24h / Europa 48h" }
    ],
    features: [
      "Cada bossa s'entrega amb certificat d'autenticitat numerat i guarda-pols de franel·la.",
      "Possibilitat d'inicials gravades en pa d'or sota comanda.",
      "Enviament assegurat a tot risc fins al lliurament en mà.",
      "Ideal per a regals corporatius d'alt nivell o aixovar de cerimònia."
    ],
    incoterms: ["Única", "Mida Mini", "Mida Atelier", "Cofre VIP"],
    typicalTransit: "Lliurament en 24h a Catalunya/Espanya · 48h Europa",
    baseRateEstimate: "Complements des de 195 € fins a 1.150 €",
    products: [
      {
        id: "bossa-atelier-rosa",
        name: "Bossa Estructurada Pell de Vedell Rosa Empolsat",
        badge: "Maison Signature",
        capacity: "690,00 € · Mida 26cm",
        idealFor: "Acompanyar vestits de còctel o looks de sastreria diürna",
        specifications: [
          "Tancament arquitectònic banyat en or xampany i interior de pell napa",
          "Cosida punt per punt amb fil encerat de lli francès",
          "Corretja bandolera desmuntable i peus metàl·lics protectors"
        ],
        equipment: "Pell de vedell granejat italiana plena flor",
        deliveryTime: "Enviament Assegurat 24h"
      },
      {
        id: "foulard-cashmere-seda",
        name: "Xal & Mocador de Cashmere i Seda de Mongòlia",
        badge: "Tacte Sublim",
        capacity: "230,00 € · 200 × 70 cm",
        idealFor: "Viatges en primera classe, nits fresques i estil old money",
        specifications: [
          "Vores repuntades a mà i serrells retorçats artesanalment",
          "To marfil càlid combinat amb caixmir pentinat ultralleuger",
          "Presentat en caixa rígida Maison amb llaç de grosgrain"
        ],
        equipment: "70% Cashmere Pur de Mongòlia / 30% Seda Mulberry",
        deliveryTime: "Enviament Express 24h"
      },
      {
        id: "ulleres-carei-daurades",
        name: "Ulleres de Sol Acetat Carei Clàssic & Or",
        badge: "Artesania",
        capacity: "215,00 € · Talla Estàndard",
        idealFor: "Estil Riviera clàssic amb màxima protecció òptica",
        specifications: [
          "Frontisses de cinc barrils reblonades a mà i ànima metàl·lica visible",
          "Vidres minerals Barberini antireflectants UV400",
          "Estoig de pell cognac i camussa de seda inclosos"
        ],
        equipment: "Acetat Mazzucchelli italià polit 72 hores a mà",
        deliveryTime: "Enviament 24h"
      },
      {
        id: "cofre-vip-sastreria",
        name: "Cofre Exclusiu Gala: Vestit o Traje + Bossa / Complements",
        badge: "Experiència VIP",
        capacity: "1.190,00 € · A mida del client",
        idealFor: "Esdeveniments especials, regals d'alt standing o vestuari complet",
        specifications: [
          "Inclou 1 peça principal d'alta costura o sastreria + 2 complements",
          "Entrega privada en baül protector amb nota cal·ligràfica",
          "Assessoria d'estilisme personalitzada inclosa per WhatsApp o presencial"
        ],
        equipment: "Selecció completa de l'Atelier TRANSAZZI 2026",
        deliveryTime: "Entrega VIP Garantida 24h"
      }
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "secret-sastreria-super150",
    title: "Per què un traje en llana Super 150s canvia la teva presència",
    slug: "secret-sastreria-super150",
    date: "Novembre de 2026",
    readTime: "4 min de lectura",
    category: "Sastreria & Old Money",
    summary: "Descobreix la diferència entre la confecció industrial i els trajes de filatura italiana amb entretela completa i botons de banya natural.",
    author: {
      name: "Mestre Sastre TransAzzi",
      role: "Direcció de Sastreria i Patronatge"
    },
    keyTakeaways: [
      "La llana Super 150s recupera la seva forma sense arrugar-se després d'un vol o reunió.",
      "L'entretela flotant permet que l'americana respiri i s'emmotlli al teu pit.",
      "Els colors Blau Marí, Marfil i Gris Marengo són el pilar de l'elegància discreta.",
      "Enviament en porta-trajes rígid perquè l'estrenis tal com surt de l'atelier."
    ],
    content: [
      "L'autèntic luxe mai no necessita logotips cridaners: es reconeix a primera vista per la caiguda d'una solapa, la brillantor subtil de la llana verge i la precisió d'un bon tall a les espatlles.",
      "A TRANSAZZI treballem exclusivament amb teixits filats a Biella (Itàlia) i patrons equilibrats tant per a sastreria masculina com femenina. Les nostres americanes creuades i pantalons de doble pinça ofereixen un confort sorprenent durant tota la jornada.",
      "Quan enviem qualsevol traje o vestit llarg, ho fem en porta-trajes rígids climatitzats perquè només hagis d'obrir la funda i vestir-te per a la teva cita o esdeveniment."
    ]
  },
  {
    id: "seda-mulberry-enviaments-vip",
    title: "Seda Mulberry i Cashmere: com viatgen els vestits sense arrugues",
    slug: "seda-mulberry-enviaments-vip",
    date: "Octubre de 2026",
    readTime: "3 min de lectura",
    category: "Atelier & Qualitat",
    summary: "Així preparem i transportem els vestits de gala i les peces de caixmir des de Passeig de Gràcia fins al teu domicili arreu d'Europa.",
    author: {
      name: "Departament Concierge TransAzzi",
      role: "Experiència Boutique & Lliuraments"
    },
    keyTakeaways: [
      "Seda de 22 Momme: major densitat, caiguda líquida i tacte sedós incomparable.",
      "Vaporitzat previ amb aigua desmineralitzada abans d'entrar al porta-vestits.",
      "Funda de cotó transpirable i perxa de cedre aromàtica incloses a cada comanda.",
      "Traçabilitat en directe al portal /tracking fins al lliurament en mà."
    ],
    content: [
      "Comprar un vestit de cerimònia o una americana de caixmir a distància exigeix una confiança absoluta en cada detall del procés, des del tipus de costura fins a l'arribada a casa.",
      "Al nostre atelier de Barcelona revisem cada peça peça per peça, la planxem amb vapor suau i la col·loquem dins caixes rígides marfil o porta-vestits verticals segons la delicadesa del teixit.",
      "Amb el nostre portal de seguiment en línia coneixes la ubicació exacta del teu paquet en tot moment, garantint un servei de guant blanc a l'alçada de cada peça."
    ]
  }
];

export const TRACKING_DATABASE: Record<string, TrackingData> = {
  "BCN-98234": {
    code: "BCN-98234",
    origin: "Atelier Passeig de Gràcia (Barcelona)",
    originPort: "Maison TRANSAZZI - Barcelona",
    destination: "Madrid · Barri de Salamanca",
    destPort: "Lliurament Concierge Privé Madrid",
    vessel: "Flota Privada TRANSAZZI #08",
    containerId: "PORTA-TRAJES RÍGID VIP (Traje & Vestit)",
    status: "En trànsit marítim",
    progress: 75,
    eta: "Demà abans de les 12:00h",
    departureDate: "Avui, 08:30h",
    carrier: "Servei Guant Blanc TRANSAZZI",
    temperature: "Climatitzat · Peces Penjades",
    weight: "3,4 kg",
    cargoType: "Vestit Seda Marfil 22 Momme & Traje Creuat Super 150s",
    milestones: [
      {
        title: "Revisió d'atelier i vaporitzat artesanal",
        location: "Passeig de Gràcia 84, Barcelona",
        date: "Avui - 07:45",
        completed: true
      },
      {
        title: "Sortida en porta-trajes rígid amb perxa de cedre",
        location: "Barcelona Flagship",
        date: "Avui - 08:30",
        completed: true
      },
      {
        title: "En ruta directe cap a Madrid",
        location: "Corredor Barcelona → Madrid",
        date: "En curs",
        completed: true,
        current: true,
        note: "Transport climatitzat vertical sense plegats."
      },
      {
        title: "Lliurament en mà al domicili del client",
        location: "Barri de Salamanca, Madrid",
        date: "Demà (10:00h - 12:00h)",
        completed: false
      }
    ]
  },
  "MED-44102": {
    code: "MED-44102",
    origin: "Atelier Central Barcelona",
    originPort: "Passeig de Gràcia / Hub BCN",
    destination: "València · Carrer de Colón",
    destPort: "Showroom Eixample - València",
    vessel: "Vehicle Boutique TRANSAZZI #14",
    containerId: "COFRE GALA VIP (4 Peces)",
    status: "Despatx duaner completat",
    progress: 92,
    eta: "Avui, 17:30h",
    departureDate: "Ahir, 18:00h",
    carrier: "TRANSAZZI Maison Concierge",
    temperature: "Protecció Seda & Cuir",
    weight: "5,1 kg",
    cargoType: "Traje Sastre Dona Marfil, Bossa Pell Rosa & Blazer Cashmere",
    milestones: [
      {
        title: "Selecció i embolcall en seda rosa",
        location: "Atelier Barcelona",
        date: "Ahir - 16:30",
        completed: true
      },
      {
        title: "Sortida verificada cap a Llevant",
        location: "Barcelona Hub",
        date: "Ahir - 18:00",
        completed: true
      },
      {
        title: "En repartiment prioritari",
        location: "València Centre",
        date: "Avui (Previsió 17:30h)",
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
        body: "En compliment de la normativa vigent, s'informa que aquest lloc web correspon a TRANSAZZI Alta Costura & Sastreria S.L., amb seu a Passeig de Gràcia 84, Barcelona, Espanya. Correu: atelier@transazzi.com. Telèfon: +34 932 100 850."
      },
      {
        heading: "2. Condicions d'ús",
        body: "L'accés i navegació per aquest lloc web atribueix la condició d'usuari i implica l'acceptació de totes les disposicions incloses en aquest Avís Legal."
      },
      {
        heading: "3. Propietat intel·lectual",
        body: "Tots els patrons d'alta costura, peces de sastreria, fotografies i marques pertanyen a TRANSAZZI Alta Costura & Sastreria S.L."
      }
    ]
  },
  privacitat: {
    title: "Política de Privacitat",
    lastUpdated: "2026",
    sections: [
      {
        heading: "1. Responsable del tractament",
        body: "El responsable del tractament de les dades és TRANSAZZI Alta Costura & Sastreria S.L., Barcelona, Espanya. Correu: atelier@transazzi.com."
      },
      {
        heading: "2. Finalitat del tractament",
        body: "Les dades recollides s'utilitzen exclusivament per gestionar comandes privades de vestits i sastreria, cites a showroom i enviaments VIP."
      },
      {
        heading: "3. Drets de l'usuari",
        body: "L'usuari pot exercir els drets d'accés, rectificació, supressió i oposició escrivint a atelier@transazzi.com."
      }
    ]
  },
  cookies: {
    title: "Política de Cookies",
    lastUpdated: "2026",
    sections: [
      {
        heading: "1. Ús de Cookies",
        body: "Aquest lloc web utilitza cookies tècniques per garantir el funcionament de la navegació i del seguiment d'enviaments de moda."
      }
    ]
  },
  certificacions: {
    title: "Qualitat dels Teixits & Sastreria",
    lastUpdated: "2026",
    sections: [
      {
        heading: "Llanes Italianes Biella & Seda Mulberry",
        body: "Certifiquem l'origen dels nostres teixits naturals: llana verge Super 150s, caixmir pur de Mongòlia i seda de 22 Momme."
      }
    ]
  }
};
