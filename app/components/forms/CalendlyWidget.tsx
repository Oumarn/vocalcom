'use client';

import { useEffect, useRef } from 'react';

interface CalendlyWidgetProps {
  url: string;
  minHeight?: string;
  hideEventTypeDetails?: boolean;
  hideLandingPageDetails?: boolean;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
}

export default function CalendlyWidget({ 
  url, 
  minHeight = "630px",
  hideEventTypeDetails = true,
  hideLandingPageDetails = true,
  backgroundColor = "ffffff",
  textColor = "1f2937",
  primaryColor = "8b5cf6"
}: CalendlyWidgetProps) {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Only load script once
    if (scriptLoaded.current) return;
    
    // Check if script is already loaded
    if (document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      scriptLoaded.current = true;
      return;
    }

    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      scriptLoaded.current = true;
    };
    document.body.appendChild(script);

    return () => {
      // Don't remove script on unmount as it may be used by other components
    };
  }, []);

  // Build URL with customization parameters
  const buildCalendlyUrl = () => {
    const params = new URLSearchParams();
    if (hideEventTypeDetails) params.append('hide_event_type_details', '1');
    if (hideLandingPageDetails) params.append('hide_landing_page_details', '1');
    params.append('hide_gdpr_banner', '1');
    params.append('background_color', backgroundColor);
    params.append('text_color', textColor);
    params.append('primary_color', primaryColor);
    
    return `${url}?${params.toString()}`;
  };

  return (
    <div 
      className="calendly-inline-widget" 
      data-url={buildCalendlyUrl()}
      style={{ minWidth: '320px', height: minHeight }}
    />
  );
}
