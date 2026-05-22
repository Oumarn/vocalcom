import { Metadata } from 'next';
import { landingES } from '@/content/landing.es';
import HeroEsHome from "../components/Home/HeroEs";
import LogoBillboardES from "../components/Home/LogoBillboardES";
import IntegrationsES from "../components/Home/IntegrationsES";
import Soluciones from '../components/Home/Soluciones';
import PorqueVocalcom from '../components/Home/PorqueVocalcom';
import Cta from '../components/Home/Cta';

export const metadata: Metadata = {
  title: landingES.meta.title,
  description: landingES.meta.description,
};

export default function SpanishLandingPage() {
  return (
    <div className="">
      <main className="">
        <HeroEsHome content={landingES.hero} />
        <LogoBillboardES content={landingES.logoBillboard} />
        <Soluciones />
        <IntegrationsES content={landingES.integrations} />
        <PorqueVocalcom />
        <Cta content={landingES.finalCta} />
      </main>
    </div>
  );
}
