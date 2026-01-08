"use client";

const companies = [
  { name: "Bouygues", image: "/assets/bouygues.png", class: "w-28 h-16 object-contain" },
  { name: "Armatis", image: "/assets/armatis.png", class: "w-28 h-16 object-contain" },
  { name: "AB InBev", image: "/assets/logo_ABInBev.png", class: "w-28 h-16 object-contain" },
  { name: "anheuse", image: "/assets/anheuse.svg", class: "w-28 h-16 object-contain" },
  { name: "Abu Dhabi", image: "/assets/abu_dhabi.svg", class: "w-28 h-16 object-contain" },
  { name: "Bouygues Telecom", image: "/assets/bouygues_telecom.png", class: "w-28 h-16 object-contain" },
  { name: "mcdonalds", image: "/assets/mcdonalds.svg", class: "w-28 h-16 object-contain" },
  { name: "mm", image: "/assets/mm.png", class: "w-28 h-16 object-contain" },
  { name: "renault", image: "/assets/renault.svg", class: "w-28 h-16 object-contain" },
  { name: "mauritius", image: "/assets/mauritius.jpg", class: "w-28 h-16 object-contain" },
  { name: "Vinci", image: "/assets/Vinci_Unternehmen_logo.svg", class: "w-28 h-16 object-contain" },
  { name: "Nespresso", image: "/assets/Monogramme_Nespresso.png", class: "w-28 h-16 object-contain" },
  { name: "FC Barcelona", image: "/assets/Logo_fcbarcelone.png", class: "w-28 h-16 object-contain" },
  { name: "Bioderma", image: "/assets/Logo_Bioderma.png", class: "w-28 h-16 object-contain" },
  { name: "Petroleum Institute", image: "/assets/The-Petroleum-Institute.png", class: "w-28 h-16 object-contain" },
  { name: "AXA", image: "/assets/AXA_Logo.svg", class: "w-28 h-16 object-contain" },
  { name: "Majid", image: "/assets/majid.png", class: "w-28 h-16 object-contain" },
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
