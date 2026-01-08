import { Metadata } from 'next';
import { landingPT } from '@/content/landing.pt';
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
  title: landingPT.meta.title,
  description: landingPT.meta.description,
};

export default function PortugueseLandingPage() {
  return (
    <div className="">
      <main className="">
        <HeroHome content={landingPT.hero} />
        <LogoBillboard content={landingPT.logoBillboard} />
        <AIHumanSection content={landingPT.aiHuman} />
        <BenefitsGrid content={landingPT.benefits} />
        <Integrations content={landingPT.integrations} />
        <SocialProof content={landingPT.socialProof} />
        <SecurityCompliance content={landingPT.security} />
        <ComparisonSection content={landingPT.comparison} />
        <Historic content={landingPT.stats} />
        <FinalCta content={landingPT.finalCta} />
      </main>
    </div>
  );
}
