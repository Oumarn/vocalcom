import type { Metadata } from "next";
import { callCenterEN } from "@/content/call-center.en";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata: Metadata = {
  title: callCenterEN.meta.title,
  description: callCenterEN.meta.description,
  keywords: callCenterEN.meta.keywords,
};

export default function CallCenterSoftwarePage() {
  return <CallCenterPage content={callCenterEN} />;
}
