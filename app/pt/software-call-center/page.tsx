import type { Metadata } from "next";
import { callCenterPT } from "@/content/call-center.pt";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata: Metadata = {
  title: callCenterPT.meta.title,
  description: callCenterPT.meta.description,
  keywords: callCenterPT.meta.keywords,
};

export default function SoftwareCallCenterPage() {
  return <CallCenterPage content={callCenterPT} />;
}
