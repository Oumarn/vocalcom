import type { Metadata } from "next";
import { callCenterFR } from "@/content/call-center.fr";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata: Metadata = {
  title: callCenterFR.meta.title,
  description: callCenterFR.meta.description,
  keywords: callCenterFR.meta.keywords,
};

export default function LogicielCallCenterPage() {
  return <CallCenterPage content={callCenterFR} />;
}
