import { Metadata } from 'next';
import { landingFR } from '@/content/landing.fr';
import HeroHome from "../components/Home/Hero";
import AIHumanSection from "../components/Home/AIHumanSection";
import LogoBillboard from "../components/Home/LogoBillboard";
import StatsSection from "../components/Home/StatsSection";
import BenefitsGrid from "../components/Home/BenefitsGrid";
import Integrations from "../components/Home/Integrations";
import SecurityCompliance from "../components/Home/SecurityCompliance";
import SocialProof from "../components/Home/SocialProof";
import ComparisonSection from "../components/Home/ComparisonSection";
import Historic from "../components/Home/Historic";
import FinalCta from "../components/Home/FinalCta";
import SimpleCta from "../components/Home/SimpleCta";

export const metadata: Metadata = {
  title: landingFR.meta.title,
  description: landingFR.meta.description,
  openGraph: {
    title: landingFR.meta.title,
    description: landingFR.meta.description,
    images: ['/hero.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: landingFR.meta.title,
    description: landingFR.meta.description,
    images: ['/hero.webp'],
  },
};

export default function FrenchLandingPage() {
  return (
    <div className="">
      <main className="">
        <HeroHome content={landingFR.hero} />
        <LogoBillboard content={landingFR.logoBillboard} />
        <AIHumanSection content={landingFR.aiHuman} />
        <BenefitsGrid content={landingFR.benefits} />
        <SimpleCta text="30 jours gratuit" url="https://calendly.com/vocalcom-france/demo-vocalcom" />
        <Integrations content={landingFR.integrations} />
        <SocialProof content={landingFR.socialProof} />
        <SecurityCompliance content={landingFR.security} />
        <ComparisonSection content={landingFR.comparison} />
        <Historic content={landingFR.stats} />
        <FinalCta content={landingFR.finalCta} />
      </main>
    </div>
  );
}
