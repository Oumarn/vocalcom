/**
 * Microsoft Outlook Calendar Integration - Multi-Region Configuration
 * 
 * Aligned with Google Ads campaign taxonomy and actual sales team structure
 * Region detection based on UTM parameters (see lib/region-resolver.ts)
 */

import type { RegionKey } from '@/lib/region-resolver';

export const REGIONS = {
  // 🇫🇷 France Core (France + Belgium FR + Switzerland FR + Luxembourg)
  france_core: {
    timezone: 'Europe/Paris',
    duration: 15, // minutes per meeting
    bufferTime: 0, // minutes between meetings
    calendarEmails: [
      'p.hollocou@vocalcom.com',  // Pierrick Hollocou - Sales Executive
      'o.ndiaye@vocalcom.com',     // Oumar Ndiaye - Sales
    ],
  },

  // 🌍 Africa Francophone (French-speaking Africa)
  africa_francophone: {
    timezone: 'Africa/Dakar',
    duration: 30,
    bufferTime: 0,
    calendarEmails: [
      'c.klibi@vocalcom.com',      // Chiheb Klibi - SDR
      'd.hammami@vocalcom.com',    // Dalel Hammami - Sales Director
      'r.chaabane@vocalcom.com',   // Rym Chaabane - Inside Sales
      'i.gharbi@vocalcom.com',     // Issam Gharbi - Inside Sales
    ],
  },

  // 🇪🇸 Spain & LATAM (Spain + Latin America)
  es_latam: {
    timezone: 'America/Mexico_City',
    duration: 30,
    bufferTime: 0,
    calendarEmails: [
      // Spain team
      'j.meilan@vocalcom.com',     // Jorge Meilán - Senior Sales Executive
      'l.lavorato@vocalcom.com',   // Luis Lavorato - Senior Sales Executive
      'a.braceras@vocalcom.com',   // Andrés Braceras - SVP Southern Europe & LATAM
      // LATAM team
      'a.quintero@vocalcom.com',   // Angelo Quintero - Sales Director Colombia & Mexico
      'm.ballatore@vocalcom.com',  // Mauro Ballatore - Sales Director Southern Cone
      'r.stacul@vocalcom.com',     // Romina Stacul - Inside Sales Argentina
      'j.henriquez@vocalcom.com',  // Juan Carlos Henríquez - Sales Director Chile
    ],
  },

  // 🌍 Middle East & Arabia
  mea_english: {
    timezone: 'Asia/Dubai',
    duration: 30,
    bufferTime: 0,
    calendarEmails: [
      'm.zughayer@vocalcom.com',   // Mohammad Zughayer - Sales Director
      'mk.helali@vocalcom.com',    // Mohamed Karim Helali - Country Manager
    ],
  },

  // 🇬🇧 Europe (English-speaking)
  // Temporary: routed to France team until dedicated EN Europe team is assigned
  en_europe: {
    timezone: 'Europe/London',
    duration: 15,
    bufferTime: 0,
    calendarEmails: [
      'p.hollocou@vocalcom.com',
      'o.ndiaye@vocalcom.com',
    ],
  },

  // 🌍 Africa (English-speaking)
  // Temporary: routed to SDR until dedicated EN Africa team is assigned
  africa_english: {
    timezone: 'Africa/Lagos',
    duration: 30,
    bufferTime: 0,
    calendarEmails: [
      'c.klibi@vocalcom.com', // Temporary assignment
    ],
  },

  // 🇧🇷 Brazil (Portuguese)
  brazil_pt: {
    timezone: 'America/Sao_Paulo',
    duration: 30,
    bufferTime: 0,
    calendarEmails: [
      'm.ballatore@vocalcom.com', // Mauro covers Southern Cone including Brazil
    ],
  },
} as const;

export type OutlookRegionConfig = {
  timezone: string;
  duration: number;
  bufferTime: number;
  calendarEmails: string[];
};

// Legacy support: keep old structure for backwards compatibility
export const OUTLOOK_CONFIG = {
  france: REGIONS.france_core,
  spain: REGIONS.es_latam,
  portugal: REGIONS.brazil_pt,
  uk: REGIONS.en_europe,
  germany: REGIONS.en_europe,
  usa: REGIONS.en_europe,
  default: REGIONS.france_core,
};

// Working hours configuration per region
export const WORKING_HOURS = {
  default: {
    monday: { start: '09:00', end: '18:00' },
    tuesday: { start: '09:00', end: '18:00' },
    wednesday: { start: '09:00', end: '18:00' },
    thursday: { start: '09:00', end: '18:00' },
    friday: { start: '09:00', end: '18:00' },
    saturday: null, // Not working
    sunday: null,   // Not working
  },
};

/**
 * Get region configuration by RegionKey
 */
export function getRegionConfig(region: RegionKey): OutlookRegionConfig {
  return REGIONS[region] || REGIONS.france_core;
}

/**
 * Get working hours for a region
 */
export function getWorkingHours(region: keyof typeof WORKING_HOURS = 'default') {
  return WORKING_HOURS[region] || WORKING_HOURS.default;
}

/**
 * Legacy function for backwards compatibility
 * @deprecated Use getRegionConfig with RegionKey instead
 */
export function getOutlookConfigByCountry(country: string): OutlookRegionConfig {
  // Simple mapping for legacy support
  const countryToRegion: Record<string, RegionKey> = {
    'France': 'france_core',
    'Belgique': 'france_core',
    'Suisse': 'france_core',
    'Luxembourg': 'france_core',
    'Monaco': 'france_core',
    'Spain': 'es_latam',
    'España': 'es_latam',
    'Espagne': 'es_latam',
    'Brazil': 'brazil_pt',
    'Brasil': 'brazil_pt',
    'Brésil': 'brazil_pt',
  };
  
  const region = countryToRegion[country] || 'france_core';
  return REGIONS[region];
}
