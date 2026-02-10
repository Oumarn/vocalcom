import type { Metadata } from "next";
import { competitorKiamoFR } from "@/content/competitor-kiamo.fr";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata: Metadata = {
  title: competitorKiamoFR.meta.title,
  description: competitorKiamoFR.meta.description,
  keywords: competitorKiamoFR.meta.keywords,
};

export default function AlternativeKiamoPage() {
  return <CallCenterPage content={competitorKiamoFR} />;
}
