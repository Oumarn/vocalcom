import { Metadata } from 'next';
import { landingES } from '@/content/landing.es';
import HeroEsSolicita from '@/app/components/Solicita/HeroEs';

export const metadata: Metadata = {
  title: landingES.meta.title,
  description: landingES.meta.description,
};

export default function SpanishLandingPage() {
  return (
    <div className="">
      <main className="">
        <HeroEsSolicita content={landingES.hero} />
      </main>
    </div>
  );
}
