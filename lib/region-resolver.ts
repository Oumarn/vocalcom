/**
 * Region resolver for UTM-based routing
 * Maps Google Ads campaign naming to internal sales regions
 * Extended with Intent & Angle detection for landing page personalization
 */

export type RegionKey =
  | "france_core"
  | "africa_francophone"
  | "en_europe"
  | "africa_english"
  | "mea_english"
  | "spain"
  | "es_latam"
  | "brazil_pt";

/**
 * Landing page intent (buying stage)
 * Maps to campaign intent in Google Ads structure
 */
export type IntentType =
  | "category"      // Solution-aware, evaluating platforms
  | "problem"       // Problem-aware, seeking solutions
  | "competitor"    // Switching from existing vendor
  | "integration"   // Integration-focused search
  | "brand";        // Direct brand search

/**
 * Content angle (persona/narrative emphasis)
 * Maps to ad group themes
 */
export type AngleType =
  | "ai"            // AI-first, innovation focus
  | "ops"           // Operations, efficiency, performance
  | "cx"            // CX transformation, strategy
  | "automation"    // Automation-focused
  | "reporting"     // Analytics and reporting
  | "salesforce"    // Salesforce integration
  | "dynamics"      // Microsoft Dynamics
  | "hubspot"       // HubSpot CRM
  | "zendesk"       // Zendesk integration
  | "zoho"          // Zoho CRM
  | "crm"           // General CRM integration
  | "genesys"       // Genesys alternative
  | "five9"         // Five9 alternative
  | "talkdesk"      // Talkdesk alternative
  | "odigo"         // Odigo alternative
  | "enterprise"    // Enterprise-grade
  | "omnichannel"   // Omnichannel focus
  | "generic";      // Generic contact center platform

type UTM = {
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_term?: string | null;
  lang?: "fr" | "en" | "es" | "pt";
  intent?: string | null;    // Direct intent parameter
  angle?: string | null;     // Direct angle parameter
};

/**
 * Resolve region from UTM parameters (primarily utm_campaign)
 * Campaign naming structure: GA | Region | Language | Intent | Offer
 * 
 * Examples:
 * - GA | FR Core | FR | Brand | Demo → france_core
 * - GA | FR Africa | FR | Category | Contact Center Software → africa_francophone
 * - GA | EN MEA | EN | Problem | CX Platform → mea_english
 */
/**
 * Map country to sales region
 * Based on actual sales team territories
 */
export function resolveRegionFromCountry(country: string): RegionKey {
  const countryLower = country.toLowerCase();
  
  // France Core: France, Belgium, Switzerland, Luxembourg, North Europe
  const franceCoreCountries = [
    'france', 'belgique', 'belgium', 'suisse', 'switzerland', 'luxembourg',
    'norvège', 'norway', 'suède', 'sweden', 'finlande', 'finland', 
    'danemark', 'denmark', 'islande', 'iceland', 'pays-bas', 'netherlands'
  ];
  if (franceCoreCountries.some(c => countryLower.includes(c))) {
    return 'france_core';
  }
  
  // Spain & LATAM
  const esLatamCountries = [
    'espagne', 'spain', 'españa',
    'mexique', 'mexico', 'méxico',
    'colombie', 'colombia',
    'argentine', 'argentina',
    'chili', 'chile',
    'pérou', 'peru', 'perú',
    'équateur', 'ecuador',
    'bolivie', 'bolivia',
    'paraguay',
    'uruguay',
    'venezuela',
    'costa rica',
    'panama', 'panamá',
    'guatemala',
    'honduras',
    'salvador', 'el salvador',
    'nicaragua',
    'république dominicaine', 'dominican republic'
  ];
  if (esLatamCountries.some(c => countryLower.includes(c))) {
    return 'es_latam';
  }
  
  // Brazil
  if (countryLower.includes('brésil') || countryLower.includes('brazil')) {
    return 'brazil_pt';
  }
  
  // Middle East
  const meaCountries = [
    'émirats', 'emirates', 'uae', 'dubai',
    'arabie', 'saudi', 'arabia',
    'qatar',
    'koweït', 'kuwait',
    'bahreïn', 'bahrain',
    'oman',
    'jordanie', 'jordan',
    'liban', 'lebanon',
    'égypte', 'egypt',
    'irak', 'iraq',
    'yémen', 'yemen'
  ];
  if (meaCountries.some(c => countryLower.includes(c))) {
    return 'mea_english';
  }
  
  // Africa Francophone
  const africaFrCountries = [
    'maroc', 'morocco',
    'algérie', 'algeria',
    'tunisie', 'tunisia',
    'sénégal', 'senegal',
    'côte d\'ivoire', 'ivory coast',
    'mali',
    'burkina',
    'niger',
    'tchad', 'chad',
    'cameroun', 'cameroon',
    'gabon',
    'congo',
    'bénin', 'benin',
    'togo',
    'mauritanie', 'mauritania',
    'madagascar',
    'guinée', 'guinea',
    'rwanda'
  ];
  if (africaFrCountries.some(c => countryLower.includes(c))) {
    return 'africa_francophone';
  }
  
  // Africa English
  const africaEnCountries = [
    'afrique du sud', 'south africa',
    'nigeria',
    'kenya',
    'ghana',
    'tanzanie', 'tanzania',
    'ouganda', 'uganda',
    'éthiopie', 'ethiopia',
    'zambie', 'zambia',
    'zimbabwe',
    'botswana',
    'namibie', 'namibia',
    'mozambique'
  ];
  if (africaEnCountries.some(c => countryLower.includes(c))) {
    return 'africa_english';
  }
  
  // English Europe (UK, Ireland, other English-speaking European countries)
  const enEuropeCountries = [
    'royaume-uni', 'united kingdom', 'uk', 'angleterre', 'england',
    'irlande', 'ireland',
    'malte', 'malta',
    'chypre', 'cyprus'
  ];
  if (enEuropeCountries.some(c => countryLower.includes(c))) {
    return 'en_europe';
  }
  
  // Default fallback: France Core
  return 'france_core';
}

export function resolveRegionFromUTM(utm: UTM): RegionKey {
  const campaign = (utm.utm_campaign ?? "").toLowerCase();

  // Match exact region strings from Google Ads naming convention
  // Pattern: GA | REGION | LANGUAGE | ...
  
  // France & Core French markets
  if (campaign.includes("france") || campaign.includes("fr core") || campaign.includes("vocalcom")) {
    return "france_core";
  }
  
  // MEA (Middle East & Africa) - must check before "africa" to avoid false match
  if (campaign.includes("mea") || campaign.includes("en mea")) {
    return "mea_english";
  }
  
  // Africa (French-speaking)
  if (campaign.includes("africa") && (campaign.includes("fr") || !campaign.includes("en"))) {
    return "africa_francophone";
  }
  
  // Africa (English-speaking)
  if (campaign.includes("africa") && campaign.includes("en")) {
    return "africa_english";
  }
  
  // North Europe (English)
  if (campaign.includes("north europe") || campaign.includes("en europe")) {
    return "en_europe";
  }
  
  // Spain & LATAM (Spanish & Portuguese)
  if (campaign.includes("spain")) {
    return "spain"; // Spain has its own team calendar
  }
  
  if (campaign.includes("latam") || campaign.includes("mexico") || 
      campaign.includes("colombia") || campaign.includes("argentina")) {
    return "es_latam"; // LATAM countries use latam calendar
  }
  
  // Brazil (Portuguese) - must check for brazil specifically to avoid matching "pt" in "LATAM | PT"
  if (campaign.includes("brazil") || (campaign.includes(" pt") && !campaign.includes("latam"))) {
    return "brazil_pt";
  }
  
  // Generic Spanish campaigns without explicit region
  if (campaign.includes("es") && !campaign.includes("fr") && !campaign.includes("en")) {
    return "es_latam"; // Default Spanish to LATAM
  }

  // Fallback: use language as a hint
  switch (utm.lang) {
    case "fr":
      return "france_core";
    case "en":
      return "en_europe";
    case "es":
      return "es_latam";
    case "pt":
      return "brazil_pt";
    default:
      return "france_core"; // Ultimate fallback
  }
}

/**
 * Resolve landing page intent from UTM parameters
 * Intent determines the hero messaging and primary value proposition
 * 
 * Campaign structure: GA | Region | Language | Intent | Offer
 * 
 * Examples:
 * - "Category" in campaign → intent=category
 * - "Problem" in campaign → intent=problem
 * - "Competitor" in campaign → intent=competitor
 */
export function resolveIntentFromUTM(utm: UTM): IntentType {
  // Direct intent parameter takes priority (for manual overrides)
  if (utm.intent) {
    const intentLower = utm.intent.toLowerCase();
    if (['category', 'problem', 'competitor', 'integration', 'brand'].includes(intentLower)) {
      return intentLower as IntentType;
    }
  }

  const campaign = (utm.utm_campaign ?? "").toLowerCase();

  // Match intent from campaign naming structure
  if (campaign.includes("category")) return "category";
  if (campaign.includes("problem")) return "problem";
  if (campaign.includes("competitor")) return "competitor";
  if (campaign.includes("integration")) return "integration";
  if (campaign.includes("brand")) return "brand";

  // Default to category for unmatched campaigns
  return "category";
}

/**
 * Resolve content angle from UTM parameters
 * Angle determines section emphasis, ordering, and narrative tone
 * 
 * Mapped from ad group names and keywords
 * 
 * Examples:
 * - "Operational Performance" → angle=ops
 * - "CX Transformation" → angle=cx
 * - "AI Contact Center" → angle=ai
 */
export function resolveAngleFromUTM(utm: UTM): AngleType {
  // Direct angle parameter takes priority
  if (utm.angle) {
    const angleLower = utm.angle.toLowerCase();
    const validAngles: AngleType[] = [
      'ai', 'ops', 'cx', 'automation', 'reporting',
      'salesforce', 'dynamics', 'hubspot', 'zendesk', 'zoho', 'crm',
      'genesys', 'five9', 'talkdesk', 'odigo',
      'enterprise', 'omnichannel', 'generic'
    ];
    if (validAngles.includes(angleLower as AngleType)) {
      return angleLower as AngleType;
    }
  }

  const campaign = (utm.utm_campaign ?? "").toLowerCase();
  const content = (utm.utm_content ?? "").toLowerCase();
  const term = (utm.utm_term ?? "").toLowerCase();
  
  // Combine all UTM fields for matching
  const allText = `${campaign} ${content} ${term}`;

  // Match angle patterns (order matters - most specific first)
  
  // Competitor angles
  if (allText.includes("genesys")) return "genesys";
  if (allText.includes("five9")) return "five9";
  if (allText.includes("talkdesk")) return "talkdesk";
  if (allText.includes("odigo")) return "odigo";

  // CRM/Integration angles
  if (allText.includes("salesforce")) return "salesforce";
  if (allText.includes("dynamics")) return "dynamics";
  if (allText.includes("hubspot")) return "hubspot";
  if (allText.includes("zendesk")) return "zendesk";
  if (allText.includes("zoho")) return "zoho";
  if (allText.includes("crm")) return "crm";

  // Problem/persona angles
  if (allText.includes("operational") || allText.includes("performance") || allText.includes("ops")) return "ops";
  if (allText.includes("reporting") || allText.includes("pilotage") || allText.includes("analytics")) return "reporting";
  if (allText.includes("automation") || allText.includes("automate")) return "automation";
  if (allText.includes("cx transformation") || allText.includes("customer experience")) return "cx";
  if (allText.includes("ai") || allText.includes("ia") || allText.includes("artificial intelligence")) return "ai";
  if (allText.includes("omnichannel") || allText.includes("omnicanal")) return "omnichannel";
  if (allText.includes("enterprise")) return "enterprise";
  
  // Contact center platform (generic solution-aware search)
  if (allText.includes("contact center platform") || allText.includes("call center") || allText.includes("centre d'appel") || allText.includes("centre de contact")) return "generic";

  // Default based on intent
  const intent = resolveIntentFromUTM(utm);
  switch (intent) {
    case "problem":
      return "ops"; // Problem searches default to ops angle
    case "competitor":
      return "enterprise"; // Competitor searches default to enterprise
    case "integration":
      return "crm"; // Integration searches default to CRM
    case "brand":
      return "ai"; // Brand searches default to AI (vision)
    default:
      return "ai"; // Category searches default to AI
  }
}

/**
 * Get human-readable region name for display
 */
export function getRegionDisplayName(region: RegionKey): string {
  const names: Record<RegionKey, string> = {
    france_core: "France & Benelux",
    africa_francophone: "Afrique francophone",
    en_europe: "Europe",
    africa_english: "English-speaking Africa",
    mea_english: "Middle East & Arabia",
    spain: "España",
    es_latam: "Latinoamérica",
    brazil_pt: "Brasil",
  };
  return names[region];
}

/**
 * Get landing page variant configuration based on intent
 * Returns hero copy and section ordering strategy
 */
export function getLandingPageVariant(intent: IntentType, angle: AngleType, lang: 'fr' | 'en' | 'es' | 'pt' = 'en') {
  // Translations for each language
  const translations = {
    en: {
      // CATEGORY VARIANTS
      category_enterprise: {
        hero: "Enterprise-Grade Contact Center Platform",
        subHero: "Scalable, secure, and designed for high-volume global teams.",
        trustBadge: "ISO 27001 & SOC 2"
      },
      category_ccaas: {
        hero: "Enterprise CCaaS Solution: Cloud Contact Center, Omnichannel & Secure",
        subHero: "Unify calls and digital channels on a CCaaS platform built for scale: operational performance, 24/7 continuity, real-time monitoring, and measurable ROI.",
        trustBadge: "Omnichannel (voice + digital)",
        proofPoint1: "Enterprise security & compliance (GDPR, ISO 27001)",
        proofPoint2: "Fast deployment, measurable ROI",
        cta: "Request a Demo"
      },
      category_ai: {
        hero: "AI Contact Center: Automate and Assist Your Teams in Real Time",
        subHero: "AI applied to customer service: augmented agents, automated simple requests, better omnichannel performance — with measurable ROI.",
        trustBadge: "Measurable ROI (up to 301% over 3 years)",
        proofPoint1: "Fast deployment (payback ~6 months)",
        proofPoint2: "Security & compliance (GDPR, ISO 27001)",
        cta: "Discover the Demo"
      },
      category_generic: {
        hero: "Omnichannel Contact Center Software for Enterprises",
        subHero: "A unified platform to manage calls, messages, and customer journeys: operational performance, real-time monitoring, and service continuity at scale.",
        trustBadge: "Voice + digital on one platform",
        proofPoint1: "Real-time monitoring & advanced reporting",
        proofPoint2: "Enterprise security & compliance",
        cta: "Request a Demo"
      },
      category_omnichannel: {
        hero: "Omnichannel Contact Center for Seamless Customer Journeys",
        subHero: "Unify voice and digital channels on a single platform to deliver a consistent, seamless, and measurable customer experience at scale.",
        trustBadge: "All channels on one platform",
        proofPoint1: "Continuous & contextualized customer journeys",
        proofPoint2: "Real-time omnichannel monitoring",
        cta: "Request a Demo"
      },
      
      // PROBLEM VARIANTS
      problem_ops: {
        hero: "Reduce Contact Center Costs & Boost Productivity",
        subHero: "Stop flying blind. Real-time supervision and analytics to optimize your AHT.",
        proofPoint: "301% ROI in 3 Years",
        firstFeature: "Real-Time Analytics"
      },
      problem_cx: {
        hero: "Orchestrate Seamless Customer Journeys",
        subHero: "Transform your CX with an AI-first platform that unifies Voice and Digital.",
        proofPoint: "Trusted by 1,200+ Global Brands",
        firstFeature: "Omnichannel Routing"
      },
      problem_automation: {
        hero: "Automate 24/7 Support with AI Agents",
        subHero: "Deflect 30% of calls and handle volume spikes effortlessly.",
        proofPoint: "24/7 Availability",
        firstFeature: "AI Voice & Chatbots"
      },
      
      // COMPETITOR VARIANTS
      competitor_genesys: {
        hero: "The #1 Cloud Alternative to Genesys",
        subHero: "Get the same enterprise power without the complexity or cost.",
        comparison: "Vocalcom vs Genesys: 30% Lower TCO",
        cta: "Compare Migration Plans"
      },
      competitor_five9: {
        hero: "The Best European Alternative to Five9",
        subHero: "Secure your data with a true GDPR-compliant platform.",
        comparison: "Vocalcom vs Five9: No AI Data Training",
        cta: "See Security Specs"
      },
      competitor_talkdesk: {
        hero: "The Reliable Alternative to Talkdesk",
        subHero: "Get enterprise stability with the modern UX you love.",
        comparison: "Vocalcom vs Talkdesk: 99.99% Uptime",
        cta: "Compare ROI"
      },
      competitor_odigo: {
        hero: "A Modern Alternative to Odigo for Enterprise Contact Centers",
        subHero: "Gain flexibility, performance, and visibility with an omnichannel platform built to scale — without vendor lock-in.",
        comparison: "Vocalcom vs Odigo: Flexibility & Native Integrations",
        proofPoint1: "Secure migration",
        proofPoint2: "Fast deployment",
        proofPoint3: "Measurable ROI",
        cta: "Compare Odigo and Vocalcom"
      },
      competitor_generic: {
        hero: "The Best Alternative for Enterprise CX",
        subHero: "Switch to a secure, scalable platform with better ROI.",
        comparison: "Why Switch?",
        cta: "Request a Demo"
      },
      
      // INTEGRATION VARIANTS
      integration_salesforce: {
        hero: "Native Salesforce CTI Integration",
        subHero: "Boost sales productivity inside Lightning & Classic.",
        feature1: "Salesforce Click-to-Dial",
        trustLogo: "Salesforce Partner"
      },
      integration_dynamics: {
        hero: "Certified Contact Center for Dynamics 365",
        subHero: "Unify voice and data directly inside Microsoft Dynamics.",
        feature1: "Dynamics Click-to-Dial",
        trustLogo: "Microsoft Partner"
      },
      integration_hubspot: {
        hero: "Seamless Telephony for HubSpot CRM",
        subHero: "Log calls & record conversations automatically in HubSpot.",
        feature1: "HubSpot Click-to-Call",
        trustLogo: "HubSpot Partner"
      },
      integration_zendesk: {
        hero: "Native Zendesk Support Integration",
        subHero: "Handle calls directly from your Zendesk tickets.",
        feature1: "Zendesk Click-to-Dial",
        trustLogo: "Zendesk Partner"
      },
      integration_generic: {
        hero: "Native CRM Integrations for Your Contact Center",
        subHero: "Connect Vocalcom to your favorite tools in minutes.",
        feature1: "Click-to-Dial",
        trustLogo: "CRM Integrations"
      },
      
      brand: {
        hero: "AI-First Contact Center Platform for Enterprise CX",
        subHero: "Unify AI agents and human teams across all channels to increase efficiency, boost revenue, and deliver measurable CX performance at scale.",
        cta: "Request a Demo"
      }
    },
    fr: {
      // CATEGORY VARIANTS
      category_enterprise: {
        hero: "Plateforme de Centre de Contact de Niveau Entreprise",
        subHero: "Évolutive, sécurisée et conçue pour les équipes mondiales à haut volume.",
        trustBadge: "ISO 27001 & SOC 2"
      },
      category_ccaas: {
        hero: "Solution CCaaS entreprise : centre de contact cloud, omnicanal et sécurisé",
        subHero: "Unifiez appels et canaux digitaux sur une plateforme CCaaS conçue pour l'échelle : performance opérationnelle, continuité 24/7, pilotage temps réel et ROI mesurable.",
        trustBadge: "Omnicanal (voix + digital)",
        proofPoint1: "Sécurité & conformité entreprise (RGPD, ISO 27001)",
        proofPoint2: "Déploiement rapide, ROI mesurable",
        cta: "Demander une Démo"
      },
      category_ai: {
        hero: "Centre de Contact & IA : Automatisation et Assistance Temps Réel",
        subHero: "IA appliquée au service client : agents augmentés, demandes simples automatisées, meilleure performance omnicanale — avec ROI mesurable.",
        trustBadge: "ROI Mesurable (jusqu'à 301% sur 3 ans)",
        proofPoint1: "Déploiement rapide (payback ~6 mois)",
        proofPoint2: "Sécurité & conformité (RGPD, ISO 27001)",
        cta: "Découvrir la Démo"
      },
      category_generic: {
        hero: "Logiciel de centre de contact omnicanal pour entreprises",
        subHero: "Une plateforme unique pour gérer appels, messages et parcours clients : performance opérationnelle, pilotage en temps réel et continuité de service à grande échelle.",
        trustBadge: "Voix + digital sur une seule plateforme",
        proofPoint1: "Pilotage temps réel & reporting avancé",
        proofPoint2: "Sécurité & conformité entreprise",
        cta: "Demander une Démo"
      },
      category_omnichannel: {
        hero: "Centre de contact omnicanal pour des parcours clients sans rupture",
        subHero: "Unifiez voix et canaux digitaux sur une plateforme unique pour offrir une expérience client cohérente, fluide et mesurable à grande échelle.",
        trustBadge: "Tous les canaux sur une seule plateforme",
        proofPoint1: "Parcours client continus & contextualisés",
        proofPoint2: "Pilotage omnicanal en temps réel",
        cta: "Demander une Démo"
      },
      
      // PROBLEM VARIANTS
      problem_ops: {
        hero: "Réduisez les Coûts et Boostez la Productivité",
        subHero: "Arrêtez de naviguer à l'aveugle. Supervision et analyses en temps réel pour optimiser votre TMT.",
        proofPoint: "ROI de 301% sur 3 Ans",
        firstFeature: "Analyses en Temps Réel"
      },
      problem_cx: {
        hero: "Orchestrez des Parcours Clients Fluides",
        subHero: "Transformez votre CX avec une plateforme AI-first qui unifie Voix et Digital.",
        proofPoint: "Approuvé par 1 200+ Marques Mondiales",
        firstFeature: "Routage Omnicanal"
      },
      problem_automation: {
        hero: "Automatisez le Support 24/7 avec des Agents IA",
        subHero: "Déviez 30% des appels et gérez les pics de volume sans effort.",
        proofPoint: "Disponibilité 24/7",
        firstFeature: "Voix & Chatbots IA"
      },
      
      // COMPETITOR VARIANTS
      competitor_genesys: {
        hero: "L'Alternative Cloud N°1 à Genesys",
        subHero: "Même puissance entreprise sans la complexité ni le coût.",
        comparison: "Vocalcom vs Genesys : TCO 30% Plus Bas",
        cta: "Comparer les Plans de Migration"
      },
      competitor_five9: {
        hero: "La Meilleure Alternative Européenne à Five9",
        subHero: "Sécurisez vos données avec une vraie plateforme conforme RGPD.",
        comparison: "Vocalcom vs Five9 : Pas d'Entraînement IA sur Vos Données",
        cta: "Voir les Specs Sécurité"
      },
      competitor_talkdesk: {
        hero: "L'Alternative Fiable à Talkdesk",
        subHero: "Stabilité entreprise avec une UX moderne que vous allez adorer.",
        comparison: "Vocalcom vs Talkdesk : 99,99% de Disponibilité",
        cta: "Comparer le ROI"
      },
      competitor_odigo: {
        hero: "Une alternative moderne à Odigo pour les centres de contact d'entreprise",
        subHero: "Gagnez en flexibilité, en performance et en visibilité avec une plateforme omnicanale conçue pour évoluer — sans verrouillage éditeur.",
        comparison: "Vocalcom vs Odigo : Flexibilité & Intégrations Natives",
        proofPoint1: "Migration sécurisée",
        proofPoint2: "Déploiement rapide",
        proofPoint3: "ROI mesurable",
        cta: "Comparer Odigo et Vocalcom"
      },
      competitor_generic: {
        hero: "La Meilleure Alternative pour la CX Entreprise",
        subHero: "Passez à une plateforme sécurisée et évolutive avec un meilleur ROI.",
        comparison: "Pourquoi Changer ?",
        cta: "Demander une Démo"
      },
      
      // INTEGRATION VARIANTS
      integration_salesforce: {
        hero: "Intégration CTI Native Salesforce",
        subHero: "Boostez la productivité commerciale dans Lightning & Classic.",
        feature1: "Click-to-Dial Salesforce",
        trustLogo: "Partenaire Salesforce"
      },
      integration_dynamics: {
        hero: "Centre de Contact Certifié pour Dynamics 365",
        subHero: "Unifiez voix et données directement dans Microsoft Dynamics.",
        feature1: "Click-to-Dial Dynamics",
        trustLogo: "Partenaire Microsoft"
      },
      integration_hubspot: {
        hero: "Téléphonie Transparente pour HubSpot CRM",
        subHero: "Enregistrez appels et conversations automatiquement dans HubSpot.",
        feature1: "Click-to-Call HubSpot",
        trustLogo: "Partenaire HubSpot"
      },
      integration_zendesk: {
        hero: "Intégration Native Zendesk Support",
        subHero: "Gérez les appels directement depuis vos tickets Zendesk.",
        feature1: "Click-to-Dial Zendesk",
        trustLogo: "Partenaire Zendesk"
      },
      integration_generic: {
        hero: "Intégrations CRM Natives pour Votre Centre de Contact",
        subHero: "Connectez Vocalcom à vos outils préférés en quelques minutes.",
        feature1: "Click-to-Dial",
        trustLogo: "Intégrations CRM"
      },
      
      brand: {
        hero: "Plateforme de Centre de Contact Pilotée par l'IA",
        subHero: "Unifiez agents IA et équipes humaines sur tous les canaux pour augmenter l'efficacité, booster les revenus et garantir une performance CX mesurable à grande échelle.",
        cta: "Demander une Démo"
      }
    },
    es: {
      // CATEGORY VARIANTS (Spanish translations)
      category_enterprise: {
        hero: "Plataforma de Contact Center de Nivel Empresarial",
        subHero: "Escalable, segura y diseñada para equipos globales de alto volumen.",
        trustBadge: "ISO 27001 & SOC 2"
      },
      category_ccaas: {
        hero: "Solución CCaaS Empresarial: Contact Center Cloud, Omnicanal y Seguro",
        subHero: "Unifique llamadas y canales digitales en una plataforma CCaaS diseñada para escalar: rendimiento operativo, continuidad 24/7, monitoreo en tiempo real y ROI medible.",
        trustBadge: "Omnicanal (voz + digital)",
        proofPoint1: "Seguridad y cumplimiento empresarial (GDPR, ISO 27001)",
        proofPoint2: "Implementación rápida, ROI medible",
        cta: "Solicitar una Demo"
      },
      category_ai: {
        hero: "Contact Center IA: Automatice y Asista a Sus Equipos en Tiempo Real",
        subHero: "IA aplicada al servicio al cliente: agentes aumentados, solicitudes simples automatizadas, mejor rendimiento omnicanal — con ROI medible.",
        trustBadge: "ROI Medible (hasta 301% en 3 años)",
        proofPoint1: "Implementación rápida (payback ~6 meses)",
        proofPoint2: "Seguridad y cumplimiento (GDPR, ISO 27001)",
        cta: "Descubrir la Demo"
      },
      category_generic: {
        hero: "Software de contact center omnicanal para empresas",
        subHero: "Una plataforma única para gestionar llamadas, mensajes y recorridos de clientes: rendimiento operativo, monitoreo en tiempo real y continuidad de servicio a escala.",
        trustBadge: "Voz + digital en una sola plataforma",
        proofPoint1: "Monitoreo en tiempo real y reportes avanzados",
        proofPoint2: "Seguridad y cumplimiento empresarial",
        cta: "Solicitar una Demo"
      },
      category_omnichannel: {
        hero: "Contact center omnicanal para experiencias de cliente fluidas",
        subHero: "Unifique voz y canales digitales en una plataforma única para ofrecer una experiencia de cliente consistente, fluida y medible a escala.",
        trustBadge: "Todos los canales en una plataforma",
        proofPoint1: "Recorridos de cliente continuos y contextualizados",
        proofPoint2: "Monitoreo omnicanal en tiempo real",
        cta: "Solicitar una Demo"
      },
      problem_ops: {
        hero: "Reduzca Costos y Aumente la Productividad",
        subHero: "Deje de volar a ciegas. Supervisión y análisis en tiempo real para optimizar su TMO.",
        proofPoint: "ROI del 301% en 3 Años",
        firstFeature: "Análisis en Tiempo Real"
      },
      problem_cx: {
        hero: "Orqueste Experiencias de Cliente Fluidas",
        subHero: "Transforme su CX con una plataforma AI-first que unifica Voz y Digital.",
        proofPoint: "Confiado por 1,200+ Marcas Globales",
        firstFeature: "Enrutamiento Omnicanal"
      },
      problem_automation: {
        hero: "Automatice el Soporte 24/7 con Agentes de IA",
        subHero: "Desvíe el 30% de las llamadas y gestione picos de volumen sin esfuerzo.",
        proofPoint: "Disponibilidad 24/7",
        firstFeature: "Voz & Chatbots IA"
      },
      competitor_genesys: {
        hero: "La Alternativa Cloud N°1 a Genesys",
        subHero: "Mismo poder empresarial sin la complejidad ni el costo.",
        comparison: "Vocalcom vs Genesys: TCO 30% Menor",
        cta: "Comparar Planes de Migración"
      },
      competitor_five9: {
        hero: "La Mejor Alternativa Europea a Five9",
        subHero: "Asegure sus datos con una plataforma verdaderamente conforme GDPR.",
        comparison: "Vocalcom vs Five9: Sin Entrenamiento de IA con Sus Datos",
        cta: "Ver Especificaciones de Seguridad"
      },
      competitor_talkdesk: {
        hero: "La Alternativa Confiable a Talkdesk",
        subHero: "Estabilidad empresarial con la UX moderna que le encantará.",
        comparison: "Vocalcom vs Talkdesk: 99.99% Uptime",
        cta: "Comparar ROI"
      },
      competitor_odigo: {
        hero: "Una alternativa moderna a Odigo para contact centers empresariales",
        subHero: "Gane flexibilidad, rendimiento y visibilidad con una plataforma omnicanal diseñada para escalar — sin bloqueo de proveedor.",
        comparison: "Vocalcom vs Odigo: Flexibilidad e Integraciones Nativas",
        proofPoint1: "Migración segura",
        proofPoint2: "Implementación rápida",
        proofPoint3: "ROI medible",
        cta: "Comparar Odigo y Vocalcom"
      },
      competitor_generic: {
        hero: "La Mejor Alternativa para CX Empresarial",
        subHero: "Cambie a una plataforma segura y escalable con mejor ROI.",
        comparison: "¿Por Qué Cambiar?",
        cta: "Solicitar una Demo"
      },
      integration_salesforce: {
        hero: "Integración CTI Nativa con Salesforce",
        subHero: "Impulse la productividad de ventas dentro de Lightning & Classic.",
        feature1: "Click-to-Dial Salesforce",
        trustLogo: "Partner Salesforce"
      },
      integration_dynamics: {
        hero: "Contact Center Certificado para Dynamics 365",
        subHero: "Unifique voz y datos directamente dentro de Microsoft Dynamics.",
        feature1: "Click-to-Dial Dynamics",
        trustLogo: "Partner Microsoft"
      },
      integration_hubspot: {
        hero: "Telefonía Integrada para HubSpot CRM",
        subHero: "Registre llamadas y conversaciones automáticamente en HubSpot.",
        feature1: "Click-to-Call HubSpot",
        trustLogo: "Partner HubSpot"
      },
      integration_zendesk: {
        hero: "Integración Nativa con Zendesk Support",
        subHero: "Gestione llamadas directamente desde sus tickets Zendesk.",
        feature1: "Click-to-Dial Zendesk",
        trustLogo: "Partner Zendesk"
      },
      integration_generic: {
        hero: "Integraciones CRM Nativas para Su Contact Center",
        subHero: "Conecte Vocalcom a sus herramientas favoritas en minutos.",
        feature1: "Click-to-Dial",
        trustLogo: "Integraciones CRM"
      },
      brand: {
        hero: "Plataforma de Contact Center Impulsada por IA",
        subHero: "Unifique agentes de IA y equipos humanos en todos los canales para aumentar la eficiencia, impulsar los ingresos y ofrecer un rendimiento CX medible a escala.",
        cta: "Solicitar una Demo"
      }
    },
    pt: {
      // CATEGORY VARIANTS (Portuguese translations)
      category_enterprise: {
        hero: "Plataforma de Contact Center de Nível Empresarial",
        subHero: "Escalável, segura e projetada para equipes globais de alto volume.",
        trustBadge: "ISO 27001 & SOC 2"
      },
      category_ccaas: {
        hero: "Solução CCaaS Empresarial: Contact Center Cloud, Omnicanal e Seguro",
        subHero: "Unifique chamadas e canais digitais em uma plataforma CCaaS projetada para escalar: desempenho operacional, continuidade 24/7, monitoramento em tempo real e ROI mensurável.",
        trustBadge: "Omnicanal (voz + digital)",
        proofPoint1: "Segurança e conformidade empresarial (GDPR, ISO 27001)",
        proofPoint2: "Implantação rápida, ROI mensurável",
        cta: "Solicitar uma Demo"
      },
      category_ai: {
        hero: "Contact Center IA: Automatize e Assista Suas Equipes em Tempo Real",
        subHero: "IA aplicada ao atendimento ao cliente: agentes aumentados, solicitações simples automatizadas, melhor desempenho omnicanal — com ROI mensurável.",
        trustBadge: "ROI Mensurável (até 301% em 3 anos)",
        proofPoint1: "Implantação rápida (payback ~6 meses)",
        proofPoint2: "Segurança e conformidade (GDPR, ISO 27001)",
        cta: "Descobrir a Demo"
      },
      category_generic: {
        hero: "Software de contact center omnicanal para empresas",
        subHero: "Uma plataforma única para gerenciar chamadas, mensagens e jornadas de clientes: desempenho operacional, monitoramento em tempo real e continuidade de serviço em escala.",
        trustBadge: "Voz + digital em uma plataforma",
        proofPoint1: "Monitoramento em tempo real e relatórios avançados",
        proofPoint2: "Segurança e conformidade empresarial",
        cta: "Solicitar uma Demo"
      },
      category_omnichannel: {
        hero: "Contact center omnicanal para jornadas de cliente perfeitas",
        subHero: "Unifique voz e canais digitais em uma plataforma única para oferecer uma experiência de cliente consistente, fluida e mensurável em escala.",
        trustBadge: "Todos os canais em uma plataforma",
        proofPoint1: "Jornadas de cliente contínuas e contextualizadas",
        proofPoint2: "Monitoramento omnicanal em tempo real",
        cta: "Solicitar uma Demo"
      },
      problem_ops: {
        hero: "Reduza Custos e Aumente a Produtividade",
        subHero: "Pare de voar às cegas. Supervisão e análises em tempo real para otimizar seu TMA.",
        proofPoint: "ROI de 301% em 3 Anos",
        firstFeature: "Análises em Tempo Real"
      },
      problem_cx: {
        hero: "Orquestre Jornadas de Cliente Perfeitas",
        subHero: "Transforme sua CX com uma plataforma AI-first que unifica Voz e Digital.",
        proofPoint: "Confiado por 1.200+ Marcas Globais",
        firstFeature: "Roteamento Omnicanal"
      },
      problem_automation: {
        hero: "Automatize Suporte 24/7 com Agentes de IA",
        subHero: "Desvie 30% das chamadas e gerencie picos de volume sem esforço.",
        proofPoint: "Disponibilidade 24/7",
        firstFeature: "Voz & Chatbots IA"
      },
      competitor_genesys: {
        hero: "A Alternativa Cloud N°1 ao Genesys",
        subHero: "Mesmo poder empresarial sem a complexidade ou custo.",
        comparison: "Vocalcom vs Genesys: TCO 30% Menor",
        cta: "Comparar Planos de Migração"
      },
      competitor_five9: {
        hero: "A Melhor Alternativa Europeia ao Five9",
        subHero: "Proteja seus dados com uma plataforma verdadeiramente conforme GDPR.",
        comparison: "Vocalcom vs Five9: Sem Treinamento de IA com Seus Dados",
        cta: "Ver Especificações de Segurança"
      },
      competitor_talkdesk: {
        hero: "A Alternativa Confiável ao Talkdesk",
        subHero: "Estabilidade empresarial com a UX moderna que você vai amar.",
        comparison: "Vocalcom vs Talkdesk: 99.99% Uptime",
        cta: "Comparar ROI"
      },
      competitor_odigo: {
        hero: "Uma alternativa moderna ao Odigo para contact centers empresariais",
        subHero: "Ganhe flexibilidade, desempenho e visibilidade com uma plataforma omnicanal projetada para escalar — sem bloqueio de fornecedor.",
        comparison: "Vocalcom vs Odigo: Flexibilidade e Integrações Nativas",
        proofPoint1: "Migração segura",
        proofPoint2: "Implantação rápida",
        proofPoint3: "ROI mensurável",
        cta: "Comparar Odigo e Vocalcom"
      },
      competitor_generic: {
        hero: "A Melhor Alternativa para CX Empresarial",
        subHero: "Mude para uma plataforma segura e escalável com melhor ROI.",
        comparison: "Por Que Mudar?",
        cta: "Solicitar uma Demo"
      },
      integration_salesforce: {
        hero: "Integração CTI Nativa com Salesforce",
        subHero: "Impulsione a produtividade de vendas dentro do Lightning & Classic.",
        feature1: "Click-to-Dial Salesforce",
        trustLogo: "Parceiro Salesforce"
      },
      integration_dynamics: {
        hero: "Contact Center Certificado para Dynamics 365",
        subHero: "Unifique voz e dados diretamente dentro do Microsoft Dynamics.",
        feature1: "Click-to-Dial Dynamics",
        trustLogo: "Parceiro Microsoft"
      },
      integration_hubspot: {
        hero: "Telefonia Integrada para HubSpot CRM",
        subHero: "Registre chamadas e conversas automaticamente no HubSpot.",
        feature1: "Click-to-Call HubSpot",
        trustLogo: "Parceiro HubSpot"
      },
      integration_zendesk: {
        hero: "Integração Nativa com Zendesk Support",
        subHero: "Gerencie chamadas diretamente de seus tickets Zendesk.",
        feature1: "Click-to-Dial Zendesk",
        trustLogo: "Parceiro Zendesk"
      },
      integration_generic: {
        hero: "Integrações CRM Nativas para Seu Contact Center",
        subHero: "Conecte Vocalcom às suas ferramentas favoritas em minutos.",
        feature1: "Click-to-Dial",
        trustLogo: "Integrações CRM"
      },
      brand: {
        hero: "Plataforma de Contact Center Impulsionada por IA",
        subHero: "Unifique agentes de IA e equipes humanas em todos os canais para aumentar a eficiência, impulsionar receitas e entregar desempenho CX mensurável em escala.",
        cta: "Solicitar uma Demo"
      }
    }
  };

  const t = translations[lang];

  // Helper to select the right variant based on angle
  const selectVariant = (intent: IntentType): any => {
    if (intent === 'category') {
      if (angle === 'generic') return t.category_generic;
      if (angle === 'ai') return t.category_ai;
      if (angle === 'enterprise') return t.category_enterprise;
      if (angle === 'omnichannel') return t.category_omnichannel;
      return t.category_generic;
    }
    
    if (intent === 'problem') {
      if (angle === 'ops' || angle === 'reporting') return t.problem_ops;
      if (angle === 'cx' || angle === 'omnichannel' || angle === 'enterprise') return t.problem_cx;
      if (angle === 'automation' || angle === 'ai') return t.problem_automation;
      return t.problem_ops;
    }
    
    if (intent === 'competitor') {
      if (angle === 'genesys') return t.competitor_genesys;
      if (angle === 'five9') return t.competitor_five9;
      if (angle === 'talkdesk') return t.competitor_talkdesk;
      if (angle === 'odigo') return t.competitor_odigo;
      return t.competitor_generic;
    }
    
    if (intent === 'integration') {
      if (angle === 'salesforce') return t.integration_salesforce;
      if (angle === 'dynamics') return t.integration_dynamics;
      if (angle === 'hubspot') return t.integration_hubspot;
      if (angle === 'zendesk') return t.integration_zendesk;
      if (angle === 'zoho') return t.integration_generic;
      if (angle === 'crm') return t.integration_generic;
      return t.integration_generic;
    }
    
    return t.brand;
  };

  const variant = selectVariant(intent);
  
  return {
    hero: variant.hero,
    subHero: variant.subHero,
    cta: variant.cta || t.brand.cta,
    trustBadge: variant.trustBadge,
    proofPoint: variant.proofPoint,
    firstFeature: variant.firstFeature,
    comparison: variant.comparison,
    trustLogo: variant.trustLogo,
    feature1: variant.feature1,
    reassurance: variant.reassurance,
    valueReinforcement: variant.valueReinforcement,
    sectionOrder: ['hero', 'social-proof', 'platform', 'integrations', 'case-studies', 'security', 'cta']
  };
}

/**
 * Get section copy variants based on angle
 * Returns modular content blocks for different personas
 */
export function getSectionCopy(angle: AngleType) {
  const sections = {
    ops: {
      headline: "Operational Performance You Can Control — in Real Time",
      body: "Contact center performance shouldn't depend on guesswork or manual workarounds. Vocalcom gives operations teams full visibility and control across every channel — from real-time activity monitoring to predictive insights that anticipate workload, churn, and service degradation.",
      proofLine: "Customers reduce operational costs by up to €280k within the first year while improving service levels.",
      caseStudyIntro: "Operational Efficiency at Scale — Without Increasing Headcount",
      caseStudyDescription: "Discover how large contact centers reduced handling times, improved service levels, and regained operational control across all channels — while lowering costs and simplifying day-to-day operations."
    },
    cx: {
      headline: "Transform Customer Experience Across Every Touchpoint",
      body: "CX leaders need platforms that scale with ambition — not tools that limit strategy. Vocalcom enables consistent, personalized customer journeys across voice and digital channels, while giving teams the flexibility to evolve CX strategies without technical constraints.",
      proofLine: "Organizations using Vocalcom see measurable improvements in CSAT, NPS, and customer retention within months.",
      caseStudyIntro: "Transforming Customer Experience Across Every Touchpoint",
      caseStudyDescription: "See how CX leaders unified voice and digital journeys, improved customer satisfaction, and aligned customer experience with measurable business outcomes — without adding technical complexity."
    },
    ai: {
      headline: "Practical AI That Works With Your Teams — Not Instead of Them",
      body: "Vocalcom's AI is designed to augment human agents, not replace them. From instant lead follow-up to autonomous resolution of simple requests, AI agents collaborate with human teams to increase efficiency, improve accuracy, and unlock new revenue opportunities.",
      proofLine: "Customers generate up to +35% additional revenue through AI-driven automation and insights.",
      caseStudyIntro: "AI That Delivers Real Business Impact — Not Just Promises",
      caseStudyDescription: "Learn how organizations deployed AI agents alongside human teams to automate high-volume interactions, accelerate lead follow-up, and unlock new revenue opportunities with measurable ROI."
    }
  };

  // Return specific section or default to AI
  return sections[angle as keyof typeof sections] || sections.ai;
}

/**
 * Get form copy variants based on angle
 * Returns personalized form messaging for different personas
 */
export function getFormCopy(angle: AngleType) {
  const formVariants = {
    ops: {
      title: "See How to Improve Contact Center Performance",
      supportingLine: "Get a tailored demo focused on efficiency, reporting, and operational control.",
      buttonCTA: "See Performance Gains",
      trustMicrocopy: "Used by large operational teams across Europe and beyond."
    },
    cx: {
      title: "Discover How to Transform Your Customer Experience",
      supportingLine: "A personalized demo aligned with your CX strategy and business goals.",
      buttonCTA: "Explore CX Transformation",
      trustMicrocopy: "Trusted by CX leaders in highly regulated industries."
    },
    ai: {
      title: "See AI Agents in Action — Applied to Real CX Use Cases",
      supportingLine: "Learn how AI and human agents collaborate to deliver measurable ROI.",
      buttonCTA: "See AI in Action",
      trustMicrocopy: "AI designed for enterprises. Secure by design."
    },
    competitor: {
      title: "Compare Platforms & See the Difference",
      supportingLine: "Understand how Vocalcom compares to your current solution.",
      buttonCTA: "Compare Solutions",
      trustMicrocopy: "Seamless migration. No disruption to operations."
    }
  };

  // Map angles to form variants
  if (['ops', 'automation', 'reporting'].includes(angle)) return formVariants.ops;
  if (['cx', 'enterprise', 'omnichannel'].includes(angle)) return formVariants.cx;
  if (['genesys', 'five9', 'talkdesk', 'odigo'].includes(angle)) return formVariants.competitor;
  
  return formVariants.ai; // Default
}
