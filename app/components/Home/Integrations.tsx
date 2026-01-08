"use client";
import type { landingFR } from '@/content/landing.fr';

export default function Integrations({ content }: { content: typeof landingFR.integrations }) {
    const integrations = [
        { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
        { name: "Microsoft Dynamics", logo: "https://companieslogo.com/img/orig/MSFT-a203b22d.png?t=1720244492" },
        { name: "Zendesk", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Zendesk_logo.svg" },
        { name: "HubSpot", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg" },
        { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" }
    ];

    return (
        <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50/50">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-200 mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></div>
                        <p className="text-xs text-violet-700 font-medium uppercase tracking-wider">{content.badge}</p>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
                        {content.title}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        {content.subtitle}
                    </p>
                </div>

                {/* Integration logos grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16 max-w-sm sm:max-w-none mx-auto">
                    {integrations.map((integration, index) => (
                        <div
                            key={index}
                            className="group relative flex items-center justify-center h-36 bg-white rounded-xl border border-gray-200 hover:border-cyan-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden p-6"
                        >
                            {/* Subtle gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 via-blue-50/0 to-purple-50/0 group-hover:from-cyan-50/50 group-hover:via-blue-50/30 group-hover:to-purple-50/50 transition-all duration-300"></div>
                            <img 
                                src={integration.logo} 
                                alt={integration.name}
                                className={`relative z-10 w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 ${
                                    integration.name === "HubSpot" || integration.name === "Oracle" ? "scale-75" : ""
                                }`}
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
