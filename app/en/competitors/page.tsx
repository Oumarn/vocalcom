import type { Metadata } from "next";
import { competitorsEN } from "@/content/competitors.en";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata: Metadata = {
  title: competitorsEN.meta.title,
  description: competitorsEN.meta.description,
  keywords: competitorsEN.meta.keywords,
};

export default function CompetitorsPage() {
  return <CallCenterPage content={competitorsEN} />;
}
