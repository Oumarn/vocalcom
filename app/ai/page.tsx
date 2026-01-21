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
import FinalCta from "../components/Home/FinalCta";

export const metadata: Metadata = {
  title: "AI-First Contact Center Platform | Vocalcom",
  description: "Unify AI agents and human teams across all channels to increase efficiency, boost revenue, and deliver measurable CX performance at scale.",
};

export default function AiLandingPage() {
  return (
    <div>
      <main>
        {/* Hero Section */}
        <HeroHome content={landingEN.hero} />
        
        {/* Logo billboard for social proof */}
        <LogoBillboard content={landingEN.logoBillboard} />
        
        {/* AI + Human Section */}
        <AIHumanSection content={landingEN.aiHuman} />
        
        {/* Benefits Grid */}
        <BenefitsGrid content={landingEN.benefits} />
        
        {/* Integrations section */}
        <Integrations content={landingEN.integrations} />
        
        {/* Social proof / case studies */}
        <SocialProof content={landingEN.socialProof} />
        
        {/* Security & compliance */}
        <SecurityCompliance content={landingEN.security} />
        
        {/* Final CTA */}
        <FinalCta content={landingEN.finalCta} />
      </main>
    </div>
  );
}
