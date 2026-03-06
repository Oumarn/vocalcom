import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import CTABanner from "../components/CTABanner";
import { landingFR } from "@/content/landing.fr";

export default function FrenchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader content={landingFR.header} />
      {children}
      <CTABanner text={landingFR.ctaBanner.text} ctaText={landingFR.ctaBanner.ctaText} ctaUrl={landingFR.ctaBanner.ctaUrl} />
      <AppFooter content={landingFR.footer} />
    </>
  );
}
