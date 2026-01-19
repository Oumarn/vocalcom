"use client";

const companies = [
  { name: "Blancheporte", image: "/logos/Blancheporte.png", class: "w-28 h-16 object-contain" },
  { name: "Konecta", image: "/logos/Konecta_logo.png", class: "w-28 h-16 object-contain" },
  { name: "FC Barcelona", image: "/logos/Logo_fcbarcelone.png", class: "w-28 h-16 object-contain" },
  { name: "Nexity", image: "/logos/Nexity_logo.png", class: "w-28 h-16 object-contain" },
  { name: "SFR", image: "/logos/SFR_Logo.png", class: "w-28 h-16 object-contain" },
  { name: "Stellantis", image: "/logos/Stellantis_logo.png", class: "w-28 h-16 object-contain" },
  { name: "Vodafone", image: "/logos/Vodafone_logo.png", class: "w-28 h-16 object-contain" },
  { name: "Volkswagen", image: "/logos/Volkswagen_logo.png", class: "w-28 h-16 object-contain" },
  { name: "Armatis", image: "/logos/armatis.png", class: "w-28 h-16 object-contain" },
  { name: "BNP Paribas", image: "/logos/bnp paribas logo.png", class: "w-28 h-16 object-contain" },
  { name: "Concentrix Webhelp", image: "/logos/conentrix webhelp.png", class: "w-28 h-16 object-contain" },
  { name: "Engie", image: "/logos/engie_logo.png", class: "w-28 h-16 object-contain" },
  { name: "McDonald's", image: "/logos/macdonald_logo.png", class: "w-28 h-16 object-contain" },
  { name: "Renault", image: "/logos/renault.svg", class: "w-28 h-16 object-contain" },
];

import type { landingFR } from '@/content/landing.fr';

export default function CustomerLogo({ content }: { content: typeof landingFR.logoBillboard }) {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 shadow-lg shadow-violet-500/20 mb-6">
            <span className="text-sm font-semibold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              {content.badge}
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {content.title}
          </h2>
        </div>
        
        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 items-center justify-items-center">
          {companies.map((company, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 w-full h-28 flex items-center justify-center border border-gray-100"
            >
              <img
                src={company.image}
                alt={company.name}
                className={`${company.class} grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
