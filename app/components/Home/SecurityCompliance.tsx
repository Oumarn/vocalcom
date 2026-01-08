"use client";

import Icon from '@mdi/react';
import { mdiShieldCheckOutline, mdiLockOutline, mdiEarth } from '@mdi/js';
import type { landingFR } from '@/content/landing.fr';

export default function SecurityCompliance({ content }: { content: typeof landingFR.security }) {
    const certLogos = [
        "/assets/Zv6rlbVsGrYSwV2s_AICPASOC2TYPEIICertified1.avif",
        "/assets/GDPR-compliant_logo@2x.webp",
        "/assets/logo-pci-dss-500.png",
        "/assets/dora-hero-image.webp",
        "/assets/ISO-1024x1024.png",
        "/assets/silver-ecovadis-white-border.png"
    ];

    const featureIcons = [mdiShieldCheckOutline, mdiLockOutline, mdiEarth];
    const featureColors = [
        { icon: "#24B7C3", bg: "from-cyan-100 to-cyan-50", border: "border-cyan-200 hover:border-cyan-300" },
        { icon: "#934292", bg: "from-purple-100 to-purple-50", border: "border-purple-200 hover:border-purple-300" },
        { icon: "#F6A02E", bg: "from-orange-100 to-orange-50", border: "border-orange-200 hover:border-orange-300" }
    ];

    const dataPrivacyItems = [
        { title: content.dataPrivacy.title, description: content.dataPrivacy.description },
        { title: "Secure End-to-End", description: content.dataPrivacy.secureEndToEnd },
        { title: "Privacy and Compliance", description: content.dataPrivacy.compliance }
    ];

    return (
        <section className="py-12 lg:py-16 bg-gradient-to-br from-slate-50 to-white">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        {content.title}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {content.subtitle}
                    </p>
                </div>

                {/* Certifications grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
                    {content.features.map((cert, index) => (
                        <div
                            key={index}
                            className="group flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="h-16 flex items-center justify-center mb-2">
                                <img 
                                    src={certLogos[index]} 
                                    alt={cert.title}
                                    className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>
                            <p className="text-[10px] text-center text-gray-600 font-medium">{cert.title}</p>
                        </div>
                    ))}
                </div>

                {/* Security Features */}
                <div className="grid md:grid-cols-3 gap-8">
                    {dataPrivacyItems.map((feature, index) => {
                        const colors = featureColors[index];
                        return (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl p-8 border-2 ${colors.border} hover:shadow-xl transition-all duration-300`}
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-6`}>
                                    <Icon path={featureIcons[index]} size={1.5} style={{ color: colors.icon }} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
