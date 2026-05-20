"use client";
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import type { landingES } from '@/content/landing.es';
import Link from 'next/link';
import { Raleway } from 'next/font/google';

const raleway = Raleway({
    variable: "--font-raleway",
    subsets: ["latin"],
});

export default function Cta({ content }: { content: typeof landingES.finalCta }) {
    return (
        <>
            <section className="pt-14 pb-16 relative overflow-hidden bg-white">
                <div className="absolute inset-0 z-0 opacity-5" style={{ background: 'linear-gradient(193deg, #7c3aed, #8b5cf6 25%, #a855f7 50%, #c084fc 75%, #d8b4fe)' }}></div>
                {/* Animated background */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
                    <div className="absolute top-20 right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 text-center animate-fade-up font-normal text-[#333]">
                    <h2 className={`${raleway.className} text-3xl lg:text-4xl tracking-tight mb-4`}>
                        {content.title}
                    </h2>
                    <p className={`${raleway.className} text-xl mb-6 max-w-3xl mx-auto leading-relaxed`}>
                        {content.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/es-es/solicita-una-demo"
                            className="
    inline-flex items-center justify-center gap-2
    px-4 sm:px-8 py-2 sm:py-4
    text-xs sm:text-sm
    text-white font-bold rounded-full

    transition-all duration-300 transform

    hover:-translate-y-0.5
    hover:shadow-[0_0_25px_rgba(246,160,46,0.6),0_0_35px_rgba(249,115,22,0.4)]

    active:scale-[0.97]
    active:translate-y-[1px]
    active:shadow-[0_0_25px_rgba(246,160,46,0.8),0_0_35px_rgba(249,115,22,0.6)]
    "
                            style={{
                                background: 'linear-gradient(90deg, #F6A02E, #f97316)'
                            }}
                        >
                            {content.button}
                            <Icon path={mdiArrowRight} size={1} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}