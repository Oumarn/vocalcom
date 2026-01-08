import { Metadata } from 'next';
import { landingEN } from '@/content/landing.en';
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
  title: landingEN.meta.title,
  description: landingEN.meta.description,
};

export default function EnglishLandingPage() {
  return (
    <div className="">
      <main className="">
        <HeroHome content={landingEN.hero} />
        <LogoBillboard content={landingEN.logoBillboard} />
        <AIHumanSection content={landingEN.aiHuman} />
        <BenefitsGrid content={landingEN.benefits} />
        <Integrations content={landingEN.integrations} />
        <SocialProof content={landingEN.socialProof} />
        <SecurityCompliance content={landingEN.security} />
        <ComparisonSection content={landingEN.comparison} />
        <Historic content={landingEN.stats} />
        <FinalCta content={landingEN.finalCta} />
      </main>
    </div>
  );
}
