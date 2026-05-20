import type { landingES } from '@/content/landing.es';
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import Link from 'next/link';

export default function AppHeaderES({ content }: { content: typeof landingES.header }) {
    return (
        <>
            <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 transition-all duration-300 shadow-sm">
                <div className="max-w-7xl mx-auto px-3 md:px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <img src="/assets/logo-vocalcom.svg" alt="logo_vocalcom" className='w-36 md:w-44 lg:w-52 transition-transform group-hover:scale-105' />
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/es-es/solicita-una-demo"
                            className="
    inline-flex items-center justify-center gap-2
    px-6 py-2 text-sm
    text-white font-bold rounded-full

    transition-all duration-300 transform

    hover:-translate-y-0.5
    hover:shadow-[0_0_25px_rgba(246,160,46,0.6),0_0_35px_rgba(249,115,22,0.4)]

    active:scale-[0.97]
    active:translate-y-[1px]
    active:shadow-[0_0_25px_rgba(246,160,46,0.8),0_0_35px_rgba(249,115,22,0.6)]
    "
                            style={{ background: 'linear-gradient(90deg, #F6A02E, #f97316)' }}
                        >
                            {content.cta}
                            <Icon path={mdiArrowRight} size={0.8} className="transition-transform" />
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center">
                        <Link
                            href="/es-es/solicita-una-demo"
                            className="
    inline-flex items-center justify-center gap-1
    px-2.5 py-2 text-xs
    text-white font-semibold rounded-full whitespace-nowrap

    transition-all duration-300 transform

    hover:-translate-y-0.5
    hover:shadow-[0_0_25px_rgba(246,160,46,0.6),0_0_35px_rgba(249,115,22,0.4)]

    active:scale-[0.97]
    active:translate-y-[1px]
    active:shadow-[0_0_25px_rgba(246,160,46,0.8),0_0_35px_rgba(249,115,22,0.6)]
    "
                            style={{ background: 'linear-gradient(90deg, #F6A02E, #f97316)' }}
                        >
                            {content.cta}
                            <Icon path={mdiArrowRight} size={0.5} className="transition-transform" />
                        </Link>
                    </div>
                </div>
            </header>
        </>
    );
}
