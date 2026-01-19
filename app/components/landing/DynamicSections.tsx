'use client';

import React, { useEffect, useState } from 'react';
import { resolveIntentFromUTM, resolveAngleFromUTM, getSectionCopy, type IntentType, type AngleType } from '@/lib/region-resolver';

interface DynamicSectionsProps {
  defaultIntent?: IntentType;
  defaultAngle?: AngleType;
}

export default function DynamicSections({ defaultIntent = 'category', defaultAngle = 'ai' }: DynamicSectionsProps) {
  const [mounted, setMounted] = useState(false);
  const [angle, setAngle] = useState<AngleType>(defaultAngle);
  const [sectionContent, setSectionContent] = useState(getSectionCopy(defaultAngle));

  useEffect(() => {
    setMounted(true);
    
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    
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

    const detectedAngle = resolveAngleFromUTM(utm);
    setAngle(detectedAngle);
    setSectionContent(getSectionCopy(detectedAngle));
  }, []);

  return (
    <section id="platform" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {sectionContent.headline}
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {sectionContent.body}
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r">
              <p className="text-blue-900 font-medium">
                {sectionContent.proofLine}
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg shadow-xl flex items-center justify-center">
              <div className="text-gray-400 text-lg">Platform Screenshot/Video</div>
            </div>
          </div>
        </div>

        {/* Case Study Section */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {sectionContent.caseStudyIntro}
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {sectionContent.caseStudyDescription}
            </p>
          </div>

          {/* Case Study Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { metric: '€280k', label: 'Cost Savings (Year 1)', icon: '💰' },
              { metric: '35%', label: 'Revenue Increase', icon: '📈' },
              { metric: '40%', label: 'Faster Resolution', icon: '⚡' }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md text-center">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.metric}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
