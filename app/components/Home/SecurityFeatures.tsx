"use client";

import Icon from '@mdi/react';
import { mdiShieldCheckOutline, mdiLockOutline, mdiEarth } from '@mdi/js';

export default function SecurityFeatures() {
    return (
        <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-50 to-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                        Secure by design.<br />Trusted by enterprise.
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#24B7C3] hover:shadow-xl transition-all duration-300">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center mb-6">
                            <Icon path={mdiShieldCheckOutline} size={1.5} className="text-[#24B7C3]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            Your data is never used for training
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            We and our subprocessors (e.g. OpenAI) never use your data to train AI models. It's contractually guaranteed.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#934292] hover:shadow-xl transition-all duration-300">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center mb-6">
                            <Icon path={mdiLockOutline} size={1.5} className="text-[#934292]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            Locked down, end-to-end
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Your data is encrypted at rest and in transit. Only your bots can access it — never humans, never other customers.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#F6A02E] hover:shadow-xl transition-all duration-300">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center mb-6">
                            <Icon path={mdiEarth} size={1.5} className="text-[#F6A02E]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            Privacy-first and compliant
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            We follow GDPR and CCPA programs and offer EU data residency so your data never leaves the region.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
