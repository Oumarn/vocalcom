'use client';

import { useEffect } from 'react';

export default function AxeptioConsent() {
  useEffect(() => {
    // Only load Axeptio after React hydration is complete
    if (typeof window === 'undefined') return;

    // Set Axeptio configuration
    window.axeptioSettings = {
      clientId: "6916f5a3619a0d16460c7d6b",
      cookiesVersion: "vocalcom-fr"
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
