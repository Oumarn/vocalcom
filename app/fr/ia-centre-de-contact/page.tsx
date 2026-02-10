import type { Metadata } from "next";
import { aiFR } from "@/content/ai.fr";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata: Metadata = {
  title: aiFR.meta.title,
  description: aiFR.meta.description,
  keywords: aiFR.meta.keywords,
};

export default function IACentreDeContactPage() {
  return <CallCenterPage content={aiFR} />;
}
