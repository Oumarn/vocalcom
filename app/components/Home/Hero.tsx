'use client';

import { useEffect, useState } from 'react';
import DemoForm from '../forms/DemoForm';
import type { landingFR } from '@/content/landing.fr';
import { resolveIntentFromUTM, resolveAngleFromUTM, getLandingPageVariant, type IntentType, type AngleType } from '@/lib/region-resolver';

export default function HeroHome({ content }: { content: typeof landingFR.hero }) {
    const [mounted, setMounted] = useState(false);
    const [heroContent, setHeroContent] = useState({
        title: content.title,
        subtitle: content.subtitle,
        formTitle: content.formTitle
    });

    useEffect(() => {
        setMounted(true);
        
        if (typeof window === 'undefined') return;

        const params = new URLSearchParams(window.location.search);
        
        // Detect language from URL path (e.g., /fr, /en, /es, /pt)
        const pathSegments = window.location.pathname.split('/').filter(Boolean);
        const langFromPath = pathSegments[0];
        const detectedLang = (['fr', 'en', 'es', 'pt'].includes(langFromPath) ? langFromPath : 'en') as 'fr' | 'en' | 'es' | 'pt';
        
        // Build UTM object
        const utm = {
            utm_campaign: params.get('utm_campaign'),
            utm_source: params.get('utm_source'),
            utm_medium: params.get('utm_medium'),
            utm_content: params.get('utm_content'),
            utm_term: params.get('utm_term'),
            intent: params.get('intent'),
            angle: params.get('angle'),
            lang: detectedLang
        };

        // Detect intent and angle
        const detectedIntent = resolveIntentFromUTM(utm);
        const detectedAngle = resolveAngleFromUTM(utm);
        
        // Get variant with language and update content
        const variant = getLandingPageVariant(detectedIntent, detectedAngle, detectedLang);
        
        setHeroContent({
            title: variant.hero,
            subtitle: variant.subHero,
            formTitle: content.formTitle // Keep original form title for now
        });

        console.log('🎯 Hero Personalization:', {
            intent: detectedIntent,
            angle: detectedAngle,
            lang: detectedLang,
            hero: variant.hero
        });
    }, [content]);

    return (
        <>
            <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden bg-gradient-to-br from-white via-violet-50/30 to-purple-50/20">
                
                {/* Image Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="/hero.webp"
                        alt="AI Background"
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                    {/* Overlay with brand gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-100/40 via-purple-50/30 to-violet-50/20"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    <div className="space-y-8 animate-fade-up">
                        {/* Trust badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 shadow-lg shadow-violet-500/20">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 animate-pulse"></div>
                            <span className="text-sm font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                                {content.badge}
                            </span>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] text-gray-900">
                                {heroContent.title}
                            </h1>
                            <p className="text-lg lg:text-xl text-gray-600 font-light leading-relaxed">{heroContent.subtitle}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-2 pt-4">
                            <div className="relative overflow-hidden bg-white border-2 border-[#24B7C3] rounded-lg p-3 text-center hover:shadow-lg hover:scale-105 transition-all duration-300">
                                <div className="absolute top-0 right-0 w-12 h-12 bg-[#24B7C3] opacity-10 rounded-full -mr-6 -mt-6"></div>
                                <div className="text-2xl font-bold text-[#24B7C3] mb-1">{content.stats.roi.value}</div>
                                <div className="text-xs text-gray-600 font-medium">{content.stats.roi.label}</div>
                            </div>
                            <div className="relative overflow-hidden bg-white border-2 border-[#F6A02E] rounded-lg p-3 text-center hover:shadow-lg hover:scale-105 transition-all duration-300">
                                <div className="absolute top-0 right-0 w-12 h-12 bg-[#F6A02E] opacity-10 rounded-full -mr-6 -mt-6"></div>
                                <div className="text-2xl font-bold text-[#F6A02E] mb-1">{content.stats.payback.value}</div>
                                <div className="text-xs text-gray-600 font-medium">{content.stats.payback.label}</div>
                            </div>
                            <div className="relative overflow-hidden bg-white border-2 border-[#934292] rounded-lg p-3 text-center hover:shadow-lg hover:scale-105 transition-all duration-300">
                                <div className="absolute top-0 right-0 w-12 h-12 bg-[#934292] opacity-10 rounded-full -mr-6 -mt-6"></div>
                                <div className="text-2xl font-bold text-[#934292] mb-1">{content.stats.interactions.value}</div>
                                <div className="text-xs text-gray-600 font-medium">{content.stats.interactions.label}</div>
                            </div>
                        </div>

                        
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-2xl animate-slide-in w-full max-w-lg mx-auto lg:mr-0 border border-gray-100" id="demo">
                        <div className="mb-8">
                            <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-center text-gray-900">{heroContent.formTitle}</h3>
                        </div>

                        <DemoForm />
                    </div>
                </div>
            </section>

        </>
    );
}