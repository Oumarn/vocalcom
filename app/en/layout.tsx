import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import { landingEN } from "@/content/landing.en";

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader content={landingEN.header} />
      {children}
      <AppFooter content={landingEN.footer} />
    </>
  );
}
