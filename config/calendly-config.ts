// Calendly configuration - Map countries/regions to sales team Calendly links
export const CALENDLY_CONFIG = {
  // France & French-speaking countries
  france: {
    eventUrl: 'https://calendly.com/your-team-france/demo-15min',
    timezone: 'Europe/Paris',
    countries: ['France', 'Belgique', 'Suisse', 'Luxembourg', 'Monaco']
  },
  
  // Spain & Spanish-speaking countries
  spain: {
    eventUrl: 'https://calendly.com/your-team-spain/demo-15min',
    timezone: 'Europe/Madrid',
    countries: ['Espagne', 'España', 'Spain']
  },
  
  // Portugal & Portuguese-speaking countries
  portugal: {
    eventUrl: 'https://calendly.com/your-team-portugal/demo-15min',
    timezone: 'Europe/Lisbon',
    countries: ['Portugal', 'Brésil', 'Brasil', 'Brazil']
  },
  
  // UK & English-speaking European countries
  uk: {
    eventUrl: 'https://calendly.com/your-team-uk/demo-15min',
    timezone: 'Europe/London',
    countries: ['Royaume-Uni', 'United Kingdom', 'UK', 'Irlande', 'Ireland']
  },
  
  // Germany & German-speaking countries
  germany: {
    eventUrl: 'https://calendly.com/your-team-germany/demo-15min',
    timezone: 'Europe/Berlin',
    countries: ['Allemagne', 'Germany', 'Autriche', 'Austria']
  },
  
  // USA & Americas
  usa: {
    eventUrl: 'https://calendly.com/your-team-usa/demo-15min',
    timezone: 'America/New_York',
    countries: ['États-Unis', 'United States', 'USA', 'Canada']
  },
  
  // Default fallback
  default: {
    eventUrl: 'https://calendly.com/your-team-default/demo-15min',
    timezone: 'Europe/Paris',
    countries: []
  }
};

// Get Calendly config based on selected country
export function getCalendlyConfigByCountry(country: string): typeof CALENDLY_CONFIG.france {
  for (const [region, config] of Object.entries(CALENDLY_CONFIG)) {
    if (config.countries.includes(country)) {
      return config;
    }
  }
  return CALENDLY_CONFIG.default;
}
