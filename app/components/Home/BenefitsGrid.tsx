"use client";
import { mdiRobotHappy, mdiAutoFix, mdiSpeedometer, mdiPhoneInTalk, mdiForumOutline, mdiChip, mdiConnection, mdiSalesforce, mdiCloudOutline, mdiLightningBolt } from '@mdi/js';
import Icon from '@mdi/react';
import Image from 'next/image';

export default function BenefitsGrid() {
    return (
        <>
            <section className="py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-up">
                        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
                            <Icon path={mdiLightningBolt} size={0.6} />
                            Une plateforme unifiée, des possibilités infinies
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">Du basique à l'innovation IA de pointe</h2>
                        <p className="text-lg text-gray-600">Vocalcom.ai réunit tout ce dont vous avez besoin dans une plateforme unique : agents IA, humains, et tous vos canaux pour une CX plus rapide et humaine.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-up">
                        <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                            <div className="relative">
                                <div className="w-14 h-14 rounded-xl text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg" style={{background: 'linear-gradient(193deg, #00bfc3, #4488af)'}}>
                                    <Icon path={mdiRobotHappy} size={1.2} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Agents IA de Nouvelle Génération</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">Conversations naturelles end-to-end sur voix, chat, SMS, email et apps - résolvant les demandes avec rapidité et précision inégalées.</p>
                                <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                                    <span className="text-2xl font-bold">Millions</span>
                                    <span className="text-xs">d'interactions/jour</span>
                                </div>
                            </div>
                        </div>

                        <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-green-50 to-white border-2 border-green-100 hover:border-green-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                            <div className="relative">
                                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg p-2">
                                    <Image src="/image copy 3.png" alt="Automation" width={48} height={48} className="w-full h-full object-contain" unoptimized />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Automatisation Intelligente Revenue</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">Anticipez le churn, automatisez l'upsell et cross-sell, boostez la conversion sur leads avec l'IA prédictive.</p>
                                <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                                    <span className="text-2xl font-bold">+35%</span>
                                    <span className="text-xs">revenus additionnels</span>
                                </div>
                            </div>
                        </div>

                        <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white border-2 border-purple-100 hover:border-purple-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                            <div className="relative">
                                <div className="w-14 h-14 rounded-xl text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg" style={{background: '#904b99'}}>
                                    <Icon path={mdiSpeedometer} size={1.2} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Scalable Sans Effort</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">Gérez les débordements, ouvrez 24/7 sur tous les canaux avec plus d'empathie et d'impact, moins d'effort.</p>
                                <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm">
                                    <span className="text-2xl font-bold">∞</span>
                                    <span className="text-xs">capacité d'échelle</span>
                                </div>
                            </div>
                        </div>

                        <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-white border-2 border-orange-100 hover:border-orange-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                            <div className="relative">
                                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg p-2">
                                    <Image src="/image copy 2.png" alt="AI" width={48} height={48} className="w-full h-full object-contain" unoptimized />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Plateforme Native IA</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">Unifiez chaque canal, client et agent dans une seule plateforme construite pour évoluer avec vous.</p>
                                <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm">
                                    <span className="text-2xl font-bold">1</span>
                                    <span className="text-xs">plateforme, tout inclus</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Platform capabilities */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 animate-fade-up">
                        <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <Icon path={mdiPhoneInTalk} size={0.9} className="text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Inbound & Outbound</h4>
                                <p className="text-xs text-gray-600">Campagnes sortantes et gestion des appels entrants unifiées</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                                <Icon path={mdiForumOutline} size={0.9} className="text-purple-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Omnichannel</h4>
                                <p className="text-xs text-gray-600">Voix, chat, email, SMS, WhatsApp, réseaux sociaux</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                <Icon path={mdiChip} size={0.9} className="text-indigo-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">AI-Ready</h4>
                                <p className="text-xs text-gray-600">Architecture prête pour l'IA générative et agents autonomes</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                                <Icon path={mdiConnection} size={0.9} className="text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Intégration CRM</h4>
                                <p className="text-xs text-gray-600">Connecteurs natifs pour tous vos outils métier</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                            <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0">
                                <Icon path={mdiSalesforce} size={0.9} className="text-sky-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Native Salesforce</h4>
                                <p className="text-xs text-gray-600">Solution certifiée Salesforce AppExchange</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                                <Icon path={mdiCloudOutline} size={0.9} className="text-slate-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">Cloud & On-Premise</h4>
                                <p className="text-xs text-gray-600">Déploiement flexible selon vos besoins</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}