"use client";
import Icon from '@mdi/react';
import { mdiArrowRight, mdiCheckCircle, mdiClockOutline } from '@mdi/js';

export default function FinalCta() {
    return (
        <>
            <section className="py-24 relative overflow-hidden bg-white">
                <div className="absolute inset-0 z-0 opacity-5" style={{background: 'linear-gradient(193deg, #00bfc3, #4488af 40%, #904b99)'}}></div>
                {/* Animated background */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
                    <div className="absolute top-20 right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-fade-up">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
                        Prêt à Révolutionner Votre CX?
                    </h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Rejoignez 500+ entreprises qui transforment leur expérience client avec l'IA
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <a href="#demo" className="group inline-flex items-center gap-3 justify-center px-8 py-5 text-lg font-bold bg-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105" style={{color: '#24B7C3'}} onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(212deg, #ff9a4b, #fb563c 90%, #f7122d)'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#24B7C3'; }}>
                            Demander une démo
                            <Icon path={mdiArrowRight} size={1} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    {/* Trust indicators */}
                    <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                            <Icon path={mdiCheckCircle} size={1.2} className="mx-auto mb-3" style={{color: '#24B7C3'}} />
                            <p className="text-gray-900 font-semibold text-sm">Support dédié</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                            <Icon path={mdiCheckCircle} size={1.2} className="mx-auto mb-3" style={{color: '#24B7C3'}} />
                            <p className="text-gray-900 font-semibold text-sm">ROI garanti</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}