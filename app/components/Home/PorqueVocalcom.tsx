"use client";

import Icon from "@mdi/react";

import {
    mdiHeadLightbulbOutline,
    mdiTuneVariant,
    mdiEarth,
    mdiRocketLaunchOutline
} from "@mdi/js";

const features = [
    {
        title: "Un ecosistema innovador",
        description:
            "Desarrollamos in-house soluciones de CX potenciadas por GenAI, con equipos de I+D que alinean la evolución del producto con tus objetivos.",
        icon: mdiHeadLightbulbOutline
    },
    {
        title: "Soluciones flexibles y eficientes",
        description:
            "Nuestra tecnología cloud se adapta a la realidad de tu empresa y sector, y te permite gestionar tus operaciones de forma ágil y segura.",
        icon: mdiTuneVariant
    },
    {
        title: "Equipos locales con visión global",
        description:
            "Te atendemos 24/7 en tu horario e idioma, con equipos locales que operan en +29 países y te acompañan en la adopción de nuestras soluciones.",
        icon: mdiEarth
    },
    {
        title: "Referentes en el sector",
        description:
            "Impulsamos tu crecimiento con sistemas no-code y automatización integrados en el ecosistema omnicanal de CX más avanzado del mercado.",
        icon: mdiRocketLaunchOutline
    }
];

export default function PorqueVocalcom() {
    return (
        <section className="relative overflow-hidden bg-[#020826] py-12 px-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(88,120,255,0.15),transparent_40%)]" />

            <div className="relative max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <p className="text-sm font-semibold tracking-widest uppercase text-gray-400 mb-5">
                        ¿POR QUÉ Vocalcom?
                    </p>

                    <h2 className="text-2xl lg:text-4xl font-bold leading-tight text-white">
                        Logra resultados tangibles desde
                        <br className="hidden lg:block" />
                        el primer día{" "}
                        <span className="text-[#2a4cf9]">
                            con
                        </span>{" "}
                        nuestras{" "}
                        <span className="text-purple-400">
                            soluciones
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group rounded-3xl border border-white/5 bg-[#0A1035]/90 p-8 md:p-4 transition-all duration-300 hover:border-indigo-400/30 hover:bg-[#0d1442] hover:shadow-2xl hover:shadow-indigo-500/10"
                        >
                            <div className="flex items-center gap-4 mb-5">
                                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-indigo-200 group-hover:text-purple-400 transition-colors duration-300">
                                    <Icon
                                        path={feature.icon}
                                        size={1}
                                    />
                                </div>

                                <h3 className="text-lg font-semibold text-white">
                                    {feature.title}
                                </h3>
                            </div>

                            <p className="text-gray-300 text-sm md:text-[17px] leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}