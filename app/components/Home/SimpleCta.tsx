'use client';

import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';

interface SimpleCtaProps {
  text: string;
  url: string;
}

export default function SimpleCta({ text, url }: SimpleCtaProps) {
  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 sm:px-8 py-2 sm:py-4 text-xs sm:text-sm text-white font-bold rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          style={{background: 'linear-gradient(90deg, #F6A02E, #f97316)'}}
        >
          {text}
          <Icon path={mdiArrowRight} size={0.8} className="transition-transform" />
        </a>
      </div>
    </section>
  );
}
