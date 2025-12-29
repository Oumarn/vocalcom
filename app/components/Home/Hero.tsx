import Icon from '@mdi/react';
import { mdiArrowRight, mdiCheck, mdiStar, mdiShieldCheckOutline } from '@mdi/js';
import DemoForm from '../forms/DemoForm';

export default function HeroHome() {
    return (
        <>
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white">
                <div className="absolute inset-0 z-0 opacity-5" style={{background: 'linear-gradient(193deg, #00bfc3, #4488af 40%, #904b99)'}}></div>
                
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
                    <div className="absolute top-40 right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-20 left-40 w-80 h-80 bg-cyan-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    <div className="space-y-8 animate-fade-up">
                        {/* Trust badge */}
                        <div className="inline-flex items-center gap-2 border rounded-full px-4 py-2 text-sm" style={{background: 'rgba(0, 191, 195, 0.1)', borderColor: '#24B7C3'}}>
                            <Icon path={mdiShieldCheckOutline} size={0.7} style={{color: '#24B7C3'}} />
                            <span className="text-gray-700">Certifié ISO 27001 • RGPD Compliant</span>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] text-gray-900">
                                L'IA de la Relation Client
                            </h1>
                            <p className="text-lg lg:text-xl text-gray-600 font-light leading-relaxed">Optimisée pour assister les agents, anticiper le churn, automatiser l'upsell et le cross-sell, booster la vente sur leads, gérer les débordements et ouvrir les services 24/7 sur tous les canaux.</p>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-lg" style={{background: 'rgba(0, 191, 195, 0.2)'}}>
                                    <Icon path={mdiCheck} size={0.9} style={{color: '#24B7C3'}} />
                                </div>
                                <span className="text-base lg:text-lg text-gray-700 font-medium">Agents IA gérant <strong style={{color: '#24B7C3'}}>millions d'interactions</strong> par jour</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-lg" style={{background: 'rgba(0, 191, 195, 0.2)'}}>
                                    <Icon path={mdiCheck} size={0.9} style={{color: '#24B7C3'}} />
                                </div>
                                <span className="text-base lg:text-lg text-gray-700 font-medium">Plateforme unique <strong style={{color: '#24B7C3'}}>15+ canaux unifiés</strong></span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-lg" style={{background: 'rgba(0, 191, 195, 0.2)'}}>
                                    <Icon path={mdiCheck} size={0.9} style={{color: '#24B7C3'}} />
                                </div>
                                <span className="text-base lg:text-lg text-gray-700 font-medium">Résolution <strong style={{color: '#24B7C3'}}>3x plus rapide</strong> avec moins d'effort</span>
                            </div>
                        </div>

                        {/* Social proof stats */}
                        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {[1,2,3,4].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                                            {['A', 'S', 'M', 'T'][i-1]}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm">
                                    <div className="flex items-center gap-1">
                                        {[1,2,3,4,5].map((i) => (
                                            <Icon key={i} path={mdiStar} size={0.5} className="text-yellow-300" />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 text-xs">500+ entreprises font confiance</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-2xl animate-slide-in w-full max-w-lg mx-auto lg:mr-0 border border-gray-100" id="demo">
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold tracking-tight text-center text-gray-900">Voir la Démo en Action</h3>
                            <p className="text-sm text-center text-gray-600 mt-2">⚡ Réponse en <strong className="text-[#24B7C3]">moins de 2h</strong> • Sans engagement</p>
                        </div>

                        <DemoForm />
                    </div>
                </div>
            </section>

        </>
    );
}