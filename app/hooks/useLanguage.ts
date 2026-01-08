'use client';

import { usePathname } from 'next/navigation';
import { landingFR } from '@/content/landing.fr';
import { landingEN } from '@/content/landing.en';
import { landingES } from '@/content/landing.es';
import { landingPT } from '@/content/landing.pt';

export function useLanguage() {
  const pathname = usePathname();
  
  // Detect language from URL path
  const isEnglish = pathname?.startsWith('/en');
  const isSpanish = pathname?.startsWith('/es');
  const isPortuguese = pathname?.startsWith('/pt');
  const isFrench = pathname?.startsWith('/fr');
  
  // Return appropriate content based on path
  if (isEnglish) {
    return { content: landingEN, locale: 'en' as const };
  }
  
  if (isSpanish) {
    return { content: landingES, locale: 'es' as const };
  }
  
  if (isPortuguese) {
    return { content: landingPT, locale: 'pt' as const };
  }
  
  // Default to French
  return { content: landingFR, locale: 'fr' as const };
}
