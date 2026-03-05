'use client';

import { useEffect } from 'react';
import { landingFR } from '@/content/landing.fr';
import HeroWithCalendly from "../../components/Home/HeroWithCalendly";
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
        <HeroWithCalendly content={landingFR.hero} calendlyUrl={CALENDLY_URL} />
        <LogoBillboard content={landingFR.logoBillboard} />
        <AIHumanSection content={landingFR.aiHuman} />
        <BenefitsGrid content={landingFR.benefits} />
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
