'use client';

import DemoForm from '../forms/DemoForm';
import type { landingFR } from '@/content/landing.fr';

interface HeroHomeProps {
  content: typeof landingFR.hero & { bullets?: string[] };
  showHelpField?: boolean;
}

export default function HeroHome({ content, showHelpField = false }: HeroHomeProps) {

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
                            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                                {content.title}
                            </h1>
                            {content.bullets && content.bullets.length > 0 && (
                                <ul className="space-y-2">
                                    {content.bullets.map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-gray-700">
                                            <svg className="w-5 h-5 text-teal-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <p className="text-lg lg:text-xl text-gray-600 font-light leading-relaxed">{content.subtitle}</p>
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

                        {/* Award badges */}
                        <div className="flex items-center gap-6 pt-2">
                            <img
                                src="/assets/Logo_lp_es/2026-IT-POTY.png"
                                alt="TMC Internet Telephony Product of the Year 2026"
                                className="h-20 w-auto object-contain drop-shadow-sm"
                            />
                            <img
                                src="/assets/Logo_lp_es/Global%20100%20-%202026%20-%20VOCALCOM.png"
                                alt="Global 100 Winner 2026 – Vocalcom Best CCaaS Software"
                                className="h-20 w-auto object-contain drop-shadow-sm"
                            />
                        </div>

                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-2xl animate-slide-in w-full max-w-lg mx-auto lg:mr-0 border border-gray-100 scroll-mt-24" id="demo">
                        <div className="mb-6 text-center">
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {content.formSubtitle}
                            </p>
                        </div>
                        <DemoForm showHelpField={showHelpField} />
                    </div>
                </div>
            </section>

        </>
    );
}