import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Vocalcom - Agent Vocal IA | Solution cloud de centre d'appels IA-First",
  description: "Plateforme AI-first de centre de contact avec Agent Vocal IA. ROI de 281% en 3 mois.",
};

export default function AgentVocalIALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
