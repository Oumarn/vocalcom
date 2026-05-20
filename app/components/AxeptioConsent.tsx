'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type GoogleConsentMode = {
  default: {
    analytics_storage: 'denied' | 'granted';
    ad_storage: 'denied' | 'granted';
    ad_user_data: 'denied' | 'granted';
    ad_personalization: 'denied' | 'granted';
    wait_for_update: number;
  };
};

declare global {
  interface Window {
    axeptioSettings?: {
      clientId: string;
      cookiesVersion: string;
      googleConsentMode?: GoogleConsentMode;
    };
  }
}

const ES_COOKIES_VERSION = '10f81a03-9fa8-41af-b82d-abd3a67afcee';

function resolveCookiesVersion(pathname: string | null): string {
  if (!pathname) return 'vocalcom-fr';
  if (pathname.startsWith('/es-es')) return ES_COOKIES_VERSION;
  if (pathname.startsWith('/en')) return 'vocalcom-en';
  if (pathname.startsWith('/pt')) return 'vocalcom-pt';
  return 'vocalcom-fr';
}

export default function AxeptioConsent() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cookiesVersion = resolveCookiesVersion(pathname);
    const isSpanish = cookiesVersion === ES_COOKIES_VERSION;

    window.axeptioSettings = {
      clientId: "6916f5a3619a0d16460c7d6b",
      cookiesVersion,
      ...(isSpanish && {
        googleConsentMode: {
          default: {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500,
          },
        },
      }),
    };

    // Load Axeptio script
    const script = document.createElement('script');
    script.src = 'https://static.axept.io/sdk.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
      const existingScript = document.querySelector('script[src="https://static.axept.io/sdk.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything
}
