import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: "Dashboard Demo | Publitek",
  description: "Prototipo visual del dashboard comercial de Publitek.",
};

export default function DashboardDemoPage() {
  return <DashboardShell />;
}
