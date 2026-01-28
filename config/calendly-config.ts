// Calendly configuration - Map countries/regions to sales team Calendly links
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
  
  // LATAM Round Robin
  // Team: Angelo Quintero (Colombia/Mexico), Mauro Ballatore (Southern Cone), 
  //       Romina Stacul (Argentina), Juan Carlos Henríquez (Chile)
  latam: {
    eventUrl: 'https://calendly.com/vocalcom-latam/new-meeting',
    timezone: 'America/Mexico_City',
    countries: ['Mexique', 'Mexico', 'Colombie', 'Colombia', 'Argentine', 'Argentina', 'Chili', 'Chile', 'Brésil', 'Brasil', 'Brazil', 'Pérou', 'Peru', 'Venezuela', 'Équateur', 'Ecuador', 'Bolivie', 'Bolivia', 'Paraguay', 'Uruguay', 'Costa Rica', 'Panama', 'Guatemala', 'Honduras', 'El Salvador', 'Nicaragua', 'République Dominicaine', 'Dominican Republic', 'Cuba', 'Jamaïque', 'Jamaica', 'Haïti', 'Haiti'],
    region: 'latam' as const
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

// Get Calendly config based on selected country
export function getCalendlyConfigByCountry(country: string): CalendlyConfigType {
  for (const [region, config] of Object.entries(CALENDLY_CONFIG)) {
    if (config.countries.some((c: string) => c === country)) {
      return config as CalendlyConfigType;
    }
  }
  return CALENDLY_CONFIG.default;
}
