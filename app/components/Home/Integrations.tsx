"use client";
import type { landingFR } from '@/content/landing.fr';

export default function Integrations({ content }: { content: typeof landingFR.integrations }) {
    const integrations = [
        { name: "Salesforce", logo: "/assets/Salesforce.com_logo.svg.png" },
        { name: "Microsoft Dynamics", logo: "/assets/Microsoft_Dynamics_logo.png" },
        { name: "Zendesk", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Zendesk_logo.svg" },
        { name: "HubSpot", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg" },
        { name: "Zoho CRM", logo: "/assets/Zoho_CRM_Logo.png" },
        { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" }
    ];

    return (
        <section className="py-16 lg:py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-200 mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></div>
                        <p className="text-xs text-violet-700 font-medium uppercase tracking-wider">{content.badge}</p>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                        {content.title}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        {content.subtitle}
                    </p>
                </div>

                {/* Integration logos grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16 max-w-md md:max-w-none mx-auto">
                    {integrations.map((integration, index) => (
                        <div
                            key={index}
                            className="group relative flex items-center justify-center h-24 bg-white rounded-xl border border-gray-200 hover:border-violet-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden p-4"
                        >
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-50/0 via-purple-50/0 to-blue-50/0 group-hover:from-violet-50/50 group-hover:via-purple-50/30 group-hover:to-blue-50/50 transition-all duration-300"></div>
                            <img 
                                src={integration.logo} 
                                alt={integration.name}
                                className="relative z-10 max-w-full max-h-full object-contain transition-all duration-300"
                                style={{ 
                                    filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(231deg) brightness(95%) contrast(101%)'
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* +200 integrations with enhanced styling */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-full">
                        <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">{content.count}</span>
                        <span className="text-sm text-gray-600">{content.countLabel}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
