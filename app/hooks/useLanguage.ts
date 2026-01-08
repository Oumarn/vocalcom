'use client';

import { usePathname } from 'next/navigation';
import { landingFR } from '@/content/landing.fr';
import { landingEN } from '@/content/landing.en';

export function useLanguage() {
  const pathname = usePathname();
  
  // Detect language from URL path
  const isEnglish = pathname?.startsWith('/en');
  const isFrench = pathname?.startsWith('/fr');
  
  // Return appropriate content based on path
  if (isEnglish) {
    return { content: landingEN, locale: 'en' as const };
  }
  
  // Default to French
  return { content: landingFR, locale: 'fr' as const };
}
