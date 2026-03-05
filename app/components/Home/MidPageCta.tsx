'use client';

import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';

interface MidPageCtaProps {
  url: string;
  title?: string;
  description?: string;
  buttonText?: string;
}

export default function MidPageCta({ 
  url, 
  title = "Découvrez notre Agent Vocal IA en action",
  description = "Réservez une démo personnalisée et voyez comment l'IA peut transformer votre centre de contact",
  buttonText = "RÉSERVER UNE DÉMO"
}: MidPageCtaProps) {
  return (
    <section className="py-16 lg:py-20 bg-white relative overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 justify-center px-8 py-4 text-sm font-bold text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          style={{background: 'linear-gradient(90deg, #8b5cf6, #a855f7)'}}
        >
          {buttonText}
          <Icon path={mdiArrowRight} size={0.8} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
