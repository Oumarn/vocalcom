import { Metadata } from 'next';
import { landingES } from '@/content/landing.es';
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

export const metadata: Metadata = {
  title: landingES.meta.title,
  description: landingES.meta.description,
};

export default function SpanishLandingPage() {
  return (
    <div className="">
      <main className="">
        <HeroHome content={landingES.hero} />
        <LogoBillboard content={landingES.logoBillboard} />
        <AIHumanSection content={landingES.aiHuman} />
        <BenefitsGrid content={landingES.benefits} />
        <Integrations content={landingES.integrations} />
        <SocialProof content={landingES.socialProof} />
        <SecurityCompliance content={landingES.security} />
        <ComparisonSection content={landingES.comparison} />
        <Historic content={landingES.stats} />
        <FinalCta content={landingES.finalCta} />
      </main>
    </div>
  );
}
