import type { Metadata } from "next";
import { aiES } from "@/content/ai.es";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata: Metadata = {
  title: aiES.meta.title,
  description: aiES.meta.description,
  keywords: aiES.meta.keywords,
};

export default function IACallCenterPage() {
  return <CallCenterPage content={aiES} />;
}
