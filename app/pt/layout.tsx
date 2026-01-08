import type { Metadata } from "next";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import { landingPT } from "@/content/landing.pt";

export const metadata: Metadata = {
  title: landingPT.meta.title,
  description: landingPT.meta.description,
};

export default function PortugueseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppHeader content={landingPT.header} />
      {children}
      <AppFooter content={landingPT.footer} />
    </>
  );
}
