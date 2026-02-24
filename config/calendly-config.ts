// Calendly configuration - Map countries/regions to sales team Calendly links
import type { RegionKey } from "@/lib/region-resolver";

export const CALENDLY_CONFIG = {
  // France & North Europe Round Robin
  // Team: Pierrick Hollocou, Oumar NDIAYE
  france_core: {
    eventUrl: 'https://calendly.com/vocalcom-france/demo-vocalcom',
    timezone: 'Europe/Paris',
    countries: ['France', 'Belgique', 'Suisse', 'Luxembourg', 'Monaco', 'Allemagne', 'Germany', 'Autriche', 'Austria', 'Royaume-Uni', 'United Kingdom', 'UK', 'Irlande', 'Ireland', 'Pays-Bas', 'Netherlands', 'Danemark', 'Denmark', 'Suède', 'Sweden', 'Norvège', 'Norway', 'Finlande', 'Finland', 'Islande', 'Iceland'],
    region: 'france_core' as const
  },
  
  // Africa Round Robin (excluding Egypt which goes to MEA)
  // Team: Chiheb Klibi, Dalel Hammami, Rym Chaabane, Issam Gharbi
  africa: {
    eventUrl: 'https://calendly.com/vocalcom-africa/demo-vocalcom',
    timezone: 'Africa/Casablanca',
    countries: ['Maroc', 'Morocco', 'Algérie', 'Algeria', 'Tunisie', 'Tunisia', 'Sénégal', 'Senegal', 'Côte d\'Ivoire', 'Ivory Coast', 'Cameroun', 'Cameroon', 'Mali', 'Gabon', 'Burkina Faso', 'Niger', 'Bénin', 'Benin', 'Togo', 'Madagascar', 'Maurice', 'Mauritius', 'Réunion', 'Reunion', 'Ghana', 'Nigeria', 'Kenya', 'Afrique du Sud', 'South Africa', 'Tanzanie', 'Tanzania', 'Ouganda', 'Uganda', 'Éthiopie', 'Ethiopia', 'Rwanda', 'Congo', 'Angola', 'Mozambique', 'Namibie', 'Namibia', 'Botswana', 'Zimbabwe', 'Zambie', 'Zambia'],
    region: 'africa' as const
  },
  
  // MEA (Middle East) Round Robin
  // Team: Mohammad ZUGHAYER, Mohamed Karim HELALI
  mea: {
    eventUrl: 'https://calendly.com/vocalcom-mea/new-meeting',
    timezone: 'Asia/Dubai',
    countries: ['Émirats Arabes Unis', 'UAE', 'United Arab Emirates', 'Arabie Saoudite', 'Saudi Arabia', 'Qatar', 'Koweït', 'Kuwait', 'Bahreïn', 'Bahrain', 'Oman', 'Égypte', 'Egypt', 'Jordanie', 'Jordan', 'Liban', 'Lebanon', 'Israël', 'Israel', 'Turquie', 'Turkey', 'Irak', 'Iraq', 'Yémen', 'Yemen', 'Syrie', 'Syria', 'Palestine'],
    region: 'mea' as const
  },
  
  // Spain & Southern Europe Round Robin
  // Team: Jorge Meilán, Luis Lavorato, Andrés Braceras
  spain: {
    eventUrl: 'https://calendly.com/vocalcom-spain/demo-vocalcom',
    timezone: 'Europe/Madrid',
    countries: ['Espagne', 'España', 'Spain', 'Italie', 'Italy', 'Italia', 'Grèce', 'Greece', 'Chypre', 'Cyprus', 'Malte', 'Malta', 'Portugal'],
    region: 'spain' as const
  },
  
  // LATAM - Angelo Quintero (Colombia, Mexico, Central America, Caribbean)
  latam_angelo: {
    eventUrl: 'https://calendly.com/vocalcom-latam/demo-vocalcom-clone',
    timezone: 'America/Mexico_City',
    countries: ['Mexique', 'Mexico', 'México', 'Colombie', 'Colombia', 'Colômbia', 'Panama', 'Panamá', 'Guatemala', 'Honduras', 'El Salvador', 'Salvador', 'Nicaragua', 'Nicarágua', 'République Dominicaine', 'Dominican Republic', 'República Dominicana', 'Cuba', 'Jamaïque', 'Jamaica', 'Haïti', 'Haiti', 'Puerto Rico', 'Porto Rico', 'Trinidad and Tobago', 'Trinité-et-Tobago', 'Trinidad y Tobago', 'Trinidad e Tobago', 'Barbados', 'Barbade', 'Bahamas'],
    region: 'latam_angelo' as const
  },

  // LATAM - Juan Carlos Henríquez (Peru, Bolivia, Chile, Costa Rica, Venezuela)
  latam_juan: {
    eventUrl: 'https://calendly.com/vocalcom-latam/demo-vocalcom-clone-1',
    timezone: 'America/Santiago',
    countries: ['Pérou', 'Peru', 'Perú', 'Bolivie', 'Bolivia', 'Bolívia', 'Chili', 'Chile', 'Costa Rica', 'Venezuela', 'Équateur', 'Ecuador', 'Equador'],
    region: 'latam_juan' as const
  },

  // LATAM - Mauro Ballatore (Argentina, Uruguay, Paraguay, Brazil)
  latam_mauro: {
    eventUrl: 'https://calendly.com/vocalcom-latam/new-meeting',
    timezone: 'America/Argentina/Buenos_Aires',
    countries: ['Argentine', 'Argentina', 'Uruguai', 'Uruguay', 'Paraguai', 'Paraguay', 'Brésil', 'Brasil', 'Brazil'],
    region: 'latam_mauro' as const
  },
  
  // Portugal now uses Spain calendar (Southern Europe team)
  portugal: {
    eventUrl: 'https://calendly.com/vocalcom-spain/demo-vocalcom',
    timezone: 'Europe/Lisbon',
    countries: ['Portugal'],
    region: 'portugal' as const
  },
  
  // Default fallback (uses France round-robin)
  default: {
    eventUrl: 'https://calendly.com/vocalcom-france/demo-vocalcom',
    timezone: 'Europe/Paris',
    countries: [],
    region: 'default' as const
  }
};

export type CalendlyRegion = keyof typeof CALENDLY_CONFIG;
export type CalendlyConfigType = typeof CALENDLY_CONFIG[CalendlyRegion];

// Get Calendly config based on region key
export function getCalendlyConfig(region: string): CalendlyConfigType {
  if (region in CALENDLY_CONFIG) {
    return CALENDLY_CONFIG[region as CalendlyRegion];
  }
  return CALENDLY_CONFIG.default;
}

// Get Calendly config based on selected country (case-insensitive matching)
export function getCalendlyConfigByCountry(country: string): CalendlyConfigType {
  const countryLower = country.toLowerCase();
  for (const [region, config] of Object.entries(CALENDLY_CONFIG)) {
    if (config.countries.some((c: string) => c.toLowerCase() === countryLower)) {
      return config as CalendlyConfigType;
    }
  }
  return CALENDLY_CONFIG.default;
}

// Map RegionKey from region-resolver to CalendlyRegion
export function mapRegionKeyToCalendly(regionKey: RegionKey): CalendlyRegion {
  const mapping: Record<RegionKey, CalendlyRegion> = {
    'france_core': 'france_core',
    'africa_francophone': 'africa',
    'africa_english': 'africa',
    'en_europe': 'france_core', // North Europe uses France calendar
    'mea_english': 'mea',
    'spain': 'spain', // Spain has its own team
    'es_latam': 'latam_angelo', // LATAM default goes to Angelo (Colombia/Mexico/Central America)
    'brazil_pt': 'latam_mauro' // Brazil goes to Mauro
  };
  return mapping[regionKey] || 'default';
}
