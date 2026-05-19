import type { Metadata } from "next";
import AppHeaderES from "../components/AppHeaderES";
import { landingES } from "@/content/landing.es";
import AppFooterEs from "../components/AppFooterES";

export const metadata: Metadata = {
  title: landingES.meta.title,
  description: landingES.meta.description,
};

export default function SpanishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppHeaderES content={landingES.header} />
      {children}
      <AppFooterEs content={landingES.footer} />
    </>
  );
}
