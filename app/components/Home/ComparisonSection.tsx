"use client";
import Icon from '@mdi/react';
import { mdiCheck, mdiClose } from '@mdi/js';

export default function ComparisonSection() {
    return (
        <>
            <section className="py-20 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-up">
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                            Vocalcom vs Solutions Traditionnelles
                        </h2>
                        <p className="text-lg text-gray-600">
                            Découvrez pourquoi les entreprises migrent vers notre plateforme AI-native
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden">
                            {/* Header */}
                            <div className="grid grid-cols-3 gap-6 p-6 border-b-2 border-gray-200" style={{background: 'linear-gradient(90deg, rgba(0, 191, 195, 0.1), rgba(144, 75, 153, 0.1))'}}>
                                <div className="text-center">
                                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Fonctionnalité</p>
                                </div>
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center px-4 py-2 text-white rounded-full font-bold text-sm shadow-lg" style={{background: 'linear-gradient(193deg, #00bfc3, #4488af 40%, #904b99)'}}>
                                        ⚡ Vocalcom AI
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Solutions Legacy</p>
                                </div>
                            </div>

                            {/* Comparison rows */}
                            <div className="divide-y divide-gray-200">
                                {[
                                    { feature: "Agents IA intégrés", vocalcom: true, legacy: false },
                                    { feature: "Omnicanal natif (15+ canaux)", vocalcom: true, legacy: "Limité" },
                                    { feature: "Tarification transparente", vocalcom: true, legacy: false },
                                    { feature: "Analytics temps réel", vocalcom: true, legacy: "Basique" },
                                    { feature: "Intégrations API ouvertes", vocalcom: "100+", legacy: "Limitées" },
                                    { feature: "Support 24/7", vocalcom: true, legacy: "Limité" },
                                ].map((row, idx) => (
                                    <div key={idx} className="grid grid-cols-3 gap-6 p-6 hover:bg-blue-50/30 transition-colors">
                                        <div className="flex items-center">
                                            <p className="text-gray-700 font-medium">{row.feature}</p>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            {typeof row.vocalcom === 'boolean' ? (
                                                row.vocalcom ? (
                                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                                        <Icon path={mdiCheck} size={1} className="text-green-600" />
                                                    </div>
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                                        <Icon path={mdiClose} size={1} className="text-red-600" />
                                                    </div>
                                                )
                                            ) : (
                                                <span className="text-blue-600 font-bold">{row.vocalcom}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-center">
                                            {typeof row.legacy === 'boolean' ? (
                                                row.legacy ? (
                                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                                        <Icon path={mdiCheck} size={1} className="text-green-600" />
                                                    </div>
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                                        <Icon path={mdiClose} size={1} className="text-red-600" />
                                                    </div>
                                                )
                                            ) : (
                                                <span className="text-gray-500 font-medium text-sm">{row.legacy}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="p-8 text-center border-t-2 border-gray-200" style={{background: 'linear-gradient(90deg, rgba(0, 191, 195, 0.1), rgba(144, 75, 153, 0.1))'}}>
                                <p className="text-gray-700 font-semibold mb-4">Prêt à passer à la vitesse supérieure?</p>
                                <a href="#demo" className="inline-flex items-center gap-2 px-6 py-3 text-white font-bold rounded-full hover:shadow-xl transition-all transform hover:-translate-y-1" style={{background: 'linear-gradient(193deg, #00bfc3, #4488af 40%, #904b99)'}}>
                                    Voir la Différence
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
