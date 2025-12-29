"use client";

import { useEffect } from 'react';

export default function CookieConsent() {
  useEffect(() => {
    // @ts-ignore
    window.axeptioSettings = {
      clientId: "6916f5a3619a0d16460c7d6b",
      cookiesVersion: "19g6emhywuudv",
      googleConsentMode: {
        default: {
          analytics_storage: "denied",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          wait_for_update: 500
        }
      }
    };

    const script = document.createElement('script');
    script.src = '//static.axept.io/sdk.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}
