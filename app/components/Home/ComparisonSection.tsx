"use client";
import Icon from '@mdi/react';
import { mdiCheck, mdiClose } from '@mdi/js';
import type { landingFR } from '@/content/landing.fr';

type ComparisonContent = {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  vocalcom: string;
  legacy: string;
  features: Array<{
    feature: string;
    vocalcom: boolean | string;
    legacy: boolean | string;
  }>;
  cta: {
    title: string;
    button: string;
  };
};

export default function ComparisonSection({ content }: { content: ComparisonContent }) {
    return (
        <>
            <section className="py-12 lg:py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-up">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-orange-50 text-purple-700 rounded-full px-5 py-2.5 text-sm font-bold mb-6 border border-purple-200">
                            <span>{content.badge}</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                            {content.title}
                        </h2>
                        <p className="text-lg text-gray-600 mb-3">
                            {content.subtitle}
                        </p>
                        <p className="text-base text-gray-600 leading-relaxed">
                            {content.description}
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto overflow-x-auto">
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden min-w-[600px]">
                            {/* Header */}
                            <div className="grid grid-cols-3 gap-4 md:gap-6 p-4 md:p-6 border-b-2 border-gray-200" style={{background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.1))'}}>
                                <div className="text-center">
                                    <p className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wide">Feature</p>
                                </div>
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center px-3 md:px-4 py-1.5 md:py-2 text-white rounded-full font-bold text-xs md:text-sm shadow-lg" style={{background: 'linear-gradient(193deg, #7c3aed, #8b5cf6 25%, #a855f7 50%, #c084fc 75%, #d8b4fe)'}}>
                                        {content.vocalcom}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide">{content.legacy}</p>
                                </div>
                            </div>

                            {/* Comparison rows */}
                            <div className="divide-y divide-gray-200">
                                {content.features.map((row, idx) => (
                                    <div key={idx} className="grid grid-cols-3 gap-4 md:gap-6 p-4 md:p-6 hover:bg-blue-50/30 transition-colors">
                                        <div className="flex items-center">
                                            <p className="text-sm md:text-base text-gray-700 font-medium">{row.feature}</p>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            {typeof row.vocalcom === 'boolean' ? (
                                                row.vocalcom ? (
                                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-100 flex items-center justify-center">
                                                        <Icon path={mdiCheck} size={0.8} className="md:w-6 md:h-6 text-green-600" />
                                                    </div>
                                                ) : (
                                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-100 flex items-center justify-center">
                                                        <Icon path={mdiClose} size={0.8} className="md:w-6 md:h-6 text-red-600" />
                                                    </div>
                                                )
                                            ) : (
                                                <span className="text-sm md:text-base text-blue-600 font-bold">{row.vocalcom}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-center">
                                            {typeof row.legacy === 'boolean' ? (
                                                row.legacy ? (
                                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-100 flex items-center justify-center">
                                                        <Icon path={mdiCheck} size={0.8} className="md:w-6 md:h-6 text-green-600" />
                                                    </div>
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                                        <Icon path={mdiClose} size={1} className="text-red-600" />
                                                    </div>
                                                )
                                            ) : (
                                                <span className="text-gray-500 font-medium text-sm">{row.legacy}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="p-8 text-center border-t-2 border-gray-200" style={{background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.1))'}}>
                                <p className="text-gray-700 font-semibold mb-4">{content.cta.title}</p>
                                <a href="#demo" className="inline-flex items-center gap-2 px-6 py-3 text-white font-bold rounded-full hover:shadow-xl transition-all transform hover:-translate-y-1" style={{background: 'linear-gradient(193deg, #7c3aed, #8b5cf6 25%, #a855f7 50%, #c084fc 75%, #d8b4fe)'}}>
                                    {content.cta.button}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
