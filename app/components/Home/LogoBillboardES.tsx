"use client";
import type { landingFR } from '@/content/landing.fr';

const logos = [
    { src: '/assets/Logo_lp_es/Allianz.svg.png', alt: 'Allianz' },
    { src: '/assets/Logo_lp_es/Diagnostico-Maipu-logo-1-1.webp', alt: 'Diagnóstico Maipú' },
    { src: '/assets/Logo_lp_es/FC_Barcelona_(crest).svg.png', alt: 'FC Barcelona' },
    { src: '/assets/Logo_lp_es/Fravega-Logo-Vector.svg-.png', alt: 'Fravega' },
    { src: '/assets/Logo_lp_es/GTMOTIVE-DARK-LOGO.webp', alt: 'GT Motive' },
    { src: '/assets/Logo_lp_es/Logo-con-blanco-1.svg', alt: 'Logo Blanco', imgClassName: 'brightness-0' },
    { src: '/assets/Logo_lp_es/Logo_Orange.webp', alt: 'Orange' },
    { src: '/assets/Logo_lp_es/Logo_Unicaja.svg.png', alt: 'Unicaja' },
    { src: '/assets/Logo_lp_es/Renault_1992-2004_logo.svg', alt: 'Renault' },
    { src: '/assets/Logo_lp_es/STELLANTIS-and-you-logo-blue.png', alt: 'Stellantis' },
    { src: '/assets/Logo_lp_es/Teleperformance_logo.png', alt: 'Teleperformance' },
    { src: '/assets/Logo_lp_es/Zurich_Insurance_Group_logo.svg.png', alt: 'Zurich' },
    { src: '/assets/Logo_lp_es/claro-text-logo-png-701751694713050dkbnxfts7c.png', alt: 'Claro' },
    { src: '/assets/Logo_lp_es/jofer-logo-empresas-cajamar.png', alt: 'Jofer' },
    { src: '/assets/Logo_lp_es/logo_Konecta.png', alt: 'Konecta' },
];

const logoSlotClass = 'h-20 w-36 flex items-center justify-center flex-shrink-0';
const logoImageClass = 'h-12 w-28 object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110';

export default function LogoBillboardES({ content }: { content: typeof landingFR.logoBillboard }) {
    return (
        <section className="py-12 bg-white">
            <style jsx>{`
                @keyframes infiniteScroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .scroll-container {
                    animation: infiniteScroll 30s linear infinite;
                    width: max-content;
                }
                @media (prefers-reduced-motion: reduce) {
                    .scroll-container {
                        animation: none;
                    }
                }
            `}</style>
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 shadow-lg shadow-violet-500/10 mb-4">
                        <span className="text-xs font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent uppercase tracking-wider">
                            {content.badge}
                        </span>
                    </div>
                    {content.title && <h3 className="text-2xl font-bold text-gray-900">{content.title}</h3>}
                </div>
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
                    {content.leftText && (
                        <div className="w-full lg:w-96 flex-shrink-0">
                            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
                                <div className="whitespace-nowrap">{content.leftText}</div>
                                {content.leftTextLine2 && <div>{content.leftTextLine2}</div>}
                            </h3>
                        </div>
                    )}
                    <div className="w-full flex-1 min-w-0">
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
                                <div className="flex items-center gap-6 px-4 shrink-0">
                                    {logos.map((logo) => (
                                        <div key={`first-${logo.src}`} className={logoSlotClass}>
                                            <img
                                                src={logo.src}
                                                alt={logo.alt}
                                                className={`${logoImageClass} ${logo.imgClassName ?? ''}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {/* Duplicate set for seamless loop */}
                                <div className="flex items-center gap-6 px-4 shrink-0">
                                    {logos.map((logo) => (
                                        <div key={`second-${logo.src}`} className={logoSlotClass}>
                                            <img
                                                src={logo.src}
                                                alt={logo.alt}
                                                className={`${logoImageClass} ${logo.imgClassName ?? ''}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
