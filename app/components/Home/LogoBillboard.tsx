"use client";
import type { landingFR } from '@/content/landing.fr';

export default function LogoBillboard({ content }: { content: typeof landingFR.logoBillboard }) {
    return (
        <section className="py-12 bg-white">
            <style jsx>{`
                @keyframes infiniteScroll {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }
                .scroll-container {
                    animation: infiniteScroll 25s linear infinite;
                }
            `}</style>
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 shadow-lg shadow-violet-500/10 mb-4">
                        <span className="text-xs font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent uppercase tracking-wider">
                            {content.badge}
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{content.title}</h3>
                </div>
                <div className="relative bg-gradient-to-r from-slate-50 via-white to-slate-50 rounded-2xl py-8 shadow-xl shadow-slate-200/50 border border-slate-200/50 overflow-hidden">
                    {/* Enhanced spotlight with brand colors */}
                    <div className="absolute inset-0 pointer-events-none z-10">
                        <div className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent blur-2xl" 
                             style={{ animation: 'spotlight 10s linear infinite' }}>
                        </div>
                    </div>
                    {/* Decorative gradient borders */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                    
                    <div className="flex scroll-container will-change-transform">
                        {/* First set of logos */}
                        <div className="flex items-center gap-16 px-8 shrink-0">
                            <img src="/logos/Blancheporte.png" alt="Blancheporte" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/Konecta_logo.png" alt="Konecta" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/Logo_fcbarcelone.png" alt="FC Barcelona" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/Nexity_logo.png" alt="Nexity" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/SFR_Logo.png" alt="SFR" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/Stellantis_logo.png" alt="Stellantis" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/Vodafone_logo.png" alt="Vodafone" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/Volkswagen_logo.png" alt="Volkswagen" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/armatis.png" alt="Armatis" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/bnp paribas logo.png" alt="BNP Paribas" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/conentrix webhelp.png" alt="Concentrix Webhelp" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/engie_logo.png" alt="Engie" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/macdonald_logo.png" alt="McDonald's" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/renault.svg" alt="Renault" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                        </div>
                        {/* Duplicate set for seamless loop */}
                        <div className="flex items-center gap-16 px-8 shrink-0">
                            <img src="/logos/Blancheporte.png" alt="Blancheporte" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/Konecta_logo.png" alt="Konecta" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/Logo_fcbarcelone.png" alt="FC Barcelona" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/Nexity_logo.png" alt="Nexity" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/SFR_Logo.png" alt="SFR" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/Stellantis_logo.png" alt="Stellantis" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/Vodafone_logo.png" alt="Vodafone" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/Volkswagen_logo.png" alt="Volkswagen" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/armatis.png" alt="Armatis" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/bnp paribas logo.png" alt="BNP Paribas" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/conentrix webhelp.png" alt="Concentrix Webhelp" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/engie_logo.png" alt="Engie" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/macdonald_logo.png" alt="McDonald's" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                            <img src="/logos/renault.svg" alt="Renault" className="h-12 w-32 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
