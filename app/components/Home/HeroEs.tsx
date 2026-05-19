'use client';

import { mdiCheck } from '@mdi/js';
import type { landingFR } from '@/content/landing.fr';
import Icon from '@mdi/react';
import NewDemoFormEs from '../forms/NewDemoFormEs';
import { Raleway } from 'next/font/google';

interface HeroHomeProps {
    content: typeof landingFR.hero & { bullets?: string[] };
    showHelpField?: boolean;
}

const raleway = Raleway({
    variable: "--font-raleway",
    subsets: ["latin"],
});

export default function HeroEsHome({ content }: HeroHomeProps) {

    return (
        <>
            <section className="relative pt-32 px-6 pb-16 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <img src="/hero.webp" alt="AI Background" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-[#f0f3ff]"></div>
                </div>

                <div className="relative grid lg:grid-cols-2 gap-6 lg:gap-12 max-w-7xl mx-auto z-10 text-[#333] items-center">
                    <div className="flex flex-col gap-6">
                        <h1
                            className={`${raleway.className} text-5xl lg:text-6xl font-extralight tracking-tight leading-[1.05]`}
                        >
                            {content.title}
                        </h1>
                        <article className="flex flex-col gap-6">
                            <h2 className={`${raleway.className} text-2xl font-normal`}>{content.subtitle}</h2>
                            {content.bullets && content.bullets.length > 0 && (
                                <ul className="space-y-2 text-md lg:text-[18px]">
                                    {content.bullets.map((item, i) => (
                                        <li key={i} className={`${raleway.className} flex items-start gap-2 text-gray-900`}>
                                            <span className="mt-1 bg-purple-600 p-1 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center"><Icon size={4} path={mdiCheck} className="text-white" /></span>
                                            <span className="font-normal">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </article>
                    </div>
                    <div className="w-full">
                        <NewDemoFormEs />
                    </div>
                </div>
            </section>

        </>
    );
}