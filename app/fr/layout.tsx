import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
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
      <AppFooter content={landingFR.footer} />
    </>
  );
}
