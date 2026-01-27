// Calendly configuration - Map countries/regions to sales team Calendly links
export const CALENDLY_CONFIG = {
  // France & North Europe Round Robin
  france_core: {
    eventUrl: 'https://calendly.com/d/cxhr-zgx-hsv/demo-vocalcom',
    timezone: 'Europe/Paris',
    countries: ['France', 'Belgique', 'Suisse', 'Luxembourg', 'Monaco', 'Allemagne', 'Germany', 'Autriche', 'Austria', 'Royaume-Uni', 'United Kingdom', 'UK', 'Irlande', 'Ireland', 'Pays-Bas', 'Netherlands', 'Danemark', 'Denmark', 'Suède', 'Sweden', 'Norvège', 'Norway', 'Finlande', 'Finland', 'Islande', 'Iceland'],
    region: 'france_core' as const
  },
  
  // Africa Round Robin
  africa: {
    eventUrl: 'https://calendly.com/d/cxpy-g78-ffq/demo-vocalcom',
    timezone: 'Africa/Casablanca',
    countries: ['Maroc', 'Morocco', 'Algérie', 'Algeria', 'Tunisie', 'Tunisia', 'Sénégal', 'Senegal', 'Côte d\'Ivoire', 'Ivory Coast', 'Cameroun', 'Cameroon', 'Mali', 'Gabon', 'Burkina Faso', 'Niger', 'Bénin', 'Benin', 'Togo', 'Madagascar', 'Maurice', 'Mauritius', 'Réunion', 'Reunion'],
    region: 'africa' as const
  },
  
  // MEA (Middle East & Africa) Round Robin
  mea: {
    eventUrl: 'https://calendly.com/d/cx75-ygs-cyz/demo-vocalcom',
    timezone: 'Asia/Dubai',
    countries: ['Émirats Arabes Unis', 'UAE', 'United Arab Emirates', 'Arabie Saoudite', 'Saudi Arabia', 'Qatar', 'Koweït', 'Kuwait', 'Bahreïn', 'Bahrain', 'Oman', 'Égypte', 'Egypt', 'Jordanie', 'Jordan', 'Liban', 'Lebanon', 'Israël', 'Israel', 'Turquie', 'Turkey'],
    region: 'mea' as const
  },
  
  // Spain & Southern Europe Round Robin
  spain: {
    eventUrl: 'https://calendly.com/d/ctk2-ndw-xm7/demo-vocalcom',
    timezone: 'Europe/Madrid',
    countries: ['Espagne', 'España', 'Spain', 'Italie', 'Italy', 'Italia', 'Grèce', 'Greece', 'Chypre', 'Cyprus', 'Malte', 'Malta'],
    region: 'spain' as const
  },
  
  // LATAM Round Robin
  latam: {
    eventUrl: 'https://calendly.com/d/cx6v-qw8-dwp/demo-vocalcom',
    timezone: 'America/Mexico_City',
    countries: ['Mexique', 'Mexico', 'Argentine', 'Argentina', 'Colombie', 'Colombia', 'Chili', 'Chile', 'Pérou', 'Peru', 'Venezuela', 'Équateur', 'Ecuador', 'Bolivie', 'Bolivia', 'Paraguay', 'Uruguay', 'Costa Rica', 'Panama', 'Guatemala', 'Honduras', 'El Salvador', 'Nicaragua', 'République Dominicaine', 'Dominican Republic'],
    region: 'latam' as const
  },
  
  // Portugal & Portuguese-speaking countries (using Africa calendar as default)
  portugal: {
    eventUrl: 'https://calendly.com/d/cxpy-g78-ffq/demo-vocalcom',
    timezone: 'Europe/Lisbon',
    countries: ['Portugal', 'Brésil', 'Brasil', 'Brazil', 'Angola', 'Mozambique'],
    region: 'portugal' as const
  },
  
  // Default fallback (uses Africa round-robin)
  default: {
    eventUrl: 'https://calendly.com/d/cxpy-g78-ffq/demo-vocalcom',
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
