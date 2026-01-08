"use client";
import Icon from '@mdi/react';
import { mdiArrowRight, mdiCheckCircle, mdiClockOutline } from '@mdi/js';
import type { landingFR } from '@/content/landing.fr';

export default function FinalCta({ content }: { content: typeof landingFR.finalCta }) {
    return (
        <>
            <section className="py-16 relative overflow-hidden bg-white">
                <div className="absolute inset-0 z-0 opacity-5" style={{background: 'linear-gradient(193deg, #7c3aed, #8b5cf6 25%, #a855f7 50%, #c084fc 75%, #d8b4fe)'}}></div>
                {/* Animated background */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
                    <div className="absolute top-20 right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-fade-up">
                    <div className="inline-flex items-center gap-2 text-2xl mb-4">
                        <span>{content.emoji}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
                        {content.title}
                    </h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                        {content.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <a href="#demo" className="group inline-flex items-center gap-3 justify-center px-8 py-5 text-lg font-bold bg-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105" style={{color: '#8b5cf6'}} onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(212deg, #7c3aed, #8b5cf6 50%, #a855f7)'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#8b5cf6'; }}>
                            {content.button}
                            <Icon path={mdiArrowRight} size={1} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    {/* Trust indicators */}
                    <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                        {content.trust.map((item, index) => (
                            <div key={index} className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                                <Icon path={mdiCheckCircle} size={1.2} className="mx-auto mb-3" style={{color: '#8b5cf6'}} />
                                <p className="text-gray-900 font-semibold text-sm">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}