"use client";

import Icon from "@mdi/react";
import {
    mdiHeadLightbulbOutline,
    mdiTuneVariant,
    mdiEarth,
    mdiRocketLaunchOutline
} from "@mdi/js";

const initialFeatures = [
    {
        title: "Atiende en todos los canales",
        description:
            "Gracias a la integración de todos los canales de voz y texto (email, webchat, WhatsApp, redes sociales) en una misma plataforma, puedes gestionar tu CX de forma unificada.",
        icon: mdiHeadLightbulbOutline,
        link: "#"
    },
    {
        title: "Maximiza los resultados de tus campañas outbound",
        description:
            "Nuestros potentes motores de marcación automática multimodal optimizan los recursos del contact center y multiplican el éxito de tus llamadas.",
        icon: mdiTuneVariant,
        link: "#"
    },
    {
        title: "Optimiza la atención inbound",
        description:
            "Acelera los tiempos de respuesta a los clientes con una distribución inteligente de las consultas entre los agentes y la integración del canal saliente.",
        icon: mdiEarth,
        link: "#"
    },
    {
        title: "Aumenta la productividad de tus equipos",
        description:
            "Reduce costes automatizando procesos con IRV y bots conversacionales e integrando AI copilots que asisten a los agentes en su día a día. Todo a través de una interfaz intuitiva y fácil de usar.",
        icon: mdiEarth,
        link: "#"
    },
    {
        title: "Controla tus operaciones de CX",
        description:
            "Inconnect permite monitorizar la actividad del contact center con KPI en tiempo real por agentes y equipos, de modo que puedas garantizar el nivel de servicio en todo momento.",
        icon: mdiRocketLaunchOutline,
        link: "#"
    }
];

export default function Permite() {
    return (
        <section className="hidden md:block relative py-20">

            <div className="max-w-5xl mx-auto">

                {initialFeatures.map((f, i) => (
                    <div
                        key={f.title}
                        className="sticky top-24 mb-8"
                        style={{
                            zIndex: i + 1
                        }}
                    >
                        <div
                            className="bg-white border border-gray-200 shadow-xl rounded-3xl p-8 transition-all duration-300">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                <div
                                    className={`
                    ${i % 2 === 0
                                            ? "order-1"
                                            : "order-2"}
                    flex flex-col gap-4
                  `}
                                >
                                    <div className="flex items-center gap-4">

                                        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-50 text-indigo-500">
                                            <Icon
                                                path={f.icon}
                                                size={1}
                                            />
                                        </div>

                                        <h3 className="text-lg font-semibold text-[#333]">
                                            {f.title}
                                        </h3>
                                    </div>

                                    <p className="text-[#333] text-sm md:text-[17px]">
                                        {f.description}
                                    </p>
                                </div>

                                <div
                                    className={
                                        i % 2 === 0
                                            ? "order-2"
                                            : "order-1"
                                    }
                                >
                                    <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 min-h-[260px]" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}