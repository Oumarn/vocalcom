import HeroHome from "./components/Home/Hero";
import StatsSection from "./components/Home/StatsSection";
import BenefitsGrid from "./components/Home/BenefitsGrid";
import SocialProof from "./components/Home/SocialProof";
import ComparisonSection from "./components/Home/ComparisonSection";
import Historic from "./components/Home/Historic";
import FinalCta from "./components/Home/FinalCta";

export default function Home() {
  return (
    <div className="">
      <main className="">
        <HeroHome />
        <StatsSection />
        <BenefitsGrid />
        <SocialProof />
        <ComparisonSection />
        <Historic />
        <FinalCta />
      </main>
    </div>
  );
}
