import type { Metadata } from "next";
import { competitorNiceFR } from "@/content/competitor-nice.fr";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata: Metadata = {
  title: competitorNiceFR.meta.title,
  description: competitorNiceFR.meta.description,
  keywords: competitorNiceFR.meta.keywords,
};

export default function AlternativeNicePage() {
  return <CallCenterPage content={competitorNiceFR} />;
}
