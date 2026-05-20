'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    axeptioSettings?: {
      clientId: string;
      cookiesVersion: string;
    };
  }
}

function resolveCookiesVersion(pathname: string | null): string {
  if (!pathname) return 'vocalcom-fr';
  if (pathname.startsWith('/es-es')) return 'vocalcom-es';
  if (pathname.startsWith('/en')) return 'vocalcom-en';
  if (pathname.startsWith('/pt')) return 'vocalcom-pt';
  return 'vocalcom-fr';
}

export default function AxeptioConsent() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.axeptioSettings = {
      clientId: "6916f5a3619a0d16460c7d6b",
      cookiesVersion: resolveCookiesVersion(pathname),
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
