import type { landingFR } from '@/content/landing.fr';
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';

export default function AppHeader({ content }: { content: typeof landingFR.header }) {
    return (
        <>
            <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 transition-all duration-300 shadow-sm">
                <div className="max-w-7xl mx-auto px-3 md:px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <img src="/assets/logo-vocalcom.svg" alt="logo_vocalcom" className='w-36 md:w-44 lg:w-52 transition-transform group-hover:scale-105' />
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <a href="#demo" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1" style={{background: 'linear-gradient(90deg, #F6A02E, #f97316)'}}>
                            {content.cta}
                            <Icon path={mdiArrowRight} size={0.8} className="transition-transform" />
                        </a>
                    </div>

                    <div className="md:hidden flex items-center">
                        <a href="#demo" className="inline-flex items-center justify-center gap-1 px-2 py-1 text-[10px] text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 whitespace-nowrap" style={{background: 'linear-gradient(90deg, #F6A02E, #f97316)'}}>
                            {content.cta}
                            <Icon path={mdiArrowRight} size={0.5} className="transition-transform" />
                        </a>
                    </div>
                </div>
            </header>
        </>
    );
}