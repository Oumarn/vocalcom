'use client';

import type { landingFR } from '@/content/landing.fr';
import { Raleway } from 'next/font/google';
import DemoFormSolicita from '../forms/DemoFormSolicita';

interface HeroEsSolicitaProps {
    content: typeof landingFR.hero & { bullets?: string[] };
    showHelpField?: boolean;
}

const raleway = Raleway({
    variable: "--font-raleway",
    subsets: ["latin"],
});

export default function HeroEsSolicita({ content }: HeroEsSolicitaProps) {

    return (
        <>
            <section className="relative pt-32 px-6 pb-16 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <img src="/hero.webp" alt="AI Background" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-[#f0f3ff]"></div>
                </div>

                <div className="relative grid grid-cols-1 lg:items-start lg:grid-cols-2 gap-6 lg:gap-12 max-w-7xl mx-auto z-10 text-[#333]">
                    <div className="flex flex-col gap-2">
                        <h1
                            className={`${raleway.className} text-lg lg:text-sm uppercase font-bold text-[#f97316] tracking-tight leading-[1.05]`}
                        >
                           reserva una demo
                        </h1>
                        <article className="flex flex-col gap-2">
                            <h2 className={`${raleway.className} text-2xl lg:text-3xl font-bold`}>Descubre cómo transformar tu negocio con Vocalcom</h2>
                            <p className={`${raleway.className} text-base font-normal`}>Te mostramos en detalle nuestra plataforma y cómo las diferentes soluciones pueden mejorar la experiencia de tus agentes e incrementar tus resultados, integrándose fácilmente con tus procesos y sistemas.</p>
                        </article>
                    </div>
                    <div className="bg-white rounded-3xl p-8 shadow-2xl animate-slide-in w-full max-w-lg mx-auto lg:mr-0 border border-gray-100 scroll-mt-24" id="demo">
                        <DemoFormSolicita />
                    </div>
                </div>
            </section>

        </>
    );
}