'use client';

import { useEffect } from 'react';
import { landingFR } from '@/content/landing.fr';
import HeroHome from "../../components/Home/Hero";
import AIHumanSection from "../../components/Home/AIHumanSection";
import LogoBillboard from "../../components/Home/LogoBillboard";
import StatsSection from "../../components/Home/StatsSection";
import BenefitsGrid from "../../components/Home/BenefitsGrid";
import Integrations from "../../components/Home/Integrations";
import SecurityCompliance from "../../components/Home/SecurityCompliance";
import SocialProof from "../../components/Home/SocialProof";
import ComparisonSection from "../../components/Home/ComparisonSection";
import Historic from "../../components/Home/Historic";
import FinalCta from "../../components/Home/FinalCta";
import MidPageCta from "../../components/Home/MidPageCta";

const CALENDLY_URL = "https://calendly.com/vocalcom-france/demo-vocalcom-agent-ia-vocal";

export default function AgentVocalIAPage() {
  useEffect(() => {
    // Add smooth scroll behavior for demo links
    const handleDemoClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href="#demo"]');
      if (link) {
        e.preventDefault();
        const demoElement = document.getElementById('demo');
        if (demoElement) {
          demoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };

    document.addEventListener('click', handleDemoClick);
    return () => document.removeEventListener('click', handleDemoClick);
  }, []);

  return (
    <div className="">
      <main className="">
        <HeroHome content={landingFR.hero} showHelpField={true} />
        <LogoBillboard content={landingFR.logoBillboard} />
        <AIHumanSection content={landingFR.aiHuman} />
        <MidPageCta 
          url={CALENDLY_URL}
          title="1000 Agent IA Vocaux Gratuitement !"
          description="L'Agent IA Vocal qui répond au téléphone comme un humain."
          buttonText="30 Jours Gratuits"
        />
        <BenefitsGrid content={landingFR.benefits} />
        <Integrations content={landingFR.integrations} />
        <MidPageCta 
          url={CALENDLY_URL}
          title="1000 Agent IA Vocaux Gratuitement !"
          description="L'Agent IA Vocal qui répond au téléphone comme un humain."
          buttonText="30 Jours Gratuits"
        />
        <SocialProof content={landingFR.socialProof} />
        <SecurityCompliance content={landingFR.security} />
        <MidPageCta 
          url={CALENDLY_URL}
          title="1000 Agent IA Vocaux Gratuitement !"
          description="L'Agent IA Vocal qui répond au téléphone comme un humain."
          buttonText="30 Jours Gratuits"
        />
        <ComparisonSection content={landingFR.comparison} />
        <Historic content={landingFR.stats} />
        <FinalCta content={landingFR.finalCta} />
      </main>
    </div>
  );
}
