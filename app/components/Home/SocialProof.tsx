import { mdiTrendingUp, mdiCheckCircle, mdiStarOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Image from 'next/image';

export default function SocialProof() {
    return (
        <>
            <section className="py-20 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
                        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
                            <Icon path={mdiTrendingUp} size={0.6} />
                            Résultats Prouvés
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">Transformés par l'IA. Mesurés par les Résultats.</h2>
                        <p className="text-lg text-gray-600">Des entreprises leaders qui ont 10x leur CX avec Vocalcom</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16 animate-fade-up">
                        {/* Case Study Card 1 */}
                        <div className="relative bg-gradient-to-br from-blue-50 via-white to-white p-8 rounded-2xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 group">
                            <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                Santé
                            </div>
                            
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-14 h-14 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center p-2">
                                    <Image src="/CNM_Prevoyance_logo.png" alt="CNM Prévoyance" width={48} height={48} className="object-contain" unoptimized />
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-gray-900">CNM Prévoyance</div>
                                    <div className="text-xs text-gray-500">Santé</div>
                                </div>
                            </div>

                            <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                                "La flexibilité de la solution Vocalcom et sa capacité à s'intégrer avec notre outil CRM, nous permettent d'optimiser en permanence la satisfaction client et d'offrir une relation personnalisée à nos adhérents."
                            </p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-700">Flexibilité</span>
                                    <span className="text-2xl font-bold text-green-600">Max</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-700">Intégration CRM</span>
                                    <span className="text-2xl font-bold text-blue-600">Native</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                    CR
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-900">Christian Reynaud</div>
                                    <div className="text-xs text-gray-500">Dir. Développement, CNM</div>
                                </div>
                            </div>
                        </div>

                        {/* Case Study Card 2 */}
                        <div className="relative bg-gradient-to-br from-purple-50 via-white to-white p-8 rounded-2xl border-2 border-purple-100 hover:border-purple-300 hover:shadow-2xl transition-all duration-300 group">
                            <div className="absolute top-4 right-4 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                Énergie
                            </div>
                            
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-14 h-14 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center p-2">
                                    <Image src="/Logo_Engie.png" alt="ENGIE" width={48} height={48} className="object-contain" unoptimized />
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-gray-900">ENGIE Solutions</div>
                                    <div className="text-xs text-gray-500">Retail & Logistique</div>
                                </div>
                            </div>

                            <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                                "Je n'ai pas trouvé d'outil aussi complet et simple à utiliser que la solution Hermes de Vocalcom. Elle permet de gérer tout l'opérationnel, sans recourir à prestataire informatique et sans connaissances en scripting."
                            </p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-700">Simplicité</span>
                                    <span className="text-2xl font-bold text-green-600">100%</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-700">Autonomie</span>
                                    <span className="text-2xl font-bold text-purple-600">Total</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                                    CR
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-900">Cyril Roustan</div>
                                    <div className="text-xs text-gray-500">Responsable CRC, ENGIE Solutions</div>
                                </div>
                            </div>
                        </div>

                        {/* Case Study Card 3 */}
                        <div className="relative bg-gradient-to-br from-green-50 via-white to-white p-8 rounded-2xl border-2 border-green-100 hover:border-green-300 hover:shadow-2xl transition-all duration-300 group">
                            <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                Tech
                            </div>
                            
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-14 h-14 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center p-2">
                                    <Image src="/logo_Sage.png" alt="Sage" width={48} height={48} className="object-contain" unoptimized />
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-gray-900">Sage</div>
                                    <div className="text-xs text-gray-500">Espagne</div>
                                </div>
                            </div>

                            <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                                "Thanks to Vocalcom's high level of commitment, Sage could deploy an important project for its contact center, with an immediate return on investment and a 60% productivity increase"
                            </p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-700">ROI</span>
                                    <span className="text-2xl font-bold text-green-600">Immédiat</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-700">Productivité</span>
                                    <span className="text-2xl font-bold text-blue-600">+60%</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                                    FG
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-900">Fernando Gavalche</div>
                                    <div className="text-xs text-gray-500">CIO, Sage Espagne</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust badges */}
                    <div className="mt-16 pt-12 border-t border-gray-200 animate-fade-up">
                        <div className="text-center mb-8">
                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Ils nous font confiance</p>
                        </div>
                        <div className="overflow-hidden relative">
                            {/* Spotlight highlight */}
                            <div className="absolute inset-0 pointer-events-none z-10">
                                <div className="absolute top-0 bottom-0 w-1/4 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-xl" 
                                     style={{ animation: 'spotlight 8s linear infinite' }}>
                                </div>
                            </div>
                            <div className="flex animate-scroll">
                                {/* First set of logos */}
                                <div className="flex items-center gap-12 px-6 shrink-0">
                                    <img src="/assets/AXA_Logo.svg" alt="AXA" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/bouygues.png" alt="Bouygues" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/Vinci_Unternehmen_logo.svg" alt="Vinci" className="h-10 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/renault.svg" alt="Renault" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/mcdonalds.svg" alt="McDonald's" className="h-10 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/Monogramme_Nespresso.png" alt="Nespresso" className="h-10 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/armatis.png" alt="Armatis" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/anheuse.svg" alt="Anheuser-Busch" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/abu_dhabi.svg" alt="Abu Dhabi" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/mm.png" alt="M&M's" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/mauritius.jpg" alt="Mauritius" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/Logo_fcbarcelone.png" alt="FC Barcelona" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/Logo_Bioderma.png" alt="Bioderma" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/The-Petroleum-Institute.png" alt="Petroleum Institute" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/majid.png" alt="Majid" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                </div>
                                {/* Duplicate set for seamless loop */}
                                <div className="flex items-center gap-12 px-6 shrink-0">
                                    <img src="/assets/AXA_Logo.svg" alt="AXA" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/bouygues.png" alt="Bouygues" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/Vinci_Unternehmen_logo.svg" alt="Vinci" className="h-10 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/renault.svg" alt="Renault" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/mcdonalds.svg" alt="McDonald's" className="h-10 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/Monogramme_Nespresso.png" alt="Nespresso" className="h-10 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/armatis.png" alt="Armatis" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/anheuse.svg" alt="Anheuser-Busch" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/abu_dhabi.svg" alt="Abu Dhabi" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/mm.png" alt="M&M's" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/mauritius.jpg" alt="Mauritius" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/Logo_fcbarcelone.png" alt="FC Barcelona" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/Logo_Bioderma.png" alt="Bioderma" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/The-Petroleum-Institute.png" alt="Petroleum Institute" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                    <img src="/assets/majid.png" alt="Majid" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}