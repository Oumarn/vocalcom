import Icon from '@mdi/react';
import { mdiMicrophone, mdiPhone } from '@mdi/js';
import Link from 'next/link';
import type { landingFR } from '@/content/landing.fr';

export default function AppFooter({ content }: { content: typeof landingFR.footer }) {
    return (
        <>
            <footer className="bg-slate-800 py-8 lg:py-6 text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
                        <p className="text-xs">{content.copyright}</p>
                        <div className="flex flex-col md:flex-row w-full md:w-auto items-center gap-6">
                            <Link target="_blank" href="https://www.vocalcom.com/fr/mentions-legales/" className="text-xs hover:underline hover:duration-300 hover:ease-linear hover:text-stone-300 hover:text-vocal-primary">{content.links.legal}</Link>
                            <Link target="_blank" href="https://www.vocalcom.com/fr/politique-de-confidentialite/" className="text-xs hover:underline hover:duration-300 hover:ease-linear hover:text-stone-300 hover:text-vocal-primary">{content.links.privacy}</Link>
                            <Link target="_blank" href="https://www.vocalcom.com/fr/politique-cookies/" className="text-xs hover:underline hover:duration-300 hover:ease-linear hover:text-stone-300 hover:text-vocal-primary">{content.links.cookies}</Link>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
}