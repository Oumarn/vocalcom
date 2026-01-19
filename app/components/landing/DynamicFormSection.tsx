'use client';

import React, { useEffect, useState } from 'react';
import { resolveAngleFromUTM, getFormCopy, type AngleType } from '@/lib/region-resolver';
import DemoForm from '../forms/DemoForm';

interface DynamicFormSectionProps {
  defaultFormTitle?: string;
  defaultAngle?: AngleType;
}

export default function DynamicFormSection({ 
  defaultFormTitle = "Request a Demo", 
  defaultAngle = 'ai' 
}: DynamicFormSectionProps) {
  const [mounted, setMounted] = useState(false);
  const [formCopy, setFormCopy] = useState(getFormCopy(defaultAngle));

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
    setFormCopy(getFormCopy(detectedAngle));
    
    console.log('📝 Form copy personalized for angle:', detectedAngle);
  }, []);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl animate-slide-in w-full max-w-lg mx-auto lg:mr-0 border border-gray-100" id="demo-form">
      <div className="mb-6 text-center">
        <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-gray-900 mb-2">
          {formCopy.title}
        </h3>
        <p className="text-sm text-gray-600">
          {formCopy.supportingLine}
        </p>
      </div>

      <DemoForm customButtonText={formCopy.buttonCTA} />

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          {formCopy.trustMicrocopy}
        </p>
      </div>
    </div>
  );
}
