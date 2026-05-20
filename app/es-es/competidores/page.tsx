import type { Metadata } from "next";
import { competidoresES } from "@/content/competidores.es";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata: Metadata = {
  title: competidoresES.meta.title,
  description: competidoresES.meta.description,
  keywords: competidoresES.meta.keywords,
};

export default function CompetidoresPage() {
  return <CallCenterPage content={competidoresES} />;
}
