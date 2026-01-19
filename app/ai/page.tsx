import { Metadata } from 'next';
import { landingEN } from '@/content/landing.en';
import DynamicHero from "../components/landing/DynamicHero";
import DynamicSections from "../components/landing/DynamicSections";
import DynamicFormSection from "../components/landing/DynamicFormSection";
import LogoBillboard from "../components/Home/LogoBillboard";
import StatsSection from "../components/Home/StatsSection";
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
        {/* Dynamic Hero - changes based on intent from UTM params */}
        <DynamicHero />
        
        {/* Logo billboard for social proof */}
        <LogoBillboard content={landingEN.logoBillboard} />
        
        {/* Dynamic content sections - changes based on angle */}
        <DynamicSections />
        
        {/* Integrations section */}
        <Integrations content={landingEN.integrations} />
        
        {/* Social proof / case studies */}
        <SocialProof content={landingEN.socialProof} />
        
        {/* Security & compliance */}
        <SecurityCompliance content={landingEN.security} />
        
        {/* Dynamic form with personalized copy */}
        <section className="py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <DynamicFormSection />
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <FinalCta content={landingEN.finalCta} />
      </main>
    </div>
  );
}
