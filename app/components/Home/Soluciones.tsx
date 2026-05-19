"use client";

import Icon from "@mdi/react";

import {
    mdiHeadset,
    mdiRobotExcited,
    mdiBullhornOutline,
    mdiChartTimelineVariant,
    mdiBrain,
    mdiWidgets,
    mdiWidgetsOutline,
    mdiAccountOutline,
    mdiAlphaABoxOutline
} from "@mdi/js";
import { Raleway } from 'next/font/google';

const raleway = Raleway({
    variable: "--font-raleway",
    subsets: ["latin"],
});

const solutions = [
    {
        title: "Solución de cloud contact center",
        description:
            "Gestiona todos tus canales desde una única solución, y aumenta la productividad de tus equipos gracias a la IA integrada en un entorno omnicanal.",
        color: {
            // bg: "from-blue-50 to-white",
            border: "border-blue-100 hover:border-blue-300",
            textColor: "text-sky-600",
            // glow: "from-blue-400/10",
            iconBg: "bg-blue-100",
            iconColor: "text-white"
        },
        icon: mdiAccountOutline
    },
    {
        title: "Agentes virtuales inteligentes",
        description:
            "Escala tu CX con agentes IA que trabajan como humanos: sin pausa, sin errores y con plena autonomía en cualquier canal de voz y texto.",
        color: {
            // bg: "from-purple-50 to-white",
            border: "border-purple-100 hover:border-purple-300",
            textColor: "text-purple-600",
            // glow: "from-purple-400/10",
            iconBg: "bg-purple-100",
            iconColor: "text-white"
        },
        icon: mdiBrain
    },
    {
        title: "CX y Marketing automation",
        description:
            "Automatiza sin esfuerzo y optimiza tus campañas digitales gracias a la trazabilidad end-to-end del customer journey, y al análisis avanzado de KPI.",
        color: {
            // bg: "from-pink-50 to-white",
            border: "border-pink-100 hover:border-pink-300",
            textColor: "text-pink-500",
            // glow: "from-pink-400/10",
            iconBg: "bg-pink-100",
            iconColor: "text-white"
        },
        icon: mdiAlphaABoxOutline,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" id="uuid-66017fd0-876a-457d-85ac-8c345fcbc8dd" viewBox="0 0 100 100" class="size-3/5 fill-pink-500">
  <path d="M76.43408,97c-6.31396,0-11.8584-4.00977-13.79785-9.97754l-3.8335-11.68164h-17.70215l-3.53271,11.47949c-1.98535,6.10938-7.56104,10.16797-13.89648,10.16797-1.52344,0-3.03564-.24023-4.49365-.71289-7.52783-2.25879-11.84375-10.40527-9.52637-18.12988L30.16748,13.15625c1.93018-5.99023,7.61035-10.15625,13.8208-10.15625h10.89893c6.23584,0,11.91504,4.11523,13.81104,10.00879l21.54346,64.86328c2.49805,7.68848-1.64941,15.93164-9.23682,18.40137-1.48486.48242-3.02197.72656-4.5708.72656ZM34.4541,66.34082h30.86719l5.87061,17.8877c.73438,2.26074,2.83936,3.77148,5.24219,3.77148.60254,0,1.2041-.0957,1.78711-.28516,2.86914-.93457,4.42676-4.08984,3.47021-7.03418L60.14404,15.80469c-.71533-2.22168-2.92041-3.80469-5.25684-3.80469h-10.89893c-2.31348,0-4.52002,1.63672-5.24658,3.8916l-20.48926,64.90137c-.87256,2.91113.7373,6.03027,3.60742,6.89258.6543.21094,1.23193.30273,1.81152.30273,2.4248,0,4.56104-1.56055,5.31641-3.88281l5.46631-17.76465Z"></path>
</svg>`
    },
    {
        title: "Software de análisis conversacional",
        description:
            "Analiza todas las conversaciones en llamadas y canales digitales para impulsar la calidad de tus operaciones y detectar insights de valor.",
        color: {
            // bg: "from-green-50 to-white",
            border: "border-green-100 hover:border-green-300",
            textColor: "text-green-600",
            // glow: "from-green-400/10",
            iconBg: "bg-green-100",
            iconColor: "text-white"
        },
        icon: mdiWidgetsOutline
    }
];

export default function Soluciones() {
    return (
        <section className="max-w-7xl mx-auto px-6 pb-12 overflow-hidden text-[#333]">
            <div className="mb-10 text-center">
                <h3 className={`${raleway.className} text-2xl font-normal leading-tight`}>
                    Combina el poder de los agentes IA con tecnología omnicanal y crea experiencias que aceleran tus resultados de negocio como nunca.
                </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-up">
                {solutions.map((solution, index) => (
                    <div
                        key={index}
                        className={`group relative p-8 rounded-2xl border-2 overflow-hidden transition-all duration-300 hover:shadow-xl border-gray-200`}
                    >
                        <div
                            className={`absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-16 translate-x-16`}
                        />

                        <div className="relative">
                            <div
                                className={`${raleway.className} w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-lg transition-transform duration-300 group-hover:scale-110 ${solution.color.iconBg}`}
                            >
                                {solution.svg ? (
                                    <div className="flex items-center justify-center" dangerouslySetInnerHTML={{ __html: solution.svg }} />
                                ) : (
                                    <Icon
                                        path={solution.icon}
                                        size={1.4}
                                        className={solution.color.textColor}
                                    />
                                )}
                            </div>

                            <h3 className={`text-xl font-extralight mb-3 ${solution.color.textColor}`}>
                                {solution.title}
                            </h3>

                            <p className="text-sm leading-relaxed">
                                {solution.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}