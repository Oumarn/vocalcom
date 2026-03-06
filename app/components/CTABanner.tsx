'use client';

import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';

export default function CTABanner({ text, ctaText, ctaUrl }: { text: string; ctaText: string; ctaUrl: string }) {
    return (
        <section className="py-12 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white text-center md:text-left">
                        {text}
                    </h2>
                    <a 
                        href={ctaUrl}
                        className="inline-flex items-center justify-center gap-2 px-4 sm:px-8 py-2 sm:py-4 text-xs sm:text-sm text-white font-bold rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap"
                        style={{background: 'linear-gradient(90deg, #F6A02E, #f97316)'}}
                    >
                        {ctaText}
                        <Icon path={mdiArrowRight} size={0.8} className="transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
}
