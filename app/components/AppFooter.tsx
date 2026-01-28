import Icon from '@mdi/react';
import { mdiMicrophone, mdiPhone } from '@mdi/js';
import Link from 'next/link';
import type { landingFR } from '@/content/landing.fr';

export default function AppFooter({ content }: { content: typeof landingFR.footer }) {
    return (
        <>
            <footer className="bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12 lg:py-16 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        {/* Navigation */}
                        <div>
                            <h3 className="text-sm font-bold mb-4 text-slate-900 uppercase tracking-wider">{content.navigation.title}</h3>
                            <ul className="space-y-3">
                                {content.navigation.links.map((link, index) => (
                                    <li key={index}>
                                        <Link href={link.href} className="text-sm text-slate-600 hover:text-violet-600 hover:translate-x-1 inline-block transition-all duration-200">
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Empty column for spacing */}
                        <div></div>
                        
                        {/* Legal Links */}
                        <div>
                            <h3 className="text-sm font-bold mb-4 text-slate-900 uppercase tracking-wider">Legal</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link target="_blank" href="https://www.vocalcom.com/fr/mentions-legales/" className="text-sm text-slate-600 hover:text-violet-600 hover:translate-x-1 inline-block transition-all duration-200">
                                        {content.links.legal}
                                    </Link>
                                </li>
                                <li>
                                    <Link target="_blank" href="https://www.vocalcom.com/fr/politique-de-confidentialite/" className="text-sm text-slate-600 hover:text-violet-600 hover:translate-x-1 inline-block transition-all duration-200">
                                        {content.links.privacy}
                                    </Link>
                                </li>
                                <li>
                                    <Link target="_blank" href="https://www.vocalcom.com/fr/politique-cookies/" className="text-sm text-slate-600 hover:text-violet-600 hover:translate-x-1 inline-block transition-all duration-200">
                                        {content.links.cookies}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Copyright */}
                    <div className="pt-8 border-t border-slate-200">
                        <p className="text-xs text-center text-slate-500">{content.copyright}</p>
                    </div>
                </div>
            </footer>

        </>
    );
}