import { Metadata } from 'next';
import { landingES } from '@/content/landing.es';
import Hero from '@/app/components/Productos/ContactCenter/Hero';
import Permite from '@/app/components/Productos/ContactCenter/Permite';

export const metadata: Metadata = {
  title: landingES.meta.title,
  description: landingES.meta.description,
};


export default function SpanishLandingPage() {
  return (
    <div className="">
      <main className="">
        <Hero />
        <Permite />
      </main>
    </div>
  );
}
