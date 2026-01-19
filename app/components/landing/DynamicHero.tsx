'use client';

import React, { useEffect, useState } from 'react';
import { resolveIntentFromUTM, resolveAngleFromUTM, getLandingPageVariant, type IntentType, type AngleType } from '@/lib/region-resolver';

interface DynamicHeroProps {
  defaultIntent?: IntentType;
  defaultAngle?: AngleType;
}

export default function DynamicHero({ defaultIntent = 'category', defaultAngle = 'ai' }: DynamicHeroProps) {
  const [mounted, setMounted] = useState(false);
  const [intent, setIntent] = useState<IntentType>(defaultIntent);
  const [angle, setAngle] = useState<AngleType>(defaultAngle);
  const [variant, setVariant] = useState(getLandingPageVariant(defaultIntent, defaultAngle));

  useEffect(() => {
    setMounted(true);
    
    // Only run on client
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    
    // Build UTM object
    const utm = {
      utm_campaign: params.get('utm_campaign'),
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_content: params.get('utm_content'),
      utm_term: params.get('utm_term'),
      intent: params.get('intent'),
      angle: params.get('angle'),
      lang: (params.get('lang') || 'en') as 'fr' | 'en' | 'es' | 'pt'
    };

    // Detect intent and angle
    const detectedIntent = resolveIntentFromUTM(utm);
    const detectedAngle = resolveAngleFromUTM(utm);

    console.log('🎯 Landing Page Personalization:', {
      intent: detectedIntent,
      angle: detectedAngle,
      utmCampaign: utm.utm_campaign,
      utmContent: utm.utm_content,
      utmTerm: utm.utm_term
    });

    setIntent(detectedIntent);
    setAngle(detectedAngle);
    setVariant(getLandingPageVariant(detectedIntent, detectedAngle));
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
      <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
            {variant.hero}
          </h1>

          {/* Sub-headline */}
          <p className="text-xl sm:text-2xl text-blue-100 mb-8 leading-relaxed animate-fade-in-delay">
            {variant.subHero}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="#demo-form"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-white text-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {variant.cta}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            
            <a
              href="#platform"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Learn More
            </a>
          </div>

          {/* Reassurance Line (for competitor/integration variants) */}
          {(intent === 'competitor' && variant.reassurance) && (
            <p className="text-sm text-blue-200 animate-fade-in-delay-2">
              {variant.reassurance}
            </p>
          )}

          {(intent === 'integration' && variant.valueReinforcement) && (
            <p className="text-sm text-blue-200 animate-fade-in-delay-2">
              {variant.valueReinforcement}
            </p>
          )}
        </div>
      </div>

      {/* Debug Info (only in development) */}
      {mounted && process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-2 rounded backdrop-blur-sm">
          <div>Intent: <strong>{intent}</strong></div>
          <div>Angle: <strong>{angle}</strong></div>
        </div>
      )}
    </section>
  );
}
