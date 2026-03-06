"use client";
import Image from 'next/image';
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import type { landingFR } from '@/content/landing.fr';

type ComparisonContent = {
  badge: string;
  title: string;
  subtitle?: string;
  description: string;
  cta: {
    button: string;
    url: string;
  };
};

export default function ComparisonSection({ content }: { content: ComparisonContent }) {
    return (
        <>
            <section className="py-12 lg:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Contenu à gauche */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-orange-50 text-purple-700 rounded-full px-5 py-2.5 text-sm font-bold border border-purple-200">
                                <span>{content.badge}</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                                {content.title}
                            </h2>
                            {content.subtitle && (
                                <p className="text-xl text-gray-700 font-medium" dangerouslySetInnerHTML={{ __html: content.subtitle }} />
                            )}
                            <p className="text-lg text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.description }} />
                            <div className="pt-4">
                                <a 
                                    href={content.cta.url} 
                                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-8 py-2 sm:py-4 text-xs sm:text-sm text-white font-bold rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" 
                                    style={{background: 'linear-gradient(90deg, #F6A02E, #f97316)'}}
                                >
                                    {content.cta.button}
                                    <Icon path={mdiArrowRight} size={0.8} className="transition-transform group-hover:translate-x-1" />
                                </a>
                            </div>
                        </div>
                        
                        {/* Image à droite */}
                        <div className="hidden lg:flex items-center justify-center">
                            <Image 
                                src="/comparison-image.jpeg" 
                                alt="Vocalcom Service Client" 
                                width={450}
                                height={600}
                                className="rounded-3xl shadow-2xl w-full h-auto object-cover max-w-md"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
